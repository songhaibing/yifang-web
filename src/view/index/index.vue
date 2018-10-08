<template>
    <div class="index">
        <section class="img-box">
            <!-- 文章 -->
            <router-link :to="'/article/'+item.url" class="img" v-for="(item,index) in article" :key="index"><img :src="host+item.content" alt=""></router-link>
            <!-- 商品链接 -->
            <router-link class="img" to="/store/store"><img :src="hosttwo+store.content" alt=""></router-link>
            <!-- 友情链接 -->
            <div class="img"><img :src="hosttwo+flink.content" alt=""></div>
            <!-- 关于我们 -->
            <router-link :to="'/article/'+about.url" class="img"><img :src="hosttwo+about.content" alt=""></router-link>
            <!-- 底部 -->
            <div class="index-foot" @click="goBindPhone">
                <div class="ico"><img src="@/assets/index-login-ico.png" alt=""></div>
            </div>
            <div class="set-foot"></div>
            
        </section>

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
import head from '@/components/head/head.vue';
import { u_Reg } from '@/config/utils';
import { mapMutations } from 'vuex';
export default {
    name:'Index',
    data () {
        return {
            isShow:false,
            article:[],//文章数据
            flink:{},//友情链接
            store:{},//商城
            about:{},//关于我们
            sendCode:'',//验证码
            phone:'',//手机号
            code: '发送验证码', // 获取验证码按钮文字
            isCode: true, // 是否可以重新获取验证码
            isSubmitData: true,//是否提交
            host:'http://101yi.cn/',//域名前缀
            hosttwo:'http://101yi.cn/data/attachment/guang/',//域名前缀
        }
    },
    created () {
        this.$api.user.index().then(res => {
            this.article = res.data.article;
            this.flink = res.data.flink;
            this.store = res.data.item;
            this.about = res.data.about;
        })
    },
    methods: {
        ...mapMutations([
            'bindSuccess'
		]),
        // 点击绑定手机弹框
        goBindPhone () {
            let isbind = localStorage.getItem('isbind');
            if(isbind == 1) {
                this.$router.push('/user/user');
                
            }else {
                this.isShow = true;
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
.img-box {
    img {
        width: 10rem;
    }
}
    .index-foot {
        width: 10rem;
        max-width: 1000px;
        position: fixed;
        bottom: 0;
        height: 1.42rem;
        background: url(~@/assets/index-login.jpg) no-repeat center;
        .bg-size(10rem, 1.42rem);
        .ico {
            width: .5rem;
            height: .56rem;
            position: absolute;
            right: 1.1rem;
            top: 0.5rem;
        }
    }
    .set-foot {
        height: 1.42rem;
    }
    // 签到弹框
     .sign-box {
        position: relative;
        overflow: hidden;
        width: 8.56rem;
        height: 7rem;
        margin: 0 auto;
        border-radius: .1rem;
        background-color: #fff;
        padding: 1.2rem .8rem;
        // 关闭按钮
        .btn-off {
            position: absolute;
            top: 0;
            right: 0;
            width: .8rem;
            height: .8rem;
            font-size: .5rem;
            color: #b1b1b1;
        }
        // 提示文字
        .tips {
            font-size: .32rem;
            color: #747474;
            text-align: center;
        }
        // 绑定手机
        .bind-phone {
            width: 100%;
            height: 1rem;
            border: 1px solid #b1b1b1;
            border-radius: .1rem;
            padding: 0 .3rem;
            margin-top: .28rem;
            background:url(~@/assets/phone.png) no-repeat .3rem ;
            .bg-size(.28rem,.46rem);
            input {
                width: 6rem;
                height: .94rem;
                margin-left: .5rem;
                font-size: .36rem;
            }
        }
        .code {
            width: 100%;
            height: 1rem;
            margin-top: .28rem;
            input {
                width: 3.9rem;
                height: .96rem;
                border: 1px solid #b1b1b1;
                border-radius: .1rem;
                padding-left: .3rem;
                font-size: .36rem;
                margin-right: .4rem;
            }
            .send-code {
                width: 3rem;
                height: .96rem;
                border: 1px solid #18bd1c;
                border-radius: .1rem;
                font-size: .36rem;
                color: #18bd1c;
            }
        }
        .confirm {
            width: 100%;
            height: 1rem;
            color: #fff;
            background-color: @main-cor;
            font-size: .4rem;
            border-radius: .04rem;
            margin-top: .28rem;
        }
     }
</style>

