<template>
    <div class="message-detail">
        <!-- 头部 -->
        <pub-head title="消息" :text="text">
        </pub-head>
        <h2 class="title">{{detail.title}}</h2>
        <p class="text" v-html="detail.info"></p>
    </div>
</template>

<script>
import head from '@/components/head/head.vue';
    export default {
        name:'MessageDetail',
         components: {
        'pub-head':head
        },
        data () {
            return {
                text:true,//头部文字显示
                detail:'',//消息详情
            }
        },
        created () {
            this.$api.user.messageDeatail({
                key:localStorage.getItem('access_token'),
                id:this.$route.query.id
            }).then(res => {
                this.detail = res.data.news
            })
        }
    }
</script>

<style lang="less" scoped>
@import url('../../style/mixin');
    .title {
        text-align: center;
        line-height: 1rem;
    }
    .text {
        color: #333;
        padding: 0 .4rem;
        text-indent: 2em;
        line-height: .68rem;
    }
</style>
