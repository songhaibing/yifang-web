<template>
    <div class="shop-car">
        <!-- 头部 -->
        <pub-head title="购物车"  rightSize=".3rem" rightColor="#505050" :text="text">
            <div @click="adminShop">管理</div>
        </pub-head>
       <ul class="shop-car-list">
           <li class="goods ali-c flex" v-for="(item,index) in cartData" :key="index">
               <div class="cir-ico" :class="{on:item.isSelect}" @click="closeShop(index)" v-if="item.status == 1"></div>
               <div class="goods-img"><img :src="host+item.img" alt="" class="fill"></div>
               <div class="goods-text flex1">
                   <div class="title">{{item.title}}</div>
                   <div class="jus-b goods-num">
                       <div class="price">￥{{item.price}}</div>
                       <van-stepper  
                            v-if="item.status == 1" 
                            class="number-box ali-c"
                            v-model="item.nums"
                            :disable-input="true"
                            @plus="addReduce(1,index,item.id)" 
                            @minus="addReduce(2,index,item.id)"
                            @overlimit="overLimit(item.nums)"
                        />
                       <div class="overdue" v-else>该商品已失效~</div>
                   </div>
               </div>
           </li>
       </ul>

        <!-- 空白 -->
        <section class="seat-foot"></section>
        <footer class="foot jus-b ali-c" v-if="setClose">
            <div class="all-check flex"><div class="cir-ico" :class="{on:isSelectAll}" @click="allCheck"></div><div class="all-text">全选</div></div>
            <div class="flex">
                <div class="cancel btn flexc" @click="cancelDelCart">取消</div>
                <div class="del btn flexc" @click="deletes">删除({{getTotalNumSelected}})</div>
            </div>
        </footer>
        <footer class="foot jus-b ali-c" v-if="!setClose">
            <div class="all-check flex"><div class="cir-ico" :class="{on:isSelectAll}" @click="allCheck"></div><div class="all-text">全选</div></div>
            <div class="flex">
                <div class="shop-sum ali-c">合计： <span>￥{{getTotalPrice | fixed2}}</span></div>
                <div class="del btn flexc" @click="confirmOrderCar">结算({{getTotalNumSelected}})</div>
            </div>
        </footer>
        <!-- 删除弹框提示 -->
        <popop :isShow="isShow" cancel="取消" sure="确认" :onCancel="cancel" :onSure="confirmCar"></popop>
    </div>
</template>

<script>
import head from '@/components/head/head.vue';
import popop from '@/components/delPopup/delPopup.vue'
import { u_fixed } from '@/config/utils'
    export default {
        name:'ShopCar',
        components: {
        'pub-head':head,
        popop
        },
        data () {
            return {
                isShow:false,//弹框 默认不显示
                text:true,//头部文字显示
                setClose:false,//默认不管理删除商品
                cartData:[],//购物车列表
                isSelectAll:false,//默认不选中
                host:'http://101yi.cn/data/attachment/item/',//图片路径前缀
            }
        },
        created () {
           this.getData();
        },
        filters: {
            // 保留有两位小数
            fixed2 (val) {
                return u_fixed(val);
            }
        },
        computed: {
            // 计算总价格
            getTotalPrice () {
                let price = 0;
                this.cartData.forEach(item => {
                    item.isSelect && (price += item.price * item.nums);
                })
                return price;
            },
            // 获取选中商品总数
            getTotalNumSelected () {
                let num = 0;
                this.cartData.forEach(item => {
                    item.isSelect && (num ++);
                })
                return num;
            }
        },
        methods: {
            // 获取数据函数
            getData () {
                this.$Loading('加载中');
                this.$api.store.cartList({
                    key:this.$store.state.token,
                }).then(res => {
                    let nowList = res.data.cart;
                    nowList.forEach(item => item.isSelect = false);
                    this.cartData = nowList;
                    this.$toast.clear();
                }).catch(res => {
                    this.$toast.clear();
                    this.$Tip('操作失败，请刷新重试');
                });
            },
            // 管理
            adminShop () {
                this.setClose = !this.setClose;
            },
            // 取消 管理删除
            cancelDelCart () {
                this.setClose = !this.setClose;
            },
            // 取消
            cancel () {
                this.setClose = true;
                this.isShow = false;
            },
            // 点击删除弹出框
            deletes () {
                if (!this.checkIsSelectSomeone()) {
                    this.$Tip('请选择要删除的商品');
                    return;
                }
                this.isShow = true;
            },
            // 删除操作
            confirmCar () {
                // 获取要删除商品的id
                let delArr = []; // 需要删除的id数组
                let leftArr = []; // 剩下的商品数组
                // 区分待删除商品和剩下的商品
                this.cartData.forEach(item => item.isSelect ? delArr.push(item.id) : leftArr.push(item));
                //提交删除数据
                this.$api.store.delcartList({
                    key: this.$store.state.token,
                    id: delArr.join(',')
                }).then(res => {
                    this.$Tip('删除成功');
                    this.cartData = [...leftArr];
                }).catch(res => {
                    this.$Tip('操作失败');
                });
                this.isShow = false;
            },
            //增减商品数量
            addReduce(type, index, id) {
                this.$api.store.reduceCar({
                    key:this.$store.state.token,
                    type: type,
                    cart_id: id
                }).then((res)=>{
                    
                }).catch(err => {
                    // 增加或者减少数量操作失败时，恢复原来数量
                    // 增加
                    this.$Tip('请重试');
                    if (type == 1) {
                        this.list[index].nums --;
                    } else if (type == 2) {
                        // 减少
                        this.list[index].nums ++;
                    }
                })
            },
            overLimit(num) {
                if (num == 1) {
                    this.$Tip('不能再少了');
                } else {
                    this.$Tip('库存不足');
                }
            },
            // 全选取消全选
            allCheck () {
                this.cartData.forEach(item => {
                    item.isSelect = !this.isSelectAll;
                });
                this.isSelectAll = !this.isSelectAll;
            },
            // 选择单个商品
            closeShop(index) {
                // 选中或者取消选中
                this.cartData[index].isSelect = !this.cartData[index].isSelect;
                // 判断是否选中所有商品
                this.isSelectAll = this.checkIsSelectAll();
            },
            // 检测是否选中了商品
            checkIsSelectSomeone () {
                return this.cartData.some(item => item.isSelect);
            },
             // 检测是否选中了全部商品
            checkIsSelectAll () {
                return this.cartData.every(item => item.isSelect);
            },
            // 提交订单
            confirmOrderCar () {
                if (!this.checkIsSelectSomeone()) {
                    this.$Tip('请选择要结算的商品');
                    return;
                }
                // 获取购物车选中商品的id
                const ids = [];
                this.cartData.forEach(item => {
                    item.isSelect && ids.push(item.id);
                });
                this.$router.push({
                    path: '/PlaceOrder/PlaceOrder',
                    query: {
                        type: "1", //类型1为购物车提交2为直接购物
                        cart_id: ids.join(',')
                    }
                });
            },
        }
    }
