const request = require('../../request/request.js');

Page({
  data: {
    phone: "",
    captcha: "",
    time: 60,
    isShowTime: false,
  },
  getCode() {
    if (this.data.isShowTime) {
      return false;
    }
    this.setData({
      isShowTime: true
    })
    let oldTime = (new Date()).getTime();
    let newTime,
      time,
      timer;
    timer = setInterval(() => {
      newTime = (new Date()).getTime();
      time = Math.round((newTime - oldTime) / 1000);
      if (time < 60) {
        this.setData({
          time: 60 - time,
        })
      } else {
        clearInterval(timer);
        this.setData({
          time: 60,
          isShowTime: false
        })
      }
    }, 500)
  },
  phoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  captchaInput(e) {
    this.setData({
      captcha: e.detail.value
    })
  },
  login() {
    wx.showLoading({
      title: '加载中',
    })
    return request.request(request.apiPath + '/user/login', 'post', {
      phone: this.data.phone,
      password: this.data.captcha
    }).then(val => {
      wx.showToast({
        title: val.message,
        icon: '',
        duration: 2000
      })
    }).catch(val => {
      wx.showToast({
        title: val.message,
        icon: '',
        duration: 2000
      })
      throw Error;
    }).finally(() => {
      wx.hideLoading()
    })
  }
})