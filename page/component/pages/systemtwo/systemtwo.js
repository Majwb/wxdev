// systemtwo.js
var request = require("../../../common/lib/request-proxy.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  pageAttr:[
    {
      pid: 2,
      name: "研发与建设",
      logo:"../../../../image/productSys/hammer.png",
      englishName: "RESEARCH AND DEVELOPMENT & CONSTRUCTION",
      bgImg: "http://m.citgroup.cn/images/home/yfyjs_03.png"
    },
    {
      pid: 1,
      name: "规划与顾问",
      logo: "../../../../image/productSys/map2.png",
      englishName: "PLANNING & CONSULTING",
      bgImg: "http://m.citgroup.cn/images/home/ghygw_03.png"
    },
    {
      pid: 3,
      name: "投资与运营", 
      logo: "../../../../image/productSys/local_atm_big.png",
      englishName: "NVESTMENT & OPERATION",
      bgImg: "http://m.citgroup.cn/images/home/tzyyy_03.png"
    },
    {
      pid: 4,
      name: "目的地营销",
      logo: "../../../../image/productSys/compass.png",
      englishName: "DESTINATION MARKETING",
      bgImg: "http://m.citgroup.cn/images/home/mddyx_03.png"
    }
  ],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!options.typeid){
      return;
    }
    var pageAttr = this.pageAttr;
    var currentSel = null;
    for(i = 0,len = pageAttr.length;i<len;i++){
      if(pageAttr[i].pid == options.typeid){
        currentSel = pageAttr[i];
        break;
      } 
    }

    var self = this;
    if (options.typeid){
      request.reqProxy({
        path: "/productSystemApi/selectProductsForPortal",
        data: {
          pid: options.typeid
        },
        success: function (res) {
          if(res.status == "SUCCESS"){
            self.setData({
              currentPage:currentSel,
              diff:res.data.length==4,
              items: res.data
            });
          }
          
          console.log(res);
        }
      });
    }
  },
  toThreePage:function(e){
    console.log("go systemthree");
    var param = e.currentTarget.dataset;
      wx.navigateTo({
      url: '../systemthree/systemthree?typeid=' + param.productid + '&name=' + param.productname
    })
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
  
  }
})