/* 公共request 方法 */

//储存图片前先判断是否已满，不满的话删掉最早的5个文件

var checkAndSaveFie = (filePath) => {
  var fileSize = 0
  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().getFileInfo({
      filePath: filePath,
      success(res) {
        fileSize = res.size
        wx.getSavedFileList({
          success(res) {
            console.log('wx.getSavedFileList', res)
            var size = 0; //总大小
            var time=[];
            for (var i = 0; i < res.fileList.length; i++) {

              size = size + res.fileList[i].size;
              time[i] = res.fileList[i].createTime;
            };
            time.sort()
            console.log('用掉空间',size/1024/1024,'兆')
            //现在存储空间10兆,把旧的文件删除
            for (var j = 0; j < res.fileList.length; j++) {
              if ((size + fileSize)> 0.5* 1024 * 1024) {
                console.log('太大了',size)
                var delNum=null;
                for (var k = 0; k < res.fileList.length; k++){
                  if (res.fileList[k].createTime==time[j]){
                    delNum=k;
                    break
                  }
                }
                wx.getFileSystemManager().removeSavedFile({
                  'filePath': res.fileList[delNum].filePath
                })
                size = size - res.fileList[0].size
                console.log('newsize:', size)
              } else {

                break
              }
            }

            wx.saveFile({
              tempFilePath: filePath,
              success(resSave) {
                console.log('util里保存文件成功',resSave.savedFilePath)
                resolve(resSave.savedFilePath)
              },
              fail(err) {
                reject('保存错误，err：', err)
              }
            })
            // 
          }
        })
      }
    })
  })

}


// 请求服务器
const requestUrl = ({
  url,
  params,
  method
}) => {
  let server = 'https://xiaotiku.natapp4.cc'; //正式域名,需要修改
  let session_key = wx.getStorageSync("session_key"),
    that = this;
  if (session_key != "" && session_key != null) {
    var header = {
      'content-type': 'application/json',
      'Cookie': 'sid=' + session_key
    }
  } else {
    var header = {
      'content-type': 'application/json'
    }
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: server + url,
      method: method,
      data: params,
      header: header,
      success: (res) => {
        console.log('登陆后台res', res)

        console.log('statuscode:', res.statusCode)
        if (res.statusCode == 200) {
          wx.hideLoading();
          resolve(res) //异步成功之后执行的函数
        } else {
          wx.showToast({
            title: '请求出错',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          reject('请求出错');
        }
      },
      fail: (res) => {
        wx.hideLoading();
        wx.showToast({
          title: '网络出错',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        reject('网络出错');
      },
      complete: function() {
        wx.hideLoading()
      }
    })
  })
}

// 数据字典
const dictionary = {
  '语文': 1,
  '数学': 2,
  '英语': 3,
  '物理': 4,
  '化学': 5,
  '生物': 6,
  '历史': 7,
  '地理': 8,
  '政治': 9,
  '信息': 10,
  '其它一': 11,
  '其它二': 12,
  '小一': 1,
  '小二': 2,
  '小三': 3,
  '小四': 4,
  '小五': 5,
  '小六': 6,
  '初一': 7,
  '初二': 8,
  '初三': 9,
  '高一': 10,
  '高二': 11,
  '高三': 12,
  '上': 'a',
  '下': 'b'
}
module.exports = {
  requestUrl: requestUrl,
  dictionary: dictionary,
  checkAndSaveFie: checkAndSaveFie
}