const API = {
  // login: 'user/login',
  getCode: '/Connect/get_sms_captcha', // 获取手机验证码,
  smsLogin: '/Connect/sms_login', // 手机验证码登录
  login: '/login/message', // 普通登录
  changePassword: '/Connect/find_password' //重置密码
  // enterApplyFor:'enter/enterApplyFor',
  // applicationStatusQuery:'enter/applicationStatusQuery',
  // applicationPublic:'enter/applicationPublic',
  // applicationPublicFacility:'Facility/applicationPublicFacility',
  // getPublicFacilityList:'Facility/getPublicFacilityList',
  // SeeTheNews:'WechatNews/SeeTheNews',
  // logout:'user/logout'
};
export default API;
