// index.js
import url_tool from '../../utils/url_tool.js';
const { wx_get, wx_post } = require('../../utils/wx_request.js');
const util = require('../../utils/util');

// 获取应用实例
const app = getApp()

Page({
  data: {
    base_web_view: app.globalData.host_name + '/trend',
    web_view_url: app.globalData.host_name + '/trend',
    page_url : '/pages/trend/trend'
        , all_kj_conf: [{
            'type_key': 'cwl', 'value':
                [{ 'key': 'ssq', 'value': '双色球' },
                { 'key': 'sd', 'value': '福彩3D' },
                { 'key': 'qlc', 'value': '七乐彩' },
                { 'key': 'qlb', 'value': '快乐8' }]
        },
        {
            'type_key': 'lottery', 'value': [{ 'key': 'dlt', 'value': '大乐透' },
            { 'key': 'pls', 'value': '排列3' },
            { 'key': 'qxc', 'value': '七星彩' },
            { 'key': 'plw', 'value': '排列5' }]
        }
        ]
    ,hidden_ad_view:false
    ,trend_data:{'check_v':0}
  },
  getTrendData: function(){
    wx_get('/hc_miniapp/trend', {'req_type':''})
      .then(data => {
        console.log(data)
        this.setData({
            trend_data: data
        })
      })
      .catch(err => {
        console.error(err)
      })
  }
  ,onLoad(options) {
    util.update_default_show(this, 'trend_data.check_v');
    // console.log("now trend data:",this.data.trend_data.check_v)
      var web_view_url = url_tool.setWebviewUrl(options, this.data.web_view_url);
      this.setData({
        web_view_url:web_view_url
      });
      this.getTrendData();
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
    var timestamp = new Date().getTime();
    this.setData({web_view_url:this.data.base_web_view + '?timestp=' + timestamp});
  }

  , onKjClick: function (event) {
    var kjType = event.currentTarget.dataset.kjtype;
    // console.log(kjType);
    if(kjType == 'sd'){
        kjType = '3d';
    }else if(kjType=='qlb'){
        kjType = 'klb';
    }

    // const app = getApp();
    const web_view_url = app.globalData.host_name + '/trend?trend_type=' + kjType;
    url_tool.switchToWebPage({'web_view_url':web_view_url});
  }



  ,adLoad() {
    console.log('Banner 广告加载成功')
  },
  adError(err) {
    if(err.detail && err.detail.errCode !== 1004){
        console.error('Banner 广告加载失败', err);
    }
    console.log('no ad show.')
    // 关闭广告的view
    this.setData({
        hidden_ad_view:true
    })
  },
  adClose() {
    console.log('Banner 广告关闭');
  }
})
