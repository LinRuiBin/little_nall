var util = require('../../utils/util.js');
var api = require('../../config/api.js');


var app = getApp();

Page({
  data: {
    id: 0,
    brand: {},
    goodsList: [],
    page: 1,
    size: 1000
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      id: parseInt(options.id)
    });
    this.create_testData();
    // this.getBrand();
  },
  getBrand: function () {
    let that = this;
    util.request(api.BrandDetail, { id: that.data.id }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          brand: res.data.brand
        });

        that.getGoodsList();
      }
    });
  },
  getGoodsList() {
    var that = this;

    util.request(api.GoodsList, { brandId: that.data.id, page: that.data.page, size: that.data.size})
      .then(function (res) {
        if (res.errno === 0) {
          that.setData({
            goodsList: res.data.goodsList
          });
        }
      });
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  
  create_testData:function(){
    this.setData({
    
    brand:{
     "id":"1",     "app_list_pic_url":"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2233403436,3819782392&fm=26&gp=0.jpg",
     "name":"这是个相当厉害的品牌",
      "simple_desc":"这是个相当厉害的品牌这是个相当厉害的品牌这是个相当厉害的品牌这是个相当厉害的品牌",
    },

      "goodsList": [
        {
          "id": 10,
          "list_pic_url": "http://img3.imgtn.bdimg.com/it/u=3369907657,1436096232&fm=26&gp=0.jpg",
          "link": "https://www.jd.com/",
          "name": "销售就是玩转朋友圈",
          "subtitle": "销售就是玩转朋友圈：销售精英都在用的8大利器，实现销量",
          "retail_price": 19.90
        },
        {
          "id": 10,
          "list_pic_url": "http://img4.imgtn.bdimg.com/it/u=1840263665,4203961551&fm=26&gp=0.jpg",
          "link": "https://www.jd.com/",
          "name": "超国际安徒生奖得主",
          "subtitle": "国际安徒生奖得主探索自然绘本：一家人看世界：去非",
          "retail_price": 19.90
        },
        {
          "id": 10,
          "list_pic_url": "http://img3.imgtn.bdimg.com/it/u=3369907657,1436096232&fm=26&gp=0.jpg",
          "link": "https://www.jd.com/",
          "name": "销售就是玩转朋友圈",
          "subtitle": "销售就是玩转朋友圈：销售精英都在用的8大利器，实现销量",
          "retail_price": 19.90
        },
        {
          "id": 10,
          "list_pic_url": "http://img4.imgtn.bdimg.com/it/u=1840263665,4203961551&fm=26&gp=0.jpg",
          "link": "https://www.jd.com/",
          "name": "超国际安徒生奖得主",
          "subtitle": "国际安徒生奖得主探索自然绘本：一家人看世界：去非",
          "retail_price": 19.90
        },
        {
          "id": 10,
          "list_pic_url": "http://img3.imgtn.bdimg.com/it/u=3369907657,1436096232&fm=26&gp=0.jpg",
          "link": "https://www.jd.com/",
          "name": "销售就是玩转朋友圈",
          "subtitle": "销售就是玩转朋友圈：销售精英都在用的8大利器，实现销量",
          "retail_price": 19.90
        },
        {
          "id": 10,
          "list_pic_url": "http://img4.imgtn.bdimg.com/it/u=1840263665,4203961551&fm=26&gp=0.jpg",
          "link": "https://www.jd.com/",
          "name": "超国际安徒生奖得主",
          "subtitle": "国际安徒生奖得主探索自然绘本：一家人看世界：去非",
          "retail_price": 19.90
        },
      ]

    });

  },
   

})