const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {type:String},
    avatar: {type: String}, 
    conquest: {type: String},
    history: {type: String}
})

const User = mongoose.model('User', userSchema)

module.exports = User