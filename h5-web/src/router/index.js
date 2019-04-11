import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      // 主页面
      path: '/',
      name: 'main',
      redirect: '/message',
      component: resolve => require(['@/view/main/index'], resolve),
      children: [
        //消息
        {
          path: 'message',
          name: 'message',
          component: resolve => require(['@/view/main/message/message'], resolve),
        },
        //教务中心
        {
          path: 'academic-center',
          name: 'academic-center',
          component: resolve => require(['@/view/main/academic-center/academic-center'], resolve),
        },
        //我的
        {
          path: 'personal-center',
          name: 'personal-center',
          component: resolve => require(['@/view/main/personal-center/personal-center'], resolve),
        }
      ]
    },
    {
      //工资单
      path:'/payroll',
      name:'payroll',
      component: resolve => require(['@/view/main/personal-center/payroll/payroll'], resolve)
    },
    {
      //工资单详情
      path:'/payroll-details',
      name:'payroll-details',
      component: resolve => require(['@/view/main/personal-center/payroll/payroll-details/payroll-details'], resolve)
    }
  ]
});
