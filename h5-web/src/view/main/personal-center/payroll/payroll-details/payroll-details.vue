<template>
    <div>
      <main-header :header-name="headerName"></main-header>
      <div  class="img">
        <div class="wage-contain">
          <span class="wage-font">2019年03月</span>
          <span class="wage-num">¥4583.55</span>
        </div>
        <div class="real_wage">
          <div class="real_font">实发工资</div>
          <div class="real_num">同比上升5%</div>
        </div>
      </div>
      <div v-for="(item1,index) in wage " :key=index>
        <div  class="basic-wage">{{item1.key}}</div>
        <div class="basic-card" v-for="(item2,index) in item1.child" :key="index">
          <div class="card_font">{{item2.des}}</div>
          <div class="card_font">{{item2.money}}</div>
        </div>
      </div>
      <div class="sum-card">
          <div class="sum-font">实发工资:</div>
          <div class="sum-contain">
           <div class="sum-mun">1650+1600+1650+1650+300+200+200+300-500-200=
             <span class="mun">4583.55</span>
           </div>
          </div>
      </div>

    </div>
</template>

<script>
    import MainHeader from "../../../../../components/header/header";
    export default {
        name: "payroll-details",
        components: {MainHeader},
      data(){
          return{
            headerName: '工资单',
            wage:[
              {
                key:'基本工资',
                child:[
                  {
                    des:'基本工资',
                    money:'¥1650'
                  },
                  {
                    des:'职务工资',
                    money:'¥1650'
                  },
                  {
                    des:'课时工作量工资',
                    money:'¥1650'
                  },
                  {
                    des:'值班工资',
                    money:'¥1650'
                  },
                  {
                    des:'考勤工资',
                    money:'¥300'
                  },
                ]
              },
              {
                key:'福利津贴',
                child:[
                  {
                    des:'通讯补贴',
                    money:'¥200'
                  },
                  {
                    des:'餐补',
                    money:'¥200'
                  },
                  {
                    des:'子女教育补贴',
                    money:'¥300'
                  }
                ]
              },
              {
                key:'应扣福利',
                child:[
                  {
                    des:'社保',
                    money:'¥500'
                  },
                  {
                    des:'公积金',
                    money:'¥200'
                  }
                ]
              },
            ]
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
      padding: 0.6rem 0.6rem 0 0.6rem;
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
    .real_wage{
      display: flex;
      justify-content: space-between;
      padding: .3rem .7rem 0 .9rem;
      .real_font{
        font-family: 'PingFangSC-Light', 'PingFang SC Light', 'PingFang SC';
        font-weight: 200;
        font-style: normal;
        font-size: .25rem;
        color: #FFFFFF;
      }
      .real_num{
        font-family: 'PingFangSC-Light', 'PingFang SC Light', 'PingFang SC';
        font-weight: 200;
        font-style: normal;
        font-size: .25rem;
        color: #FFFFFF;
      }
    }
  }
  .basic-wage{
    margin:  .3rem 0 .2rem 0;
   text-align: center;
    font-family: 'PingFang-SC-Bold', 'PingFang SC Bold', 'PingFang SC';
    font-weight: 700;
    font-style: normal;
    font-size: .28rem;
  }
  .basic-card{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 .4rem;
    margin-left: .35rem;
    background: white;
    width: 6.8rem;
    height: 1rem;
    margin-top: .1rem;
    border-radius: .15rem;
    .card_font{
      font-family: 'PingFangSC-Light', 'PingFang SC Light', 'PingFang SC';
      font-weight: 200;
      font-style: normal;
      font-size: .28rem;
    }
  }
  .sum-card{
    margin-bottom: 1rem;
    margin-left: .35rem;
    background: white;
    width: 6.8rem;
    height: 3rem;
    margin-top: .3rem;
    border-radius: .15rem;
    .sum-font{
      padding: .3rem;
      font-family: 'PingFang-SC-Bold', 'PingFang SC Bold', 'PingFang SC';
      font-weight: 700;
      font-style: normal;
    }
    .sum-contain{
      padding:.1rem .3rem 0 .3rem;
      .sum-mun{
        font-family: 'PingFangSC-Regular', 'PingFang SC';
        font-weight: 400;;
        font-size:.3rem ;
        .mun{
          font-family: 'PingFang-SC-Bold', 'PingFang SC Bold', 'PingFang SC';
          font-weight: 700;
          font-size: .5rem;
          color: #FF5722;
        }
      }
    }
  }


</style>
