// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './config/rem'
import './style/common.less'
import store from './store/index'
import api from './api' // 导入api接口
import FastClick from 'fastclick' // 引入FastClick
import NProgress from 'nprogress' //引入nprogress
import 'nprogress/nprogress.css' //这个样式必须引入
// import { login} from './api/model/user';
import { Toast,Popup,Switch,Rate,Uploader,Area,Stepper} from 'vant';
Vue.use(Toast).use(Popup).use(Switch).use(Rate).use(Uploader).use(Area ).use(Stepper);

Vue.config.productionTip = false

Vue.prototype.$api = api; // 将api挂载到vue的原型上

// 使用 fastclick
FastClick.attach(document.body); 

NProgress.configure({ 
    easing: 'ease',  // 动画方式
    speed: 500,  // 速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 最小百分比
});

// 写在vue原型上的Vant组件
// Vue.prototype.$ImagePreview = ImagePreview;
// Vue.prototype.$wxApi = wxApi;

// 提示框
Vue.prototype.$Tip = msg => Toast({
  message: msg,
  forbidClick: true,
  duration: 1500
});

// 加载提示
Vue.prototype.$Loading = msg => Toast.loading({
  message: msg,
  forbidClick: true,
  duration: 0
});

/**
 * 进入前先检测本地token，存在则更新vuex中的token
*/
const access_token = localStorage.getItem('access_token');
const isbind = localStorage.getItem('isbind');
const href = window.location.href;
const isCode = href.indexOf('code=') !== -1;
// 如果本地存储了access_token，直接更新vuex
if (access_token) {
  store.commit('loginSuccess', access_token);
}
// 如果本地存储了isbind，直接更新vuex
if (isbind) {
  store.commit('bindSuccess', isbind);
}

if (isCode) {
  const code = href.split('code=')[1].split('&state')[0];
  localStorage.setItem('code',code)
  // 拿到jscode后，走登录流程
  api.user.login({ 
    code: code
  }).then(res => {
      if (res.status == 1) {
        console.log(res);
        // 存token
        const access_token = res.data.key;
        localStorage.setItem('access_token', access_token);   
        localStorage.setItem('isbind',1);    
        store.commit('loginSuccess', access_token);   
        store.commit('bindSuccess', 1);  
      }else {
        // this.$Tip('您还不是会员哦');
      }
  }).catch(err => {
      console.log(err);
  })
}



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
