// user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [{
      id: 1,
      title: '我的订单',
      router: '/pages/myOrder/myOrder'
    }, {
      id: 2,
      title: '我的地址',
        router: '/pages/myAddress/myAddress'
    }, {
      id: 3,
      title: '联系客服',
      router: ''
    }],
    isLogin: false
  },
  login(){
    if (this.data.isLogin) {
      return false;
    }
    wx.navigateTo({
      url: '/pages/WXlogin/WXlogin',
    })
  },
  goItem(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.router,
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})