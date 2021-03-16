const mongoose = require('mongoose')
// 定义约束
const Schema = mongoose.Schema

const logins = new Schema({
    userId:{
        type:Number,
        required:true,
        unique: true 
    },
    idCard:{
        type:Number,
        required:true,
        unique: true 
    },
    password:{
        type:String,
        required:true, 
    },
    phone:{
        type:Number,
        required:true,
        unique: true 
    },
    name_cn:{
        type:String,
        required:true,
    },
    name_en:{
        type:String,
        required:true,
    },
   
})

//创建model对象
const login = mongoose.model('logins', logins)

module.exports = login
