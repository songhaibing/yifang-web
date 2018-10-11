<template>
    <div class="place-order">
        <!-- 头部 -->
        <pub-head title="提交订单" :text="text">
        </pub-head>
        <!-- 收货地址 -->
          <!-- 有地址 -->
        <router-link to="/address/address" class="address jus-e" v-if="addressEmpty">
            <div class="left">
                <div class="user-infor jus-b ali-c">
                    <div class="user-name">{{addressInfo.shperson}}</div>
                    <div class="user-phone">{{addressInfo.mobile}}</div>
                </div>
                <div class="user-adress twoline flex">
                    <div class="place-address">收货地址：</div>
                    <div>{{addressInfo.province}}{{addressInfo.city}}{{addressInfo.county}}{{addressInfo.address}}</div>
                </div>
            </div>
            <div class="img ali-c"><img src="@/assets/user-menu-next.png" alt=""></div>
        </router-link>
        <!--无地址-->
        <router-link to='/address/newAddress?type=1' tag="div" class="address ali-c" v-if="!addressEmpty">
            <div class="add-new">+添加收货地址</div>
        </router-link>
        <div class="address-foot"></div>

        <!-- 购物车订单商品  type=1-->
        <div class="msg flex ali-c" v-for="(goods,index) in goodsInfo" :key="index" v-if="type == 1">
            <div class="goods-img ali-c"><img :src="host+goods.img" alt="" class="fill"></div>
            <div class="text-detail flex1">
                <div class="goods-name twoline">{{goods.title}}</div>
                <div class="goods-type">分类：{{goods.cate_name}}</div>
                <div class="order-num jus-b">
                    <div class="price">￥{{goods.price}}</div>
                    <div class="num">x{{goods.nums}}</div>
                </div>
            </div>
        </div>
        <!-- 直接购买详情信息 type= 2 -->
        <div class="msg flex ali-c"  v-if="type == 2">
            <div class="goods-img ali-c"><img :src="host+goodsInfoOne.img" alt="" class="fill"></div>
            <div class="text-detail flex1">
                <div class="goods-name twoline">{{goodsInfoOne.title}}</div>
                <div class="goods-type">分类：{{goodsInfoOne.cate_name}}</div>
                <div class="order-num jus-b">
                    <div class="price">￥{{goodsInfoOne.price}}</div>
                    <div class="num">x1</div>
                </div>
            </div>
            
        </div>
        <!-- 提交订单底部信息 -->
        <div class="place-infor">
            <div class="jus-b ali-c van-hairline--bottom info">
                <div>配送方式</div>
                <div>快递</div>
            </div>
            <div class="jus-b ali-c van-hairline--bottom info">
                <div>配送费</div>
                <div>￥{{freight}}</div>
            </div>
          <div class="jus-b ali-c van-hairline--bottom info" v-if="price">
            <div>使用优惠券</div>
            <div><van-switch v-model="coupon" size="36px" @change="swichTab"/></div>
          </div>
            <div class="jus-b ali-c van-hairline--bottom info">
                <div>开具发票</div>
                <div><van-switch v-model="isBill" size="36px" @input="onInput(isBill)"/></div>
            </div>
            <!-- 发票抬头 -->
            <div v-show="isInvoice">
                <div class="invoice flex">
                    <div class="tab ali-c" v-for="(tab,index) in tabs" :key="index" :class="{on:nowindex == index}" @click="tabchange(index,tab.type)">{{tab.title}}</div>
                    
                </div>
                <input type="text" class="ali-c text" v-model="invoice">
            </div>
            
            <div class="flex ali-c van-hairline--bottom info">
                <div>买家留言：</div>
                <div><input type="text" v-model="leaveWord"></div>
            </div>
            <div class="jus-e info ali-c" v-if="type==2">共1件商品 小计：<span>¥ {{prices | fixed2}}</span></div>
          <div class="jus-e info ali-c" v-if="type==1">共{{totalnums}}件商品 小计：<span>¥ {{prices | fixed2}}</span></div>
        </div>

        <!-- foot -->
        <div class="foot-set"></div>
        <footer class="foot jus-e ali-c">
            <div class="sum">合计金额：<span>¥ {{totalprices | fixed2}}</span></div>
            <div class="btn flexc" @click="confirmOrderPay">提交订单</div>
        </footer>
    </div>
</template>

