<template>
    <div class="refund">
         <!-- 头部 -->
        <pub-head :text="text" bgColor="#f0eff5" leftColor="#333" title="申请退款">
        </pub-head>
        <div class="msg flex ali-c" v-for="(refund,index) in refundData.list" :key="index">
            <div class="goods-img ali-c"><img :src="host+refund.img" alt=""></div>
            <div class="text-detail flex1">
                <div class="jus-b">
                    <div class="goods-name twoline">{{refund.item_name}}</div>
                </div>
                <div class="order-num jus-e">x{{refund.nums}}</div>
            </div>
        </div>

        <div class="refunding">
            <!-- 退款原因 -->
            <div class="van-hairline--bottom jus-b ali-c set-up" @click="refunds">
                <div class="ali-c">退款原因</div>
                
                 <div class="right flex">
                    <span>{{reason==''?'请选择':reason}}</span>
                    <div class="img"><img src="@/assets/user-menu-next.png" alt="" class="fill-auto"></div>
                </div>
            </div>
            <!-- 退款金额 -->
            <div class="van-hairline--bottom jus-b ali-c set-up">
                <div class="ali-c">退款金额：<span class="refund-price">￥{{refundData.totalprices}}</span></div>
                <div class="img"><img src="@/assets/user-menu-next.png" alt="" class="fill-auto"></div>
            </div>
            <!-- 退款说明 -->
            <div class="van-hairline--bottom jus-b ali-c set-up">
                <div class="ali-c">退款说明：<input type="text" placeholder="选填" v-model="explain"></div>
                <div class="img"><img src="@/assets/user-menu-next.png" alt="" class="fill-auto"></div>
            </div>
        </div>

        <!-- 空白 -->
        <section class="null-write"></section>
        <footer class="foot flexc" @click="submission">提交</footer>

        <!-- 选择退款原因 -->
        <van-popup v-model="isShow" position="bottom">
            <div class="van-pick">
               <h2 class="flexc ali-c">退款原因</h2>
               <ul class="paytype-list">
                    <li class="ali-c" 
                        v-for="(item, index) in columns" 
                        :key="index"
                        :class="{on:refundType == index}" 
                        @click="closeStates(index,item)"
                    >
                        <span class="flex1">{{item.title}}</span>
                        <span class="public-checkbox">
                            <input type="radio" name="pay_type" value="2">
                        </span>
                    </li>
                </ul>
                
           </div>
           <div class="btn-sure ali-c flexc" @click="sure()">确定</div>
        </van-popup>
    </div>
</template>

<script>
import head from '@/components/head/head.vue';
export default {
    name:'Refund',
    components: {
        'pub-head':head
    },
    data () {
        return {
            text:true,//head默认文字
            token:'DprCuAQois6jLlI',//固定假的token
            refundData:'',//数据
            order:'',//总价
            refundType:0,//索引初始值
            host:'http://101yi.cn/data/attachment/item/',//图片路径前缀
            isShow: false,//是否显示退款理由弹窗
            columns: [
                {title:'尺寸拍错/不喜欢/效果差'},
                {title:'质量问题'},
                {title:'材质/面料与商品描述不符'},
                {title:'大小尺寸与商品描述不符'},
                {title:'其他原因'}

            ],//退款理由
            reason: '',//退款理由存储
            explain:'',//退款说明
        }
    },
    created () {
        this.$api.order.refund({
            key:this.token,
            order_id:this.$route.query.id
            }).then(res => {
            console.log(res);
            this.refundData = res.data.order;
            this.order = res.data.order;
        })
    },
    methods: {
         // 退款理由
        refunds () {
            this.isShow=true;
        },
        // 切换货物状态
            closeStates (index,val) {
               this.refundType = index; 

            },
        sure () {
            this.reason = this.columns[this.refundType].title;
            this.isShow=false;
        },
        submission () {
            this.$api.order.placeOrder({
                key:this.token,
                order_id:this.$route.query.id,
                memos:this.reason,
                state:this.explain,
                amount:this.refundData.totalprices
            }).then(res => {
                this.$Tip('申请退款成功');
                this.$router.replace('/order/detail?id='+this.$route.query.id);
            }).catch(err => {
                this.$Tip('申请退款失败,请重试');
            })
        }
    }
    
}
</script>
<style lang="less" scoped>
@import url('../../style/mixin');
.refund {
    min-height: 100vh;  
}
    // 订单商品
    .msg {
        height: 2.4rem;
        padding: .2rem .3rem;
        margin:.28rem 0;
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
    .refunding {
        margin-top: .2rem;
        .set-up {
            height: 1.22rem;
            padding: 0 .3rem;
            font-size: .32rem; 
            color: #0d0d0d;
            .right {
                span {
                    font-size: .32rem;
                    color: #666;
                }
            }
            .img {
                width: .2rem;
                height: .36rem;
                margin-left: .3rem;
            }
            .refund-price {
                font-size: .36rem;
                color: @main-cor;
            }
            input {
                width: 6rem;
                height: 100%;
            }
        }
        
   }
//    底部
   .null-write {
        width: 100%;
        height: 2.74rem;

    }
    .foot {
        background-color: @main-cor;
        .fixedBottom(@height: 1.2rem, @index: 9);
        color: #fff;
        font-style: .36rem;
    }

    // 货物状态弹窗
        .van-pick {
            padding: 0 .28rem;
            background-color: #fff;
            h2 {
                height: 1.42rem;
                font-size: .36rem;
            }
            .paytype-list {
                background: #fff;
                padding: 0 .3rem;
                min-height: 3.14rem;
                li {
                    height: 1rem;
                    font-size: .28rem;
                    .pay-ico {
                        width: .4rem;
                        margin-right: .2rem;
                    }
                    border-bottom: 1px solid #dcdcdc;
                    .public-checkbox {
                        display: inline-block;
                        width: .34rem;
                        height: .34rem;
                        margin-right: .2rem;
                        border-radius: 100%;
                        background: url(../../assets/checkbox-ico0.png) no-repeat center;
                        background-size: 100% 100%;
                        input {
                            display: none;
                        }
                    }
                    

                }
                .on {
                    .public-checkbox {
                        background: url(../../assets/checkbox-ico1.png) no-repeat center;
                        background-size: 100% 100%;
                    }
                }
                .border-no {
                    border-bottom: none;
                }
            }
            
        }
        .btn-sure {
            height: 1rem;
            max-width: 750px;
            background-color: @main-cor;
            color: #fff;
            font-size: .32rem;
        }
</style>



