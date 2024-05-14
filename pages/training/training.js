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
    ,web_view_url: app.globalData.host_name + '/training',
  }
  // 事件处理函数
  ,bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  handle_html_msg: function(e) {
    console.log("handle_html_msg active.");
    // 获取从网页发送过来的消息
    const data = e.detail.data;
      if (data && data.length > 0) {
          console.log("get msg:", data);
          // 读取最后一条消息
          const lastMessage = data[data.length - 1];
          // 空值检查并获取 token 和 login_id
          let token = null;
          let login_id = null;
          if (lastMessage && lastMessage.cookies_data) {
              token = lastMessage.cookies_data.token;
              login_id = lastMessage.cookies_data.login_id;
          }
          if(token && login_id){
            wx.setStorageSync('token', token);
            wx.setStorageSync('login_id', login_id);
          }
    } else {
        console.error('接收到的消息数据为空或无效');
    }},
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
  // ,onShareAppMessage: function () {
  //   return {
  //     title: '最新彩票开奖结果和中奖规则',
  //     query: '/pages/index/index'
  //   }
  // }

  // 在onShareAppMessage事件方法中，处理H5页面发送的消息
  , onShareAppMessage: function (res) {
    // 获取H5页面发送的消息
    var data = res.data;

    // 生成分享信息
    var shareData = {
      title: data.title,
      desc: data.desc,
      imgUrl: data.imgUrl,
      url: data.url,
    };

    // 调起小程序分享
    wx.showShareMenu({
      shareData: shareData,
    });
  }

  /*
  ,onShareTimeline: function () {
    return {
      title: '最新彩票开奖结果和中奖规则',
      path:  app.globalData.host_name + '/index'
    }
  }*/
})
