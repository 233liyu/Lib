// pages/notification/notice.js
Page({
  data:{
    messages : [
      {
        "id" : 1,
        "title" : "这里",
        "content" : "你没还书啊！啊哈哈哈",
        "signature" : "liyu",
        "date" : "2017-4-11"
      }, {
        "id" : 2,
        "title" : "我是你爸爸",
        "content" : "嚯哈哈嚯哈嚯哈",
        "signature" : "liyu",
        "date" : "2017-4-11"
      }, {
        "id" : 2,
        "title" : "我是你爸爸",
        "content" : "嚯哈哈嚯哈嚯哈",
        "signature" : "liyu",
        "date" : "2017-4-11"
      }, {
        "id" : 2,
        "title" : "我是你爸爸",
        "content" : "嚯哈哈嚯哈嚯哈",
        "signature" : "liyu",
        "date" : "2017-4-11"
      }, {
        "id" : 2,
        "title" : "我是你爸爸",
        "content" : "嚯哈哈嚯哈嚯哈",
        "signature" : "liyu",
        "date" : "2017-4-11"
      }, {
        "id" : 2,
        "title" : "我是你爸爸",
        "content" : "嚯哈哈嚯哈嚯哈",
        "signature" : "liyu",
        "date" : "2017-4-11"
      }, {
        "id" : 2,
        "title" : "我是你爸爸",
        "content" : "嚯哈哈嚯哈嚯哈",
        "signature" : "liyu",
        "date" : "2017-4-11"
      }
    ] 
  },
  clear_message:function(tap){
    console.log(tap.target.id)
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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