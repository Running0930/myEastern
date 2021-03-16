const mongoose = require('mongoose')
// 定义约束
const Schema = mongoose.Schema

const popuKey = new Schema({
    Data:{
        type:Object,
        required:true
    },
    PagesNumber:{
        type:Number
    }
})

//创建model对象
const popularKeyword = mongoose.model('easterns', popuKey)

module.exports = popularKeyword
