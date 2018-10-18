<template>
    <div class="address">
        <!-- 头部 -->
        <pub-head title="我的地址"  rightSize=".3rem" rightColor="#505050" :text="text">
            <div @click="addAddress">添加新地址</div>
        </pub-head>
        <div class="address-list jus-b ali-c" v-for="(address,index) in addressData" :key="index" @click="selectAddress(address)">
            <div class="content flex1">
                <div class="info flex ali-c">
                    <div class="name ali-c">{{address.shperson}}</div>
                    <div class="phone ali-c">{{address.mobile}}</div>
                </div>
                <div class="map twoline"><span v-if="address.status == 1">默认</span>{{address.province}} {{address.city}} {{address.county}} {{address.address}}</div>
            </div>
            <div class="edit van-hairline--left flexc" @click.stop="editAddress(address.id)">编辑</div>
        </div>
        
    </div>
</template>

<script>
import head from '@/components/head/head.vue';
import store from '@/api/model/store'
import state from '@/store'
export default {
    name:'Address',
    components: {
        'pub-head':head
    },
    data () {
        return {
             isShow:false,
             text:true,//头部文字显示    
             addressData:[],//地址列表数据   
        }
    },
    // 先获取数据再加载组件
    beforeRouteEnter (to, from, next) {
         store.myAddress({
            key: localStorage.getItem('access_token')
        }).then(res => {
            next( vm => {
                from.path === '/user/user' && (vm.fromUser = true);
                vm.addressData = res.data.list;
            })
        })
        
    },
    methods: {
       
        // 添加新地址
        addAddress () {
            this.$router.push('/address/newAddress?type=1');
        },
        // 编辑地址
        editAddress (id) {
            this.$router.push('/address/newAddress?type=2&addressId='+id);
        },
         /**
         * 选择收货地址
        */
        selectAddress (item) {
            this.addressSelected = item;
            // 点击收货地址时
            // 如果是从个人中心进入的，则不跳回，否则跳回
            // !this.fromUser && this.$router.go(-1);
            if (!this.fromUser) {
                sessionStorage.setItem('addressSelected', JSON.stringify(this.addressSelected));
                this.$router.go(-1);
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import url('../../style/mixin');
    .address-list {
        padding: .5rem .3rem;
        .content {
            height: 1.6rem;
            margin-left: 1rem;
            padding-right: .5rem;
            .info {
                height: .7rem;
                .name {

                }
                .phone {
                    height: 100%;

                    color: #b3b4b6;
                    margin-left: .4rem;
                }
            }
            .map {

                line-height: .5rem;
                // 默认
                span {
                    display: inline-block;
                    width: 1.08rem;
                    height: .5rem;
                    background-color: @main-cor;
                    color: #fff;
                    text-align: center;
                    line-height: .5rem;
                    margin-right: .2rem;
                }
            }
        }
        .edit {
            width: 1.28rem;
            height: .7rem;
            color: #b4b5b7;

        }
    }
</style>

