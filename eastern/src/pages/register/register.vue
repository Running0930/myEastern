<template>
  <div class="registerContainer">
    <header class="header">
      <nav class="leftImgs">
        <img src="../../static/images/login/logo_l.png" alt="" />
        <img src="../../static/images/login/logo_r.png" alt="" />
        <img src="../../static/images/login/logoMenber.png" alt="" />
      </nav>
      <h1 class="rightText">
        欢迎注册东方万里行会员，已有账号，<a href="/login">请登录</a>
      </h1>
    </header>
    <section class="registerTab">
      <div class="idCard active">使用身份证注册</div>
      <div class="passport">使用护照注册</div>
    </section>
    <form class="registerForm" action="/">
      <p class="registerDesc">
        您所填写的姓名信息请务必与旅行证件上所列姓名保持一致。使用中国大陆所颁发护照的旅客，仅限使用中国大陆身份证信息申请会员注册。
      </p>
      <div class="inputs">
        <!-- 左边输入框 -->
        <ul class="leftInput">
          <li>
            <span>姓（中文）</span>
            <el-input
              type="text"
              style="width:300px;"
              placeholder="请输入您的姓"
              v-model="surname"
            />
          </li>
          <li>
            <span>姓（英文）</span
            ><el-input
              type="text"
              style="width:300px;"
              v-model="surname_en"
              disabled
            />
          </li>
          <li>
            <span>身份证号</span
            ><el-input
              type="text"
              style="width:300px;"
              placeholder="请输入身份证号"
              v-model="idCard"
            />
          </li>
          <li>
            <span>手机号</span>
            <div
              class="getPhoneCode"
              style="width:300px;display:inline-block;white-space: nowrap;"
            >
              <el-select style="width:80px" value="中国"></el-select>
              <el-input
                type="text"
                style="width:140px;"
                placeholder="请输入手机号"
                v-model="phone"
              />
              <el-button style="padding-left:5px;padding-right:5px;">
                获取验证码
              </el-button>
            </div>
          </li>
          <li>
            <span>登录密码</span
            ><el-input style="width:300px;" type="text" v-model="password" />
          </li>
        </ul>
        <!-- 右边输入框 -->
        <ul class="rightInput">
          <li>
            <span>名（中文）</span
            ><el-input
              style="width:300px;"
              type="text"
              placeholder="请输入您的名"
              v-model="name"
            />
          </li>
          <li>
            <span>名（英文）</span
            ><el-input
              style="width:300px;"
              type="text"
              v-model="name_en"
              disabled
            />
          </li>
          <li></li>
          <li>
            <span>验证码</span
            ><el-input
              style="width:300px;"
              type="text"
              placeholder="请输入您的验证码"
              v-model="code"
            />
          </li>
          <li>
            <span>确认登录密码</span
            ><el-input
              style="width:300px;"
              type="text"
              placeholder="请再次输入密码"
              v-model="rePassword"
            />
          </li>
        </ul>
      </div>
      <div class="confirmArea">
        <!-- 协议 -->
        <div class="agreement">
          <el-checkbox />已阅读并同意
          <a
            href="https://easternmiles.ceair.com/members/aboutus-easternmiles/serviceTerms.html"
            >《万里行规则和条款》</a
          >
          <a href="https://activity.ceair.com/UI/18842/pc/index.html"
            >《隐私协议》</a
          >
        </div>

        <el-button
          type="danger"
          style="margin-top:20px;width:300px"
          @click="register"
          >立即注册</el-button
        >
      </div>
    </form>
  </div>
</template>
<script>
import weAjax from "@/utils/weAjax";
import { pinyin } from "pinyin-pro";
export default {
  name: "register",
  data() {
    return {
      //中文姓
      surname: "",
      //中文名
      name: "",
      idCard: "",
      phone: "",
      code: "",
      password: "",
      rePassword: "",
    };
  },
  computed: {
    // 英文姓
    surname_en() {
      return pinyin(this.surname, { toneType: "none" });
    },
    // 英文名
    name_en() {
      return pinyin(this.name, { toneType: "none" });
    },
  },
  methods: {
    async register() {
      const name_cn = this.surname + this.name;
      const name_en = this.surname_en + this.name_en;
      const {phone,password,idCard}=this
      const result = await weAjax.post("/register", { name_cn, name_en ,phone,password,idCard});
      this.open(result.data)
    },
    open(result) {
        this.$alert(result, '注册', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `再次注册成功`
            });
          }
        });
      }
  },
};
</script>
<style lang="less" scoped>
.registerContainer {
  background: #fff;

  // 头部
  .header {
    width: 1200px;
    margin: 0 auto;
    height: 132px;
    //   border:1px solid;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .leftImgs {
      img:nth-of-type(3) {
        padding-left: 20px;
      }
    }
    .rightText {
      width: 50%;
      font-size: 18px;
      color: #999;
      a {
        cursor: pointer;
        color: #cb1d36;
      }
    }
  }
  //  注册tab
  .registerTab {
    display: flex;
    width: 1200px;
    margin: 0 auto;
    justify-content: flex-start;
    border-bottom: 1px solid #f7f7f7;
    font-size: 14px;
    color: #3f3f3f;
    div {
      padding: 0 50px;
      height: 100px;
      line-height: 100px;
      &.active {
        color: #cb1e36;
        cursor: default;
        border-bottom: 4px solid #cb1e36;
      }
    }
  }
  //   注册表单区域
  .registerForm {
    width: 1200px;
    margin: 0 auto;
    padding-top: 20px;
    .registerDesc {
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      color: #666;
      background: #fff4e5;
      padding-left: 16px;
    }
    .inputs {
      display: flex;
      font-size: 12px;
      color: #666;
      justify-content: flex-start;
      padding: 20px 0;
      .leftInput {
        margin-right: 260px;
      }
      .rightInput {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      li {
        margin-bottom: 20px;

        span {
          display: inline-block;
          width: 80px;
          line-height: 40px;
        }
        .getPhoneCode {
          display: flex;
        }
      }
    }
    .confirmArea {
      padding: 40px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      .agreement {
        a {
          font-size: 12px;
          color: #cb1e36;
        }
        // /deep/ .el-checkbox__input {
        //   border-color: #f32823;
        //   background-color: #f32823;
        //   &:hover {
        //     border-color: #f32823 !important;
        //   }
        // }
      }
    }
  }
}
</style>
<style lang="less">
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: #f32823 !important;
  background-color: #f32823 !important;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #f32823 !important;
}
.el-checkbox__inner:hover {
  border-color: #f32823 !important;
}
.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #f32823 !important;
}
</style>
