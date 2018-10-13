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
                <!--<div class="tips">需要绑定您的手机以便提高账户的安全性</div>-->
              <div class="top flexc" @click="tabChange">
                <div class="top-login" data-name="login" :class="{on:type==1}">登录</div>
                <div class="top-register" data-name="register" :class="{on:type==2}">注册</div>
              </div>
              <div v-if="type==1">
                <div class="bind-phone"><input type="text" placeholder="请输入账号/手机号" v-model="dlphone"></div>
                <div class="bind-pw"><input  type="password" placeholder="请输入密码" v-model="dlpassword"></div>
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
              <div @click="isSelected " class="flexc" >
                <img class="selectedImg" style="width: .3rem;height: .3rem;margin-top: .3rem;margin-right:0.2rem;clear: both" src="@/assets/selected.png"  v-show="isImg">
                <img class="selectedImg" style="width: .3rem;height: .3rem;margin-top: .3rem;margin-right:0.2rem;clear: both" src="@/assets/uncheck.png" v-show="!isImg">
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
import { u_Reg } from '@/config/utils';
import { mapMutations } from 'vuex';
import { Toast } from 'vant';
import store from '@/store/index'
export default {
    name:'Index',
    data () {
        return {
          isImg:true,
          czphone:'',//重置密码手机号
          czsendCode:"",//重置密码验证码
          czpassword:'',//重置新密码
          newPassword:'',//重新输入密码
            isShow:false,
            article:[],//文章数据
            flink:{},//友情链接
            store:{},//商城
            about:{},//关于我们
            sendCode:'',//验证码
            dlphone:'',//手机号
            dlpassword:'',//密码
            zcphone:'',//注册手机号
           zcpassword:'',//注册密码
           zcsendCode:'',//注册验证码
           againPassword:'',//再次输入密码
            code: '发送验证码', // 获取验证码按钮文字
            isCode: true, // 是否可以重新获取验证码
            isSubmitData: true,//是否提交
           zcSubmitData:true,//防止注册重复提交数据
            host:'http://101yi.cn/',//域名前缀
            hosttwo:'http://101yi.cn/data/attachment/guang/',//域名前缀
            type:1,
            showModel:false,
           czSubmitData:true,
           preventDuplication:true,
           registeredModel:false//控制注册成功model显示与隐藏
        }
    },
  // beforeRouteLeave (to, from, next) {
  //   // 如果前往商品详情或者店铺详情则缓存数据
  //   if (to.name === 'articleDetail') {
  //     from.meta.isUseCache = true;
  //   }
  //   next();
  // },
    created () {
      Toast.loading({
        forbidClick: true,
        duration: 15000,
        message: '加载中...'
      });
      this.getIndex()
    },
    methods: {
        ...mapMutations([
            'bindSuccess'
		]),
      //加载首页数据
      getIndex() {
        this.$api.user.index().then(res => {
          this.article = res.data.article;
          this.flink = res.data.flink;
          this.store = res.data.item;
          this.about = res.data.about;
        })
       setTimeout(()=>{
         this.$toast.clear();
        },100)
      },
      //注册成功之后登录
      sign () {
        if (! this.preventDuplication) return;
        this.$api.user.bindPhone({
          mobile: this.zcphone,
          password: this.zcpassword,
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
      isSelected(){
          this.isImg= !this.isImg
      },
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
      //关闭弹框
      registeredModelDown() {
          this.registeredModel=false
      },
      //tab切换
      tabChange(e){
          let name =e.target.dataset.name
        switch (name) {
          case 'login':
            this.type=1
                break;
          case 'register':
            this.type=2
                break;
        }
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
            setTimeout(()=>{
              this.registeredModel=true
            },1000)
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
                password: this.dlpassword,
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
      //修改密码
      goChangePw () {
         this.isShow=false
          this.showModel=true
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
            width: .8rem;
            height: .8rem;
            font-size: .5rem;
            color: #b1b1b1;
        }
       /*.top {*/
         /*padding: .2rem;*/
       /*}*/
       .top-login {
         font-size: .4rem;
       }
       .on{
         color: @main-cor;
         border-bottom: 2px solid  @main-cor;
         width: 1.5rem;
         text-align: center;
       }
       .top-register {
         font-size: .4rem;
         margin-left: 2.1rem;
       }
        // 提示文字
        .tips {
            font-size: 0.4rem;
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
            .bg-size(.28rem,.46rem);
            input {
                width: 6rem;
                height: .94rem;
                margin-left: .5rem;
                font-size: .36rem;
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
         .bg-size(.28rem,.46rem);
         input {
           width: 6rem;
           height: .94rem;
           margin-left: .5rem;
           font-size: .36rem;
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
            margin-top: .76rem;
        }
       .pw {
         margin-left: 5.5rem;
         margin-top: .28rem;
       }
       .bottom-font{
         margin-top: 0.3rem;
         clear: both;
         font-size:0.19rem ;
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
    width: .8rem;
    height: .8rem;
    font-size: .5rem;
    color: #b1b1b1;
  }
  /*.top {*/
  /*padding: .2rem;*/
  /*}*/
  .top-login {
    color: #929292;
    font-size: .265rem;
  }
  .on{
    color: @main-cor;
    border-bottom: 2px solid  @main-cor;
    width: 1.5rem;
    text-align: center;
  }
  .top-register {
    color: #929292;
    font-size: .265rem;
    margin-left: 2.1rem;
  }
  // 提示文字
  .tips {
    font-size: 0.4rem;
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
    .bg-size(.28rem,.46rem);
    input {
      width: 6rem;
      height: .94rem;
      margin-left: .5rem;
      font-size: .36rem;
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
    .bg-size(.28rem,.46rem);
    input {
      width: 6rem;
      height: .94rem;
      margin-left: .5rem;
      font-size: .36rem;
      border: none;
    }
  }
  .tip-pw{
    font-size: .2rem;
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
      width: .8rem;
      height: .8rem;
      font-size: .5rem;
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
        font-size: .23rem;
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
      font-size:.31rem;
      color: #dd1260;
      margin-top: .4rem;
    font-weight: bold;
    }
    .font-contain{
      margin-top: .3rem;
      margin-right: .3rem;
      .ordinary{
        font-size: .27rem;
        color: #353434;
        font-weight: bold;
      }
      .ordinary-bold{
        font-size: .42rem;
        color: #dd1260;
        font-weight: bold;
      }
      .bold{
        font-size: .27rem;
        color: #dd1260;
        color: #dd1260;
      }
    }
   .getIntegral{
     color: #dd1260;
     font-size: .24rem;
     font-weight: bold;
     margin-right: 3.3rem;
     margin-top: .3rem;
   }
    .integral{
      font-size: .18rem;
    }
     .confirm {
      width: 100%;
      height: 1rem;
      color: #fff;
      background-color: @main-cor;
      font-size: .4rem;
      border-radius: .04rem;
      margin-top: .76rem;
    }
  }
</style>

