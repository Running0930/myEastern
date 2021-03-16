<template>
  <div>
    <div class="title">最近浏览记录</div>
    <swiper :options="obj" class="swiper-container">
      <swiper-slide v-for="item in BrowseRecord" :key="item.PictureUrl">
        <img
          :src="
            `http://ceair.oss-cn-shanghai.aliyuncs.com/image${item.PictureUrl}`
          "
          class="img"
        />
        <div>{{ item.ProductName }}</div>
        <div class="piace">
          现金
          <span>{{ item.MaxPrice }}</span>
        </div>
        <div class="otherDesc">
          最高可以使用{{
                  item.MaxPoints > 10000
                    ? item.MaxPoints / 10000 + "万"
                    : item.MaxPoints
                }}积分
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "ImageListFot",
  props: ["picUrl", "currentIndex"],
  data() {
    return {
      BrowseRecord: [],
      obj: {
        slidesPerView: "auto", //显示几张图
        slidesPerGroup: 4, //每次移动几张图
        //如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },

  async mounted() {
    const result = await this.$api.reqBrowseRecord();
    console.log(result);
    this.BrowseRecord = result.data.Data;
  },
  methods: {
    changeCurrentIndex(index) {
      this.currentIndex = index;
      this.$emit("changeCurrentIndex", index);
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  width: 1200px;
  margin: 0 auto 10px;

  font-size: 18px;
  color: #444;
  font-weight: 900;
}
.swiper-container {
  width: 1200px;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  background-color: #fff;
  .swiper-slide {
    width: 268px;
    height: 265px;
    text-align: center;
    margin: 10px;
    border-right: 1px solid #ccc;
    div {
      width: 240px;
      margin: 10px 0;
      text-align: left;
      font-size: 14px;
      padding-left: 10px;
    }
    .piace {
      color: red;
      span {
        font-size: 18px;
      }
    }
    .otherDesc{
      
          line-height: 26px;
          color: #a5a5a5;
          font-size: 12px;
    }
    .img {
      margin-top: 10px;
      width: 130px;
      height: 130px;
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 30px;
    height: 285px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
