// index.js
import url_tool from '../../utils/url_tool.js';

// 获取应用实例
const app = getApp()

Page({
  data: {
    base_web_view: app.globalData.host_name + '/trend',
    web_view_url: app.globalData.host_name + '/trend',
    page_url : '/pages/trend/trend'
  },
  onLoad(options) {
      var web_view_url = url_tool.setWebviewUrl(options, this.data.web_view_url);
      this.setData({
        web_view_url:web_view_url
      });
  }
  ,onShareAppMessage: function (options) {
    var path_url = url_tool.genShareInfo(options.webViewUrl, this.data.page_url);

    return {
      title: '下一个彩票大奖就是你',
      path: path_url
    }
  }
  ,onShow: function() {
    // 在页面显示时执行刷新操作
    var timestamp = new Date().getTime();
    this.setData({web_view_url:this.data.base_web_view + '?timestp=' + timestamp});
  }
})
