Component({
    properties: {
      text: {
        type: String,
        value: ''
      }
    }
    ,data:{
        hidden_ad_view : false

    }
    , methods: {
        adLoad() {
            console.log('Banner 广告加载成功')
        },
        adError(err) {
            if (err.detail && err.detail.errCode !== 1004) {
                console.error('Banner 广告加载失败', err);
            }
            console.log('no ad show.')
            // 关闭广告的view
            this.setData({
                hidden_ad_view: true
            })
        },
        adClose() {
            console.log('Banner 广告关闭');
        }
    }

  });
  