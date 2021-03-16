<template>
  <div class="loginContainer">
    <!-- 头部 -->
    <header class="header">
      <nav class="leftImgs">
        <img src="../../static/images/login/logo_l.png" alt="" />
        <img src="../../static/images/login/logo_r.png" alt="" />
      </nav>
      <strong class="rightText">
        欢迎会员登录
      </strong>
      <img
        class="shopLogo"
        src="../../static/images/login/shop_logo.png"
        alt=""
        @click="$router.push('/')"
      />
    </header>
    <!-- 主体 -->
    <section class="main">
      <div class="loginArea">
        <h2 class="loginTab">
          <span class="member active">会员登录</span>
          <span class="noMember">非会员登录</span>
        </h2>
        <p>开始您的旅程吧，体验<strong>更便捷</strong>的订票系统</p>
        <form class="loginForm" action="/">
          <div>
            <span>登录名</span>
            <el-input
              v-model="phone"
              type="text"
              style="width:260px;"
              placeholder="请输入手机号"
            />
          </div>
          <div>
            <span>密码</span>
            <el-input
              v-model="password"
              type="text"
              style="width:260px;"
              placeholder="请输入东方万里行会员密码"
            />
          </div>
          <div>
            <span>验证码</span>
            <el-input
              type="text"
              style="width:150px;"
              placeholder="请输入手机验证码"
            />
            <el-button style="width:100px;margin-left:10px"
              >获取验证码</el-button
            >
          </div>
          <a class="goRegister" href="/register">没有会员？去注册</a>
          <el-button type="warning" style="width:260px;" @click="login"
            >登录</el-button
          >
        </form>
      </div>
      <div class="imgsNav">
        <div>
          <img src="../../static/images/login/img-1.jpg" alt="" />
          <span>新客机奢华享受</span>
        </div>
        <div>
          <img src="../../static/images/login/img-2.jpg" alt="" /><span
            >星级美食料理</span
          >
        </div>
        <div>
          <img src="../../static/images/login/img-3.jpg" alt="" /><span
            >东航机队</span
          >
        </div>
        <div>
          <img src="../../static/images/login/img-4.jpg" alt="" /><span
            >凌燕专区</span
          >
        </div>
        <div>
          <img src="../../static/images/login/img-5.jpg" alt="" /><span
            >试听影音娱乐</span
          >
        </div>
      </div>
    </section>
    <!-- 底部 -->
    <footer class="footer">
      <p class="otherNav">
        <a href="javascript:;">关于东航</a>
        <a href="javascript:;">旅行须知</a>
        <a href="javascript:;">法律和隐私条款</a>
        <a href="javascript:;">常见问题</a>
        <a href="javascript:;">网站地图</a>
        <a href="javascript:;">联系我们</a>
        <a href="javascript:;">天合联盟</a>
        <a href="javascript:;">友情链接</a>
      </p>
      <p class="copyright">
        Copyright © 中国东方航空 <a href="javascript:;">沪ICP备10009470号-9</a>
      </p>
    </footer>
  </div>
</template>
<script>
import weAjax from "@/utils/weAjax";
import {mapMutations} from 'vuex'
export default {
  name: "login",
  data() {
    return {
      phone: 13100000000,
      password: "dfh",
    };
  },
  methods: {
    ...mapMutations(['GETNAMECN']),
    async login() {
      const { phone, password } = this;
      const result = await weAjax.post("/login", { password, phone });
      if(result.data==='登录失败') {
        this.open()
      }else{
        // console.log(result.data);
        this.GETNAMECN(result.data)
        this.$router.replace('/')
      }
      
    },
    open() {
        this.$alert('登录失败', '警告', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              // message: `action: ${ action }`
            });
          }
        });
      }
  },
  mounted(){
    
  }
};
</script>
<style lang="less" scoped>
.loginContainer {
  background: #fff;
  // 头部
  .header {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    height: 132px;
    //   border:1px solid;
    display: flex;
    align-items: center;
    .leftImgs {
      img:nth-of-type(3) {
        padding-left: 20px;
      }
    }
    .rightText {
      padding-left: 40px;
      color: #666;
      font-size: 18px;
      font-weight: 900;
    }
    .shopLogo {
      position: absolute;
      right: 100px;
      cursor: pointer;
    }
  }
  //   主体
  .main {
    height: 696px;
    background-image: url("../../static/images/login/login_bg1.jpg");
    background-position-x: -300px;
    background-size: cover;
    position: relative;
    .loginArea {
      position: absolute;
      background: #fff;
      width: 420px;
      height: 400px;
      right: 180px;
      top: 60px;
      box-shadow: 0 5px 12px #ccc;
      .loginTab {
        width: 100%;
        span {
          cursor: pointer;
          display: inline-block;
          height: 45px;
          line-height: 45px;
          width: 50%;
          background: #5aa5f0;
          color: white;
          text-align: center;
          &.active {
            background: white;
            color: #5aa5f0;
          }
        }
      }
      p {
        text-align: center;
        color: #333;
        font-size: 16px;
        margin: 0 auto;
        width: 380px;
        margin-top: 20px;
        strong {
          font-weight: 900;
        }
      }
      .loginForm {
        padding: 20px;
        text-align: center;
        div {
          margin-bottom: 10px;

          span {
            display: inline-block;
            text-align: right;
            width: 60px;
            padding-right: 10px;
          }
        }
        a {
          color: #cb1d36;
        }
      }
      .goRegister {
        display: block;
        height: 30px;
        text-align: right;
      }
      .el-button--warning {
        background: #ff6600;
        font-size: 18px;
      }
    }
    .imgsNav {
      position: absolute;
      // border: 1px solid;
      height: 88px;
      width: 100%;
      bottom: 40px;
      display: flex;
      justify-content: center;
      div {
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
        border: 2px solid white;
        margin-right: 30px;

        img {
          z-index: 1;
        }
        & > span {
          position: absolute;
          width: 160px;
          text-align: center;
          color: #fff;
          background: #666;
          opacity: 0.8;

          bottom: -25px;
          transition: bottom 500ms linear;
        }
        &:hover > span {
          z-index: 2;
          bottom: 0px;
        }
      }
    }
  }
  // 底部
  .footer {
    padding: 40px 0;
    background: #efefef;
    text-align: center;
    line-height: 200%;
    color: #666;
    font-size: 12px;
    .otherNav {
      a {
        padding: 0 5px;
      }
      a + a {
        border-left: 1px solid #666;
      }
    }
    .copyright {
      a:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
