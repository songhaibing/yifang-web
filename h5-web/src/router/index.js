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
    },
    //请假审批
    {
      path: '/leave-approval',
      name: 'leave-approval',
      component: resolve => require(['@/view/main/message/leave-approval/leave-approval'], resolve),
    },
    //审批结果
    {
      path: '/approval-results',
      name: 'approval-results',
      component: resolve => require(['@/view/main/message/approval-results/approval-results'], resolve),
    },
    //点名
    {
      path: '/call-name',
      name: 'call-name',
      component: resolve => require(['@/view/main/academic-center/call-name/call-name'], resolve),
    },
  ]
});
