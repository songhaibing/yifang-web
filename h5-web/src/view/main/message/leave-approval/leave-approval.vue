<template>
  <div>
    <main-header :header-name="headerName" :show="isShow" style="background-color: rgba(241, 241, 241, 1)"></main-header>
    <div class="leave-content">
      <span class="teacher-name">周星星老师，周小星</span>
      <span class="teacher-des">同学，向您提交了一条请假申请。</span>
      <div class="content_contain">内容如下：</div>
      <div class="leave-font">请假人：周小星</div>
      <div class="leave-font">请假事由：病假</div>
      <div class="leave-font">请假时间：2019.3.26-2019.3.28</div>
      <div class="leave-font">请假时长：3天</div>
      <div class="leave-font">提交时间：2018.3.25 18:00</div>
      <div class="leave-font">请假发起人：周小星家长</div>
      <div class="button_contain">
        <div @click="approveModel" class="approve">
          <span class="approve-font">批准</span>
        </div>
        <div @click="refuseModel" class="refuse">
          <span class="refuse-font">拒绝</span>
        </div>
      </div>
    </div>
    <van-popup class="model" v-model="show">
      <div class="card1_contain">
        <div :key="index" @click="clickFont(item.title)" class="statement" v-for="(item,index) in critic">{{item.title}}</div>
        <div class="input-contain">
          <input class="input-text">
          <div class="button">发送</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import MainHeader from "../../../../components/header/header";
  export default {
    name: "leave-approval",
    components: { MainHeader },
    data() {
      return {
        critic: [
          {
            title: "早点好起来，加油!"
          },
          {
            title: "祝你身体健康!"
          },
          {
            title: "好好保重身体!"
          },
          {
            title: "身体第一!"
          }
        ],
        headerName: "请假审批",
        isShow: true,
        show: false,
        isApprove: ""
      };
    },
    methods: {
      clickFont(title) {
        this.$router.push({
          path: "/approval-results",
          query: {
            title: title,
            isApprove: this.isApprove
          }
        });
      },
      approveModel() {
        this.show = true;
        this.isApprove = true;
      },
      refuseModel() {
        this.show = true;
        this.isApprove = false;
      }
    }
  };
</script>

<style lang="less" scoped>
  .leave-content {
    background: white;
    height: 100vh;
    margin-top: 0.7rem;
    padding: 0.7rem 0.5rem 0.7rem 0.7rem;
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
      padding: 0.25rem;
      font-family: "PingFang-SC-Bold", "PingFang SC Bold", "PingFang SC";
      font-weight: 700;
      font-style: normal;
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
  .model {
    display: flex;
    align-items: center;
    border-radius: 0.1rem;
    .card1_contain {
      background: white;
      width: 6rem;
      height: 6rem;
      .statement {
        margin: 0.4rem 0.6rem 0 0.6rem;
        font-family: "PingFangSC-Thin", "PingFang SC Thin", "PingFang SC";
        font-weight: 200;
        font-style: normal;
        font-size: 0.28rem;
      }
      .input-contain {
        display: flex;
        .input-text {
          margin: 0.4rem 0.1rem 0 0.6rem;
          border: 1px solid rgb(153, 153, 153);
          width: 3.5rem;
          height: 1.3rem;
        }
        .button {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 0.7rem;
          border-radius: 0.1rem;
          font-family: "PingFangSC-Regular", "PingFang SC";
          font-weight: 400;
          color: #ffffff;
          font-size: 0.25rem;
          width: 0.8rem;
          height: 0.7rem;
          background-color: rgba(0, 204, 57, 1);
        }
      }
    }
  }
</style>
