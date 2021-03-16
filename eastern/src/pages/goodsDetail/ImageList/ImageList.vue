<template>
  <swiper :options="obj" class="swiper-container">
    <swiper-slide v-for="(item, index) in picUrl" :key="index">
      <img
        :class="index === currentIndex ? 'active' : ''"
        @mousemove="changeCurrentIndex(index)"
        :src="`http://ceair.oss-cn-shanghai.aliyuncs.com/image${item.picUrl}`"
      />
    </swiper-slide>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
export default {
  name: "ImageList",
  props: ["picUrl", "currentIndex"],
  data() {
    return {
      obj: {
        slidesPerView: 5, //显示几张图
        slidesPerGroup: 5, //每次移动几张图
        //如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  methods: {
    changeCurrentIndex(index) {
      this.currentIndex = index;
      this.$emit("changeCurrentIndex", index);
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  margin-top: 10px;
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    // width: 56px;
    // height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
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
    width: 12px;
    height: 56px;
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

