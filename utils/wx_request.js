// utils/request.js
const baseUrl = 'https://yjhcai.cn'; // 设置API的基础路径
// const baseUrl = 'http://127.0.0.1:8000'; // 设置API的基础路径

const wx_request = (url, method, data, header = {}) => {
    if(data){
        data['version'] = '0.1.2'
    }
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url, // 拼接完整的url
      method: method,
      data: data,
      headers: {
        'Content-Type': 'application/json', // 设置请求的 header
        ...header,
      },
      success(res) {
        const { statusCode, data } = res;
        if (statusCode >= 200 && statusCode < 300) {
          // 请求成功的处理
          resolve(data);
        } else {
          // 可以根据项目需求处理HTTP错误
          reject(`网络请求错误，状态码${statusCode}`);
        }
      },
      fail(err) {
        // 请求失败的处理
        reject(err);
      }
    });
  });
};

// 导出封装的request方法
module.exports = {
  wx_get: (url, data, header) => wx_request(url, 'GET', data, header),
  wx_post: (url, data, header) => wx_request(url, 'POST', data, header),
  // ...可以根据需要封装更多的方法如put, delete等
};