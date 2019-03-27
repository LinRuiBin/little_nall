var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    navList: [],
    categoryList: [],
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    goodsCount: 0,
    scrollHeight: 0
  },
  onLoad: function (options) {
    this.create_testCategory();
   // this.getCatalog();
  },
  getCatalog: function () {
    //CatalogList
    let that = this;
    wx.showLoading({
      title: '加载中...',
    });
    util.request(api.CatalogList).then(function (res) {
        that.setData({
          navList: res.data.categoryList,
          currentCategory: res.data.currentCategory
        });
        wx.hideLoading();
      });
    util.request(api.GoodsCount).then(function (res) {
      that.setData({
        goodsCount: res.data.goodsCount
      });
    });

  },
  getCurrentCategory: function (id) {
    // let that = this;
    // util.request(api.CatalogCurrent, { id: id })
    //   .then(function (res) {
    //     that.setData({
    //       currentCategory: res.data.currentCategory
    //     });
    //   });
    var currentc = {};
    var navilist = this.data.navList;
    for (let i = 0; i < navilist.length;i++){
      var tempca = navilist[i];
      if (tempca.id == id){
        currentc = tempca;
        break;
      }
    }
    this.setData({
      currentCategory:currentc
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
  getList: function () {
    var that = this;
    util.request(api.ApiRootUrl + 'api/catalog/' + that.data.currentCategory.cat_id)
      .then(function (res) {
        that.setData({
          categoryList: res.data,
        });
      });
  },
  switchCate: function (event) {
    var that = this;
    var currentTarget = event.currentTarget;
    if (this.data.currentCategory.id == event.currentTarget.dataset.id) {
      return false;
    }

    this.getCurrentCategory(event.currentTarget.dataset.id);
  },
  create_testCategory:function(){
    var naviarr = new Array;
    for (let i = 1;i<30;i++){
      var navic={};
       navic["id"] = i;
       navic["name"] = "分类" + i.toString();
      navic["front_name"] = "分类frontname" + i.toString();
      navic["wap_banner_url"] = "http://img3.imgtn.bdimg.com/it/u=2276266638,3089493451&fm=26&gp=0.jpg";
      
      var sucab = new Array;
      for (let j = 0; j < 10; j++) {
        var subc = {};
        subc["id"] = j;
        subc["name"] = "子分类" + j.toString();
        subc["front_name"] = "子分类frontname" + j.toString();
        subc["wap_banner_url"] = "http://img4.imgtn.bdimg.com/it/u=2806155075,2081889461&fm=26&gp=0.jpg";
        sucab.push(subc);
      }
      navic["subCategoryList"] = sucab;
      naviarr.push(navic);
    }

    this.setData({
      
    navList: naviarr,
    currentCategory:naviarr[0]

    });

  },


})