const mongoose = require('mongoose')
// 定义约束
const Schema = mongoose.Schema

const shopcart = new Schema({
    ShopCartList:{
        type:Array,
        required:true
    },
   
})

//创建model对象
const shopCartList = mongoose.model('shopcartlists', shopcart)

module.exports = shopCartList
