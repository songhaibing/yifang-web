<template>
    <div class="store">
         <!-- 头部 -->
        <pub-head :text="text" bgColor="#20223b" leftColor="#fff">
            <div slot="imgs" class="title flexc">
              <img src="@/assets/store-logo.png" alt="">
            </div>
            <div class="right-img" @click="goUser">
              <img src="@/assets/index-login-ico.png" alt="" class="fill">
            </div>
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
                        <router-link  v-if="isbind==1"  :to="'/PlaceOrder/PlaceOrder?type=2&item_id='+item.id" class="flexc go-buy">立即购买</router-link>
                        <div  @click="buyNow"  v-else class="flexc go-buy">立即购买</div>
                    </div>
                    <div class="goods-msg ">{{item.title}}</div>
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
          <!--<div class="tips">需要绑定您的手机以便提高账户的安全性</div>-->
          <div class="top flexc" @click="tabChange">
            <div class="top-login" data-name="login1" :class="{on:type==1}">登录</div>
            <div class="top-register" data-name="register1" :class="{on:type==2}">注册</div>
          </div>
          <div v-if="type==1">
            <div class="bind-phone"><input type="text" placeholder="请输入账号/手机号" v-model="dlphone"></div>
            <div class="bind-pw"><input type="password" placeholder="请输入密码" v-model="dlpassword"></div>
            <div class="confirm flexc" @click="submitData">登录</div>
            <div class="pw" @click="goChangePw">忘记密码?</div>
          </div>
          <div v-if="type==2">
            <div class="bind-phone"><input type="text" placeholder="请输入11位手机号" v-model="zcphone"></div>
            <div class="code flex">
              <input type="text" placeholder="请输入验证码" v-model="zcsendCode">
              <div class="send-code flexc" @click="zcgetcode">{{code}}</div>
            </div>
            <div class="bind-pw"><input type="password" placeholder="请输入密码" v-model="zcpassword"></div>
            <div class="bind-pw"><input type="password" placeholder="再次输入密码" v-model="againPassword"></div>
            <div class="confirm flexc" @click="enrollment">注册</div>
          </div>
          <div @click="isSelected " class="flexc"  v-if="type==2">
            <img class="selectedImg" style="width: .3rem;height: .3rem;margin-top: .3rem;margin-right:0.2rem;clear: both" src="@/assets/selected.png"  v-show="!isImg">
            <img class="selectedImg" style="width: .3rem;height: .3rem;margin-top: .3rem;margin-right:0.2rem;clear: both" src="@/assets/uncheck.png" v-show="isImg">
            <div class="bottom-font">勾选代表你同意《注册声明》《版权声明》</div>
          </div>
        </div>

      </van-popup>
      <!--重置密码弹框-->
      <van-popup
        v-model="showModel"
        class="popup-radius"
      >
        <div class="set-box" v-if="showModel">
          <!-- 右上角关闭按钮 -->
          <div class="btn-off flexc" @click="shutDown">X</div>
          <div class="tips">重置密码</div>
          <div class="bind-phone"><input type="text" placeholder="请输入11位手机号" v-model="czphone"></div>
          <div class="code flex">
            <input type="text" placeholder="请输入验证码" v-model="czsendCode">
            <div class="send-code flexc" @click="czgetcode">{{code}}</div>
          </div>
          <div class="bind-pw"><input type="password" placeholder="请输入新密码" v-model="czpassword"></div>
          <div class="ali-c contain">
            <img style="width: 0.3rem;height: 0.3rem" src="@/assets/prompt.png">
            <div class="tip-pw">8-16位数字，字母组合，区分大小写</div>
          </div>

          <div class="bind-pw"><input type="password" placeholder="请确认新密码" v-model="newPassword"></div>
          <div class="confirm flexc" @click="sure">确认</div>
        </div>
      </van-popup>
      <!--注册成功-->
      <van-popup
        v-model="registeredModel"
        class="popup-radius"
      >
        <div class="registered-box" v-if="registeredModel">
          <!-- 右上角关闭按钮 -->
          <div class="btn-off flexc" @click="registeredModelDown">X</div>
          <div class="registered-tip">
            <img class="tip-img"  src="@/assets/register_succeed.png" alt=""/>
            <div class="tip-font">注册成功</div>
          </div>
          <div class="flexc flexv">
            <img class="registered-img" src="@/assets/register_gift_bg.png" alt="">
            <div class="description">会员积分说明</div>
          </div>

          <div class="font-contain">
            <span class="ordinary">每</span>
            <span class="ordinary-bold">500</span>
            <span class="bold">积分</span>
            <span class="ordinary">可抵扣商城商品</span>
            <span class="ordinary-bold">10</span>
            <span class="bold">元</span>
          </div>
          <div class="getIntegral">积分如何获取？</div>
          <div style="margin-top: .3rem">
            <div class="integral">1、【新用户】首次注册登陆网站+88积分</div>
            <div class="integral">2、【签到】每日可登陆网站签到获取一次积分</div>
            <div class="integral">3、【阅读】阅读一篇文章+10积分</div>
            <div class="integral">4、【分享】分享文章到微博,QQ,微信+10积分</div>
          </div>
          <div class="getIntegral">会员权益说明</div>
          <div>1、注册即送积分，享受积分兑换商城折扣的专属权益</div>
          <div>2、会员拥有个人设置、网站留言、阅读积分等专属功能</div>
          <div class="confirm flexc" @click="sign">登录</div>
        </div>
      </van-popup>
    </div>
