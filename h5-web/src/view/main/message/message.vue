<template>

  <div>
    <main-header :header-name="headerName" :show="isShow"></main-header>
  </div>
</template>

<script>
    import MainHeader from "../../../components/header/header";
    export default {
        name: "index",
        components: {MainHeader},
        data(){
          return{
            headerName:'消息中心',
            isShow:false
          }
      }
    }
</script>

<style scoped>

</style>
