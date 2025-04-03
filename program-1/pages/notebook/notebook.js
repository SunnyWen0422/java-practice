const app = getApp();

Page({
  data: {
    selectedDate: '',
    totalDuration: '0秒',
    noteContent: '', // 笔记内容
  },

  onLoad(options) {
    const selectedDate = options.date;
    const studyHistory = app.globalData.studyHistory || [];
    const dailyRecords = studyHistory.filter(item => {
      const date = new Date(item.startTime);
      const formattedItemDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      return formattedItemDate === selectedDate;
    });

    const totalDuration = dailyRecords.reduce((sum, item) => sum + (item.duration || 0), 0);

    this.setData({
      selectedDate,
      totalDuration: this.formatDuration(totalDuration),
      noteContent: wx.getStorageSync(selectedDate) || '', // 加载笔记内容
    });
  },

  onNoteInput(e) {
    this.setData({ noteContent: e.detail.value });
  },

  saveNote() {
    const { selectedDate, noteContent } = this.data;
    wx.setStorageSync(selectedDate, noteContent);
    wx.showToast({ title: '笔记已保存', icon: 'success' });
  },

  deleteNote() {
    const { selectedDate } = this.data;
    wx.removeStorageSync(selectedDate);
    this.setData({ noteContent: '' });
    wx.showToast({ title: '笔记已删除', icon: 'success' });
  },

  formatDuration(duration) {
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);

    const parts = [];
    if (hours > 0) parts.push(`${hours}小时`);
    if (minutes > 0) parts.push(`${minutes}分钟`);
    if (seconds > 0) parts.push(`${seconds}秒`);

    return parts.join('') || '0秒';
  },
});