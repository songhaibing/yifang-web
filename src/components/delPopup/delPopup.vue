<template>
    <div>
         <!-- 删除弹框 -->
        <van-popup 
            v-model="isShow"
            class="popup-radius"
        >
            <div class="modify-box ali-c">
                <div class="jus-b btn">
                    <div @click="onCancel" class="cancel flexc">{{cancel}}</div>                
                    <div @click="onSure" class="sure flexc">{{sure}}</div>
                </div>
            </div>
        </van-popup> 
    </div>
</template>
<script>
    export default {
        props: {
            isShow: Boolean,
            sure:String,
            cancel:String,
            onSure:Function,
            onCancel:Function,
        }
    }
</script>

<style lang="less" scoped>
 @import url('../../style/mixin');
    // 删除弹出框
    .popup-radius {
        .border-radius(.1rem);
    }
    .modify-box {
        overflow: hidden;
        width: 6rem;
        height: 3.04rem;
        margin: 0 auto;
        background-color: #ebebeb;
        .btn {
            width: 5.4rem;
            height: 1rem;
            margin: 0 auto;
            .flexc {
                width: 2.6rem;
              font-size: .3rem;
                color: #fff;
                .border-radius(.16rem);
                background-color: #959595;
                &.sure {
                    background-color: @main-cor;
                }
            }
        }
    }
</style>
