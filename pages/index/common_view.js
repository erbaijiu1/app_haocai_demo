// index.js
import url_tool from '../../utils/url_tool.js';

// 获取应用实例
const app = getApp()

Page({
  data: {
    base_web_view : app.globalData.host_name + '/index',
    // web_view_url: app.globalData.host_name + '/index',
    web_view_url: 'https://mp.weixin.qq.com/s/T0rE7SY5ZSayYdq78P30xg',
    page_url : '/pages/index/index'
  },
  onLoad(options) {
      web_view_url = this.data.web_view_url
    if(options && options.web_view_url){
        web_view_url = options.web_view_url;
        web_view_url = decodeURIComponent(options.web_view_url);
    }
    //   var web_view_url = this.data.web_view_url
    // console.log("common options:", options);
    var web_view_url = url_tool.setWebviewUrl(options, web_view_url);
    this.setData({
        web_view_url: web_view_url
    });
    // console.log(web_view_url);
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
    //this.setData({web_view_url:this.data.base_web_view + '?timestp=' + timestamp});
  }
  ,onTabItemTap: function(item) {
    // console.log(item.index)
    var timestamp = new Date().getTime();
    this.setData({web_view_url:this.data.base_web_view + '?timestp=' + timestamp});
  }
  
//   ,onShareTimeline: function () {
//     return {
//       title: '最新彩票开奖结果和中奖规则',
//       path: this.data.page_url
//     }
//   }
})
