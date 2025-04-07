import * as echarts from '../../../../../components/echarts/echarts.min';

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  });
  canvas.setChart(chart);

  // 从本地缓存获取数据
  const app = getApp();
  const studyHistory = app.globalData.studyHistory || [];
  
  // 按月份分组数据
  const monthlyData = this.groupDataByMonth(studyHistory);
  
  // 默认显示第一个月的数据
  const currentMonth = Object.keys(monthlyData)[0];
  const option = this.generateChartOption(monthlyData[currentMonth]);
  
  chart.setOption(option);
  
  // 添加月份切换事件
  wx.getSystemInfo({
    success: (res) => {
      const months = Object.keys(monthlyData);
      const view = wx.createSelectorQuery().in(this).select('#monthSelector');
      view.fields({ node: true }).exec((res) => {
        const selector = res[0].node;
        const picker = wx.createSelectorQuery().in(this).select('#monthPicker');
        picker.fields({ node: true }).exec((pickerRes) => {
          const pickerNode = pickerRes[0].node;
          pickerNode.set({
            range: months,
            value: months.indexOf(currentMonth)
          });
          
          pickerNode.onchange((e) => {
            const selectedMonth = months[e.detail.value];
            const newOption = this.generateChartOption(monthlyData[selectedMonth]);
            chart.setOption(newOption);
          });
        });
      });
    }
  });
  
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    },
    months: []
  },
  
  groupDataByMonth(data) {
    const groupedData = {};
    data.forEach(item => {
      const date = new Date(item.startTime);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!groupedData[monthKey]) {
        groupedData[monthKey] = [];
      }
      groupedData[monthKey].push(item);
    });
    return groupedData;
  },
  
  generateChartOption(data) {
    const dates = [];
    const durations = [];
    
    // 按日期分组并计算每天的总时长
    const dailyData = {};
    data.forEach(item => {
      const date = new Date(item.startTime);
      const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = 0;
      }
      dailyData[dateKey] += item.duration;
    });
    
    // 转换为图表数据
    Object.keys(dailyData).sort().forEach(dateKey => {
      dates.push(dateKey);
      durations.push(dailyData[dateKey] / 60); // 转换为分钟
    });
    
    return {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: dates
      },
      yAxis: {
        type: 'value',
        name: '时长（分钟）'
      },
      series: [{
        name: '学习时长',
        type: 'line',
        data: durations,
        smooth: true
      }]
    };
  }
});