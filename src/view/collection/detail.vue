<template>
    
</template>

<script>
    export default {
        name: "detail",
      data(){
        return{
        }
      },
      created(){
       this.$api.store.collectDeilt({
         key:localStorage.getItem('access_token'),
         article_id:this.$route.params.id
       }).then(res=>{
         console.log(res)
       })
      }
    }
</script>

<style scoped>

</style>
