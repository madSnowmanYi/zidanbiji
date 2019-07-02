// pages/authorize/authorize.js
import requestUrl from '../../utils/util.js'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: app.globalData.isLogin,
    // 判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo') //获取用户信息是否在当前版本可用
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  bindGetUserInfo: function(e) { //点击的“拒绝”或者“允许

    if (e.detail.userInfo) { //点击了“允许”按钮，
      console.log('dianjixinxi', e.detail)
      var that = this;
      console.log('globalData为：', app.globalData)
      wx.getUserInfo({
        success: (res) => {
          console.log(res)
          var rawdata = JSON.parse(res.rawData)
          console.log('rawdata:', rawdata['avatarUrl'])
          app.globalData.avatarUrl = rawdata['avatarUrl']
          requestUrl.requestUrl({ //将用户信息传给后台数据库
              url: "/login",
              params: {
                openId: app.globalData.openId, //用户的唯一标识
                session_key: app.globalData.session_key, // 后端通过code获得的session_key
                rawData: res.rawData, //
                iv: res.iv, //
                signature: res.signature //
              },
              method: "get",
            })
            .then((data) => { //then接收一个参数，是函数，并且会拿到我们在requestUrl中调用resolve时传的的参数
console.log('进入then了')
              app.globalData.userInfo = data.data; //设置用户信息
              console.log("允许授权了,得到用户信息:", app.globalData.userInfo);
              wx.switchTab({
                url: '../index/index', //返回首页
              })
            })
            .catch((errorMsg) => {
              console.log(errorMsg)
            })

        }
      })
    }
  }
})