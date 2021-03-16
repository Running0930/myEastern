<template>
  <div id="cartShop">
    <div class="cart">
      <div class="title">
        <p>您的购物车有如下商品：</p>
      </div>
      <div class="cart-main">
        <div class="cart-th">
          <div class="cell cart-th1">
            <label for=""> <input type="checkbox" />全选 </label>
          </div>
          <div class="cell cart-th2">商品信息</div>
          <div class="cell cart-th3">单价（积分+元）</div>
          <div class="cell cart-th4">数量</div>
          <div class="cell cart-th5">小计（积分+元）</div>
          <div class="cell cart-th6">操作</div>
        </div>
      </div>
      <!-- 商品显示信息 -->
      <div class="cart-body">
        <div class="cart-schh" v-for="cartItem in shopCartData.ShopCartList" :key="cartItem.ProductSysNo">
          <div class="call check-box">
            <label for="">
              <input type="checkbox" :checked="cartItem.IsSelect" />
            </label>
          </div>
          <ul class="call cart-list">
            <li class="cart-list-con2">
              <img :src="baseUrl+cartItem.ProductPic" />
              <a href="javascript:" class="item-msg"
                >{{cartItem.ProductName}}<br />
                <span class="attribute">属性：{{cartItem.ProductAttribute}}</span>
              </a>
            </li>
          </ul>
          <div class="call c-price">
            <div class="left">
              <p>积分</p>
            </div>
            <div class="right">
              <p class="price_PID">
                <span class="add subScore">-</span>
                <input
                  type="text"
                  name=""
                  id=""
                  class="inp score"
                  :value="score"
                />
                <span class="add addScore">+</span>
              </p>
              <img
                src="@/static/images/shopcart/ia_400000042.png"
                alt=""
                class="icon_plus"
              />
              <p class="price_a money">
                现金
                <span>{{cartItem.DiscountPrice}}</span>
                <span>元</span>
              </p>
              <p class="tip">
                积分调整范围
                <span class="tip_1">0-{{cartItem.DiscountPoints}}</span><br />
                调整积分范围,现金会随着积分加减而变化
              </p>
            </div>
          </div>
          <div class="call c-quantity">
            <p class="price_PID">
              <span class="add subScore">-</span>
              <span class="score">{{cartItem.Number}}</span>
              <span class="add addScore">+</span>
            </p>
          </div>
          <div class="call c-sum">
            <p class="price_show">
              <span class="small">积分</span>
              <span class="totalScore">0</span>
              <span class="small">分</span>
              <span class="small">+现金</span>
              <span class="totalPrice">{{cartItem.Number*cartItem.DiscountPrice}}</span>
              <span class="small">元</span>
            </p>
          </div>
          <div class="call c-ops">
            <a href="javascript:;" class="delOrder">删除</a>
          </div>
        </div>
      </div>
      <!-- 提交订单 -->
      <div class="c-shool">
        <div class="c-thanking">
          <div class="call c-checkbox">
            <label for> <input type="checkbox" />全选 </label>
          </div>
          <div class="call c-goods">
            <a href="javascritp:;">删除选中商品</a>
          </div>
          <div class="call c-pri">
            <span class="font1">
              已选择
              <span>0</span>
              件商品
            </span>
          </div>
          <span class="call c-quant">总价:</span>
          <div class="call pric_show">
            <span class="small">积分</span>
            <span class="a_scort">{{shopCartData.SettlementPoints}}</span>
            <span class="small">分+现金</span>
            <span class="a_scort">{{shopCartData.SettlementAmount}}</span>
            <span>元</span>
          </div>
          <div class="call GT">
            <span class="wd_100">
              <b>提交普通订单 ></b>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐商品 -->
    <div class="verygood">
      <div>
        <b class="recentBrowseText">推荐商品</b>
        <div class="recentBrowse">
          <div class="moveLeft">
            <i class="iconfont icon-left" @click="swiper.slidePrev()"></i>
          </div>
          <!-- 推荐商品轮播图 -->
          <swiper ref="mySwiper" :options="obj2" class="browseHistory">
            <swiper-slide
              class="item"
              v-for="rPro in recommendProductData.data"
              :key="rPro.ProductID"
            >
              <p class="goodsImg">
                <img :src="rPro.ProductImage" alt="" />
              </p>
              <p class="goodsDesc">
                {{ rPro.ProductName }}
              </p>
              <span class="pricce"
                >现金<span class="priceNum">{{ rPro.ProductPrice }}</span></span
              >
              <div class="otherDesc">
                最高可以使用{{
                  rPro.ProductPoint > 10000
                    ? rPro.ProductPoint / 10000 + "万"
                    : rPro.ProductPoint
                }}积分
              </div>

            </swiper-slide>
          </swiper>
          <div class="moveright">
            <i class="iconfont icon-right" @click="swiper.slideNext()"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 浏览记录 -->
    <ImageListFot />
  </div>
