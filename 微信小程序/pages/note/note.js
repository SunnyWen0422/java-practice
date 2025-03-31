Page({
  data: {
    selectedDate: '', // 当前选中的日期
  },

  onLoad() {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    this.setData({ selectedDate: formattedDate });
  },

  onDateChange(e) {
    const selectedDate = e.detail.value;
    this.setData({ selectedDate });
    wx.navigateTo({
      url: `/pages/notebook/notebook?date=${selectedDate}`,
    });
  },
});