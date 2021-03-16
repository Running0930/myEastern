<template>
  <div class="spec-preview">
    <img :src="`http://ceair.oss-cn-shanghai.aliyuncs.com/image${samilImg}`" />
    <div class="event" ref="event" @mousemove="handlerMove"></div>
    <div class="big">
      <img
        :src="`http://ceair.oss-cn-shanghai.aliyuncs.com/image${samilImg}`"
        ref="big"
      />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: {
    samilImg: String,
    bigImg: String
  },
  mounted() {
    //  算出模板曾的宽度
    this.maskWitch = this.$refs.event.clientWidth / 2;
  },
  methods: {
    handlerMove(event) {
      //获取鼠标移动横纵坐标
      const { offsetX, offsetY } = event;
      // 获取模板层元素
      const mask = this.$refs.mask;
      // 获取大图元素
      const big = this.$refs.big;
      //获取模板曾的宽度
      const maskWitch = this.maskWitch;
      //设置模板层的鼠标位置
      let left = offsetX - maskWitch / 2;
      let top = offsetY - maskWitch / 2;
      //设置临界值
      left = left < 0 ? 0 : left > maskWitch ? maskWitch : left;
      top = top < 0 ? 0 : top > maskWitch ? maskWitch : top;
      // 设置位置
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      // 设置大图
      big.style.left = -left * 2 + "px";
      big.style.top = -top * 2 + "px";
    }
  }
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
