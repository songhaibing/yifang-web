<template>
    <div class="new-address">
        <!-- 头部 -->
    <form @submit.prevent="checkData">
        <pub-head title="我的地址"  rightSize=".3rem" rightColor="#505050" :text="text">
            <input type="submit" name="" value="保存" class="pub-btn-danger"/>
        </pub-head>
        <!-- 收货人 -->
        <div class="van-hairline--bottom jus-b ali-c edit-address" @click="modify(0)">
            <div class="ali-c flex">
                <div class="user">收货人</div>
                <div class="name">{{info.consignee}}</div>
            </div>
            <div class="img"><img src="@/assets/user-menu-next.png" alt="" class="fill-auto"></div>
        </div>
        <!-- 手机号码 -->
        <div class="van-hairline--bottom jus-b ali-c edit-address" @click="modify(1)">
            <div class="ali-c flex">
                <div class="user">手机号码</div>
                <div class="name">{{info.phone}}</div>
            </div>
            <div class="img"><img src="@/assets/user-menu-next.png" alt="" class="fill-auto"></div>
        </div>
        <!-- 所在地区 -->
        <div class="van-hairline--bottom jus-b ali-c edit-address" @click="onAddress">
            <div class="ali-c flex">
                <label for="" class="user">省/市/区</label>
                <input type="text" class="flex1 sectec-city jus-e name" placeholder="请选择" readonly v-model="area"/>
            </div>
            <div class="img"><img src="@/assets/user-menu-next.png" alt="" class="fill-auto"></div>
        </div>
        <!-- 详细地址 -->
        <div class="full-address flex">
            <div class="ali-c">详细地址：</div>
            <input type="text" class="detail flex1" placeholder="如道路、门牌号、小区、楼栋号、单元室等" v-model="info.detail">
        </div>
        <div class="set"></div>
        <div class="jus-b ali-c van-hairline--bottom info">
            <div>设为默认地址</div>
            <div><van-switch v-model="checked" size="32px" :change="isDefault(checked)" /></div>
        </div>
        <div class="set"></div>
        <div class="del ali-c" @click="deletes" v-if="type == 2">删除收货地址</div>
        <popop :isShow="isDelete" cancel="取消" sure="确定删除" :onCancel="noDelete" :onSure="onConfirm"></popop>
        <!-- 这里点击编辑弹出框输入，和个人设置类似 -->

        <van-popup v-model="isAddress" position="bottom">
            <van-area :area-list="areaList" title="选择地区" value="360104" @confirm="selectArea" @cancel="onAddress"/>
        </van-popup>

         <!-- 修改/增加地址弹框 -->
        <van-popup 
            v-model="isShow"
            class="popup-radius"
        >
            <div class="modify-box">
                <!-- 收货人 -->
                <input type="text" v-model="info.consignee" class="text-infor ali-c" v-if="index ==0">
                <!-- 手机号 -->
                <input type="text" v-model="info.phone" class="text-infor ali-c" v-if="index ==1">
                <!-- 详细地址 -->
                <!-- <input type="text" v-model="address" class="text-infor ali-c" v-if="index ==3"> -->
                <div class="jus-b btn">
                    <div @click="cencelEite" class="cancel flexc">取消</div>                
                    <div @click="onSure" class="sure flexc">确定</div>
                </div>
            </div>
        </van-popup> 
    </form>
    </div>
</template>
    
