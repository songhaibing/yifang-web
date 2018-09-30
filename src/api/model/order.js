/**
 * order模块接口列表
 */

import base from '@/api/base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 序例化

const order = {    
    // 订单列表
    orderList (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Order&a=order_list&page=${params.page}&size=${params.size}&key=${params.key}&type=${params.type}`);    
    },      
    // 订单详情
    detail (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Order&a=order_details&order_id=${params.order_id}&key=${params.key}`);    
    },   
    // 申请退款
    refund (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Order&a=refund&order_id=${params.order_id}&key=${params.key}`);    
    },   
     // 取消订单
     cancelOrder (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Order&a=cancel_order&order_id=${params.order_id}&key=${params.key}`);    
    },   
     // 删除订单
     deleteOrder (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Order&a=delete_order&order_id=${params.order_id}&key=${params.key}`);    
    },   
     // 评价页面
     evaluate (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Order&a=comment&order_id=${params.order_id}&key=${params.key}`);    
    },   
    // 发表评价    
    placeEvaluate (params) {        
        return axios.post(`${base.portSRC}/app.php?m=App&c=Order&a=qr_comment`, qs.stringify(params));    
    },
    // 查看评价    
    myEvaluate (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Cart&a=order_submit&order_id=${params.order_id}&key=${params.key}`);    
    },   
    // 提交退款申请    
    placeOrder (params) {        
        return axios.post(`${base.portSRC}/app.php?m=App&c=Order&a=refund_submit`, qs.stringify(params));    
    },
    // 物流    
    logistics (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Order&a=logistics&order_id=${params.order_id}&key=${params.key}`);    
    },
    //确认收货
    confirm (params) {        
        return axios.post(`${base.portSRC}/app.php?m=App&c=Order&a=qr_order`, qs.stringify(params));    
    },
    // 确认提交订单 
    confirmOrder (params) {        
        return axios.post(`${base.portSRC}/app.php?m=App&c=Cart&a=order_affirm`, qs.stringify(params));    
    },

    // 购物车结算    
    placeOrderDetail(params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Cart&a=order_submit&type=${params.type}&cart_id=${params.cart_id}&key=${params.key}`);    
    },  
    //直接详情购买结算
    placeOrderDetailOne(params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Cart&a=order_submit&type=${params.type}&item_id=${params.item_id}&key=${params.key}&nums=${params.nums}`);    
    },  
    // 确认支付 
    confirmPay (params) {        
        return axios.post(`${base.portSRC}/app.php?m=App&c=Cart&a=pay`, qs.stringify(params));    
    },

}

export default order;