Page({
  data: {
    selectedDate: '',
    minDate: new Date(2020, 0, 1).getTime(), // 开始时间戳
    maxDate: new Date(2030, 11, 31).getTime(), // 结束时间戳
    dailyRecords: [], // 存储选中日期的详细记录
    totalDuration: '0秒', // 累计时长
    isLoading: true // 加载状态
  },

  onLoad() {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    this.setData({ selectedDate: formattedDate });
    this.updateDailyRecords(formattedDate); // 初始化累计时长
  },

  onDateChange(e) {
    const selectedDate = e.detail.value;
    this.setData({ selectedDate });
    this.updateDailyRecords(selectedDate); // 更新选中日期的学习记录
  },

  updateDailyRecords(selectedDate) {
    const app = getApp();
    const studyHistory = app.globalData.studyHistory || [];
    const dailyRecords = studyHistory.filter(item => {
      const date = new Date(item.startTime);
      const formattedItemDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      return formattedItemDate === selectedDate;
    });

    const totalDuration = dailyRecords.reduce((sum, item) => sum + (item.duration || 0), 0);

    this.setData({
      dailyRecords,
      totalDuration: this.formatDuration(totalDuration)
    });
  },

  formatDuration(duration) {
    duration = Number(duration) || 0; // 强制转换为数字

    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);

    const parts = [];
    if (hours > 0) parts.push(`${hours}小时`);
    if (minutes > 0) parts.push(`${minutes}分钟`);
    if (seconds > 0) parts.push(`${seconds}秒`);

    return parts.join('') || '0秒';
  }
});