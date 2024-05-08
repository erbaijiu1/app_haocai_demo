// 使用封装的request方法
const { wx_get, wx_post } = require('../../utils/wx_request.js');

Page({
  data: {
    tabs: [],
    activeTab: 0,
    cwl_data:{}
    ,prizeGrades:{1:'一等奖', 2:'二等奖',3:'三等奖',4:'四等奖',5:'五等奖',6:'六等奖'}
  }
  ,onLoad() {
    const titles = ['双色球', '全部福彩']
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
