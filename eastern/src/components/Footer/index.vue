<template>
  <footer class="footerContainer">
    <!-- 横幅 -->
    <div class="streamer">
      <img src="@/static/images/index/footer1.png" alt="" />
    </div>
    <!-- 底部链接 -->
    <div class="footerLink">
      <div class="listArea">
        <dl>
          <dt>会员须知</dt>
          <dd>会员权益说明</dd>
          <dd>商城现金消费积分</dd>
        </dl>

        <dl>
          <dt>订购流程</dt>
          <dd>注册/登录</dd>
          <dd>开通消费密码</dd>
          <dd>搜索商品</dd>
          <dd>加入购物车</dd>
          <dd>订单核对</dd>
          <dd>支付</dd>
          <dd>查询订单及状态</dd>
        </dl>

        <dl>
          <dt>物流配送</dt>
          <dd>配送标准及范围</dd>
          <dd>配送方式</dd>
          <dd>签收须知</dd>
        </dl>

        <dl>
          <dt>售后服务说明</dt>
          <dd>客服热线</dd>
          <dd>退换货政策</dd>
          <dd>退换货流程</dd>
          <dd>商品保修</dd>
          <dd>发票</dd>
        </dl>

        <dl>
          <dt>友情链接</dt>
          <dd>东方万里行</dd>
          <dd>东航网点信息</dd>
        </dl>
      </div>
    </div>
    <!-- 底部声明 -->
    <div class="footerStatement">
      <div class="statementContent">
        <p>
          Copyright © 郑重声明：中国东方航空
          版权所有，本网站所有页面及图书未经中国东方航空的明确书面认可
        </p>
        <p>不得以任何形式转载使用，违者必究。沪ICP备10009470号-9</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.footerContainer {
  padding-top: 20px;
  background:#F3F2F7;
  .streamer {
    text-align: center;
    background-color: #223b61;
  }
  .footerLink {
    padding: 40px 0;

    .listArea {
      width: 1200px;
      margin: 0 auto;
      padding-bottom: 30px;
      // border: 1px solid;
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid #e8e8e8;
      dl {
        dt {
          font-size: 14px;
          color: #666;
          font-weight: 700;
          margin-bottom: 5px;
        }
        dd {
          color: #444;
          height: 25px;
          font-size: 12px;
          line-height: 200%;
        }
      }
    }
  }
  .footerStatement {
    .statementContent {
      width: 1200px;
      padding: 20px auto;
      // border: 1px solid;
      font-size: 12px;
      text-align: center;
      color: #89898a;
      margin:0 auto;
      margin-bottom: 20px;
    }
  }
}
</style>
