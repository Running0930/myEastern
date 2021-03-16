<template>
  <div class="searchContainer">
    <!-- 搜索导航 -->
    <div class="searchNav">
      你所在的位置:<a>首页</a><span>></span><a>华为 Mate</a>
    </div>
    <!-- 选择区域 -->
    <div class="selectArea">
      <!-- 选择标题 -->
      <div class="selectTitle">
        <div>分类</div>
        <div>品牌</div>
        <div>价格</div>
        <div>积分</div>
      </div>

      <!-- 选择内容 -->
      <div class="selectContent">
        <!-- 分类列 -->
        <ul class="categoryList">
          <li v-for="category in category3" :key="category.id">
            {{ category.name }}
          </li>
        </ul>
        <!-- 品牌列 -->
        <ul class="brandList">
          <li v-for="brand in brands" :key="brand.id">{{ brand.name }}</li>
        </ul>
        <!-- 价格列 -->
        <ul class="priceList">
          <li>0-20元</li>
          <li>20-60元</li>
          <li>60-100元</li>
          <li>100-120元</li>
          <li>200-500元</li>
          <li>500-1000元</li>
          <li>1000-2000元</li>
          <li>2000元以上</li>
        </ul>
        <!-- 积分列 -->
        <ul class="scoreList">
          <li>0-4000分</li>
          <li>4000-20000分</li>
          <li>20000-40000分</li>
          <li>40000-48000分</li>
          <li>48000-60000分</li>
          <li>60000-68000分</li>
          <li>68000-80000分</li>
          <li>80000分以上</li>
        </ul>
      </div>
    </div>

    <!-- 选购区域 -->
    <div class="chooseArea">
      <!-- 侧边栏 -->
      <div class="sideBar">
        <div class="advertising">
          <div class="title">推广产品</div>
          <ul class="imgList">
            <li>
              <img src="../../static/images/search/sidebar1.jpg" alt="" />
            </li>
            <li>
              <img src="../../static/images/search/sidebar2.jpg" alt="" />
            </li>
          </ul>
        </div>
        <div class="advertising">
          <div class="title">推荐专题</div>
          <ul class="imgList">
            <li>
              <img src="../../static/images/search/sidebar3.jpg" alt="" />
            </li>
            <li>
              <img src="../../static/images/search/sidebar4.jpg" alt="" />
            </li>
            <li>
              <img src="../../static/images/search/sidebar5.jpg" alt="" />
            </li>
          </ul>
        </div>
      </div>
      <!-- 商品区 -->
      <div class="goodsArea">
        <!-- 商品排序 -->
        <div class="goodsOrder">
          <div class="left">
            <span>综合排序</span>
            <span class="active">新品优先</span>
            <span>销量▲▼</span>
            <span>价格▲▼</span>
          </div>
          <div class="right">
            <span>1/3页</span>
            <span class="disabled">上一页</span>
            <span class="active">下一页</span>
          </div>
        </div>
        <!-- 商品列表 -->
        <ul class="goodsList">
          <!-- 商品项 -->
          <li
            class="goodsItem"
            v-for="product in productList"
            :key="product.id"
          >
            <p class="goodsImg">
              <img v-lazy="baseUrl + product.picUrl" alt="" />
            </p>
            <p href="" class="goodsDesc">
              {{ product.name }}
            </p>
            <span class="pricce"
              >￥<span class="priceNum">{{ product.currentPrice }}</span></span
            >
            <div class="otherDesc">
              最高可以使用{{
                product.max_point > 10000
                  ? product.max_point / 10000 + "万"
                  : product.max_point
              }}积分
            </div>
            <p href="" class="toCart">
              加入购物车<i class="iconfont icon-jia"></i>
            </p>
          </li>
        </ul>
        <!-- 分页区域 -->
        <ul class="pageArea">
          <li>上一页</li>
          <li class="pageNum active">1</li>
          <li class="pageNum">2</li>
          <li class="pageNum">3</li>
          <li>下一页</li>
          <li>当前第1页/共3页<input type="text" /><button>确定</button></li>
        </ul>
      </div>
    </div>

    <!-- 最近浏览记录 -->
    <!-- <b class="recentBrowseText">最近浏览记录</b> -->
    <!-- <div class="recentBrowse">
      <div class="moveLeft">
        <i class="iconfont icon-left"></i>
      </div> -->
      <!-- 浏览记录内容 -->
      <!-- <ul class="browseHistory">
        <li v-for="item in recentBrowseData" :key="item.SysNo">
          <p class="goodsImg">
            <img v-lazy="baseUrl + item.PictureUrl" alt="" />
            
          </p>
          <p href="" class="goodsDesc">
            {{ item.ProductName }}
          </p>
          <span class="pricce"
            >现金<span class="priceNum">{{ item.MaxPrice }}</span></span
          >
          <div class="otherDesc">
            最高可以使用{{
              item.MaxPoints > 10000
                ? item.MaxPoints / 10000 + "万"
                : item.MaxPoints
            }}积分
          </div>
        </li>
      </ul> -->
      <!-- <div class="moveright">
        <i class="iconfont icon-right"></i>
      </div>
    </div> -->
    <ImageListFot/>
  </div>
