// 使用封装的request方法
const { wx_get, wx_post } = require('../../utils/wx_request.js');

Page({
  data: {
    tabs: [],
    activeTab: 0,
    cwl_data:{}
    ,prizeGrades:{0:'一等奖', 1:'二等奖',2:'三等奖',3:'四等奖',4:'五等奖',5:'六等奖',6:'七等奖'}
  }
  ,onLoad() {
    const titles = ['不却A', '全部精彩']
    const tabs = titles.map(item => ({title: item}))
    this.setData({tabs})

    this.getCwlData()
  },

  onTabCLick(e) {
    const index = e.detail.index
    this.setData({activeTab: index})
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({activeTab: index})
  }

  ,getCwlData: function(){
    wx_get('/hc_miniapp/get_kj_info', {'req_type':'cwl'})
      .then(data => {
        console.log(data)
        this.setData({
            cwl_data: data
        })
      })
      .catch(err => {
        console.error(err)
      })
  }
  

  


})
