<template>
  <div>
    <div class="header-contain">
      <div @click="toCallName" class="img-contain">
        <img src="@/assets/dm.svg">
        <div class="header-font">点名</div>
      </div>
      <div class="img-contain">
        <img src="@/assets/sp.svg">
        <div class="header-font">审批</div>
      </div>
      <div class="img-contain">
        <img src="@/assets/tz.svg">
        <div class="header-font">通知家长</div>
      </div>
      <div class="img-contain">
        <img src="@/assets/bj.svg">
        <div class="header-font">班级课表</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "buy",
    methods: {
      toCallName() {
        this.$router.push("/call-name");
      }
    }
  };
</script>

<style lang="less" scoped>
  .header-contain {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 2.5rem;
    background-color: rgba(255, 87, 34, 1);
    .img-contain {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .header-font {
        margin-top: 0.1rem;
        color: white;
        font-size: 0.3rem;
      }
    }
  }
</style>
