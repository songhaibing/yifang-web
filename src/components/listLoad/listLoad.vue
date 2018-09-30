<template>
    <div class="liu-list">
        <slot></slot>

        <!--加载中提示-->
        <div class="loading" v-show="loading">
            加载中...
            <!-- <div class="loader-inner line-scale-pulse-out">
                <div class="odd"></div>
                <div></div>
                <div class="odd"></div>
                <div></div>
                <div class="odd"></div>
            </div> -->
        </div>

        <!--到底了-->
        <section class="pub-bottom-tip" 
            :style="{color: finishedColor}"
            v-if="finished">{{finishedText}}</section>
    </div>    
</template>


<script>
    export default {
        name: 'List',

        model: {
            prop: 'loading'
        },

        props: {
            loading: Boolean,
            finished: Boolean,
            immediateCheck: {
                type: Boolean,
                default: true
            },
            offset: {
                type: Number,
                default: 300
            },
            finishedText: {
                type: String,
                default: '已经到底了'
            },
            finishedColor: {
                type: String,
                default: '#666'
            },
        },

        activated () {
            this._handler(true); 
        },

        mounted () {
            this.$nextTick( () => {
                this._handler(true);
                if (this.immediateCheck) {
                    this._scroll();
                }
            });
        },

        beforeDestroy () {
            this._handler(false);
        },

        deactivated () {
            this._handler(false);
        },

        methods: {

            _getClientHeight () {  
                let clientHeight = 0;  
                if(document.body.clientHeight && document.documentElement.clientHeight){  
                    clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
                }else{  
                    clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
                }  
                return clientHeight;  
            },

            _getScrollTop () {  
                var scrollTop = 0;  
                if(document.documentElement && document.documentElement.scrollTop) {  
                    scrollTop = document.documentElement.scrollTop;  
                }else if(document.body){  
                    scrollTop = document.body.scrollTop;  
                }  
                return scrollTop;  
            },

            _getScrollHeight () {  
                return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);  
            },

            // 计算距离，判断是否到底
            _scroll () {
                // loading期间和所有数据加完后不会继续触发load函数
                if (this.finished || this.loading) return;
                let height = this._getClientHeight(), // 窗口可视范围的高度
                    theight = this._getScrollTop(), // 窗口滚动条高度
                    rheight = this._getScrollHeight(), // 窗口可视范围的高度
                    reachBottom = rheight - theight - height < this.offset; // 滚动条距离底部的高度
                if (reachBottom) {
                    this.$emit('load');
                }
            },
            
            /**
             * 函数节流去抖
             * @param {Function} fn [要进行节流和去抖的函数]
             * @param {Number} delay [延迟执行的时间, ms]
             * @param {Number} duration [最小执行间隔，ms, 即执行一次fn函数的最小时间间隔]             
             * 注： 若事件一直触发，时间大于等于duration时，会每隔duration执行一次fn；否则事件触发后延迟delay时间执行。
            */
            _throttle (fn, delay, duration) {
                let timer = null;
                let start = new Date();    
                return function () {                
                    let current = new Date(); 
                    let args = arguments;       
                    timer && clearTimeout(timer);
                    if (current - start >= duration) {
                        fn.apply(this, args);
                        start = current;
                    } else {
                        timer = setTimeout(() => {
                            fn.apply(this, args);
                        }, delay);
                    }
                }
            },

            /**
             * 监听窗口滚动，绑定事件
             * @param {Boolean} bind [true:绑定事件， false:解绑事件]
             * 注：进行了函数节流和去抖优化。监听窗口滚动，若滚动时间大于
             * 
            */
            _handler (bind) {
                const scrollFun = this._throttle(this._scroll, 20, 200);
                if (bind == true) {
                    window.addEventListener('scroll', scrollFun, false)
                } else if (bind == false) {
                    window.removeEventListener('scroll', scrollFun, false)
                }
            }
        }
    }
</script>

<style lang="less" scoped>
@-webkit-keyframes line-scale-pulse-out {
    0% {
        -webkit-transform: scaley(1);
                transform: scaley(1); 
    }
    50% {
        -webkit-transform: scaley(0.4);
                transform: scaley(0.4); 
    }
    100% {
        -webkit-transform: scaley(1);
                transform: scaley(1); } 
    }
@keyframes line-scale-pulse-out {
    0% {
        -webkit-transform: scaley(1);
                transform: scaley(1); 
    }
    50% {
        -webkit-transform: scaley(0.4);
                transform: scaley(0.4); 
    }
    100% {
        -webkit-transform: scaley(1);
                transform: scaley(1); 
    } 
}
.loading {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem 0;
}
.line-scale-pulse-out {
    div {
        display: inline-block;
        width: 4px;
        height: 24px;
        border-radius: 2px;
        margin: 2px;
        -webkit-animation-fill-mode: both;
                animation-fill-mode: both;
        background-color: #fd604f;
        -webkit-animation: line-scale-pulse-out 0.6s 0s infinite cubic-bezier(.85, .25, .37, .85);
                animation: line-scale-pulse-out 0.6s 0s infinite cubic-bezier(.85, .25, .37, .85); 
        &:nth-child(2), &:nth-child(4) {
            -webkit-animation-delay: 0.2s !important;
                    animation-delay: 0.2s !important; 
        }
        &:nth-child(1), &:nth-child(5) {
            -webkit-animation-delay: 0.3s !important;
                    animation-delay: 0.3s !important;     
        }
        &.odd {
            background-color: #f2961e;
        }
    }
}
/*我也是有底线的样式*/
.pub-bottom-tip {
    width: 100%;
	padding: .3rem;
	text-align: center;
}
</style>
