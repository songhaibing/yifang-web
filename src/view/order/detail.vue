<template>
    <div class="order-detail">
         <!-- 头部 -->
        <pub-head title="订单详情" :text="text" bgColor="#f0eff5"></pub-head>
        
        <!-- 订单状态 -->
        <div class="state ali-c">
            <!-- 退款成功 -->
            <div class="text ali-c" v-if="detail.refund == 9">
                <div class="words">退款成功</div>
            </div>
             <!-- 退款中 -->
            <div class="text ali-c" v-if="detail.refund == 7">
                <div class="words">退款中</div>
            </div>
             <!-- 退款失败 -->
            <div class="text ali-c" v-if="detail.refund == 8">
                <div class="words">退款失败</div>
            </div>
            <!-- 交易成功 -->
            <div class="text ali-c" v-if="detail.status == 4">
                <div class="words">交易成功</div>
            </div>
            <!-- 等待买家付款 -->
            <div class="text" v-if="detail.status == 1">
                <div class="words">等待买家付款</div>
                <!-- <div class="times">剩15分钟关闭</div> -->
            </div>
            <!-- 已评价 -->
            <div class="text" v-if="detail.status == 5">
                <div class="words">订单已完成</div>
            </div>
            <!-- 卖家已发货 -->
            <div class="text" v-if="detail.status == 3">
                <div class="words">卖家已发货</div>
                <div class="times">还剩11天23小时自动确认</div>
            </div>
            <!-- 买家已付款 -->
            <div class="text" v-if="detail.status == 2">
                <div class="words">买家已付款</div>
                <div class="times">等待买家发货</div>
            </div>
             <!-- 订单已取消 -->
            <div class="text ali-c" v-if="detail.status == 6">
                <div class="words">订单已取消</div>
            </div>
        </div>
        <!-- 物流信息 -->
        <router-link to="" class="van-hairline--bottom jus-b ali-c logistics">
            <div class="ali-c flex">
                <div class="car-img"><img src="@/assets/logistic-car-ico.png" alt="" class="fill"></div>
                <div class="text">物流：{{mess}}</div>
            </div>
            <div class="img"><img src="@/assets/user-menu-next.png" alt="" class="fill"></div>
        </router-link>
        <!-- 收货地址 -->
        <div class="address van-hairline--bottom">
            <div class="user-infor jus-b ali-c">
                <div class="user-name">{{detail.shperson}}</div>
                <div class="user-phone">{{detail.mobile}}</div>
            </div>
            <div class="user-adress twoline">收货地址：{{detail.address}}</div>
        </div>
        <!-- 发票信息 -->
        <div class="invoice">
            <div class="infor ali-c">发票信息</div>
            <div class="type ali-c" v-if="detail.bill_cate == 1">发票抬头：个人</div>
            <div class="type ali-c" v-if="detail.bill_cate == 2">发票抬头：公司</div>
        </div>
        <!-- 订单商品 -->
        <router-link to="" class="msg flex ali-c" v-for="(goods,index) in detail.list" :key="index">
            <div class="goods-img ali-c"><img :src="host+goods.img" alt="" class="fill"></div>
            <div class="text-detail flex1">
                <div class="jus-b">
                    <div class="goods-name twoline">{{goods.item_name}}</div>
                    <div class="price">￥{{goods.prices}}</div>
                </div>
                <div class="order-num jus-e">x{{goods.nums}}</div>
            </div>
            
        </router-link>
         <!-- 商品总价 -->
        <div class="price-zum">
            <div class="ali-c jus-b">
                <div>商品总价</div>
                <div>￥{{detail.item_prices}}</div>
            </div>
            <div class="ali-c jus-b">
                <div>运费（快递）</div>
                <div>￥{{detail.yunfei}}</div>
            </div>
        </div>
        <!-- 订单总价 -->
        <div class="order-num jus-b ali-c">
            <div>订单总价</div>
            <div>￥{{detail.totalprices}}</div>
        </div>
        <!-- 订单底部信息 -->
        <div class="order-foot-infor">
            <div>订单编号：{{detail.dingdan}}</div>
            <div>创建时间：{{detail.add_time|formats}}</div>
            <div v-if="detail.status == 3 || detail.status == 4">付款时间：{{detail.pay_time|formats}}</div>
            <div v-if="detail.status == 3 || detail.status == 4">发货时间：{{detail.update_time|formats}}</div>
            <div v-if="detail.status == 4">成交时间：{{detail.sign_time|formats}}</div>
        </div>
        <div class="foot-set"></div>
        <!-- foot -->
        <div class="all-btn jus-e ali-c van-hairline--top">
            <div class="del-order flexc" @click="delOrder(2)" v-if="detail.status == 4">删除订单</div>
            <div class="cancel-order flexc" @click="delOrder(1)" v-if="detail.status == 1">取消订单</div>
            <div class="go-pay flexc" v-if="detail.status == 1" @click="goPay(detail.dingdan,detail.totalprices)">去支付</div>
            <div class="look-logistics flexc" v-if="detail.status == 4 || detail.status == 3" @click="lookLogistics(order.id)">查看物流</div> 
            <div class="sure flexc" @click="delOrder(3)" v-if="detail.status == 3">确认收货</div>
            <div class=" flexc" v-if="detail.status == 2" @click="remind">提醒发货</div> 
            <div class="refund flexc" @click="submissionRefund"  v-if="detail.status == 2">申请退款</div>
            <router-link :to="'/evaluation/evaluation?id='+id" class="evaluate flexc" v-if="detail.status == 4">评价</router-link>
        </div>

        <!-- 删除/取消订单弹框提示 -->
        <popop :isShow="isShow" cancel="取消" sure="确认" :onCancel="cancel" :onSure="confirm"></popop>
        
    </div>
    
