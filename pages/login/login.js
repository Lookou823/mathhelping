// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    password: "",
    userList: []
    ,
    account: {
      id: ""
    }

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


  //清空输入
  clearData: function () {

    this.setData({

      password: "",

      id: ""


    })


  },

  // 跳转注册页面
  gotoEn: function () {
    wx.navigateTo({
      url: '/pages/enroll/enroll',
    })


  },

  //登录
  checklogin: function () {
    if (this.data.id != "" && this.data.password != "") {
      console.log("输入非空，可以进行检测")
      wx.showToast({
        title: '正在登录...',
        icon: 'none',
        duration: 2000
      })

      //初始化数据库
      let that = this;
      const userdb = wx.cloud.database();
      //获取用户信息所有信息
      userdb.collection('user').where({

        name: that.data.id,
        password: that.data.password


      }).get({
        success: res => {
          console.log('获取用户信息：', res.data);

          that.setData({

            userList: res.data
          })
          console.log("具体数组" + that.data.userList)

          if (that.data.userList.length > 0) {



            console.log(that.data.userList[0].name)

            //toast得放在  调用函数之后，这样可以正常显示
            if (that.data.userList[0].name =='admin')
            {
              this.gotoControl();
            }
            else
            {this.gotoMain();}
            //记录进本地缓存
            wx.setStorage({
              key: 'account',
              data: {
                id: this.data.id
              },

            })
            wx.showToast({
              title: '登录成功',
              icon: 'default',
              duration: 2000
            })
          }
          else {
            wx.showToast({
              title: '用户名或密码输入值错误，请重试',
              icon: 'none',
              duration: 2000
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





    }
    else {
      console.log("输入空")


      wx.showToast({
        title: '用户名或密码输入值为空，请重新输入',
        icon: 'none',
        duration: 2000
      })
    }

  },


  gotoMain: function () {

    wx.switchTab({
      url: '/pages/mainpage/mainpage'
    })
  },


  gotoControl:function(){

    wx.navigateTo({
      url: '/pages/control/control',
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