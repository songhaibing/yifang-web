<template>
    <div class="order">
         <!-- 头部 -->
        <pub-head :text="text" bgColor="#f0eff5" leftColor="#333" title="我的订单">
            <div class="right-img" ><img src="@/assets/search-ico.png" alt="" class="fill"></div>
        </pub-head>
        <!-- 我的订单tab -->
        <ul class="order-title flex">
            <li class="flex1 flexc" v-for="(tab,index) in tabs" :key="index" :class="{on:nowindex == tab.type}" @click="tabchange(index,tab.type)">
                <span class="border-tp">{{tab.title}}</span>
            </li>
        </ul>
        <div class="tab-set"></div>
        <!-- 订单列表 -->
        <list
                v-model="loading"
                :finished="finished"
                :immediate-check="false"
                finished-color="#777"
                finished-text='没有更多订单了'
                @load="onLoad"
            >
        <div class="order-list" v-for="(order,index) in orders" :key="order.id">
            <div class="states jus-e ali-c" v-if="order.status == 1">待支付</div>
            <div class="states jus-e ali-c" v-if="order.status == 2">待发货</div>
            <div class="states jus-e ali-c" v-if="order.status == 3">待收货</div>
            <div class="states jus-e ali-c" v-if="order.status == 4">待评价</div>
            <div class="states jus-e ali-c" v-if="order.status == 5">已评价</div>
            <div class="states jus-e ali-c" v-if="order.status == 6">已取消</div>

            <router-link :to="'/order/detail?id='+order.id+'&type='+nowindex" class="msg flex ali-c" v-for="(goods,index) in order.list" :key="index">
                <div class="goods-img ali-c"><img :src="host+goods.img" alt=""></div>
                <div class="text-detail flex1">
                    <div class="jus-b">
                        <div class="goods-name twoline">{{goods.item_name}}</div>
                        <div class="price">￥{{goods.prices}}</div>
                    </div>
                    <div class="order-num jus-e">x{{goods.nums}}</div>
                </div>
                
            </router-link>
            <div class="order-zum jus-e ali-c">共{{order.totalnums}}件商品 合计: <span>¥ {{order.totalprices}}</span> （含运费¥{{order.yunfei}}）</div>
            <!-- 待评价 -->
            <div class="all-btn jus-e ali-c" v-if="order.status == 4">
                <div class="del-order flexc" @click="delOrder(2,order.id,index)">删除订单</div>
                <div class="look-logistics flexc" @click="lookLogistics(order.id)">查看物流</div> 
                <router-link :to="'/evaluation/evaluation?id='+order.id" class="evaluate flexc">评价</router-link>
            </div>
            <!-- 待收货 -->
             <div class="all-btn jus-e ali-c" v-if="order.status == 3">
                <div class="look-logistics flexc" @click="lookLogistics(order.id)">查看物流</div> 
                <div class="sure flexc" @click="delOrder(3,order.id,index)">确认收货</div>
            </div>
            <!-- 待发货 -->
            <div class="all-btn jus-e ali-c" v-if="order.status == 2">
                <div class=" flexc" @click="remind">提醒发货</div> 
                <router-link :to="'/order/refund?id='+order.id" class="refund flexc">申请退款</router-link>
            </div>
            <!-- 已完成 -->
             <div class="all-btn jus-e ali-c" v-if="order.status == 5">
                <div class="del-order flexc" @click="delOrder(2,order.id,index)">删除订单</div>
                <div class="look-logistics flexc" @click="lookLogistics(order.id)">查看物流</div> 
                <router-link :to="'/evaluation/myEvaluation?id='+order.id" class="refund flexc">评价详情</router-link>
            </div>
            <!-- 待付款 -->
             <div class="all-btn jus-e ali-c" v-if="order.status == 1">
                 <div class="cancel-order flexc" @click="delOrder(1,order.id,index)">取消订单</div>
                <div class="del-order flexc" @click="delOrder(2,order.id,index)">删除订单</div>
                <div class="go-pay flexc" @click="goPay(order.dingdan,order.totalprices)">去支付</div>
            </div>
            <!-- 已取消 -->
             <div class="all-btn jus-e ali-c" v-if="order.status == 6">
                <div class="del-order flexc" @click="delOrder(2,order.id,index)">删除订单</div>
            </div>
        </div>
        </list>
        <!-- 删除/取消订单弹框提示 -->
        <popop :isShow="isShow" cancel="取消" sure="确认" :onCancel="cancel" :onSure="confirm"></popop>
    </div>
</template>

