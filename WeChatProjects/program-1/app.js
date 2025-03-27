// app.js
App({
  globalData: {
    studyCount: wx.getStorageSync('studyCount') || 0 // 存储学习会话历史
  },

  onLaunch() {
    require('./pages/history-query/history-query')
    // 从本地缓存读取历史数据
    wx.getStorage({
      key: 'studyHistory',
      success: (res) => {
        this.globalData.studyHistory = res.data || []; // 如果缓存为空，初始化为空数组
      },
      fail: (err) => {
        console.error('读取本地缓存失败:', err);
        this.globalData.studyHistory = []; // 读取失败时，初始化为空数组
        wx.setStorageSync('studyHistory',[]);
      }
    });
  },

  onHide() {
    // 小程序隐藏时，将数据存储到本地
    wx.setStorage({
      key: 'studyHistory',
      data: this.globalData.studyHistory,
      success: () => {
        console.log('数据已存储到本地缓存');
      },
      fail: (err) => {
        console.error('存储本地缓存失败:', err);
      }
    });
  },

  onUnload() {
    // 小程序关闭时，将数据存储到本地
    wx.setStorage({
      key: 'studyHistory',
      data: this.globalData.studyHistory,
      success: () => {
        console.log('数据已存储到本地缓存');
      },
      fail: (err) => {
        console.error('存储本地缓存失败:', err);
      }
    });
  }
});
