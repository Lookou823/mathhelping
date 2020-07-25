// pages/infoboxpage/infoboxpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    study: {

    },

    live:{

    },
    username:"",
    gs:"",
    xd:"",
    gll:"",
    sh:"",
    qg:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const lyydb = wx.cloud.database();
    console.log("垃圾", that.data.study)

    lyydb.collection('infobox').doc("c1d8f6ae5ef1f93100378c9244d9a8d4").get({

      success: res => {
        console.log("成功读取记录")
        console.log(res.data)

        that.setData({
          study: res.data
        })


        that.setData({
          gs: that.data.study.gs,
          xd: that.data.study.xd,
          gll: that.data.study.gll,
       

        })
        console.log(that.data.study)
      },

      fail: res => {
        console.log("获取信息失败", res);
      }


    })


    console.log("垃圾", that.data.study)

    lyydb.collection('livebox').doc("db9f2d6c5ef1f98e0048e29a588ff702").get({

      success: res => {
        console.log("成功读取记录")
        console.log(res.data)

        that.setData({
          live: res.data
        })


        that.setData({
          sh: that.data.study.sh,
          qg: that.data.study.qg,
          sx: that.data.study.sx,


        })
        console.log(that.data.live)
      },

      fail: res => {
        console.log("获取信息失败", res);
      }


    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //顶部导航栏切换代码
  swichNav: function (e) {

    console.log(e);

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {

      return false;

    } else {

      that.setData({

        currentTab: e.target.dataset.current,

      })

    }

  },
  swiperChange: function (e) {

    console.log(e);

    this.setData({

      currentTab: e.detail.current,

    })


  },

// 输入文本
  setgs: function (e) {
    var result = e.detail.value;
    console.log(result)
    this.setData({

     gs: result

    })
  },
  setgs: function (e) {
    var result = e.detail.value;
    console.log(result)
    this.setData({

      gs: result

    })
  },
  setgs: function (e) {
    var result = e.detail.value;
    console.log(result)
    this.setData({

      gs: result

    })
  },
  setxd: function (e) {
    var result = e.detail.value;
    console.log(result)
    this.setData({

      xd: result

    })
  },
  setgll: function (e) {
    var result = e.detail.value;
    console.log(result)
    this.setData({

      gll: result

    })
    console.log(this.data.gll)

  },
  setsh: function (e) {
    var result = e.detail.value;
    console.log(result)
    this.setData({

      sh: result

    })
  },
  setqg: function (e) {
    var result = e.detail.value;
    console.log(result)
    this.setData({

      qg: result

    })
  },
  setsx: function (e) {
    var result = e.detail.value;
    console.log(result)
    this.setData({

      sx: result

    })
  },

  //更新
  updateData: function () {
    wx.showLoading({
      title: '正在上传',
    })

    console.log(this.data.gs)
    console.log(this.data.xd)
    console.log(this.data.gll)
    console.log(this.data.sh)
    console.log(this.data.qg)
    console.log(this.data.sx)

    wx.cloud.callFunction({
      name: 'updateintro',

      data: {
        gs: this.data.gs + "---"+this.data.username,
        xd: this.data.xd+"---"+this.data.username,
        gll: this.data.gll+"---"+this.data.username,
    
        id: 'c1d8f6ae5ef1f93100378c9244d9a8d4'

      },

      success: res => {

       

     console.log("更新成功")
            console.log(res)
            this.onShow();
            wx.showToast({
              title: '保存成功!',

            })
            wx.hideLoading();

        
    

      },

      fail: res => {
        console.log("更新信息失败", res);
      }

    })
  



  
  },
  //更新
  updateData2: function () {
    wx.showLoading({
      title: '正在上传',
    })

    
    console.log(this.data.sh)
    console.log(this.data.qg)
    console.log(this.data.sx)

    wx.cloud.callFunction({
      name: 'updatelive',

      data: {
        sh: this.data.sh + "---" + this.data.username,
        qg: this.data.qg + "---" + this.data.username,
        sx: this.data.sx + "---" + this.data.username,

        id: 'db9f2d6c5ef1f98e0048e29a588ff702'

      },

      success: res => {



        console.log("更新成功")
        console.log(res)
        this.onShow();
        wx.showToast({
          title: '保存成功!',

        })
        wx.hideLoading();




      },

      fail: res => {
        console.log("更新信息失败", res);
      }

    })





  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this

    wx.getStorage({
      key: 'account',
      success(res) {
        // console.log(res.data)
        console.log(res.data.id)
        
        that.setData({
          username: res.data.id
        })
      }
          })
    
     
    const lyydb = wx.cloud.database();
    console.log("垃圾", that.data.study)

    lyydb.collection('infobox').doc("c1d8f6ae5ef1f93100378c9244d9a8d4").get({

      success: res => {
        console.log("成功读取记录")
        console.log(res.data)

        that.setData({
          study: res.data
        })


        that.setData({
          gs: that.data.study.gs,
          xd: that.data.study.xd,
          gll: that.data.study.gll,


        })
        console.log(that.data.study)
      },

      fail: res => {
        console.log("获取信息失败", res);
      }


    })


    console.log("垃圾", that.data.study)

    lyydb.collection('livebox').doc("db9f2d6c5ef1f98e0048e29a588ff702").get({

      success: res => {
        console.log("成功读取记录")
        console.log(res.data)

        that.setData({
          live: res.data
        })


        that.setData({
          sh: that.data.study.sh,
          qg: that.data.study.qg,
          sx: that.data.study.sx,


        })
        console.log(that.data.live)
      },

      fail: res => {
        console.log("获取信息失败", res);
      }


    })


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})