</template>

<script>
import weAjax from "@/utils/weAjax.js";
import Swiper from "swiper";
export default {
  name: "shopcart",
  data() {
    return {
      baseUrl: `http://ceair.oss-cn-shanghai.aliyuncs.com/image`,// 图片基础路径
      score: 100, //积分
      recommendProductData: [], //推荐商品数据
      shopCartData:{},// 购物车数据
      obj2: {
        slidesPerView: "auto", //显示几张图
        slidesPerGroup: 4, //每次移动几张图
      },
    };
  },
  mounted() {
    // 获取推荐商品数据
    this.getRecommendProductData();
    // 获取购物车数据
    this.getShopCartData()
  },
  computed: {
    // 获取推荐轮播图实例
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  methods: {
    // 获取推荐商品数据
    async getRecommendProductData() {
      const res = await weAjax.get("/recommendProduct");
      this.recommendProductData = res;
    },
    // 获取购物车数据
    async getShopCartData(){
      const res=await weAjax.get('shopCartData');
      this.shopCartData=res.data;
    }

  },
};
</script>

<style lang="less" scoped>
#cartShop {
  background: #f3f2f7;
}
.cart {
  width: 1200px;
  margin: 22px auto;
  background: #fff;
  .title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #fff;
  }
  .title p {
    padding-left: 11px;
    font-size: 18px;
  }
  .cart-main .cart-th {
    // display: flex;
    // justify-content: space-around;
    background-color: #79b6f2;
    width: 1200px;
  }
  .cart-th:after {
    content: "";
    display: block;
    clear: both;
  }
  .cart-main .cart-th .cell {
    text-align: center;
    padding: 10px 0;
    color: #fff;
    float: left;
  }
  .cart-main .cart-th .cart-th1 {
    width: 78px;
    font-size: 12px;
  }
  .cart-main .cart-th .cart-th2 {
    width: 366px;
    font-size: 12px;
  }
  .cart-main .cart-th .cart-th3 {
    width: 325px;
    font-size: 14px;
  }
  .cart-main .cart-th .cart-th4 {
    width: 110px;
    font-size: 12px;
  }
  .cart-main .cart-th .cart-th5 {
    width: 213px;
    font-size: 12px;
  }
  .cart-main .cart-th .cart-th6 {
    width: 105px;
    font-size: 12px;
  }

  // 商品显示信息
  .cart-body .cart-schh {
    padding-top: 10px;
    padding-bottom: 10px;
    display: inline-block;
    border-bottom: 1px solid #d8dae2;
  }
  .cart-body .cart-schh .check-box {
    margin-top: 42px;
    width: 60px;
  }
  .cart-body .cart-schh .call {
    float: left;
    text-align: center;
    overflow: hidden;
  }
  .cart-schh .cart-list .cart-list-con2 {
    display: flex;
  }
  .cart-schh .cart-list .cart-list-con2 img {
    cursor: pointer;
    width: 100px;
    height: 100px;
  }
  .cart-schh .cart-list .cart-list-con2 a {
    width: 246px;
    padding-left: 20px;
    text-align: left;
    float: left;
    text-decoration: none;
    color: #444;
    font-size: 12px;
  }
  .cart-schh .c-price {
    width: 325px;
    font-size: 14px;
    font-weight: 700;
  }
  .cart-schh .c-price .left {
    width: 50px;
    height: auto;
    line-height: 200%;
    text-align: center;
    float: left;
    margin-top: 6px;
  }
  .cart-schh .c-price .right {
    width: 275px;
    height: auto;
    text-align: left;
    float: left;
    display: block;
  }
  .cart-schh .c-price .right .price_PID {
    user-select: none;
  }
  .cart-schh .c-price .right .price_PID .add {
    font-size: 22px;
    font-weight: 700;
    line-height: 30px;
    float: left;
    width: 30px;
    height: 30px;
    margin-top: 2px;
    cursor: pointer;
    text-align: center;
    color: #ff0000;
    border: 1px solid #ccc;
  }
  .cart-schh .c-price .right .price_PID .inp {
    float: left;
    width: 70px;
    margin-right: 0 !important;
    text-align: center;
    border: 1px solid #ccc;
    position: relative;
    height: 30px;
    margin-top: 2px;
    outline: 0;
  }
  .cart-schh .c-price .right img {
    margin: 6px 6px 0 3px;
  }
  .cart-schh .c-price .right .price_a {
    color: #ff4c4c;
    font-size: 12px;
    display: inline-block;
  }
  .cart-schh .c-price .right .tip {
    font-weight: 400;
    font-size: 12px;
    color: #a5a5a5;
  }
  .cart-schh .c-price .right .tip_1 {
    color: #ff4c4c;
  }
  .cart-schh .c-quantity {
    width: 110px;
    padding-left: 20px;
  }
  .cart-schh .c-quantity .price_PID .add {
    font-size: 22px;
    font-weight: 700;
    line-height: 30px;
    float: left;
    width: 30px;
    height: 30px;
    margin-top: 2px;
    cursor: pointer;
    text-align: center;
    color: #ff0000;
    border: 1px solid #ccc;
  }
  .cart-schh .c-quantity .price_PID .score {
    font-size: 12px;
    line-height: 30px;
    display: block;
    float: left;
    width: 40px;
    height: 30px;
    margin-top: 2px;
    text-align: center;
    border-top: solid 1px #ccc;
    border-right: none;
    border-bottom: solid 1px #ccc;
    border-left: none;
  }
  .cart-schh .c-sum {
    width: 213px;
  }
  .cart-schh .c-sum .price_show {
    font-weight: 700;
    text-align: center;
    font-size: 15px;
    color: #ff4c4c;
  }
  .cart-schh .c-sum .price_show .small {
    font-size: 12px;
    overflow: hidden;
    font-weight: 400;
  }
  .cart-schh .c-ops {
    width: 105px;
    float: right;
    font-size: 12px;
  }
  .cart-schh .c-ops a {
    color: #444;
    text-decoration: none;
  }
  // 提交订单
  .c-shool {
    height: 55px;
    margin-top: 15px;
    color: #444;
    background: #d8dae2;
    width: 1200px;
  }
  .c-thanking:after {
    content: "";
    display: block;
    clear: both;
  }
  .c-thanking .call {
    text-align: center;
    padding: 10px 0;
    float: left;
  }

  .c-thanking .c-checkbox {
    width: 78px;
    padding: 10px;
  }
  .c-thanking .c-goods {
    width: 366px;
    font-size: 14px;
  }
  .c-thanking .c-pri {
    width: 115px;
  }
  .c-thanking .c-quant {
    text-align: right;
    padding-right: 10px;
    width: 80px;
  }
  .c-thanking .pric_show {
    padding-top: 3px;
    width: 106px;
    color: #ff4c4c;
    white-space: nowrap;
  }
  .c-thanking .pric_show .a_scort {
    font-size: 20px;
    font-weight: 700;
  }
  .c-thanking .GT {
    width: 150px;
    height: 55px;
    line-height: 55px;
    background: #ff7f00;
    padding: 0;
    float: right;
  }

  .c-thanking .GT b {
    font-size: 19px;
    color: #fff;
    cursor: pointer;
    font-weight: 900;
  }
}
// 推荐商品
.verygood {
  margin: 20px auto;
  width: 1200px;
  .recentBrowseText {
    font-size: 18px;
    color: #444;
    font-weight: 900;
  }
  // 最近浏览记录
  .recentBrowse {
    display: flex;
    align-items: center;
    overflow: hidden;
    .moveLeft,
    .moveright {
      width: 50px;
      height: 262px;

      cursor: pointer;
      background: #f9f9fb;
      text-align: center;
      line-height: 262px;
      i {
        color: #a2a2a2;
        font-size: 50px;
      }
    }
    .browseHistory {
      list-style-type: none;
      width: 1100px;
      background: #fff;
      padding: 0;
      display: flex;
      overflow: hidden;
      .item {
        width: 274px;
        height: 250px;
        flex-shrink: 0;
        border-right: 1px solid #f3f2f7;
        p {
          margin: 0;
        }
        .goodsImg {
          text-align: center;
          padding: 10px 0;
          img {
            width: 130px;
            height: 130px;
          }
        }
        .goodsDesc {
          font-size: 12px;
          color: #444;
          padding: 0 15px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pricce {
          margin: 0 15px;
          color: #ff4c4c;
          padding: 0;
          .priceNum {
            font-size: 20px;
            font-weight: 700;
          }
        }
        .otherDesc {
          padding: 0 15px;
          line-height: 26px;
          color: #a5a5a5;
          font-size: 12px;
        }
        p:hover {
          cursor: pointer;
          color: #5bb4fb;
        }
      }
    }
  }
}
</style>
