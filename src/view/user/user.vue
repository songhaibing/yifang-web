<template>
    <div class="user">
        <section class="user-infor">
            <div class="flex jus-b set-ico">
                <router-link to="/user/set" class="seting infor-ico"></router-link>
                <router-link to="/message" class="message infor-ico" :class="{unread:info.mes == 1}"></router-link>
            </div>
            <!-- 用户头像 -->
            <div class="user-card">
                <img src="@/assets/头像.jpg" alt="" class="fill">
            </div>
            <!-- 用户名 -->
            <router-link to="/user/myInfor" class="user-name flex jus-c">
                <p>{{info.nickname}}</p>
                <img src="@/assets/mycenter-ico6.png" alt="">
            </router-link>
            <!-- 签到 -->
            <div class="sign">
                <div class="integral">
                    积分：{{info.integral}}
                </div>
                <div class="sign-btn flexc" @click="goSign" v-if="info.qd == 2">签到</div>
                <div class="sign-btn flexc" @click="goSign" v-if="info.qd == 1">已签到</div>
            </div>
        </section>
        <!-- 我的信息 -->
        <section class="my-infor">
            <div class="flex">
                <router-link to="/collection/collection/1" class="flex1">
                    <div class="ico collection"></div>
                    <p>收藏</p>
                </router-link>
                <router-link to="/shopCar" class="flex1">
                   <div class="ico car"></div>
                   <p>购物车</p>
                </router-link>
                <router-link to="/order/order/1" class="flex1">
                    <div class="ico order"></div>
                    <p>订单</p>
                </router-link>
                <router-link to="/address/address" class="flex1">
                    <div class="ico adress"></div>
                    <p>地址</p>
                </router-link>
                <router-link to="/integral/1" class="flex1">
                    <div class="ico integral"></div>
                    <p>积分</p>
                </router-link>
            </div>
        </section>
     <!-- 签到弹框 -->
        <van-popup 
            v-model="isShow"
            class="popup-radius"
        >
            
            <div class="sign-box" v-if="isShow">
                <!-- 右上角关闭按钮 -->
                <div class="btn-off" @click="offSign"></div>
                <!-- 周一到周四 -->
                <div class="flex sign-date">
                    <div class="flex2 one">+{{list[0].sign}}积分 <div class="sign-num flexc" :class="{on:list[0].list== 1}">1</div></div>
                    <div class="flex2 two">+{{list[1].sign}}积分<div class="sign-num flexc" :class="{on:list[1].list== 1}">2</div></div>
                    <div class="flex2 three">+{{list[2].sign}}积分<div class="sign-num flexc" :class="{on:list[2].list== 1}">3</div></div>
                    <div class="flex2 fore">+{{list[3].sign}}积分<div class="sign-num flexc" :class="{on:list[3].list== 1}">4</div></div>
                </div>
                 <!-- 周五到周日 -->
                <div class="flex sign-data2">
                    <div class="seven">+{{list[6].sign}}积分<div class="sign-num flexc" :class="{on:list[6].list== 1}">7</div></div>
                    <div class="six">+{{list[5].sign}}积分<div class="sign-num flexc" :class="{on:list[5].list== 1}">6</div></div>
                    <div class="five">+{{list[4].sign}}积分<div class="sign-num flexc" :class="{on:list[4].list== 1}">5</div></div>
                </div>

                <!-- 签到按钮 -->
                <div class="sign-btn flexc" :class="{'sign-finish':signInfo.da == 1}" @click="sign">{{signText}}</div>
            </div>
           
        </van-popup> 
        <!-- 空白 -->
        <section class="null-write"></section>
        <footer class="foot flexc">
            <router-link to="/" class="go-index flexc">首页</router-link>
        </footer>
    </div>
</template>

