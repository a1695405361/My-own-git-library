// pages/home/home.js
var app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    routers: [
      {
        name: '家常菜',
        url: '/pages/jiachang/jiachang',
        img: '/image/sw.png'
      },
      {
        name: '快手菜',
        url: '/pages/kuaishou/kuaishou',
        icon: ''
      },
      {
        name: '创意菜',
        url: '/pages/chuangyi/chuangyi',
        icon: ''
      },
      {
        name: '素菜',
        url: '/pages/sucai/sucai',
        icon: ''
      },
      {
        name: '凉菜',
        url: '/pages/liangcai/liangci',
        icon: ''
      },
      {
        name: '烘焙',
        url: '/pages/hongpei/hongpei',
        icon: ''
      },
      {
        name: '面食',
        url: '/pages/mianshi/mianshi',
        icon: ''
      },
      {
        name: '汤',
        url: '/pages/tang/tang',
        icon: ''
      },
      {
        name: '自制调料',
        url: '/pages/jiangliao/jiangliao',
        icon: ''
      }
    ],
    movielist:[],
    interval:3000,
    autoplay:true,
    imglist:[
      {url:"../../images/1.jpg"},
      {url:"../../images/2.jpg"},
      {url: "../../images/3.jpg"},
    ]
  },
  // loadMore2:function () {
  //   //请求自己创建服务器
  //   wx.request({
  //     url:'http://127.0.0.1:3000/movielist',
  //     data: { pno:1, pageSize: 10 },
  //     success: res => {
  //       // console.log(res);
  //       var list =res.data.data;
  //       var rows =this.data.movielist.concat(list);
  //       this.setData({ 
  //        movielist:rows
  //       })
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log('onLoad')
    var that = this
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
    //  this.loadMore2();
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