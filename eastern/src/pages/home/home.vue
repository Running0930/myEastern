<template>
  <div id="outer">
    <a class="swiper" href="#">
      <swiper
        class="indexSwiper"
        :options="{
          effect: 'fade', //切换效果
          loop: true, // 循环模式选项
          centeredSlidesBounds: true,
          centeredSlides: true,
          //循环播放
          autoplay: {
            delay: 2000,
            stopOnLastSlide: true,
            disableOnInteraction: false,
          },
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        }"
      >
        <swiper-slide v-for="banner in homeBannerData" :key="banner.PictureUrl">
          <img :src="baseUrl+banner.PictureUrl" alt="" style="margin-left:-220px" />
        </swiper-slide>
        <div
          class="swiperBtn swiper-button-prev swiper-button-black"
          slot="button-prev"
        ></div>
        <div
          class="swiperBtn swiper-button-next swiper-button-black"
          slot="button-next"
        ></div>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </a>

    <div class="recommend">
      <ul class="reHome">
        <li class="recommendToday">
          <i class="icon iconfont icon-rili"></i>
          <p class="txt">今日推荐</p>
        </li>
        <li v-for="rec in recommendData" :key="rec.ViewIndex" @click="toTypeDetail(rec.PageUrl)">
          <img
            :src="baseUrl+rec.PictureUrl"
            alt=""
          />
        </li>

      </ul>
    </div>

    <!-- 楼层组件 -->
    <template v-if="allFloorData.length > 0">
      <Floor :floorData="floor" v-for="floor in allFloorData" :key="floor.HomeFloorID"></Floor>
    </template>

  </div>
</template>
<script>
import Floor from "@/components/Floor";
import weAjax from "@/utils/weAjax.js";
import {reqRecommendData,reqHomeBannerData} from '@/api'
export default {
  name: "home",
  components: {
    Floor,
  },
  data() {
    return {
      allFloorData: [], //所有楼层数据
      recommendData:[],//今日推荐数据
      homeBannerData:[],//首页轮播图数据
    };
  },

  mounted() {
    // console.log(this.baseUrl);
    this.getRecommendData()
    this.getAllFloorData();
    this.getHomeBannerData()
  },
  methods: {
    async getAllFloorData() {
      const res = await weAjax.get("/homeAllFloorData");
      // console.log(res);
      this.allFloorData = res.data;
    },
    // 获取今日推荐数据
    async getRecommendData(){
      const res=await reqRecommendData();
      // console.log(res);
      this.recommendData=res.data.Data.Market_EP_ItemInfos;
    },
    // 获取首页轮播图数据
    async getHomeBannerData(){
      const res=await reqHomeBannerData();
      // console.log(res);
      // console.log(res.data.Data.Market_EP_ItemInfos);
      this.homeBannerData=res.data.Data.Market_EP_ItemInfos
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
<style lang="less" scoped>
.swiper {
  .indexSwiper {
    .swiperBtn {
      opacity: 0;
    }
    &:hover .swiperBtn {
      opacity: 0.3;
      background: black;
      color: white;
      padding: 10px 5px;
      transition: opacity 1s linear;
    }
  }
}

.recommend {
  .reHome {
    width: 1200px;
    height: 150px;
    margin:10px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      width: 250px;
      height: 152px;
      overflow: hidden;
      img {
        cursor: pointer;
        width: 250px;
        height: 165px;
      }
    }
    .recommendToday {
      font-size: 18px;
      background: #d6d6d6;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon {
        font-size: 70px;
      }
      .txt {
        font-size: 20px;
      }
    }
  }
}
</style>
