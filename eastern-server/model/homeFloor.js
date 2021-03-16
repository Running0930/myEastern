const mongoose = require('mongoose')
// 定义约束
const Schema = mongoose.Schema

const floor = new Schema({
    HomeFloorList:{
        type:Array,
        required:true
    },
   
})

//创建model对象
const homeFloor = mongoose.model('floors', floor)

module.exports = homeFloor
