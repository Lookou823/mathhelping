// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'clive-bk8w0'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('school').add({
    data: {

      num: event.num,
      schoolname: event.schoolname,
      intro: event.intro,
      headimg: event.headimg,
      bookimg: event.bookimg,




    }

  })
}