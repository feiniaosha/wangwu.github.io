var express = require('express');
var router = express.Router();
var userModel = require('../db/userModel')

/* GET users listing. */
router.get('/getUserList', function(req, res, next) {
  console.log('有请求来了')
  userModel.find().then((docs)=>{
    console.log('查询成功', docs)
    res.send({err: 0, msg: 'success', data: docs})
  }).catch((err)=>{
    console.log('查询失败', err)
    res.send({err: -1, msg: 'fail'})
  })

  // userModel.find().then((docs)=>{
  //   console.log('docs', docs)
  //   res.send({err: 0, msg: 'success', data: docs});
  // }).catch((err)=>{
  //   console.log('err', err)
  //   res.send({err: -1, msg: 'fail'});
  // })
  // res.send('hello world')

});

// 注册
router.post('/regist',(req,res,next)=>{
  //接收POST数据
  let{username,password,password2}=req.body;
  //操作数据库

//查询数据库
//数字校验
userModel.find({username}).then((docs)=>{
  if(docs.length>0){
    res.send('用户名已存在')
  }else{
    let creatTime = Date.now();
    userModel.insertMany({username,password,creatTime}).then((data)=>{
      //res.send('注册成功');
      res.redirect('/login');
    }).catch((err)=>{
      //res.send('注册失败')
      res.redirect('/regist');
    })
   // res.json({username,password,password2})
  }
}) 
})

//登录接口
router.post('/login',(req,res,next)=>{
  //接收POST数据
  let{username,password}=req.body;
  //操作数据库
  let creatTime = Date.now();
  userModel.find({username,password}).then((docs)=>{
   if(docs.length>0){

    //res.send('登录成功');后，在服务端使用session记录用户信息
    req.session.username = username;
    req.session.isLogin = true;
    res.redirect('/');
  }else{
    //res.send('用户不存在')
    res.redirect('/login');
  }
    //res.redirect('/login');
  }).catch((err)=>{
    //res.send('登录失败')
    res.redirect('/login');
  })
 // res.json({username,password,password2})
})


//退出登录

router.get('/logout',(req,res,next)=>{
  req.session.username = null;
  req.session.isLogin = false;
 // req.session.destroy()
 res.redirect('/login');
})

module.exports = router;
