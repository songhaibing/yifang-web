<template>
  <div>
    <main-header :header-name="headerName" :show="isShow" style="background-color: rgba(241, 241, 241, 1)"></main-header>
    <div class="leave-content">
      <img src="@/assets/kuang.svg">
      <div style="position: absolute;top:2.2rem;left:1rem">
        <span class="teacher-name">周小星同学，请假申请被{{approve}}</span>
        <div class="content_contain">内容如下：</div>
        <div class="leave-font">请假人：周小星</div>
        <div class="leave-font">请假事由：病假</div>
        <div class="leave-font">请假时间：2019.3.26-2019.3.28</div>
        <div class="leave-font">请假时长：3天</div>
        <div class="leave-font">提交时间：2018.3.25 18:00</div>
        <div class="leave-font">请假发起人：周小星家长</div>
        <div class="content_contain">批假寄语：</div>
        <div class="leave-font">{{title}}</div>
      </div>

      <div class="img-contain">
        <img src="@/assets/pizhun.svg">
        <div class="approve_font">{{approve}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import MainHeader from "../../../../components/header/header";
  export default {
    name: "approval-results",
    components: { MainHeader },
    created() {
      this.title = this.$route.query.title;
      console.log(this.title);
    },
    data() {
      return {
        headerName: "审批结果",
        isShow: true,
        title: ""
      };
    },
    computed: {
      approve() {
        if (this.$route.query.isApprove === true) {
          return "批准";
        } else {
          return "拒绝";
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  body{
    overflow-y:hidden;
  }
  .leave-content {
    margin-top: 0.7rem;
    background: white;
    height: 96vh;
    padding: 0.7rem 0.5rem 0 0.5rem;
    .teacher-name {
      font-weight: 700;
    }
    .teacher-des {
      font-weight: 200;
    }
    .content_contain {
      margin-top: 0.2rem;
      font-weight: 200;
    }
    .leave-font {
      padding: 0.2rem;
      font-family: "PingFang-SC-Bold", "PingFang SC Bold", "PingFang SC";
      font-weight: 700;
      font-style: normal;
    }
    .img-contain {
      position: absolute;
      top: 1rem;
      left: 5.6rem;
      .approve_font {
        margin-top: -1.25rem;
        margin-left: 0.2rem;
        font-family: "PingFang-SC-Bold", "PingFang SC Bold", "PingFang SC";
        font-weight: 700;
        font-style: normal;
        font-size: 32px;
        color: #d9001b;
        transform: rotate(45deg);
      }
    }

    .button_contain {
      display: flex;
      margin-top: 0.5rem;
      margin-left: 0.5rem;
      .approve {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.1rem;
        width: 1.7rem;
        height: 0.7rem;
        background-color: rgba(0, 204, 57, 1);
        .approve-font {
          color: white;
          font-size: 0.3rem;
        }
      }
      .refuse {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.1rem;
        width: 1.7rem;
        height: 0.7rem;
        margin-left: 0.7rem;
        background-color: rgba(255, 87, 34, 1);
        .refuse-font {
          color: white;
          font-size: 0.3rem;
        }
      }
    }
  }
</style>
