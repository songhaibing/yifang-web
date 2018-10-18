/**
 * store模块接口列表
 */

import base from '@/api/base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 序列化参数

const user = {    
    // 首页
    index (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=index&a=index`);    
    },     
    // 个人中心
    userCenter (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Index&a=personal&key=${params.key}`);    
    },      
    // 积分
    Integral (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Integral&a=exchange&key=${params.key}&type=${params.type}&page=${params.page}&size=${params.size}`);    
    },    
    // 确认兑换
    exchange (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Integral&a=exchange_add&key=${params.key}&yhq_id=${params.id}`);    
    },
    // 消息列表
    messageList (params) {        
        return axios.get(`${base.portSRC}/app.php?&m=App&c=index&a=news_list&key=${params.key}&page=${params.page}&size=${params.size}`);    
    },
    // 删除消息    
    delMessage (params) {        
        return axios.post(`${base.portSRC}/app.php?&m=App&c=index&a=news_del`, qs.stringify(params));    
    },
    //消息详情
    messageDeatail (params) {        
        return axios.get(`${base.portSRC}/app.php?&m=App&c=index&a=news_detail&key=${params.key}&id=${params.id}`);
    },
    // 修改个人资料    
    modifyInfo (params) {        
        return axios.post(`${base.portSRC}/app.php?m=App&c=index&a=edit`, qs.stringify(params));    
    },
    // 意见反馈    
    backFeed (params) {        
        return axios.post(`${base.portSRC}/app.php?m=App&c=Index&a=message`, qs.stringify(params));    
    },
    //签到信息
    signInfo (params) {        
        return axios.get(`${base.portSRC}/app.php?&m=App&c=index&a=sign&key=${params.key}`);    
    },
    // 点击签到    
    signIng (params) {        
        return axios.post(`${base.portSRC}/app.php?&m=App&c=index&a=click_sign`, qs.stringify(params));    
    },
    // 登录获取token    
    login (params) {        
        return axios.post(`${base.portSRC}/app.php?m=App&c=index&a=get_user_info`, qs.stringify(params));    
    },
    //获取验证码
    getCode (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Ajax&a=aa&mobile=${params.mobile}`);    
    },
    // 登录
    bindPhone (params) {        
        return axios.post(`${base.portSRC}/app.php?m=App&c=index&a=login`, qs.stringify(params));
    },
  // 退出登录
  signOut(){
    return axios.get(`${base.portSRC}/app.php?m=App&c=Index&a=quit`);
  },
  //注册
  registered (params) {
    return axios.post(`${base.portSRC}/app.php?m=App&c=index&a=reg`, qs.stringify(params));
  },
  //重置密码
  resetPassword (params) {
    return axios.post(`${base.portSRC}/app.php?m=App&c=index&a=forget_pw`, qs.stringify(params));
  },
}
export default user;
