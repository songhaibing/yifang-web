<template>
 <div>
   <main-header :header-name="headerName" :show="isShow" style="background-color: rgba(241, 241, 241, 1)"></main-header>
     <div class="card-contain">
       <div  class="contain">
         <input type="text" placeholder="可搜索学生">
         <div class="singe_contain" :style="{background:item.background}" v-for="(item,index) in singe" :key="index">
           <div class="singe-title">{{item.title}}</div>
           <div class="singe-des">{{item.des}}</div>
         </div>
       </div>
       <div class="student-contain">
         <div class="all-name">
           <img src="@/assets/allAvatar.svg">
         </div>
         <div class="wire"></div>
         <div class="name_contain">
           <img src="@/assets/avatar.svg">
           <div class="name">李四</div>
         </div>
         <div class="name_contain">
           <img src="@/assets/avatar.svg">
           <div class="name">李四</div>
         </div>
         <div class="name_contain">
           <img src="@/assets/avatar.svg">
           <div class="name">李四</div>
         </div>
         <div class="name_contain">
           <img src="@/assets/avatar.svg">
           <div class="name">李四</div>
         </div>
         <div class="name_contain">
           <img src="@/assets/avatar.svg">
           <div class="name">李四</div>
         </div>
         <div class="name_contain">
           <img src="@/assets/avatar.svg">
           <div class="name">李四</div>
         </div>
         <div class="name_contain">
           <img src="@/assets/avatar.svg">
           <div class="name">李四</div>
         </div>
         <div class="name_contain">
           <img src="@/assets/avatar.svg">
           <div class="name">李四</div>
         </div>
         <div class="name_contain">
           <img src="@/assets/avatar.svg">
           <div class="name">李四</div>
         </div>
         <div class="name_contain">
           <img src="@/assets/avatar.svg">
           <div class="name">李四</div>
         </div>
       </div>
     </div>
   </div>
</template>

<script>
    import MainHeader from "../../../../components/header/header";
    export default {
        name: "notify-parents",
      components: {MainHeader},
      data(){
         return{
           headerName:'通知家长',
           isShow:true,
           singe:[
             {
               background: 'rgba(0, 204, 57, 1)',
               title:'成绩汇报',
               des:'把学生成绩发送给家长'
             },
             {
               background: 'rgba(2, 167, 240, 1)',
               title:'班级通知',
               des:'将班级通知推送给家长'
             },
             {
               background: 'rgba(0, 191, 191, 1)',
               title:'学生评价',
               des:'推送学生评价给家长'
             },
             {
               background: 'rgba(255, 87, 34, 1)',
               title:'发送越界',
               des:'推送越界轨迹给家长'
             },
             {
               background: 'rgba(245, 154, 35, 1)',
               title:'学生出勤',
               des:'推送进7天考勤记录给家长'
             },
           ]
         }
      }
    }
</script>

<style lang="less" scoped>
  .card-contain{
    display: flex;
    background-color: white;
    height: 100vh;
    margin-top: .7rem;
    width: 100%;
    .contain{
      width: 6.5rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding-top: .5rem
    }
    input{
      border: 1px solid rgba(195, 195, 195, 1);
      border-radius: .1rem;
      width: 4.5rem;
    }
    input::placeholder{
      font-family: 'PingFangSC-Light', 'PingFang SC Light', 'PingFang SC';
      font-weight: 200;
      color: #7F7F7F;
      font-size: .3rem;
      text-align: center;
    }
    .singe_contain{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: .3rem;
      background-color: rgba(0, 204, 57, 1);
      width: 3.5rem;
      height: 1.5rem;
      border-radius: .1rem;
      .singe-title{
        font-family: 'PingFangSC-Thin', 'PingFang SC Thin', 'PingFang SC';
        font-weight: 200;
        font-size:.36rem;
        color: #FFFFFF;
      }
      .singe-des{
        font-family: 'PingFangSC-Thin', 'PingFang SC Thin', 'PingFang SC';
        font-weight: 200;
        font-size:.25rem;
        color: #FFFFFF;
      }
    }
  }
  .student-contain{
    position: fixed;
    top:0.7rem;
    width: 1.5rem;
    left:6rem;
    bottom: 0;
    overflow-y: scroll;
    border-left:1px solid #999999;
    border-right: 1px solid #999999;
    .all-name{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0.2rem 0;
    }
    .wire{
      width: 1.3rem;
      border-bottom: 1px solid #999999;
    }
    .name_contain{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    img{
      padding-top: .1rem;
    }
    .name{
      font-family: 'PingFangSC-Light', 'PingFang SC Light', 'PingFang SC';
      font-weight: 200;
      font-style: normal;
      font-size: .28rem;
    }
  }

</style>
