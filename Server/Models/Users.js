const mongoose = require("mongoose")



const Users =new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true,},
    chats:{type:Array,default:[]},
},{timestamps:true})

module.exports = mongoose.model('Users', Users)