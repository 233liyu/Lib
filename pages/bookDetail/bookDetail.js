var app = getApp()
var pp = null
Page({
  data:{
    Storagevisible : 0,
    localover: '../../images/icon/icon_d_arrow_down.png',
    hideText: true,
    hideClass: 'up',
    RealtiveReCommand:{},

    },
   onLoad: function(options) {
    var bookId = options.id;
    var InfoUrl = 'https://www.biulibiuli.cn/hhlab/book_details?isbn13=' + bookId;
    var ReCommandUrl = 'https://www.biulibiuli.cn/hhlab/indexre';
    this.getReCommBooklist(ReCommandUrl,bookId);
    this.getBookInfo(InfoUrl , bookId);
    },

    getBookInfo :function(InfoUrl , bookId)
    {
      
      wx.showNavigationBarLoading()
      var that = this;
      wx.request({
         url: InfoUrl ,
    data: {},
          method: 'GET', 
     header: {
        "Content-Type": "json"
      },
    success: function(res){
      that.processBookData(res.data,bookId);
    },
    fail: function(error) {
      // fail
      console.log(error)
    },
    complete: function(res) {
      // complete
    }
      })
 },

    processBookData(data , bookId)
    {
       var rating = [];
        var authors = [];
        var ImageUrl;
        var bookid;
        var publisher;
        var isbn10;
        var title;
        var guide_read = '';
        var comments = [];
        var storage;
        var storage_books=[];
        var Storagevisible;
        var readyData = {
        bookId : bookId,
        Storagevisible : 0,
        rating : data.rating,
        authors : data.author,
        ImageUrl : data.image,
        bookid : data.bookid,
        publisher:data.publisher,
        isbn13: data.isbn13,
        title: data.title,
        guide_read: data.guide_read,
        comments :data.comments,
        storage : data.storage,
        storage_books : data.storage_books,
        };
     this.setData(readyData);
     console.log(readyData)
     wx.hideNavigationBarLoading();
   },
    
    
    showall: function () {
      var that = this;
      var hide = that.data.hideText;
      var hideClass = that.data.hideClass == 'up' ? 'down' : 'up';
      that.setData({
        hideText: !hide,
        hideClass: hideClass
      })
    },
    getReCommBooklist(ReCommandUrl,bookId)
    {
      wx.showNavigationBarLoading()
      var that = this;
      wx.request({
         url: ReCommandUrl ,
    data: {},
          method: 'GET', 
     header: {
        "Content-Type": "json"
      },
    success: function(res){
      // success
      that.processReCommanBook(res.data,'RealtiveReCommand');
    },
    fail: function(error) {
      // fail
      console.log(error)
    },
    complete: function(res) {
      // complete
    }
      })

    },
    //处理相关推荐书籍信息
    processReCommanBook(BookInfo,settedkey)
    {
      var books = [];
      var readyData = {};
      for (var idx in BookInfo.message) {
      var subject = BookInfo.message[idx];
      var title = subject.title;
      if (title.length >= 6) {
          title = title.substring(0, 6) + "...";
        }
        var temp = {
          title: subject.title,
          bookId: subject.isbn13,
          image: subject.image,
        }
        books.push(temp)
      }
      readyData[settedkey] = {
        books: books
      }

      this.setData(readyData);
      console.log(readyData)
      wx.hideNavigationBarLoading();

    },
   

      viewBookPostImg: function(e) {
        var src = e.currentTarget.dataset.src;
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: [src] // 需要预览的图片http链接列表
        })
    },

//查看馆藏信息
  StorageInfo : function(e){
     if(e.currentTarget.dataset.vis == 0){ 
      this.setData({
      Storagevisible : 1
      })
    }
    else{
       this.setData({
      Storagevisible : 0
       })
    }
  },

//加入借书栏
  AddBorrow : function(event){
    //先判断用户是否登录
    if (app.globalData.userInfo == null) {
      console.log("user:is not logged")
      wx.navigateTo({
        url: '/pages/Login/LoginMain',
      })

    } else {
     
      var Isbn13 = event.currentTarget.dataset.bookid;
      //console.log(Isbn13);
      if (Isbn13) {
        var session = wx.getStorageSync('sessionID');
        var that = this;
        var dataUrl = "https://www.biulibiuli.cn/hhlab/cartHandler";
        wx.request({
          url: dataUrl,
          data: {
            "operation": "add",
            "session_id": session,
            "isbn13": Isbn13,
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          success: function (res) {
            var content;
            if(res.data == 'success'){
                 content = "加入借书栏成功";
            }else{
              content="加入失败，请稍后尝试～";
            }
            console.log(res)
            wx.showToast({
              title: content,
              icon: 'success',
              image: '',
              duration: 1500,
              mask: true,
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
      
    
    }
   
   
  },

  //推荐部分点击封面到书籍到详情页
   onBookTap : function(event)
  {
      var bookId = event.currentTarget.dataset.bookid;
      console.log(bookId);
      wx.navigateTo({
      url: "../bookDetail/bookDetail?id="+bookId
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