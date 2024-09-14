const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function update_default_show(context, data_name) {
    const currentDate = new Date();
    const cutoffDate = new Date('2024-09-15');
    if (currentDate <= cutoffDate) {
        context.setData({[data_name]:1});
    }
}

module.exports = {
  formatTime
  ,update_default_show
}
