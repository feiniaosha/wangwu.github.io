var express = require('express');
var router = express.Router();
var articleModel = require('../db/articleModel')

var moment = require('moment')

/* 首页路由 */
router.get('/', function(req, res, next) {
  console.log(req.query)
  // 数据类型，要求是int
  let page = parseInt(req.query.page || 1)
  let size = parseInt(req.query.size || 2)
  let username = req.session.username;
  // 第一步：查询文章总数和总页数
  articleModel.find().count().then((total)=>{
    // 获取总页数
    var pages = Math.ceil(total / size)
    // 第二步：分页查询
    // sort()按文章时间，倒序查询
    // limit() 每页显示多少条
    // skip() 分页实现
    articleModel.find().sort({"createTime": -1}).limit(size).skip((page-1)*size).then((docs)=>{
      // docs不是纯粹意义上的js数组，要使用slice()方法把它转化成js数组
      var arr = docs.slice()  //
      for(let i=0; i<arr.length; i++) {
        // 原有的文档字段，不能修改吗？
        // 添加一个新的字段，来表示格式化的时间字段
        arr[i].createTimeZH = moment(arr[i].createTime).format('YYYY-MM-DD HH:mm:ss')
      }
      res.render('index', { data: {list: arr, total: pages,username:username} });
    }).catch((err)=>{
      res.redirect('/')
    })
  }).catch((err)=>{
    res.redirect('/')
  })


});



/*注册页 */
router.get('/regist', function(req, res, next) {
  res.render('regist', {});
});

/*登录页 */
router.get('/login', function(req, res, next) {
  res.render('login', {});
});

/*写文章 */
router.get('/write', function(req, res, next) {
 // var time = parseInt(req.query.time);
 var id = req.query.id;
 // console.log('---------------------', time)
  if(id){
    //编辑
    id = new Object(id);
    //使用id查询
    articleModel.findById(id).then(doc=>{
      // res.send({data:docs})
     // doc[0].createTimeZH = moment(doc[0].createTime).format("YYYY-MM-DD HH:mm:ss")
      res.render('write',{doc:doc})
     }).catch(err=>{
      res.redirect('/');
     })
  }else{
    //新增
    var doc = {
      _id: '',
      username: req.session.username,
      title: '',
      content: ''
    }
    res.render('write', {doc: doc});
  }
});

/*详情页 */
router.get('/detail', function(req, res, next) {
  //var time = parseInt(req.query.time);
  var id = new Object(req.query.id)
  //查询当前文章详情
 //用id查询
 
  
  articleModel.findById(id).then((doc)=>{
    // res.send({data: docs})
    doc.createTimeZH = moment(doc.createTime).format("YYYY-MM-DD HH:mm:ss")
    res.render('detail', {doc: doc})
  }).catch(err=>{
    res.send(err)
  })

// 用时间戳查询
// articleModel.find({createTime: parseInt(req.query.id)}).then((doc)=>{
//   res.send({data: doc})
// }).catch(err=>{
//   res.send(err)
// })
});



module.exports = router;
