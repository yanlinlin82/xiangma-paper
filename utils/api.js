const app = getApp();

function wxLogin(callback) {
  wx.login({
    success: res => {
      if (res.code) {
        wx.request({
          url: app.host + '/api/wx_login',
          method: 'POST',
          data: {code: res.code},
          success: res => callback(null, res),
          fail: error => callback(error)
        })
      } else {
        callback(new Error('登录失败！' + res.errMsg))
      }
    }
  })
}

function updateNickname(nickname, callback) {
  wx.request({
    url: app.host + '/api/update_nickname',
    method: 'POST',
    header: {
      'content-type': 'application/json',
      'X-CSRFToken': app.csrfToken,
      'Cookie': 'csrftoken=' + app.csrfToken
    },
    data: {token: app.token, nickname: nickname},
    success: res => callback(null, res),
    fail: error => callback(error)
  })
}

function fetchPaperList(callback) {
  wx.request({
    url: app.host + '/api/fetch_paper_list',
    method: 'POST',
    header: {
      'content-type': 'application/json',
      'X-CSRFToken': app.csrfToken,
      'Cookie': 'csrftoken=' + app.csrfToken
    },
    data: {token: app.token},
    success: res => callback(null, res),
    fail: error => callback(error)
  })
}

function fetchRankList(callback) {
  wx.request({
    url: app.host + '/api/fetch_rank_list',
    method: 'POST',
    header: {
      'content-type': 'application/json',
      'X-CSRFToken': app.csrfToken,
      'Cookie': 'csrftoken=' + app.csrfToken
    },
    data: {token: app.token},
    success: res => callback(null, res),
    fail: error => callback(error)
  })
}

module.exports = {
  wxLogin,
  updateNickname,
  fetchPaperList,
  fetchRankList
}
