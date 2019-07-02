//app.js
import requestUrl from './utils/util.js'
App({


  getUserInfo: function(cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.login({
        success: res => {
          console.log('login，从腾讯取得code：', res)
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            that.globalData.isLogin = true;
            requestUrl.requestUrl({
                url: that.globalData.getOpenId,
                params: {
                  code: res.code
                },
                method: "get",
              })
              .then((res) => { //then接收一个参数，是函数，并且会拿到我们在requestUrl中调用resolve时传的的参数
                that.globalData.openId = res.data.openid;
                that.globalData.session_key = res.data.session_key;
                wx.setStorageSync('session_key', res.data.session_key)
                console.log('从后端取得session_key', res.data.session_ke)
                console.log('从后端取得openId', that.globalData.openId); //返回openId
                wx.showLoading({
                  title: '玩命加载',
                })
                setTimeout(function() {
                  wx.hideLoading()
                }, 4000)
                wx.getSetting({
                  success: (res) => {
                    if (res.authSetting['scope.userInfo']) { //授权了，直接登录后台
                      wx.getUserInfo({
                        success: (res) => {
                          console.log('getUserInfo成功',res)
                          that.globalData.avatarUrl = res.rawData.avatarUrl
                          requestUrl.requestUrl({ //将用户信息传给后台数据库
                              url: "/login",
                              params: {
                                openId: that.globalData.openId, //用户的唯一标识
                                session_key: that.globalData.session_key, // 后端通过code获得的session_key
                                rawData: res.rawData, //
                                iv: res.iv, //
                                signature: res.signature //
                              },
                              method: "get",
                            })
                            .then((data) => { //then接收一个参数，是函数，并且会拿到我们在requestUrl中调用resolve时传的的参数

                              that.globalData.userInfo = data.data; //设置用户信息
                              console.log("允许授权了,得到用户信息:", that.globalData.userInfo);
                              typeof cb == "function" && cb(that.globalData.userInfo)
                            })
                            .catch((errorMsg) => {
                              console.log(errorMsg) //error是否需要callback？
                            })
                        }

                      })
                    } else { //未授权，跳到授权页面
                      wx.redirectTo({
                        url: '../authorize/authorize', //授权页面
                      })
                    }
                  }
                })
              })
              .catch((errorMsg) => {})
          }
        }
      })
    }
  },
  onLaunch: function() {
    // 登录;用户打开小程序时，会调用wx.login获取code，将code发送到后台获取openid。后台保存opendi并返回用户信息




  },
  globalData: {
    isLogin: false, //是否已login
    AppID: 'wxa8b8b3b28767b4a6',
    AppSecret: '3c1df5cd042cbcd27409ea2e874adb06',
    host: 'http://127.0.0.1', //host
    gradeSetting: ['小一上册', '小一下册', '小二上册', '小二下册', '小三上册', '小三下册', '小四上册', '小四下册', '小五上册', '小五下册', '小六上册', '小六下册', '初一上册', '初一下册'],
    getOpenId: '/getOpenId',
    openId: null,
    grade: 1,
    subject: 1,
    session_key: null,
    userInfo: null,
    nickName: null,
    avatarUrl: null,
    systemInfo: null,
     windowHeight: null, // rpx换算px后的窗口高度
    screenHeight: null, // rpx换算px后的屏幕高度

    subject: 1,
    ce: 'a',
    timuPhotoUrl: null //题目拍照后得到的图片网络地址
  }
})