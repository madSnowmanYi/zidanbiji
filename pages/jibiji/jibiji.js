var app = getApp()
Page({
  data: {
    switchtab: [{
      name: '拍照存题',
    }, {
      name: '等待处理',
    }, {
      name: '我的答题',
    }, {
      name: '我的提问',

    }],
    quesInfo: [{}, {
      answer: []
    }],
    isMenuaddOn: false,
    isMenugroupOn: false,
    isMaskON: false,

    // isAddAnswerOn:false,
    menuList: ['拍照',

      '录音',

      '文字答案'
    ],
    location: null,
    currentTab: 0,
    // timuPhotoUrl: null, //拍摄的题目图片
    paizhaotimu: null,
    paizhaodaan: {},
    // 以下为picker内容
    // 'quesTypes': ['填空题', '选择题', '无', '问答题', '判断题'],
    // 'knowdgePoints': [1, 2, 3, 4, 5],
    // 'value': [2, 2],
  },
  // bindChangePicker: function (e) {
  //   const val = e.detail.value
  //   this.setData({
  //     'quesType': this.data.quesTypes[val[0]],
  //     'knowdgePoint': this.data.knowdgePoints[val[1]],
  //   })
  // },

  delQues: function(e) {
    var that = this;
    var magIdx = parseInt(e.currentTarget.dataset.index);
    // var list = that.data.wxchatLists;

    wx.showModal({
      title: '提示',
      content: '确定删除此消息吗？',
      success: function(res) {
        if (res.confirm) {
          that.setData({
            location: null,
          });
          wx.showToast({
            title: '已删除，请重新拍摄',
            mask: true,
            icon: 'none',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  seeBigImg: function(e) {
    wx.navigateTo({
      url: '../seeBigPic/seeBigPic?pic=' + this.data.location, //传递图片地址到seeBigPic看大图
    })
  },
  addAnswer: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        isMenugroupOn: true,
        isMaskON: true
      })
    }, 500)

    console.log('ison', this.data.isMenugroupOn)
  },
  menuBack: function(e) {
    console.log(e.currentTarget.dataset.action)
    switch (e.currentTarget.dataset.action) {
      case 0:
        console.log('按了拍照')
        wx.navigateTo({
          url: '../paizhao/paizhao?actionType=ans',
        })
        break;
      case 1:
        console.log('按了语音');
        break;
      case 2:
        console.log('按了文字')
        break;
      default:
        console.log('啥也没按')
        this.setData({
          isMenugroupOn: false,
          isMaskON: false
        })
    }
  },
  imageLoad: function(e) {
    var _this = this;
    var width = e.detail.width; //获取图片真实宽度 
    var height = e.detail.height;
    var ratio = width / height; //图片的真实宽高比例

    // var viewWidth = 500; //设置图片显示宽度， 
    if (ratio < 0.4) {
      width = 204;
      height = 510
    } else if (ratio >= 0.4 && ratio <= 0.5) {
      width = 204;
      height = 204 / ratio
    } else if (ratio > 0.5 && ratio < 1) {
      width = 405 * ratio;
      height = 405
    } else if (ratio >= 1 && ratio < 2) {
      width = 405*ratio;
      height = 405
    } else if (ratio >= 2 && ratio < 2.5) {
      width = 204;
      height = 204 * ratio
    } else if (ratio >= 2.5) {
      width = 510;
      height = 204
    }
   
    console.log('width', width, 405 / ratio, 'height', height, 'ratio', ratio, ratio >= 1 && ratio < 2)
    this.setData({
      quesImgWidth: width,
      quesImgHeight: height
    })
  },
  onLoad: function() {},
  //tab切换函数，让swiper当前滑块的current的index与tab头部index一一对应
  switchNav: function(e) {
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

  takePhoto: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../paizhao/paizhao?actionType=' + e.currentTarget.dataset.type,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onReady: function() {

  },
  onShow: function() {

  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  }
})