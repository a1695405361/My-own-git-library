// pages/chuangyi/chuangyi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodlist: []
  },
  loadMore: function () {
    //加载更多
    // 1:调用云函数
    wx.cloud.callFunction({
      name: "foodsid",
      data: {
        id: 3,  //
        pn: this.data.foodlist.length,
        rn: 30
      }
    }).then(res => {
      // console.log(typeof res.result);
      // console.log(res);
      var obj = JSON.parse(res.result);

      // var pps=obj.result.slice(pn,rn);
      // console.log(obj.result);
      this.setData({
        foodlist:
          // obj.result.data
          this.data.foodlist
            .concat(obj.result.data)
      })
    }).catch(err => {
      console.log(err);
    })
    // 2：将云函数返回列表
    // 3：显示当前组件
  },
  /**
   * 生命周期函数--监听页面加载
   */
  jccomment: function (e) {
    //按钮跳转  ---关闭并且跳转
    // wx.redirectTo({
    //   url: '/pages/jccomment/jccomment',
    // })
    //获取食谱id
    //e 事件对象  target触发事件元素 button
    //dataset 所有自定义属性
    var id = e.target.dataset.foodid;
    wx.navigateTo({
      url: '/pages/jccomment/jccomment?id=' + id,
    })
  },
  onLoad: function (options) {
    this.loadMore();
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
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})