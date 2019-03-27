const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    goodsCount: 0,
    newGoods: [],
    hotGoods: [],
    topics: [],
    brands: [],
    floorGoods: [],
    banner: [],
    channel: []
  },
  onShareAppMessage: function () {
    return {
      title: 'NideShop',
      desc: '仿网易严选微信小程序商城',
      path: '/pages/index/index'
    }
  },

  getIndexData: function () {
    let that = this;
    util.request(api.IndexUrl).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          newGoods: res.data.newGoodsList,
          hotGoods: res.data.hotGoodsList,
          topics: res.data.topicList,
          brand: res.data.brandList,
          floorGoods: res.data.categoryList,
          banner: res.data.banner,
          channel: res.data.channel
        });
      }
    });
  },
  onLoad: function (options) {
    this.crate_testdata();
    // this.getIndexData();
    // util.request(api.GoodsCount).then(res => {
    //   this.setData({
    //     goodsCount: res.data.goodsCount
    //   });
    // });
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
   
  crate_testdata: function(){
    this.create_bannseData();
    this.create_channeldata();
    this.create_barnddata();
    this.create_hotdata();
    this.create_topicdata();
    this.create_floordata();
  },

  create_bannseData: function(){
    this.setData({
      banner: [
        {
          "id": 10,
          "image_url": "https://img1.360buyimg.com/pop/jfs/t1/22564/38/11795/284073/5c932aecE6646c121/622197e30cdfe29d.jpg",
          "link": "https://www.jd.com/"
        },
        {
          "id": 11,
          "image_url": "https://m.360buyimg.com/babel/jfs/t1/25721/33/12027/78987/5c94464eE1ab05fb2/f4863767bc59aae8.jpg",
          "link": "https://www.jd.com/"
        },
        {
          "id": 12,
          "image_url": "https://m.360buyimg.com/babel/jfs/t1/32996/37/7663/77475/5c98a84fE85e9d7be/6ca123449e2d8e93.jpg",
          "link": "https://www.jd.com/"
        },
      ]
    });
  },

  create_channeldata: function(){
    this.setData({
      channel: [
        {
          "icon_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553616296597&di=6681053cc6bccbab9f08e40b9ad4098a&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0187b55afe8f18a801209a852fe29e.png%401280w_1l_2o_100sh.png",
          "id": "1",
          "name": "自助报价",
        },
        {
          "icon_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553616296595&di=f0355fd92c26626976883b6a7f310cbb&imgtype=0&src=http%3A%2F%2Fimg.aso.aizhan.com%2Ficon%2F98%2F45%2Fcc%2F9845cc08e0b0a32f4740fd19fe91ccfd.jpg",
          "id": "1",
          "name": "特惠盛典",
        },
        {
          "icon_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553616296597&di=6681053cc6bccbab9f08e40b9ad4098a&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0187b55afe8f18a801209a852fe29e.png%401280w_1l_2o_100sh.png",
          "id": "1",
          "name": "精选产品",
        },
        {
          "icon_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553616296594&di=d570a0149f1cd47daaf47c5257c193d2&imgtype=0&src=http%3A%2F%2Fandroid-artworks.25pp.com%2Ffs08%2F2017%2F10%2F09%2F1%2F110_40ff77a971b1a0155f91381a17d295f1_con.png",
          "id": "1",
          "name": "自营产品",
        },
        {
          "icon_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553616296594&di=197553ca28ffb2f97c474b88f1dbcd74&imgtype=0&src=http%3A%2F%2Fimg.aso.aizhan.com%2Ficon%2Fa5%2Fa2%2F8c%2Fa5a28cf3745a60ab890fae86d88a2f40.jpg",
          "id": "1",
          "name": "印刷产品",
        },
        {
          "icon_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553616296595&di=f0355fd92c26626976883b6a7f310cbb&imgtype=0&src=http%3A%2F%2Fimg.aso.aizhan.com%2Ficon%2F98%2F45%2Fcc%2F9845cc08e0b0a32f4740fd19fe91ccfd.jpg",
          "id": "1",
          "name": "展架展具",
        },
        {
          "icon_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553616296597&di=6681053cc6bccbab9f08e40b9ad4098a&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0187b55afe8f18a801209a852fe29e.png%401280w_1l_2o_100sh.png",
          "id": "1",
          "name": "图文耗材",
        },
        {
          "icon_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553616296595&di=f0355fd92c26626976883b6a7f310cbb&imgtype=0&src=http%3A%2F%2Fimg.aso.aizhan.com%2Ficon%2F98%2F45%2Fcc%2F9845cc08e0b0a32f4740fd19fe91ccfd.jpg",
          "id": "1",
          "name": "新品上市",
        },
      ]
    });
  },

  create_barnddata:function(){
   
    this.setData({
      brand: [
        {
          "id": 10,
          "new_pic_url": "https://img1.360buyimg.com/pop/jfs/t1/22564/38/11795/284073/5c932aecE6646c121/622197e30cdfe29d.jpg",
          "link": "https://www.jd.com/",
          "name":"",
          "floor_price":10.1
        },
        {
          "id": 11,
          "new_pic_url": "https://m.360buyimg.com/babel/jfs/t1/25721/33/12027/78987/5c94464eE1ab05fb2/f4863767bc59aae8.jpg",
          "link": "https://www.jd.com/",
          "name": "",
          "floor_price": 10.1
        },
        {
          "id": 12,
          "new_pic_url": "https://m.360buyimg.com/babel/jfs/t1/32996/37/7663/77475/5c98a84fE85e9d7be/6ca123449e2d8e93.jpg",
          "link": "https://www.jd.com/",
          "name": "",
          "floor_price": 10.1
        },
        {
          "id": 12,
          "new_pic_url": "https://m.360buyimg.com/babel/jfs/t1/32996/37/7663/77475/5c98a84fE85e9d7be/6ca123449e2d8e93.jpg",
          "link": "https://www.jd.com/",
          "name": "",
          "floor_price": 10.1
        },
      ]
    });
  },


  create_hotdata: function () {
    
    this.setData({
      hotGoods: [
        {
          "id": 10,
          "list_pic_url": "http://img5.imgtn.bdimg.com/it/u=2352446138,585048555&fm=26&gp=0.jpg",
          "link": "https://www.jd.com/",
          "name": "超图解英语单词",
          "goods_brief":"超图解英语单词：英语口语入门词汇一本就搞定",
          "retail_price": 19.90
        },
        {
          "id": 10,
          "list_pic_url": "https://f10.baidu.com/it/u=2429965334,75889142&fm=72",
          "link": "https://www.jd.com/",
          "name": "人际关系中的心理",
          "goods_brief": "微心理：人际关系中的心理博弈策略实战版大全集（套装共4",
          "retail_price": 19.90
        },
        {
          "id": 10,
          "list_pic_url": "http://img2.imgtn.bdimg.com/it/u=1741306693,2712681047&fm=26&gp=0.jpg",
          "link": "https://www.jd.com/",
          "name": "销售就是玩转朋友圈",
          "goods_brief": "销售就是玩转朋友圈：销售精英都在用的8大利器，实现销量",
          "retail_price": 19.90
        },
        {
          "id": 10,
          "list_pic_url": "http://img4.imgtn.bdimg.com/it/u=4182678660,1654948130&fm=26&gp=0.jpg",
          "link": "https://www.jd.com/",
          "name": "超国际安徒生奖得主",
          "goods_brief": "国际安徒生奖得主探索自然绘本：一家人看世界：去非",
          "retail_price": 19.90
        },
      ]
    });
  },

  
  create_topicdata: function () {

    this.setData({
      topics: [
        {
          "id": 10,
          "scene_pic_url": "http://img4.imgtn.bdimg.com/it/u=4182678660,1654948130&fm=26&gp=0.jpg",
          "link": "https://www.jd.com/",
          "title": "超图解英语单词",
          "subtitle": "超图解英语单词：英语口语入门词汇一本就搞定",
          "price_info": 19.90
        },
        {
          "id": 10,
          "scene_pic_url": "http://img0.imgtn.bdimg.com/it/u=534282052,1523615030&fm=26&gp=0.jpg",
          "link": "https://www.jd.com/",
          "title": "人际关系中的心理",
          "subtitle": "微心理：人际关系中的心理博弈策略实战版大全集（套装共4",
          "price_info": 19.90
        },
        {
          "id": 10,
          "scene_pic_url": "http://img0.imgtn.bdimg.com/it/u=3939361205,517500893&fm=26&gp=0.jpg",
          "link": "https://www.jd.com/",
          "title": "销售就是玩转朋友圈",
          "subtitle": "销售就是玩转朋友圈：销售精英都在用的8大利器，实现销量",
          "price_info": 19.90
        },
        {
          "id": 10,
          "scene_pic_url": "http://img0.imgtn.bdimg.com/it/u=534282052,1523615030&fm=26&gp=0.jpg",
          "link": "https://www.jd.com/",
          "title": "超国际安徒生奖得主",
          "subtitle": "国际安徒生奖得主探索自然绘本：一家人看世界：去非",
          "price_info": 19.90
        },
      ]
    });
  },


  create_floordata: function () {

    this.setData({
      floorGoods: [
        {
          "id":11,
          "name":"热门图书",
          "goodsList":[
            {
              "id": 10,
              "list_pic_url": "http://img5.imgtn.bdimg.com/it/u=2300872137,3993659250&fm=26&gp=0.jpg",
              "link": "https://www.jd.com/",
              "name": "销售就是玩转朋友圈",
              "subtitle": "销售就是玩转朋友圈：销售精英都在用的8大利器，实现销量",
              "retail_price": 19.90
            },
            {
              "id": 10,
              "list_pic_url": "http://img0.imgtn.bdimg.com/it/u=103660402,1769958740&fm=26&gp=0.jpg",
              "link": "https://www.jd.com/",
              "name": "超国际安徒生奖得主",
              "subtitle": "国际安徒生奖得主探索自然绘本：一家人看世界：去非",
              "retail_price": 19.90
            },
            {
              "id": 10,
              "list_pic_url": "http://img4.imgtn.bdimg.com/it/u=1840263665,4203961551&fm=26&gp=0.jpg",
              "link": "https://www.jd.com/",
              "name": "销售就是玩转朋友圈",
              "subtitle": "销售就是玩转朋友圈：销售精英都在用的8大利器，实现销量",
              "retail_price": 19.90
            },
            {
              "id": 10,
              "list_pic_url": "http://img2.imgtn.bdimg.com/it/u=469308121,2493297877&fm=26&gp=0.jpg",
              "link": "https://www.jd.com/",
              "name": "超国际安徒生奖得主",
              "subtitle": "国际安徒生奖得主探索自然绘本：一家人看世界：去非",
              "retail_price": 19.90
            },
          ]
        },
        {
          "id": 11,
          "name": "精品图书",
          "goodsList": [
            {
              "id": 10,
              "list_pic_url": "http://img4.imgtn.bdimg.com/it/u=1840263665,4203961551&fm=26&gp=0.jpg",
              "link": "https://www.jd.com/",
              "name": "销售就是玩转朋友圈",
              "subtitle": "销售就是玩转朋友圈：销售精英都在用的8大利器，实现销量",
              "retail_price": 19.90
            },
            {
              "id": 10,
              "list_pic_url": "http://img1.imgtn.bdimg.com/it/u=2621465353,1936010440&fm=26&gp=0.jpg",
              "link": "https://www.jd.com/",
              "name": "超国际安徒生奖得主",
              "subtitle": "国际安徒生奖得主探索自然绘本：一家人看世界：去非",
              "retail_price": 19.90
            },
          ]
        },
        {
          "id": 11,
          "name": "好看图书",
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
          ]
        },
        {
          "id": 11,
          "name": "精彩图书",
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
          ]
        },
       
      ]
    });
  },


})
