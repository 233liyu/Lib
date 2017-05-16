// pages/settings/userInfo/userInfo.js
Page({
  data:{
    "deploma":[
     "", 
      "小学及以下",
      "初中",
      "高中",
      "大学本科",
      "研究生",
      "博士及以上学历"
    ],

    "id_type":[
      "",
      "身份证",
      "护照"
    ],

    "user_detail":{
      "user_name":"",
      "birthday":"",
      "diploma":null,
      "email":"",
      "phone_num":"",
      "id_type":null,
      "id_num":"",
      "mail_address":"",
      "mail_code":""
    },
  },
  onLoad:function(options){
    console.log(options)
    // 页面初始化 options为页面跳转所带来的参数
    // wx.request({
    //   url: 'www.biulibiuli.cn',
    //   success:function(res){
        
    //   },

    // })
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

  birthday_change:function(e){
    // console.log(e);
    var user = this.data.user_detail;
    user.birthday = e.detail.value;
    this.setData({
      user_detail : user
    })
  },

  deploma_change:function(e){
    var user = this.data.user_detail;
    user.diploma = parseInt(e.detail.value);
    this.setData({
      user_detail: user
    })
  },

  id_type_change:function(e){
    var user = this.data.user_detail;    
    user.id_type = parseInt(e.detail.value);
    this.setData({
      user_detail: user
    })
  },

  submits:function(res){
    console.log(res);
    wx.navigateBack({
      
    })
    // address
    // birthday
    // email
    // id
    // id_type
    // mail_code
    // name
    // phone_num
    res.detail.value
  }
})