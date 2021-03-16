<template>
  <div id="outer">
    <header class="header">
      <div class="toolbar">
        <div>
          <span>手机购物,下载东方航空APP</span>
          <!-- 二维码图片 -->
          <img src="@/../public/images/MC_r2_c15.jpg" alt="" />
        </div>
        <a href="#" class="userInfo" v-show="isLogin">{{name}}(可用积分:0),含0透支积分</a>
        <a href="/login" class="userInfo" v-show="!isLogin">登录</a>
        <span> </span>
        <a href="javascript:;" class="exit" v-show="isLogin" @click="logOut">退出</a>
        <a href="/register" class="exit">注册</a>
        <a href="javascript:;" class="eaHome">东航官网</a>
      </div>
      <div class="container">
        <a href="/home">
          <!-- <img
            src="//ceair-resource.oss-cn-shanghai.aliyuncs.com/shopping/pc/assets/images/logo.png"
            class="logo1"
          /> -->
          <!-- 东航商城图标 -->
          <img src="@/static/images/login/shop_logo.png" class="logo1" />
        </a>
        <a
          href="https://shopping.ceair.com/act/a171/act.html"
          target="_blank"
          class="a2"
        >
          <img src="@/static/images/index/moneyPayLogo.png" class="logo2" />
        </a>
        <div class="searchNav">
          <div class="searchCon">
            <div class="search">
              <input type="text" />
              <button @click="$router.push('/search')">搜索</button>
            </div>
            <ul>
              <li v-for="keyword in hotKeyword" :key="keyword.Keyword"><a :href="keyword.PCLink">{{keyword.Keyword}}</a></li>
            </ul>
          </div>
          <!-- 购物车按钮 -->
          <a
            href="javascript:;"
            class="cart"
            @mouseenter="handleGetCart(true)"
            @mouseleave="handleGetCart(false)"
            @click="$router.push('/shopcart')"
          >
            <span class="iconfont icon-gouwuche icon"></span>
            <span style="padding:0px 3px;">购物车</span>
            <span class="number">{{shopCartData.CartTotalCount}}</span>
            <span class="arrow">></span>
          </a>
          <!-- 购物车下拉列表 -->
          <div
            class="cartList"
            @mouseenter="handleGetCart(true)"
            @mouseleave="handleGetCart(false)"
            :style="isShowCart ? 'display:flex' : 'display:none'"
          >
            <div class="cartData" v-for="cartItem in shopCartData.ShopCartList" :key="cartItem.ProductSysNo">
              <a href="javascript:;">
                <img
                  v-lazy="baseUrl+cartItem.ProductPic"
                  alt=""
                />
              </a>
              <div class="info">
                <a
                  :href="cartItem.PageUrl"
                  target="_blank"
                  class="title"
                  >{{cartItem.ProductName}}</a
                >
                <div class="money">积分<b>0</b> 现金<b>{{cartItem.DiscountPrice}}</b><i>x{{cartItem.Number}}</i></div>
              </div>
              <a href="#" class="delete">删除</a>
            </div>

            <div class="bottom">
              <div class="left">
                <div>已选择<span id="totcaritem">{{shopCartData.CartTotalCount}}</span>件商品</div>
                <div>
                  总价：积分<b id="totscore">{{shopCartData.SettlementPoints}}分</b> +现金<b id="totprice"
                    >{{shopCartData.SettlementAmount}}<span class="small">元</span></b
                  >
                </div>
              </div>
              <div class="right">
                <a href="javascript:;">去购物车</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Nav></Nav>
    </header>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import weAjax from "@/utils/weAjax.js"
