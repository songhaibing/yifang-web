<template>
  <div>
    <div class="default">
      <div class="u580_div" ></div>
      <div  class="img"   ></div>
      <div class="font-content">
        <div class="teacher-name">周老师</div>
        <div class="teacher-des">
          <p class="font">您已经累计工作</p>
          <div style="display: flex">
            <p class="hour-mun">7853</p>
            <span class="font">小时</span>
          </div>
        </div>
      </div>
      <div class="font-des">春蚕到死丝方尽蜡烛成灰泪始干</div>

    </div>
    <div class="card-contain">
      <div class="card" v-for="(item,index) in title" :key="index" @click="jump(item.router)">
          <div class="card-title">{{item.key}}</div>
          <img class="card-img" src="@/assets/personal-center/right.svg">
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "personal-center",
    data() {
      return {
          title:[
            {
              key:'课程',
              router:""
            },
            {
              key:'工资单',
              router:'/payroll'
            },
            {
              key:'我的请假',
              router:""
            },
            {
              key:'我的声誉',
              router:""
            },
            {
              key:'设置',
              router:""
            }
          ]
      };
    },
    methods:{
      jump(router){
        this.$router.push(router)
      }

    },
    mounted() {}
  };
</script>




<style lang="less" scoped>
  @import "../../../style/personal-center.less";

</style>
