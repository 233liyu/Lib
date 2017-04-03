var app = getApp();
var page = Object;
var timing = 0;
var tap_text = 'heheh';
// var start_counting = false;
var t_out;

function count_down(){
  if(!page.data.on_counting){
    console.log('counting start')
    timing = 15
    page.setData({
      on_counting : true
    })
    // console.log('touchend')
    t_out = setInterval(count_down,1000)
  }

  if(timing == 0){
    // counting down finished
    clearInterval(t_out)
    page.setData({
      on_counting : false,
      button_text: '获取验证码'
    })
    return
  } else {
    timing--
    // console.log(timing)
    tap_text = timing + 's'
    page.setData({
      button_text : tap_text
    // console.log(tap_text)
    })
  }
}

Page({
  data:{
    button_text: '',
    tap_color:'#4d9f24',
    focus_cell:"true",
    submit_button:'true',
    timing: '50',
    on_counting: false
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    // String2
    this.setData({
      button_text: '载入中',
      on_counting: false
    })
  },

  confirm_button:function(touchend){
    // 按下获取验证码按钮时
    console.log()
    if(this.data.on_counting){
      // 时间未到，失败
      console.log('is counting ')
      return;
    } else {
      // wx.request({
      //   url: 'https://URL',
      //   data: {},
      //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      //   // header: {}, // 设置请求的 header
      //   success: function(res){
      //     // success
      //   },
      //   fail: function(res) {
      //     // fail
      //   },
      //   complete: function(res) {
      //     // complete
      //      count_down();
      //   }
      // })
      count_down();
    }
  },

  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    // String3
    page = this
    this.setData({
      button_text: '获取验证码'
    })
  },
  onShow:function(){
    // 生命周期函数--监听页面显示

    // String4
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    // String5
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    // String6
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    // String7
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    // String8
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