<script>
import head from '@/components/head/head.vue';
import popop from '@/components/delPopup/delPopup.vue'
import areaList from './areaList';
import { u_Reg } from '@/config/utils';
export default {
    name:'NewAddress',
    components: {
        'pub-head':head,
        popop
    },
    data () {
        return {
            // 提交信息 
            info: {
                consignee: '',//收货人
                phone: '', //电话
                province: '', //省
                city: '',//市
                country: '', //区/县
                detail: '',//详细地址
                status: 0 //默认设置为默认地址
            }, 
             value: '' ,  //选着地址初始化为空
             isShow:false,
             isDelete:false,//删除地址弹出框
             checked: false,//是否选中开关默认
             text:true,//头部文字显示
             isAddress:false , //选择地址默认不显示
             isShow: false,  // 信息弹窗显示隐藏状态
             areaList: areaList, // 省市区插件数据
             index: '',//索引值
             type:'', //类型，，1新增地址，2编辑地址
        }
    },
    created () {
        this.type = this.$route.query.type;
        
        if(this.type == 2) {
            this.$Loading('加载中');
            this.$api.store.editAddress({
                key: localStorage.getItem('access_token'),
                address_id:this.$route.query.addressId
            }).then(res =>{
                this.info.consignee = res.data.list.shperson;
                this.info.phone = res.data.list.mobile;
                this.info.province = res.data.list.province;
                this.info.city = res.data.list.city;
                this.info.country = res.data.list.county;
                this.info.detail = res.data.list.address;
                this.$toast.clear();
            })
        }
    },
    computed: {
        // 省市区
        area () {
            return `${this.info.province} ${this.info.city} ${this.info.country}`
        }
    },
    methods: {
       
        // 取消
        cancel () {
            this.setClose = true;
            this.isShow = false;
        },
         // 点击删除弹出框
        deletes () {
            this.isDelete = true;
        },
        // 确认删除
        onConfirm () {
            console.log(5555);
            this.isDelete = false;
            this.$api.store.delAddress({
                key: localStorage.getItem('access_token'),
                address_id:this.$route.query.addressId
            }).then(res => {
                
                this.$Loading('删除中');
                this.$toast.clear();
                this.$Tip('删除成功');
                setTimeout(() => {
                    this.$router.go(-1)
                }, 1000);
            })
        },
        // 取消删除
        noDelete () {
            this.isDelete = false;
        },
         // 修改资料调用弹出框
        modify (page) {
            this.index = page;
            this.isShow = true;
        },
        /**
         * 显示省市区弹窗
        */
        onAddress () {
            this.isAddress = !this.isAddress
        },
        /**
         * 省市区-点击确定
         * 获取选中的省市区名称
        */
        selectArea (e) {
            this.isAddress = !this.isAddress;
            this.info.province = e[0].name; 
            this.info.city = e[1].name; 
            this.info.country = e[2].name ; 
        },
        // 隐藏弹框
        onSure () {
            this.isShow = false;
        },
        // 取消编辑
        cencelEite () {
            this.isShow = false;
            this.index === 0 ? this.info.consignee = '' : this.info.phone = '';
        },
        // 是否选择默认地址
        isDefault (checked) {
            checked ? this.info.status = 1 : this.info.status = 0;
        },
        /**
         * 检测提交的数据
        */
        async checkData (e) {
            const data = this.info;
            if (!u_Reg(data.consignee, 'notEmpty')) {
                this.$Tip('请填写收货人姓名');
                return;
            }
            if (!u_Reg(data.phone, 'notEmpty')) {
                this.$Tip('请填写收货人手机号');
                return;
            }
            if (!u_Reg(data.phone, 'phone')) {
                this.$Tip('手机号格式错误');
                return;
            }
            if (!u_Reg(data.province, 'notEmpty') || data.province == '选择省份') {
                this.$Tip('请选择省市区');
                return;
            }
            if (data.city == '选择城市') {
                this.$Tip('请选择城市');
                return;
            }
            if (data.country == '选择地区') {
                this.$Tip('请选择地区');
                return;
            }
            if (!u_Reg(data.detail, 'notEmpty')) {
                this.$Tip('请填写详细地址');
                return;
            }
            // 提交数据
           this.submitData(this.info,this.type == 1 ? this.$api.store.addAddress : this.$api.store.confirmAddress);
        },
        /*** 编辑地址信息 ***/
        

        /**
         * 提交数据
        */
        submitData (address,type) {
            this.$Loading('地址修改中');
            type({
                key:  localStorage.getItem('access_token'),
                shperson: address.consignee,
                mobile: address.phone,
                province: address.province,
                city: address.city,
                county: address.country,
                address: address.detail,
                status: address.status,
                id:this.$route.query.addressId
            }).then(res => {
                this.$toast.clear();
                this.$Tip(this.type== 1 ? '新增地址成功' : '修改成功');
                setTimeout(() => {
                    this.$router.go(-1)
                }, 1500);
            })
        },
    }
}
</script>

<style lang="less" scoped>
@import url('../../style/mixin');
.new-address {
    min-height: 100vh;
    .pub-btn-danger{
        width: 100%;
        height: 1.1rem;
        background-color: #fff;
        border-radius: 0.08rem;
        color: #333;
        font-size: 0.4rem;
        text-align: center;
        line-height: 1.1rem;
    }
    .edit-address {
        height: 1.22rem;
        padding: 0 .3rem;
        font-size: .32rem; 
        color: #0d0d0d;
        background-color: #fff;
        .user {
            color: #7f7f7f;
        }
        .name {
            display: block;
            margin-left: .3rem;
        }
        .img {
            width: .14rem;
            height: .24rem;
        }
    }
    .full-address {
        height: 1.8rem;
        padding: .3rem;
        font-size: .38rem;
        color: #7f7f7f;
        .detail {
            color: #333;
            display: block;
        }
    }
    .set {
        height: .54rem;
        background-color: @pub-bg;
    }
    // 设置默认
    .info {
        height: 1.2rem;
        font-size: .36rem;
        color: #333;
        padding: 0 .3rem;
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
    .del {
        height: 1rem;
        padding-left: .3rem;
        font-size: .36rem;
        color: @main-cor;
    }
    // 修改地址弹出框
    .popup-radius {
        .border-radius(.1rem);
    }
    .modify-box {
        overflow: hidden;
        width: 8.5rem;
        height: 4.44rem;
        margin: 0 auto;
        background-color: #ebebeb;
        .text-infor {
            display: block;
            width: 5.4rem;
            height: 1rem;
            margin: 1rem auto;
            background-color: #fff;
            font-size: .3rem;
            color: #555;
            padding-left: .3rem;
            .border-radius(.16rem);
        }
        .btn {
            width: 5.4rem;
            height: 1rem;
            margin: 0 auto;
            .flexc {
                width: 2.6rem;
                font-size: .3rem;
                color: #fff;
                .border-radius(.16rem);
                &.cancel {
                    background-color: #959595;
                }
                &.sure {
                    background-color: @main-cor;
                }
            }
        }
    }
}
</style>

<style>
/* 改按钮华快样式 */
.new-address .van-switch--on {
    background-color: #dd1260;
}
</style>

