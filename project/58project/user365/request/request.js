
const apiPath = require("../config/apiPath.js");

const request = (url, method = "GET", data = {})=>{
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
          'Content-Type': 'application/json',
          'X-Nideshop-Token': wx.getStorageSync('token')
      },
      success: function (res) {
          console.log("success");

          if (res.statusCode == 200) {

              if (res.data.errno == 401) {
                  //需要登录后才可以操作

                  let code = null;
                  return login().then((res) => {
                      code = res.code;
                      return getUserInfo();
                  }).then((userInfo) => {
                      //登录远程服务器
                      request(api.AuthLoginByWeixin, { code: code, userInfo: userInfo }, 'POST').then(res => {
                          if (res.errno === 0) {
                              //存储用户信息
                              wx.setStorageSync('userInfo', res.data.userInfo);
                              wx.setStorageSync('token', res.data.token);

                              resolve(res);
                          } else {
                              reject(res);
                          }
                      }).catch((err) => {
                          reject(err);
                      });
                  }).catch((err) => {
                      reject(err);
                  })
              } else {
                  resolve(res.data);
              }
          } else {
              reject(res.errMsg);
          }

      },
    //   success(res) {
    //       console.log('success')
    //       if(res.statusCode == 200){

    //       }
    //     // if (request.data.code != 0 ){
    //     //   reject(request.data)
    //     // }else{
    //     //   resolve(request.data)
    //     // }
    //   },
      fail(err){
        console.log('failed')
        reject(err)
      }
    })
  })
}

Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}
module.exports = {
  request,
  apiPath
} 