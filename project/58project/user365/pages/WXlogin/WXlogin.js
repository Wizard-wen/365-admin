Page({
  data: {
  },
  tip() {
    wx.showToast({
      title: '敬请期待',
      icon: 'success',
      duration: 2000
    })
  },
  login() {
    wx.navigateTo({
      url: "/pages/mobileLogin/mobileLogin"
    })
  },
})

