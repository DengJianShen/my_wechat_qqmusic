//app.js
App({
  onLaunch: function () {
    var that = this
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})