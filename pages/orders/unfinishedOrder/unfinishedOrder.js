// pages/orders/unfinishedOrder/unfinishedOrder.js
Page({
  data: {
    "orders": [
      {
        "order_tile": "待确认",
        "id": "12312311",
        "order_state": "dn-confirmed",
        "books": [
          {
            "book_title": "baiyexing",
            "book_content": "book_id is 1231234",
            "book_img_url": "http://www.baidu.com/img/bd_logo1.png",
            "book_url": "12321312"
          },
          {
            "book_title": "baiyexing",
            "book_content": "book_id is 1231234",
            "book_img_url": "http://www.baidu.com/img/bd_logo1.png",
            "book_url": "12321312"
          }
        ],
        "order_info": [
          "订单创建时间： 12039102491",
          "订单编号: 123123123123",
          "12131231321"
        ]
      },
      {
        "order_tile": "待支付",
        "id": "12312311",
        "order_state": "dn-paid",
        "books": [
          {
            "book_title": "baiyexing",
            "book_content": "book_id is 1231234",
            "book_img_url": "http://www.baidu.com/img/bd_logo1.png",
            "book_url": "12321312"
          },
          {
            "book_title": "baiyexing",
            "book_content": "book_id is 1231234",
            "book_img_url": "http://www.baidu.com/img/bd_logo1.png",
            "book_url": "12321312"
          }
        ],
        "order_info": [
          "订单创建时间： 12039102491",
          "订单编号: 123123123123",
          "12131231321"
        ]
      },
      {
        "order_tile": "正在进行",
        "id": "12312311",
        "order_state": "on-going",
        "books": [
          {
            "book_title": "baiyexing",
            "book_content": "book_id is 1231234",
            "book_img_url": "http://www.baidu.com/img/bd_logo1.png",
            "book_url": "12321312"
          },
          {
            "book_title": "baiyexing",
            "book_content": "book_id is 1231234",
            "book_img_url": "http://www.baidu.com/img/bd_logo1.png",
            "book_url": "12321312"
          }
        ],
        "order_info": [
          "订单创建时间： 12039102491",
          "订单编号: 123123123123",
          "12131231321"
        ]
      },
      {
        "order_tile": "正在进行",
        "id": "12312311",
        "order_state": "failed",
        "books": [
          {
            "book_title": "baiyexing",
            "book_content": "book_id is 1231234",
            "book_img_url": "http://www.baidu.com/img/bd_logo1.png",
            "book_url": "12321312"
          },
          {
            "book_title": "baiyexing",
            "book_content": "book_id is 1231234",
            "book_img_url": "http://www.baidu.com/img/bd_logo1.png",
            "book_url": "12321312"
          }
        ],
        "order_info": [
          "订单创建时间： 12039102491",
          "订单编号: 123123123123",
          "12131231321"
        ]
      }
    ]
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
  },

  showQRcode : function(e){
    console.log(e);
    var url = 'https://www.biulibiuli.cn/hha?id='+e.target.id+'&time=';
    url = encodeURIComponent(url);
    wx.navigateTo({
      url: '../QRPage/QRPage?url='+url,
    })
  },

  deleteOrder : function(e){
    var order_id = e.target.id;
    console.log("delete order");
    wx.showModal({
      title: '删除订单',
      content: '您确认要删除该订单吗？删除后不可复原',
      success: function (res) {
        if (res.confirm) {
          console.log('删除订单');
          wx.request({
            // wx.request({
              url: '',
              data: '',
              header: {},
              method: '',
              dataType: '',
              success: function(res) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
              },
              fail: function(res) {console.log('no net connect')},
              complete: function(res) {},
          })
        } else if (res.cancel) {

        }
      }
    })
  },

  toPay : function(e){
    var order_id = e.target.id;
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: '',
      paySign: '',
    })
  }
})
