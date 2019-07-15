// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:"", //搜索的内容
    ssfoodlist:[]
  },
  // 搜索框内容
  onSearch:function(event){
    this.setData({
      inputValue: event.detail
    })
    console.log(this.data.inputValue);
    wx.cloud.callFunction({
      name: "foods",//云函数调用
      data: {
        id: this.data.inputValue
      }
    }).then(res => {
      // console.log(res.result);
      var obj= JSON.parse(res.result);
      // console.log(obj.result);
      this.setData({
        ssfoodlist: obj.result.data
      })
    }).catch(err => {
      console.log(err);
    })
  },
  jccomment: function (e) {
    var id = e.target.dataset.foodid;
    wx.navigateTo({
      url: '/pages/jccomment/jccomment?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
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