// 使用封装的request方法
const { wx_get, wx_post } = require('../../utils/wx_request.js');

Page({
  data: {
    tabs: [],
    activeTab: 0,
    cwl_data:{}
    ,prizeGrades:{1:'一等奖', 2:'二等奖',3:'三等奖',4:'四等奖',5:'五等奖',6:'六等奖'}
    ,isLoading : false
    ,kj_type:'cwl'
    ,kjContextMap:{}
    ,detailRuleShowMap:{}
    ,check_v:0
  }
  ,onLoad() {
    //   const tabs = [{title:'ball A', kj_type:'dlt'},{title:'ball B', kj_type:'pls'},{title:'ball C', kj_type:'plw'},{title:'ball D', kj_type:'qxc'}]
    const tabs = [{title:'双色球', sub_type:'ssq'},{title:'福彩3D', sub_type:'3d'},{title:'七乐彩', sub_type:'qlc'},{title:'快乐8', sub_type:'kl8'}]
      this.setData({ tabs })

      this.getKjHistory(this.data.kj_type, '', '', 5)

      // 初始化 expandStatus 对象,将所有列表项设置为折叠状态, 这个默认为空就行
    //   this.initExpandStatus();
  },

  onListDataClick(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      [`expandStatus[${index}]`]: !this.data.expandStatus[index]
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

  ,getKjHistory: function(kj_type, sub_type, max_issue, page_size=10){
    wx_get('/hc_miniapp/get_kj_history', {'kj_type':kj_type, 'sub_type':sub_type, 'max_issue':max_issue
            , 'page_size':page_size})
      .then(data => {
        // console.log(data)
        this.setData({
            // cwl_data: data
        })
        this.setQueryContext(data)
        if(data['check_v']){
            this.setData({check_v:data['check_v']});
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

//   更新查询上下文，用于分页查询
    , setQueryContext(data) {
        for (let key in data) {
            const item_his = data[key].his_list;
            if (item_his && item_his.length > 0) {
                const lastItem = item_his[item_his.length - 1];
                this.setData({
                    [`kjContextMap.${key}.maxIssue`]: lastItem.Fissue,
                });
                if(this.data.cwl_data[key]){
                    this.setData({
                        [`cwl_data.${key}.his_list`]: [...this.data.cwl_data[key].his_list, ...item_his]
                    });
                }
                else{
                    if(key != 'check_v'){
                        this.setData({
                            [`cwl_data.${key}`]: data[key]
                        });
                    }
                }
            } 
            this.setData({
                [`kjContextMap.${key}.isTheEnd`]: data[key].is_the_end
            });
        }
  }

    // 到达底部更新
    ,loadMoreClick(){
    // , onReachBottom() {
        // console.log("loadMoreClick")
        if (!this.data.isLoading) {
            this.loadMoreData();
        }
    },

    loadMoreData() {
        this.setData({
            isLoading: true // 设置 isLoading 为 true
        });

        wx.showLoading({
            title: '更多数据加载中...'
        });

        // 模拟从服务器获取更多数据
        const sub_type = this.data.tabs[this.data.activeTab].sub_type
        // kjContextMap.${key}.minIssue
        var max_issue = '';
        if(this.data.kjContextMap[sub_type] && this.data.kjContextMap[sub_type].maxIssue){
            max_issue = this.data.kjContextMap[sub_type].maxIssue
        }
        // console.log(max_issue, this.data.kjContextMap.sub_type)
        setTimeout(() => {
            this.getKjHistory(this.data.kj_type, sub_type, max_issue )
            wx.hideLoading();
            this.setData({
                isLoading: false // 设置 isLoading 为 false
            });
        }, 3000);
    }

    // 展示明细开奖规则点击
    , showDetailClick: function (event) {
        var clickid = event.currentTarget.dataset.clickid;
        // console.log(clickid)
        // 首先复制当前的 detailRuleShowMap
        var newMap = { ...this.data.detailRuleShowMap };

        // 检查 clickid 是否已存在
        if (newMap[clickid]) {
            // 如果已存在，删除该属性
            delete newMap[clickid];
        } else {
            // 如果不存在，添加该属性并设置为 1
            newMap[clickid] = 1;
        }

        // 更新数据
        this.setData({
            detailRuleShowMap: newMap
        });

    }


})
