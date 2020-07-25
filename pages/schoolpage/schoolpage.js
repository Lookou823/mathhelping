// pages/schoolpage/schoolpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img1: "../../icon/收 藏 (2).png",
    img2: "../../icon/收 藏 (1).png",
    iconflag: 1,

    iconflag2:1,
    iconflag3: 1,
    iconflag4: 1,

    
    img: '../../icon/收 藏 (2).png',

    img11: '../../icon/收 藏 (2).png',
    img12: '../../icon/收 藏 (2).png',
    img13: '../../icon/收 藏 (2).png',
    img14: '../../icon/收 藏 (2).png',

    schoollist:[],
    track:0,
    useid:"",
    schoolname:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this;




    wx.cloud.callFunction({
      name: 'school-get',

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

          schoollist: res.result.data
        })
        // 将数据转换为json类型
        // that.data.styleList = JSON.stringify(that.data.styleList);
        console.log("style list :", that.data.schoollist)


      }

    })




    //收藏按钮的显示
    const redb = wx.cloud.database();

    // 获取本地数据
    wx.getStorage({
      key: 'account',
      success: function (res) {
        console.log(res);
        that.setData({
          userid: res.data.id
        })
        let ooo = that.data.track
        that.setData({
          schoolname: that.data.schoollist[ooo].schoolname
        })
        console.log("测试收藏+学校姓名", that.data.schoolname);
        console.log("测试收藏+用户名", that.data.userid);

        redb.collection('schoolrequest').where({

          _id: that.data.useid + that.data.schoolname


        }).get({

          success: function (res) {
            console.log(res.data)

            if (res.data.length >= 1) {

              if(that.data.schoolname=="浙江大学")
              {
                that.setData({
                  img11: that.data.img2,
                  iconflag: -1,
                  img:that.data.img11
                })
              }
           
              if (that.data.schoolname == "复旦大学") {
                that.setData({
                  img12: that.data.img2,
                  iconflag2: -1,
                  img: that.data.img12
                })
              }
              if (that.data.schoolname == "北京邮电大学") {
                that.setData({
                  img13: that.data.img2,
                  iconflag3: -1,
                  img: that.data.img13
                })
              }
              if (that.data.schoolname == "西安交通大学") {
                that.setData({
                  img14: that.data.img2,
                  iconflag4: -1,
                  img: that.data.img14
                })
              }



              wx.showToast({
                title: '你已经收藏',
                duration: 500
              })



            }
            else {
              if (that.data.schoolname == "浙江大学") {
                that.setData({
                  img11: that.data.img1,
                  iconflag: 1,
                  img: that.data.img11
                })
              }

              if (that.data.schoolname == "复旦大学") {
                that.setData({
                  img12: that.data.img1,
                  iconflag2: 1,
                  img: that.data.img12
                })
              }
              if (that.data.schoolname == "北京邮电大学") {
                that.setData({
                  img13: that.data.img1,
                  iconflag3: 1,
                  img: that.data.img13
                })
              }
              if (that.data.schoolname == "西安交通大学") {
                that.setData({
                  img14: that.data.img1,
                  iconflag4: 1,
                  img: that.data.img14
                })
              }




              wx.showToast({
                title: '你没有收藏',
                icon: none,
                duration: 500
              })
            }

          },
          fail: function (res) {

          }
        })
      
    

  }
})




  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  reflash: function (e) {

    let num = e.currentTarget.dataset.id;
    console.log(num)

    if(num ==1)
    {
      this.setData({

        track: num - 1,
        img:this.data.img11
      })

      console.log(this.data.img)
    }

    if (num == 2) {
      this.setData({

        track: num - 1,
        img: this.data.img12
      })
      console.log(this.data.img)

    }


    if (num == 3) {
      this.setData({

        track: num - 1,
        img: this.data.img13
      })      
      console.log(this.data.img)

    }

    if (num == 4) {
      this.setData({

        track: num - 1,
        img: this.data.img14
      })
      console.log(this.data.img)

    }
 


  },
  //弹出函数代码
  showImgup: function (e) {
    var index = e.currentTarget.dataset.id
    console.log("展示图片", e.currentTarget.dataset.id)

    this.setData({

      scene: index
    })
    console.log(this.data.scene)
    wx.previewImage({
      // urls: this.data.scene.split(',')
      urls: this.data.scene.split(',')
    })
  },



