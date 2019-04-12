<template>
  <div>
    <main-header :header-name="headerName" :show="isShow" style="background-color: rgba(241, 241, 241, 1)"></main-header>
    <div class="leave-content">
      <img src="@/assets/kuang.svg">
      <div style="position: absolute;top:1.5rem;left:1rem">
        <span class="teacher-name">
        周小星
      </span>
        <span class="teacher-des" >同学，请假申请已审批</span>
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
        <div class="approve_font">批准</div>
      </div>
    </div>
  </div>
</template>

<script>
    import MainHeader from "../../../../components/header/header";
    export default {
        name: "approval-results",
      components: {MainHeader},
      created(){
          this.title=this.$route.query.title
          console.log(this.title)
      },
      data(){
          return{
            headerName:'审批结果',
            isShow:true,
            title:''
          }
      }
    }
</script>

<style lang="less" scoped>
  .leave-content{
    position: relative;
    background: white;
    height: 100vh;
    margin-top: .7rem;
    padding: .7rem .5rem .7rem .5rem;
    .teacher-name{
      font-weight:700;
    }
    .teacher-des{
      font-weight:200;
    }
    .content_contain{
      margin-top: .2rem;
      font-weight:200;
    }
    .leave-font{
      padding: 0.2rem;
      font-family: 'PingFang-SC-Bold', 'PingFang SC Bold', 'PingFang SC';
      font-weight: 700;
      font-style: normal;
    }
    .img-contain{
      position: absolute;
      top:.3rem;
      left:5.6rem;
      .approve_font{
        margin-top: -1.1rem;
        margin-left: .2rem;
        font-family: 'PingFang-SC-Bold', 'PingFang SC Bold', 'PingFang SC';
        font-weight: 700;
        font-style: normal;
        font-size: 32px;
        color: #D9001B;
        transform:rotate(45deg);
      }
    }

    .button_contain{
      display: flex;
      margin-top: .5rem;
      margin-left: .5rem;
      .approve{
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: .1rem;
        width: 1.7rem;
        height: .7rem;
        background-color: rgba(0, 204, 57, 1);
        .approve-font{
          color: white;
          font-size: .3rem;
        }
      }
      .refuse{
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: .1rem;
        width: 1.7rem;
        height: .7rem;
        margin-left: .7rem;
        background-color: rgba(255, 87, 34, 1);
        .refuse-font{
          color: white;
          font-size: .3rem;
        }
      }
    }
  }
</style>
