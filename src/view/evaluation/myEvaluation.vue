<template>
    <div class="my-evaluation">
         <!-- 头部 -->
        <pub-head title="我的评价" :text="text" bgColor="#f0eff5"></pub-head>
        <div class="main" v-if="finished">
            <div class="flex title ali-c">
                <div class="img"><img :src="userIfor.avatar" alt="" class="fill"></div>
                <div class="user-name">{{userIfor.nickname}}</div>
            </div>
            <div class="date">{{data.add_time|formats}}</div>
            <div class="conment">{{data.memos}}</div>
            <div class="conment-img flex-wrap">
                <div class="img" v-for="(imgIng,index) in imgs" :key="index"><img :src="imgIng.url" alt="" class="fill"></div>
            </div>
        </div>
    </div>
    
</template>

<script>
import pubHead from '@/components/head/head.vue';
import { u_formatTimestamp } from '@/config/utils'
export default {
    name:'MyEvaluation',
     components: {
        pubHead
    },
    data () {
        return {
            text:true,//头部文字显示
            // token:'DprCuAQois6jLlI',//固定假的token
            data:{},//我的评价数据
            imgs:{},//上传图片数组
            userIfor:{},//评价用户信息
            finished:false,//数据加载完成前不显示
        }
    },
    created () {
        this.$Loading('评价加载中');
        this.$api.order.myEvaluate ({
            order_id:this.$route.query.id,
            key: localStorage.getItem('access_token')
    }).then(res => {
            this.data =res.data.comment;
            this.imgs = res.data.comment.img;
            this.userIfor = res.data.comment.member;
            this.$toast.clear();
            this.finished = true;
        })
    },
    filters: {
        // 时间戳转换
        formats (val) {
            return u_formatTimestamp(val * 1000);
        }
    },

}
</script>

<style lang="less" scoped>
@import url('../../style/mixin');
.main {
    padding: .8rem;
    .title {
        height: 1rem;
        .img {
            width: 1rem;
            height: 1rem;
            border-radius: 1rem;
            margin-right: .5rem;
            overflow: hidden;
        }
        .user-name {
            color: #333;
        }
    }
    .date {
        color: #666;
        line-height: 1rem;
    }
    .conment {
        color: #333;
        line-height: .6rem;
    }
    .conment-img {
        margin-top: 1rem;
       .img {
            width: 2.2rem;
            height: 2.2rem;
            margin: .3rem;
       }
    }
}
</style>
