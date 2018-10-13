import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  mode: 'hash',
  routes: [
    { // 首页
      path: '/', name: 'Index', 
      component: resolve => require(['@/view/index/index'], resolve),
      // meta: {
      //   keepAlive: true,
      //   isUseCache: false // 第一次进入刷新数据，后续进入缓存数据
      // }
    },
    { // 个人中心
      path: '/user/user', name: 'User', 
      component: resolve => require(['@/view/user/user'], resolve) 
    },
    { // 个人资料
      path: '/user/myInfor', name: 'MyInfor', 
      component: resolve => require(['@/view/user/myInfor'], resolve) 
    },
    { // 消息
      path: '/message', name: 'Message', 
      component: resolve => require(['@/view/message/message'], resolve),
      meta: {
        needLogin: true,
        keepAlive: true,
        isUseCache: false // 第一次进入刷新数据，后续进入缓存数据
      } 
    },
    { // 消息详情
      path: '/message/detail', name: 'MessageDetail', 
      component: resolve => require(['@/view/message/detail'], resolve) 
    },
    { // 设置
      path: '/user/set', name: 'Set', 
      component: resolve => require(['@/view/user/set'], resolve) 
    },
    { // 意见反馈
      path: '/user/feedback', name: 'Feedback', 
      component: resolve => require(['@/view/user/feedback'], resolve) 
    },
    { // 商城列表
      path: '/store/store', name: 'Store', 
      component: resolve => require(['@/view/store/store'], resolve),
      meta: {
        needLogin: true,
        keepAlive: true,
        isUseCache: false // 第一次进入刷新数据，后续进入缓存数据
      } 
    },
    { // 文章详情
      path: '/article/:id', name: 'articleDetail', 
      component: resolve => require(['@/view/article/article'], resolve)
    },
    { // 相关阅读
      path: '/relatedRead/:id', name: 'relatedRead',
      component: resolve => require(['@/view/relatedRead/relatedRead'], resolve)
    },
    { // 商品详情
      path: '/store/detail/:id', name: 'StoreDetail', 
      component: resolve => require(['@/view/store/detail'], resolve)
    },
    { // 我的订单
      path: '/order/order/:type', name: 'Order',
      component: resolve => require(['@/view/order/order'], resolve),
      meta: {
        needLogin: true,
        keepAlive: true,
        isUseCache: false // 第一次进入刷新数据，后续进入缓存数据
      }
    },
    { // 订单详情
      path: '/order/detail', name: 'OrderDetail', 
      component: resolve => require(['@/view/order/detail'], resolve) 
    },
    { // 物流详情
      path: '/logistics', name: 'Logistics', 
      component: resolve => require(['@/view/logistics/logistics'], resolve) 
    },
    { // 申请退款
      path: '/order/refund', name: 'Refund', 
      component: resolve => require(['@/view/order/refund'], resolve) 
    },
    { // 提交订单
      path: '/PlaceOrder/PlaceOrder', name: 'PlaceOrder', 
      component: resolve => require(['@/view/PlaceOrder/PlaceOrder'], resolve),
      meta: {
        keepAlive: true,
        isUseCache: false // 第一次进入刷新数据，后续进入缓存数据
      }
    },
    { // 我的地址
      path: '/address/address', name: 'Address', 
      component: resolve => require(['@/view/address/address'], resolve) 
    },
    { // 添加地址/编辑地址
      path: '/address/newAddress', name: 'NewAddress', 
      component: resolve => require(['@/view/address/newAddress'], resolve) 
    },
    { // 我的收藏
      path: '/collection/collection/:type', name: 'Collection', 
      component: resolve => require(['@/view/collection/collection'], resolve),
      meta: {
        needLogin: true,
        keepAlive: true,
        isUseCache: false // 第一次进入刷新数据，后续进入缓存数据
      } 
    },
    { // 阅读详情
      path: '/collection/detail/:id', name: 'collectionDetail',
      component: resolve => require(['@/view/collection/detail'], resolve),
    },
    //商品详情
    {
      path: '/collection/commodity/:id', name: 'commodity',
      component: resolve => require(['@/view/collection/commodity'], resolve),
    },
    { // 评价页
      path: '/evaluation/evaluation', name: 'Evaluation', 
      component: resolve => require(['@/view/evaluation/evaluation'], resolve) 
    },
    { // 评价成功页
      path: '/evaluation/success', name: 'EvaluationSuccess', 
      component: resolve => require(['@/view/evaluation/success'], resolve) 
    },
    { // 我的评价
      path: '/evaluation/myEvaluation', name: 'MyEvaluation', 
      component: resolve => require(['@/view/evaluation/myEvaluation'], resolve)
    },
    { // 购物车
      path: '/shopCar', name: 'ShopCar', 
      component: resolve => require(['@/view/shopCar/shopCar'], resolve) 
    },
    { // 积分
      path: '/integral/:type', name: 'Integral', 
      component: resolve => require(['@/view/integral/integral'], resolve) 
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        // 在触发路由切换时，如果当前页面需要缓存数据，那么在其路由的meta.savedPostion中保存当前页面的滚动位置数据
        from.meta.savedPosition = document.body.scrollTop || document.documentElement.scrollTop;
      }
      // 切换路由时，检测其meta.savedPosition, 如果有值则将其滚动到缓存位置       
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
