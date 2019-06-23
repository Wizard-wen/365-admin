<template>
  <Hog-page>
    <Hog-header :title="isLogin?'登录':'注册'" :isShowImg="true"></Hog-header>
    <!-- 登陆 -->
    <div class="form" v-if="isLogin">
      <div class="input">
        <input class="phone" type="text" placeholder="请输入手机号" v-model="phone" maxlength="11">
      </div>
      <div class="input">
        <input class="password" type="password" placeholder="请输入密码" v-model="password">
      </div>
      <div class="submit" @click="login">登录</div>
      <div class="otherBtn">
        <div @click="forgetPassword">忘记密码？</div>
        <div @click="changeState">去注册</div>
      </div>
    </div>
    <!-- 注册 -->
    <div class="form" v-else>
      <div class="input">
        <input class="phone" type="text" placeholder="请输入手机号" v-model="phone" maxlength="11">>
        <div class="getCode" @click="getCode">获取验证码</div>
      </div>
      <div class="input" style="width:1.5rem;float: left;">
        <input class="code" type="text" placeholder="请输入验证码" v-model="captcha" maxlength="4">>
      </div>
      <div class="input" style="width:1.3rem;float: right;">
        <input class="password" type="password" placeholder="请输入密码" v-model="password">
      </div>
      <div style="height: 0.4rem;margin-bottom: 0.15rem;"></div>
      <div class="submit" @click="register">注册</div>
      <div class="otherBtn">
        <div></div>
        <div @click="changeState">已注册，请登录</div>
      </div>
      <div class="otherTip">
        <span>已经阅读并同意《用户服务协议》</span>
      </div>
    </div>
  </Hog-page>
</template>
<script>
import loginService from "../../common/service/loginService";
export default {
  data() {
    return {
      isLoaded: false,
      phone: "",
      captcha: "",
      password: "",
      //是否是登录页 注册false 登陆true
      isLogin: true
    };
  },
  methods: {
      //注册
    async register() {
      try {
        this.isLoaded = true;
        await loginService
          .register(this.phone, this.password, this.captcha)
          .then(data => {
            alert(data.message);
            this.isLogin = true;
          })
          .catch(error => {
            alert(error.message);
          })
          .finally(() => {
            this.isLoaded = false;
          });
      } catch (e) {

      }
      await loginService
        .register(this.phone, this.password, this.captcha)
        .then(data => {
          alert(data.message);
          this.isLogin = true;
        });
    },
    getCode() {
      alert();
    },
    changeState() {
      this.isLogin = !this.isLogin;
    },
    forgetPassword() {
      alert();
    },
    //登录
    async login() {
      try {
        this.isLoaded = true;
        await loginService
          .login(this.phone, this.password)
          .then(data => {
            // this.$message({
            //   type: "success",
            //   message: data.message
            // });
            alert(data.message);
            this.$router.push("/userpage");
          })
          .catch(error => {
            // this.$message({
            //   type: "error",
            //   message: error.message
            // });
            alert(error.message);
          })
          .finally(() => {
            this.isLoaded = false;
          });
      } catch (e) {
        // this.$message({
        //   type: "error",
        //   message: e.message
        // });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.form {
  background-color: #fff;
  height: 100vh;
  padding: 1rem 0.4rem;
  & .input {
    height: 0.4rem;
    line-height: 0.4rem;
    border: 1px solid #f5f5f5;
    margin-bottom: 0.15rem;
    position: relative;
    border-radius: 0.02rem;
  }
  & input {
    outline: none;
    border: 0;
    font-size: 0.14rem;
    padding: 0 0.2rem;
  }
  & .getCode {
    position: absolute;
    right: 0.1rem;
    border-left: 1px solid #f5f5f5;
    top: 0;
    padding: 0 0.1rem;
  }
  & .submit {
    padding: 0 0.2rem;
    background-color: pink;
    height: 0.4rem;
    line-height: 0.4rem;
    margin-top: 0.5rem;
    text-align: center;
    border-radius: 0.2rem;
    font-size: 0.16rem;
    color: #fff;
  }
  & .otherBtn {
    font-size: 0.14rem;
    margin-top: 0.1rem;
    display: flex;
    justify-content: space-between;
    color: #ccc;
    padding: 0 0.1rem;
  }
  & .otherTip {
    margin-top: 0.2rem;
  }
}
</style>
