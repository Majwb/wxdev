Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    items:[
      {
        background: "http://m.citgroup.cn/runtime/images/index/yanfa.jpg",
        twoUrl: "#home-navigate/product-sys-two-yfjs",
        pid:2,
        title: {
          name: "研发与建设",
          englishName: "RESEARCH AND DEVELOPMENT & CONSTRUCTION"
        },
        describe: {
          content: "依托于IT系统、大数据及软硬件，服务旅游行业主管单位、旅游景区、旅游住宿单位、旅行社的各种公共服务、公共管理、营销推广等智慧化需求。"
        },
        nav: [
          { logo: "local_atm", name: "区域智慧营销", url: '../systemthree/systemthree?typeid=10?name=区域智慧营销', },
          { logo: "organization", name: "智慧旅游公共服务", url: '../systemthree/systemthree?typeid=11&name=智慧旅游公共服务', },
          { logo: "cog", name: "景区智慧管理", url: '../systemthree/systemthree?typeid=12&name=景区智慧管理', }
        ]
      }, 
      {
        background: "http://m.citgroup.cn/runtime/images/index/guihua.jpg",
        twoUrl: "#home-navigate/product-sys-two-ghygw",
        pid: 1,
        title: {
          name: "规划与顾问",
          englishName: "PLANNING & CONSULTING"
        },
        describe: {
          content: "为各级旅游主管单位和目的地管理者提供智慧旅游的规划、设计、顾问和监理服务，帮助目的地经营管理者从大数据视角和“互联网+“视角对目的地进行智慧化管理和运营、营销推广。"
        },
        nav: [
          { logo: "feather", name: "智慧旅游规划", url: '../systemthree/systemthree?typeid=5&name=智慧旅游规划' },
          { logo: "pencil", name: "智慧旅游设计", url: "../systemthree/systemthree?typeid=6&name=智慧旅游设计" },
          { logo: "user-tie", name: "顾问和监理", url: "../systemthree/systemthree?typeid=7&name=顾问和监理" }
        ]
      }, 
      {
        background: "http://m.citgroup.cn/runtime/images/index/touzi.jpg",
        twoUrl: "#home-navigate/product-sys-two-tzyy",
        pid:3,
        title: {
          name: "投资与运营",
          englishName: "NVESTMENT & OPERATION"
        },
        describe: {
          content: "基于大数据和政策环境，按需构建可视化投资效益分析模型，提出切实符合市场需求、贴合项目发展定位、投资效益显著的方案，并探索PPP及O2O平台模式下的智慧旅游整体投资模式，创新构建“互联网+旅游”项目投资与运营新方式。"
        },
        nav: [
          { logo: "joomla", name: "智慧旅游整体投资", url: "../systemthree/systemthree?typeid=16&name=智慧旅游整体投资" },
          { logo: "brand", name: "智慧旅游平台运营", url: "../systemthree/systemthree?typeid=17&name=智慧旅游平台运营" },
          { logo: "location", name: "旅游目的地运营", url: "../systemthree/systemthree?typeid=18&name=旅游目的地运营" }
        ]
      },
      {
        background: "http://m.citgroup.cn/runtime/images/index/mudidi.jpg",
        twoUrl: "#home-navigate/product-sys-two-mddyx",
        pid:4,
        title: {
          name: "目的地营销",
          englishName: "DESTINATION MARKETING"
        },
        describe: {
          content: "从策划到实施，从营销顾问到新媒体及线上线下活动的执行，专注目的地营销推广，建立旅游目的地产品与目标市场间的关联系统，并有效提升所占市场份额。"
        },
        nav: [
          { logo: "lightbulb", name: "规划与顾问", url: "../systemthree/systemthree?typeid=20&name=规划与顾问" },
          { logo: "key", name: "新媒体营销", url: "../systemthree/systemthree?typeid=21&name=新媒体营销" },
          { logo: "broadcast", name: "广告与活动", url: "../systemthree/systemthree?typeid=22&name=广告与活动" }
        ]
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    circular:true,
    indicatorActiveColor:"#fff",
    duration: 1000
  },
  getMoreDetails:function(e){
    console.log("go systemtwo");
    var id = e.currentTarget.dataset.more;
    wx.navigateTo({
      url: '../systemtwo/systemtwo?typeid='+id
    })
  },
  onLoad:function(){
    
    // this.carouselList.push(model1);
    // this.carouselList.push(model2);
    // this.carouselList.push(model3);
    // this.carouselList.push(model4);
    // this.setData({
    //   items: this.carouselList
    // });
  }
})