<template>
  <div>
    <main-header :header-name="headerName" :show="isShow" style="background-color: rgba(241, 241, 241, 1)"></main-header>
    {{title}}
  </div>
</template>

<script>
    import MainHeader from "../../../../components/header/header";
    export default {
        name: "approval-results",
      components: {MainHeader},
      created(){
          this.title=this.$route.query.title
          console.log(this.title)
      },
      data(){
          return{
            headerName:'审批结果',
            isShow:true,
            title:''
          }
      }
    }
</script>

<style scoped>

</style>
