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
var util = require('../../utils/util.js')
Page({
  data:{
    userInfo: null,
    afterLogin: false,
    beforeLogin: true,
    t: '\n',
    char_lt: "<",
    char_gt: ">",
    books:[],
    curNav: 1,
    curIndex: 0,
    cartTotal: 0,
    session_id: null,
    no_more:false,

  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    wx.setNavigationBarTitle({
      title: "借书栏",
    })
    if (app.globalData.userInfo == null) {
      console.log("user:is not logged")
      wx.navigateTo({
        url: '/pages/Login/LoginMain',
      })

    } else {
      console.log("user:is logged")
      var user = app.globalData.userInfo;
      this.setData({
        userInfo: user,
        afterLogin: true,
        beforeLogin: false,
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
      var session = wx.getStorageSync('sessionID');
      var that = this;
      var dataUrl =         "https://www.biulibiuli.cn/hhlab/cartHandler";
      wx.request({
        url: dataUrl,
        data: {
          "operation": "show",
          "session_id": session,
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          that.processData(res.data)
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  
  },
 
  processData: function (BookInfo) {
    var that = this;
    if (BookInfo.length <= 0) {
      if (!_this.data.disabledRemind) {
        that.setData({
          disabledRemind: true
        });
        setTimeout(function () {
         that.setData({
            disabledRemind: false
          });
        }, 2000);
      }
    }
   if(BookInfo.length > 0)
   {
     this.setData({
       no_more: false,
     })
     //处理信息 并加载数据
     var books = [];
     var bookId, url, authors, storage, storage_b, subject, title, selected;
     console.log(BookInfo);
     for (var idx in BookInfo) {
      var subject = BookInfo[idx];
      title = subject.title;
      if (title.length >= 20) {
        title = title.substring(0, 20) + "...";
      }
      var temp = {
        title: title,
        bookId: subject.isbn13,
        url: subject.image,
        authors: subject.author,
        storage: subject.storage,
        storage_cb: subject.storage_cb,
        selected : false,
      }
      books.push(temp)
    }
    this.setData({
      books: books
    });
    console.log(books)
    wx.hideNavigationBarLoading();
   }
    else{
     this.setData({
       no_more: true,
     })
    }
   
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
        const isbn13 = books[index].bookId;
        this.deletfromDatabase(isbn13);
        if (selected == true && cartTotal)
     {
      cartTotal -= 1;
    }
   books.splice(index, 1);  // 删除购物车列表里这个商品
    this.setData({
      books: books,
      cartTotal : cartTotal
    });

  },
  deletfromDatabase : function(isbn13){
  var session = wx.getStorageSync('sessionID');
  var that = this;
  var dataUrl = "https://www.biulibiuli.cn/hhlab/cartHandler";
  wx.request({
    url: dataUrl,
    data: {
      "operation": "delete",
      "session_id": session,
      "isbn13": isbn13,
    },
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    success: function (res) {
      var content;
      if (res.data != 'success') {
        content = "加入失败，请稍后尝试～";
        wx.showToast({
          title: content,
          icon: '',
          image: '',
          duration: 1500,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
      console.log(res)
    
    },
    fail: function (res) { },
    complete: function (res) { },
  })

},

  //去往登录页面
  toLogin: function () {
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