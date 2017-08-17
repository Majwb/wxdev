// systemtwo.js
var request = require("../../../common/lib/request-proxy.js");
// usage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  hasNext: true,
  //总记录数
  total: 0,
  //当前页面
  page: 1,
  //页大小
  size: 10,
  tabActive: "377",
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var self = this;
    //重置前为第一页
    self.page = 1;
    //清空列表
    self.data.items = [];
    //下拉继续可以获取新的列表数据
    self.hasNext = true;
    //将记录总数重置
    self.total = 0;
    request.reqProxy({
      path: "/cust/mobile",
      data: {
        page: self.page,
        size: self.size
      },
      success: function (res) {
        if (res.status == "SUCCESS") {
          if (res.data.custSystems.length) {
            var itemList = res.data.custSystems;
            //前四个
            var item03 = itemList.splice(0, 4);
            self.setData({
              getMore: self.hasNext,
              item1: item03[0],
              item2: item03[1],
              item3: item03[2],
              item4: item03[3],
              items: itemList
            });
            self.total = res.data.num;
          }
        }

      }
    });
  },
  hasNextPage: function () {
    var self = this;
    if (self.total == 0) {
      return false;
    } else {
      //总页面数为
      var totalPage = Math.ceil(self.total / self.size);
      //页数是否大于页总数
      if (self.page >= totalPage) {
        self.hasNext = false;
        return false;
      } else {
        self.hasNext = true;
        return true;
      }
    }
  },
  showMsg:function(e){
    
    wx.showToast({
        title: '请在PC端查看',
        icon: 'success',
        image:'../../../../image/index/introduction.png',
        duration: 2000
      });
    
  },
  getNextPage: function () {
    var self = this;
    if (self.hasNextPage()) {
      self.page++;
      request.reqProxy({
        path: "/cust/mobile",
        data: {
          page: self.page,
          size: self.size
        },
        success: function (res) {

          var dt = res.data;
          if (self.data.items) {
            self.data.items = self.data.items.concat(dt.custSystems);
          }

          self.setData({
            getMore: self.hasNext,
            items: self.data.items
          });
        }
      });
    } else {
      self.hasNext = false;
      self.setData({
        getMore: self.hasNext
      });
    }
  },
  pullListStart: function (e) {
    var self = this;
    //获取选择器对象
    var selectorQuery = wx.createSelectorQuery();
    //获取视口结点对象
    var nodesRef = selectorQuery.selectViewport();
    //获取节点高度
    nodesRef.boundingClientRect(function (rect) {
      self.viewPortH = rect.height;
    }).exec();
  },
  pullListEnd: function (e) {
    var self = this;
    var touchedInfo = e.changedTouches[0];
    //获取距离视口顶部的位置
    var toTop = touchedInfo.clientY;
    //触摸点相对于底部的位置为
    var toBottom = self.viewPortH - toTop;
    //当文档相对于可视区的高度为
    var currentDocHeight = touchedInfo.pageY + toBottom;

    wx.createSelectorQuery().select('#ListBody').boundingClientRect(function (rect) {
      var docHeight = rect.height  // 节点的高度
      //如果文档已经到底部，那么加载下一页
      if (currentDocHeight >= docHeight) {
        self.getNextPage();
      }
    }).exec();
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