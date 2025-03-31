const app = getApp();
const { formatTime, formatDuration } = require('../../utils/utils');

Page({
  data: {
    selectedDate: '',
    dailyRecords: [],
    totalDuration: '0秒',
    studyHistory: [],
    currentPage: 1,
    pageSize: 10,
    hasMore: true,
    showCalendar: true, // 默认显示日历视图
    selectedDateRecords: [], // 新增：存储选中日期的详细记录
    isLoading: true, // 新增：加载状态
  },

  onLoad() {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    this.setData({ 
      selectedDate: formattedDate,
    });

    if (!Array.isArray(app.globalData.studyHistory)) {
      app.globalData.studyHistory = [];
      wx.setStorageSync('studyHistory', []);
    }

    this.updateDailyRecords(formattedDate); // 初始化累计时长

    // 模拟数据加载完成
    setTimeout(() => {
      this.setData({ isLoading: false });
    }, 1000);
  },

  // 处理日期选择事件
  onDateChange(e) {
    const selectedDate = e.detail.value;
    this.setData({ selectedDate });
    this.updateDailyRecords(selectedDate); // 更新选中日期的学习记录
  },

  updateDailyRecords(selectedDate) {
    const studyHistory = app.globalData.studyHistory || [];
    const dailyRecords = studyHistory.filter(item => {
      const date = new Date(item.startTime);
      const formattedItemDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      return formattedItemDate === selectedDate;
    });

    const totalDuration = dailyRecords.reduce((sum, item) => sum + (item.duration || 0), 0);

    this.setData({
      dailyRecords,
      totalDuration: formatDuration(totalDuration),
      selectedDateRecords: dailyRecords.map(item => ({
        startTime: formatTime(item.startTime),
        endTime: formatTime(item.endTime),
        duration: formatDuration(item.duration || 0)
      }))
    });
  },
  
  toggleView() {
    this.setData({
      showCalendar: !this.data.showCalendar
    });
  },
  
  navigateBack() {
    wx.navigateBack({ delta: 1 });
  }
});