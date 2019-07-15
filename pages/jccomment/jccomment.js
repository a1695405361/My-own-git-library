// pages/jccomment/jccomment.js
const db= wx.cloud.database({
  env:"aihao-ki723"
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodid:0,  //菜品id
    foods:{},    //菜品详细信息
    content:'',  //评论初始值
    images:[],    //保存用户选中图片
    fileIds:[]    //保存图片fileID
  },
  //评论函数
  onChange:function(e){
    // console.log(e.detail);
    this.setData({
      content:e.detail
    })
  },
  // 上传图片
  uploadImg:function(){
    //选中图片
    wx:wx.chooseImage({
      count: 9,   //选中图片张数
      sizeType: ["original","compressed"], //源图 压缩图
      sourceType: ["album","camera"],     //来源  相册相机
      success:res=>{                      //选择 成功
        const tempFiles =res.tempFilePaths;
        // console.log(tempFiles);
        // 预览：将用户选中图片保存
        this.setData({
          images:tempFiles
        })
      },
    })
  },
  //提交评价
  submit:function(){
    //1:上传9张图片
    wx.showLoading({
      title: '评论中',
    });
    // console.log(this.data.content+"");
    // 2:上传图片到云存储
    // 3：创建promis数组
    let promiseArr=[];
    // 4：创建循环9次
    for(let i=0;i<this.data.images.length;i++){
    // 5：创建promise push数组中
      promiseArr.push(new Promise((reslove,reject)=>{
        // 5.1：获取当前上传图片
          var item =this.data.images[i];
        // 5.2：创建正则  拆分文件后缀  .jpg .png
        let suffix =/\.\w+$/.exec(item)[0];
        // 5.3：上传图片
        wx.cloud.uploadFile({
          cloudPath:new Date().getTime()+suffix,  //上传云端路径
          filePath:item,    //小程序临时路径
          success:res=>{
            // console.log(res.fileID);
            //将当前文件id保存data
            var ids =this.data.fileIds.concat(res.fileID);
            this.setData({
              fileIds:ids
            })
          // 5.4：上传成功后将当前云存储fileID保存数组
          // 5.5：追加任务列表
            reslove();
          },
          fail:err=>{
            console.log(err);
          }
        })
        // 5.6：失败显示出错信息
      }));
    }
    //6.一次性将图片 fileID 保存在集合中
    //保存集合中[集和中一条记录]
    Promise.all(promiseArr).then(res=>{
      //6.1添加数据
      db.collection("comment").add({
        data:{
          content:this.data.content,  //评论内容
          foodid: this.data.foodid,   //评论电影id
          fileIds:this.data.fileIds   //上传图片id
        }
      }).then(res=>{
        wx.hideLoading(); //隐藏加载
        wx.showToast({    //显示提示
          title: '评价成功',
        })
      }).catch(err=>{
        wx.hideLoading();
        wx.showToast({
          title: '评价失败',
        })
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //接收食谱列表传递参数id并且保存data
    // console.log(options.id);
    this.setData({
      foodid:options.id
    });
    //2：提示数据加载
    wx.showLoading({
      title: '加载中',
    });
    // 3：调运函数，将食谱传递云函数
    wx.cloud.callFunction({
      name:"foodsid2",   //云函数名称
      data:{foodid:options.id} //云函数参数
    }).then(res=>{
       // 4：获取云函数返回数据并且保存data
      console.log(res.result); 
      // 4.1:将字符串转js  obj
      var obj= JSON.parse(res.result);
      // 4.2保存data
      this.setData({
        foods: obj.result.data[0]
      })
      wx.hideLoading();    // 5：隐藏加载框
    }).catch(err=>{
      wx.hideLoading();
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