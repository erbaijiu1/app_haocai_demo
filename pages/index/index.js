// pages/home/home.js
// 使用封装的request方法
const { wx_get, wx_post } = require('../../utils/wx_request.js');
const {switchTrendPage,switchPage,setWebviewUrl,switchToWebPage} = require('../../utils/url_tool.js');


Page({
    data: {
      // 可以在这里添加数据
      index_data:{}
      , hidden_ad_view: false
      , web_view_url:''
    },
          // 页面加载时的逻辑
    onLoad: function (options) {
        var web_view_url = setWebviewUrl(options, this.data.web_view_url);
        // console.log(options,web_view_url);
        if(options && options.redirect_url){
            // console.log('try to turn:', web_view_url);
            switchToWebPage({'web_view_url':web_view_url});
        }
        this.getIndexData();
    }

    , getIndexData: function(){
        wx_get('/hc_miniapp/get_index', {'req_type':''})
          .then(data => {
            // console.log(data)
            this.setData({
                index_data: data
            })
          })
          .catch(err => {
            console.error(err)
          })
      }
      ,    // 开奖走势图
      currSwitchTrendPage: function(){
        switchTrendPage()
      }
      ,SwitchMoreCwlPage:function(){
        switchPage('/pages/cwl/cwl_daily',{'activeTab':1})
      }
      ,SwitchCwlPage:function(){
        switchPage('/pages/cwl/cwl_daily',{'activeTab':0})
      }
      
      ,SwitchMoreLotteryPage:function(){
        switchPage('/pages/lottery/lottery_daily',{'activeTab':1})
      }
      ,SwitchLotteryPage:function(){
        switchPage('/pages/lottery/lottery_daily',{'activeTab':0})
      }
      
      ,SwithToSubsMain:function(){
        wx.navigateTo({
            url: '/pages/index/common_view?web_view_url=https://mp.weixin.qq.com/s/T0rE7SY5ZSayYdq78P30xg'
          });
      }

      ,onShareAppMessage: function (options) {
        return {
            title: '最新彩票开奖结果和中奖规则',
            path: '/pages/index/index'
            // path: this.route
        }
    }

    ,onShareTimeline: function () {
        return {
        title: '最新彩票开奖结果和中奖规则',
        path: '/pages/index/index'
        //   path: this.data.page_url
        }
    }


      
  ,adLoad() {
    console.log('Banner 广告加载成功')
  },
  adError(err) {
    if(err.detail && err.detail.errCode !== 1004){
        console.error('Banner 广告加载失败', err)
    }
    console.log('no ad show.')
    // 关闭广告的view
    this.setData({
        hidden_ad_view:true
    })
  },
  adClose() {
    console.log('Banner 广告关闭')
  }

})
  