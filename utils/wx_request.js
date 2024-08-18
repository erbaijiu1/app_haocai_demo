// utils/request.js
const config = {
    baseUrl: 'http://127.0.0.1:8000',
    // baseUrl: 'https://yjhcai.cn' // 设置API的基础路径
} 

const wx_request = (url, method, data, header = {}) => {
    if(data){
        data['version'] = '0.1.4'
    }
    return new Promise((resolve, reject) => {
    wx.request({
      url: config.baseUrl + url, // 拼接完整的url
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


const wx_app_login = (context) => {
// function wxLogin(context) {
    const local_app_openid = wx.getStorageSync('app_openid');
    if (local_app_openid) {
        // 将登录凭证发送到后台
        wx_request('/hc_miniapp/subs_info', 'GET',  { "app_openid": local_app_openid })
        // wx_get('/hc_miniapp/subs_info', { "app_openid": local_app_openid })
            .then(data => {
                console.log(data);
                if(data['subscribe'] !== undefined){
                    context.setData({user_subs_status:data['subscribe']});
                }
            })
            .catch(err => {
                console.error(err);
            });
        return;
    }

    // 登录
    wx.login({
        success: res => {
            if (res.code) {
                context.setData({ login_this_time: 1 });
                // 将登录凭证发送到后台
                wx_request('/hc_miniapp/login', 'GET',  { "code": res.code, 'chk_subs': 1 })
                // wx_get('/hc_miniapp/login', { "code": res.code, 'chk_subs': 1 })
                    .then(data => {
                        console.log(data);
                        if (data.app_openid) {
                            wx.setStorageSync('app_openid', data.app_openid);
                        }
                        // 使用公共函数
                        if(data['subscribe'] !== undefined){
                            context.setData({user_subs_status:data['subscribe']});
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            } else {
                console.log('登录失败！' + res.errMsg);
            }
        }
    });
}

// 导出封装的request方法
module.exports = {
  wx_get: (url, data, header) => wx_request(url, 'GET', data, header),
  wx_post: (url, data, header) => wx_request(url, 'POST', data, header),
  config
  ,wx_app_login
  // ...可以根据需要封装更多的方法如put, delete等
};