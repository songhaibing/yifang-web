<template>
    <div class="integral">
        <!-- 头部 -->
        <pub-head title="积分" :text="text">
        </pub-head>
        
        <div class="integral-head">
            <div class="jus-b">
                <div class="num flex1">当前积分：{{integralNum}}</div>
                <div class="integral-tab flex1 flex">
                    <div class="tab flex1" v-for="(text,index) in integralText" :key="index" :class="{on:nowindex == text.type}" @click="tabchange(index,text.type)">{{text.title}}</div>
                </div>
            </div>
            <div class="src" @click="gain">积分获取途径</div>
        </div>
        
        <div class="address-foot"></div>
        <ul class="list">
            <list
                v-model="loading"
                :finished="finished"
                :immediate-check="false"
                finished-color="#777"
                finished-text='已经到底了哦'
                @load="onLoad"
            >
            <!-- 立即兑换 -->
            <li class="flex" v-for="(item,index) in list" :key="index">
                <div class="img"><img :src="item.img" alt="" class="fill"></div>
                <div class="flex1 jus-b ali-c">
                    <div class="text-info">
                        <div class="title">{{item.price}}{{item.title}}</div>
                        <div class="state">下单自动减免</div>
                        <div class="date">兑换所需积分：{{item.integral}}</div>
                    </div>
                    <div @click="goExchange(item.id,item.integral)" v-if="nowindex == 1">
                      <div class="btn flexc" v-if="integralNum-0 >= item.integral-0">立即兑换</div>
                      <div class="btn flexc off" v-else>积分不足</div>
                    </div>
                    <div v-if="nowindex == 2 || nowindex == 3">
                        <div class="btn flexc" v-if="item.status == 0" @click="useImmediately(item.price)">立即使用</div>
                        <div class="btn flexc off" v-if="item.status == 1">已使用</div>
                        <div class="btn flexc off" v-if="item.status == 2">已过期</div>
                    </div>
                </div>
            </li>
            </list>
        </ul>
        <!-- 积分获取路径弹框 -->
        <van-popup 
            v-model="isShow"
            class="popup-radius"
        >
            
            <div class="integral-box">
                <!-- 右上角关闭按钮 -->
                <div class="btn-off flexc" @click="offSign">X</div>
                <div class="img"><img src="@/assets/integral-state.jpg" alt="" class="fill"></div>
                <h2>每<span><b>500M</b>积分</span>可抵扣商城商品<span><b>10</b>元</span></h2>
                <h3>积分如何获取？</h3>
                <p>1、【新用户】首次注册登陆网站+88积分</p>
                <p>2、【签到】每日可登陆网站签到获取一次积分</p>
                <p>3、【阅读】阅读一篇文章+10积分</p>
                <p>4、【分享】分享文章到微博、QQ、微信+10积分</p>
                <h3>会员权益说明</h3>
                <p>1、注册即送积分，享受积分兑换商城折扣的专属权益</p>
                <p>2、会员拥有个人设置、网站留言、阅读积分等专属功能</p>
            </div>
           
        </van-popup>
    </div>
</template>

