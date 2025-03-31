// pages/index/index.js
const app = getApp();
const { formatTime, formatDuration } = require('../../utils/utils');
const i18n = require('../../utils/i18n.js'); 

Page({
  data: {
    formattedTimer: '00:00:00',
    timer: null,
    startTime: null,
    studyCount: app.globalData.studyCount || 0,
    i18n: i18n.zh, // 初始化为中文
    stopwatchTimer: null, // 新增：秒表计时器
    stopwatchTime: '00:00:00', // 新增：秒表时间显示
  },

  onLoad() {
    this.drawClock();
    // 初始化国际化支持
    const systemInfo = wx.getSystemInfoSync();
    const language = systemInfo.language || 'zh'; // 获取系统语言
    this.setData({ i18n: i18n[language] || i18n.zh });
  },

  // 绘制时钟
  drawClock() {
    const ctx = wx.createCanvasContext('clockCanvas');
    const draw = () => {
      const now = new Date();
      const hours = now.getHours() % 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      ctx.clearRect(0, 0, 200, 200);
      ctx.setLineWidth(2);
      ctx.setStrokeStyle('#333');
      ctx.beginPath();
      ctx.arc(100, 100, 90, 0, 2 * Math.PI);
      ctx.stroke();

      // 绘制时针、分针、秒针
      const hourAngle = (hours + minutes / 60) * 30;
      const minuteAngle = (minutes + seconds / 60) * 6;
      const secondAngle = seconds * 6;

      this.drawLine(ctx, 100, 100, 50, hourAngle, 4, '#333');
      this.drawLine(ctx, 100, 100, 70, minuteAngle, 3, '#666');
      this.drawLine(ctx, 100, 100, 80, secondAngle, 2, '#f44336');

      ctx.draw();
    };

    setInterval(draw, 1000);
    draw();
  },

  // 绘制指针
  drawLine(ctx, x, y, length, angle, width, color) {
    const radian = (angle - 90) * Math.PI / 180;
    const endX = x + length * Math.cos(radian);
    const endY = y + length * Math.sin(radian);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.setLineWidth(width);
    ctx.setStrokeStyle(color);
    ctx.stroke();
  },

  // 开始计时
  startTimer() {
    // 同时启动主计时器和秒表
    if (this.data.timer) return;

    // 主计时器逻辑
    const startTime = Date.now();
    this.setData({ startTime });
    this.data.timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      this.setData({ formattedTimer: this.formatElapsedTime(elapsed) });
    }, 1000);

    // 秒表逻辑
    let stopwatchElapsed = 0;
    this.setData({
      stopwatchTimer: setInterval(() => {
        stopwatchElapsed += 1000;
        this.setData({ stopwatchTime: this.formatElapsedTime(stopwatchElapsed) });
      }, 1000)
    });

    wx.showToast({ title: '计时与秒表已启动', icon: 'success' });
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

    // 停止主计时器
    clearInterval(this.data.timer);
    this.setData({ timer: null });

    // 停止秒表
    clearInterval(this.data.stopwatchTimer);
    this.setData({ 
      stopwatchTimer: null,
      stopwatchTime: '00:00:00'
    });

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

    // 添加到全局数据
    app.globalData.studyHistory = app.globalData.studyHistory || [];
    app.globalData.studyHistory.unshift(session);

    // 更新学习次数
    app.globalData.studyCount = (app.globalData.studyCount || 0) + 1;
    wx.setStorageSync('studyCount', app.globalData.studyCount);

    // 存储到本地缓存
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

  // 开始秒表计时
  startStopwatch() {
    if (this.data.stopwatchTimer) return;

    let elapsed = 0;
    this.setData({ 
      stopwatchTimer: setInterval(() => {
        elapsed += 1000;
        const formatted = this.formatElapsedTime(elapsed);
        this.setData({ stopwatchTime: formatted });
      }, 1000) 
    });

    wx.showToast({ title: '秒表开始', icon: 'success' });
  },

  // 结束秒表计时
  endStopwatch() {
    clearInterval(this.data.stopwatchTimer); // 清除计时器
    this.setData({ 
      stopwatchTimer: null, 
      stopwatchTime: '00:00:00' 
    });
    wx.showToast({ title: '秒表停止', icon: 'success' });
  },

  // 页面卸载时清理计时器
  onUnload() {
    if (this.data.stopwatchTimer) {
      clearInterval(this.data.stopwatchTimer);
    }
  },

  // 跳转到历史查询页面
  navigateToHistoryQuery() {
    wx.navigateTo({
      url: '/pages/history-query/history-query'
    });
  },

  // 跳转到笔记页面
  navigateToNote() {
    wx.navigateTo({
      url: '/pages/note/note'
    });
  },

  // 格式化计时时间
  formatElapsedTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
});