<script>
import head from '@/components/head/head.vue';
import order from '@/api/model/order'
import { u_fixed } from '@/config/utils'
import state from '@/store'
    export default {
        name:'PlaceOrder',
        components: {
        'pub-head':head
        },
        data () {
            return {
               price : '',
                text:true,//头部文字显示
                leaveWord:'',//买家留言
                tabs:[
                    {title:'个人',type:1},
                    {title:'公司',type:2}
                ],
                coupon:true,//优惠券
                nowindex:0,
                invoice:'',//发票抬头留言
                isInvoice:false,//开具发票留言
                goodsInfo: [], //商品信息
                goodsInfoOne:{},//直接购买进入的详情
                addressInfo: '', //地址信息
                addressEmpty: false, //地址是否为空
                host:'http://101yi.cn/data/attachment/item/',//图片路径前缀
                freight:'',//运费
                totalprices:'',//总价
                prices:'',//商品总价
                isBill:false,//是否开发票
                infoType:0,//1为开具发票
                type:'',//购物车或者直接购买类型，1位购物车，2为直接购买
                billCate:1,//开具发票，1位个人，2为公司  默认个人
                id:'',//提交下单后的订单id
                orderNum:'',//提交订单号
                totalnums:'',//购物车商品总数
            }
        },
        created () {
            this.type = this.$route.query.type;
      },
        filters: {
            fixed2 (val) {
                return u_fixed(val);
            }
        },
        // 先获取数据再加载组件
        // 根据不同的下单类型，走不同的获取页面数据流程
        // 根据url的type值判断下单类型
        // 2:从详情下单
        // 1:从购物车下单 
        beforeRouteEnter (to, from, next) {
            const querys = to.query;
            // 如果是从地址页面或者添加地址页面返回，则使用缓存数据并读取sesstionStorage的地址数据
            if (from.name === 'Address' || from.name === 'NewAddress') {
                const addressSelected = sessionStorage.getItem('addressSelected');
                next(vm => {
                    addressSelected && (vm.addressInfo = JSON.parse(addressSelected), vm.addressEmpty = true);
                })

            // 否则重新加载订单数据
            } else {
                switch (querys.type) {
                    case "1":
                        order.placeOrderDetail({
                            key:localStorage.getItem("access_token"),
                            type:1,
                            cart_id:querys.cart_id
                        }).then(res =>{
                             next(vm => {
                                vm.renderData(res);
                            })
                        })
                        break;
                    case "2":
                        order.placeOrderDetailOne({
                            key:localStorage.getItem('access_token'),
                            type:2,
                            item_id:querys.item_id,
                            nums:1
                        }).then(res =>{
                             next(vm => {
                                vm.renderDataOne(res);
                            })
                        })
                        break;

                    default:
                        next()
                        break;
                }
            }
        },
      activated() {
        // isUseCache为false时才重新刷新获取数据
        // 因为对list使用keep-alive来缓存组件，所以默认是会使用缓存数据的
        if(!this.$route.meta.isUseCache){
          this.type = ''; // 清空原有数据
          this. addressInfo=''
          if(sessionStorage.getItem('addressSelected') == null){
            this.onLoad()
          }
          this.type = this.$route.query.type;// 这是我们获取数据的函数
        }
        // 通过这个控制刷新
        this.$route.meta.isUseCache = false;
      },
        methods: {
          //重新获取数据
          onLoad (){
            switch (this.$route.query.type) {
              case "1":
                order.placeOrderDetail({
                  key:localStorage.getItem("access_token"),
                  type:1,
                  cart_id:this.$route.query.cart_id
                }).then(res =>{
                  this.addressInfo=res.data.order_address
                  if( this.addressInfo.length==0){
                    this.addressEmpty=false
                  }
                })
                break;
              case "2":
                order.placeOrderDetailOne({
                  key:localStorage.getItem('access_token'),
                  type:2,
                  item_id:this.$route.query.item_id,
                  nums:1
                }).then(res =>{
                  this.addressInfo=res.data.order_address;
                  if( this.addressInfo.length==0){
                    this.addressEmpty=false
                  }
                })
                break;
            }
          },
          //优惠券按钮切换
          swichTab(){
            if(this.coupon){
              localStorage.setItem('price',this.price)
              this.totalprices=this.totalprices - localStorage.getItem('price')
            }else{
              localStorage.setItem('price', this.price)
              this.totalprices=this.totalprices + (+localStorage.getItem('price'))
            }
          },
            // 渲染下单的页面数据
            renderData (res) {
                this.addressInfo = res.data.order_address;
                this.totalnums=res.data.totalnums;
                this.goodsInfo = res.data.cart;
                this.addressEmpty = 'id' in this.addressInfo;
                this.freight = res.data.yunfei;
                this.totalprices = res.data.totalprices - localStorage.getItem('price');
                this.prices = res.data.prices;
               this.price = localStorage.getItem("price");
            },
            //渲染直接下单的页面数据
            renderDataOne (res) {
                this.addressInfo = res.data.order_address;
                this.goodsInfoOne = res.data.cart;
                this.addressEmpty = 'id' in this.addressInfo;
                this.freight = res.data.yunfei;
                this.totalprices = res.data.totalprices - localStorage.getItem('price');
                this.prices = res.data.prices;
              this.price = localStorage.getItem("price");
            },
             // 切换tab栏
            tabchange(index, tab) {
                // 分类的切换
                this.nowindex = index;
                this.billCate = tab;

            },
            // 是否开具发票
            onInput(isBill) {
                this.isBill = isBill;
                this.isInvoice = !this.isInvoice;
                isBill ? this.infoType = 1 : this.infoType = 0;
            },
            // 提交订单
            confirmOrderPay () {
                order.confirmOrder({
                    key:localStorage.getItem('access_token'),
                    address_id:this.addressInfo.id,
                    cart_id:this.$route.query.cart_id,
                    item_id:this.$route.query.item_id,
                    is_bill:this.infoType,
                    bill_cate:this.billCate,
                    bill_mes:this.invoice,
                    memos:this.leaveWord,
                    yunfei:this.freight,
                    totalprices:this.totalprices
                }).then(res => {
                  if(res.status==0){
                    this.$Tip(res.msg)
                  }
                    this.id = res.data.order_id;
                    this.orderNum = res.data.dingdan;
                    // 微信支付函数
                    order.confirmPay({
                        dingdan: this.orderNum,
                        totalprices: this.totalprices,
                    }).then(res => {
                      this.qrImg = res.data.pay
                        this.awakenWXPay(res.data.data);
                    })
                }).catch(err => {
                    this.$Tip('提交失败，请刷新重试')
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
.place-order {
   .address {
       display: block;
       position: relative;
       width: 100%;
       height: 2.5rem;
       padding: .2rem .76rem .2rem 1.2rem;
        background: url(~@/assets/mycenter-ico4.png) no-repeat .5rem 1.1rem;
        .bg-size(.5rem,.7rem);
        font-size: .36rem;
        .left {
             height: 100%;
        }
        .user-infor {
            height: .8rem;
        }
        .user-adress {
            line-height: .48rem;
            
        }
        .img {
            position: absolute;
            width: .2rem;
            height: 100%;
            right: .4rem;
            top: 0;
        }
        .add-new {
            margin-top: .8rem;
            text-align: center;
            font-size: .48rem;
        }
        .place-address {
            width: 2.3rem;
            height: .48rem;
        }
   }
   .address-foot {
       height: .24rem;
       background-image: url(~@/assets/place-ico.jpg);
       .bg-size(10rem,.24rem);
   }
   // 订单商品
    .msg {
        height: 2.68rem;
        padding: .34rem .3rem;
        margin-bottom: .12rem;
        background-color: #f0eff5;
        .goods-img {
            width: 2rem;
            height: 2rem;
        }
        .text-detail {
            margin-left: .3rem;
            .goods-name {
                font-size: .3rem;
                line-height: .42rem;
                color: #333;
            }
            .goods-type {
                color: #515151;
                font-size: .26rem;
                margin-top: .16rem;
            }
            .price {
                font-size: .3rem;
                color: #242323;
            }
            .order-num {
                font-size: .28rem;
                margin-top: .2rem;
                color: #a7a7a7;
                .price {
                    color: @main-cor;
                    font-size: .36rem;
                }
            }
        }
    }
    // 提交订单底部信息
    .place-infor {
        padding: 0 .3rem;
        .info {
            height: 1.2rem;
            font-size: .36rem;
            color: #333;
            span {
                color: @main-cor;
                font-size: .36rem;
            }
        }
        .invoice {
            .tab {
                margin-right: .6rem;
                font-size: .34rem;
                color: #333;
                height: .68rem;
                &.on {
                    border-bottom: 1px solid #333;
                }
            }
        }
        .text {
            display: block;
            width: 100%;
            margin-top: .2rem;
            height: 1rem;
            border: 1px solid #ddd;
            padding-left: .3rem;
            font-size: .34rem;
        }
        
    }
    // foot固定 
        .foot-set {
            height: 1.44rem;
        }
        .foot {
            width: 100%;
            max-width: 10rem;
            height: 1.44rem;
            background-color: #f0eff5;
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 9;
            padding: 0 .3rem;
            .sum {
                font-size: .34rem;
                color: #333;
                span {
                    color: @main-cor;
                    font-size: .4rem;
                }
            }
            .btn {
                width: 2.18rem;
                height: .9rem;
                border-radius: .9rem;
                background-color: @main-cor;
                color: #fff;
                font-size: .38rem;
                margin-left: .4rem;
            }
        }
}
</style>

<style>
/* 改按钮华快样式 */
.place-order .van-switch--on {
    background-color: #dd1260;
}
</style>
