<template>
  <div>
    <main-header :header-name="headerName" :show="isShow"></main-header>
    <div class="message-card">
      <div class="img">
        <img src="@/assets/message/notice.svg">
      </div>
      <div>
        <div class="font-contain">
          <div class="class_notice">上课通知</div>
          <div class="time_notice">13:50</div>
        </div>
        <div class="class_des">今天下午14:00钟，高三18班，化学课</div>
      </div>
    </div>
    <div @click="apply" class="message-card" style="margin-top: .3rem">
      <div class="img">
        <img src="@/assets/message/leave.svg">
      </div>
      <div>
        <div class="font-contain">
          <div class="class_notice">请假审批</div>
          <div class="time_notice">13:50</div>
        </div>
        <div class="class_des">今天下午14:00钟，高三18班，化学课</div>
      </div>
    </div>
  </div>
</template>

<script>
  import MainHeader from "../../../components/header/header";
  export default {
    name: "index",
    components: { MainHeader },
    data() {
      return {
        headerName: "消息中心",
        isShow: false
      };
    },
    methods: {
      apply() {
        this.$router.push("/leave-approval");
      }
    }
  };
</script>

<style lang="less" scoped>
  .message-card {
    display: flex;
    width: 100%;
    height: 2rem;
    background: white;
    margin-top: 1rem;
    .img {
      padding: 0.6rem;
    }
    .font-contain {
      display: flex;
      margin-top: 0.5rem;
      .class_notice {
        font-family: "PingFangSC-Light", "PingFang SC Light", "PingFang SC";
        font-weight: 200;
        font-style: normal;
        font-size: 0.32rem;
      }
      .time_notice {
        margin-left: 3rem;
        font-family: "PingFangSC-Thin", "PingFang SC Thin", "PingFang SC";
        font-weight: 200;
        font-style: normal;
        font-size: 0.3rem;
      }
    }
    .class_des {
      margin-top: 0.2rem;
      font-family: "PingFangSC-Thin", "PingFang SC Thin", "PingFang SC";
      font-weight: 200;
      font-style: normal;
      font-size: 0.28rem;
    }
  }
</style>
