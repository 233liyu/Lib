var app = getApp()
var pp = null
function requestUserInfo(that) {
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
        fail: function () {
          console.log('获取用户信息失败')
          wx.redirectTo({
            url: '/pages/Login/CellPhone',
            success: function (res) {
              // success
            },
            fail: function (res) {
              // fail
            },
            complete: function (res) {
              // complete
            }
          })

        }
      })
    },
    fail: function () {
      console.log('log in failed')
    }
  })
}
Page({
  data:{
   userInfo:null,
   afterLogin:false,
  },
  
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    console.log("user:onload")
    if(app.globalData.userInfo == null){
      console.log("user:is not logged")
      wx.navigateTo({
        url: '/pages/Login/LoginMain',
      })

    } else {
      console.log("user:is logged")
      var user = app.globalData.userInfo;
      this.setData({
        userInfo: user,
        afterLogin:true,
      })
      console.log("user:")
      console.log(user)
    }
    
  },
  
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    if (app.globalData.userInfo != null) {
      var user = app.globalData.userInfo;
      this.setData({
        userInfo: user,
        afterLogin: true,
        beforeLogin: false,
      })

    }
  },
  ToFailed:function(that){
    wx.navigateTo({
      url: '../orders/unfinishedOrder/unfinishedOrder',
    })

  },
  ToSuccess:function(that){
    wx.navigateTo({
      url: '../orders/finishedOrder/finishedOrder',
    })
  },
  timeout:function(that){
    wx.navigateTo({
      url: '../orders/failedOrder/failedOrder',
    })
  },

  //去往登录页面
  toLogin:function(){

     wx.navigateTo({
       url: '/pages/Login/LoginMain',
     })
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