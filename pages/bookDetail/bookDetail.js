var app = getApp();
Page({
  data:{
    Storagevisible : 0,
    RealtiveReCommand:{},

    },
   onLoad: function(options) {
    var bookId = options.id;
    var InfoUrl ='https://www.biulibiuli.cn/book_test/bookInfo';
   var ReCommandUrl = 'https://www.biulibiuli.cn/osc/';
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
      // success
      //console.log(res.data);
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
        var guide_read;
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
        isbn10: data.isbn10,
        title: data.title,
        guide_read:data.guide_read,
        comments :data.comments,
        storage : data.storage,
        storage_books : data.storage_books,
    };
     this.setData(readyData);
     console.log(readyData)
     wx.hideNavigationBarLoading();
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
    processReCommanBook(data,settedkey)
    {
         var books = [];
         var reData = {};
     reData[settedkey] = {
      books: data.message
    }
    this.setData(reData);
    console.log(reData)
    wx.hideNavigationBarLoading();

    },


      viewBookPostImg: function(e) {
        var src = e.currentTarget.dataset.src;
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: [src] // 需要预览的图片http链接列表
        })
    },

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
 
 onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})