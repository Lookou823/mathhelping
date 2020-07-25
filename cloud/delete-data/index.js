// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'clive-bk8w0'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var id = event._id

  try {
    return await db.collection('knowledge').doc(id).remove()

  } catch (e) {
    console.log(e)
  }
}