<script>
import head from '@/components/head/head.vue';
import popop from '@/components/delPopup/delPopup.vue'
import list from '@/components/listLoad/listLoad';
export default {
    name:'Order',
    components: {
        'pub-head':head,
        popop,
        list
    },
    data () {
        return {
            text:true,
            nowindex:0,
            tabs:[
                {title:'全部',type:1},
                {title:'待付款',type:2},
                {title:'待发货',type:3},
                {title:'待收货',type:4},
                {title:'待评价',type:5}
            ],
            id:'',//每次点击保存的id
            nowNum:'',//每次点击保存的索引值
            isShow:false,//弹框 默认不显示
            delOrCan:'',//删除参数/取消参数  1为取消2为删除3确认收货
            page:0,  //加载页数
            loading: false,
            finished: false,
            orders:[],//订单列表
            host:'http://101yi.cn/data/attachment/item/',//图片路径前缀
        }
    },
    activated () {
        // isUseCache为false才重新刷新获取数据
        // 因为对list使用keep-alive来缓存组件，所以默认是会使用缓存数据的         
        if(!this.$route.meta.isUseCache){            
            
            this.orders = [];
            this.finished = false;
            this.page = 0;
            // 获取数据
            this.onLoad();
        }
        this.$route.meta.isUseCache = false;
    },
    beforeRouteLeave (to, from, next) {
        // 如果前往商品详情或者店铺详情则缓存数据
        if (to.name === 'OrderDetail') {
            from.meta.isUseCache = true;
        }
        next();
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
            this.$api.order.orderList({        
                page: this.page,
                size: 6,
                key:localStorage.getItem('access_token'),
                type:type
            }).then(res=> {
                console.log(res.data);
                this.loading = false;
                // 更新列表数据
                this.orders = [...this.orders, ...res.data.order];
                // 判断返回的数据是否为空
                this.page == 1 && (this.orders.length == 0);
                this.finished = res.data.order.length < 6;
            }) 
        },
        // 提醒发货
        remind () {
            this.$Tip('已提醒卖家尽快发货');
        },
         // 切换tab栏
        tabchange(index, tab) {
            this.nowindex = tab;
            this.orders = []; // 清空原有数据
            this.page = 0;
            this.loading = true;
            this.finished = false;
            // 分类的切换
            this.$router.replace('/order/order/'+tab);
            this.onLoad();
        },
        // 取消订单/删除订单调用弹出框
        delOrder (type,id,index) {
            this.isShow = true;
            this.delOrCan = type;
            this.id = id;
            this.nowNum = index;
            console.log(this.id);
        },
         // 取消退出
        cancel () {
            this.isShow = false;
        },
        // 确认取消或删除
        confirm () {
            this.isShow = false;
            if (this.delOrCan == 1) {
                this.$api.order.cancelOrder({
                    key:localStorage.getItem('access_token'),
                    order_id: this.id
                }).then(res => {
                    this.orders[this.nowNum].status = 6;
                    this.$Tip('取消订单成功');
                })
                
            }else if (this.delOrCan == 2){
                this.$api.order.deleteOrder({
                    key:localStorage.getItem('access_token'),
                    order_id: this.id
                }).then(res => {
                    this.orders.splice(this.nowNum,1);
                    this.$Tip('删除订单成功');
                })
            }else {
                // 确认收货调用弹出框
                this.$api.order.confirm ({
                    key:localStorage.getItem('access_token'),
                    order_id:this.id
                }).then(res => {
                    this.orders = [];
                    console.log(res.data);
                    this.$Tip('确认收货成功');
                    this.getData(this.nowindex);
                })
            }
        },
        // 查看物流
        lookLogistics (id) {
            this.$router.push('/logistics?id='+id);
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
    }
}
</script>
<style lang="less" scoped>
@import url('../../style/mixin');
.order {
    min-height: 100vh;
    background-color: @pub-bg;
}
    .right-img {
        width: .5rem;
        height: .5rem;
    }
    /*选项卡*/
    .tab-set {
        height: 1.08rem;
    }
    .order-title {
        position: fixed;
        max-width: 10rem;
        width: 100%;
        top: 1.1rem;
        background: #fff;
        z-index: 99;
        border-bottom: 1px solid #959595;
        .flex1 {
            height: 1.08rem;
            font-size: 0.38rem;
        }
        .flex1.on {
            color: @main-cor;
            & span {
                display: inline-block;
                width: 66%;
                height: 100%;
                border-bottom:2px solid @main-cor;
                text-align: center;
                line-height: 0.9rem;
            }
        }
    }

    // 订单列表
    .order-list {
        margin-bottom: .26rem;
        background: #fff;
        .states {
            height: 1rem;
            font-size: .26rem;
            color: @main-cor;
            padding: 0 .3rem;
        }
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
                    font-size: .38rem;
                    line-height: .4rem;
                    color: #333;
                }
                .price {
                    font-size: .4rem;
                    color: #242323;
                }
                .order-num {
                    font-size: .28rem;
                    color: #a7a7a7;
                }
            }
        }
        .order-zum {
            height: 1rem;
            padding: 0 .3rem;
            font-size: .26rem;
            color: #333;
            span {
                font-size: .38rem;
            }
        }
        .all-btn {
            height: 1rem;
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