<script>
import user from '@/api/model/user'
import state from '@/store'
export default {
    name:'User',
    data () {
        return {
            isShow:false,
            info: {}, // 用户信息
            signDate:1,//签到天数
            isSign:1,//是否签到   1为已签到
            signText:'签到',//签到文字
            host:'http://101yi.cn/data/attachment/useravatar/',//图片路径前缀
            signInfo:{},//签到详情
            list:[],//签到周期
        }
    },
    beforeRouteEnter (to, from, next) {
        user.userCenter({
            key:localStorage.getItem('access_token'),
        }).then(res => {
            next(vm => {
                vm.info = res.data.data;
            })
        })
    },
    methods: {
        // 点击签到弹框
        goSign () {
            
            // 加载签到信息
            this.$api.user.signInfo({
                key: localStorage.getItem('access_token'),
            }).then(res => {
                this.isShow = true;
                this.signInfo = res.data;
                this.list = res.data.list;
                this.signInfo.da == 1 ? this.signText = '已签到' : this.signText = '签到';
            })
        },
        // 关闭弹框
        offSign () {
            this.isShow = false;
        },
        // 签到
        sign () {
            // 签到
            if (this.signInfo.da == 2) {
                this.$Loading('签到中...');
                this.$api.user.signIng({
                    key:localStorage.getItem('access_token'),
                }).then(res => {
                    this.$Tip('签到成功');
                    this.goSign();
                    this.signText = '已签到';
                    this.$toast.clear();
                    this.info.qd = '1';
                })
                
            }else {
                //不可签到
                this.$Tip('您已经签到过了哦');
            }
        }
        /*  备注   点击签到未更新积分数据，解决思路，因数据展示天数是判断当前那条数据是否有个list字段，
        故循环出数据判断出几条数据带有list字段得到一个数字，在找到这个人数字减去1的一个索引数组下对应的积分数，与之相加， */
    }
}

</script>

