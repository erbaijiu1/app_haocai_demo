// 使用封装的request方法
const { wx_get, wx_post } = require('../../utils/wx_request.js');

Page({
  data: {
    tabs: [],
    activeTab: 0,
    lottery_data:{}
    ,prizeGrades:{1:'一等奖', 2:'二等奖',3:'三等奖',4:'四等奖',5:'五等奖',6:'六等奖',7:'七等奖',8:'八等奖',9:'九等奖'}
    , hidden_ad_view: true

    ,main_type : 'dlt'
    ,web_view_url: 'https://mp.weixin.qq.com/s/T0rE7SY5ZSayYdq78P30xg'
  }
  , setTabs(titles){
    const tabs = titles.map(item => ({title: item}))
    this.setData({tabs})
  }
  ,onLoad(options) {
      const titles = ['超级大乐透', '全部体彩']
      const tabs = titles.map(item => ({ title: item }))
      this.setData({ tabs })

      this.getDailyData()

      if (options.activeTab) {
          this.setData({
              activeTab: parseInt(options.activeTab, 10)
          });
      }else{
        this.checkActive()
      }
  },

  onTabCLick(e) {
    const index = e.detail.index
    this.setData({activeTab: index})
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({activeTab: index})
  }

  ,getDailyData: function(){
    wx_get('/hc_miniapp/get_kj_info', {'req_type':'lottery'})
      .then(data => {
        // console.log(data)
        this.setData({
            lottery_data: data
        })
        if(data['check_v']==1){
            const titles = ['全部福彩']
            this.setTabs(titles)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }
    // 开奖走势图
    , goToTrendPage() {
        wx.switchTab({
          url: '/pages/trend/trend'
        })
      }
    //   体彩开奖历史
     , goToCWLHistoryPage() {
        wx.navigateTo({
          url: '/pages/lottery/lottery_history_mini'
        })
      }

      ,checkActive(){
        const app = getApp();
        if(app.globalData&&app.globalData.hasOwnProperty('activeTab')){
            this.setData({
                activeTab: parseInt(app.globalData.activeTab, 10)
            });
            delete app.globalData.activeTab
        }
      }

    ,onShareAppMessage: function (options) {
        return {
            title: '最新彩票开奖结果和中奖规则',
            path: '/pages/lottery/lottery_daily?activeTab='+this.data.activeTab
            // path: this.route
        }
    }

    ,onShareTimeline: function () {
        return {
        title: '最新彩票开奖结果和中奖规则',
        path: '/pages/lottery/lottery_daily?activeTab='+this.data.activeTab
        //   path: this.data.page_url
        }
    }
    ,onShow: function() {
        this.getDailyData();
        this.checkActive();
    }


  // 广告相关的位置
  // ,adLoad() {
  //   console.log('Banner 广告加载成功')
  // },
  // adError(err) {
  //   if(err.detail && err.detail.errCode !== 1004){
  //       console.error('Banner 广告加载失败', err)
  //   }
  //   console.log('no ad show.')
  //   // 关闭广告的view
  //   this.setData({
  //       hidden_ad_view:true
  //   })
  // },
  // adClose() {
  //   console.log('Banner 广告关闭')
  // }

})
