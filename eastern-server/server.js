(async () => {
  // 建议: 先连接数据库,数据库连接成功了,再去开启服务器
  const db = await require("./db/db");
  //  搭建服务器
  const express = require("express");
  //   中间件
  const bodyParser = require("body-parser");
  // 引入解析cookie的第三方包
  const cookieParser = require("cookie-parser");
  //引入router
  const uiRouter = require("./routers/uiRouters");

  const app = express();
  // 使用中间件
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  //使用一下路由器
  app.use(uiRouter)
  // 什么语言不显示
  app.disable("x-powered-by");
  // 最近浏览记录数据
  const recentBrowse = require("./datas/recentBrowse.json");
  app.get("/search/recentBrowse", (request, response) => {
    console.log("请求最近浏览记录数据", request);
    response.send(recentBrowse);
  });
  // 获取搜索页数据
  const searchData = require("./datas/searchDatas.json");
  app.get("/search", (request, response) => {
    console.log("请求获取搜索页数据", request);
    response.send(searchData);
  });

  // 获取购物车推荐商品
  const recommendProduct = require("./datas/recommendProduct.json");
  app.get("/recommendProduct", (request, response) => {
    console.log("请求获取推荐商品数据", request);
    response.send(recommendProduct);
  });

  // 获取购物车数据
  const shopCartData = require("./datas/shopCartData.json");
  app.get("/shopCartData", (request, response) => {
    console.log("请求获取购物车数据", request);
    response.send(shopCartData);
  });

  // 获取首页楼层数据
  const homeAllFloorData = require("./datas/homeAllFloorData.json");
  app.get("/homeAllFloorData", (request, response) => {
    console.log("请求获首页楼层数据", request);
    response.send(homeAllFloorData);
  });

  // 获取关键词数据
  const hotkeyword = require("./datas/hotKeyword.json");
  app.get("/hotkeyword", (request, response) => {
    console.log("请求获关键词数据", request);
    response.send(hotkeyword);
  });

  // 启动服务器
  app.listen(5000, (err) => {
    if (err) console.log("服务器启动失败，错误信息：" + err);
    else console.log("服务器启动成功:http://localhost:5000");
  });
})();
