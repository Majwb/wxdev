var request = require("../../../common/lib/request-proxy.js");
Page({
  data: {
    getMore:true,
    newsActive:true,
    items:[]
  },
  kindToggle: function (e) {

  },
  hasNext:true,
  //总记录数
  total:0,
  //当前页面
  page:1,
  //页大小
  size:10,
  tabActive:"379",
  getSelType:function(e){
    var self = this;
    //重置前为第一页
    self.page = 1;
    //清空列表
    self.data.items = [];
    //下拉继续可以获取新的列表数据
    self.hasNext = true;
    //将记录总数重置
    self.total = 0;
    var tartget = e.currentTarget.dataset;
    var selType = tartget.selid;
    if(selType == "379"){
      self.tabActive = "379";
      request.reqProxyServer({
        path: "/mobile",
        data: {
          columnId: "379",
          page: "1",
          size: "10"
        },
        success: function (res) {
          var dt = res.data.data;
          self.total = dt.num;
          self.setData({
            newsActive:true,
            getMore: self.hasNext,
            items: dt
          });
        }
      });
      self.setData({
        newsActive: true
      });
    }else{
      self.tabActive = "378";
      request.reqProxyServer({
        path: "/mobile",
        data: {
          columnId: "378",
          page: "1",
          size: "10"
        },
        success: function (res) {
          var dt = res.data.data;
          self.total = dt.num;
          self.setData({
            getMore: self.hasNext,
            items: dt
          });
        }
      });
      self.setData({
        newsActive:false
      });
    }
  },
  goArticle:function(e){
   var dtSet =  e.currentTarget.dataset;
   articleId = dtSet.articleid;
    console.log(articleId);
    wx.navigateTo({
      url: '../articleDetails/articleDetails?articleId=' + articleId
    });
  },
  onLoad: function () {
    var self = this;
    //重置前为第一页
    self.page = 1;
    //清空列表
    self.data.items = [];
    //下拉继续可以获取新的列表数据
    self.hasNext = true;
    //将记录总数重置
    self.total = 0;
    request.reqProxyServer({
      path:"/mobile",
      data:{
        columnId: "379",
        page: "1",
        size: "10"
      },
      success:function(res){
        var dt = res.data.data;
        self.total = dt.num;
       
        self.setData({
          getMore: self.hasNext,
          items: dt
        });
      }
    });
  },
  pullListStart:function(e){
    var self = this;
    //获取选择器对象
    var selectorQuery = wx.createSelectorQuery();
    //获取视口结点对象
    var nodesRef = selectorQuery.selectViewport();
    //获取节点高度
    nodesRef.boundingClientRect(function (rect){
        console.log(rect.height);
        self.viewPortH = rect.height;
    }).exec();
  },
  pullListEnd:function(e){
    var self = this;
    var touchedInfo = e.changedTouches[0];
    //获取距离视口顶部的位置
    var toTop = touchedInfo.clientY;
    //触摸点相对于底部的位置为
    var toBottom = self.viewPortH - toTop;
    //当文档相对于可视区的高度为
    var currentDocHeight = touchedInfo.pageY + toBottom;
   // var nodes = selectorQuery.selectViewport();
  //  console.log(nodes);

    wx.createSelectorQuery().select('#ListBody').boundingClientRect(function (rect) {
    var docHeight = rect.height  // 节点的高度
    //如果文档已经到底部，那么加载下一页
    if (currentDocHeight >= docHeight){
          self.getNextPage();
      }
    }).exec();
  },
  getNextPage:function(){
    var self = this;
    if (self.hasNextPage()){
      self.page++;
      request.reqProxyServer({
        path: "/mobile",
        data: {
          columnId: self.tabActive,
          page: self.page,
          size: self.size
        },
        success: function (res) {
          var dt = res.data.data;
          if(self.data.items.article){
            self.data.items.article = self.data.items.article.concat(dt.article);
          }

          self.setData({
            getMore: self.hasNext,
            items: self.data.items
          });
        }
      });
    }else{
      self.setData({
        getMore: self.hasNext
      });
    }
  },
  hasNextPage:function(){
    var self = this;
      if(self.total==0){
        return false;
      }else{
        //总页面数为
        var totalPage = Math.ceil(self.total/self.size);
        //页数是否大于页总数
        if(self.page >= totalPage){
          self.hasNext = false;
          return false;
        }else{
          self.hasNext = true;
          return true;
        }
      }
  }
})

