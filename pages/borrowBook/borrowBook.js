var app = getApp()
var util = require('../../utils/util.js')
Page({
  data:{
    books:[],
    curNav: 1,
    curIndex: 0,
    cartTotal: 0,
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    wx.setNavigationBarTitle({
      title: "借书栏",
    })
   
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    var dataUrl = "https://www.biulibiuli.cn/osc/";
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processData)
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  
  },
 
  processData: function (BookInfo) {
    //处理信息 并加载数据
    var books = []
    if (BookInfo.message.length <= 0) {
      var _this = this;
      if (!_this.data.disabledRemind) {
        _this.setData({
          disabledRemind: true
        });
        setTimeout(function () {
          _this.setData({
            disabledRemind: false
          });
        }, 2000);
      }
    }
    for (var idx in BookInfo.message) {
      var subject = BookInfo.message[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        // stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        bookId: subject.bookId,
        url: subject.url,
        selected : false,
      }
      books.push(temp)
    }
    this.setData({
      books: books
    });
    console.log(books)
    wx.hideNavigationBarLoading();
  },
 
  selectList(e) {
    var cartTotal= this.data.cartTotal;
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let books = this.data.books;                    // 获取购物车列表
    const selected = books[index].selected;         // 获取当前商品的选中状态
    if(selected == false)
    {
      cartTotal+=1;
    }
    else{
      cartTotal-=1;
    }
    books[index].selected = !selected;              // 改变状态
    this.setData({
      books: books,
       cartTotal : cartTotal
    });

  },

  deleteList(e) {
    var cartTotal = this.data.cartTotal;
    const index = e.currentTarget.dataset.index;
    let books = this.data.books;
    const selected = books[index].selected;         // 获取当前商品的选中状态
    if (selected == true)
     {
      cartTotal -= 1;
    }
   
    books.splice(index, 1);              // 删除购物车列表里这个商品
    this.setData({
      books: books,
      cartTotal : cartTotal
    });

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