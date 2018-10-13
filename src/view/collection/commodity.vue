<template>
    
</template>

<script>
    export default {
        name: "commodity",
      data(){
        return{
        }
      },
      created(){
        this.$api.store.commodity({
          key:localStorage.getItem('access_token'),
          item_id:this.$route.params.id
        }).then(res=>{
          console.log(res)
        })
      }
    }
</script>

<style scoped>

</style>
