<template>
    <div class="set">
        <!-- 头部 -->
        <pub-head title="设置" :text="text">
        </pub-head>
        <div class="setimg">
            <!-- 意见与反馈 -->
            <router-link to="/user/feedback" class="van-hairline--bottom jus-b ali-c set-up">
                <div class="ali-c">意见与反馈</div>
                <div class="img"><img src="@/assets/user-menu-next.png" alt="" class="fill-auto"></div>
            </router-link>
            <!-- 退出登录 -->
            <!-- <div class="van-hairline--bottom jus-b ali-c set-up" @click="exitLogon">
                <div class="ali-c">退出登录</div>
                <div class="img"><img src="@/assets/user-menu-next.png" alt="" class="fill-auto"></div>
            </div> -->
        </div>
        <!-- 退出登录弹框提示 -->
        <popop :isShow="isShow" cancel="取消" sure="确认退出" :onCancel="cancel" :onSure="cancel"></popop>
    </div>
</template>

<script>
import head from '@/components/head/head.vue';
import popop from '@/components/delPopup/delPopup.vue'
    export default {
        name:'Set',
        components: {
        'pub-head':head,
        popop
        },
        data () {
            return {
                isShow:false,//弹框 默认不显示
                text:true,//头部文字显示
            }
        },
        methods: {
            // 退出登录弹框
            exitLogon () {
                this.isShow = true;
            },
            // 取消退出
            cancel () {
                this.isShow = false;
            }
        }
    }
</script>

<style lang="less" scoped>
@import url('../../style/mixin');
   .set {
       min-height: 100vh;
        .setimg {
            margin-top: .2rem;
            .set-up {
                height: 1.22rem;
                padding: 0 .3rem;
                font-size: .38rem; 
                color: #0d0d0d;
                .img {
                    width: .2rem;
                    height: .36rem;
                }
            }
        }
   }
</style>
