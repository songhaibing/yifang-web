import Vue from 'vue'
import Vuex from 'vuex'
import { Store } from 'vuex';

Vue.use(Vuex);

const state = {
    isNetwork: true, // 断网状态，true网络正常，false断网
    uploadImg:'http://101yi.cn/data/attachment/',//上传图片路径前缀
    token: null, // 用户token
    isBindPhone: null,//用户是否绑定手机号
    addressSelected: null, // 用户选中的收货地址
    shopcartNums: 0, // 购物车数量
}

const mutations = {
    // 更新断网状态
    UPDATE_isNetwork () {

    },
    // 登录成功改变token
    loginSuccess(state, val) {
        state.token = val;
    },
    // 绑定手机号成功改变isbind绑定状态
    bindSuccess(state, val) {
        state.isBindPhone = val;
    },
    /**
     * 添加或清除选中的收货地址
     * @param {Boolean} bool true添加选中的地址，false清除
    */
    setAddressSelected (state, val, bool = true) {
        state.addressSelected = bool ? val : null;
    },
    
}

const actions = {

}

export default new Store({
    state,
    mutations,
    actions
})