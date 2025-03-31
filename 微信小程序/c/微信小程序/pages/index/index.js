// pages/index/index.js
const { formatTime, formatDuration } = require('../../utils/utils');
const i18n = require('../../utils/i18n.js'); // 引入国际化模块

Page({
  data: {
    formattedTimer: '00:00:00',
    timer: null,
    startTime: null,
    studyCount: wx.getStorageSync('studyCount') || 0, // 直接从缓存获取学习次数
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
  },

  // 绘制指针
  drawLine(ctx, x, y, length, angle, width, color) {
  },

  // 开始计时
  startTimer() {
    if (this.data.timer) return;

    const startTime = Date.now();
    this.setData({ startTime });

    this.data.timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const formatted = this.formatElapsedTime(elapsed);
      this.setData({ formattedTimer: formatted });
    }, 1000);

    this.startStopwatch(); // 启动秒表
    wx.showToast({ title: '计时开始', icon: 'success' });
  },

  // 结束计时
  endTimer() {
    clearInterval(this.data.timer);
    this.setData({ timer: null, formattedTimer: '00:00:00' });

    this.endStopwatch(); // 停止秒表

    try {
      this._saveSession();
      wx.showToast({ title: '计时已保存', icon: 'success' });
    } catch (error) {
      console.error('保存会时记录失败:', error);
      wx.showToast({ title: '保存失败，请重试', icon: 'none' });
    }
  },

  // 保存会话记录
  _saveSession() {
    const { startTime } = this.data;
    if (!startTime) return;

    const endTime = Date.now();
    const session = this.formatSessionData(startTime, endTime);

    // 更新全局数据和本地缓存
    let studyHistory = wx.getStorageSync('studyHistory') || [];
    studyHistory.unshift(session);
    wx.setStorageSync('studyHistory', studyHistory);

    // 更新学习次数
    const studyCount = wx.getStorageSync('studyCount') || 0;
    wx.setStorageSync('studyCount', studyCount + 1);
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
    clearInterval(this.data.stopwatchTimer);
    this.setData({ stopwatchTimer: null, stopwatchTime: '00:00:00' });
    wx.showToast({ title: '秒表停止', icon: 'success' });
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