<template>
  <div class="header-contain">
    <img class="left" v-show="show" @click="goBack" src="@/assets/personal-center/left.svg">
    <div class="header-font" :class="!show?'rightClass':''">{{headerName}}</div>
  </div>
</template>

<script>
  export default {
    name: "main-header",
    methods:{
      goBack(){
        this.$router.go(-1)
      }
    },
    props:["headerName","show"]

  }
</script>

<style lang="less" scoped>
  .header-contain{
    position: fixed;
    top:0;
    display: flex;
    align-items: center;
    height: .7rem;
    width: 100%;
    background: white;
    .left{
      padding-left: .5rem;
    }
    .header-font{
      padding-left: 2.5rem;
      font-size:.34rem;
    }
    .rightClass{
      padding-left: 3rem;
    }
  }

</style>
