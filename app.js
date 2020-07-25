//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      traceUser: true,
      env: "clive-bk8w0"

    })
  },
  globalData: {
    userInfo: null
  }
})