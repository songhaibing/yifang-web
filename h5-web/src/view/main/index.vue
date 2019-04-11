<template>
  <div>
    <router-view></router-view>
    <div class="contain">
      <div class="tab_contain" @click="clickIndex">
        <img class="index" v-if="tabIndex!=='tabA'" src="@/assets/tab/index@2x.png">
        <img class="index" v-if="tabIndex==='tabA'" src="@/assets/tab/indexxz.png">
        <div class="tab_font" :class="tabIndex==='tabA'?'fontClass':''">消息</div>
      </div>
      <div class="tab_contain" @click="clickIndexD">
        <img class="index" v-if="tabIndex!=='tabD'" src="@/assets/tab/class@2x.png">
        <img class="index" v-if="tabIndex==='tabD'" src="@/assets/tab/classxz.png">
        <div class="tab_font" :class="tabIndex==='tabD'?'fontClass':''">教务中心</div>
      </div>
      <div class="tab_contain" @click="clickIndexE">
        <img class="indexE"  v-if="tabIndex!=='tabE'" src="@/assets/tab/my@2x.png">
        <img class="indexE"   v-if="tabIndex==='tabE'" src="@/assets/tab/myxz@2x.png">
        <div class="tab_font" :class="tabIndex==='tabE'?'fontClass':''">个人中心</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        tabIndex: ''
      }
    },
    created(){
        if(this.$route.path==='/message'){
          this.tabIndex = 'tabA';
        }else if(this.$route.path==='/academic-center'){
          this.tabIndex = 'tabD'
        }else if(this.$route.path==='/personal-center'){
          this.tabIndex = 'tabE'
        }
    },
    methods: {
      clickIndex() {
        this.tabIndex = 'tabA';
        this.$router.push('/message')
      },
      clickIndexD(){
        this.tabIndex = 'tabD'
        this.$router.push('/academic-center')
      },
      clickIndexE(){
        this.tabIndex = 'tabE';
        this.$router.push('/personal-center')
      }
    },
    computed: {},
  };
</script>

<style lang="less" scoped>
  .contain {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: .98rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 .08rem 0 rgba(106, 106, 106, 0.17);
    .tab_contain {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: .16rem;
      .index {
        width: .38rem;
        height: .39rem;
      }
      .indexB{
        width: .41rem;
        height: .39rem;
      }
      .indexC{
        width: .47rem;
        height: .34rem
      }
      .indexE{
        width: .31rem;
        height: .39rem
      }
      .tab_font {
        margin-top: .1rem;
        margin-bottom: .12rem;
        font-size: .2rem;
        color: rgba(68, 68, 68, 1);
      }
      .fontClass{
        color: red;
      }
    }
  }

</style>
