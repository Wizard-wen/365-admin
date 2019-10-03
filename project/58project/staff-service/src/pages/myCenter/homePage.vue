<template>
  <div class="home">
    <div class="home-left">
      <div class="home-one">
        <div class="home-icon">
          <img src="./header.png" alt="">
        </div>
        <div class="home-name">{{users.name}}</div>
        <div class="home-intro">祝你开心每一天！</div>
      </div>
      <div class="home-two">
        <div>
          <!-- <img src="./home/image/icon.png" alt=""> -->
          <span v-for="(item, index) in users.role_name" :key="index">{{item}} |</span>
        </div>
        <div>
          <!-- <img src="./home/image/icon.png" alt=""> -->
          <span>中彤实业 - 365生活服务平台 - {{department_name}}</span>
        </div>
        <div>
          <!-- <img src="./home/image/icon.png" alt=""> -->
          <span>辽宁省沈阳市</span>
        </div>
      </div>
      <div class="home-three">dddd</div>
      <div class="home-four">eeee</div>
    </div>
    <div class="home-right"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data1: "运营专员",
      data2: "运营中心"
    };
  },
  computed: {
    users() {
      return this.$store.state.loginModule.user;
    },
    department_name() {
      return this.$store.state.authModule.departmentList.filter(
        item => item.id == this.users.department_id
      )[0].name;
    }
  },
  methods: {},
  components: {}
};
</script>

<style scoped lang="scss">
.home {
  height: 2000px;
  width: 100%;
  background: #f0f2f5;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  .home-left {
    width: 30%;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    padding: 30px 20px;
    .home-one {
      display: flex;
      flex-direction: column;
      text-align: center;
         align-items:center;
                justify-content:center;
    }
    .home-icon {
      height: 100px;
      width: 100px;
      border-radius: 50%;
      & img {
        height: 100px;
        width: 100px;
      }
    }
    .home-name {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 20px;
      margin-top: 20px;
    }
    .home-intro {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      margin-top: 5px;
    }
    .home-two {
      margin-top: 20px;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
    }
  }
  .home-right {
    height: 400px;
    width: 68.5%;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
  }
}


</style>
