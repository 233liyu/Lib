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
    console.log(this.globalData);
    console.log(this.globalData.selected_frequence);  

    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
               typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    open_recommendation : null,
    selected_frequence : null
  }
})