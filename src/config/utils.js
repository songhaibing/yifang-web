/* @description 时间戳转换
 * @param {String} time 要转换的时间戳
 * @param {String} conf 配置参数
 * @return {Object} "all"返回年月日时分秒，"ymd"返回年月日，"ymdhm"返回年月日时分
 **/
export const u_formatTimestamp = (times) => {
    var date = new Date(times);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '.';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
            var D = date.getDate() + ' ';
            var t = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();

            return Y+M+D+t+m+s;
}

export const u_format = (times) => {
    var date = new Date(times);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '.';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
            var D = date.getDate() + '';

            return Y+M+D;
}

/* @description 正则验证
 * @param {String} val 要验证的值
 * @param {String} type 要验证的类型
 * [type可能的值为：notEmpty值不为空、phone手机号、sixFigures六位数字]
 * 根据需求继续扩展
 **/
export const u_Reg = (val, type) => {
    switch (type) {
        // 值不为空
        case 'notEmpty':
            return val && val.length > 0 && !/^\s/.test(val);
            break;
        // 验证手机号
        case 'phone':
            return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(val);
            break;
        // 六位数字  
        case 'sixFigures':
            return /^\d{6}$/.test(val);
            break;
        default:
            alert('函数type参数不匹配');
            break;
    }
}

/**
 * 将数字保留n位小数
*/
export const u_fixed = (val, n = 2) => {
    return (val - 0).toFixed(n);
}
