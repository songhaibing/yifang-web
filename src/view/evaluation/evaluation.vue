<template>
    <div class="evalution">
        <!-- 头部 -->
        <pub-head title="发表评价"  rightSize=".3rem" rightColor="#dd1260" :text="text" bgColor="#f0eff5">
            <div @click="subEvaluate">发布</div>
        </pub-head>
        <!-- 产品打分 -->
        <div class="eva-stars van-hairline--bottom flex ali-c">
            <div class="goods-img "><img :src="host+data.img" alt="" class="fill"></div>
            <div class="text">产品打分</div>
            <van-rate v-model="score" void-color="#bfbfbf" color="#dd1260"/>
        </div>
        <!-- 宝贝评价 -->
        <section class="baby-evaluation">
            <div class="evaluation-box">
                <textarea name="" id="" cols="30" rows="10" placeholder="宝贝满足你的期待吗？请说说吧" v-model="reciew"></textarea>
                <div class="evaluation-imgs flex-wrap">
                    <!--上传的图片列表-->
                    <div class="item" v-for="(item, Imgindex) in imgList" :key="Imgindex">
                        <img :src="item" alt="" class="fill">
                        <i class="close-btn flexc" @click="deleteImg(Imgindex)">x</i>
                    </div>
                
                </div>
                <!--上传按钮-->
                <div class="upload item">
                    <van-uploader class="fill" :after-read="onImgSelecet"></van-uploader>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import pubHead from '@/components/head/head.vue';
export default {
    name:'Evalution',
    components: {
        pubHead
    },
    data () {
        return {
             isShow:false,
             text:true,//头部文字显示  
            score: 5,//默认五星好评     
            reciew:'',//评价内容
            imgList:[],//评论图片
            data:'',//评价详情数据
            submitData: [], // 用于提交的商品数据，商品数据可以多个
            host:'http://101yi.cn/data/attachment/item/',//图片路径前缀
        }
    },

    created () {
         this.$toast.loading({
            mask: true,
            duration:0,
            message: '加载中...'
        });
         // 获取信息
        this.$api.order.evaluate({
            key: localStorage.getItem('access_token'),
            order_id: this.$route.query.id
        }).then(res => {
            
            this.data = res.data.list;
            this.$toast.clear();
            console.log(res.data);
        })
       
    },

    methods: {
         // 选择上传图片
          onImgSelecet (file) {
              console.log(file);
                // 最多上传9张图
                if (this.imgList.length >= 9) {
                    this.$Tip('最多添加9张图片哦');
                    return;
                }
                this.$Loading('图片上传中');
                let param = new FormData(); //创建form对象
                param.append('images', file.file, file.file.name);//通过append向form对象添加数据
                console.log(param);
                this.$api.store.upload(param).then(res=> {
                    // console.log(res);
                    if (res.status === 1) {
                        this.imgList.push(file.content);
                        let imgSrc = this.$store.state.uploadImg + res.data.result[0].save_path + res.data.result[0].save_name;
                        this.submitData.push(imgSrc);
                        this.$toast.clear();
                    } else {
                        this.$Tip('图片上传失败，请重试');
                    }
                })
            },
            // 删除选中的图片
            deleteImg (i) {
                this.imgList.splice(i, 1);
                this.submitData.splice(i, 1);
            },
            // 提交评价
            subEvaluate () {
                const isWriteFinish = this.reciew !== '';
                if (!isWriteFinish) {
                    this.$Tip('请填写评论内容');
                    return;
                }
                this.$Loading('发布中');
                this.$api.order.placeEvaluate({
                    key: localStorage.getItem('access_token'),
                    item_id:this.data.item_id,
                    order_id: this.$route.query.id,
                    xx:this.score,
                    conntent:this.reciew,
                    img:this.submitData.join(','),
                }).then(res => {
                    this.$toast.clear();
                    this.$router.replace('/evaluation/success?id='+this.$route.query.id);
                }).catch(err => {
                    this.$Tip('评价失败');
                })
            }

    }
}
</script>

<style lang="less" scoped>
@import url('../../style/mixin');
    .eva-stars {
        height: 2.4rem;
        padding: .3rem;
        .goods-img {
            width: 1.8rem;
            height: 1.8rem;
        }
        .text {
            color: #333;
            margin: 0 1rem;
        }
    }
    // 宝贝评价
    .baby-evaluation {
        padding: 0 0.28rem;
        margin-top: 0.2rem;
        background-color: #ffffff;
        
        .evaluation-box {
            padding: 0.2rem 0.1rem 0.3rem;
            textarea {
                width: 100%;
                height: 1.5rem;
                resize: none;
            }
            .evaluation-imgs {
                margin-right: -0.06rem;
                .item {
                    position: relative;
                    width: 1.8rem;
                    height: 1.8rem;
                    margin: 0.2rem;
                    .close-btn {
                        position: absolute;
                        top: -0.15rem;
                        right: -0.15rem;
                        width: 0.3rem;
                        height: 0.3rem;
                        background: #a59d9d;
                        color: #fff;
                        border-radius: 50%;
                    }
                }
            
            }
            .upload {
                width: 1.8rem;
                height: 1.8rem;
                margin-top: .5rem;
                border: 1px dotted #f1f1f1;
                background: url('~@/assets/evaluation-upload-img.jpg') no-repeat center;
                background-size: 1.64rem 1.64rem;
            }
            
        }
    }
</style>

