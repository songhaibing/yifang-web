<template>
    <div class="message">
        <!-- 头部 -->
        <pub-head title="消息"  rightSize=".3rem" rightColor="#505050" :text="text">
            <div @click="adminMessage">管理</div>
        </pub-head>

        <!-- 消息列表 -->
        <div class="message-list">
            <list
                v-model="loading"
                :finished="finished"
                :immediate-check="false"
                finished-color="#777"
                finished-text='没有更多消息了'
                @load="onLoad"
            >
                <div class="van-hairline--bottom jus-b ali-c message-item" v-for="(items,index) in list" :key="index">
                    <div class="flex ali-c">
                        <div class="time">{{items.add_time|formats}}</div>
                        <!-- 未读标记 -->
                        <div class="unread" v-if="items.status == 0"></div>
                        <router-link :to="'/message/detail?id='+items.id" class="jus-b ciem ali-c">
                            <p class="oneline">{{items.title}}</p>
                        </router-link>
                    </div>
                    <div class="img"><img src="@/assets/user-menu-next.png" alt="" class="fill-auto" v-if="setClose"></div>
                    <!-- 管理选项 -->
                    <div class="cir-ico" :class="{on:items.isSelect}" @click="admincollection(index)" v-if="setClose == false"></div>
                </div>
            </list>
        </div>
         <!-- 空白 -->
        <section class="null-write"></section>
        <footer class="foot jus-e ali-c" v-if="setClose == false">
            <div class="cancel btn flexc" @click="cancel">取消</div>
            <div class="del btn flexc" @click="deletes">删除</div>
        </footer>
        <popop :isShow="isShow" cancel="取消" sure="确定" :onCancel="cancel" :onSure="confirmDel"></popop>
    </div>
</template>

<script>
import head from '@/components/head/head.vue';
import popop from '@/components/delPopup/delPopup.vue'
import list from '@/components/listLoad/listLoad'
import { u_format } from '@/config/utils'
export default {
    name:'Message',
    components: {
        'pub-head':head,
        popop,
        list
    },
    data () {
        return {
            setClose:true,//显示非管理消息
            check:false,//默认不选中
            isShow:false,
            text:true,//头部文字显示   
            page:0,  //加载页数
            loading: false,
            finished: false,  
            list:[],//消息列表    
        }
    },
    activated () {
        // isUseCache为false才重新刷新获取数据
        // 因为对list使用keep-alive来缓存组件，所以默认是会使用缓存数据的         
        if(!this.$route.meta.isUseCache){            
            
            this.list = [];
            this.finished = false;
            this.page = 0;
            // 获取数据
            this.onLoad();
        }
        this.$route.meta.isUseCache = false;
    },
    beforeRouteLeave (to, from, next) {
        // 如果前往商品详情或者店铺详情则缓存数据
        if (to.name === 'MessageDetail') {
            from.meta.isUseCache = true;
        }
        next();
    },
    filters: {
        // 时间戳转换
        formats (val) {
            return u_format(val * 1000);
        }
    },
    methods: {
        onLoad () {
            this.loading = true;
            this.page ++;
            this.$api.user.messageList({        
                page: this.page,
                size: 15,
                key:this.$store.state.token
            }).then(res=> {
                console.log(res.data);
                this.loading = false;
                // 循环是否选中
                let nowList = res.data.mes;
                nowList.forEach(item => item.isSelect = false);
                // 更新列表数据
                this.list = [...this.list, ...nowList];
                // 判断返回的数据是否为空
                this.page == 1 && (this.list.length == 0);
                this.finished = res.data.mes.length < 15;
                console.log(this.list);
            }) 

        },
        // 管理消息
        adminMessage () {
            this.setClose = false;
        },
        // 取消
        cancel () {
            this.setClose = true;
            this.isShow = false;
            this.allCheck();
        },
        // 点击删除弹出框
        deletes () {
            this.isShow = true;
        },
       
        // 弹出框点击删除
        confirmDel () {
            if (!this.checkIsSelectSomeone()) {
                this.$Tip('请选择要删除的消息');
                this.isShow = false;
                return;
            }
            // 获取要删除商品的id
            let delArr = []; // 需要删除的id数组
            let leftArr = []; // 剩下的消息数组
            // 区分待删除商品和剩下的消息
            this.list.forEach(item => item.isSelect ? delArr.push(item.id) : leftArr.push(item));
            console.log(delArr.join(','));
           //提交删除数据
            this.$api.user.delMessage({
                key: this.$store.state.token,
                id: delArr.join(',')
            }).then(res => {
                this.$Tip('删除成功');
                this.list = [...leftArr];
            }).catch(res => {
                    this.$Tip('操作失败');
            });
            this.setClose = true;
            this.isShow = false;
        },
        // 选择单个消息
        admincollection(index) {
            // 选中或者取消选中
            this.list[index].isSelect = !this.list[index].isSelect;
            
        },
        // 点击取消清除选择了的函数
        allCheck () {
            this.list.forEach(item => {
                item.isSelect = false;
            });
        },
        // 检测是否选中了消息
        checkIsSelectSomeone () {
            return this.list.some(item => item.isSelect);
        },
    }
}
</script>

<style lang="less" scoped>
@import url('../../style/mixin');
    .message-list {
        margin-top: .36rem;
        .message-item {
            height: 1.22rem;
            padding: 0 .3rem;
            font-size: .36rem;
            .time {
                width: 2.4rem;
                color: #575757;
            }
            .ciem {
                // width: 100%;
            }
            .oneline {
                width: 5.8rem;
                color: #0d0d0d;
                margin-left: .2rem;
            }
            .unread {
                width: .28rem;
                height: .28rem;
                margin-left: .4rem;
                .border-radius(.28rem);
                background-color: @main-cor;
            }
            .img {
                width: .2rem;
                height: .36rem;
            }
             // 管理选项切换圆
            .cir-ico {
                width: .46rem;
                height: .46rem;
                background: url(~@/assets/cir.png) no-repeat;
                .bg-size(.46rem,.46rem);
                &.on {
                    background: url(~@/assets/cir-on.png) no-repeat;
                    .bg-size(.46rem,.46rem);
                }
            }
        }
    }
    // 底部
    .foot {
        background-color: #20223b;
        .fixedBottom(@height: 1.5rem, @index: 9);
        .btn {
            width: 2rem;
            height: .8rem;
            .border-radius(.8rem);
            &.cancel {
                color: #333;
                background-color: #fff;
            }
            &.del {
                color: #fff;
                background-color: @main-cor;
                border: 2px solid #fff;
                margin-left: .26rem; 
                margin-right: .48rem;
            }
        }
    }


</style>

