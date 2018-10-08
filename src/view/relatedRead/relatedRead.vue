<template>
  <div class="article-detail">
    <!-- 头部 -->
    <header class="head-box">
      <div class="head jus-e ali-c">
        <div class="left" @click="back">
          <span class="line line1"></span>
          <span class="line line2"></span>
        </div>
        <div class="right-car flexc" @click="onLoad(id,swicth.type)">
          {{swicth.title}}
        </div>

      </div>
    </header>
    <div class="seat"></div>
    <!-- 详情logo -->
    <div class="detail-logo"></div>
    <div class="detail-img"><img src="@/assets/detail-head.jpg" alt="" class="fill-auto"></div>
    <main class="text-main">
      <!-- 标题 -->
      <h1 class="title-one">{{relevant.en_title}}</h1>
      <h2 class="title-two">{{relevant.title}}</h2>
      <p v-html="xqInfo"></p>

      <!-- 分享/点赞 -->
      <div class="jus-e van-hairline--bottom">
        <div class="flex ali-c">
          <!--<div class="share"></div>-->
          <div class="like" :class="{on:isCollect}" @click="isLike"></div>
        </div>
      </div>
    </main>
    <!-- 产品信息     -->
    <router-link to="/store/store" class="goods-img"><img src="@/assets/goods-list.jpg" alt=""></router-link>
  </div>
</template>

<script>
  export default {
    name:'articleDetail',
    data () {
      return {
        detail:{},//详情数据
        carShow:false,//是否先手购物车数量背景颜色
        isCollect:false,//是否收藏
        relevant:{},//相关阅读文章
        xqInfo:'',//相关阅读
        host:'http://101yi.cn/data/attachment/item/',//图片路径前缀
        id:'',//文章id
        info:'',//文章信息
        xqId:'',//相关阅读id
        swicth:{title:'切换成中文',type:1},//切换语言
      }
    },
    created () {
      this.id = this.$route.params.id;
      this.onLoad(this.id,1);
    },
    methods: {
      // 中文请求
      onLoad (id,type) {
        this.$Loading('加载中');
        this.$api.store.articleDetail({
          article_id:id,
          key:this.$store.state.token
        }).then(res => {
          this.detail = res.data.article;
          this.relevant = res.data.xg;
          this.xqInfo = res.data.xg.intro;
          this.xqId = res.data.xg.id;
          if (type == 1) {
            this.swicth.title = '切换成英文';
            this.swicth.type = 2;
            this.info = res.data.article.info;
          }else {
            this.swicth.title = '切换成中文';
            this.swicth.type = 1;
            this.info = this.htmlToText(res.data.article.en_info);
          }
          this.$toast.clear();
          // 判断是否收藏
          res.data.article.collect == '已收藏' ? this.isCollect = true : this.isCollect = false;
        }).catch(err => {
          this.$Tip('加载失败，请重试');
          this.$toast.clear();
        })


      },
      htmlToText (html) {
        let div=document.createElement('div');
        div.innerHTML=html;
        return div.textContent;
      },
      // 点击喜欢
      isLike () {
        this.$api.store.articleCollect({
          key:this.$store.state.token,
          id:this.$route.params.id
        }).then(res => {
          this.isCollect = ! this.isCollect;
          if(this.isCollect) {
            this.$Tip('收藏成功');
          } else {
            this.$Tip('取消收藏');
          }
        })
      },
      // swicthLanguage (id) {

      // },
      // 返回上一页
      back() {
        this.$router.go(-1);
      }


    }
  }
</script>
<style lang="less" scoped>
  @import url('../../style/mixin');
  .article-detail {
    .head-box {
      position: fixed;
      top: 0;
      width: 10rem;
      max-width: 820px;
      height: 1.1rem;
      z-index: 9;
      background-color: #fff;
    }
    .head {
      position: relative;
      height: 1.1rem;
      border-bottom: 1px solid #959595;
    }
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
        transform: rotate(-45deg);
      }
      .line2 {
        margin-top: 0.08rem;
        transform: rotate(45deg);
      }
    }
    .right-car {
      position: relative;
      width: 2rem;
      height: .74rem;
      margin-right: .4rem;
      font-size: .34rem;
      color: #333;

    }
    .seat {
      height: 1.1rem;
    }
    .detail-logo {
      width: 2.92rem;
      height: 1.5rem;
      background: url(~@/assets/detail-logo.jpg) no-repeat;
      .bg-size(2.92rem,auto);
    }
    .text-main {
      padding: 1rem .6rem;
      text-align: center;
      .title-one {
        font-size: .38rem;
        line-height: .6rem;
        color: #282828;
        font-weight: bold;
      }
      .title-two {
        font-size: .42rem;
        color: #282828;
        line-height: .48rem;
        margin-bottom: .5rem;
        span {
          color: #d22b63;
        }
      }
      p {
        font-size: .32rem;
        line-height: .46rem;
        text-align: left;
        color: #323232;
        text-indent: 2em;
        margin-top: .1rem;
      }
      // 点赞/喜欢
      .jus-e {
        height: 1rem;
        margin-top: 1.8rem;
        .flex {
          width: 1.7rem;
          height: 100%;
          /*<!--.share {-->*/
          /*<!--width: .44rem;-->*/
          /*<!--height: .44rem;-->*/
          /*<!--background-image: url(~@/assets/detail-ico1.png);-->*/
          /*<!--.bg-size(.44rem,.44rem);-->*/
          /*<!--}-->*/
          .like {
            width: .52rem;
            height: .38rem;
            background-image: url(~@/assets/detail-ico2.png);
            .bg-size(.52rem,.38rem);
            margin-left: .3rem;
            &.on {
              background-image: url(~@/assets/detail-ico2-on.png);
            }
          }
        }
      }
    }
    // 相关阅读
    .relevant-article {
      padding: .5rem .4rem;
      .article-xq {
        font-size: .3rem;
        color: @main-cor;
        margin: 0 .3rem;
      }
      .title {
        margin-top: .3rem;
        font-size: .38rem;
        line-height: .6rem;
        color: #333;
        font-weight: bold;
      }
      .author {
        font-size: .32rem;
        color: #777;
      }
      .img {
        width: 100%;
        height: 4rem;
      }
      .content {
        font-size: .34rem;
        color: #777;
        line-height: .5rem;
        &.english {
          padding: .36rem 0;
        }
      }
    }
  }
</style>