</template>

<script>
import pubHead from '@/components/head/head';
import list from '@/components/listLoad/listLoad';
import { u_Reg } from '@/config/utils';
import { mapMutations } from 'vuex';
export default {
    name:'Store',
    components: {
        pubHead,
        list
    },
    data () {
        return {
          isImg:true,
          czphone:'',//重置密码手机号
          czsendCode:"",//重置密码验证码
          czpassword:'',//重置新密码
          newPassword:'',//重新输入密码
          againPassword:'',//再次输入密码
            text:false,
            page:0,  //加载页数
            loading: false,
            finished: false,
            storeGoods:[],//商品列表
            sendCode:'',//验证码
          dlphone:'',//手机号
          dlpassword:'',//密码
          zcphone:'',//注册手机号
          zcpassword:'',//注册密码
          zcsendCode:'',//注册验证码
            isShow:false,//弹框默认不显示
            code: '发送验证码', // 获取验证码按钮文字
            isCode: true, // 是否可以重新获取验证码
            isSubmitData: true,//是否提交
          zcSubmitData:true,//防止注册重复提交数据
            host:'http://101yi.cn/data/attachment/item/',//图片路径前缀
           type:1,
           showModel:false,
           czSubmitData:true,
          registeredModel:false,//控制注册成功model显示与隐藏
          preventDuplication:true,
          isbind:localStorage.getItem('isbind')
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
        if (to.name === 'StoreDetail' || to.name === 'PlaceOrder') {
            from.meta.isUseCache = true;
        }
        next();
    },
    methods: {
      ...mapMutations([
        'bindSuccess'
      ]),
      //注册
      enrollment(){
        // 防止重复提交
        if (!this.zcSubmitData) return;
        // 检测数据类型
        if(!u_Reg(this.zcphone, 'notEmpty')){
          this.$Tip('请填写手机号');
          return
        }
        if(!u_Reg(this.zcphone, 'phone')){
          this.$Tip('手机号格式错误');
          return
        }
        if(!u_Reg(this.zcsendCode, 'notEmpty')){
          this.$Tip('请填写验证码');
          return
        }
        if(!u_Reg(this.zcpassword,'notEmpty')){
          this.$Tip('请输入密码！')
          return
        }
        if(!u_Reg(this.againPassword,'notEmpty')){
          this.$Tip('请再次输入密码！')
          return
        }
        if(this.zcpassword !== this.againPassword ){
          this.$Tip('密码不一致！')
          return
        }
        // 提交数据
        this.isSubmitDataisSubmitData = false;
        this.$api.user.registered({
          mobile: this.zcphone,
          password: this.zcpassword,
          qrpassword: this.againPassword,
          m_code:this.zcsendCode
        }).then((res)=>{
          if(res.status ==0){
            this.$Tip(res.msg);
          }else {
            this.zcSubmitData = true;
            this.$Tip('注册成功,请登录');
            this.isShow = false;
            this.type=1;
            this.zcSubmitData = true;
          }
        }).catch(err => {
          this.$Tip(err);
          this.zcphone = '';
          this.zcpassword = '';
          this.againPassword = '';
          this.zcsendCode ='';
          this.zcSubmitData = true;

        })
      },
      // 获取验证码
      zcgetcode () {
        if (!this.isCode) return;
        if (!u_Reg(this.zcphone, 'notEmpty')) {
          this.$Tip('请输入手机号');
          return;
        }
        if (!u_Reg(this.zcphone, 'phone')) {
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
          this.$api.user.getCode({mobile: this.zcphone}).then(res => {
            // this.code_key = res.data.code_key;
            console.log(res.data);
          })
        }
      },
      //重置密码验证码
      czgetcode (){
        if (!this.isCode) return;
        if (!u_Reg(this.czphone, 'notEmpty')) {
          this.$Tip('请输入手机号');
          return;
        }
        if (!u_Reg(this.czphone, 'phone')) {
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
          this.$api.user.getCode({mobile: this.czphone}).then(res => {
            // this.code_key = res.data.code_key;
          })
        }
      },
      isSelected(){
        this.isImg= !this.isImg
      },
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
      //tab切换
      tabChange(e){
        let name =e.target.dataset.name
        switch (name) {
          case 'login1':
            this.type=1
            break;
          case 'register1':
            this.type=2
            break;
        }
      },
      // 关闭弹框
      offPupop () {
        this.isShow = false;
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
                    key:localStorage.getItem('access_token'),
                    id:id
                }).then(res => {
                    this.$Tip(res.msg);
                })
                
            }else {
                this.$Tip('请先登录');
            }
            
        },
      // 立即购买
      buyNow (){
        this.$Tip('请先登录');
      },
      // 绑定手机号-提交数据
      submitData () {
        // 防止重复提交
        if (!this.isSubmitData) return;
        // 检测数据类型
        if(!u_Reg(this.dlphone, 'notEmpty')){
          this.$Tip('请填写手机号');
          return
        }
        if(!u_Reg(this.dlphone, 'phone')){
          this.$Tip('手机号格式错误');
          return
        }
        if(!u_Reg(this.dlpassword,'notEmpty')){
          this.$Tip('请输入密码！')
          return
        }
        // 提交数据
        this.isSubmitDataisSubmitData = false;
        this.$api.user.bindPhone({
          mobile: this.dlphone,
          password: this.dlpassword
        }).then((res)=>{
          if(res.status==0){
            this.$Tip(res.msg);
          }else{
            this.isSubmitData = true;
            this.$Tip('登录成功');
            // 存vuex改变状态
            this.bindSuccess(1);
            localStorage.setItem('isbind',1);
            // 存token
            const access_token = res.data.key;
            localStorage.setItem('access_token', access_token);
            // store.commit('loginSuccess', access_token);
            this.isShow = false;
            this.isSubmitData = true;
            setTimeout(()=>{
              this.$router.push('/user/user');
            },500)
            this.$router.push('/user/user');
          }

        }).catch(err => {
          this.$Tip(err);
          this.dlphone = '';
          this.dlpassword = '';
          this.isSubmitData = true;
          console.log(err)
        })

      },
      //重置密码
      sure (){
        // 防止重复提交
        if (!this.czSubmitData) return;
        // 检测数据类型
        if(!u_Reg(this.czphone, 'notEmpty')){
          this.$Tip('请填写手机号');
          return
        }
        if(!u_Reg(this.czphone, 'phone')){
          this.$Tip('手机号格式错误');
          return
        }
        if(!u_Reg(this.czsendCode,'notEmpty')){
          this.$Tip('请输入验证码！')
          return
        }
        if(!u_Reg(this.czpassword,'notEmpty')){
          this.$Tip('请输入新密码！')
          return
        }
        if(!u_Reg(this.newPassword,'notEmpty')){
          this.$Tip('请确认新密码！')
          return
        }
        if(this.newPassword !== this.czpassword){
          this.$Tip('密码不一致！')
          return
        }
        // 提交数据
        this.isSubmitDataisSubmitData = false;
        this.$api.user.resetPassword({
          mobile: this.czphone,
          password: this.czpassword,
          qrpassword:this.newPassword,
          m_code: this.czsendCode
        }).then((res)=>{
          this.czSubmitData = true;
          this.$Tip('修改密码成功');
          this.showModel = false;
          this.czSubmitData = true;
        }).catch(err => {
          this.$Tip(err);
          this.czphone = '';
          this.czpassword = '';
          this.czsendCode='';
          this.newPassword='';
          this.czSubmitData = true;
        })

      },
      //重置密码验证码
      czgetcode (){
        if (!this.isCode) return;
        if (!u_Reg(this.czphone, 'notEmpty')) {
          this.$Tip('请输入手机号');
          return;
        }
        if (!u_Reg(this.czphone, 'phone')) {
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
          this.$api.user.getCode({mobile: this.czphone}).then(res => {
            // this.code_key = res.data.code_key;
          })
        }
      },
      //关闭弹框
      registeredModelDown() {
        this.registeredModel=false
      },
      //注册成功之后登录
      sign () {
        if (! this.preventDuplication) return;
        this.$api.user.bindPhone({
          mobile: this.zcphone,
          password: this.zcpassword
        }).then((res)=>{
          if(res.status==0){
            this.$Tip(res.msg);
          }else{
            this.preventDuplication = true;
            this.$Tip('登录成功');
            // 存vuex改变状态
            this.bindSuccess(1);
            localStorage.setItem('isbind',1);
            // 存token
            const access_token = res.data.key;
            localStorage.setItem('access_token', access_token);
            // store.commit('loginSuccess', access_token);
            this.registeredModel = false;
            this.preventDuplication = true;
            setTimeout(()=>{
              this.$router.push('/user/user');
            },500)
            this.$router.push('/user/user');
          }

        }).catch(err => {
          this.$Tip(err);
          console.log(err)
        })
      },
      //修改密码
      goChangePw () {
        this.isShow=false
        this.showModel=true
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
        if(!u_Reg(this.dlphone, 'notEmpty')){
          this.$Tip('请填写手机号');
          return
        }
        if(!u_Reg(this.dlphone, 'phone')){
          this.$Tip('手机号格式错误');
          return
        }
        if(!u_Reg(this.dlpassword,'notEmpty')){
          this.$Tip('请输入密码！')
          return
        }
        // 提交数据
        this.isSubmitDataisSubmitData = false;
        this.$api.user.bindPhone({
          mobile: this.dlphone,
          password: this.dlpassword
        }).then((res)=>{
          if(res.status==0){
            this.$Tip(res.msg);
          }else{
            this.isSubmitData = true;
            this.$Tip('登录成功');
            // 存vuex改变状态
            this.bindSuccess(1);
            localStorage.setItem('isbind',1);
            // 存token
            const access_token = res.data.key;
            localStorage.setItem('access_token', access_token);
            // store.commit('loginSuccess', access_token);
            this.isShow = false;
            this.isSubmitData = true;
            setTimeout(()=>{
              this.$router.push('/user/user');
            },500)
            this.$router.push('/user/user');
          }

        }).catch(err => {
          this.$Tip(err);
          this.dlphone = '';
          this.dlpassword = '';
          this.isSubmitData = true;
          console.log(err)
        })

      },
      //关闭重置密码弹框
      shutDown(){
        this.showModel=false
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
                    background-color: #277077;
                    border-radius: .1rem;
                    &.go-buy {
                        background-color: @main-cor;
                    }
                }
            }
            .goods-msg {
                line-height: .46rem;
                color: #3f3f3f;
                text-align: center;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
        }
    }
