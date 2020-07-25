// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'clive-bk8w0'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('schoolrequest').where({


      schoolname: event.schoolname,
      _id: event._id

    }).remove()
  } catch (e) {
    console.error(e)
  }



}