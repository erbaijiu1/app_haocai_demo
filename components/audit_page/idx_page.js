Component({
    properties: {
      adUnitId: {  // 新增广告 ID 属性
        type: String,
        value: 'adunit-7db788ce96da52cf' // 默认值
      }
    }
    ,data:{
        hidden_ad_view : false
    }
    , methods: {
        doSwitchTab() {
            wx.switchTab({
              url: '/pages/subs/subs_main'
            })
        }
    }

  });
  