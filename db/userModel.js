var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  createTime:Number 
})

var userModel = mongoose.model('users', userSchema)

module.exports = userModel
