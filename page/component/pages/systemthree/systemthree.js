// systemtwo.js
var request = require("../../../common/lib/request-proxy.js");
/**
 * 应用场景说明：
 * 当点击其中的一项里让其平滑的过度到中间的位置
 * 算法说明：
 * 1、获取当前点击元素的信息mssage
 * 2、获取屏幕的宽度对应的中间位置,screewidth
 * 3、获取点击元素的宽度。mssage.width
 * 4、用屏幕的的宽度（screewidth/2=s）的一半，减去元素的宽度(mssage.width/2 = q)的一半，得到元素相对于屏幕中间点对齐的的位置m。 即：s-q=m
 * 【---】屏幕下方区域
 * 【---------------------】屏幕下方元素中的一个父级元素，该父级元素下有n个子元素。
 * 5、如果父元素起始位置为0，那么子元素相对于父的偏移为mssage.offsetx,
 * 6、将父元素左移mssage.offsetx + m 为当前元素的中间位置。
 * mssage-->| 计算 m -->| mssage -- > 移动mssage.offsetx+m;
 * screeW-->| 计算 m -->|
 * 
 */

// systemthree.js
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
      console.log(options);
      var self = this;
      request.reqProxy({
        path: "/productSystemApi/selectProductAndChildsForPortal",
        data: {
          pid: options.typeid
        },
        success: function (res) {
          if (res.status == "SUCCESS") {
            var id = res.data.childs&&res.data.childs[0]&&res.data.childs[0].primay;
            request.reqProxy({
              path: "/productSystemApi/selectSubDescriptionAndCharacteristicsForPortal",
              data: {
                primary: options.typeid
              },
              success:function(ressub){
                if (ressub.status == "SUCCESS"){
              if(ressub.data){
                    var dt = ressub.data;
                    self.setData({
                      hasContentDes:true,
                      threeTitle: dt.productSystem && dt.productSystem.psname,
                      threeContentDes: dt.productSystem && dt.productSystem.subdescription,
                      hasContentChar:  dt.productSystem && dt.productCharacteristics.length != 0,
                      threeContentChar:  dt.productCharacteristics.length!=0 && dt.productCharacteristics[0].description
                    });  
                  }    
                }
              }});
            self.setData({
              childs: res.data.childs,
              threeName: options.name
            });      
          }

          console.log(res);
        }
      });
  },
  posX: 0,
  proPos: 0,
  //位置信息
  posInfo: [],
  //获取窗口容器的中间位置(获取屏幕的一半)
  getCenterPos: function () {
    var self = this;
    //获取选择器对象
    var selectorQuery = wx.createSelectorQuery();
    //获取视口结点对象
    var nodesRef = selectorQuery.selectViewport();
    //获取节点宽度
    var cCenterPos = 0;
    return new Promise(function (resolve) {
      nodesRef.boundingClientRect(function (rect) {
        var posCenter = Math.ceil(rect.width / 2);
        resolve(posCenter);
      }).exec();
    });
  },
  //获取元元素的信息
  getOffsetEPos: function (id) {
    return new Promise(function (resolve) {
      wx.createSelectorQuery().select('#' + id).boundingClientRect(function (rect) {
        resolve(rect);  
      }).exec();
    });
  },
  //获取元素的宽度
  getEwidth:function(id){
    return new Promise(function(resolve){
      wx.createSelectorQuery().select('#' + id).boundingClientRect(function (rect) {
        resolve(rect.width);   // 节点的宽度
      }).exec();
    });
  },
  geOffsetX:function(id){
    return new Promise(function (resolve) {
        wx.createSelectorQuery().select('#' + id).fields({
          dataset: true,
          size: true,
          scrollOffset: true,
          properties: ['scrollX', 'scrollY']
        }, function (res) {
          resolve(res);    // 节点的dataset
        }).exec();
    })
  },
  //所有节点的便宜
  nodesOffset:null,
  getAllPos:function(){
    var self = this;
    //为了提高性能将这个计算的结果集存储在全局。
    if (!self.nodesOffset) {
      return new Promise(function(resolve){
      wx.createSelectorQuery().selectAll('.product-item').boundingClientRect(function (rects) {
        var nodesOffset = [];
        //由于元素不包边距，所以偏移应该加上边距的距离 初始为，左右边距为24rpx = 12px;
        var offset = 12;
        rects.forEach(function (rect) {
          var node = {};
          node.id = rect.id;        //节点的id
          node.width = rect.width;  // 节点的宽度
          node.offset = offset;      //当前节点的偏移
          offset += (node.width+24);       //元素之间12*2个宽度的偏移
          nodesOffset.push(node);
        });
        self.nodesOffset = nodesOffset;
        resolve(nodesOffset);
      }).exec()
    });
    }else{
      return new Promise(function(resolve){
        resolve(self.nodesOffset);
      })
    }
  },
  currentPos:0,
  //点击元素到指定位置。
  clickThreeLable:function(e){
    var self = this;
    var objId = e.currentTarget.id;
    Promise.all([self.getOffsetEPos(e.currentTarget.id), self.getCenterPos(), self.geOffsetX(e.currentTarget.id), self.getAllPos()]).then(function(result){
      var eWidth = result[0].width;
      console.log("元素的宽度",eWidth);
      var eCenterPos = result[1];
      console.log("中间点的位置", eCenterPos);
     
      console.log("元素节点信息",result[2]);
      var nodesInfo = result[3];
      //中间点的位置为
      var offsetX = eCenterPos - Math.ceil(eWidth/2);
     
      //相对于父元素的偏移为
      
    
      wx.createSelectorQuery().select('#itemList').boundingClientRect(function (rect) {
      //console.log(nodesInfo.width);
      }).exec()

      var objOffset = 0;
      nodesInfo.forEach(function(obj){
             if(obj.id==objId){
               objOffset = obj.offset;
             }
      });
      console.log("相对于父元素的偏移为", objOffset);
      var showPos = offsetX - objOffset;
      return showPos;
    }).then(function(param){
    //  console.log("相对于交元素的偏移为", param);
      request.reqProxy({
        path: "/productSystemApi/selectSubDescriptionAndCharacteristicsForPortal",
        data: {
          primary: objId.slice(2,objId.lenth)
        },
        success: function (ressub) {
          if (ressub.status == "SUCCESS") {
            if (ressub.data) {
              var dt = ressub.data;
              self.setData({
                hasContentDes: true,
                threeTitle: dt.productSystem && dt.productSystem.psname,
                threeContentDes: dt.productSystem && dt.productSystem.subdescription,
                hasContentChar: dt.productSystem && dt.productCharacteristics.length != 0,
                threeContentChar: dt.productCharacteristics.length != 0 && dt.productCharacteristics[0].description
              });
            }
          }
        }
      });     
      self.setData({
        left:param
      });

    });
  },
  //获取（p#item-list）元素中子元素在容器元素(div#product-three-item)的中间位置对应(p#item-list)的偏移量。
  getECenterPos: function (obj) {
  
  },
  //移动的速率
  speed: 10,
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