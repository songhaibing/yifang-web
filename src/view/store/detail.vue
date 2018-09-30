<template>
    <div class="store-detail">
        <!-- 头部 -->
        <header class="head-box">
            <div class="head jus-e ali-c">
                <div class="left" @click="back">
                    <span class="line line1"></span>
                    <span class="line line2"></span>
                </div>
                <div class="right-car" @click="goShopCar">
                    <!-- 购物车数量 -->
                    <div class="car-number flexc" v-if="carShow">{{cartCount}}</div>
                </div>
               
            </div>
        </header>
        <div class="seat"></div>
        <!-- 详情logo -->
        <div class="detail-logo"></div>
        <div class="detail-img"><img src="@/assets/detail-head.jpg" alt="" class="fill-auto"></div>
        <main class="text-main">
            <!-- 标题 -->
            <h1 class="title-one">{{detail.label}}</h1>
            <h2 class="title-two">{{detail.title}}</h2>
            <p>{{detail.intro}}</p>

            <!-- 分享/点赞 -->
            <div class="jus-e van-hairline--bottom">
                <div class="flex ali-c">
                    <div class="share"></div>
                    <div class="like" :class="{on:isCollect}" @click="isLike"></div>
                </div>
            </div>
        </main>
        <!-- 已售/库存 -->
        <div class="goods-num jus-e">
            <div class="goods-info flex">
                <div class="sold">已售 {{detail.sales}}</div>
                <div class="stock">库存 {{detail.inventory}}</div> 
            </div>
        </div>
        <!-- foot -->
        <div class="fooe-set"></div>
        <footer class="foot jus-e ali-c">
            <div class="btn flex">
                <div class="add-car ali-c" @click="addCart">加入购物车</div>
                <router-link :to="'/PlaceOrder/PlaceOrder?type=2&item_id='+id" class="go-buy ali-c">立即购买</router-link>
            </div>
        </footer>
    </div>  
</template>

<script>
export default {
    name:'StoreDetail',
    data () {
        return {
            detail:{},//详情数据
            cartCount:0,//购物车数量
            carShow:false,//是否先手购物车数量背景颜色
            isCollect:false,//是否收藏
            host:'http://101yi.cn/data/attachment/item/',//图片路径前缀
            id:'',//商品id
        }
    },
    created () {
        this.id = this.$route.params.id;
        this.onLoad(this.id);
    },
    methods: {
        onLoad (id) {
            this.$api.store.storeDetail({
                key:this.$store.state.token,
                item_id:id
            }).then(res => {
                this.detail = res.data.item;
                this.cartCount = res.data.cart_count - 0;
                // 判断购物车是否有商品
                (this.cartCount == null || this.cartCount == '0') ? this.carShow = false : this.carShow = true;
                // 判断购物车是否收藏
                res.data.item.collect == '已收藏' ? this.isCollect = true : this.isCollect = false; 
            })
        },
        // 点击喜欢
        isLike () {
            this.$api.store.goodsCollect({
                key:this.$store.state.token,
                id:this.$route.params.id
            }).then(res => {
                this.isCollect = ! this.isCollect;
                if(this.isCollect) {
                    this.$Tip('收藏成功');
                } else {
                    this.$Tip('取消收藏');
                }
            })
        },
        // 加入购物车
        addCart () {
            let status = localStorage.getItem('status');
            if(status == 0) {
                this.$Tip('请先绑定手机号');
            }else {
                this.$api.store.addCart({
                    key:this.$store.state.token,
                    id:this.$route.params.id
                }).then(res => {
                    this.cartCount++ ;
                    this.$Tip(res.msg);
                })
            }
        },
        // 返回上一页
        back() {
            //如果是从删除或取消订单操作跳转的路径减2
            if (this.$route.query.ref == 1) {
                this.$router.go(-2);
            } else {
                this.$router.go(-1);
            }
            
        },
        goShopCar () {
            this.$router.push('/shopCar');
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../../style/mixin');
    .store-detail {
        .head-box {
            position: fixed;
            top: 0;
            width: 10rem;
            max-width: 820px;
            height: 1.1rem;
            z-index: 9;
            background-color: #fff;
        }
        .head {
            position: relative;
            height: 1.1rem;
            border-bottom: 1px solid #959595;
        }
        .left {
            position: absolute;
            left: 0;
            top: 0;
            width: 1.1rem;
            height: 1.1rem;
            .line {
                content: "";
                position: absolute;
                top: 50%;
                left: 0.32rem;
                width: 0.24rem;
                height: 1px;
                background-color: #333;
            }
            .line1 {
                margin-top: -0.08rem;
                transform: rotate(-45deg);
            }
            .line2 {
                margin-top: 0.08rem;
                transform: rotate(45deg);
            }
        }
        .right-car {
            position: relative;
            width: .74rem;
            height: .74rem;
            margin-right: .4rem;
            background-image: url(~@/assets/detail-car-ico.png);
            .bg-size(.74rem,.74rem);
            .car-number {
                position: absolute;
                top: -0.06rem;
                right: -0.1rem;
                min-width: .36rem;
                height: .36rem;
                border-radius: 50%;
                background-color: @main-cor;
                color: #fff;
            }
        }
         .seat {
            height: 1.1rem;
        }   
        .detail-logo {
            width: 2.92rem;
            height: 1.5rem;
            background: url(~@/assets/detail-logo.jpg) no-repeat;
            .bg-size(2.92rem,auto);
        }
        .text-main {
            padding: 1rem .6rem;
            text-align: center;
            .title-one {
                font-size: .38rem;
                line-height: .6rem;
                color: #282828;
                font-weight: bold;
            }
            .title-two {
                font-size: .42rem;
                color: #282828;
                line-height: .48rem;
                margin-bottom: .5rem;
                span {
                    color: #d22b63;
                }
            }
            p {
                font-size: .32rem;
                line-height: .46rem;
                text-align: left;
                color: #323232;
                text-indent: 2em;
                margin-top: .1rem;
            }
            // 点赞/喜欢
            .jus-e {
                height: 1rem;
                margin-top: 1.8rem;
                .flex {
                    width: 1.7rem;
                    height: 100%;
                    .share {
                        width: .44rem;
                        height: .44rem;
                        background-image: url(~@/assets/detail-ico1.png);
                        .bg-size(.44rem,.44rem);
                    }
                    .like {
                        width: .52rem;
                        height: .38rem;
                        background-image: url(~@/assets/detail-ico2.png);
                        .bg-size(.52rem,.38rem);
                        margin-left: .3rem;
                        &.on {
                            background-image: url(~@/assets/detail-ico2-on.png);
                        }
                    }
                }
            }
        }
        // 已售/库存
        .goods-num {
            height: 1rem;
            .goods-info {
                width: 4.6rem;
                font-size:.36rem;
                color: #252525;
                // .sold {}
                .stock {
                    margin-left: .54rem;
                }
            }
        }
        // foot
        .fooe-set {
            height: 2.8rem;
        }
        .foot {
            width: 100%;
            height: 1.48rem;
            max-width: 10rem;
            position: fixed;
            bottom: 0;
            width: 100%;
            z-index: 9;
            background-color: #20223b;
            .btn {
                width: 5.36rem;
                height: .8rem;
                font-size: .34rem;
                color: #fff;
               
                .add-car {
                    padding: 0 .3rem;
                    background-color: #277077;
                    border-radius: 1rem;
                }
                 .go-buy {
                    padding: 0 .36rem;
                    color: #fff;
                    background-color: @main-cor;
                    border-radius: 1rem;
                    margin-left: .24rem;
                }
            }
        }
    }
</style>

