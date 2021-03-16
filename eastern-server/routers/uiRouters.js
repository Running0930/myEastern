const express = require('express')
const router = express.Router()
//导入model
const homeFloor = require('../model/homeFloor')
const popularKeyword = require('../model/polularKeyword')
const recommend = require('../model/recommend')
const nav = require('../model/nav')
const shopCartList = require('../model/shopCartList')
const login = require('../model/login')




//监听
router.get('/getAllHomeFloor', async (req, res) => {
    const result = await homeFloor.findOne()
    res.send(result.HomeFloorList)
})

router.get('/getPopularKeyword', async (req, res) => {
    const result = await popularKeyword.findOne()
    res.send(result.Data)
})

router.get('/recommend', async (req, res) => {
    const result = await recommend.findOne()
    res.send(result.Market_EP_ItemInfos)

})

router.get('/nav', async (req, res) => {
    const result = await nav.findOne()
    res.send(result.Data)
    // console.log(result)

})

router.get('/shopcartlist', async (req, res) => {
    const result = await shopCartList.findOne()
    res.send(result.ShopCartList)


})

// 最近浏览记录数据
const recentBrowse = require('../datas/recentBrowse.json')

router.get('/search/recentBrowse', (request, response) => {
    console.log('请求最近浏览记录数据', request);
    response.send(recentBrowse)
})

// 获取搜索页数据
const searchData = require('../datas/searchDatas.json')
router.get('/search', (request, response) => {
    console.log('请求获取搜索页数据', request);
    response.send(searchData)
})

//登录

router.post('/login', async (req, res) => {
    // 获取用户上传的数据
    let { phone, password } = req.body
    console.log(phone, password)
    // 去数据库中查询,看是否有这个账户
    const user = await login.findOne({ phone, password })
    if (user) {
        // 登录成功
        res.cookie('userId', user.userId, { maxAge: 6000000 })
        res.send(user.name_cn)
    } else {
        // 登录失败
        res.send('登录失败')
    }
})
//自动登录
router.post('/loginId',async (req,res)=>{
    let {userId}=req.body
    const user = await login.findOne({ userId })
    if(user){
        res.send(user.name_cn)
    }
})
//注册
router.post('/register', async (req, res) => {
    // 获取用户上传的数据
    let { phone, password,idCard,name_cn,name_en } = req.body
    console.log(phone, password)
    // 去数据库中查询,看是否有这个账户
    const user = await login.create({
        phone, 
        password,
        idCard,
        name_cn,
        name_en,
        userId:Date.now()

    })
    if (user) {
        // 注册成功
            console.log('注册成功')
            res.send('注册成功')
        
    } else {
        // 注册失败
        res.send('注册失败')
    }
})



module.exports = router