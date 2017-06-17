//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据

    //初始化是否开启推荐的数据
    this.globalData.open_recommendation = wx.getStorageSync('open_recommendation');
    this.globalData.selected_frequence = wx.getStorageSync('selected_frequence');    
  
    if(this.globalData.open_recommendation.length == 0){
      wx.setStorageSync('open_recommendation', true);
    }
    if(this.globalData.selected_frequence.length == 0){
      wx.setStorageSync('selected_frequence', "1");      
    }
    this.globalData.open_recommendation = wx.getStorageSync('open_recommendation');
    this.globalData.selected_frequence = wx.getStorageSync('selected_frequence');    

    // 调用微信登录，建立第三方session
    wx.login({
      success: function (res) {
        console.log(res);
        if(res.errMsg == 'login:ok'){
          // 如果登录成功，发送到服务器换取session key


        }
      },
      fail: function () {
        console.log('log in failed')
      }
    })


  },



  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      // wx.login({
      //   success: function () {
      //     wx.getUserInfo({
      //       success: function (res) {
      //         that.globalData.userInfo = res.userInfo
      //          typeof cb == "function" && cb(that.globalData.userInfo)
      //       }
      //     })
      //   }
      // })
      wx.navigateTo({
        url: '"pages/Login/LoginMain"',
      })
    }
  },
  globalData:{
    userInfo:null,
    open_recommendation : null,
    selected_frequence : null
  }
})