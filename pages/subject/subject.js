// pages/subject/subject.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subject_now: '语文',
    subject: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
    grade: "高三",
    background: '#ebe9e9',
    color: '#11cd6e',
    key:'9999999'
  },
  changeSubject: function(e) {
    var Index = e.currentTarget.dataset.id;
    console.log(Index);

    this.setData({
      key: Index,
      subject_now:this.data.subject[Index]
    })

    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

    let prevPage = pages[pages.length - 2];

    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。

    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

      current_subject: this.data.subject_now

    })

    setTimeout(function(){
      wx.navigateBack({
        delta: 1
      })
    },200)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    this.setData({
      subject_now: option.subject,
      grade: option.grade
    })
    console.log(option.subject+option.grade)
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