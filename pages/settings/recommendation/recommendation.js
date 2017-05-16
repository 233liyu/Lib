// pages/settings/recommendation/recommendation.js
var app = getApp()
Page({
  data:{
    recommendation : false,
    selected_frequence : 0,
    frequence : [
      "每月一次",
      "两周一次",
      "每周一次",
      "每周两次",
      "每天一次",
    ]
  },

  recommendation : function(e){
    // 推荐开关
    this.setData({
      recommendation : e.detail.value,
    });
    app.globalData.open_recommendation = this.data.recommendation;
    wx.setStorageSync('open_recommendation', this.data.recommendation)
  },

  bindPickerChange : function(e){
    // 推荐频率的选择
    this.setData({
      selected_frequence : e.detail.value
    })
    app.globalData.selected_frequence = e.detail.value
    wx.setStorageSync('selected_frequence', this.data.selected_frequence)
    


    // wx.hideToast()
    // wx.showToast({
    //   title: "loading",
    //   icon: "loading",
    // })
    wx.request({
      url: 'https://www.biulibiuli.cn',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        wx.showToast({
          title: "设置成功",
          icon: "success",
          duration: 5000
        })
      },
      fail: function(res) {
        // fail
        wx.showToast({
          title: "网络连接失败",
        })
      },
      complete: function(res) {
        // complete
        // wx.hideToast();
      }
    })
  },

  edit_info : function(e){
    wx.navigateTo({
      url: '../../settings/userInfo/userInfo',
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
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      recommendation : app.globalData.open_recommendation,
      selected_frequence : app.globalData.selected_frequence
      // recommendation : wx.getStorageSync('open_recommendation'),
      // selected_frequence : 2
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})