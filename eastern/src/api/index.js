import ajax from "./ajax";
// 商品详情页
export const reqDetail = (skyId) => ajax.post(`/product/detail/${skyId}`);
// 分类信息
export const reqClassification = (couponId) =>
  ajax.post(`/Category/Category3BySysNo/${couponId}`);
// 推荐关键字
export const reqGetEPListBy = (ListBy) =>
  ajax.post(`/MarketEP/GetEPListBy/${ListBy}`);

//浏览记录
export const reqBrowseRecord = () =>
  ajax.post(`/Product/BrowseRecord`, [
    154563,
    134153,
    154558,
    148904,
    154260,
    149718,
    139312,
    152237,
    151088,
    151797,
    152244,
    151799,
    41805,
    149278,
    142089,
    142090,
    151089,
    149276,
    152245,
    121185,
  ]);

  //获取商品种类对象的接口(当参数有很多的时候, 可以以对象传递, )
export const reqGoodsType = (TypeParams) => ajax.post(`https://shopping.ceair.com/marketapi//activitypageservice/querydata`,TypeParams)

// 获取今日推荐数据
export const reqRecommendData=()=>ajax.post(`/MarketEP/GetEPListBy/Pc_Ad_00003`)

// 获取首页轮播图
// https://shopping.ceair.com/api//MarketEP/GetEPListBy/Pc_Ad_00002
export const reqHomeBannerData=()=>ajax.post(`/MarketEP/GetEPListBy/Pc_Ad_00002`)

// 获取导航栏信息
export const reqNavInfo=()=>ajax.get('/CustomCataLog/GetForPc');

// 获取购物车推荐商品接口
// export const reqRecommendProduct=(count)=>ajax.get(`/RecommendProduct/ProductList?count=${count}`)
