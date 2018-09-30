<template>
  <div id="app">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
 #app { 
    width: 100%;
    overflow-x: hidden;
  }
</style>
