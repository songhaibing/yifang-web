<template>
  <div>
    <main-header :header-name="headerName" :show="isShow" style="background-color: rgba(241, 241, 241, 1)"></main-header>
    <div class="main-contain" >
      <div id="main" ></div>
      <div class="student-contain">
        <div>
          <img src="@/assets/avatar.svg">
          <div class="name">李四</div>
        </div>
        <div>
          <img src="@/assets/avatar.svg">
          <div class="name">李四</div>
        </div>
        <div>
          <img src="@/assets/avatar.svg">
          <div class="name">李四</div>
        </div>
        <div>
          <img src="@/assets/avatar.svg">
          <div class="name">李四</div>
        </div>
        <div>
          <img src="@/assets/avatar.svg">
          <div class="name">李四</div>
        </div>
        <div>
          <img src="@/assets/avatar.svg">
          <div class="name">李四</div>
        </div>
        <div>
          <img src="@/assets/avatar.svg">
          <div class="name">李四</div>
        </div>
        <div>
          <img src="@/assets/avatar.svg">
          <div class="name">李四</div>
        </div>
        <div>
          <img src="@/assets/avatar.svg">
          <div class="name">李四</div>
        </div>
        <div>
          <img src="@/assets/avatar.svg">
          <div class="name">李四</div>
        </div>
        <div>
          <img src="@/assets/avatar.svg">
          <div class="name">李四</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import MainHeader from "../../../../components/header/header";
  var echarts = require('echarts')
  export default {
    name: "call-name",
    components: {MainHeader},
    data(){
      return{
        headerName:'点名',
        isShow:true
      }
    },
    mounted(){
      this.a()
    },
    methods:{
      a(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        window.onresize = myChart.resize;
        // 绘制图表
        myChart.setOption({
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius: '40%',
              data:[
                {value:50, name:'实到50%'},
                {value:10, name:'休学10%'},
                {value:20, name:'病假20%'},
                {value:10, name:'事假10%'},
                {value:10, name:'缺勤10%'}
              ]
            }
          ]
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .main-contain{
    display: flex;
    background: white;
    #main{
      width:5.5rem;
      height: 4rem;
      position:fixed;
      top:6rem;
      left: .3rem;
  }
  }
  .student-contain{
    overflow-y: auto;
    border-left:1px solid #999999;
    margin-top: .7rem;
    margin-left: 6rem;
    img{
      padding-top: .1rem;
      margin-left: .15rem;
    }
    .name{
      font-family: 'PingFangSC-Light', 'PingFang SC Light', 'PingFang SC';
      font-weight: 200;
      margin-left: .3rem;
      font-style: normal;
      font-size: .28rem;
    }
  }

</style>

