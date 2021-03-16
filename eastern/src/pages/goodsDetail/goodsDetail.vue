<template>
  <div class="header">
    <!-- 导航路径区域 -->
    <div class="conPoin">
      <!-- 商品分类详情 -->
      <ul class="breadcrumb">
        <li>
          您所在的位置
        </li>
        <li>
          <a href="###">首页</a>
          <span>></span>
        </li>
        <li>
          <a href="###">{{ categoryView.C1Name }}</a>
          <span>></span>
        </li>
        <li>
          <a href="###">{{ categoryView.C2Name }}</a>
          <span>></span>
        </li>
        <li>
          <a href="###">{{ categoryView.C3Name }}</a>
        </li>
      </ul>

      <!--  商品详情区域 -->
      <div class="mainCon">
        <div class="mainCon-left">
          <div class="mainCon-title">
            <div>{{ detailList.name }}</div>
            <div>
              <div>商品编号</div>
              <div>{{ detailList.product_no }}</div>
            </div>
          </div>

          <div class="prodesc">
            {{ detailList.recommend_desc }}
          </div>

          <!-- 放大镜区域 -->
          <div class="product_img">
            <div class="product_img1">
              <Zoom
                v-if="detailList.picture"
                :samilImg="detailList.picture[currentIndex].picUrl"
                :bigImg="detailList.picture[currentIndex].picUrl"
              />
              <ImageList
                :picUrl="detailList.picture"
                v-if="detailList.picture"
                @changeCurrentIndex="changeCurrentIndex"
                :currentIndex="currentIndex"
              />
            </div>
            <div class="product_title">
              <div class="item">
                <div class="item-one">商城价</div>
                <div class="item1" v-if="detailList.priceList">
                  <span>现金</span>
                  <span class="pialc">{{
                    detailList.priceList[0].maxPrice
                  }}</span>
                </div>
              </div>
              <div class="item">
                <div class="item-one">积分购</div>
                <div class="w360" v-if="detailList.priceList">
                  <div @click="integral(-100)">-</div>
                  <input
                    type="text"
                    v-model="maxPoint"
                    @change="iptMaxPoint($event)"
                    @click="iptMaxPoint2 = maxPoint"
                  />
                  <div @click="integral(+100)">+</div>
                </div>
                积分 + ￥
                <strong>{{ maxPointPrice }}</strong
                >现金
              </div>
              <div class="item">
                <div class="item-one">操作说明</div>
                <div class="item-explain">
                  调整积分范围,现金会随着积分加减而变化
                </div>
              </div>
              <!-- 商品规格 -->
              <div
                class="item"
                v-for="(attr, index) in attributes"
                :key="index"
              >
                <div class="item-one">{{ attr.name }}</div>
                <div class="tc_w360">
                  <div
                    :class="{ active: list.data_sysno === 0 }"
                    v-for="list in attr.values"
                    @click="ckuActive(attr, list)"
                    :key="list.id"
                  >
                    <a href="###">{{ list.Name }}</a>
                  </div>
                </div>
              </div>

              <div class="item">
                <div class="item-one">数量</div>
                <div class="productnum">
                  <div class="productnum_inp">
                    <input type="text" v-model="commodityNum" disabled />
                    <div class="productnum_add">
                      <div @click="setcommodityNum(1)">+</div>
                      <div @click="setcommodityNum(-1)">-</div>
                    </div>
                  </div>
                  <div>
                    剩余 <span>{{ quanity }}</span
                    >件
                  </div>
                  <div class="productnum_inp-title">
                    最多可奖<i>3000</i>积分
                  </div>
                </div>
              </div>

              <div class="orangeTip">
                开通积分加速包，享最高8888奖励积分 立即开通 >
              </div>
              <!-- 购物车 -->
              <div class="btnBlue">
                <div class="btnBlue_active">
                  <span href="###" class="buy">立即购买</span>
                </div>
                <div>
                  <span href="###" class="iconfont icon-gouwuche">
                    加入购物车</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mainCon-right">
          <div class="brand_type" v-if="detailList.CustomerInfo">
            <div>
              <p>商户名称：</p>
              <span>{{ detailList.CustomerInfo.CTName }}</span>
            </div>
            <div>
              <p>服务热线：</p>
              <span>{{ detailList.CustomerInfo.ServiceTel }}</span>
            </div>
            <div>
              <p>服务时间：</p>
              <span>{{ detailList.CustomerInfo.ServiceTime }}</span>
            </div>
          </div>
          <div class="servicesupport">
            <p>
              服务支持：
            </p>
            <p>全国配送</p>
            <p>全场包邮</p>
          </div>
        </div>
      </div>
    </div>

    <div class="tap_footer">
      <div class="tap">
        <div class="tap_left">
          <div class="keyword_top">
            推荐关键字
          </div>
          <div class="keyword">
            <a href="###" v-for="item in GetEPListBy" :key="item.PageUrl">{{
              item.Title
            }}</a>
          </div>
          <div class="classification">
            推荐分类
          </div>
          <div class="classification_title">
            <a href="###" v-for="item in GetEPListByList" :key="item.PageUrl">{{
              item.Title
            }}</a>
          </div>
        </div>

        <div class="tap_switch">
          <Bottap :detailList="detailList" />
        </div>
      </div>
    </div>
    <div class="ImageListFot">
      <ImageListFot />
    </div>
  </div>
