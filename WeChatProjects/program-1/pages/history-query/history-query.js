const app = getApp();
const { formatTime, formatDuration } = require('../../utils/utils');

Page({
  data: {
    selectedDate: '',
    dailyRecords: [],
    totalDuration: '0秒',
    studyHistory: [],
    showCalendar: true // 控制日历/列表视图切换
  },

  onLoad() {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    this.setData({ 
      selectedDate: formattedDate,
      studyHistory: this.getFormattedHistory(),
    });
    this.updateDailyRecords(formattedDate);
  },

  // 获取格式化后的历史数据
  getFormattedHistory() {
    try {
      const rawData = app.globalData.studyHistory || [];
      return rawData.map(item => ({
        startTime: formatTime(item.startTime),
        endTime: formatTime(item.endTime),
        duration: formatDuration(item.duration || 0)
      }));
    } catch (e) {
      console.error('数据格式化失败:', e);
      return [];
    }
  },

  onDateChange(e) {
    const selectedDate = e.detail.value;
    this.setData({ selectedDate });
    this.updateDailyRecords(selectedDate);
  },

  updateDailyRecords(selectedDate) {
    const studyHistory = app.globalData.studyHistory || [];
    const dailyRecords = studyHistory.filter(item => {
      const date = formatTime(item.startTime);
      return date.startsWith(selectedDate);
    });

    const totalDuration = dailyRecords.reduce((sum, item) => sum + (item.duration || 0), 0);

    this.setData({
      dailyRecords,
      totalDuration: formatDuration(totalDuration)
    });
  },

  // 切换视图显示
  toggleView() {
    this.setData({
      showCalendar: !this.showCalendar
    });
  },

  navigateBack() {
    wx.navigateBack({ delta: 1 });
  }
});