const app = getApp();
const { formatTime, formatDuration } = require('../../utils/utils');
import * as echarts from '../../components/ec-canvas/echarts';

Page({
  data: {
    selectedDate: '',
    dailyRecords: [],
    totalDuration: '0秒',
    studyHistory: [],
    currentPage: 1,
    pageSize: 10,
    hasMore: true,
    showChart: true, // 默认显示折线图
    selectedDateRecords: [], // 存储选中日期的详细记录
    isLoading: true, // 加载状态
    chart: null, // 存储echarts实例
    ec: {
      lazyLoad: true // 懒加载
    }
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
      this.initChart(); // 初始化图表
    }, 1000);

    // 监听从calendar页面传递的事件
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('onDateSelected', (selectedDate) => {
      this.setData({ selectedDate });
      this.updateDailyRecords(selectedDate);
      this.initChart();
    });
  },

  initChart() {
    const component = this.selectComponent('#main');
    if (!component) {
      console.error('未找到ec-canvas组件');
      return;
    }

    const canvas = component.getCanvas();
    if (!canvas) {
      console.error('canvas未找到');
      return;
    }

    this.data.chart = echarts.init(canvas);

    const option = {
      title: {
        text: '学习时长'
      },
      xAxis: {
        type: 'category',
        data: ['特殊单词', '助动词', '复合句型']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150],
        type: 'line',
        smooth: true,
        itemStyle: {
          color: '#ff69b4'
        }
      }]
    };

    this.data.chart.setOption(option);
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
      showChart: !this.data.showChart
    });
  },

  navigateBack() {
    wx.navigateBack({ delta: 1 });
  },

  navigateToCalendar() {
    wx.navigateTo({
      url: '/pages/calendar/calendar'
    });
  }
});