</script>

<style lang="less" scoped>
@import url('../../style/mixin');
 .shop-car {
     background-color: @pub-bg;
     min-height: 100vh;
     // 管理选项切换圆
    .cir-ico {
        width: .46rem;
        height: .46rem;
        margin-left: .3rem;
        background: url(~@/assets/cir.png) no-repeat;
        .bg-size(.46rem,.46rem);
        &.on {
            background: url(~@/assets/cir-on.png) no-repeat;
            .bg-size(.46rem,.46rem);
        }
    }
     .goods {
         height: 3.3rem;
         background-color: #fff;
         margin: .2rem .3rem;
         border-radius: .2rem;
        .goods-img {
            width: 2.5rem;
            height: 2.5rem;
            margin-left: .3rem;
            border-radius: .3rem;
        }
        .goods-text {
            height: 2.5rem;
            margin-left: .3rem;
            .title {
                font-size: .36rem;
                color: #333;
                margin-top: .2rem;
            }
            .goods-num {
                margin-top: .8rem;
                .price {
                    font-size: .42rem;
                    color: #333;
                }
                .goods-number {
                    width: 2.2rem;
                    height: .6rem;
                    border-radius: .2rem;
                    border: 1px solid #999;
                    margin-right: .3rem;
                    .btn {
                        width: .6rem;
                        height: 100%;
                    }
                }
                .van-stepper /deep/{
                    margin-right: .3rem;
                }
                .van-stepper /deep/ .van-stepper__minus,.van-stepper /deep/ .van-stepper__plus {
                    width: .54rem;
                    height: .4rem;
                }
                .van-stepper /deep/ .van-stepper__input {
                    width: .5rem;
                    height: .36rem;
                    font-size: .32rem;
                    color: #333;
                    background-color: transparent;
                }
                .overdue {
                    font-size: .32rem;
                    color: #999;
                    margin-right: .3rem;
                }
            }
        }
    }
    // 底部
    .seat-foot {
        height: 1.5rem;
    }
    .foot {
        background-color: #fff;
        .fixedBottom(@height: 1.5rem, @index: 9);
        .btn {
            width: 2rem;
            height: .8rem;
            .border-radius(.8rem);
            font-size: .36rem;
            &.cancel {
                color: #fff;
                background-color: #aaa;
            }
            &.del {
                color: #fff;
                background-color: @main-cor;
                margin-left: .26rem; 
                margin-right: .48rem;
            }
        }
        .all-check {
            font-size: .3rem;
            color: #333;
            padding-left: .3rem;
            .all-text {
                margin-left: .1rem;
            }
        }
        .shop-sum {
            font-size: .36rem;
            span {
                color: @main-cor;
            }
        }
    }
 }
</style>

