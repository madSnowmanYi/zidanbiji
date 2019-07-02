// pages/paizhao/paizhao.js
import utils from '../../utils/util.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    isShowCamera: true, //显示拍照画面
    isShowImage: false, //显示裁剪画面
    isShowCanvas: false,
    imagewidth: "", //屏幕宽度，px
    imageheight: "", //屏幕宽度，px
    mask_top_height: "", //上部遮罩层高度，px
    src: "",
    flashOn: false, //闪光灯关
    imagePath: '',
    imagePath1: '',
    isShowNewImage: false, //显示裁剪hou画面
    tempFilePath: null, //生成的临时图片
    actionType: null, //导航过来的参数，拍照是ques还是ans
    savedFilePath: null
  },



  takePhotoAction: function() {
    var that = this
    that.ctx.takePhoto({
      quality: 'high', //高质量
      success: (res) => {

        this.setData({
          imagePath: res.tempImagePath,
          isShowImage: true, //显示裁剪画面
          isShowCamera: false, //隐藏拍照画面
          isShowCanvas: false //隐藏拍照画面
        })
        console.log('this.data.imagePath为' + this.data.imagePath)
      },
    })
  },
  cutPhoto: function() {
    var that = this

    var tempFilePath = that.data.imagePath
    const query = wx.createSelectorQuery()
    query.select('#camera_border_new').boundingClientRect()
    query.exec(function(res) {
      that.setData({
        isShowImage: false, //隐藏裁剪画面
        isShowCamera: false, //隐藏拍照画面
        isShowCanvas: true //显示拍照画面
      })
      var left_cut = res[0].left
      var top_cut = res[0].top
      var width_cut = res[0].width
      var height_cut = res[0].height
      var ctx = wx.createCanvasContext("image-canvas")
      ctx.drawImage(tempFilePath, 0, 0, that.data.imagewidth, that.data.imageheight)
      ctx.draw(false, function() {
        //获取图片RGB数据
        // wx.canvasGetImageData({
        //   canvasId: "image-canvas",
        //   x: 0,
        //   y: 0,
        //   width: that.data.imagewidth,
        //   height: that.data.imageheight,
        // success: function(res) {
        //   console.log('获取图片数据：', res.data)
        //   var imgData = res.data;
        //   for (var i = 0; i < imgData.length; i += 4) {
        //     if (1) {
        //       var x = imgData[i]
        //       imgData[i] = Math.floor(0.000000008142625 * x * x * x * x * x - 0.000005273809360 * x * x * x * x + 0.001131288397801 * x * x * x - 0.085361408990707 * x * x + 2.230405420774330 * x - 0.659181842518592)
        //       imgData[i + 1] = imgData[i + 1] + imgData[i] - x;
        //       imgData[i + 2] = imgData[i + 2] + imgData[i] - x;
        //       imgData[i + 3] = imgData[i + 3] + imgData[i] - x
        //     }
        //   };
        // wx.canvasPutImageData({
        //   canvasId: 'image-canvas',
        //   x: 0,
        //   y: 0,
        //   width: that.data.imagewidth,
        //   height: that.data.imageheight,
        //   data: imgData,
        // success(res) {
        // console.log('重绘成功')
        wx.canvasToTempFilePath({
          x: left_cut,
          y: top_cut,
          width: width_cut,
          height: height_cut,
          canvasId: 'image-canvas',
          fileType: 'jpg',
          quality: 0.8,
          fail() {
            wx.showToast({
              title: '存入本地失败',
              icon: 'none',
              duration: 2000
            });
            wx.navigateBack({
              delta: 1
            })
          },
          success(resTemple) {
            console.log('resTemple:', resTemple.tempFilePath);
            utils.checkAndSaveFie(resTemple.tempFilePath)
            .then((res1) => {
              console.log('保存本地成功res1:', res1)
              that.setData({
                savedFilePath: res1
              });
              console.log('存入本地', that.data.savedFilePath)

              wx.uploadFile({
                url: 'https://xiaotiku.natapp4.cc/uploadFile', //非真实的接口地址
                filePath: that.data.savedFilePath, //不能用临时文件，已被移走
                name: 'file',
                formData: {
                  userId: app.globalData.userInfo.userId,
                  grade: app.globalData.grade,
                  subject: app.globalData.subject,
                  ce: app.globalData.ce,
                  usage: 'question',
                  fileType: 'jpg'
                },
                fail(err) {
                  console.log('上传失败', err)
                  wx.showToast({
                    title: '上传失败，请重新拍摄',
                    icon: 'none',
                    duration: 2000
                  });
                  wx.navigateBack({})
                },
                success(res) {
                  var data = JSON.parse(res.data)
                  console.log('res.data为', data['location'])
                  app.globalData.timuPhotoUrl = data['location']
                  console.log('app.globalData.timuPhotoUrl为', app.globalData.timuPhotoUrl)
                  var page = getCurrentPages();
                  var prepage = page[page.length - 2]
                  console.log('that.data.actionTtype:',that.data.actionType)
                  if (that.data.actionType == "ques") { //如果是从问题转过来的，则设置上一页的location
                    var quesInfo = prepage.data.quesInfo;
                    quesInfo[0] = {
                      'quesUrl': data['location'],
                      'quesLocal': that.data.savedFilePath,
                      'quesType': 'img'
                    }
                    prepage.setData({
                      location: that.data.savedFilePath,
                      isMenuaddOn: true,
                      quesInfo: quesInfo,
                      // isMenuaddOn:false
                    }) //设置上一页的location
                    console.log('prepage.data.quesInfo为：', prepage.data.quesInfo)
                    console.log('prepage.data.location为：', prepage.data.location)
                    wx.navigateBack({})
                  };
                  if (that.data.actionType == "ans") { //如果是从答案转过来的，则设置上一页的quesInfo6
                    var quesInfo = prepage.data.quesInfo;
                    quesInfo[1].answer[quesInfo[1].answer.length] = {
                      'ansUrl': data['location'],
                      'ansLocal': that.data.savedFilePath,
                      'ansType': 'img'
                    }
                    prepage.setData({
                      isMaskON: false,
                      isMenugroupOn: false,
                      quesInfo: quesInfo
                    }) //设置上一页的location
                    console.log('prepage.data.quesInfo为：', prepage.data.quesInfo[1].answer)
                    console.log('prepage.data.location为：', prepage.data.location)
                    wx.navigateBack({})
                  };
                },

              })
            }).catch((err) => {
              console.log('保存时发生错误：', err) //error是否需要callback？
            })


            //   }
            // })

          }
        })

        // }
        // })
        // }

        // });
      })

    })


  },





  flash: function() {
    var x = !(this.data.flashOn)
    console.log(x)
    this.setData({
      flashOn: x
    })
  },

  quxiao: function() {
    wx.navigateBack({
      url: '../jibiji/jibiji',
    })
  },

  quxiao_2: function() {
    wx.redirectTo({
      url: '../paizhao/paizhao',
    })
  },


  uploadFile: function(data) {},



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      actionType: options.actionType
    })
    console.log('actionType:', options.actionType)
    this.ctx = wx.createCameraContext()

    // 获取屏幕宽度、高度赋值给imagewiddth、imageheight
    this.setData({
        imagewidth: wx.getSystemInfoSync().windowWidth,
        imageheight: wx.getSystemInfoSync().windowHeight,
        // 上部遮罩层高度
        mask_top_height: (wx.getSystemInfoSync().windowHeight) / 4,
        // 底部遮罩层高度
        mask_bottom_height: (wx.getSystemInfoSync().windowHeight) / 4,
        // 相框高度
        camera_height: (wx.getSystemInfoSync().windowHeight) / 2,
      }),


      console.log(this.data.imagewidth, this.data.imageheight, this.data.mask_top_height)
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

    var that = this
    wx.authorize({
      scope: 'scope.camera',
      success: function(res) {
        that.setData({
          isShowCamera: true,
        })

      },
      fail: function(res) {
        console.log("" + res);
        wx.showModal({
          title: '请求授权您的摄像头',
          content: '如需正常使用此小程序功能，请您按确定并在设置页面授权用户信息',
          confirmText: '确定',
          success: res => {
            if (res.confirm) {
              wx.openSetting({
                success: function(res) {
                  console.log('成功');
                  console.log(res);
                  if (res.authSetting['scope.camera']) { //设置允许获取摄像头
                    console.log('设置允许获取摄像头')
                    wx.showToast({
                      title: '授权成功',
                      icon: 'success',
                      duration: 1000
                    })
                    that.setData({
                      isShowCamera: true,
                    })

                  } else { //不允许
                    wx.showToast({
                      title: '授权失败',
                      icon: 'none',
                      duration: 1000
                    })
                    wx.redirectTo({
                      url: 'jibiji/jibiji',
                    })
                  }
                }
              })
            } else { //取消
              wx.showToast({
                title: '授权失败',
                icon: 'none',
                duration: 1000
              })
              wx.redirectTo({
                url: 'tiku/tiku',
              })
            }
          }
        })

      }
    })
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