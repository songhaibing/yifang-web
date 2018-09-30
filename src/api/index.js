/** 
 * api接口的统一出口
 */
// 商品模块接口
import store from '@/api/model/store';
// 订单模块接口
import order from '@/api/model/order';
// 个人中心模块接口
import user from '@/api/model/user';
// 导出接口
export default {    
    store,
    order,
    user
}