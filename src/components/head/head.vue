<template>
    <header class="pub-head">
        <div class="head-box" v-bind:style="{backgroundColor: bgColor}" :class="{'head-ragy':themeColor=='true','van-hairline--bottom':isBorder=='true'}">
            <div class="left" @click="back">
                <span class="line line1" :style="{backgroundColor: leftColor}"></span>
                <span class="line line2" :style="{backgroundColor: leftColor}"></span>
            </div>
            <div class="title flexc" :style="{color: titleColor}" v-if="text">{{title}}</div>
            <div class="title flexc" v-else><slot name="imgs"></slot></div>
            <div class="right flexc" :style="{color: rightColor, fontSize: rightSize}">
                <slot></slot>
            </div>
        </div>
    </header>
</template>

<script>
export default {
     data () {
        return {
            bgcor: this.bgColor
        }
    },
    
    props: {
        // 头部标题
        title: {
            type: String,
            default: '标题'
        },
        titleColor: {
            type: String,
            default: '#333'
        },
        // 头部背景色
        bgColor: {
            type: String,
            default: '#fff'
        },
        bgchange: {

        },
        // 头部主题色
        themeColor: {
            type: String,
            default: 'false'
        },
        // 左边图标颜色
        leftColor: {
            type: String,
            default: '#333'
        },
        // 右边文字尺寸
        rightSize: {
            type: String,
            default: '0.26rem'
        },
        // 右边文字颜色
        rightColor: {
            type: String,
            default: '#333'
        },
        // 边框
        isBorder: {
            type: String,
            default: 'true'
        },
        text: {
            type:Boolean
        }
    },

    methods: {
        // 返回上一页
        back() {
            //如果是从删除或取消订单操作跳转的路径减2
            if (this.$route.query.ref == 1) {
                this.$router.go(-2);
            } else {
                this.$router.go(-1);
            }
            
        }
    }
}
</script>

<style lang="less" scoped>
 @import url('../../style/mixin');
    .pub-head {
        width: 100%;
        height: 1.1rem;
        .head-box {
            position: fixed;
            top: 0;
            width: 100%;
            max-width: 1000px;
            height: 1.1rem;
            z-index: 9;
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
                     -moz-transform: rotate(-45deg);
                    -webkit-transform: rotate(-45deg);
                    transform: rotate(-45deg);
                }
                .line2 {
                    margin-top: 0.08rem;
                    -moz-transform: rotate(45deg);
                    -webkit-transform: rotate(45deg);
                    transform: rotate(45deg);
                }
            }
            .title {
                height: 100%;
                font-size: 0.42rem;
            }
            .right {
                position: absolute;
                right: 0;
                top: 0;
                height: 1.1rem;
                padding: 0 .25rem;
            }
        }
        // 主题色
        .head-ragy {
            background-color: #f0eff5;
        }
        .seat {
            height: 1.1rem;
        }    
    }
</style>


