import * as echarts from 'echarts';
const app = getApp();
const { formatTime, formatDuration } = require('../../utils/utils');
const i18n = require('../../utils/i18n.js'); 

Page({
  data: {
    ec: {
      onInit: () => this.initChart // 使用箭头函数确保 this 的上下文正确
    },
    formattedTimer: '00:00:00',
    timer: null,
    startTime: null,
    studyCount: app.globalData.studyCount || 0,
    i18n: i18n.zh, // 初始化为中文
  },

  onLoad() {
    this.drawClock();
    // 更新后的国际化初始化
    const appBaseInfo = wx.getAppBaseInfo();
    const language = appBaseInfo.language || 'zh';
    this.setData({ i18n: i18n[language] || i18n.zh });
  },

  // 绘制时钟
  drawClock() {
    const query = wx.createSelectorQuery()
    query.select('#clockCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        
        // 设置画布分辨率
        const windowInfo = wx.getWindowInfo();
        const dpr = windowInfo.pixelRatio;
        canvas.width = 200 * dpr;
        canvas.height = 200 * dpr;
        ctx.scale(dpr, dpr);

        const draw = () => {
          const now = new Date();
          const hours = now.getHours() % 12;
          const minutes = now.getMinutes();
          const seconds = now.getSeconds();

          ctx.clearRect(0, 0, 200, 200);
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#333';
          ctx.beginPath();
          ctx.arc(100, 100, 90, 0, 2 * Math.PI);
          ctx.stroke();

          // 绘制指针逻辑保持不变
          const hourAngle = (hours + minutes / 60) * 30;
          const minuteAngle = (minutes + seconds / 60) * 6;
          const secondAngle = seconds * 6;

          this.drawLine(ctx, 100, 100, 50, hourAngle, 4, '#333');
          this.drawLine(ctx, 100, 100, 70, minuteAngle, 3, '#666');
          this.drawLine(ctx, 100, 100, 80, secondAngle, 2, '#f44336');
        };

        setInterval(draw, 1000);
        draw();
      });
  },

  // 修改后的绘制指针方法（参数类型保持一致）
  drawLine(ctx, x, y, length, angle, width, color) {
    const radian = (angle - 90) * Math.PI / 180;
    const endX = x + length * Math.cos(radian);
    const endY = y + length * Math.sin(radian);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();
  },

  // 开始计时
  startTimer() {
    if (this.data.timer) return;

    const startTime = Date.now();
    this.setData({ startTime });
    this.data.timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      this.setData({ formattedTimer: this.formatElapsedTime(elapsed) });
    }, 1000);
    wx.showToast({ title: '计时已启动', icon: 'success' });
  },

  // 格式化会话数据
  formatSessionData(startTime, endTime) {
    return {
      startTime,
      endTime,
      duration: endTime - startTime
    };
  },

  // 结束计时
  endTimer() {
    if (!this.data.timer) return;

    clearInterval(this.data.timer);
    this.setData({ timer: null });

    try {
      this._saveSession();
      wx.showToast({ title: '计时已保存', icon: 'success' });
    } catch (error) {
      console.error('保存失败:', error);
      wx.showToast({ title: '保存失败', icon: 'none' });
    }

    this.setData({ formattedTimer: '00:00:00' });
  },

  // 保存会话记录
  _saveSession() {
    const { startTime } = this.data;
    if (!startTime) return;

    const endTime = Date.now();
    const session = this.formatSessionData(startTime, endTime);

    app.globalData.studyHistory = app.globalData.studyHistory || [];
    app.globalData.studyHistory.unshift(session);

    app.globalData.studyCount = (app.globalData.studyCount || 0) + 1;
    wx.setStorageSync('studyCount', app.globalData.studyCount);

    wx.setStorage({
      key: 'studyHistory',
      data: app.globalData.studyHistory,
      success: () => {
        console.log('会话记录已保存');
      },
      fail: (err) => {
        throw new Error('存储会话记录失败:', err);
      }
    });
  }, 

  onUnload() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
  },

  navigateToHistoryQuery() {
    wx.navigateTo({
      url: '/pages/history-query/history-query'
    });
  },

  navigateToNote() {
    wx.navigateTo({
      url: '/pages/note/note'
    });
  },

  formatElapsedTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  },

  initChart(canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr
    });
    canvas.setChart(chart);

    const option = {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: 'Temperature',
        type: 'line',
        data: [120, 132, 101, 134, 90, 230, 210]
      }]
    };

    chart.setOption(option);
    return chart;
  }
});