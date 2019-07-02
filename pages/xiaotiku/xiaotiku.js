var app = getApp()
//数组快速排序
function quickSort(arr) {
  //如果数组长度小于等于1，则返回数组本身
  if (arr.length <= 1) {
    return arr;
  }
  //定义中间值的索引
  var index = Math.floor(arr.length / 2);
  //取到中间值
  var temp = arr.splice(index, 1);
  //定义左右部分数组
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    //如果元素比中间值小，那么放在左边，否则放右边
    if (arr[i] < temp) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(temp, quickSort(right));
}

Page({
  data: {
    windowHeight: 0,
    screenHeight: 0,
    isShunxu: 1,
    isSuiji: 0,
    isNixu: 0,
    fontSize_shunxu: 45,
    fontSize_nixu: 30,
    fontSize_suiji: 30,
    bottomLineLeft: 60,
    tapDaan: '', //点击答案状态，全部放在一个数组中，0表示收起答案，1表示展开答案
    //全科题目信息全部放在一个对象
    subjectTotalInfo: {
      subject10: {
        subject: '高一语文',
        quesInfo: {
          400: {
            ID: 400,
            src_timu: '../pic/2.jpg',
            src_fuwuqi: '',
            uploadTime: '',
            zhishidian: 'test',
            daan: [{
                daan1: {
                  xuhao: 1,
                  type: 'pic',
                  src: '../pic/timu.jpg',
                  src_fuwuqi: ''
                }
              },
              {
                daan2: {
                  xuhao: 2,
                  type: 'wenzi',
                  src: '开发垃圾袋今飞凯达',
                  src_fuwuqi: ''
                }
              }
            ],
          },
          20: {
            ID: 20,
            src_timu: '../pic/2.jpg',
            src_fuwuqi: '',
            uploadTime: '',
            zhishidian: '有理数',
            daan: {
              daan1: {
                xuhao: 1,
                type: 'pic',
                src: '../pic/timu.jpg',
                src_fuwuqi: ''
              },
              daan2: {
                xuhao: 2,
                type: 'pic',
                src: '../pic/timu.jpg',
                src_fuwuqi: ''
              }
            },
          },
          300: {
            ID: 300,
            src_timu: '../pic/2.jpg',
            src_fuwuqi: '',
            uploadTime: '',
            zhishidian: '函数',
            daan: {
              daan1: {
                xuhao: 1,
                type: 'wenzi',
                src: '我么大家都方便福建省的防腐剂记得记得京东到家大家都减肥减肥减肥减肥',
                src_fuwuqi: ''
              },
              daan2: {
                xuhao: 2,
                type: 'pic',
                src: '',
                src_fuwuqi: ''
              }
            },
          },
          4: {
            ID: 4,
            src_timu: '../pic/3.jpg',
            src_fuwuqi: '',
            uploadTime: '',
            zhishidian: '有理数',
            daan: {
              daan1: {
                xuhao: 1,
                type: 'pic',
                src: '../pic/3.jpg',
                src_fuwuqi: ''
              },
              daan2: {
                xuhao: 2,
                type: 'wenzi',
                src: '南大街的合法开发商咖啡店见风使舵按时发货客户端是粉红色的供货商电饭锅',
                src_fuwuqi: ''
              }
            },
          },
          5: {
            ID: 5,
            src_timu: '../pic/2.jpg',
            src_fuwuqi: '',
            uploadTime: '',
            zhishidian: '立体几何',
            daan: {
              daan1: {
                xuhao: 1,
                type: 'pic',
                src: '',
                src_fuwuqi: ''
              },
              daan2: {
                xuhao: 2,
                type: 'pic',
                src: '',
                src_fuwuqi: ''
              }
            },
          },
        }
      },
      subject8: {
        subject: '高一数学',
        quesInfo: {
          1: {
            ID: 1,
            src_timu: '../pic/2.jpg',
            src_fuwuqi: '',
            uploadTime: '',
            zhishidian: '有理数',
            daan: {
              daan1: {
                xuhao: 1,
                type: 'pic',
                src: '../pic/timu.jpg',
                src_fuwuqi: ''
              },
              daan2: {
                xuhao: 2,
                type: 'wenzi',
                src: '开发垃圾袋今飞凯达',
                src_fuwuqi: ''
              }
            },
          },
          20: {
            ID: 20,
            src_timu: '../pic/2.jpg',
            src_fuwuqi: '',
            uploadTime: '',
            zhishidian: '有理数',
            daan: {
              daan1: {
                xuhao: 1,
                type: 'pic',
                src: '../pic/timu.jpg',
                src_fuwuqi: ''
              },
              daan2: {
                xuhao: 2,
                type: 'pic',
                src: '../pic/timu.jpg',
                src_fuwuqi: ''
              }
            },
          },
          300: {
            ID: 300,
            src_timu: '../pic/2.jpg',
            src_fuwuqi: '',
            uploadTime: '',
            zhishidian: '函数',
            daan: {
              daan1: {
                xuhao: 1,
                type: 'wenzi',
                src: '我么大家都方便福建省的防腐剂记得记得京东到家大家都减肥减肥减肥减肥',
                src_fuwuqi: ''
              },
              daan2: {
                xuhao: 2,
                type: 'pic',
                src: '',
                src_fuwuqi: ''
              }
            },
          },
          4: {
            ID: 4,
            srctimu: '../pic/2.jpg',
            src_fuwuqi: '',
            uploadTime: '',
            zhishidian: '有理数',
            daan: {
              daan1: {
                xuhao: 1,
                type: 'pic',
                src: '',
                src_fuwuqi: ''
              },
              daan2: {
                xuhao: 2,
                type: 'pic',
                src: '',
                src_fuwuqi: ''
              }
            },
          },
          5: {
            ID: 5,
            src_timu: '../pic/2.jpg',
            src_fuwuqi: '',
            uploadTime: '',
            zhishidian: '立体几何',
            daan: {
              daan1: {
                xuhao: 1,
                type: 'pic',
                src: '',
                src_fuwuqi: ''
              },
              daan2: {
                xuhao: 2,
                type: 'pic',
                src: '',
                src_fuwuqi: ''
              }
            },
          },
        }
      }
    },
    quesInfo: [], //单科题目列表显示信息放在一个对象
    keysOfQuesInfo: [], //quesIn所有key全部放在一个数组  
    quesTotalInfo: {}, //单科题目所有信息全部放在一个对象,key为题目ID
    keysOfTotalQuesInfo: [], //quesTotalInfo所有key全部放在一个数组 
    lastQues: 4, //上次浏览最后一个题号
    numLoad: 4, //一次加载数量
    daanXiala: {},
    showStatus: undefined, //是否显示答案
    src: '../pic/2.jpg',
    src_shanchu: '../pic/shanchu.png',
    src_fenxiang: '../pic/fenxiang.png',
    src_xiala: '../pic/xiala.png',
    src_xuanze: '../pic/xuanze1.png',
    mode: 'scaleToFill',
    current_grade: '高一',
    current_subject: '语文',
    subjecct: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],

    isBluring: true, //是否遮挡
    isPopping: true, //是否已经弹出
    anim_question: {}, //问题模块动画
    anim_answer: {}, //答案模块动画
    animPlus: {}, //旋转动画
    animCollect: {}, //item位移,透明度
    animTranspond: {}, //item位移,透明度
    animInput: {}, //item位移,透明度 
  },



  tapShunxu: function() {
    var fontSize_shunxu = this.data.fontSize_shunxu
    var fontSize_suiji = this.data.fontSize_suiji
    var fontSize_nixu = this.data.fontSize_nixu
    var that = this
    var timer1 = null
    if (fontSize_shunxu = 24) {
      timer1 = setInterval(function() {
        that.setData({
          fontSize_shunxu: fontSize_shunxu,
        })
        fontSize_shunxu = fontSize_shunxu + 3

        if (fontSize_shunxu > 45) {
          clearInterval(timer1)
        }
      }, 30)

      setTimeout(function() {
        that.setData({
          bottomLineLeft: 60
        })
      }, 75)

      if (this.data.fontSize_nixu > this.data.fontSize_suiji) {
        var timer2 = setInterval(function() {
          that.setData({
            fontSize_nixu: fontSize_nixu,
          })
          fontSize_nixu = fontSize_nixu - 3
          if (fontSize_nixu < 30) {
            clearInterval(timer2)
          }
        }, 30)
      } else {
        var timer2 = setInterval(function() {
          that.setData({
            fontSize_suiji: fontSize_suiji,
          })
          fontSize_suiji = fontSize_suiji - 3
          if (fontSize_suiji < 30) {
            clearInterval(timer2)
          }
        }, 30)
      }
    }
    //重新排序key数组 
    if (that.data.isShunxu !== 1) {
      var keysOfQuesInfo = this.data.keysOfQuesInfo
      var keysOfTotalQuesInfo = this.data.keysOfTotalQuesInfo
      keysOfQuesInfo.sort(function(x, y) {
        return x - y;
      });
      keysOfTotalQuesInfo.sort(function(x, y) {
        return x - y;
      });
      console.log('keysOfQuesInfo:')
      console.log(this.data.keysOfQuesInfo)

      var quesInfo = [];
      var that = this;

      for (let i = 0; i < keysOfQuesInfo.length; i++) {


        quesInfo[i] = that.data.quesTotalInfo[keysOfQuesInfo[i]];
        console.log(quesInfo)
      }
      this.setData({
        quesInfo: quesInfo,
        keysOfQuesInfo: keysOfQuesInfo,
        keysOfTotalQuesInfo: keysOfTotalQuesInfo,
        isShunxu: 1,
        isNixu: 0,
        isShunxu: 0
      })

    }
  },



  tapNixu: function() {
    var fontSize_shunxu = this.data.fontSize_shunxu
    var fontSize_suiji = this.data.fontSize_suiji
    var fontSize_nixu = this.data.fontSize_nixu
    var that = this
    var timer3 = null
    if (fontSize_nixu = 30) {
      timer3 = setInterval(function() {
        that.setData({
          fontSize_nixu: fontSize_nixu,
        })
        fontSize_nixu = fontSize_nixu + 3

        if (fontSize_nixu > 45) {
          clearInterval(timer3)
        }
      }, 30)
      this.setData({
        bottomLineLeft: 240
      })
      if (this.data.fontSize_shunxu > this.data.fontSize_suiji) {
        var timer4 = setInterval(function() {
          that.setData({
            fontSize_shunxu: fontSize_shunxu,
          })
          fontSize_shunxu = fontSize_shunxu - 3
          if (fontSize_shunxu < 30) {
            clearInterval(timer4)
          }
        }, 30)
      } else {
        var timer4 = setInterval(function() {
          that.setData({
            fontSize_suiji: fontSize_suiji,
          })
          fontSize_suiji = fontSize_suiji - 3
          if (fontSize_suiji < 30) {
            clearInterval(timer4)
          }
        }, 30)
      }
    }
    //重新排序key数组 
    if (that.data.isNixu !== 1) {
      var keysOfQuesInfo = this.data.keysOfQuesInfo
      var keysOfTotalQuesInfo = this.data.keysOfTotalQuesInfo
      console.log(keysOfQuesInfo)
      console.log(keysOfTotalQuesInfo)
      keysOfQuesInfo.sort(function(x, y) {
        return y - x;
      });
      keysOfTotalQuesInfo.sort(function(x, y) {
        return y - x;
      });
      console.log(this.data.keysOfQuesInfo)
      var quesInfo = [];
      var that = this;
      for (let i = 0; i < keysOfQuesInfo.length; i++) {

        quesInfo[i] = that.data.quesTotalInfo[keysOfQuesInfo[i]];

      }
      this.setData({
        quesInfo: quesInfo,
        keysOfQuesInfo: keysOfQuesInfo,
        keysOfTotalQuesInfo: keysOfTotalQuesInfo,
        isNixu: 1,
        isShunxu: 0,
        isSuiji: 0
      })
      // console.log(this.data.quesInfo)
    }
  },

  showHide: function(event) {
    let tmpStatus = this.data.showStatus;
    let targetId = event.target.dataset.id;
    console.log(event)

    tmpStatus[targetId] = !tmpStatus[targetId];
    this.setData({
      showStatus: tmpStatus
    });
    console.log(this.data.showStatus)
  },
  tapSuiji: function() {
    var fontSize_shunxu = this.data.fontSize_shunxu
    var fontSize_suiji = this.data.fontSize_suiji
    var fontSize_nixu = this.data.fontSize_nixu
    var that = this
    var timer3 = null
    if (fontSize_suiji = 30) {
      timer3 = setInterval(function() {
        that.setData({
          fontSize_suiji: fontSize_suiji,
        })
        fontSize_suiji = fontSize_suiji + 3

        if (fontSize_suiji > 45) {
          clearInterval(timer3)
        }
      }, 30)
      this.setData({
        bottomLineLeft: 150,
      })
      if (this.data.fontSize_shunxu > this.data.fontSize_nixu) {
        var timer4 = setInterval(function() {
          that.setData({
            fontSize_shunxu: fontSize_shunxu,
          })
          fontSize_shunxu = fontSize_shunxu - 3
          if (fontSize_shunxu < 30) {
            clearInterval(timer4)
          }
        }, 30)

      } else {
        var timer4 = setInterval(function() {
          that.setData({
            fontSize_nixu: fontSize_nixu,
          })
          fontSize_nixu = fontSize_nixu - 3
          if (fontSize_nixu < 30) {
            clearInterval(timer4)
          }
        }, 30)
      }
    }
    //重新排序key数组 
    // if (that.data.isSuiji !== 1) {
      var keysOfQuesInfo = this.data.keysOfQuesInfo
      var keysOfTotalQuesInfo = this.data.keysOfTotalQuesInfo
      console.log(keysOfQuesInfo)
      console.log(keysOfTotalQuesInfo)
      keysOfQuesInfo.sort(function(x, y) {
        return (0.5 - Math.random());
      });
      keysOfTotalQuesInfo.sort(function(x, y) {
        return (0.5 - Math.random());
      });
      console.log(this.data.keysOfQuesInfo)
      var quesInfo = [];
      var that = this;
      for (let i = 0; i < keysOfQuesInfo.length; i++) {

        quesInfo[i] = that.data.quesTotalInfo[keysOfQuesInfo[i]];

      }
      this.setData({
        quesInfo: quesInfo,
        keysOfQuesInfo: keysOfQuesInfo,
        keysOfTotalQuesInfo: keysOfTotalQuesInfo,
        isNixu: 0,
        isShunxu: 0,
        isSuiji: 1
      })
      // console.log(this.data.quesInfo)
    // }

  },



  changeSubject: function() {
    wx.navigateTo({
      url: '../subject/subject?subject=' + this.data.current_subject + '&grade=' + this.data.current_grade,
    })
  },
  //十字图标，点击弹出
  plus: function() {

    if (this.data.isPopping) {
      //缩回动画
      this.popp();
      this.setData({
        isPopping: false
      })
    } else if (!this.data.isPopping) {
      //弹出动画
      this.takeback();
      this.setData({
        isPopping: true
      })
    }
  },

  //弹出动画
  popp: function() {
    //plus顺时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,

      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,

      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(360).step();
    animationcollect.translate(-60, -60).rotateZ(360).opacity(1).step();
    animationTranspond.translate(-100, -20).rotateZ(360).opacity(1).step();
    animationInput.translate(-18, -100).rotateZ(360).opacity(1).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },
  //收回动画
  takeback: function() {
    //plus逆时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).step();
    animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
    animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
    animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },


  onLoad: function(options) {

    //获取题目条数，生成相应答案是否下拉信息

    let statuses = {};
    let tempQuesInfo = {};
    var that = this;



    for (var j in this.data.subjectTotalInfo) {
      if (this.data.subjectTotalInfo[j].subject == (this.data.current_grade + this.data.current_subject)) {

        tempQuesInfo = this.data.subjectTotalInfo[j].quesInfo;

      }
    };

    this.setData({
      windowHeight: app.globalData.windowHeight,
      screenHeight: app.globalData.screenHeight,
      quesTotalInfo: tempQuesInfo
    });

    var keysOftempQuesInfo = Object.keys(tempQuesInfo)
    var quesInfo = []
    var keysOfQuesInfo = []
    // console.log(keysOftempQuesInfo)
    for (let i = 0; i < keysOftempQuesInfo.length; i++) {
      if (keysOftempQuesInfo[i] == that.data.lastQues) {
        // console.log(i)
        for (let j = i; j < that.data.numLoad + i; j++) {
          quesInfo[j - i] = tempQuesInfo[keysOftempQuesInfo[j]]
          keysOfQuesInfo[j - i] = keysOftempQuesInfo[j]
        }
        break
      }
    }
    this.setData({
      quesInfo: quesInfo,
      keysOfQuesInfo: keysOfQuesInfo,
      keysOfTotalQuesInfo: keysOftempQuesInfo
    })
    console.log('quesInfo:')
    console.log(this.data.quesInfo)
    console.log('keysOfQuesInfo:')
    console.log(this.data.keysOfQuesInfo)
    console.log('keysOfTotalQuesInfo:')
    console.log(this.data.keysOfTotalQuesInfo)

    let status = Object.keys(this.data.quesInfo);
    for (var i = 0; i < this.data.keysOfQuesInfo.length; i++) {
      statuses[keysOfQuesInfo[i]] = true
    };
    console.log('statuses:')
    console.log(statuses)
    this.setData({
      showStatus: statuses,
    });

  },
  onReady: function() {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function() {
    // 生命周期函数--监听页面显示
  },
  onHide: function() {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function() {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})