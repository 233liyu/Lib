var util = require('../../utils/util.js');
Page({
  data: {
    inputValue:'',
    searchUrl: 'http://www.biulibiuli.cn/hhlab/search_book',
    history : false,
    no_result: false,
    s_result:false,
    requestUrl: "",//触底时的请求链接
    totalCount: 20,//总的请求数量
    isEmpty: true,//判断返回是否为空
    disabledRemind: false,
    books:[],
    char_lt: "<",
    char_gt: ">",
     t :'\n',
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var searchData = wx.getStorageSync('searchData') || []; //get local storage
    if(searchData.length)
    {
      console.log(searchData);
      this.setData({
        searchData: searchData,
        history : true,
      })
    }
    
  },


  cancel : function(){
    //  返回到上一个页面
     wx.navigateBack(); 
  },

// 动态搜索操作
  bindKeyInput: function (e) {
     var that = this;
     var inputValue = e.detail.value;
     if(inputValue.length > 0){
       var url = 'https://www.biulibiuli.cn/hhlab/search_book?key=' + inputValue;
       this.data.requestUrl = url; 
       wx.request({
         url: url,
         method: 'GET',
         success: function (result) {
           that.processData(result);
         },
         fail: function (error) {
           console.log(error);
         }
       })
     }
     else{
       this.setData({
         history: true,
         s_result: false,
         no_result:false,
         books : null,
       });
     }
    
  },

  //点击完成
  bindKeyFinish : function(e){
    var that = this;
    var inputValue = e.detail.value;
    if (inputValue.length > 0) {
      //将输入值搜索放进历史
      var searchData = wx.getStorageSync('searchData') || []
      searchData.push(inputValue)
      wx.setStorageSync('searchData', searchData) 
      var url = 'https://www.biulibiuli.cn/hhlab/search_book?key=' + inputValue;
      this.data.requestUrl = url; 
      wx.request({
        url: url,
        method: 'GET',
        success: function (result) {
          that.processData(result);
        },
        fail: function (error) {
          console.log(error);
        }
      })
    }
    else {
      this.setData({
      history: true,
      s_result: false,
      no_result: false,
      books : null
      });
    }
  },


  processData : function(res){
       var books=[];
       if(res.data.length == 0){
       this.setData({
         no_result : true,
         s_result: false,
       });
     }
     //处理查询结果
     else{
        var bookId, url, authors, storage, storage_b ,subject, title;
           for (var idx in res.data) {
           subject = res.data[idx];
           title = subject.title;
         if (title.length >= 20) {
           title = title.substring(0, 20) + "...";
           }
         var temp = {
           title: title,
           bookId : subject.isbn13,
           url: subject.image,
           authors : subject.author,
           storage : subject.storage,
           storage_cb : subject.storage_cb,
         }
         books.push(temp)
       }
        this.data.books = books;
       this.setData({
         history: false,
         no_result: false,
         s_result: true,
         books: books
       });
      }
  },

  BottomData: function (BookInfo){
    var books = [];
    //没有更多啦
    if (BookInfo.length <= 0) {
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
    var bookId, url, authors, storage, storage_b, subject, title;
    for (var idx in BookInfo) {
      subject = BookInfo[idx];
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
      }
      books.push(temp)
    }

    var totalBooks = {}
    //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
    if (!this.data.isEmpty) {
      totalBooks = this.data.books.concat(books);
    }
    else {
      totalBooks = this.data.books;
      this.data.isEmpty = false;
    }
    this.setData({
      books: totalBooks
    });
   
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh()
    this.setData({
      hiddenLoading: true
    })  
  },
  onReachBottom: function (event) {
    // 页面上拉触底事件的处理函数 
    var totalCount = this.data.totalCount; //当前加载的数量
    var nextUrl = this.data.requestUrl + "&beginindex=" + totalCount;
    this.data.totalCount += 20;
     util.http(nextUrl, this.BottomData);//重新加载处理
    //处理请求数量
     wx.showNavigationBarLoading();
  },


  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let searchData = this.data.searchData;
    searchData.splice(index, 1);   
    //重新更新本地缓存
    wx.setStorageSync('searchData', searchData) ;        
    this.setData({
      searchData: searchData,
    });

  },
 
 //点击搜索历史条将会跳转到搜索
  searchHistory:function(e){
    var text = e.currentTarget.dataset.his;
    
  },
 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})