</template>

<script>
import head from '@/components/head/head.vue';
import popop from '@/components/delPopup/delPopup.vue'
import { u_formatTimestamp } from '@/config/utils'
export default {
    name:'OrderDetail',
     components: {
        'pub-head':head,
        popop
    },
    data () {
        return {
            isShow:false,//弹框 默认不显示
            text:true,//头部文字显示
            detail:'',//详情数据
            host:'http://101yi.cn/data/attachment/item/',//图片路径前缀
            mess:'',//物流显示
            id:'',//订单id
            delOrCan:'',//删除参数/取消参数  1为取消2为删除3确认收货
        }
    },
    created () {
        this.id = this.$route.query.id;
        this.$api.order.detail({
            key:localStorage.getItem('access_token'),
            order_id:this.id
        }).then(res => {
            this.detail = res.data.order;
            this.mess = res.data.mess;
        })
    },
    methods: {
        // 取消订单/删除订单调用弹出框
        delOrder (type) {
            this.delOrCan = type;
            this.isShow = true;
        },
         // 取消退出
        cancel () {
            this.isShow = false;
        },
        // 申请退款
        submissionRefund () {
            this.$router.replace('/order/refund?id='+this.id);
        },
        // 提醒发货
        remind () {
            this.$Tip('已提醒卖家尽快发货');
        },
        // 查看物流
        lookLogistics (id) {
            this.$router.push('/logistics?id='+id);
        },
        // 确认取消或删除
        confirm () {
            this.isShow = false;
            if (this.delOrCan == 1) {
                this.$api.order.cancelOrder({
                    key:localStorage.getItem('access_token'),
                    order_id: this.id
                }).then(res => {
                    this.$Tip('取消订单成功');
                    this.detail.status = '6';
                })
                
            }else if (this.delOrCan == 2){
                this.$api.order.deleteOrder({
                    key:localStorage.getItem('access_token'),
                    order_id: this.id
                }).then(res => {
                    this.$Tip('删除订单成功');
                    // 删除订单后返回上一层
                    this.$router.replace('/order/order/'+this.$route.query.type);
                })
            }else {
                // 确认收货调用弹出框
                this.$api.order.confirm ({
                    key:localStorage.getItem('access_token'),
                    order_id:this.id
                }).then(res => {
                    this.$Tip('确认收货成功');
                    this.detail.status = '4';
                })
            }
        },
        // 去支付
        goPay (orderNumber,orderPrice) {
            // 微信支付函数
            this.$api.order.confirmPay({
                dingdan: orderNumber,
                totalprices: orderPrice
            }).then(res => {
                this.awakenWXPay(res.data.data);
            })
        },
        // 调起微信支付弹窗
        awakenWXPay (config) {
            console.log(config);
            this.loading = true;
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": config.appId,     //公众号名称，由商户传入
                    "timeStamp": config.timeStamp,         //时间戳，自1970年以来的秒数
                    "nonceStr": config.nonceStr, //随机串
                    "package": config.package,
                    "signType": "MD5",         //微信签名方式：
                    "paySign": config.paySign //微信签名
                }, 
                res => {
                    console.log(res);
                    if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                        this.loading = false;                            
                        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                            this.$router.replace({
                                path: '/order/detail',
                                query: {
                                    id: this.id,
                                }
                            });
                    } else if (res.err_msg == "get_brand_wcpay_request:cancel"){
                        this.loading = false;
                    }
                }
            );
        }
    },
    
    filters: {
        // 时间戳转换
        formats (val) {
            return u_formatTimestamp(val * 1000);
        }
    }
}
</script>

