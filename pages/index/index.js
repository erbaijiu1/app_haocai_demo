// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
    ,web_view_url:'https://www.yjhcai.cn/index'
  }
  // 事件处理函数
  ,bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad(options) {
      console.log("get options:" + options);
      var my_token = wx.getStorageSync('token');
      var login_id = wx.getStorageSync('login_id');
      if(options && options.token && options.login_id){
        wx.setStorageSync('token', options.token);
        wx.setStorageSync('login_id', options.login_id);
        my_token = options.token;
        login_id = options.login_id;
      }

      var web_view_url = 'https://www.yjhcai.cn/index';
      if(options && options.redirect_url && options.redirect_url.length > 3){
        web_view_url = decodeURIComponent(options.redirect_url);
      }
      // 如果有token, 加上token 判断链接中是否已经存在参数
      if(my_token && login_id){
        var url_str = "token=" + my_token + "&login_id=" + login_id;
        if (web_view_url.includes('?')) {
            web_view_url += '&' + url_str;
        } else {
            web_view_url += '?' + url_str;
        }
      }

      this.setData({
        web_view_url:web_view_url
      });
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
  ,onShareAppMessage: function (options) {
    var encodedUrl = encodeURIComponent(options.webViewUrl);
    // console.log(encodedUrl);
    return {
      title: '下一个彩票大奖就是你',
      path: '/pages/index/index?redirect_url=' + encodedUrl
    }
  }
  
  ,onShareTimeline: function () {
    return {
      title: '下一个彩票大奖就是你',
      path: '/pages/index/index'
    }
  }
})
