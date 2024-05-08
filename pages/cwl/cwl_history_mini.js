// 使用封装的request方法
const { wx_get, wx_post } = require('../../utils/wx_request.js');

Page({
  data: {
    tabs: [],
    activeTab: 0,
    cwl_data:{}
    ,prizeGrades:{1:'一等奖', 2:'二等奖',3:'三等奖',4:'四等奖',5:'五等奖',6:'六等奖'}
    ,expandStatus: {}

  }
  ,onLoad() {
      const titles = ['球A', '球B', '球C', '球D']
      const tabs = titles.map(item => ({ title: item }))
      this.setData({ tabs })

      this.getKjHistory('cwl', '', '')

      // 初始化 expandStatus 对象,将所有列表项设置为折叠状态
      this.initExpandStatus();
  },

  onListDataClick(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      [`expandStatus[${index}]`]: !this.data.expandStatus[index]
    });
  },

    initExpandStatus() {
        const expandStatus = {};
        for (const [key, _] of Object.entries(this.data.cwl_data)) {
            expandStatus[key] = false;
        }
        this.setData({
            expandStatus
        });
    }

  ,onTabCLick(e) {
    const index = e.detail.index
    this.setData({activeTab: index})
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({activeTab: index})
  }

  ,getKjHistory: function(kj_type, sub_type, max_issue){
    wx_get('/hc_miniapp/get_kj_history', {'kj_type':kj_type, 'sub_type':sub_type, 'max_issue':max_issue})
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
