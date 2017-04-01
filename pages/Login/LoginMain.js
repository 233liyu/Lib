//index.js
//获取应用实例
var app = getApp()
var pp = null

function requestUserInfo(that){
    // 拉起获取用户信息的请求
    console.log(that)
  wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            console.log('成功拉起授权')
            app.globalData.userInfo = res.userInfo
            that.setData({
              userInfo: res.userInfo
            })
          },
          fail : function(){
            console.log('获取用户信息失败')   
            wx.redirectTo({
              url: '/pages/Login/CellPhone',
              success: function(res){
                // success
              },
              fail: function(res) {
                // fail
              },
              complete: function(res) {
                // complete
              }
            })    
                 
          }
        })
      },
      fail: function(){
        console.log('log in failed')
      }
    })
}

function isUserLogged(){
  // check if the user have authorised the User data
  var result = false;
  app.getUserInfo(function(userInfo){
    if(userInfo){
      console.log('logged')      
      result = true;
    } else{
      console.log('did not log')            
      result = false;
    }
  })
  return result
}

//-------------- end of static functions ------------------


Page({
  data: {
    userInfo: {}
  },

// onLoad get user data
  onLoad: function () {
    console.log('onLoad')
    //调用应用实例的方法获取全局数据
    typeof pp == Object
    pp = this
    if(isUserLogged()){
      console.log('aready loaded')
    } else{
      console.log('拉起授权')            
      requestUserInfo(this)
      // that.data.userInfo = app.getUserInfo()
    }
  },



// tap the log with wechat button
  Log_WeChat: function(){
    if(isUserLogged()){
      // if we have the user data, then send the request
      wx.request({
        url: 'https://URL',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
        },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
        }
      })
    } else{
      // we don't have the user data, ask to have the authorization
      // wx.showModal({
      //   title: '提示',
      //   content: '您还未授权嚯哈图书馆获得您的基本信息，如果需要使用微信登录，请为小程序授权',
      //   confirmText: '拉起授权',
      //   cancelText: '取消',
      //   success: function(res) {
      //     if (res.confirm) {
      //       requestUserInfo(pp)
      //       console.log('用户点击确定')
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //     }
      //   }
      // })
    }
  },

// log with cell phone number
  Log_Phone: function(tap) {
    wx.redirectTo({
      url: '/pages/Login/CellPhone',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  }

})
