<template>
    <div class="store">
         <!-- 头部 -->
        <pub-head :text="text" bgColor="#20223b" leftColor="#fff">
            <div slot="imgs" class="title flexc"><img src="@/assets/store-logo.png" alt=""></div>
            <div class="right-img" @click="goUser"><img src="@/assets/index-login-ico.png" alt="" class="fill"></div>
        </pub-head>

        <div class="store-img">
            <img src="@/assets/shopList-banner.jpg" alt="" class="fill-auto">
            <img src="@/assets/shopList-img.jpg" alt="" class="fill-auto">
        </div>
        <!-- 商品列表 -->
            <list class="goods-list stror-goods flex-wrap"
                v-model="loading"
                :finished="finished"
                :immediate-check="false"
                finished-color="#777"
                finished-text='已经到底了'
                @load="onLoad"
            >
                <div class="goods" v-for="(item,index) in storeGoods" :key="item.id">
                    <div class="goods-img"><router-link :to="'/store/detail/'+item.id+'?key=DprCuAQois6jLlI'"><img :src="host+item.img" alt="" class="fill"></router-link></div>
                    <div class="jus-b">
                        <div class="flexc add-car" @click="addCart(item.id)">加购</div>
                        <router-link :to="'/PlaceOrder/PlaceOrder?type=2&item_id='+item.id" class="flexc go-buy">立即购买</router-link>
                    </div>
                    <div class="goods-msg oneline">{{item.title}}</div>
                </div>
            </list>
         <!-- 绑定手机弹框 -->
        <van-popup 
            v-model="isShow"
            class="popup-radius"
        >
            
            <div class="sign-box" v-if="isShow">
                <!-- 右上角关闭按钮 -->
                <div class="btn-off flexc" @click="offPupop">X</div>
                <div class="tips">需要绑定您的手机以便提高账户的安全性</div>
                <div class="bind-phone"><input type="text" placeholder="请输入11位手机号" v-model="phone"></div>
                <div class="code flex">
                    <input type="text" placeholder="请输入验证码" v-model="sendCode">
                    <div class="send-code flexc" @click="getcode">{{code}}</div>
                </div>
                <div class="confirm flexc" @click="submitData">确认</div>
            </div>
           
        </van-popup> 
    </div>
</template>