<script>
import pubHead from '@/components/head/head.vue';
import list from '@/components/listLoad/listLoad';
    export default {
        name:'Integral',
        components: {
            pubHead,
            list
        },
        data () {
            return {
                isShow:false,//弹框 默认不显示
                text:true,//头部文字显示
                integralText:[
                    {title:'兑换中心',type:1},
                    {title:'已兑换',type:2},
                    {title:'兑换记录',type:3}
                ],
                nowindex:0,
                page:0,  //加载页数
                loading: false,
                finished: false,
                isExchange:true,
                list:[],//订单列表
                integralNum:'',//积分数量
                host:'http://101yi.cn/data/attachment/item/',//图片路径前缀
              num:''
            }
        },
        created () {
            this.onLoad();
        },
       
        methods: {
            onLoad () {
                this.loading = true;
                this.page ++;
                this.nowindex = this.$route.params.type;
                this.getData(this.nowindex);

            },
             // 获取数据函数
            getData (type) {
                this.$api.user.Integral({        
                    page: this.page,
                    size: 6,
                    key:localStorage.getItem('access_token'),
                    type:type
                }).then(res=> {
                    this.integralNum = res.data.member_integral;
                    this.loading = false;
                    // 更新列表数据
                    this.list = [...this.list, ...res.data.yhq];
                    // 判断返回的数据是否为空
                    this.page == 1 && (this.list.length == 0);
                    this.finished = res.data.yhq.length < 6;
                }) 
            },
            // 切换tab栏
            tabchange(index,tab) {
                this.nowindex = tab;
                this.list = []; // 清空原有数据
                this.page = 1;
                this.loading = true;
                // 分类的切换
                this.$router.replace('/integral/'+tab);
                this.getData(tab);
            },
            // 立即兑换
            goExchange (id,num) {
                let diff = this.integralNum-0 - (num-0);
                if (diff >= 0) {
                    this.$api.user.exchange({
                        key:localStorage.getItem('access_token'),
                        id:id
                    }).then(res => {
                        this.$Tip('兑换成功');
                        this.integralNum = diff;
                    })
                    
                }else {
                    this.$Tip('积分不足，无法兑换');
                }
                
            },
          useImmediately (e){
              console.log(parseInt(e))
              this.num = parseInt(e)
              this.$router.push("/store/store")
              localStorage.setItem("price", this.num)
          },
            // 点击签到弹框
            gain () {
                this.isShow = true;
            },
             // 关闭弹框
            offSign () {
                this.isShow = false;
            },
        }
    }
</script>

<style lang="less" scoped>
@import url('../../style/mixin');
   .integral-head {
       position: relative;
       width: 100%;
       height: 2.5rem;
       padding: .3rem;
        .bg-size(.5rem,.7rem);
        font-size: .36rem;
        .num {
            height: .6rem;
            font-size: .42rem;
        }
        .integral-tab {
            height: .6rem;
            .tab {
                font-size: .32rem;
                color: #515151;
                text-align: center;
                &.on {
                    color: @main-cor;
                }
            }
        }
        .src {
            font-size: .3rem;
            color: #9d9d9d;
            width: 2.4rem;
            margin-top: .3rem;
            background: url(~@/assets/integral-ico.png) no-repeat right center;
            .bg-size(.34rem,.34rem);
        }
    }
    .address-foot {
       height: .24rem;
       background-image: url(~@/assets/place-ico.jpg);
       .bg-size(10rem,.24rem);
   }
//    积分列表
    .list {
        li {
            padding: .42rem .34rem;
            background-color: @pub-bg;
            margin-bottom: .04rem;
            .img {
                width: 3.36rem;
                height: 2.16rem;
            }
            .flex1 {
                margin-left: .4rem;
                .text-info {
                    .title {
                        font-size: .4rem;
                        color: #1d1d1d;
                        margin-top: .28rem;
                    }
                    .state {
                        font-size: .32rem;
                        color: #515151;
                        margin-top: .1rem;
                    }
                    .date {
                        font-size: .32rem;
                        color: @main-cor;
                        margin-top: .3rem;
                        &.off {
                            color: #898989;
                        }
                    }
                }
                .btn {
                    width: 1.8rem;
                    height: .8rem;
                    font-size: .32rem;
                    color: #fff;
                    background-color: @main-cor;
                    border-radius: .8rem;
                    &.off {
                        background-color: #898989;
                    }
                }
            }
        }
    }
    // 签到弹框
     .integral-box {
        position: relative;
        overflow: hidden;
        width: 8.3rem;
        height: 12rem;
        margin: 0 auto;
        padding: 1.33rem .8rem 0 .8rem;
        // 关闭按钮
        .btn-off {
            position: absolute;
            top: 0;
            right: 0;
            width: .8rem;
            height: .8rem;
            color: #b0b0b0;
        }
       .img {
           width: 6.74rem;
           height: 1.7rem;
           margin: 0 auto;
       }
       h2 {
           font-size: .32rem;
           color: #353434;
           margin-top: 1.2rem;
           font-weight: bold;
           span {
               color: @main-cor;
               b {
                   font-size: .5rem;
               }
           }
       }
       h3 {
           font-size: .32rem;
           font-weight: bold;
           color: @main-cor;
           margin: .3rem 0;
       }
       p {
           font-size: .28rem;
           color: #333;
           line-height: .4rem;
       }
     }
     
</style>
