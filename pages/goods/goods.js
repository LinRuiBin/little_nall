var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    id: 0,
    goods: {},
    gallery: [],
    attribute: [],
    issueList: [],
    comment: [],
    brand: {},
    specificationList: [],
    productList: [],
    relatedGoods: [],
    cartGoodsCount: 0,
    userHasCollect: 0,
    number: 1,
    checkedSpecText: '请选择规格数量',
    openAttr: false,
    noCollectImage: "/static/images/icon_collect.png",
    hasCollectImage: "/static/images/icon_collect_checked.png",
    collectBackImage: "/static/images/icon_collect.png"
  },
  getGoodsInfo: function () {
    let that = this;
    util.request(api.GoodsDetail, { id: that.data.id }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          goods: res.data.info,
          gallery: res.data.gallery,
          attribute: res.data.attribute,
          issueList: res.data.issue,
          comment: res.data.comment,
          brand: res.data.brand,
          specificationList: res.data.specificationList,
          productList: res.data.productList,
          userHasCollect: res.data.userHasCollect
        });

        if (res.data.userHasCollect == 1) {
          that.setData({
            'collectBackImage': that.data.hasCollectImage
          });
        } else {
          that.setData({
            'collectBackImage': that.data.noCollectImage
          });
        }

         WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, that);
      
        that.getGoodsRelated();
      }
    });

  },
  getGoodsRelated: function () {
    let that = this;
    util.request(api.GoodsRelated, { id: that.data.id }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          relatedGoods: res.data.goodsList,
        });
      }
    });

  },
  clickSkuValue: function (event) {
    let that = this;
    let specNameId = event.currentTarget.dataset.nameId; //规格 id 比如颜色对应的id
    let specValueId = event.currentTarget.dataset.valueId; //具体的id

    //判断是否可以点击

    //TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环
    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++) {
      if (_specificationList[i].specification_id == specNameId) {
        for (let j = 0; j < _specificationList[i].valueList.length; j++) {
          if (_specificationList[i].valueList[j].id == specValueId) {
            //如果已经选中，则反选
            if (_specificationList[i].valueList[j].checked) {
              _specificationList[i].valueList[j].checked = false;
            } else {
              _specificationList[i].valueList[j].checked = true;
            }
          } else {
            _specificationList[i].valueList[j].checked = false;
          }
        }
      }
    }
    this.setData({
      'specificationList': _specificationList
    });
    //重新计算spec改变后的信息
    this.changeSpecInfo();

    //重新计算哪些值不可以点击
  },

  //获取选中的规格信息  数组 [{},]
  getCheckedSpecValue: function () {
    let checkedValues = [];
    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++) {
      let _checkedObj = {
        nameId: _specificationList[i].specification_id,
        valueId: 0,
        valueText: ''
      };
      for (let j = 0; j < _specificationList[i].valueList.length; j++) {
        if (_specificationList[i].valueList[j].checked) {
          _checkedObj.valueId = _specificationList[i].valueList[j].id;
          _checkedObj.valueText = _specificationList[i].valueList[j].value;
        }
      }
      checkedValues.push(_checkedObj);
    }

    return checkedValues;

  },
  //根据已选的值，计算其它值的状态
  setSpecValueStatus: function () {

  },
  //判断规格是否选择完整  
  isCheckedAllSpec: function () {
    return !this.getCheckedSpecValue().some(function (v) {
      if (v.valueId == 0) {
        return true;
      }
    });
  },
  getCheckedSpecKey: function () {
    let checkedValue = this.getCheckedSpecValue().map(function (v) {
      return v.valueId;
    });
    //return checkedValue;
     return checkedValue.join('_');
  },

  //拼接选取的规格信息 
  changeSpecInfo: function () {
    let checkedNameValue = this.getCheckedSpecValue();

    //设置选择的信息
    let checkedValue = checkedNameValue.filter(function (v) {
      if (v.valueId != 0) {
        return true;
      } else {
        return false;
      }
    }).map(function (v) {
      return v.valueText;
    });
    if (checkedValue.length > 0) {
      this.setData({
        'checkedSpecText': checkedValue.join('　')
      });
    } else {
      this.setData({
        'checkedSpecText': '请选择规格数量'
      });
    }

  },
  getCheckedProductItem: function (key) {
    return this.data.productList.filter(function (v) {
     let keys = key.split('_');
     let iscontain = false;
      for(let i = 0;i<keys.length;i++){
        if (keys[i] == v.goods_specification_ids){
          iscontain = true;
        }
      }
      return iscontain;
      // if (v.goods_specification_ids == key) {
      // if (v.goods_specification_ids == key) {
      //   return true;
      // } else {
      //   return false;
      // }
    });
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      id: parseInt(options.id)
      // id: 1181000
    });
    this.create_testData();
    // var that = this;
    // this.getGoodsInfo();
    // util.request(api.CartGoodsCount).then(function (res) {
    //   if (res.errno === 0) {
    //     that.setData({
    //       cartGoodsCount: res.data.cartTotal.goodsCount
    //     });

    //   }
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
  switchAttrPop: function () {
    if (this.data.openAttr == false) {
      this.setData({
        openAttr: !this.data.openAttr
      });
    }
  },
  closeAttr: function () {
    this.setData({
      openAttr: false,
    });
  },
  addCannelCollect: function () {
    let that = this;
    //添加或是取消收藏
    util.request(api.CollectAddOrDelete, { typeId: 0, valueId: this.data.id }, "POST")
      .then(function (res) {
        let _res = res;
        if (_res.errno == 0) {
          if (_res.data.type == 'add') {
            that.setData({
              'collectBackImage': that.data.hasCollectImage
            });
          } else {
            that.setData({
              'collectBackImage': that.data.noCollectImage
            });
          }

        } else {
          wx.showToast({
            image: '/static/images/icon_error.png',
            title: _res.errmsg,
            mask: true
          });
        }
      });
  },
  openCartPage: function () {
    wx.switchTab({
      url: '/pages/cart/cart',
    });
  },
  addToCart: function () {
    var that = this;
    if (this.data.openAttr === false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr
      });
    } else {

      //提示选择完整规格
      if (!this.isCheckedAllSpec()) {
        wx.showToast({
          image: '/static/images/icon_error.png',
          title: '请选择规格',
          mask: true
        });
        return false;
      }
    
     //此判断方法有问题 需要重新设计
       //1.判断是否选取全部规格
       //2.选取的规格是否有货

      //根据选中的规格，判断是否有对应的sku信息 是否选中规格 
      let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());
      if (!checkedProduct || checkedProduct.length <= 0) {
        //找不到对应的product信息，提示没有库存
        wx.showToast({
          image: '/static/images/icon_error.png',
          title: '库存不足1',
          mask: true
        });
        return false;
      }

      //验证库存
      if (checkedProduct.goods_number < this.data.number) {
        //找不到对应的product信息，提示没有库存
        wx.showToast({
          image: '/static/images/icon_error.png',
          title: '库存不足2',
          mask: true
        });
        return false;
      }
     
      wx.showToast({
        title: '添加成功'
      });
      that.setData({
        openAttr: !this.data.openAttr,
        cartGoodsCount: 5
      });
    /*
      //添加到购物车
      util.request(api.CartAdd, { goodsId: this.data.goods.id, number: this.data.number, productId: checkedProduct[0].id }, "POST")
        .then(function (res) {
          let _res = res;
          if (_res.errno == 0) {
            wx.showToast({
              title: '添加成功'
            });
            that.setData({
              openAttr: !that.data.openAttr,
              cartGoodsCount: _res.data.cartTotal.goodsCount
            });
          } else {
            wx.showToast({
              image: '/static/images/icon_error.png',
              title: _res.errmsg,
              mask: true
            });
          }

        });
        */
    }
    

  },
  cutNumber: function () {
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
  },
  addNumber: function () {
    this.setData({
      number: this.data.number + 1
    });
  },


  create_testData: function () {
    let that = this;
    var html = "\
    <h1>少林功夫好耶 这里是商品描述富文本</h1> \
    <h3>少林功夫找好耶</h3>\
    ";
    WxParse.wxParse('goodsDetail', 'html', html, that);

    this.create_garellyData();
    this.create_goodnfoData();
   this.create_commentData();
   this.create_attributeData();
    this.create_issueListData();
    this.create_relateGoodsData();
    this.cteateSpecificationData();
  },

  create_garellyData: function () {
   this.setData({
     gallery:[
       {
       "id":"10",
         "img_url":"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2146018835,94600724&fm=26&gp=0.jpg",
       },
       {
         "id": "10",
         "img_url": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1407640600,1507041277&fm=26&gp=0.jpg",
       },
       {
         "id": "10",
         "img_url": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=9467150,3002487382&fm=26&gp=0.jpg",
       },
     ]
   });
  },

  create_goodnfoData: function () {
 
    this.setData({
      goods:{
        "name":"超图解英语单词",
        "goods_brief": "超图解英语单词：英语口语入门词汇一本就搞定",
        "retail_price": "19.0",
      },
      brand:{
        "brandId": "1", 
        "name": "这是个相当厉害的品牌",
      },
  
    });
  },

  create_commentData: function () {
    this.setData({
      comment:
        {
          "count":199,
          "data":{
            "avatar":"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2919343813,438252707&fm=27&gp=0.jpg",
            "nickname": "小丸子",
            "add_time": "2008-10-12 10:22:66",
            "content": "吃了这个衣服终于找到女朋友啦",
            "pic_list": [
               {"pic_url":"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2919343813,438252707&fm=27&gp=0.jpg"},
              { "pic_url": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2919343813,438252707&fm=27&gp=0.jpg" },
              { "pic_url": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2919343813,438252707&fm=27&gp=0.jpg" },
            ],
          }
        },

    });
  },

  create_attributeData: function () {
    this.setData({
     attribute:[
       {
       "name":"颜色",
       "value":"黄",
       },
       {
         "name": "码数",
         "value": "2xl",
       },
       {
         "name": "颜值",
         "value": "非常高",
       },
     ],
    });
  },
  
  create_issueListData: function () {
    this.setData({
      issueList: [
        {
          "question": "请问穿这个衣服能找到男朋友吗？",
          "answer": "您好，这得看您颜值哦",
        },
        {
          "question": "请问穿这个衣服能找到女朋友吗？",
          "answer": "必须滴！杠杠滴额",
        },
        {
          "question": "请问开法拉利能穿这个衣服吗？",
          "answer": "我劝你善良",
        },
      ],
    });
  },

  create_relateGoodsData: function () {
    this.setData({
      relatedGoods: [
        {
          "id":"11",
          "name": "攻速鞋",
          "retail_price": "20.0",
          "list_pic_url":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=492273365,1585728498&fm=27&gp=0.jpg",
        },
        {
          "id": "11",
          "name": "金瓶梅",
          "retail_price": "40.8",
          "list_pic_url": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=180635262,3469104988&fm=27&gp=0.jpg",
        },
        {
          "id": "11",
          "name": "三国杀",
          "retail_price": "99.9",
          "list_pic_url": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2974083135,3767192423&fm=27&gp=0.jpg",
        },
      ],
    });
  },
   
  cteateSpecificationData:function(){
    this.setData({
      productList:[ //可选的规格类型 和 参数
        {
          "name": "颜色",
          "goods_specification_ids": 10,
          "goods_number":100,
        },
        {
          "name": "大小",
          "goods_specification_ids": 11,
          "goods_number": 11,
        },
      ],
      specificationList: [  //具体的规格  specification_id 为规格类型
        {
        "specification_id":10, 
          "name":"颜色",
          "valueList":[
            {
              "checked":false,
              "id":11,
              "specification_id":10,
              "value":"黄色",
            },
            {
              "checked": false,
              "id": 12,
              "specification_id": 10,
              "value": "绿色",
            }
          ],
        },
       
        {
          "specification_id": 11,
          "name": "大小",
          "valueList": [
            {
              "checked": false,
              "id": 111,
              "specification_id": 11,
              "value": "2xl",
            },
            {
              "checked": false,
              "id": 112,
              "specification_id": 11,
              "value": "3xl",
            }
          ],
        }

      ],

    });
  },

})