import { mapState } from "vuex";
import cookie from 'js-cookie'
import store from '@/store'
export default {
  name: "Header",
  data() {
    return {
      isShowCart: false,
      shopCartData:[],//购物车数据
      hotKeyword:[]// 关键词数据
    };
  },
  computed: {
    ...mapState({name:state=>state.user.name_cn}),
    // totalScore() {
    //   return this.shopCartList.reduce((total, item) => {
    //     return total + +item.Score;
    //   }, 0);
    // },
    // totalMoney() {
    //   return this.shopCartList.reduce((total, item) => {
    //     return total + +item.Price;
    //   }, 0);
    // },
    // totalNum() {
    //   return this.shopCartList.reduce((total, item) => {
    //     return total + item.Number;
    //   }, 0);
    // },
    // 是否已登录
    isLogin(){
      if(this.name){
        return true
      } 
      return false
    },
  },
  mounted(){
    // console.log(this.name);
    this.getShopCartData()
    this.getHotKeyword()
    
  },
  components: {
    Nav,
  },
  methods: {
    async handleGetCart(flag) {
      this.isShowCart = flag;
    },
    // 获取购物车数据
    async getShopCartData(){
      const res=await weAjax.get('/shopCartData');
      this.shopCartData=res.data;
    },
    // 获取关键词
    async getHotKeyword(){
      const res=await weAjax.get('/hotkeyword')
      // console.log(res);
      this.hotKeyword=res.data;
    },
    async logOut(){
       cookie.remove('userId')
       store.commit('LOGOUT')
    }
  },
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
#outer {
  background-color: #f3f2f7;
  .header {
    width: 1200px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    .toolbar {
      margin-bottom: 0;
      display: flex;
      font-size: 12px;
      color: #777;
      justify-content: flex-end;
      align-items: flex-end;
      padding-top: 10px;

      img {
        padding: 0 10px;
      }
      div {
        padding: 0 10px;
      }
      span {
        text-align: center;
      }
      .userInfo {
        border-left: 1px solid #777;
        border-right: 1px solid #777;
        padding: 0 10px;
      }

      .exit {
        padding: 0 17px 0 15px;
      }
    }
    .container {
      display: flex;
      justify-content: space-between;
      .a2 {
        margin-left: -70px;
      }
      .searchNav {
        width: 725px;
        position: relative;
        display: flex;
        justify-content: space-between;
        .searchCon {
          display: flex;
          flex-direction: column;
          .search {
            width: 538px;
            height: 30px;
            margin-top: 10px;
            float: left;
            background: #fff;
            border: 2px solid #223b61;
            input {
              width: 446px;
              height: 18px;
              padding: 6px;
              border: none;
            }
            button {
              width: 80px;
              height: 30px;
              border: none;
              background: #223b61;
              outline: none;
              color: #fff;
              cursor: pointer;
            }
          }
          ul {
            margin: 10px 0 15px 0;
            display: flex;
            a {
              cursor: pointer;
              margin-right: 15px;
            }
          }
        }
        .cart {
          width: 140px;
          height: 34px;
          text-align: center;
          margin-top: 10px;
          background: #f9f9f9;
          border: 1px solid #ccc;
          line-height: 34px;
          .icon {
            font-size: 22px;
          }
          .number {
            padding: 1px 9px;
            background: #ff7f00;
            color: #fff;
            border-radius: 8px;
            font-size: 10px;
            line-height: 14px;
            height: 14px;
          }
          .arrow {
            font-size: 15px;
          }
        }
        .cartList {
          height: auto;
          display: none;
          // display: flex;
          position: absolute;
          right: 1px;
          top: 44px;
          background: #f9f9f9;
          padding-bottom: 30px;
          width: 480px;
          z-index: 6;
          border: 1px solid #ccc;
          flex-direction: column;
          .cartData {
            display: flex;
            align-items: center;
            padding: 10px 10px;
            a {
              cursor: pointer;
              text-decoration: none;
              img {
                width: 75px;
                height: 75px;
              }
            }
            .info {
              flex-direction: column;
              display: flex;
              .title {
                font-size: 13px;
                max-height: 36px;
                overflow: hidden;
                width: 300px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                a {
                  cursor: pointer;
                  text-decoration: none;
                }
              }
              .money {
                color: #ff4c4c;
                font-size: 12px;
                b {
                  font-size: 20px;
                  padding: 0 3px;
                }
              }
            }
            .delete {
              width: 40px;
              text-align: center;
              border: none;
              color: #5aa5f0;
              text-decoration: underline;
              // position: absolute;
              // right: 10px;
              top: 50%;
              margin-top: -7px;
            }
          }
          .bottom {
            display: flex;
            height: 34px;
            line-height: 34px;
            background: #a7b2c0;
            color: #fff;
            font-size: 12px;
            bottom: 0;
            left: 0;
            position: absolute;
            width: 100%;
            z-index: 3;
            .left {
              width: 380px;
              display: flex;
              div {
                margin-left: 10px;
                b {
                  font-size: 16px;
                  padding: 0 3px;
                }
              }
            }
            .right {
              float: right;
              font-size: 16px;
              text-align: center;
              width: 100px;
              background: #ff7f00;
              a {
                display: block;
                width: 100%;
                color: #fff !important;
                border: none;
                margin-top: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
