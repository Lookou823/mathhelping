// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'clive-bk8w0'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('schoolrequest').add({
    data: {
      _id: event._id,
      schoolname: event.schoolname,
    

    },
    success: function (res) {
      wx.showToast({
        title: "添加成功",
        duration: 2000
      })

    },
    fail: function (res) {
      wx.showToast({
        title: "添加失败",
        duration: 2000
      })
    }
  })
}