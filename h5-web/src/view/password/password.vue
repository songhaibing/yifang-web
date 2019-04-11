<template>
  <div class="login">
    <div class="login_h">
      <router-link class="iconfont icon-guanbi" tag="span" to="/login"></router-link>
    </div>
    <div class="login_b">
      <div class="login_b_title" >忘记密码</div>
      <div class="login_b_form">
          <div class="login_label">手机号</div>
          <input class="login_input" v-model="phoneNumber">
        <div>
          <div class="login_label">验证码</div>
          <div class="auth_code">
            <input class="login_input" maxlength="6" v-model="authCode">
            <div class="get_auth" @click="getCode">{{code}}</div>
          </div>
        </div>
        <div>
          <div class="login_label1">密码</div>
          <input class="login_input1" type="password" v-model="password">
        </div>
      </div>
      <div class="login_submit" :class="{canLogin:isLogin}" @click="goLogin">登录</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        isCode:true,
        phoneNumber: "",
        password: "",
        authCode: "",
        code:'获取验证码',
      };
    },
    computed: {
      isLogin: function () {
        return this.phoneNumber.length===11&&this.authCode!==''&&this.password!==''
      }
    },
    methods:{
      getCode(){
        if (!this.isCode) return;
        const u_Reg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(this.phoneNumber===''){
          this.$Tip('请填写手机号')
          return
        }
        if(!u_Reg.test(this.phoneNumber)){
          this.$Tip('手机号格式错误')
          return
        }
        if(this.code === '获取验证码'){
          let time = 60;
          this.isCode = false;
          this.code = time + 's后重试';
          const timer = setInterval(() => {
            time--;
            this.code = time + 's后重试';
            if(time < 0){
              this.code = '获取验证码';
              clearInterval(timer);
            }
          }, 1000)
          this.isCode = true;
          this.$once('hook:beforeDestroy',() => {
            clearInterval(timer);
          });
          // 获取验证码
          this.$HTTP.get(this.HOST + this.$API.getCode,{ type: 2, phone: this.phoneNumber },function (res) {
            console.log(res)
          })
        }
      },
      //登录
      goLogin(){
        if(this.isLogin){
          const params={
            captcha: this.authCode,
            phone: this.phoneNumber,
            password:this.password,
            client:'wap'
          }
          this.$HTTP.post(this.HOST + this.$API.changePassword,params,function (res) {
            console.log(res)
          })
        }
      }
    },
    mounted() {}
  };
</script>

<style lang="less" scoped>
  .login {
    padding: 0.5rem;
    color: #333333;
    overflow-y: hidden;
    .login_h {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon-guanbi {
        font-size: 0.22rem;
      }
      span:last-child {
        font-size: 0.3rem;
      }
    }
    .login_b {
      margin-top: 0.9rem;
      padding: 0.3rem;
      position: relative;
      .login_b_title {
        font-size: 0.52rem;
      }
      .login_b_form {
        margin-top: 0.98rem;
        .login_label {
          font-size: 0.36rem;
          margin-bottom: 0.41rem;
        }
        .login_input {
          margin-bottom: 0.31rem;
          width: 5.76rem;
          height: 0.84rem;
          border: 0.02rem solid rgba(220, 49, 52, 1);
          border-radius: 0.42rem;
          padding: 0 0.42rem;
        }
        .auth_code {
          position: relative;
          .get_auth {
            position: absolute;
            right: 0;
            top: 0;
            width: 2rem;
            height: 0.84rem;
            background: rgba(220, 49, 52, 1);
            border-radius: 0.42rem;
            font-size: 0.28rem;
            background: rgba(220, 49, 52, 1);
            color: rgba(255, 255, 255, 1);
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .login_submit {
        margin-top: 2.0rem;
        width: 4.15rem;
        height: 0.84rem;
        background: rgba(220, 49, 52, 1);
        border: 0.01rem solid rgba(255, 63, 83, 1);
        border-radius: 0.42rem;
        opacity: 0.6;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.38rem;
        color: #fff;
        margin-left: 50%;
        transform: translateX(-50%);
      }
      .canLogin{
        opacity: 1;
      }
      .login_tip {
        font-size: 0.24rem;
        color: rgba(178, 178, 178, 1);
        text-align: center;
        margin-top: 0.47rem;
      }
    }
    .login_bottom_tip {
      font-size: 0.2rem;
      color: #b2b2b2;
      position: fixed;
      bottom: 0.57rem;
      text-align: center;
      width: 100%;
      margin-left: -0.5rem;
      span {
        text-decoration: underline;
      }
    }
    .login_label1 {
      font-size: 0.36rem;
      margin-bottom: 0.29rem;
    }
    .login_input1 {
      width: 5.76rem;
      height: 0.84rem;
      border: 0.02rem solid rgba(220, 49, 52, 1);
      border-radius: 0.42rem;
      padding: 0 0.42rem;
    }
  }
</style>
