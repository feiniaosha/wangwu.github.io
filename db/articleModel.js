var mongoose = require('mongoose')

var articleSchema = mongoose.Schema({
  title: String,
  content: String,
  createTime:Number,
  username:String
});

var  articleModel = mongoose.model('articles', articleSchema);

module.exports =  articleModel;
