var app = getApp()
var pp = null
Page({
  data:{
    Storagevisible : 0,
    localover: '../../images/icon/icon_d_arrow_down.png',
    hideText: true,
    hideClass: 'up',
    ifAdd:false,
    array:['1分','2分','3分','4分','5分'],
    index:0,
    comment:'',
    RealtiveReCommand:{},
    },
   onLoad: function(options) {
    var bookId = options.isbn;
    var unid = options.unid;
    if(unid.length == 0){
     this.setData({
       ifAdd : true,
     })
     }
     else{
     this.setData({
       ifAdd: false,
     })
     }
    var InfoUrl = 'https://www.biulibiuli.cn/hhlab/book_details?isbn13=' + bookId;
    var ReCommandUrl = 'https://www.biulibiuli.cn/hhlab/indexre';
    this.getReCommBooklist(ReCommandUrl,bookId);
    this.getBookInfo(InfoUrl , bookId , unid);
    },
   
    getBookInfo :function(InfoUrl , bookId ,unid)
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
      console.log(res);
      if (res.data== "not exist!"){
         wx.showModal({
           title: '',
           content: '不好意思，图书馆里还没有这边书哟',
           showCancel: false,
           success:function(res){
             wx.navigateBack({
               
             })
           }
         })
      }
      else{
        that.processBookData(res.data, bookId, unid);
      }
      
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

    processBookData(data , bookId , unid)
    { 
         var rating = [];
        var authors = [];
        var ImageUrl;
        var bookid;
        var publisher;
        var title;
        var guide_read = '';
        var comments = [];
        var storage;
        var storage_books=[];
        var Storagevisible;
        var _class;
        var subclass;
        
        //馆藏信息的预处理修改
        for (var idx in data.storage_books){
          var subject = data.storage_books[idx];
          var book_id = subject.book_id;
          var book_location;
          var info = '';//书刊状态显示
          var option ='';//操作选择
          var color = '#000';
          console.log("pr:" + unid);
          console.log("book_id:" + book_id);
          if (book_id == unid) {//判断当前是否有选中图书
            color = '#f36a5a';
          }
          else{
            color = '#000';
          }

          switch (subject.book_state){
            case '1': info = "暂无此书", option =""; break;
            case '2': info = "已借出", option = "预定"; break;
            case '3': info = "已预订", option = "预定"; break;
            case '4': info = "可借", option = "借阅"; break;
          }
          var temp = {
            book_id: subject.book_id,//unid
            book_location: subject.book_location,
            info : info,
            option : option,
            color : color,
          }
          storage_books.push(temp)
        }
  
   
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
        storage_books : storage_books,
        _class:subject._class,
        subclass : data.subclass,
        };
     this.setData(readyData);
     console.log(readyData)
     wx.hideNavigationBarLoading();
   },
    
    //评分选择器
    eventChange : function(e){
      this.setData({
        index : e.detail.value
      });
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
          title: title,
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

  //判断当前操作是预定 还是 借阅
  book_option:function(event){
    //先判断用户是否登录
    if (app.globalData.userInfo == null) {
      console.log("user:is not logged")
      wx.navigateTo({
        url: '/pages/Login/LoginMain',
      })

    } 
    else 
    {
        //在判断用户是否完善个人信息
          var addBorrow = wx.getStorageSync('ableToBorrow');
          if(true){
            var op = event.currentTarget.dataset.op;
            var unid = event.currentTarget.dataset.unid;
            switch (op) {
              case "借阅": this.AddBorrow(unid); break;
            }
          }
          //没有权限，需完善个人信息
          else{
            //弹出提醒
            var containerShow = '';
            var page = this;
            wx.showModal({
              content: "您目前还没有完善个人信息，尚不能借书。请在 “我的” -> “个人设置” 中完善个人信息。",     
              showCancel: false,
              confirmText: "确定",
            
            })

          }     
     }
  },

//加入借书栏
  AddBorrow : function(unid){
      var barcode = unid;
      //console.log(Isbn13);
      if (barcode) {
        var session = wx.getStorageSync('sessionID');
        var that = this;
        var dataUrl = "https://www.biulibiuli.cn/hhlab/cartHandler";
        wx.request({
          url: dataUrl,
          data: {
            "operation": "add",
            "session_id": session,
            "barcode": barcode,
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          success: function (res) {
            var content;
            if(res.data == 'add success'){
                 content = "加入借书栏成功";
            }else{
              switch(res.data){
                case "The book is in your cart!":
                      content = "该书已加入借书栏";
                      break;
                case "The book has been borrowed!":
                  content = "下手慢了，书已被借走";
                  break;
              }
              
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
   
  },

  //推荐部分点击封面到书籍到详情页
   onBookTap : function(event)
  {
      var bookId = event.currentTarget.dataset.bookid;
      console.log(bookId);
      wx.navigateTo({
        url: "../bookDetail/bookDetail?isbn=" + bookId + "&&unid=" + null,
      })
  },

 //提交评论和评分
   finished: function(e){
      this.setData({
        comment : e.detail.value,
      })
   },
   commit:function(e){
     var rate = e.currentTarget.dataset.rate-'0'+1;
     var comment = e.currentTarget.dataset.comment;
     var isbn = e.currentTarget.dataset.isbn;
     //判断用户是否登录
     if (app.globalData.userInfo == null) {
        wx.showModal({
          title: '',
          content: '您目前还没有登录，尚无法评论',
          showCancel:false,
          confirmText:'确定'
        })

     } 
     else{
       var session = wx.getStorageSync('sessionID');
  
       wx.request({
         url: 'https://www.biulibiuli.cn/hhlab/addComment',
         data: {
           "isbn13":isbn,
           "grade" : rate,
           "comment": comment,
           "session_id": session,
         },
         header: {},
         method: 'POST',
         dataType: '',
         success: function(res) {
           console.log(res.data);
           if (res.data =="add success") {
             wx.showToast({
               title: "添加成功",
               icon: "success",
               duration: 5000
             });
           } else {
             wx.showToast({
               title: "添加失败",
               icon: "",
               duration: 1500
             });
             console.log(res.data.message);
           }
           wx.navigateTo({
             
             url: '/pages/bookDetail/bookDetail?unid=null&isbn='+isbn,
           })
         },
         fail: function(res) {},
         complete: function(res) {},
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