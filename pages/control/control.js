// pages/control/control.js
let leftHeight = 0, rightHeight = 0; //分别定义左右两边的高度
let query;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //tab 切换

    currentTab: 0,
    // 知识点信息
    id:"",
    num:"",
    title: "",
    titleid: "",
    textcontent: "",
    imgcontent: "",
    judlist:[],

    //院校信息
    num2:"",
    schoolname: "",
    intro: "",
    headimg: "",
    bookimg: "",
    judlist2:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

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


  //输入num：
  idInput: function (e) {
    this.setData({
      id: e.detail.value
    })

    console.log(this.data.id)

  },
  numInput: function (e) {
    this.setData({
      num: e.detail.value
    })

    console.log(this.data.num)

  },

  //
  titleInput: function (e) {
    this.setData({
      title: e.detail.value
    })

    console.log(this.data.title)

  },


//
  titleidInput: function (e) {
    this.setData({
      titleid: e.detail.value
    })

    console.log(this.data.titleid)

  },

  //

  tcInput: function (e) {
    this.setData({
      textcontent: e.detail.value
    })

    console.log(this.data.textcontent)

  },
  //
  icInput: function (e) {
    this.setData({
      imgcontent: e.detail.value
    })

    console.log(this.data.imgcontent)

  },


// 
// 
// 学院
// 

  //输入num：
  num2Input: function (e) {
    this.setData({
      num2: e.detail.value
    })

    console.log(this.data.num2)

  },
  //
  scnInput: function (e) {
    this.setData({
      schoolname: e.detail.value
    })

    console.log(this.data.schoolname)

  },


  //
 introInput: function (e) {
    this.setData({
      intro: e.detail.value
    })

    console.log(this.data.intro)

  },

  //

  hiInput: function (e) {
    this.setData({
      headimg: e.detail.value
    })

    console.log(this.data.headimg)

  },
  //
  biInput: function (e) {
    this.setData({
      bookimg: e.detail.value
    })

    console.log(this.data.bookimg)

  },

  //清空输入
  clearData: function () {

    this.setData({

      num: "",
      title: "",
      titleid: "",
      textcontent: "",
      imgcontent: ""

    })


  },

  clearData2: function () {

    this.setData({
      num2: "",
      schoolname: "",
      intro: "",
      headimg: "",
      bookimg: ""

    })


  },

  //添加函数
  //
  adddata2: function () {
    // 人性化提示
    wx.showLoading({
      title: '添加中',
    })

    console.log("添加点击")
    //初始化数据库
    //这里申明了that，则后续调用不要使用this，无效
    let that = this;
    const userdb = wx.cloud.database();
    //获取用户信息所有信息
    userdb.collection('knowledge').where({

      title: that.data.title,


    }).get({


      success: res => {

        console.log('获取用户信息：', res.data);

        that.setData({

          judlist: res.data
        })
        console.log("具体数组", that.data.judlist)

        if (that.data.judlist.length > 0) {




          //toast得放在  调用函数之后，这样可以正常显示


          wx.showToast({
            title: '学校重复！请重新编辑',
            icon: 'none',
            duration: 2000
          })
        }
        else {

          wx.cloud.callFunction({
            name: 'control-sc-data',
       
            data: {
              num: that.data.num2,
              schoolname: that.data.schoolname,
              intro: that.data.intro,
              headimg: that.data.headimg, 
              bookimg: that.data.bookimg,

            },
            success: res => {

              wx.showToast({
                title: '添加完毕',
              })
              wx.hideLoading();

              console.log("res=", res.result)

            },
            fail: err => {
              wx.showToast({
                title: '添加失败',
                icon: 'none',
                duration: 2000
              })
            },
            complete: res => {
              console.log('callFunction test result: ', res)

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
  //添加函数
  //
  adddata: function () {
    // 人性化提示
    wx.showLoading({
      title: '添加中',
    })

    console.log("添加点击")
    //初始化数据库
    //这里申明了that，则后续调用不要使用this，无效
    let that = this;
    const userdb = wx.cloud.database();
    //获取用户信息所有信息
    userdb.collection('school').where({

      schoolname: that.data.schoolname,


    }).get({


      success: res => {

        console.log('获取用户信息：', res.data);

        that.setData({

          judlist2: res.data
        })
        console.log("具体数组", that.data.judlist)

        if (that.data.judlist.length > 0) {




          //toast得放在  调用函数之后，这样可以正常显示


          wx.showToast({
            title: '知识点重复！请重新编辑',
            icon: 'none',
            duration: 2000
          })
        }
        else {

          wx.cloud.callFunction({
            name: 'control-data',

            data: {
              num: that.data.num,
              title: that.data.title,
              titleid: that.data.titleid,
              textcontent: that.data.textcontent,
              imgcontent: that.data.imgcontent,

            },
            success: res => {

              wx.showToast({
                title: '添加完毕',
              })
              wx.hideLoading();

              console.log("res=", res.result)

            },
            fail: err => {
              wx.showToast({
                title: '添加失败',
                icon: 'none',
                duration: 2000
              })
            },
            complete: res => {
              console.log('callFunction test result: ', res)

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

  delete:function(){
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除这条知识点记录吗',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中',
          })
          //云函数删除
          wx.cloud.callFunction({
            name: 'delete-data',
            data: {
              _id: that.data.id,
            },
            success: res => {
              wx.showToast({
                title: '知识点删除成功',
              })
              console.log('[云函数][delete-data] 删除成功！！ ', res)
              wx.hideLoading();
            }
          })
        }
      }
        })
  },
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