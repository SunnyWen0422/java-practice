const app = getApp();

Page({
  data: {
    selectedDate: '',
    dailyRecords: [],
    totalDuration: '0秒',
    studyHistory: [],
    showChart: true,
    ec: {
      lazyLoad: true
    }
  },
  
  onLoad() {
    // 初始化逻辑保持不变
  },
  
  navigateToLineChart() {
    wx.navigateTo({
      url: '/pages/line-chart/line-chart'
    });
  },
  
  navigateToCalendar() {
    wx.navigateTo({
      url: '/pages/calendar/calendar'
    });
  }
});