<script>
import pubHead from '@/components/head/head';
import list from '@/components/listLoad/listLoad';
export default {
    name:'Store',
    components: {
        pubHead,
        list
    },
    data () {
        return {
            text:false,
            page:0,  //加载页数
            loading: false,
            finished: false,
            storeGoods:[],//商品列表
            sendCode:'',//验证码
            phone:'',//手机号
            code: '发送验证码', // 获取验证码按钮文字
            isCode: true, // 是否可以重新获取验证码
            isSubmitData: true,//是否提交
            host:'http://101yi.cn/data/attachment/item/',//图片路径前缀
        }
    },
    activated () {
        // isUseCache为false才重新刷新获取数据
        // 因为对list使用keep-alive来缓存组件，所以默认是会使用缓存数据的         
        if(!this.$route.meta.isUseCache){            
            
            this.storeGoods = [];
            this.finished = false;
            this.page = 0;
            // 获取数据
            this.onLoad();
        }
        this.$route.meta.isUseCache = false;
    },
    beforeRouteLeave (to, from, next) {
        // 如果前往商品详情或者店铺详情则缓存数据
        if (to.name === 'StoreDetail') {
            from.meta.isUseCache = true;
        }
        next();
    },
    methods: {
        onLoad () {
            this.loading = true;
            this.page ++;
            this.$api.store.storeList({        
                page: this.page ,
                size: 8    
            }).then(res=> {
                console.log(res.data.item);
                this.loading = false;
                // 更新列表数据
                this.storeGoods = [...this.storeGoods, ...res.data.item];
                // 判断返回的数据是否为空
                this.page == 1 && (this.storeGoods.length == 0);
                this.finished = res.data.item.length < 8;
            }) 
        },
        goUser () {
            let isbind = localStorage.getItem('isbind');
            if(isbind == 1) {
                this.$router.push('/user/user');
                
            }else {
                this.isShow = true;
            }
        },
        // 加入购物车
        addCart (id) {
            let isbind = localStorage.getItem('isbind');
            if(isbind == 1) {
                this.$api.store.addCart({
                    key:this.$store.state.token,
                    id:id
                }).then(res => {
                    this.$Tip(res.msg);
                })
                
            }else {
                this.$Tip('请先绑定手机号');
            }
            
        },
        // 关闭弹框
        offPupop () {
            this.isShow = false;
        },
        // 获取验证码
        getcode () {
            if (!this.isCode) return;
            if (!u_Reg(this.phone, 'notEmpty')) {
                this.$Tip('请输入手机号');
                return;
            }
            if (!u_Reg(this.phone, 'phone')) {
                this.$Tip('手机号格式错误');
                return;
            }
            if(this.code === '发送验证码'){
                let time = 60;
                this.isCode = false;
                this.code = time + 's后重试';
                const timer = setInterval(() => {
                    time--;
                    this.code = time + 's后重试';
                    if(time < 0){
                        this.code = '发送验证码';
                        this.isCode = true;
                        clearInterval(timer);
                    }
                }, 1000)
                this.$once('hook:beforeDestroy', () => {
                    clearInterval(timer);
                });
                // 获取验证码
                this.$api.user.getCode({mobile: this.phone}).then(res => {
                    // this.code_key = res.data.code_key;
                    console.log(res.data);
                })
            }
        },
        // 绑定手机号-提交数据
        submitData () {
            // 防止重复提交
            if (!this.isSubmitData) return;
            // 检测数据类型
            if(!u_Reg(this.phone, 'notEmpty')){
                this.$Tip('请填写手机号');
                return
            }
            if(!u_Reg(this.phone, 'phone')){
                this.$Tip('手机号格式错误');
                return
            }
            if(!u_Reg(this.sendCode,'notEmpty')){
                this.$Tip('请输入验证码！')
                return
            } 
            // 提交数据
            this.isSubmitDataisSubmitData = false;
            this.$api.user.bindPhone({
                mobile: this.phone,
                m_code: this.sendCode
            }).then((res)=>{
                this.isSubmitData = true;
                this.$Tip('绑定成功');
                // 存vuex改变状态
                this.bindSuccess(1);
                localStorage.setItem('isbind',1);
                // 存token
                const access_token = res.data.key;
                localStorage.setItem('access_token', access_token);       
                store.commit('loginSuccess', access_token);
                this.isShow = false;
                this.isSubmitData = true;
                setTimeout(()=>{
                    this.$router.push('/user/user');
                },500)
                this.$router.push('/user/user');
            }).catch(err => {
                this.$Tip('绑定失败，请重试');
                this.phone = '';
                this.sendCode = '';
                this.isSubmitData = true;
            })
            
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../../style/mixin');
    .title {
        width: 1.8rem;
    }
    .right-img {
        width: .5rem;
    }
    .stror-goods {
        width: 100%;
        padding: .84rem .4rem;
        background-color: #fff;
        .goods {
            width: 4.4rem;
            margin: .28rem .1rem;
            .goods-img {
                width: 100%;
                height: 4.4rem;
                border-radius: .1rem;
                overflow: hidden;
            }
            .jus-b {
                padding: .28rem .24rem;
                .flexc {
                    width: 1.8rem;
                    height: .6rem;
                    color: #fff;
                    font-size: .28rem;
                    background-color: #277077;
                    border-radius: .1rem;
                    &.go-buy {
                        background-color: @main-cor;
                    }
                }
            }
            .goods-msg {
                font-size: .3rem;
                line-height: .46rem;
                color: #3f3f3f;
                text-align: center;
            }
        }
    }
</style>

