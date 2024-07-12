const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name : String,
  lname : String,
  age : Number,
  city : String,
})


const userModel = mongoose.model('Users', userSchema)

module.exports = userModel
