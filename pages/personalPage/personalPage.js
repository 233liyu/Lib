// personalPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestUrl:'https://www.biulibiuli.cn/hhlab/userHome',
    usr : '',
    t: '\n',
    user_name :'',
    user_image:'',
    hiddenLoading: false,
    disabledRemind: false,
    isEmpty: true,
    hasfollowed:false,
    followMsg:'关注',//提示关注 
    hisOwn : false,//判断是否是本人
    comments: [],
    totalCount: 20,
    isbn13: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.data.user = options.userid;
     this.getData(this.data.user, 1, 20);
     
  },

 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },


  onPullDownRefresh: function (event) {
    // 页面相关事件处理函数--监听用户下拉动作
    this.data.comments = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    this.getData(this.data.user, totalCount, totalCount + 20);
    wx.showNavigationBarLoading();

  },
  onReachBottom: function (event) {
    // 页面上拉触底事件的处理函数

    //之后在和后台交互的时候连接加参数
    var totalCount = this.data.totalCount //当前加载的数量
    this.getData(this.data.user, totalCount, totalCount + 20);
    this.data.totalCount += 20;
    wx.showNavigationBarLoading();
  },

  getData: function (userid, begin, end) {
    //参数userid，_begin,_end
    var that = this;
    var session_id = wx.getStorageSync('sessionID');
    wx.request({
      url: this.data.requestUrl,
      data: {
        userid: userid,
        _begin: begin,
        _end: end,
        session_id : session_id
      },
      header: {},
      method: 'POST',
      dataType: '',
      success: function (res) {
        that.processData(res.data[0]);
      },
      fail: function (res) {
        console.log("get error");
      },
      complete: function (res) { },
    })
  },

  //处理数据
  processData: function (data) {
    console.log(data);
    var owner = data.owner;
    var comments = data.comments;
    this.processUser( owner, data.follower, data.hisOwn);//处理用户信息

     /*
     没有评论返回
    */
    if (comments.length == 0) {
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
    } else {
      //对新数据的时间进行处理
      for (var t in comments) {
        comments[t].c_time = this.getLocalTime(comments[t].c_time.time);
      }
    }
    //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
    if (!this.data.isEmpty) {
      comments = this.data.comments.concat(comments);
    }
    else {
      comments = comments;
      this.data.isEmpty = false;
    }
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();

    this.setData({
      username : comments[0].user.name,
      comments: comments,
      hiddenLoading: true
    })

  },
  processUser: function (owner, hasfollow, hisOwn){
    var name, follow, fan, hasfollowed, follow,followMsg ,image;
      image = owner.image
      name = owner.name;
      fan = owner.fan;
      follow = owner.follow;

        if (hisOwn) {
          //本人
          this.setData({
            hasfollowed: false,
            followMsg: '关注',
            hisOwn: true,
            name : name,
            fan :fan,
            image : image,
            follow : follow
          })
        }
        else{
          if (hasfollow){//已关注
            hasfollowed = true;
            followMsg = '已关注';//提示关注 
            hisOwn = false;

          }
          else{
            hasfollowed = false;
            followMsg = '关注';//提示关注 
            hisOwn = false;
          }
         
          this.setData({
            hasfollowed: hasfollowed,
            followMsg: followMsg,
            hisOwn: hisOwn,
            name: name,
            image: image,
            fan: fan,
            follow: follow
          })
        }


  },

  /**
  * 处理时间函数
  */

  getLocalTime: function (timeStamp) {
    var date = new Date();
    date.setTime(timeStamp);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})