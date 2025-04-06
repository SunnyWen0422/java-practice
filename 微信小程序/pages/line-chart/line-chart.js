const app = getApp();
import * as echarts from '../../components/ec-canvas/echarts';

Page({
  data: {
    ec: {
      lazyLoad: true // 懒加载
    },
    chart: null,
    mode: 'monthly' // 默认模式为每月折线图
  },

  data: {
    showCalendar: false,
    selectedDate: '',
    minDate: new Date(2020, 0, 1).getTime(), // 开始时间戳
    maxDate: new Date(2030, 11, 31).getTime(), // 结束时间戳
    dailyData: [] // 日期对应数据
  },

  onLoad() {
    // 初始化默认选中今天
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    this.setData({ selectedDate: formattedDate });
    this.loadDateData(formattedDate);
    this.initChart();
  },

  // 显示日历弹窗
  showCalendarPopup() {
    this.setData({ showCalendar: true });
  },

  // 日期选择回调
  onDateChange(e) {
    const selectedDate = e.detail.value;
    this.setData({ 
      selectedDate,
      showCalendar: false
    });
    this.loadDateData(selectedDate);
  },

  // 关闭弹窗
  onCloseCalendar() {
    this.setData({ showCalendar: false });
  },

  // 加载日期数据
  loadDateData(date) {
    // 这里添加你的数据加载逻辑
    console.log('加载日期数据:', date);
    // 示例数据，替换为实际数据获取逻辑
    const mockData = [
      { time: '09:00', content: '数学学习', duration: 45 },
      { time: '14:30', content: '英语练习', duration: 30 }
    ];
    this.setData({ dailyData: mockData });
  },

  // 初始化折线图
  initChart() {
    const component = this.selectComponent('#main');

    const canvas = component.getCanvas();
    if (!canvas) {
      console.error('canvas未找到');
      return;
    }
    const chart = echarts.init(canvas);
    this.setData({ chart });
    this.updateChart();
  },

  // 从本地缓存中获取数据
  getDataFromCache(mode) {
    const cacheData = wx.getStorageSync('studyData') || {};
    if (mode === 'monthly') {
      // 处理每月数据...
      return cacheData.monthlyData || [];
    } else {
      // 处理每天数据...
      return cacheData.dailyData || [];
    }
  },
  // 获取折线图配置
  getChartOption(mode, data) {
    if (mode === 'monthly') {
      return {
        xAxis: {
          type: 'category',
          data: data.dates
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: data.durations,
          type: 'line'
        }]
      };
    } else {
      return {
        xAxis: {
          type: 'category',
          data: data.hours
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: data.hourlyData,
          type: 'line'
        }]
      };
    }
  },
  // 切换模式
  switchMode() {
    const newMode = this.data.mode === 'monthly' ? 'daily' : 'monthly';
    this.setData({ mode: newMode });
    this.updateChart();
  }
});