// pages/index/index.js

var app = getApp();

import requestUrl1 from '../../utils/util.js'
Page({

  data: {
    current_grade: '高一',
    current_subject: '语文',
    wodetiliang: 0,
    beishoucangshu: 0,
    zaixianshichang: 0,
    wodejinbi: 0,
    avatarUrl: null,
    start: 0,
    userInfo: null
  },
  changeSubject: function() {

    wx.navigateTo({
      url: '../subject/subject?subject=' + this.data.current_subject + '&grade=' + this.data.current_grade,
    })
  },
  wodetiku: function() {
    wx.navigateTo({
      url: '../xiaotiku/xiaotiku'
    })
  },
  paizhao: function() {
    wx.switchTab({
      url: '../jibiji/jibiji'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
    app.getUserInfo(function(userInfo) {
      console.log('index取得userInfo', userInfo)
      console.log('typeof userInfo', typeof userInfo)

      that.setData({
        start: 1,
        userInfo: userInfo,
        wodetiliang: userInfo.quesNum,
        beishoucangshu: userInfo.collectedNum,
        zaixianshichang: userInfo.totalOnLineTime,
        wodejinbi: userInfo.Ucoin,
        avatarUrl: userInfo.avatarUrl,
      })
    })
    // that.setData({
    //   wodetiliang: app.globalData.userInfo.quesNum,
    //   beishoucangshu: app.globalData.userInfo.collectedNum,
    //   zaixianshichang: 0,
    //   wodejinbi: app.globalData.userInfo.Ucoin,
    //   avatarUrl: app.globalData.userInfo.avatarUrl,
    //   start: 1
    // })
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