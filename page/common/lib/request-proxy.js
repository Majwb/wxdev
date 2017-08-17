var reqProxy = function (options/*obj*/) {
  
  var baseUrl = "https://citgroup.cn";
  var path = null, data = null, success = null, types = null;
  if (options && typeof options === "object") {
    path = options.path;
    data = options.data;
    success = options.success;
    types = options.types;
  } else {
    return;
  }
  types = types ? types : "post";

  if (!path) {
    return;
  } else {
    pUrl = baseUrl + path;
    data = data ? JSON.stringify(data) : "";
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
  //请求微信的接口调用
    wx.request({
      url: pUrl,
      data: data,
      method: types,
      header: {
        'content-type': 'application/json'
      },
      success: function(res){
        if(res.data.status == "SUCCESS"){
            wx.hideLoading();
            options.success(res);
        }
      }
    });
  }
}
var reqProxySimple = function (options/*obj*/) {

  var baseUrl = "https://citgroup.cn";
  var path = null, data = null, success = null, types = null;
  if (options && typeof options === "object") {
    path = options.path;
    data = options.data;
    success = options.success;
    types = options.types;
  } else {
    return;
  }
  types = types ? types : "post";

  if (!path) {
    return;
  } else {
    pUrl = baseUrl + path;
    data = data ? JSON.stringify(data) : "";
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    //请求微信的接口调用
    wx.request({
      url: pUrl,
      data: data,
      method: types,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.status == "SUCCESS") {
          wx.hideLoading();
          options.success(res.data);
        }
      }
    });
  }
}
//构造函数，创建分页查询对象
var DataPool = function(total,page,size){
  this.hasNext = true,
    //总记录数
    this.total = total || 0,
    //当前页面
    this.page = page || 1,
    //页大小
    this.size = size || 10,
    this.tabActive = "377";
}
DataPool.prototype.hasNextPage = function(){
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
}




module.exports = {
  reqProxyServer: reqProxy,
  reqProxy: reqProxySimple
}