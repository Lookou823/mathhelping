// pages/enroll/enroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    password: "",
    phone: "",
    userList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  //输入用户名：
  idInput: function (e) {
    this.setData({
      id: e.detail.value
    })

    console.log(this.data.id)

  },



  //输入密码：
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })

    console.log(this.data.password)

  },

  //输入手机号码：
  // phoneInput: function (e) {
  //   this.setData({
  //     phone: e.detail.value
  //   })

  //   console.log(this.data.phone)

  // },

  //清空输入
  clearData: function () {

    this.setData({

      password: "",

      id: "",

      phone: ""


    })


  },

  //注册账号
  checkenroll: function () {
    // 人性化提示
    wx.showLoading({
      title: '注册中',
    })

    console.log("注册点击")
    //初始化数据库
    let that = this;
    const userdb = wx.cloud.database();
    //获取用户信息所有信息
    userdb.collection('user').where({

      name: that.data.id,


    }).get({


      success: res => {

        console.log('获取用户信息：', res.data);

        that.setData({

          userList: res.data
        })
        console.log("具体数组", that.data.userList)

        if (that.data.userList.length > 0) {




          //toast得放在  调用函数之后，这样可以正常显示


          wx.showToast({
            title: '用户名重复！请重新编辑',
            icon: 'none',
            duration: 2000
          })
        }
        else {

          wx.cloud.callFunction({
            name: 'userenroll',

            data: {
              name: this.data.id,
              password: this.data.password,

            },
            success: res => {

              wx.showToast({
                title: '注册成功',
              })
              wx.hideLoading();
          
              console.log("res=", res.result)

            },
            fail: err => {
              wx.showToast({
                title: '注册失败',
                icon: 'none',
                duration: 2000
              })
            },
            complete: res => {
              console.log('callFunction test result: ', res)
              this.gotologin();

            }



          })


        }
      },







      fail: res => {
        console.log("获取用户信息失败", res);
        // wx.showToast({
        //   title: '用户名或密码输入值错误，请重试',
        //   icon: 'none',
        //   duration: 2000
        // })
      }


    })





  },


  gotologin: function () {

    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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