<template>
    <div class="feedback">
        <!-- 头部 -->
        <pub-head title="意见反馈" :text="text">
        </pub-head>
        <textarea name="" id="" cols="30" rows="10" v-model="feeds" @input="limtLength" maxlength="200" class="feed-back van-hairline"></textarea>
      <div class="mobil ali-c">
        <span class="num">手机号：</span>
        <input type="text" class="value"  v-model="mobile">
      </div>
        <div class="btn jus-e">
            <div class="feed-sub flexc" @click="submitBack">提交</div>
        </div>
    </div>
</template>

<script>
import pubHead from '@/components/head/head.vue';
import { u_Reg } from '@/config/utils';
    export default {
        name:'Feedback',
        components: {
            pubHead
        },
        data () {
            return {
               feeds:'',//反馈内容
               text:true,//头部文字显示
               mobile:'',//手机号
            }
        },
      methods: {
          //限制文本域只能输入200字
          limtLength(){
            if(this.feeds.length == 200){
              this.$Tip('只能输入200字');
            }
          },
          submitBack () {
               /**
                 * 检测提交的数据
                */
                if (!u_Reg(this.feeds, 'notEmpty')) {
                    this.$Tip('请填写反馈内容');
                    return;
                }
                if (!u_Reg(this.mobile, 'notEmpty')) {
                    this.$Tip('请填写手机号');
                    return;
                }
                if (!u_Reg(this.mobile, 'phone')) {
                    this.$Tip('手机号格式错误');
                    return;
                }
      
               this.$api.user.backFeed({
                   key:localStorage.getItem('access_token'),
                   content:this.feeds,
                   mobile:this.mobile
               }).then(res => {
                   this.$Tip(res.message);
                   this.feeds = '';
                   this.mobile = '';
               }).catch(err => {
                   this.$Tip('提交失败，请刷新重试');
               })
           }
        }
    }
</script>

<style lang="less" scoped>
@import url('../../style/mixin');
   .feedback {
       min-height: 100vh;
       .feed-back {
           display: block;
           width: 9rem;
           height: 8.7rem;
           border-radius: .1rem;
           margin: .72rem auto;
           border: 1px solid #868686;
           padding: .3rem;
           line-height: .48rem;
           // 隐藏右下角三角图标
           resize:none; 
       }
       .btn {
           width: 8.1rem;
           height:.7rem;
           margin: .4rem auto;
       }
       .feed-sub {
           width: 2.16rem;
           height: .7rem;
           background-color: #20223b;
           color: #fff;
           border-radius: .14rem;
           
       }
     .mobil{
       height: 1rem;
       margin-left: .5rem;
       margin-top: .3rem;
       .num{
         color: #333;
       }
       .value{
         width: 7.2rem;
         height: 100%;
         margin-left: .3rem;
         padding-left: .2rem;
         border-radius: .1rem;
         border: 1px solid #999;
       }
     }


        //  手机号
     /*.mobil {*/
        /*width: 6rem;*/
        /*height: .7rem;*/
        /*margin-left: 1rem;*/
        /*margin-top: .3rem;*/
        /*.attr {*/
            /*width: 3rem;*/
            /* : .38rem;*/
            /*color: #333;*/
        /*}*/
        /*.value {*/
            /*display: block;*/
            /*!*margin-left: .3rem;*!*/
            /*height: 100%;*/
            /*border-radius: .1rem;*/
            /*border: 1px solid #999;*/
            /*!*padding-left: .2rem;*!*/
            /* : .34rem;*/
        /*}*/
     /*}*/
   }
</style>
