// index.js
import url_tool from '../../utils/url_tool.js';

// 获取应用实例
const app = getApp()

Page({
  data: {
    base_web_view : app.globalData.host_name + '/training',
    web_view_url: app.globalData.host_name + '/training',
    page_url : '/pages/lottery/training'
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
      title: '最新彩票开奖结果和中奖规则',
      path: path_url
    }
  }
  
  ,onShow: function() {
    // 在页面显示时执行刷新操作
    // var timestamp = new Date().getTime();
    // this.setData({web_view_url:this.data.base_web_view + '?timestp=' + timestamp});
  }
  ,onTabItemTap: function(item) {
    // console.log(item.index)
    var timestamp = new Date().getTime();
    this.setData({web_view_url:this.data.base_web_view + '?timestp=' + timestamp});
  }
})
