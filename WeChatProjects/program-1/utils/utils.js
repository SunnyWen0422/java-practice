// utils/utils.js
function formatTime(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 增加数值安全处理
function formatDuration(duration) {
  duration = Number(duration) || 0; // 强制转换为数字
  const hours = Math.floor(duration / 3600000);
  const minutes = Math.floor((duration % 3600000) / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);

  // 优化显示格式
  return [
    hours > 0 ? `${hours}小时` : '',
    minutes > 0 ? `${minutes}分钟` : '',
    seconds > 0 ? `${seconds}秒` : ''
  ].filter(Boolean).join('') || '0秒';
}

module.exports = {
  formatTime,
  formatDuration
};
