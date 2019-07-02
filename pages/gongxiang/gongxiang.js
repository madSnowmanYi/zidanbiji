import requestUrl from '../../utils/util.js'
Page({
  

  lianjiefuwuqi:function(){
    for (var i = 0; i < 200; i++) { 
    requestUrl.requestUrl({ //将用户信息传给后台数据库
      url: "/login",
      params: {
        openId: 55, //用户的唯一标识
        session_key: '/FWqSQ/DXlgMBrY0lzt+bQ==', // 后端通过code获得的session_key
        rawData: '{"nickName":"王东林","gender":1,"language":"zh_CN","city":"Guangzhou","province":"Guangdong","country":"China","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/Pepavr3wyAXSyyzLEC8wGapP7Jf6echFgy2iaEaKSoLuaPNTPQDoZ20kEVStNq668iby944WlSFUquWX66JfWOnA/132"}',
        iv: "CUZeNAtV9QGPbJuH6tQQ9A==", //
        signature: "ad3cd0c5fd6e4c0df10ec6c75fca0a3f43e61aef"//
      },
      method: "get",
    })
      .then((data) => { //then接收一个参数，是函数，并且会拿到我们在requestUrl中调用resolve时传的的参数


        console.log("允许授权了,得到用户信息:");
      })
      .catch((errorMsg) => {
        console.log(errorMsg) //error是否需要callback？
        })
    }
  },




  data: {
    switchtab: [{
      name: '随机浏览',
    }, {
      name: '热门题库',
      
    }
    ],
    currentTab: 0,

  },
  onLoad: function (options) {

  },
  //tab切换函数，让swiper当前滑块的current的index与tab头部index一一对应
  switchNav: function (e) {
    var index = e.target.dataset.current;
    if (this.data.currentTab == index) {
      return true;
    } else {
      this.setData({
        currentTab: index
      });
    }
  },
  //滑动swiper切换，让swiper当前滑块的current的index与tab头部index一一对应
  tabChange(e) {
    console.log(e.detail.current)
    this.setData({
      currentTab: e.detail.current
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  }
})