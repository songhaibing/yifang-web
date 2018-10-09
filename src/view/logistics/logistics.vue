<template>
    <div class="logistics">
        <!-- 头部 -->
        <pub-head title="物流详情" :text="text" bgColor="#f0eff5">
        </pub-head>
        <!-- 快递类型 -->
        <div class="logistics-type">
            <div class="type">{{type.ShipperCode}}</div>
            <div class="order-num">物流订单号：{{type.LogisticCode}}</div>
        </div>
        <!-- 物流状态 -->
        <div class="state">
            <div class="list flex" v-for="(item,index) in traces" :key="index">
                <div class="time">{{item.AcceptTime}}</div>
                <div class="text-state flex1">
                    <h2>{{item.AcceptStation}}</h2>
                    <!-- <div class="logistics-text twoline">据估计跟它计划表计划更便捷好吧</div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import pubHead from '@/components/head/head.vue';
    export default {
        name:'Logistics',
        components: {
            pubHead,
        },
        data () {
            return {
                isShow:false,//弹框 默认不显示
                text:true,//头部文字显示
                type:{},//物流类型
                traces:[],//物流状态
                id:'',
            }
        },
        created () {
            this.$api.order.logistics({
                key:localStorage.getItem('access_token'),
                order_id: this.$route.query.id
            }).then(res => {
                this.type = res.data.list;
                this.traces = res.data.list.Traces.reverse();
            })
            // this.reverse();
        },
        methods: {
            // reverse () {
            //     this.traces.;
            // }
        }
    }
</script>

<style lang="less" scoped>
@import url('../../style/mixin');
    // 物流类型
   .logistics-type {
       width: 9.4rem;
       height: 2rem;
       background-color: @main-cor;
       border-radius: .2rem;
       padding-left: .4rem;
       margin: .4rem auto;
       .type {
           font-size: .48rem;
           line-height: 1rem;
           color: #fff;
       }
       .order-num {
           font-size: .3rem;
           color: #fff;
           line-height: .8rem;
       }
   }
//    物流状态
   .state {
       padding: .6rem .36rem;
       .time {
           width: 2rem;
           height: 1rem;
           font-size: .34rem;
           text-align: center;
           color: #555;
           line-height: .48rem;
       }
       .text-state {
           margin-left: 1rem;
           height: 2rem;
           h2 {
               font-size: .38rem;
               color: #333;
               line-height: .6rem;
           }
           .logistics-text {
               font-size: .3rem;
               line-height: .48rem;
               color: #666;
           }
       }
   }
   
</style>
