// pages/index/index.js
const app = getApp();
const { formatTime, formatDuration } = require('../../utils/utils');

Page({
  data: {
    message: '', // 用于显示提示信息
    currentSession: null, // 当前学习会话的信息
    startTime: null
  },

  onLoad() {
    // 初始化时只保留必要的数据
    this.setData({
      message: '准备就绪'
    });
  },

  // 页面卸载时保存当前会话
  onUnload() {
    if (this.data.startTime) {
      this._saveSession();
    }
  },

  // 开始计时
  startTimer() {
    const startTime = new Date().getTime();
    this.setData({
      startTime: startTime,
      currentSession: { 
        startTime: formatTime(startTime) 
      },
      message: '⏳ 学习已开始'
    });
    wx.showToast({
      title: '计时开始',
      icon: 'success'
    });
  },

  // 结束计时
  endTimer() {
    const app = getApp()
    
    // 更新全局计数
    app.globalData.studyCount += 1
    wx.setStorageSync('studyCount', app.globalData.studyCount)
  
    // 更新页面数据
    this.setData({
      studyCount: app.globalData.studyCount,
      currentSession: null
    });

    // 保存会话记录
    this._saveSession();

    // 更新界面状态
    this.setData({
      startTime: null,
      currentSession: null,
      message: '✅ 学习已结束'
    });

    wx.showToast({
      title: '计时已保存',
      icon: 'success'
    });
  },

  // 跳转到历史查询页面
  navigateToHistoryQuery() {
    wx.navigateTo({
      url: '/pages/history-query/history-query'
    });
  },

  // 私有方法：保存会话记录
  _saveSession() {
    try {
      const endTime = Date.now();
      const duration = endTime - this.data.startTime;
      
      const newRecord = {
        startTime: this.data.startTime,
        endTime: endTime,
        duration: duration
      };

      // 初始化数据结构
      if (!app.globalData.studyHistory) {
        app.globalData.studyHistory = [];
      }

      // 添加新记录
      app.globalData.studyHistory.push(newRecord);

      // 同步存储
      wx.setStorageSync('studyHistory', app.globalData.studyHistory);
      
      // 更新提示信息
      this.setData({
        message: `本次学习时长：${formatDuration(duration)}`
      });

    } catch (e) {
      console.error('保存会话失败:', e);
      wx.showToast({
        title: '保存失败',
        icon: 'error'
      });
    }
  }
});