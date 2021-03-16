<template>
  <div>
    <!-- 头部 -->
    <div class="headPart">
      <img
        :src="titleImg"
        alt=""
      />
      <!-- <img
        :src="GoodsInfoList[0].dataTagList[0].dataInfoList[0].imageUrl"
        alt=""
      /> -->
    </div>

    <!-- 体部 -->
    <div class="bodyPart">
      <!-- 第一部分 -->
      <div class="PartOne" v-for="part in GoodsInfoList" :key="part.id">
        <!-- 第一部分的头部 -->
        <h2 class="titleOne">{{ part.titleName }}</h2>
        <!-- 第一部分的详情 -->
        <div class="PartOneDetail">
          <!-- 详情一 -->
          <div class="detailOne">
            <!-- 左边 -->
            <div class="detailOneLeft">
              <a href="###">
                <img v-lazy="part.goodsInfoList[0].imageUrl" alt="" />
              </a>
            </div>
            <!-- 右边 -->
            <div class="detailOneRight">
              <a class="detail_title" href="http://www.baidu.com">{{
                part.goodsInfoList[0].title
              }}</a>
              <div class="RightBody">
                <p>最高返{{ part.goodsInfoList[0].salePrice }}分</p>
                <p>
                  <span class="symbal">¥</span>
                  <span class="price">{{
                    part.goodsInfoList[0].salePrice
                  }}起</span>
                </p>
                <p>
                  <span class="price">{{
                    part.goodsInfoList[0].originalPoint
                  }}</span>
                  <span class="addPoint">积分兑</span>
                </p>
              </div>
              <p class="goShop">立刻购买</p>
            </div>
          </div>
          <!-- 详情二 -->
          <div class="detailTow">
            <!-- 第一行 -->
            <div class="showImg">
              <div
                class="Img"
                v-for="(goods, index) in part.goodsInfoList"
                :key="goods.id"
                v-show="index > 0"
              >
                <a :href="goods.dataurl">
                  <img v-lazy="goods.imageUrl" alt="" />
                  <p>{{ goods.title }}</p>
                  <p class="btn" style="margin:10px 0;">最高返{{ goods.originalPrice }}分</p>
                  <div class="pricePoint">
                    <p>
                      ¥ <span>{{ goods.originalPrice }}起</span>
                    </p>
                    <p>
                      <span>{{ goods.originalPoint }}</span>
                      <span>积分兑</span>
                    </p>
                  </div>
                  <p class="empty" style="display: none;">已售空</p>
                </a>
              </div>
            </div>
            <!-- 第二行 -->
            <!-- <div class="showImg">
              <div class="Img">
                <img src="../assets/nice.png" alt="" />
                <p>ChowSangSang 周生生 格桑花黄金吊坠 不含项链 86941p</p>
                <p>最高返123分</p>
                <div class="pricePoint">
                  <p>¥ <span>1150</span></p>
                  <p>
                    <span>4600</span>
                    <span>积分兑</span>
                  </p>
                </div>
                <p class="empty" style="display: none;">已售空</p>
              </div>
              <div class="Img">
                <img src="../assets/nice.png" alt="" />
                <p>ChowSangSang 周生生 格桑花黄金吊坠 不含项链 86941p</p>
                <p>最高返123分</p>
                <div class="pricePoint">
                  <p>¥ <span>1150</span></p>
                  <p>
                    <span>4600</span>
                    <span>积分兑</span>
                  </p>
                </div>
                <p class="empty" style="display: none;">已售空</p>
              </div>
              <div class="Img">
                <img src="../assets/nice.png" alt="" />
                <p>ChowSangSang 周生生 格桑花黄金吊坠 不含项链 86941p</p>
                <p>最高返123分</p>
                <div class="pricePoint">
                  <p>¥ <span>1150</span></p>
                  <p>
                    <span>4600</span>
                    <span>积分兑</span>
                  </p>
                </div>
                <p class="empty" style="display: none;">已售空</p>
              </div>
            </div> -->
            <!-- 第三行 -->
            <!-- <div class="showImg">
              <div class="Img">
                <img src="../assets/nice.png" alt="" />
                <p>ChowSangSang 周生生 格桑花黄金吊坠 不含项链 86941p</p>
                <p>最高返123分</p>
                <div class="pricePoint">
                  <p>¥ <span>1150</span></p>
                  <p>
                    <span>4600</span>
                    <span>积分兑</span>
                  </p>
                </div>
                <p class="empty" style="display: none;">已售空</p>
              </div>
              <div class="Img">
                <img src="../assets/nice.png" alt="" />
                <p>ChowSangSang 周生生 格桑花黄金吊坠 不含项链 86941p</p>
                <p>最高返123分</p>
                <div class="pricePoint">
                  <p>¥ <span>1150</span></p>
                  <p>
                    <span>4600</span>
                    <span>积分兑</span>
                  </p>
                </div>
                <p class="empty" style="display: none;">已售空</p>
              </div>
              <div class="Img">
                <img src="../assets/nice.png" alt="" />
                <p>ChowSangSang 周生生 格桑花黄金吊坠 不含项链 86941p</p>
                <p>最高返123分</p>
                <div class="pricePoint">
                  <p>¥ <span>1150</span></p>
                  <p>
                    <span>4600</span>
                    <span>积分兑</span>
                  </p>
                </div>
                <p class="empty" style="display: none;">已售空</p>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGoodsType } from "@/api";
