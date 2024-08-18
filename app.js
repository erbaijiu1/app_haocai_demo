// app.js
const { config } = require('./utils/wx_request.js');

App({
    onLaunch() {
        // 展示本地存储能力

        // // 登录
        // wx.login({
        //   success: res => {
        //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //   }
        // })

    },
    globalData: {
        host_name:config.baseUrl
    }
})