// 
// 
// 收集用户收藏记录的函数
// 
// 

  sendRequire: function (e) {
    let that = this;
    let temp = that.data.iconflag;
    // 获取本地数据
    
    const redb = wx.cloud.database();
 
    that.setData({
      schoolname: that.data.schoollist[that.data.track].schoolname
    })
   
    wx.getStorage({
      key: 'account',
      success: function (res) {
        console.log(res);


        that.setData({
          userid: res.data.id
        })
        that.setData({
          schoolname: that.data.schoollist[that.data.track].schoolname
        })
        console.log("测试收藏", temp);
        console.log("测试收藏+学校姓名", that.data.schoolname);
        console.log("测试收藏+用户名", that.data.userid);

        if (temp == -1) {

          console.log("测试删除收藏+ id", that.data.userid + that.data.schoolname)
          wx.cloud.callFunction({

            name: 'remove',
            data: {
              _id: that.data.userid + that.data.schoolname,
              schoolname: that.data.schoolname
            },
            success: res => {
              wx.showToast({
                title: '取消成功',
                duration: 2000
              })
              console.log("res=", res.result)
// 
// 加一个条件判断语句，判断四个学校
// 
// 
if(that.data.schoolname=="浙江大学")
{
 
  that.setData({
    img11: that.data.img1,
    iconflag: 1
  })
}

if(that.data.schoolname=="复旦大学")
{
  that.setData({
    img12: that.data.img1,
    iconflag2: 1
  })
}

if(that.data.schoolname=="北京邮电大学")
{
  that.setData({
    img13: that.data.img1,
    iconflag3: 1
  })
}

if(that.data.schoolname=="西安交通大学")
{
  that.setData({
    img14: that.data.img1,
    iconflag4: 1
  })
}


              // that.setData({
              //   img: that.data.img1,
              //   iconflag: 1
              // })
            },
            fail: err => {
              console.log(err)
              wx.showToast({
                title: '取消失败',
                icon: 'none',
              })
            },



          })






         


        }

     



// success kuohao
      }

      ,
      fail: function (res) {

        wx.showModal({
          title: '提示',
          content: '请在填写完整信息后进行收藏',
          showCancel: false,
          success: function () {
            // wx.navigateTo({
            //   url: '../../pages/pinfo/pinfo'
            // })
          }
        })
      }
    })



// 收藏的部分↓

    if (temp == 1) {

      let that = this;
      // 获取本地数据
      wx.getStorage({
        key: 'account',
        success: function (res) {
          console.log(res);


          that.setData({
            userid: res.data.id
          })




          console.log("测试区域输出本地缓存数据")
          //千万别忘记 that.data再. 定义的变量
          console.log(that.data.userid);

          // 首先要判断本地缓存不为空
          if (that.data.userid) {

            wx.cloud.callFunction({
              name: 'addrequire',
              data: {
                _id: that.data.userid + that.data.schoolname,
                schoolname: that.data.schoolname,

              },


              success: res => {
                wx.showToast({
                  title: '收藏成功',
                  duration: 2000
                })
                console.log("res=", res.result)



                // 
                // 加一个条件判断语句，判断四个学校
                // 
                // 
                if (that.data.schoolname == "浙江大学") {
                  that.setData({
                    img11: that.data.img2,
                    iconflag: -1
                  })
                }

                if (that.data.schoolname == "复旦大学") {
                  that.setData({
                    img12: that.data.img2,
                    iconflag2: -1
                  })
                }

                if (that.data.schoolname == "北京邮电大学") {
                  that.setData({
                    img13: that.data.img2,
                    iconflag3: -1
                  })
                }

                if (that.data.schoolname == "西安交通大学") {
                  that.setData({
                    img14: that.data.img2,
                    iconflag4: -1
                  })
                }

              },
              fail: err => {
                wx.showToast({
                  title: '收藏失败',
                  icon: 'none',
                })
              },
              complete: res => {
                console.log('callFunction test result: ', res)
              }
            })


          } else {
            wx.showModal({
              title: '提示',
              content: '请在填写完整信息后进行收藏',
              showCancel: false,
              success: function () {
                // wx.navigateTo({
                //   url: '../../pages/pinfo/pinfo'
                // })

              }
            })

          }








        },
        fail: function (res) {

          wx.showModal({
            title: '提示',
            content: '请在填写完整信息后进行收藏',
            showCancel: false,
            success: function () {
              // wx.navigateTo({
              //   url: '../../pages/pinfo/pinfo'
              // })
            }
          })
        }


      })


    }
    

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