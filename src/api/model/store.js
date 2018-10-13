/**
 * store模块接口列表
 */

import base from '@/api/base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 序列化参数

const store = {    
    // 商品列表
    storeList (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Item&a=item_list&page=${params.page}&size=${params.size}`);    
    },      
    // 商品详情
    storeDetail (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Item&a=item_details&item_id=${params.item_id}&key=${params.key}`);    
    }, 
    // 文章详情
    articleDetail (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=News&a=article&article_id=${params.article_id}&key=${params.key}`);    
    }, 
    // 商品添加喜欢和取消喜欢   
    goodsCollect (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Item&a=collect_deal&id=${params.id}&key=${params.key}`);    
    }, 
    // 文章添加喜欢和取消喜欢   
    articleCollect (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=News&a=collect_deal&id=${params.id}&key=${params.key}`);    
    }, 
    // 添加购物车   
    addCart (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Cart&a=join_cart&item_id=${params.id}&key=${params.key}`);   
    }, 
    //收藏
    collect (params) {
        return axios.get(`${base.portSRC}/app.php?m=App&c=Member&a=collect&key=${params.key}&type=${params.type}&size=${params.size}&page=${params.page}`)
    },
   //收藏文章详情
  collectDeilt(params) {
    return axios.get( `${base.portSRC}/app.php?m=App&c=News&a=article&key=${params.key}&article_id=${params.article_id}`);

  },
  // 收藏商品详情
  commodity(params) {
    return axios.get( `${base.portSRC}/app.php?m=App&c=Item&a=item_details&key=${params.key}&item_id=${params.item_id}`);

  },
    // 删除收藏   
    delCollect (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Member&a=del_collect&collect_id=${params.id}&key=${params.key}`);   
    }, 
    // 上传图片    
    upload (params) {        
        return axios.post(`${base.portSRC}/imagine/upload.php`, params);    
    },
     // 我的地址   
     myAddress (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Order&a=address_list&key=${params.key}`);   
    }, 
    // 添加地址   
    addAddress (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Order&a=add_address&key=${params.key}&shperson=${params.shperson}&mobile=${params.mobile}&province=${params.province}&city=${params.city}&county=${params.county}&address=${params.address}&status=${params.status}`);   
    }, 
    // 编辑地址详情   
    editAddress (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Order&a=edit_address&key=${params.key}&address_id=${params.address_id}`);   
    }, 
    // 确认修改地址   
    confirmAddress (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Order&a=qr_address&key=${params.key}&shperson=${params.shperson}&mobile=${params.mobile}&province=${params.province}&city=${params.city}&county=${params.county}&address=${params.address}&address_id=${params.id}&status=${params.status}`);   
    }, 
     // 删除地址   
     delAddress (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Order&a=del_address&key=${params.key}&address_id=${params.address_id}`);   
    }, 
    // 购物车列表  
    cartList (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Cart&a=cart_list&key=${params.key}`);   
    }, 
    // 增加/减少   
    reduceCar (params) {        
        return axios.post(`${base.portSRC}/app.php?m=App&c=Cart&a=zhen`, qs.stringify(params));    
    },
    // 删除购物车  
    delcartList (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Cart&a=del_cart&key=${params.key}&cart_id=${params.id}`);   
    }, 
    
}

export default store;
