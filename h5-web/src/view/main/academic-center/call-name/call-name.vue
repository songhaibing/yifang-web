<template>
  <div>
    <main-header :header-name="headerName" :show="isShow" style="background-color: rgba(241, 241, 241, 1)"></main-header>
  </div>
</template>

<script>
  import MainHeader from "../../../../components/header/header";
  export default {
    name: "call-name",
    components: {MainHeader},
    data(){
      return{
        headerName:'点名',
        isShow:true
      }
    }
  };
</script>

<style scoped>
</style>
