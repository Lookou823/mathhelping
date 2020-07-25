Page({
  data: {
    // 测试数据
  
    scene:"",
    detail: [],
    curIndex: 0,
    isScroll: false,
    toView: 'z11',
    knowledgeList:[]
  },

  onLoad: function (options) {
  

    let that = this;




    wx.cloud.callFunction({
      name: 'kn-get',

      success: function (res) {

        console.log("res=", res.data)


      },

      fail: err => {
        wx.showToast({
          title: '查询失败',
          icon: 'none',
        })
      },
      complete: res => {
        console.log('callFunction test result: ', res.result.data)
        that.setData({

          knowledgeList: res.result.data
        })
        // 将数据转换为json类型
        // that.data.styleList = JSON.stringify(that.data.styleList);
        console.log("style list :", that.data.knowledgeList)
        console.log(that.data.knowledgeList[0].imgcontent)

       
      }

    })



  },


  //弹出函数代码
  showImgup: function (e){
    var index = e.currentTarget.dataset.id
    console.log("展示图片",e.currentTarget.dataset.id)

   this.setData({

     scene: index
   })
  console.log(this.data.scene)
    wx.previewImage({
      // urls: this.data.scene.split(',')
      urls: this.data.scene.split(',')
    })
  },


  
  onReady() {
   

  },


  gotoMlist: function (e) {
    var index = e.currentTarget.dataset.id;
    console.log(index);
    wx.navigateTo({
      url: '/page/component/list/list?name=' + index,
    })
  },

  gotoWlist: function (e) {
    var index = e.currentTarget.dataset.id;
    console.log(index);
    wx.navigateTo({
      url: '/page/component/list2/list2?name=' + index,
    })
  },
  switchTab(e) {
    const self = this;
    this.setData({
      isScroll: true
    })
    setTimeout(function () {
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index

      })
      console.log(self.data.toView)
    }, 0)
    setTimeout(function () {
      self.setData({
        isScroll: false
      })
    }, 1)

  }

})