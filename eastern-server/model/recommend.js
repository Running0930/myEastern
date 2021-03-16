const mongoose = require('mongoose')
// 定义约束
const Schema = mongoose.Schema

const recommendSc = new Schema({
    Market_EP_ItemInfos:{
        type:Array,
        required:true
    },
   
})

//创建model对象
const recommend = mongoose.model('recommends', recommendSc)

module.exports = recommend
