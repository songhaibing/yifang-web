// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import FastClick from 'fastclick'; // 引入FastClick
import HTTP from './lib/httpRequest';
import API from './lib/api';
import DES from './lib/des';
import './config/rem';
import './style/reset.less';
import { Button, Row, Col, Swipe, SwipeItem, Lazyload, Field, NavBar, Toast } from 'vant';
[Button, Row, Col, Swipe, SwipeItem, Lazyload, Field, NavBar, Toast].map(item => {
  Vue.use(item);
});
Vue.config.productionTip = false;
Vue.prototype.$HTTP = HTTP;
Vue.prototype.HOST = '/api';
Vue.prototype.$API = API;
Vue.prototype.$DES = DES; //DES 加密 ECB模式
// 提示框
Vue.prototype.$Tip = msg =>
  Toast({
    message: msg,
    forbidClick: true,
    duration: 1500
  });
// 加载提示
Vue.prototype.$Loading = msg =>
  Toast.loading({
    message: msg,
    forbidClick: true,
    duration: 0
  });

// 使用 fastclick
FastClick.attach(document.body);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted() {
    document.dispatchEvent(new Event('render-event'));
  }
});
