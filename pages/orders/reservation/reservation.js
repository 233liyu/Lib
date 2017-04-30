// pages/orders/reservation/reservation.js
Page({
  data:{
    
    "reservation_orders" : {
      "valid_orders" :[
        {
          "id" : "12312311",
          "order_state" : "waiting",
          "people_waiting" : 3,
          "books" : 
            {
              "book_title" : "白夜行",
              "book_content" : "book_id is 1231234",
              "book_img_url" : "http://www.baidu.com/img/bd_logo1.png",
              "book_url" : "12321312"
            },
          "order_info" : [
            "订单创建时间： 12039102491",
            "订单编号: 123123123123",
            "12131231321"
          ]
        },{
          "id" : "12312312",
          "order_state" : "ready",
          "reserve_time": "2017-2-3 6:30",
          "books" : 
            {
              "book_title" : "白夜行",
              "book_content" : "book_id is 1231234",
              "book_img_url" : "http://www.baidu.com/img/bd_logo1.png",
              "book_url" : "12321312"
            },
          "order_info" : [
            "订单创建时间： 12039102491",
            "订单编号: 123123123123",
            "12131231321"
          ]
        },{
          "id" : "12312312",
          "order_state" : "out_of_time",
          "reserve_time": "2017-2-3 6:30",
          "books" : 
            {
              "book_title" : "白夜行",
              "book_content" : "book_id is 1231234",
              "book_img_url" : "http://www.baidu.com/img/bd_logo1.png",
              "book_url" : "12321312"
            },
          "order_info" : [
            "订单创建时间： 12039102491",
            "订单编号: 123123123123",
            "12131231321"
          ]
        }
      ],
      
    }
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