export default {
  name: "typeDetail",
  data() {
    return {
      GoodsInfoList: [],
      titleImg: "",
    };
  },
  mounted() {
    this.getGoodsType();

    // console.log(this.GoodsInfoList[0].dataTagList[0].dataInfoListLevel1[0].imageUrl);
  },
  methods: {
    async getGoodsType() {
      // console.log(this.$route.query);
     const {pageCode} =this.$route.query
      let TypeParams = {
        isPreview: "",
        pageCode,
        // pageCode: "MALL_M15320_2021011909350985",
        platform: 0,
        reqId: "string",
      };
      // this.$store.dispatch('getGoodsType',TypeParams)
      let result = await reqGoodsType(TypeParams);
      // console.log(result);
      result = result.data;
      if (result.code === "0") {
        let { moduleTagList } = result.data[0];
        let { moduleList } = moduleTagList.length > 0 ? moduleTagList[0] : [];
        // console.log(moduleList);
        // 标题图
        this.titleImg =
          moduleList[0].dataTagList[0].dataInfoListLevel1[0].imageUrl;

        // 过滤商品部分图
        moduleList = moduleList.filter((item) => item.titleName);
        console.log(moduleList);

        this.GoodsInfoList = moduleList.map((item) => {
          item.goodsInfoList =
            item.dataTagList.length > 0 ? item.dataTagList[0].dataInfoList : [];
          return item;
        });

        console.log(this.GoodsInfoList, "GoodsInfoList");
      }
    },
  },
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
a {
  text-decoration: none !important;
  color: #000;
}

// 头部
.headPart img {
  width: 100%;
  height: 367px;
}

//体部
.bodyPart {
  width: 1200px;
  margin: auto;
  box-sizing: border-box;
}

//第一部分
.PartOne {
  margin-top: 40px;
}

// 第一部分的头部
.titleOne {
  text-align: center;
}

//第一部分的详情一
.detailOne {
  border: 1px solid #bfa253;
  border-bottom-color: #fcf9f0;
  padding: 10px;
}

.detailOneLeft {
  img {
    width: 727px;
    height: 380px;
  }
}

.detailOne {
  display: flex;
}

.detailOneRight {
  width: 410px;
  flex-grow: 1;
  text-align: center;
  padding: 30px;

  .detail_title {
    font-size: 24px;
    font-weight: bold;
    display: inline-block;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .RightBody {
    padding: 50px 0 20px 0;
  }
}

.RightBody p:nth-child(1) {
  display: inline;
  padding: 3px 24px;
  background-color: #fcf9f0;
  border: 1px solid #a17c00;
  color: #a17c00;
  font-size: 14px;
  border-radius: 15px;
  
}

.RightBody p:nth-child(2) {
  // padding: 15px 0 0 0;
  color: #cb1e36;
  font-weight: bold;

  .price {
    font-size: 40px;
  }
}

.RightBody p:nth-child(3) {
  .price {
    font-size: 18px;
  }
}

.goShop {
  display: inline;
  color: rgb(241, 105, 219);
  border: 1px solid rgb(241, 105, 219);
  padding: 8px 120px;
}

//第一部分的详情二
.detailTow {
  border: 1px solid #bfa253;
  padding: 10px;
}

.showImg {
  display: flex;
  flex-wrap: wrap;
  // margin: 0 0 20px 0;
  .Img {
    justify-content: space-around;
    width: 370px;
    margin-right: 20px;
  }
}


.showImg .Img img {
  // border: 1px solid #000;
  width: 370px;
  height: 370px;
}

.showImg .Img :nth-child(2) {
  font-weight: bold;
  
}

.showImg .Img :nth-child(3) {
  display: inline-block;
  padding: 3px 24px;
  background-color: #fcf9f0;
  border: 1px solid #a17c00;
  color: #a17c00;
  font-size: 14px;
  border-radius: 15px;
}

.showImg .Img .pricePoint {
  display: flex;
  justify-content: space-between;
}

.showImg .Img .pricePoint p:nth-child(1) {
  color: #cb1e36;

  span {
    font-size: 20px;
    font-weight: bold;
  }
}

.showImg .Img .pricePoint p:nth-child(2) {
  padding: 0 37px 0 0;
}

.empty {
  color: #c2c2c2;
  font-size: 18px;
  float: right;
  padding: 0 37px 0 0;
}
</style>
