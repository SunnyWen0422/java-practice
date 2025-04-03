// app.js
App({
    globalData: {
      studyCount: wx.getStorageSync('studyCount') || 0 // 存储学习会话历史
    },
  
    onLaunch() {
      wx.getStorage({
        key: 'studyHistory',
        success: (res) => {
          this.globalData.studyHistory = res.data || [];
        },
        fail: (err) => {
          console.error('读取本地缓存失败:', err);
          this.globalData.studyHistory = [];
          wx.setStorageSync('studyHistory', []);
          wx.showToast({ title: '读取历史记录失败，请重试', icon: 'none' }); // 用户提示
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
    }
  });