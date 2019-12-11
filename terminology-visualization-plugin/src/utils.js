const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
exports.getCurrentTime = function () {
  const time = new Date();
  const year = time.getFullYear();
  const month = MONTHS[time.getMonth()];
  const day = time.getDate();
  const hour = `0${time.getHours()}`.slice(-2);
  const minute = `0${time.getMinutes()}`.slice(-2);
  return `${day} ${month} ${year} at ${hour}:${minute}`;
};