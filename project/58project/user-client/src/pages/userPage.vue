<template>
  <Hog-page>
    <div class="user">
      <div class="bgImage">
        <div class="login" v-if="!isLogin" @click="goLogin">登 录</div>
        <div class="userData" v-else>
          <div class="headerImg"></div>
          <div class="nickname">{{userData.nickname}}</div>
          <div class="editImage" @click="edit">
            <img src="./userPage/img/edit.svg" alt>
          </div>
        </div>
      </div>
      <div class="serviceList">
        <div class="item" v-for="item in serviceList" :key="item.id" @click="goItem(item)">
          <span>{{item.name}}</span>
          <img src="./userPage/img/right.svg" alt>
        </div>
      </div>
      <div class="loginOut" v-show="isLogin" @click="loginOut">退出登录</div>
    </div>
    <Hog-footer></Hog-footer>
  </Hog-page>
</template>
<script>
/**
 * <a href="tel:15001279362">15001279361</a>
 * 这样ios会识别为手机号码
 */
import loginService from "../../common/service/loginService";
export default {
  data() {
    return {
      userData: {
        nickname: "wizard"
      },
      serviceList: [
        {
          name: "我的地址",
          router: "/address"
        },
        {
          name: "我的订单",
          router: "/orderList"
        },
        {
          name: "联系客服",
          router: ""
        },
        {
          name: "关于我们",
          router: ""
        }
      ]
    };
  },
  computed: {
    //服务人员配置字段对象
    isLogin() {
      return this.$store.state.loginModule.isLogin;
    }
  },
  methods: {
    goItem(item) {
      this.$router.push(item.router);
    },
    goLogin() {
      this.$router.push("/login");
    },
    edit() {
      this.$router.push("/personal");
    },
    loginOut(){
        loginService.logout();
    }
  }
};
</script>
<style scoped lang="scss">
.user {
  position: relative;
  background-color: #f5f5f5;
  & .bgImage {
    height: 2rem;
    background-color: blueviolet;
    overflow: hidden;
  }
  & .login {
    height: 0.4rem;
    line-height: 0.4rem;
    width: 1.4rem;
    border-radius: 0.2rem;
    background: pink;
    text-align: center;
    font-size: 0.16rem;
    color: #fff;
    margin: 0.7rem auto 0;
  }
  & .userData {
    position: relative;
    & .headerImg {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.4rem;
      background-color: pink;
      position: absolute;
      top: 0.4rem;
      left: 0.4rem;
    }
    & .nickname {
      position: absolute;
      top: 0.5rem;
      left: 1.4rem;
      color: #fff;
      font-size: 0.24rem;
    }
    & .editImage {
      position: absolute;
      right: 0.2rem;
      top: 0.2rem;
      & img {
        width: 0.2rem;
        height: 0.2rem;
      }
    }
  }
  & .serviceList {
    width: 3.35rem;
    position: absolute;
    left: 50%;
    top: 1.5rem;
    transform: translateX(-50%);
    background-color: #fff;
    border-radius: 0.08rem;
    box-sizing: border-box;
    & .item {
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.16rem;
      border-bottom: 1px solid #f5f5f5;
      padding: 0 0.2rem;
    }
    & .item:last-child {
      border-bottom: 0 none;
    }
    & img {
      width: 0.16rem;
      height: 0.16rem;
      float: right;
      margin-top: 0.2rem;
    }
  }
  .loginOut {
    width: 2rem;
    background-color: pink;
    height: 0.4rem;
    line-height: 0.4rem;
    margin: 3rem auto;
    text-align: center;
    border-radius: 0.2rem;
    font-size: 0.16rem;
    color: #fff;
  }
}
</style>
