
function http(url, callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}


function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function updateUserInfo() {
  var session = wx.getStorageSync('sessionID');
  wx.request({
    url: 'https://www.biulibiuli.cn/hhlab/user/info',
    method: 'POST',
    data: {
      session_id: session,
    },

    success: function (res) {
      if (res.data.message == 'success') {
        // success 
        console.log('get info success')
        var net_user = JSON.parse(res.data.user_detail);

        wx.setStorageSync('ableToBorrow', false);

        console.log(net_user);
        if (net_user.phone_num != null) {
          if (net_user.id_num != null) {
            var id = new String(net_user.id_num);
            console.log(id);
            if (id.length != 0 && net_user.id_type != 0) {
              wx.setStorageSync('ableToBorrow', true);
              console.log("able to borrow!");
            }
          }
        }
      } else {
        wx.setStorageSync('ableToBorrow', false);
      }
    },
    fail: function (res) {
      console.log('连接失败')
    }
  })
}

module.exports = {
  updateUserInfo: updateUserInfo,
  formatTime: formatTime,
  http: http
}

