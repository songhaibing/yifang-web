/**
 * 接口域名的管理
 */
const base = {    
    portSRC: 'http://admin.101yi.cn'
}

export default base;




/**
 * 接口域名的管理
 */
// 环境判断
// 本地开发时切换localhost，打包时切换production再打包
// const environment = 'production';

// // 接口
// let base;

// if (environment === 'localhost') {
//     // 本地环境
//     base = {
//         base: '/api',
//         vote: '/api'    
//     }
// } else if (environment === 'production') {
//     // 生产环境
//     base = {
//         base: 'http://ykmama.cn/index.php?',
//         vote: 'http://ykmama.cn/index.php?',  
//     }
// }

// export default base;
