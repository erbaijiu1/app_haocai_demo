// index.js
import url_tool from '../../utils/url_tool.js';

// 获取应用实例
const app = getApp()

Page({
  data: {
    web_view_url:'https://www.yjhcai.cn/cwl_daily',
    page_url : '/pages/cwl/cwl_daily'
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
})
