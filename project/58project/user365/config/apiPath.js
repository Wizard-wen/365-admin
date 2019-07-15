
const apiPath = require("./config.js").apiPath;

module.exports = {
  /**
   * 获取验证码 get
   * phone
   */
  getCaptcha: apiPath + "user/getCaptcha",
  /**
   * 登录 post
   * phone
   * captcha
   */
  login: apiPath + "user/login",
  /**
   * 刷新token post
   */
  changeToken: apiPath + "user/changeToken",



  /**
   * 获取用户信息 get
   * id
   */
  getUser: apiPath + "user/personal/getUser",



  /**
   * 获取服务分类 get
   */
  getCategory: apiPath + "user/service/getCategory",
}