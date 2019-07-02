// pages/seeBigPic/seeBigPic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic: null
  },

  back: function() {
    wx.navigateBack({
      delta: 1,
    })
  },
  delQues: function(e) {
    var that = this;
    var magIdx = parseInt(e.currentTarget.dataset.index);
    // var list = that.data.wxchatLists;

    wx.showModal({
      title: '提示',
      content: '确定删除此消息吗？',
      success: function(res) {
        if (res.confirm) {
          var pages = getCurrentPages();
          //获取上一个页面的所有的方法和data中的数据
          var lastpage = pages[pages.length - 2]
          lastpage.setData({
            location: null,
          });
          wx.showToast({
            title: '已删除，请重新拍摄',
            mask: true,
            icon: 'none',
          });
          wx.navigateBack({
            delta: 1,
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onLoad: function(options) {

    this.setData({
      pic: options.pic
    })
    console.log('接收到pic:', this.data.pic)
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