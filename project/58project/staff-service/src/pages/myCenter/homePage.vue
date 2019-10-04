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
      <div class="home-three">
        <div class="mark-title">标签</div>
        <div class="mark" v-for="(item,index) in 10" :key="item.id">标签{{index}}</div>
      </div>
    </div>
    <div class="home-right">
      <div class="title">文章（8）</div>
      <div class="item" v-for="item in list" :key="item.id">
        <div class="item-title">kkk</div>
        <div class="item-content">lll</div>
        <div class="item-sale">
          <span class="item-name">宋先生</span>
          <span>发布 2019-10-03 12:34:23</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import pdf from 'vue-pdf'
export default {
  data() {
    return {
      list: 2
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
  components: {
    // pdf
  }
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
      align-items: center;
      justify-content: center;
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
    .home-three {
      margin-top: 20px;
      padding: 20px 10px;
      border-top: 1px dotted #ccc;
      border-bottom: 1px dotted #ccc;
      overflow: hidden;
    }
    .mark-title {
      margin-bottom: 10px;
    }
    .mark {
      padding: 2px 5px;
      border: 1px solid rgba(0, 0, 0, 0.65);
      color: rgba(0, 0, 0, 0.65);
      border-radius: 5px;
      font-size: 12px;
      display: inline-block;
      margin: 5px 3px;
    }
  }
  .home-right {
    width: 68.5%;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    overflow: auto;
    .title {
      line-height: 50px;
      font-size: 16px;
      padding: 0 30px;
      color: rgba(0, 0, 0, 0.85);
      border-bottom: 1px solid #ccc;
    }
    .item {
      margin: 0 20px;
      padding: 10px;
      border-bottom: 1px dotted #ccc;
    }
    .item-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 16px;
    }
    .item-content {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      margin-top: 15px;
    }
    .item-sale {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      margin-top: 15px;
    }
    .item-name {
      color: #1890ff;
    }
  }
}
</style>
