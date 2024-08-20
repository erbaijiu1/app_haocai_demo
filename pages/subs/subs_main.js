// index.js
import url_tool from '../../utils/url_tool.js';

// 获取应用实例
const app = getApp()

Page({
  data: {
    base_web_view: app.globalData.host_name + '/subs_main',
    web_view_url: app.globalData.host_name + '/subs_main',
    page_url : '/pages/subs/subs_main'
  },
  onLoad(options) {
      var web_view_url = url_tool.setWebviewUrl(options, this.data.web_view_url);
      const local_app_openid = wx.getStorageSync('app_openid');
    //   console.log("local_app_openid:", local_app_openid)
      if(local_app_openid){
        if (web_view_url.includes('?')) {
            web_view_url += '&app_openid=' + local_app_openid;
        } else {
            web_view_url += '?app_openid=' + local_app_openid;
        }
      }
      this.setData({
        web_view_url:web_view_url
      });
  }
  ,onShareAppMessage: function (options) {
    var path_url = url_tool.genShareInfo(options.webViewUrl, this.data.page_url);

    return {
      title: '最新彩票开奖结果和中奖规则',
      path: path_url
    }
  }
  ,onShow: function() {
    // 在页面显示时执行刷新操作
    var timestamp = new Date().getTime();
    // this.setData({web_view_url:this.data.base_web_view + '?timestp=' + timestamp});
  }
  ,onTabItemTap: function(item) {
    // console.log(item.index)
    var web_view_url = this.data.web_view_url;
    var addCmd = "?";
    if(web_view_url.indexOf('?')>0){
        addCmd = '&';
    }
    var timestamp = new Date().getTime();
    web_view_url += addCmd + 'timestp=' + timestamp;
    this.setData({web_view_url:web_view_url});
  }
})
