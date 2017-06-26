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

    'tem_user' : null,

    "birthday" : "",
    "cert_type" : 0,
    "diploma" : 0,

    "user_detail":{
      "user_name":"",
      "email":"",
      "phone_num":"",
      "id_num":"",
      "mail_address":"",
      "mail_code":""
    },
  },

  onLoad:function(options){

    // 页面初始化 options为页面跳转所带来的参数
    var session = wx.getStorageSync('sessionID');
    var that = this;
    wx.request({
      url: 'https://www.biulibiuli.cn/hhlab/user/info',
      method: 'POST',
      data : {
        session_id : session
      },
      success:function(res){
        console.log(res.data);
        if(res.data.state){
          // success 
          console.log('update user info success')
          var net_user = JSON.parse(res.data.user_detail);
          that.setData({
            tem_user: net_user,
          })
          console.log(net_user);

        } else {
          wx.showToast({
            title: '获取用户信息失败',
          })
        }
      },
      fail: function(res){
        console.log('连接失败')

      }

    })
  },
  onReady:function(){
    // 页面渲染完成

    var net_user = this.data.tem_user;
    var tem_user = this.data.user_detail;
    
    tem_user.user_name = net_user.user_name;
    tem_user.email = net_user.email;
    tem_user.phone_num = net_user.phone_num;
    tem_user.id_num = net_user.id_num;
    tem_user.mail_address = net_user.mail_address;
    tem_user.mail_code = net_user.mail_code;

    var cet = net_user.id_type;
    var dep = net_user.diploma;
    var bit = net_user.birthday;

    // "{"user_name":null,"diploma":0,"email":null,"phone_num":"15624952046","id_type":0,"id_num":null,"mail_address":null,"mail_code":null,"state":true}"

    this.setData({
      user_detail: tem_user,
      cert_type: cet,
      birthday: bit,
      diploma: dep
    })
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
    console.log(e.detail.value);
    var birthday_new = e.detail.value;
    this.setData({
      birthday : birthday_new
    })
  },

  deploma_change:function(e){
    // var user = this.data.user_detail;
    var diploma = parseInt(e.detail.value);
    this.setData({
      diploma: diploma
    })
  },

  id_type_change:function(e){  
    var cet = parseInt(e.detail.value);
    this.setData({
      cert_type: cet
    })
  },

  submits:function(res){
    console.log(res);
    wx.navigateBack({
      
    })

    res.detail.value
  }
})