<style lang="less" scoped>
@import url('../../style/mixin');
.user {
    background-color: @pub-bg;
}
    .user-infor {
        overflow: hidden;
        width: 100%;
        height: 9rem;
        background: url(~@/assets/mycenter-bg-top.jpg) no-repeat;
        .bg-size(auto,9rem);
        .set-ico {
            top: .3rem;
            padding: .24rem .4rem;
            // 设置图标
            .seting {
                width: .6rem;
                height: .6rem;
                background: url(~@/assets/mycenter-ico-set.png) no-repeat;
                .bg-size(.6rem,.6rem);
            }
            // 邮件图标
            .message {
                position: relative;
                width: .56rem;
                height: .46rem;
                background: url(~@/assets/mycenter-ico-message.png) no-repeat;
                .bg-size(.56rem,.46rem);
                &.unread {
                   &::before {
                    position: absolute;
                    content:'';
                    left: -.04rem;
                    top: -.06rem;
                    width: .2rem;
                    height: .2rem;
                    background-color: @main-cor;
                    .border-radius(.2rem);
                   }
                }
            }
        }
         // 用户头像
        .user-card {
            position: absolute;
            overflow: hidden;
            width: 1.8rem;
            height: 1.8rem;
            .border-radius(1.8rem);
            background-color: #FFF;
            top: 1.06rem;
            left: 50%;
            margin-left: -0.9rem;
        }
        .user-name {
            position: relative;
            margin: 2rem auto 0 auto;
           p {
                font-size: .34rem;
                text-align: center;
                color: #333;
                overflow: hidden;
                
           }
           img {
               width: .36rem;
               height: .36rem;
               margin-left: .2rem;
           }
        }
        // 签到
        .sign {
            width: 4.2rem;
            height: 3.1rem;
            overflow: hidden;
            margin: .48rem auto;
            background-color: rgba(0, 0, 0, .33);
            .integral {
                margin-top: .46rem;
                text-align: center;
                font-size: .4rem;
                color: #fff;
            }
            // 签到按钮
            .sign-btn {
                width: 3.1rem;
                height: .9rem;
                background: #51c3bd;
                margin-top: .6rem;
                margin-left: auto;
                margin-right: auto;
                font-size: .38rem;
                color: #fff;
                border-radius: .08rem;
            }
        }
    }
    // 我的信息
    .my-infor {
        width: 100%;
        height: 3.6rem;
        background-color: #fff;
        margin-top: .28rem;
        padding: 1.5rem .3rem 0 .3rem;
        p {
            text-align: center;
            margin-top: .24rem;
            font-size: .36rem;
        }
        .ico {
            margin: 0 auto;
            height: .72rem;
            &.collection {
                width: .76rem;
                // height: .68rem;
                background: url('~@/assets/mycenter-ico1.png') no-repeat center;
                .bg-size(.76rem,.68rem);
            }
            &.car {
                width: .76rem;
                // height: .6rem;
                background: url('~@/assets/mycenter-ico2.png') no-repeat center;
                .bg-size(.76rem,.6rem);
            }
            &.order {
                width: .52rem;
                // height: .6rem;
                background: url('~@/assets/mycenter-ico3.png') no-repeat center;
                .bg-size(.52rem,.6rem);
            }
            &.adress {
                width: .5rem;
                // height: .7rem;
                background: url('~@/assets/mycenter-ico4.png') no-repeat center;
                .bg-size(.5rem,.7rem);
            }
            &.integral {
                width: .56rem;
                // height: .72rem;
                background: url('~@/assets/mycenter-ico5.png') no-repeat center;
                .bg-size(.56rem,.72rem);
            }
        }
    }
    .null-write {
        width: 100%;
        height: 2.74rem;
        background-color: #fff;

    }
    .foot {
        background-color: #20223b;
        .fixedBottom(@height: 1.2rem, @index: 9);
        .go-index {
            width: 1.74rem;
            height:.6rem;
            text-align: center;
            background-color: @main-cor;
            color: #fff;
            .border-radius(.08rem);
            font-size: .34rem;
        }
    }
    // 签到弹框
     .sign-box {
        position: relative;
        overflow: hidden;
        width: 8.56rem;
        height: 9.34rem;
        margin: 0 auto;
        background-image: url(~@/assets/sign-bg.jpg);
        .bg-size(100%,100%);
        // 关闭按钮
        .btn-off {
            position: absolute;
            top: 0;
            right: 0;
            width: .8rem;
            height: .8rem;
        }
        // 签到天数
        .sign-num {
            margin-top: .46rem;
            width: .44rem;
            height: .44rem;
            font-size: .18rem;
            color: #fff;
            background-color: #cfcfcf;
            border-radius: .44rem;
            margin-left: auto;
            margin-right: auto;
            border: .06rem solid #e4e4e4;
            &.on {
                background-color: @main-cor;
            }
        }
        .sign-date {
            width: 7.6rem;
            height: 1.54rem;
            margin: 2.5rem auto .96rem auto;
            
            .flex2 {
                width: 1.6rem;
                height: 1.54rem;
                // background-color: rgba(255, 0, 0, 0.116);
                text-align: center;
                font-size: .18rem;
                color: #0a673c;
                padding-top: 1.04rem;
                &.one {
                    margin-left: .06rem;
                }
                &.two {
                    margin-left: .34rem;
                }
                 &.three {
                    margin-left: .3rem;
                }
                 &.fore {
                    margin-left: .28rem;
                }
            }
        }
        .sign-data2 {
            width: 7.6rem;
            height: 1.54rem;
            text-align: center;
            margin: 0 auto;
            color: #0a673c;
            padding-top: 1.04rem;
            .seven {
                width: 3.64rem;
                height: 1.54rem;
                margin-right: .34rem;
            }
            .six {
                margin-right: .3rem;
            }
            .six,.five {
                width: 1.6rem;
                height: 1.54rem;
            }
        }
        // 签到按钮
        .sign-btn {
            width: 3.7rem;
            height: .7rem;
            font-size: .24rem;
            background: #51c3bd;
            color: #fff;
            margin: 1.4rem auto;
            &.sign-finish {
            background-color: #e5e5e5;
            color: #181717;
            }
        }
     }
</style>



