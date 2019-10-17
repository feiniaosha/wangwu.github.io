// 引入模块
var mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost/express-project', { useNewUrlParser: true, useUnifiedTopology: true })

var db = mongoose.connection
db.on('error', (err)=>{
  console.log('数据库连接错误')
})
db.once('open', ()=>{
  console.log('数据库连接成功')
})
