<template>
    <div class="collection">
        <!-- 头部 -->
        <pub-head title="收藏栏"  rightSize=".3rem" rightColor="#505050" :text="text">
            <div @click="admincoll">管理</div>
        </pub-head>
        <!-- 分类tab -->
        <div class="coll-tab jus-e ali-c van-hairline--bottom">
            <div class="tab ali-c" v-for="(tab,index) in tabs" :key="index" :class="{on:nowindex == tab.type}" @click="tabchange(index,tab.type)">{{tab.title}}</div>
        </div>
        <!-- 收藏列表 -->
        <!-- 订单列表 -->
        <list
                v-model="loading"
                :finished="finished"
                :immediate-check="false"
                finished-color="#777"
                finished-text='已经到底了'
                @load="onLoad"
            >
            <div class="collection-list flex" v-for="(items,index) in collectionData" :key="index">
                <div class="left-img"></div>
                <div class="van-hairline--bottom ali-c collection-item flex1 jus-b">
                    <div class="flex ali-c">
                        <!--<router-link to="/collection/detail" class="jus-b ciem ali-c">-->
                            <!--<p class="oneline">{{items.title}}</p>-->
                        <!--</router-link>-->
                      <div @click="jump(items.item_id)" class="jus-b ciem ali-c">
                      <p class="oneline">{{items.title}}</p>
                      </div>
                    </div>
                    <!-- 管理选项 -->
                    <div class="cir-ico" :class="{on:items.isSelect}" @click="admincollection(index)" v-if="setClose == false"></div>
                </div>
            </div>
        </list>
         <!-- 空白 -->
        <section class="null-write"></section>
        <footer class="foot jus-b ali-c" v-if="setClose == false">
            <div class="all-check flex"><div class="cir-ico" :class="{on:isSelectAll}" @click="allCheck"></div><div class="all-text">全选</div></div>
            <div class="flex">
                <div class="cancel btn flexc" @click="cancel">取消</div>
                <div class="del btn flexc" @click="deletes">删除(1)</div>
            </div>
        </footer>
        <popop :isShow="isShow" cancel="取消" sure="确定" :onCancel="cancel" :onSure="confirmDel"></popop>
    </div>
</template>

<script>
import head from '@/components/head/head.vue';
import popop from '@/components/delPopup/delPopup.vue'
import list from '@/components/listLoad/listLoad';
export default {
    name:'collection',
    components: {
        'pub-head':head,
        popop,
        list
    },
    data () {
        return {
            setClose:true,//显示非管理消息
            isSelectAll:false,//默认不选中
            isShow:false,
            checkNum:0,//删除选项索引
            text:true,//头部文字显示 
            tabs:[
                {title:'阅读',type:1},
                {title:'商品',type:2}
            ],
            nowindex:0,
            page:0,  //加载页数
            loading: false,
            finished: false,  
            collectionData:[],//收藏数据列表
        }   
    },
    activated () {
        // isUseCache为false才重新刷新获取数据
        // 因为对list使用keep-alive来缓存组件，所以默认是会使用缓存数据的         
        if(!this.$route.meta.isUseCache){            
            
            this.collectionData = [];
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
        jump(id){
          if(this.$route.params.type == 1){
            console.log(id)
            this.$router.push({
              path: `/collection/detail/${id}`,
            })
          }else {
            this.$router.push({
              path: `/collection/commodity/${id}`,
            })
          }

        },
        onLoad () {
            this.loading = true;
            this.page ++;
            this.nowindex = this.$route.params.type;
            this.getData(this.nowindex);
        },
        // 获取数据函数
        getData (type) {
            this.$api.store.collect({        
                page: this.page,
                size: 15,
                key:localStorage.getItem('access_token'),
                type:type
            }).then(res=> {
                console.log(res.data);
                this.loading = false;
                // 循环是否选中
                let nowList = res.data.collect;
                nowList.forEach(item => item.isSelect = false);
                // 更新列表数据
                this.collectionData = [...this.collectionData, ...nowList];
                // 判断返回的数据是否为空
                this.page == 1 && (this.collectionData.length == 0);
                this.finished = res.data.collect.length < 15;
                console.log(this.collectionData);
            }) 
        },
        // 管理消息
        admincoll () {
            this.setClose = false;
        },
        // 取消
        cancel () {
            this.setClose = true;
            this.isShow = false;
        },
        // 点击弹出删除框
        deletes () {
            this.isShow = true;
        },
        // 弹出框点击删除
        confirmDel () {
            if (!this.checkIsSelectSomeone()) {
                this.$Tip('请选择要删除的文章或商品');
                this.isShow = false;
                return;
            }
            // 获取要删除商品的id
            let delArr = []; // 需要删除的id数组
            let leftArr = []; // 剩下的商品数组
            // 区分待删除商品和剩下的商品
            this.collectionData.forEach(item => item.isSelect ? delArr.push(item.id) : leftArr.push(item));
            console.log(delArr.join(','));
           //提交删除数据
            this.$api.store.delCollect({
                key:localStorage.getItem('access_token'),
                id: delArr.join(',')
            }).then(res => {
                this.$Tip('删除成功');
                this.collectionData = [...leftArr];
            }).catch(res => {
                    this.$Tip('操作失败');
            });
            this.setClose = true;
            this.isShow = false;
        },
         // 切换tab栏
        tabchange(index, tab) {
            this.nowindex = tab;
            this.collectionData = []; // 清空原有数据
            this.page = 1;
            this.loading = true;
            // 分类的切换
            this.$router.replace('/collection/collection/'+tab);
            this.getData(tab);
        },
        // 选择单个商品
        admincollection(index) {
            // 选中或者取消选中
            this.collectionData[index].isSelect = !this.collectionData[index].isSelect;
            // 判断是否选中所有商品
            this.isSelectAll = this.checkIsSelectAll();
        },

        // 全选取消全选
        allCheck () {
            this.collectionData.forEach(item => {
                item.isSelect = !this.isSelectAll;
            });
            this.isSelectAll = !this.isSelectAll;
        },
        // 检测是否选中了全部商品
        checkIsSelectAll () {
            return this.collectionData.every(item => item.isSelect);
        },

        // 检测是否选中了商品
        checkIsSelectSomeone () {
            return this.collectionData.some(item => item.isSelect);
        },
        
    }
}
</script>

<style lang="less" scoped>
@import url('../../style/mixin');
    .coll-tab {
        height: 1.2rem;
        background-color: #f2f2f2;
        .tab {
            font-size: .36rem;
            color: #505050;
            margin-right: .7rem;
            height: .6rem;
            &.on {
                border-bottom: 1px solid #505050;
            }
        }
    }
    
    .collection-list {
        .left-img {
            width: 1.2rem;
            height: 1.22rem;
            background: url(~@/assets/collection-ico.png) no-repeat center;
            .bg-size(.56rem,.64rem);
        }
        .collection-item {
            height: 1.22rem;
            font-size: .36rem;
            padding-right: .3rem;
            .oneline {
                width: 5.8rem;
                color: #0d0d0d;
                margin-left: .2rem;
            }
            
            .img {
                width: .2rem;
                height: .36rem;
            }
        
        }
    }
    // 管理选项切换圆
    .cir-ico {
        width: .46rem;
        height: .46rem;
        background: url(~@/assets/cir.png) no-repeat;
        .bg-size(.46rem,.46rem);
        &.on {
            background: url(~@/assets/cir-on.png) no-repeat;
            .bg-size(.46rem,.46rem);
        }
    }
    // 底部
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
    }


</style>

