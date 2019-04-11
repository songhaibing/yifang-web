'use strict';
import axios from 'axios';
import qs from 'qs';
import { Toast } from 'vant';
/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  Toast({
    message: msg,
    duration: 1000,
    forbidClick: true
  });
};
// 环境的切换
// if (process.env.NODE_ENV == 'development') {
//   axios.defaults.baseURL = 'https://vryan.v5kg.com/index.php/mobile'; //开发环境
// } else if (process.env.NODE_ENV == 'debug') {
//   axios.defaults.baseURL = ''; //测试环境
// } else if (process.env.NODE_ENV == 'production') {
//   axios.defaults.baseURL = 'http://api.123dailu.com/'; //生产环境
// }

// 请求超时时间
axios.defaults.timeout = 10000;

let HTTP = {};
// 使用由axios库提供的配置的默认值来创建axios实例
let instance = axios.create();

/**
 * 发送post请求
 *
 * @param url 接口url
 * @param data 传递给后端的数据
 * @param callback 回调函数,参数 res.data.data 为主要数据部分
 */
HTTP.post = function(url, data, callback) {
  let params = qs.stringify(data);
  instance
    .post(url, params)
    .then(function(res) {
      //响应成功回调
      if (res.data.code === 10000) {
        callback(res.data.result);
      } else {
        tip(res.data.message);
        // alert(ERROR_CODE[res.data.status]);
      }
    })
    .catch(function(err) {
      tip(err);
    });
};

/**
 * 发送get请求
 *
 * @param url 接口url
 * @param data 传递给后端的数据
 * @param callback
 */
HTTP.get = function(url, data, callback) {
  let params = { params: data };
  instance
    .get(url, params)
    .then(function(res) {
      //响应成功回调
      if (res.data.code === 10000) {
        callback(res.data.result);
      } else {
        tip(res.data.message);
        // alert(ERROR_CODE[res.data.status]);
      }
    })
    .catch(function(err) {
      tip(err);
    });
};

export default HTTP;
