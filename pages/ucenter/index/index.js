const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const user = require('../../../services/user.js');
import { HTTP } from '../../../utils/_http.js'

var http = new HTTP()
const app = getApp();

Page({
  data: {
    userInfo: {},
    token:false,
    showLoginDialog: false
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {

  },
  onShow: function() {
    this.setData({
      userInfo: app.globalData.userInfo,
      token:app.globalData.token,
    });

    this.getuserinfo();
  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭
  },

  onUserInfoClick: function() {
    if (wx.getStorageSync('token')) {
     
    } else {
      this.showLoginDialog();
    }
  },

  getFormID: function (e) {
    // this.setData({
    //   formId: e.detail.formId
    // })

    var data ={ }
    let formid = e.detail.formId
    data['formid'] = formid
    var params = {
      url: api.FormId,
      data: data,
      type: 'POST',
      sCallback: function (result) {
        // wx.setStorageSync('token', data.token)
        if (result["status"] == 1) {

        } else {

        }
      },
      eCallback: function (e) {
      }
    }
    http.request(params)
    
  },

  showLoginDialog() {
    this.setData({
      showLoginDialog: true
    })
  },

  onCloseLoginDialog () {
    this.setData({
      showLoginDialog: false
    })
  },

  onDialogBody () {
    // 阻止冒泡
  },

  onWechatLogin(e) {

    let that = this
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
        return false
      }
      wx.showToast({
        title: '微信登录失败',
      })
      return false
    }
    var data = e.detail.userInfo;
    wx.login({
      success: function (res) {
        if (res.code) {
          data["code"] = res.code
          data["type"] = 200
          that.registerForServer(data);
        } else {
          wx.showToast({
            title: '微信登录失败',
          })
        }
      },
      fail: function (err) {
        wx.showToast({
          title: '微信登录失败',
        })
      }
    });
  },

registerForServer:function(data){
  let that = this
  var params = {
    url: api.WxRegister,
    data: data,
    type: 'POST',
    sCallback: function (data) {
      // wx.setStorageSync('token', data.token)
      if (data["status"] == 1) {
        // 设置用户信息
        that.setData({
          userInfo: data.data.userinfo,
          showLoginDialog: false,
          token: data.data.token
        });
        app.globalData.userInfo = data.data.userinfo;
        app.globalData.token = data.data.token;
        wx.setStorageSync('userInfo', JSON.stringify(data.data.userinfo));
        wx.setStorageSync('token', data.data.token);
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        })
      }else{
        wx.showToast({
          title: data.msg,
          icon: 'cancel',
          duration: 2000
        })
      }
    },
    eCallback: function (e) {
      wx.showToast({
        title: '登录失败',
        icon: 'cancel',
        duration: 2000
      })
    }
  }
  http.request(params)
},


  onOrderInfoClick: function(event) {
    wx.navigateTo({
      url: '/pages/ucenter/order/order',
    })
  },

  testClick:function(){
    // let that = this
    var params = {
      url: api.TextWxPush,
      data: {},
      type: 'POST',
      sCallback: function (result) {
        // wx.setStorageSync('token', data.token)
        if (result["status"] == 1) {

        } else {

        }
      },
      eCallback: function (e) {
      }
    }
    http.request(params)
  },
  onSectionItemClick: function(event) {
   

  },

  // TODO 移到个人信息页面
  exitLogin: function() {
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function(res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          wx.switchTab({
            url: '/pages/index/index'
          });
        }
      }
    })

  },
  getuserinfo:function(){
    let that = this
    var params = {
      url: 'user',
      data: {},
      type: 'GET',
      sCallback: function (data) {
        if (data["status"] == 1) {
          that.setData({
            userInfo: data.data.userinfo,
            showLoginDialog: false,
            token:wx.getStorageSync('token')
          });
          app.globalData.userInfo = data.data.userinfo;
          wx.setStorageSync('userinfo', JSON.stringify(data.data.userinfo));
        } 
      },
      eCallback: function (e) {
       
      }
    }
    http.request(params)
  }
  

})