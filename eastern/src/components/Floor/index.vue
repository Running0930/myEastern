<template>
  <div id="outer">
    <div class="floorTop">
      <span><b>{{floorData.FloorLevel}}</b> {{floorData.Title}}</span>
      <ul>
        <li :class="currentIndex===index?'active':''" v-for="(item,index) in floorData.HomeFloorItem" :key="item.HomeFloorItemID"
         @click="changeCurrentIndex(index)">{{item.Title}}</li>
      </ul>
    </div>
    <div class="floorContent">
      <div class="floorLeft">
        <a :href="`/typeDetail?pageCode=${floorData.pageCode}`" class="img">
          <img
            v-lazy="baseUrl+floorData.bigImgUrl"
            alt=""
          />
        </a>
        <div class="a1">
          <a href="#">平板电脑</a>
          <a href="#">手机</a>
          <a href="#">耳机耳麦</a>
        </div>
        <div class="a2">
          <ul>
            <li>苹果</li>
            <li>小米</li>
            <li>惠普</li>
            <li>BQ</li>
          </ul>
          <ul>
            <li class="actBor">华为</li>
            <li class="actBor">联想</li>
            <li class="actBor">Beats</li>
            <li class="actBor">大疆</li>
          </ul>
          <ul>
            <li>三星</li>
            <li>戴尔</li>
            <li>bose</li>
            <li>佳能</li>
          </ul>
        </div>
      </div>

      <div class="floorRight">
        <!-- 单个商品区域 -->
        <p @click="toGoodsDetail(pro.ProductSysNo)" v-for="pro in floorData.HomeFloorItem[currentIndex].HomeFloorProduct" :key="pro.ProductSysNo" >
          <img v-lazy="baseUrl+pro.ProductSrc" alt="">
          <span class="desc"
            >{{pro.ProductName}}</span
          >
          <span class="price">￥<b>{{pro.MaxPrice}}</b></span>
          <span class="jifen">最高可用{{pro.MaxPoints>9999?pro.MaxPoints/10000+'万':pro.MaxPoints}} 积分</span>
        </p>
        <!-- <p>
          <img
            src="http://ceair.oss-cn-shanghai.aliyuncs.com/image/Product/20201116/ps_94310627-64de-4b0a-9b09-eebeaa8f77b0.jpg"
            alt=""
          />
          <span
            >Apple iPhone 12 mini (A2400) 128GB 手机 支持移动联通电信5G</span
          >
          <span class="price">￥<b>5999</b></span>
          <span class="jifen">最高可用23.99万 积分</span>
        </p>
        <p>
          <img
            src="http://ceair.oss-cn-shanghai.aliyuncs.com/image/Product/20201116/ps_94310627-64de-4b0a-9b09-eebeaa8f77b0.jpg"
            alt=""
          />
          <span
            >Apple iPhone 12 mini (A2400) 128GB 手机 支持移动联通电信5G</span
          >
          <span class="price">￥<b>5999</b></span>
          <span class="jifen">最高可用23.99万 积分</span>
        </p>
        <p>
          <img
            src="http://ceair.oss-cn-shanghai.aliyuncs.com/image/Product/20201116/ps_94310627-64de-4b0a-9b09-eebeaa8f77b0.jpg"
            alt=""
          />
          <span
            >Apple iPhone 12 mini (A2400) 128GB 手机 支持移动联通电信5G</span
          >
          <span class="price">￥<b>5999</b></span>
          <span class="jifen">最高可用23.99万 积分</span>
        </p>
        <p>
          <img
            src="http://ceair.oss-cn-shanghai.aliyuncs.com/image/Product/20201116/ps_94310627-64de-4b0a-9b09-eebeaa8f77b0.jpg"
            alt=""
          />
          <span
            >Apple iPhone 12 mini (A2400) 128GB 手机 支持移动联通电信5G</span
          >
          <span class="price">￥<b>5999</b></span>
          <span class="jifen">最高可用23.99万 积分</span>
        </p>
        <p>
          <img
            src="http://ceair.oss-cn-shanghai.aliyuncs.com/image/Product/20201116/ps_94310627-64de-4b0a-9b09-eebeaa8f77b0.jpg"
            alt=""
          />
          <span
            >Apple iPhone 12 mini (A2400) 128GB 手机 支持移动联通电信5G</span
          >
          <span class="price">￥<b>5999</b></span>
          <span class="jifen">最高可用23.99万 积分</span>
        </p>
        <p>
          <img
            src="http://ceair.oss-cn-shanghai.aliyuncs.com/image/Product/20201116/ps_94310627-64de-4b0a-9b09-eebeaa8f77b0.jpg"
            alt=""
          />
          <span
            >Apple iPhone 12 mini (A2400) 128GB 手机 支持移动联通电信5G</span
          >
          <span class="price">￥<b>5999</b></span>
          <span class="jifen">最高可用23.99万 积分</span>
        </p>
        <p>
          <img
            src="http://ceair.oss-cn-shanghai.aliyuncs.com/image/Product/20201116/ps_94310627-64de-4b0a-9b09-eebeaa8f77b0.jpg"
            alt=""
          />
          <span
            >Apple iPhone 12 mini (A2400) 128GB 手机 支持移动联通电信5G</span
          >
          <span class="price">￥<b>5999</b></span>
          <span class="jifen">最高可用23.99万 积分</span>
        </p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Floor",
  data() {
    return {
      currentIndex:0,
      baseUrl: `http://ceair.oss-cn-shanghai.aliyuncs.com/image`
    };
  },
  props:['floorData'],
  mounted(){
    // console.log(this.floorData);
  },
  methods: {
    changeCurrentIndex(index){
      this.currentIndex=index;
    },
    // 去商品详情
    toGoodsDetail(id){
      this.$router.push(`/goodsDetail/${152040}`);
    },
    // 去类型详情页
    async toTypeDetail(pageUrl){
      // 切割页面码
      const pageCode=pageUrl.split('=')[1]
      this.$router.push(`/typeDetail?pageCode=${pageCode}`)
    }
  },
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
#outer {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin: 0 auto;
  .floorTop {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 18px;
      color: #444;
      font-weight: bold;
      b {
        display: inline-block;
        text-align: center;
        line-height: 30px;
        width: 30px;
        height: 30px;
        background-color: #5AA5F0;
        border-radius: 12px;
        color: #fff;
      }
    }
    ul {
      display: flex;
      li {
        height: 38px;
        line-height: 38px;
        padding: 0 23px;
        cursor: pointer;
        font-size: 16px;
        &.active {
          color: #5bb4fb;
          border-bottom: 2px solid #5bb4fb;
          font-weight: 700;
        }
      }
    }
  }
  .floorContent {
    display: flex;
    .floorLeft {
      width: 555px;
      font-size: 12px;
      background: #e8e8e3;
      .img {
        width: 100%;
        img {
          width: 100%;
          height: 236px;
        }
      }

      .a1 {
        height: 60px;
        text-align: center;
        line-height: 60px;
        background: #7a797c;
        a {
          color: #fff;
          padding: 0 10px;
          font-size: 20px;
          font-weight: bold;
        }
        a+a{
          border-left: 3px solid #fff;
        }
      }
      .a2 {
        display: flex;
        justify-content: space-around;
        ul+ul{
            border-left: 1px solid #fff;
          }
        ul {
          display: flex;
          flex-direction: column;
          height: 158px;
          width:105px;
          margin:10px auto;
          text-align: center;
          color:#94948D;
          li {
            font-size: 12px;
            background: #e8e8e3;
            width: 100%;
            height: 158px;
            padding: 5px 0;
            cursor: pointer;
            position: relative;
            z-index: 1;
            &:hover{
              color:#5bb4fb;
            }
          }
          
        }
      }
    }
    .floorRight {
      outline: #F3F2F7 solid 1px;
      display: flex;
      flex-wrap: wrap;
      height: 470px;
      overflow: hidden;
      /* width: 220px; */
      // padding-top: 30px;
      p {
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        outline: #F3F2F7 solid 1px;
        padding:10px 0;
        img {
          width: 130px;
          height: 130px;
          cursor: pointer;
        }
        .desc{
          padding:2px 0;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp:2;
          -webkit-box-orient: vertical;
        }
        .price {
          color: #ff4c4c;
          font-size: 20px;
          
          
          padding:5px 0;
          b{
font-weight: 900;
          }
        }
        .jifen {
          color: #a5a5a5;
        }
        span {
          width: 190px;
          &:nth-of-type(1):hover{
            color:#5bb4fb;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
