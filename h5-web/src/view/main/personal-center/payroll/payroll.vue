<template>
<div>
  <main-header :headerName="headerName"></main-header>
  <div  class="img" >
    <div class="wage-contain">
      <span class="wage-font">2019年03月工资</span>
      <span class="wage-num">¥4583.55</span>
    </div>
    <div class="button">
      <span class="button-des" @click="viewDetail">查看明细</span>
    </div>
  </div>
  <div class="card-contain">
        <div class="wage_font">2019年02月工资</div>
        <div>
          <span class="wage_num">¥4583.55</span>
          <img src="@/assets/personal-center/payroll-right.svg">
        </div>
  </div>
  <div class="card-contain">
    <div class="wage_font">2019年02月工资</div>
    <div>
      <span class="wage_num">¥4583.55</span>
      <img src="@/assets/personal-center/payroll-right.svg">
    </div>
  </div>
  <div class="card-contain">
    <div class="wage_font">2019年02月工资</div>
    <div>
      <span class="wage_num">¥4583.55</span>
      <img src="@/assets/personal-center/payroll-right.svg">
    </div>
  </div>
</div>


</template>

<script>

    import MainHeader from "../../../../components/header/header";
    export default {
        name: "payroll",
        components: {MainHeader},
        data(){
          return{
            headerName:'工资单'
          }
        },
      methods:{
        viewDetail(){
          this.$router.push('/payroll-details')
        }
      }
    }
</script>

<style lang="less" scoped>

  .img{
    background: url(~@/assets/center.png);
    background-size: 6.8rem 3.25rem;
    border-radius: .2rem;
    margin-left: .35rem;
    margin-top: 1.1rem;
    width: 6.8rem;
    height: 3.25rem;
    .wage-contain{
      display: flex;
      justify-content: space-between;
      padding: .6rem;
      .wage-font{
        font-weight: 700;
        color: white;
        font-size: .35rem;
        font-family: 'PingFang-SC-Bold', 'PingFang SC Bold', 'PingFang SC';
      }
      .wage-num{
        font-weight: 700;
        color: white;
        font-size: .35rem;
        font-family: 'PingFang-SC-Bold', 'PingFang SC Bold', 'PingFang SC';
      }
    }
    .button{
      text-align: center;
      line-height: .5rem;
      margin-left: 2.5rem;
      border: none;
      width: 1.5rem;
      height: .5rem;
      border-radius: .1rem;
      background-color: rgba(255, 87, 34, 1);
      .button-des{
        color: white;
        font-size:.3rem;
      }
    }
  }
  .card-contain{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 .3rem;
    margin-left: .35rem;
    margin-top: .2rem;
    background: white;
    width: 6.75rem;
    height: 1rem;
    border-radius: .15rem;
    .wage_font{
      font-family: 'PingFangSC-Light', 'PingFang SC Light', 'PingFang SC';
      font-weight: 200;
      font-style: normal;
      color: #2A2A2A;
    }
    .wage_num{
      font-family: 'PingFangSC-Light', 'PingFang SC Light', 'PingFang SC';
      font-weight: 200;
      font-style: normal;
      color: #2A2A2A;
    }
    img{
      transform:rotateY(180deg);
    }
  }
</style>