</template>
<script>
import weAjax from "@/utils/weAjax";
import ajax from "@/api/ajax.js";
import { reqBrowseRecord } from "@/api";
export default {
  name: "search",
  data() {
    return {
      baseUrl: `http://ceair.oss-cn-shanghai.aliyuncs.com/image`, //图片基础路径
      recentBrowseData: [], //保存最近浏览数据
      category3: [], //保存3级分类数据
      brands: [], //保存品牌数据
      productList: [], //保存商品列表数据
    };
  },
  created() {},
  mounted() {
    this.getRecentBrowse();
    this.getSearchData();
  },

  methods: {
    // 获取最近浏览记录
    async getRecentBrowse() {
      const res = await reqBrowseRecord();
      // console.log(res);
      this.recentBrowseData = res.data.Data;
    },
    // 获取搜索页数据
    async getSearchData() {
      const res = await weAjax.get("/search");
      // console.log(res.data);
      // 结构3级分类数据 品牌数据 商品列表数据
      const { Category3s, Brands, product } = res.data;
      // 保存数据
      this.category3 = Category3s;
      this.brands = Brands;
      this.productList = product;
    },
  },
};
</script>
<style lang="less" scoped>

.searchContainer {
  margin: 0 auto;
  width: 1200px;
  // height: 100%;
  // 搜索导航
  .searchNav {
    font-size: 12px;
    padding: 10px 0;
    a {
      color: #444;
    }
    span {
      padding: 0 5px;
      color: #ccc;
    }
  }
  // 筛选区域
  .selectArea {
    width: 1200px;
    height: auto;
    min-height: 40px;
    padding: 10px 0;
    margin: 0 auto 25px;
    position: relative;
    z-index: 1;
    background-color: #fff;
    display: flex;

    .selectTitle {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 84px;
      font-weight: 700;
      padding: 0 20px 0 10px;
      text-align: right;
      border-right: 1px solid #ededed;
      font-size: 12px;
    }
    .selectContent {
      width: auto;
      font-size: 12px;
      ul {
        display: flex;
        list-style-type: none;
        justify-content: left;
        padding-left: 10px;
        width: 100%;
        margin: 10px 0;
        li {
          cursor: pointer;
          width: 100px;
          margin-right: 10px;
          color: #444;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          &:hover {
            color: #5bb4fb;
          }
        }
      }
    }
  }
  // 选购区域
  .chooseArea {
    display: flex;
    // 侧边栏
    .sideBar {
      // 广告
      .advertising {
        .title {
          height: 20px;
          width: 210px !important;
          line-height: 20px;
          background: #f5f5f5;
          text-align: center;
          font-size: 15px;
          color: #444;
          font-size: 15px;
          font-weight: 900;
          padding:20px 0;
        }
        .imgList {
          list-style: none;
          padding: 0;
          background: #fff;
          width: 210px;
          li {
            padding-top: 5px;
            width: 100%;
            height: 246px;
            img {
              width: 100%;
              height: 100%;
              cursor: pointer;
            }
          }
        }
      }
    }
    // 商品区
    .goodsArea {
      margin-left: 10px;
      width: 980px;

      // 商品排序栏
      .goodsOrder {
        width: 979px;
        height: 40px;
        background: #f5f5f5;
        border: 1px solid #e8e8e8;
        line-height: 50px;
        font-size: 12px;
        color: #444;
        display: flex;
        justify-content: space-between;
        .left {
          display: flex;
          justify-content: flex-start;
          width: 50%;
          height: 40px;
          span {
            display: inline-block;
            width: auto;
            line-height: 40px;
            text-align: center;
            padding: 0 15px;
            &.active {
              background: #fff;
            }
          }
        }
        .right {
          display: flex;
          justify-content: flex-end;
          width: 50%;
          height: 40px;
          span {
            width: auto;
            line-height: 40px;
            border-left: 1px solid #e8e8e8;
            text-align: center;
            padding: 0 15px;
            &.active {
              background: #fff;
            }
            &.disabled {
              color: #e1e1e1;
              cursor: default;
            }
          }
        }
        span:hover {
          cursor: pointer;
          color: #5bb4fb;
        }
      }
      // 商品列表
      .goodsList {
        height: auto;
        min-height: 600px;
        list-style-type: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        width: 980px;
        .goodsItem {
          background: #fff;
          width: 25%;
          height: 250px;
          flex-shrink: 0;
          padding-bottom: 40px;
          margin-bottom: 10px;
          outline: #f3f2f7 solid 1px;

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
            height: 36px;
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
          .toCart {
            width: 100%;
            height: 40px;
            font-size: 14px;
            color: #a3a3a3;
            background: #f9f9fb;
            border: 1px solid #e8e8e8;

            line-height: 40px;
            text-align: center;
            position: relative;
            i {
              font-size: 20px;
              position: absolute;
              right: 20px;
            }
            &:hover {
              background: #fff;
            }
          }
          p:hover {
            cursor: pointer;
            color: #5bb4fb;
          }
          &:hover {
            box-shadow: 0 0 15px #ccc;
            position: relative;
            z-index: 2;
          }
        }
      }
      // 分页区域
      .pageArea {
        display: flex;
        justify-content: flex-end;
        list-style: none;

        li {
          margin-right: 10px;
          color: #666;
          font-size: 12px;
          height: 30px;
          line-height: 30px;
          &.pageNum {
            display: inline-block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            text-align: center;
          }
          &.pageNum.active {
            color: #fff;
            background-color: #5aa5f0;
          }
          input {
            width: 35px;
            height: 20px;
            margin: 0 10px;
          }
        }
      }
    }
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
      li {
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
