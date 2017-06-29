// pages/orders/finishedOrder/finishedOrder.js
Page({
  data: {
    "orders": [
      {
        "order_tile": "订单编号",
        "id": "1",
        "order_state": "finished",
        "books": [
          {
            "book_title": "baiyexing",
            "book_content": "book_id is 1231234",
            "book_img_url": "http://www.baidu.com/img/bd_logo1.png",
            "book_url": "12321312"
          }
          , {
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
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  showQRcode: function (e) {
    console.log(e);
    var url = 'https://www.biulibiuli.cn/hhalab?id=' + e.target.id + '&time=';
    url = encodeURIComponent(url);
    wx.navigateTo({
      url: '../QRPage/QRPage?url=' + url,
    })
  },
})