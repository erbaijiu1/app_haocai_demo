// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }

  /* 
  // 后续如果想加菜单，可以这样加
   "tabBar": {
    "color": "#7A7E83",
    "selectedColor": "#D85E5B",
    "borderStyle": "black",
    "backgroundColor": "#ffffff",
    "list": [
      { "text": "首页", "pagePath": "pages/index/index",
        "iconPath": "img/memu/index1.png",
        "selectedIconPath": "img/memu/index2.png" },
      { "text": "福彩开奖", "pagePath": "pages/cwl/cwl_daily",
        "iconPath": "img/memu/fucai1.png",
        "selectedIconPath": "img/memu/fucai2.png" },
      { "text": "体彩开奖", "pagePath": "pages/lottery/lottery_daily",
        "iconPath": "img/memu/ticai1.png",
        "selectedIconPath": "img/memu/ticai2.png" }
      ,{ "text": "我的", "pagePath": "pages/subs/subs_main",
        "iconPath": "img/memu/my1.png",
        "selectedIconPath": "img/memu/my2.png" }
    ]
  }
  */
})
