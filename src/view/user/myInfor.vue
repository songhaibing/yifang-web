<template>
    <div class="my-infor">
        <!-- 头部 -->
        <pub-head
            title="个人资料"
            :text="text"
        ></pub-head>
    
        <!-- 昵称 -->
        <div class="infor jus-b van-hairline--bottom ali-c">
            <div class="nick flex1">昵称</div>
            <div class="name flex" @click="modify(1)">
                <p class="ali-c">{{nickName}}</p>
                <img src="@/assets/mycenter-ico6.png" alt="">
            </div>
        </div>
        <div class="infor jus-b van-hairline--bottom ali-c">
            <div class="nick flex1">头像</div>
            <div class="infor-img flex ali-c" @click="modifyImg">
                <img :src="infoImg" alt="" class="fill">
            </div>
        </div>
        <div class="infor jus-b van-hairline--bottom ali-c">
            <div class="nick flex1">手机号</div>
            <div class="name flex">
                 <!-- @click="modify(3)"  不允许修改手机 -->
                <p class="ali-c">{{phoneNumber}}</p>
                <!--<img src="@/assets/mycenter-ico6.png" alt="">-->
            </div>
        </div>
        <div class="infor jus-b van-hairline--bottom">
            <div class="nick flex1 ali-c">邮箱</div>
            <div class="name flex ali-c" @click="modify(4)">
                <p class="ali-c">{{email}}</p>
                <img src="@/assets/mycenter-ico6.png" alt="">
            </div>
        </div>

         <!-- 修改信息弹框 -->
        <van-popup 
            v-model="isShow"
            class="popup-radius"
        >
            <div class="modify-box">
                <!-- 昵称 -->
                <input type="text" v-model="nickName" class="text-infor ali-c" v-if="type ==1">
                <!-- 手机号 -->
                <input type="text" v-model="phoneNumber" class="text-infor ali-c" v-if="type ==3">
                <!-- 邮箱 -->
                <input type="text" v-model="email" class="text-infor ali-c" v-if="type ==4">
                <div class="jus-b btn">
                    <div @click="oncencel" class="cancel flexc">取消</div>                
                    <div @click="confirmModify(type)" class="sure flexc">确定</div>
                </div>
            </div>
        </van-popup> 

        <!-- 修改头像弹框 -->
        <van-popup 
            v-model="closeImg"
            class="popup-img"
            position="bottom"
        >
            <div class="img-box flexc">
              <van-uploader  :after-read="onRead"  class="album flexc">
                   <span  @click="onSure">拍照/相册</span>
              </van-uploader>
            </div>
            <div class="cancel flexc" @click="onSure">
                取消
            </div>
        </van-popup>   
    </div>
    
</template>
    
<script>
import head from '@/components/head/head.vue';
export default {
    name:'MyInfor',
    components: {
        'pub-head':head
    },
    data () {
        return {
            isShow: false,  // 弹窗显示隐藏状态
            closeImg:false,//弹窗显示隐藏状态
            nickName: '',//昵称
            phoneNumber:'', //手机号
            email:'',//邮箱
            type: '',//类型
            text:true,//头部文字显示
            infoImg:'',//用户头像
            host:'http://101yi.cn/data/attachment/useravatar/',//图片路径前缀
            avatarImg:'',
           imgName:'',//图片名称
        }
    },
    created () {
        this.$api.user.userCenter({
            key:localStorage.getItem('access_token'),
        }).then(res => {
            this.infoImg = res.data.data.avatar;
            this.nickName = res.data.data.nickname;
            this.phoneNumber = res.data.data.mobile;
            this.email = res.data.data.email;
        })
    },

    methods: {
      //拍照或者相册上传图片
      onRead (file) {
        console.log(file)
        this.$Loading('头像修改中');
        let param = new FormData(); //创建form对象
        param.append('images', file.file, file.file.name);//通过append向form对象添加数据
        console.log(param);
        this.$api.store.upload(param).then(res=> {
          console.log(res);
          if (res.status === 1) {
            this.infoImg = file.content;
            this.$api.user.modifyInfo({
              key:localStorage.getItem('access_token'),
              type:2,
              name:res.data.result[0].save_path + res.data.result[0].save_name
            }).then(res => {
              this.$Tip('头像修改成功');
              this.closeImg=false;
            });
            this.$toast.clear();
          } else {
            this.$toast.clear();
            this.$Tip('头像上传失败，请重试');
          }
        })
      },
        // 修改资料调用弹出框
        modify (page) {
            this.type = page;
            this.isShow = true;
        },
        // 修改头像弹出框
        modifyImg () {
            this.closeImg = true;
        },
        oncencel () {
            this.isShow = false;
        },
        // 隐藏弹框
        onSure () {
            this.isShow = false;
            this.closeImg = false;
        },
        // 确认修改
        confirmModify (type) {
            this.isShow = false;
            switch (type) {
                case 1:
                    this.$api.user.modifyInfo({
                        key:localStorage.getItem('access_token'),
                        type:type,
                        name:this.nickName
                    }).then(res => {
                        this.$Tip('昵称修改成功');
                    });
                break;
                case 3:
                    this.$api.user.modifyInfo({
                        key:localStorage.getItem('access_token'),
                        type:type,
                        name:this.phoneNumber
                    }).then(res => {
                        this.$Tip('手机号修改成功');
                    });
                break;
                case 4:
                    this.$api.user.modifyInfo({
                        key:localStorage.getItem('access_token'),
                        type:type,
                        name:this.email
                    }).then(res => {
                        this.$Tip('邮箱修改成功');
                    });
                break;
            default:    
                return
            }
            
        },

    }
}
</script>

<style lang="less" scoped>
@import url('../../style/mixin');
    .infor {
        width: 100%;
        height: 1.38rem;
        color: #0d0d0d;
        padding: 0 .4rem;
        .name {
             img {
               width: .36rem;
               height: .36rem;
               margin-left: .2rem;
           }
        }
        
        .infor-img {
            width: .9rem;
            height: .9rem;
            .border-radius(.9rem);
            overflow: hidden;
        }
       
    }
    // 修改资料弹出框
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

    // 修改头像弹框
    .popup-img {
        width: 9.2rem;
        margin: .4rem auto;
        height: 4rem;
        color: #252525;
        .img-box {
            width: 100%;
            height: 1.5rem;
            background-color: #fff;
            .border-radius(.16rem);
            .flexc {
                // width: 100%;
                height: 1.5rem;
            }
        }
        .cancel {
            width: 100%;
            height: 1.5rem;
            margin-top: .3rem;
            background-color: #fff;
            .border-radius(.16rem);
        }
    }
</style>

<style>
     .my-infor .van-modal {
         background-color: rgba(0, 0, 0, 0.4) !important;
    }
    .my-infor .van-popup {
        background-color:inherit !important;
    }
</style>


