const mongoose = require('mongoose')
// 定义约束
const Schema = mongoose.Schema

const navSc = new Schema({
    Data:{
        type:Array,
        required:true
    },
   
})

//创建model对象
const nav = mongoose.model('navs', navSc)

module.exports = nav
