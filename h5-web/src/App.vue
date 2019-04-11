<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
  export default {
    name: "App"
  };
</script>

<style lang="less" scoped>
  @import url("//at.alicdn.com/t/font_1086310_zq2h1z2p7x9.css");
  #app {
    width: 100%;
    overflow-x: hidden;
    min-height: 100vh;
  }
</style>