// 签到弹框
.sign-box {
  position: relative;
  overflow: hidden;
  width: 8.56rem;
  height: 11rem;
  margin: 0 auto;
  border-radius: .1rem;
  background-color: #fff;
  padding: .8rem .8rem;
  // 关闭按钮
  .btn-off {
    position: absolute;
    top: 0;
    right: 0;
    width: 1rem;
    height: 1rem;
    font-size: .6rem;
    color: #b1b1b1;
  }
  /*.top {*/
  /*padding: .2rem;*/
  /*}*/
  .top-login {
  }
  .on{
    color: @main-cor;
    border-bottom: 2px solid  @main-cor;
    width: 1.5rem;
    text-align: center;
  }
  .top-register {
    margin-left: 2.1rem;
  }
  // 提示文字
  .tips {
    text-align: center;
  }
  // 绑定手机
  .bind-phone {
    width: 100%;
    height: 1rem;
    border: 1px solid #b1b1b1;
    border-radius: .1rem;
    padding: 0 .3rem;
    margin-top: 1.45rem;
    background:url(~@/assets/account.png) no-repeat .3rem ;
    .bg-size(.39rem,.46rem);
    input {
      width: 6rem;
      height: .94rem;
      margin-left: .5rem;
    }
  }
  .bind-pw {
    width: 100%;
    height: 1rem;
    border: 1px solid #b1b1b1;
    border-radius: .1rem;
    padding: 0 .3rem;
    margin-top: .15rem;
    background:url(~@/assets/password.png) no-repeat .3rem ;
    .bg-size(.39rem,.46rem);
    input {
      width: 6rem;
      height: .94rem;
      margin-left: .5rem;
      border: none;
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
      margin-right: .4rem;
    }
    .send-code {
      width: 3rem;
      height: .96rem;
      border: 1px solid #18bd1c;
      border-radius: .1rem;
      color: #18bd1c;
    }
  }
  .confirm {
    width: 100%;
    height: 1rem;
    color: #fff;
    background-color: @main-cor;
    border-radius: .04rem;
    margin-top: .76rem;
  }
  .pw {
    margin-left: 5.3rem;
    margin-top: .4rem;
    color: #818080;
  }
  .bottom-font{
    margin-top: 0.3rem;
    clear: both;
    color: #818080;
  }
}
// 重置密码弹框
.set-box {
  position: relative;
  overflow: hidden;
  width: 8.56rem;
  height: 11rem;
  margin: 0 auto;
  border-radius: .1rem;
  background-color: #fff;
  padding: .8rem .8rem;
  // 关闭按钮
  .btn-off {
    position: absolute;
    top: 0;
    right: 0;
    width: 1rem;
    height: 1rem;
    font-size:.6rem;
    color: #b1b1b1;
  }
  /*.top {*/
  /*padding: .2rem;*/
  /*}*/
  .top-login {
    color: #929292;
  }
  .on{
    color: @main-cor;
    border-bottom: 2px solid  @main-cor;
    width: 1.5rem;
    text-align: center;
  }
  .top-register {
    color: #929292;
    margin-left: 2.1rem;
  }
  // 提示文字
  .tips {
    text-align: center;
  }
  .selectedImg {

  }
  // 绑定手机
  .bind-phone {
    width: 100%;
    height: 1rem;
    border: 1px solid #b1b1b1;
    border-radius: .1rem;
    padding: 0 .3rem;
    margin-top: 0.88rem;
    background:url(~@/assets/phone.png) no-repeat .3rem ;
    .bg-size(.39rem,.46rem);
    input {
      width: 6rem;
      height: .94rem;
      margin-left: .5rem;
    }
  }
  .contain{
    padding: .1rem .1rem .1rem .3rem;
  }
  .bind-pw {
    width: 100%;
    height: 1rem;
    border: 1px solid #b1b1b1;
    border-radius: .1rem;
    padding: 0 .3rem;
    margin-top: .15rem;
    background:url(~@/assets/password.png) no-repeat .3rem ;
    .bg-size(.39rem,.46rem);
    input {
      width: 6rem;
      height: .94rem;
      margin-left: .5rem;
      border: none;
    }
  }
  .tip-pw{
    color: #b7b7b7;
    margin-left: .1rem;
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
      margin-right: .4rem;
    }
    .send-code {
      width: 3rem;
      height: .96rem;
      border: 1px solid #18bd1c;
      border-radius: .1rem;
      color: #18bd1c;
    }
  }
  .confirm {
    width: 100%;
    height: 1rem;
    color: #fff;
    background-color: @main-cor;
    border-radius: .04rem;
    margin-top: .76rem;
  }
  .pw {
    float: right;
    margin-top: .28rem;
  }
  .bottom-font{
    clear: both;
    margin-left: .3rem;
  }
}
//注册成功弹框
.registered-box {
  position: relative;
  overflow: hidden;
  width: 8.56rem;
  height: 13rem;
  margin: 0 auto;
  border-radius: .1rem;
  background-color: #fff;
  padding: .8rem .8rem ;
  // 关闭按钮
  .btn-off {
    position: absolute;
    top: 0;
    right: 0;
    width: 1rem;
    height: 1rem;
    font-size: .6rem;
    color: #b1b1b1;
  }
  .registered-tip{
    border: 2px solid #dd1260;
    width: 6rem;
    height: 0.66rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: .3rem;
    .tip-img {
      width: .41rem;
      height: .41rem;
    }
    .tip-font{
      margin-left: .3rem;
      color: #dd1260;
    }
  }
  .registered-img{
    width: 5.7rem;
    height: 2rem;
    margin-top: .5rem;
    margin-right: .4rem;
  }
  .description{
    color: #dd1260;
    margin-top: .4rem;
    font-weight: bold;
  }
  .font-contain{
    margin-top: .3rem;
    margin-right: .3rem;
    .ordinary{
      color: #353434;
      font-weight: bold;
    }
    .ordinary-bold{
      color: #dd1260;
      font-weight: bold;
    }
    .bold{
      color: #dd1260;
      color: #dd1260;
    }
  }
  .getIntegral{
    color: #dd1260;
    font-weight: bold;
    margin-right: 3.3rem;
    margin-top: .3rem;
  }
  .integral{
  }
  .confirm {
    width: 100%;
    height: 1rem;
    color: #fff;
    background-color: @main-cor;
    border-radius: .04rem;
    margin-top: .76rem;
  }
}
</style>

