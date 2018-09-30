<template>
    <div class="evaluation-success">
         <!-- 头部 -->
        <pub-head title="发表评价" :text="text" bgColor="#f0eff5"></pub-head>
        <!-- 评价成功 -->
        <div class="state flexc ">
            <!-- 评价成功 -->
            <div class="text">
                <div class="words flexc">已方良田感谢您宝贵的评价！</div>
            </div>
        </div>
       <!-- 查看我的评价 -->
       <router-link :to="'myEvaluation?id='+id" class="look-my-evaluation flexc">查看我的评价</router-link>
        
    </div>
    
</template>

<script>
import pubHead from '@/components/head/head.vue';
export default {
    name:'EvaluationSuccess',
     components: {
        pubHead
    },
    data () {
        return {
            text:true,//头部文字显示
            id:'',//id
        }
    },
    created () {
        this.id = this.$route.query.id;
    }

}
</script>

<style lang="less" scoped>
@import url('../../style/mixin');
    .state {
        height: 3rem;
        background-color: @main-cor;
        .text {
            color: #fff;
            font-size: .5rem;
           
        }
    }
    .look-my-evaluation {
        width: 4.4rem;
        height: 1.4rem;
        font-size: .46rem;
        color: @main-cor;
        border: 1px solid @main-cor;
        margin: 2rem auto 0 auto;
        border-radius: 1.4rem;
    }
</style>