<style lang="less" scoped>
@import url('../../style/mixin');
    .order-detail {
        min-height: 100vh;
        .state {
            height: 2.7rem;
            background-color: @main-cor;
            .text {
                height: 1.8rem;
                color: #fff;
                margin-left: .8rem;
                .words {
                    font-size: .5rem;
                    line-height: 1rem;
                }
                .times {
                    font-size: .24rem;
                    line-height: .6rem;
                }
            }
        }
        // 物流信息
        .logistics {
            height: 1.36rem;
            padding: 0 .3rem;
            font-size: .32rem; 
            color: #3d3d3d;
            .car-img {
                width: .7rem;
                height: .54rem;
            }
            .text {
                margin-left: .3rem;
            }
            .img {
                width: .2rem;
                height: .36rem;
            }
        }
        // 用户地址
        .address {
            height: 2.3rem;
            padding: .2rem .46rem .2rem 1.42rem;
            background: url(~@/assets/mycenter-ico4.png) no-repeat .5rem center;
            .bg-size(.5rem,.7rem);
            font-size: .36rem;
            .user-infor {
                height: .8rem;
            }
            .user-adress {
                line-height: .48rem;
            }
        }
        // 发票信息
        .invoice {
            padding: 0.2rem .4rem;
            font-size: .42rem;
            color: #333;
            .ali-c {
                height: .6rem;
            }
        }
        // 订单商品
        .msg {
            height: 2.4rem;
            padding: .2rem .3rem;
            margin-bottom: .16rem;
            background-color: #f0eff5;
            .goods-img {
                width: 2rem;
                height: 2rem;
            }
            .text-detail {
                margin-left: .3rem;
                .goods-name {
                    width: 5.14rem;
                    font-size: .26rem;
                    line-height: .4rem;
                    color: #333;
                }
                .price {
                    font-size: .3rem;
                    color: #242323;
                }
                .order-num {
                    font-size: .28rem;
                    color: #a7a7a7;
                }
            }
        }
        // 商品总价
        .price-zum {
            padding: 0.2rem .4rem;
            font-size: .36rem;
            color: #828282;
            .ali-c {
                height: .6rem;
            }
        }
        .order-num {
            padding: 0.2rem .4rem;
            font-size: .48rem;
            color: #141414;
            .ali-c {
                height: 1rem;
            }
        }
        .order-foot-infor {
             padding: 0.2rem .4rem;
             font-size: .34rem;
             color: #828282;
             line-height: .6rem;
        }
        .foot-set {
            height: 1.88rem;
        }
        .all-btn {
            position: fixed;
            width: 100%;
            max-width: 1000px;
            bottom: 0;
            z-index: 9;
            height: 1.32rem;
            background-color: #fff;
            padding: 0 .3rem;
            .flexc {
                width: 2rem;
                height: .78rem;
                border: 1px solid #d0d0d0;
                color: #434343;
                font-size: .32rem;
                margin-left: .26rem;
                border-radius: .78rem;
            }
        }
    }
</style>
