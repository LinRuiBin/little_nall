// pages/auth/wxlogin/wxlogin.js

import { HTTP } from '../../../utils/_http.js'
const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');

var http = new HTTP()
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onWechatLogin(e) {

    let that = this
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
        return false
      }
      wx.showToast({
        title: '微信登录失败,请再次点击',
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
            title: '微信登录失败,请再次点击',
          })
        }
      },
      fail: function (err) {
        wx.showToast({
          title: '微信登录失败,请再次点击',
        })
      }
    });
  },

  registerForServer: function (data) {
    let that = this
    var params = {
      url: api.WxRegister,
      data: data,
      type: 'POST',
      sCallback: function (data) {
        // wx.setStorageSync('token', data.token)
        if (data["status"] == 1) {
          // 设置用户信息
          app.globalData.userInfo = data.data.userinfo;
          app.globalData.token = data.data.token;
          wx.setStorageSync('userInfo', JSON.stringify(data.data.userinfo));
          wx.setStorageSync('token', data.data.token);
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          });
          wx.switchTab({
            url: '/pages/ucenter/index/index'
          })
        } else {
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


})