</template>

<script>
import Zoom from "./Zoom/Zoom";
import ImageList from "./ImageList/ImageList";
import Bottap from "./bottap/Bottap";
import ImageListFot from "./ImageListFot/ImageListFot";
import { Message } from "element-ui";

// 节流
import { mapState } from "vuex";

export default {
  name: "goodsDetail",
  data() {
    return {
      skyId: 219773, //商品id
      attributes: [],
      couponId: 166, //推荐id
      currentIndex: 0,
      commodityNum: 1,
      skuState: 0,
      GetEPListBy: [], //推荐关键字
      GetEPListByList: [],
      BrowseRecord: [], //底部轮播图
      quanity: 0, //库存,
      maxPoint: 0, //积分,
      maxPointPrice: 0, //积分现金
      iptMaxPoint2: 0
    };
  },
  computed: {
    ...mapState({
      detailList: state => state.detail.detailList,
      categoryView: state => state.detail.categoryView
    })
  },
  components: {
    Zoom,
    ImageList,
    Bottap,
    ImageListFot
  },
  watch: {
    $route:{
      immediate:true,
      deep:true,
      handler(route){
        this.skyId=route.params.skyId
      }
    }
  },
  async mounted() {
    // 积分
    // this.maxPoint = this.detailList.priceList[0].maxPoint;
    // 底部轮播图
    const BrowseRecord = await this.$api.reqBrowseRecord();
    this.BrowseRecord = Object.freeze(BrowseRecord);
    this.getdetailList();
    if (this.couponId === 166) {
      const a = "Pc_Ad_00008";
      const b = "Pc_Ad_00009";
      // 推荐关键字
      const resuit = await this.$api.reqGetEPListBy(a);

      // 推荐分类
      const resuit1 = await this.$api.reqGetEPListBy(b);
      // 数据冻结
      this.GetEPListBy = Object.freeze(resuit.data.Data.Market_EP_ItemInfos);
      this.GetEPListByList = Object.freeze(resuit1.data.Data.Market_EP_ItemInfos);
    }
    this.quanity = this.detailList.stock[0].quanity;
    this.maxPoint = this.detailList.priceList[0].maxPoint;
    // console.log(this.detailList.priceList[0].maxPoint);
  },

  methods: {
    ckuActive(attr, list) {
      this.detailList.stock.forEach(item => {
        if (list.Name == item.stock_title) {
          this.quanity = item.quanity;
        }
      });
      attr.values.forEach(item1 => {
        item1.data_sysno = -1;
      });
      list.data_sysno = 0;
    },
    // 小图数据
    changeCurrentIndex(index) {
      this.currentIndex = index;
    },
    // 商品数量
    setcommodityNum(num) {
      this.commodityNum = this.commodityNum + num;
      if (this.commodityNum <= 1) {
        this.commodityNum = 1;
        return;
      }
    },
    // 商品详情
    async getdetailList() {
      await this.$store.dispatch("getdetailList", this.skyId);
      await this.$store.dispatch("getClassification", this.couponId);
      this.attributes = this.detailList.attributes;
    },
    // 积分
    integral(num) {
      if (num === 100 && this.maxPointPrice == 0) {
        Message.error("积分或现金超出范围");
        return;
      }
      this.maxPoint += num;
      this.maxPointPrice += -(num / 100) * 2.5;
    },
    // 积分现金
    iptMaxPoint(e) {
      if (
        e.target.value <= 0 ||
        e.target.value > this.detailList.priceList[0].maxPoint
      ) {
        Message.error("积分或现金超出范围");
        this.maxPoint = this.iptMaxPoint2;
        return;
      }
      console.log(e.target.value, this.iptMaxPoint2);
      this.maxPointPrice += Math.floor(
        (-(e.target.value - this.iptMaxPoint2) / 100) * 2.5
      );
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  background-color: #fff;
  .ImageListFot {
    background: #f3f2f7;
  }
}
.conPoin {
  background: #f3f2f7;
  .breadcrumb {
    width: 1200px;
    height: auto;
    padding: 11px 15px;
    margin: 0 auto;
    font-size: 12px;
    li {
      display: inline-block;
      a {
        margin: 0 6px;
        text-decoration: none;
        color: #444;
      }
    }
  }
  .mainCon {
    display: flex;
    min-height: 600px;
    margin: 0 auto;
    border: 1px solid #e7e4eb;
    background: #fff;
    width: 1200px;
    height: auto;
    .prodesc {
      line-height: 20px;
      overflow: hidden;
      max-height: 39px;
      margin-left: 20px;
      padding: 5px 0;
      color: red;
    }
    .mainCon-left {
      min-height: 600px;
      border-right: 1px solid #f2f2f2;
      width: 971px;
      height: auto;
      _height: 600px;
      .product_img {
        display: flex;
        margin-left: 15px;
        .product_img1 {
          width: 420px;
        }
        .product_title {
          width: 520px;
          .btnBlue {
            margin: 20px 0;
            width: 100%;
            display: flex;
            justify-content: space-around;
            .icon-gouwuchekong {
              font-size: 18px;
            }
            .btnBlue_active {
              background: #cee4fb;
            }
            div {
              border-radius: 10px;
              background: #5bb4fb;
              border: 2px solid #5bb4fb;
              color: #5bb4fb;
              height: 36px;
              line-height: 36px;
              
              span {
                width: 200px;
                height: 40px;
                border-radius: 10px;
                line-height: 40px;
                text-align: center;
                color: #fff;
                display: inline-block;
                text-decoration: none;
                cursor: pointer;
                &.buy{
                font-size: 16px;
                color:#5bb4fb;
              }
              }
            }
          }
          .orangeTip {
            width: 100%;
            background: rgba(255, 127, 2, 0.1);
            color: #ff7f02;
            padding: 10px 0 10px 20px;
            box-sizing: border-box;
            margin-top: 30px;
          }
          .item {
            border: 1px solid #f7f5f8;
            width: 511px;
            display: flex;
            font-size: 12px;
            line-height: 50px;
            .item-explain {
              font-size: 12px;
              margin-left: 15px;
            }
            .productnum {
              display: flex;
              align-items: center;
              margin-left: 15px;
              .productnum_inp-title {
                margin-left: 100px;
                i {
                  margin: 0 6px;
                  color: rgb(177, 70, 70);
                }
              }
              .productnum_inp {
                display: flex;
                align-items: center;
                .productnum_add {
                  margin-right: 10px;
                  display: flex;
                  flex-direction: column;
                  div {
                    border: 1px solid #a4a1ad;
                    line-height: 20px;
                    width: 20px;
                    text-align: center;
                    height: 20px;
                  }
                }
                input {
                  border: 1px solid #a4a1ad;
                  padding-left: 10px;
                  width: 40px;
                  height: 40px;
                  outline: none;
                }
              }
            }
            .tc_w360 {
              display: flex;
              font-size: 12px;
              align-items: center;
              flex-wrap: wrap;
              div {
                margin: 10px;
                line-height: 30px;
                margin-left: 15px;
                text-align: center;
                background-color: #f2f2f2;
                padding: 0 8px;
                border: 1px solid #ccc;
                a {
                  color: #000;
                  width: 40px;
                  text-decoration: none;
                }
              }
              .active {
                border: 1px solid blue;
                background-color: rgb(100, 152, 230);
                a {
                  color: #fff;
                }
              }
            }
            .w360 {
              font-size: 18px;
              margin: 0 15px;
              display: flex;
              line-height: 30px;
              align-items: center;
              div {
                text-align: center;
                width: 30px;
                height: 30px;
                border: 1px solid #ccc;
              }
              input {
                width: 60px;
                border: 1px solid #ccc;
                height: 30px;
                outline: none;
                padding-left: 10px;
              }
            }
            .item1 {
              margin-left: 15px;
              font-size: 12px;
              .pialc {
                margin-left: 5px;
                font-size: 18px;
                color: red;
              }
            }
            .item-one {
              border-right: 1px solid #f7f5f8;
              width: 100px;
              text-align: right;
              padding-right: 18px;
            }
          }
        }
      }
      .mainCon-title {
        display: flex;
        justify-content: space-between;
        margin: 20px 20px 0;
        font-size: 18px;
        div:nth-of-type(2) {
          display: flex;
          font-size: 12px;
          height: 30px;
          div:nth-of-type(1) {
            width: 70px;
            text-align: center;
            color: #ff7f00;
            border: 1px solid #ff7f00;
            line-height: 30px;
          }
          div:nth-of-type(2) {
            overflow: hidden;
            color: #fff;
            background: #ff7f00;
            border: 1px solid #ff7f00;
            text-align: center;
            line-height: 30px;
          }
        }
      }
    }

    .mainCon-right {
      font-size: 12px;
      width: 180px;
      padding: 0 20px;
      .brand_type {
        border-bottom: 1px solid #ccc;
        line-height: 160%;
        padding: 30px 8px;
        span {
          margin-left: 20px;
        }
      }
      .servicesupport {
        line-height: 160%;
        margin: 20px;
      }
    }
  }
}
.tap_footer {
  background-color: #f3f2f7;
}
.tap {
  width: 1200px;
  display: flex;
  padding-top: 10px;
  margin: 0 auto;
  background-color: #f3f2f7;
  .tap_left {
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: #f3f2f7;
    .keyword_top {
      text-align: center;
      line-height: 40px;
      width: 210px;
      height: 40px;
      background: #f5f5f5;
      padding-left: 10px;
    }
    .keyword {
      padding-left: 10px;
      width: 210px;
      height: 200px;
      font-size: 12px;
      text-align: left;
      background-color: #fff;
      a {
        display: inline-block;
        text-decoration: none;
        margin: 8px 5px 0;
        background: #f1f1f1;
        padding: 2px 6px;
        color: #000;
      }
    }
    .classification {
      text-align: center;
      line-height: 40px;
      width: 210px;
      height: 40px;
      background: #f5f5f5;
      padding-left: 10px;
    }
    .classification_title {
      background-color: #fff;
      font-size: 12px;
      padding: 5px 8px;
      float: left;
      line-height: 200%;
      width: 200px;
      a {
        float: left;
        display: inline-block;
        overflow: hidden;
        width: 50%;
        text-decoration: none;
        color: #000;
      }
    }
  }
  .tap_switch {
    width: 980px;
    text-align: center;
    padding: 10px;
  }
}
</style>
