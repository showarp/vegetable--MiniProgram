// pages/phptores/photores.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxBarposi:wx.getMenuButtonBoundingClientRect(),
    topbar:true,
    mapmaskScale:70,
    mapmask:true,
    operation:false,
    catchtouchmove:undefined,
    groups: [
      { text: '保存', value: 1 },
      { text: '丢弃',type:'warn', value: 2 }
  ],
  },
  maphideclick(){
    this.setData({
      topbar:true,
      mapmask:true,
      catchtouchmove:'',
      mapmaskScale:70
    })
  },
  mapmaskclick(){
    this.setData({
      topbar:false,
      mapmask:false,
      catchtouchmove:true,
      mapmaskScale:100
    })
  },
  oprationClose: function () {
    this.setData({
      operation: false
    })
  },
  back(){
    if(this.data.idx==undefined){
      wx.request({url:`http://${getApp().globalData.url}/api/upload?cz=del&imageName=${this.data.imageurl.split('/')[4]}`})
    }
  },
  btnClick(e){
    if (e.detail.value==1){
      for(let i=0;i<this.data.class.length;i++){
        wx.request({
          url: `http://${getApp().globalData.url}/api/upData?class=${this.data.class[i]}&fileName=${this.data.id}&qua=${this.data.qua[i]}&posix=${this.data.posix}&posiy=${this.data.posiy}&address=${this.data.address}`,
        })
      }
      if(this.data.idx!=undefined){
        getApp().globalData.batchidtf.splice(this.data.idx,1)
      }
      wx.navigateBack()
    }
    if(e.detail.value==2){
      wx.request({url:`http://${getApp().globalData.url}/api/upload?cz=del&imageName=${this.data.imageurl.split('/')[4]}`})
      if(this.data.idx!=undefined){
        getApp().globalData.batchidtf.splice(this.data.idx,1)
      }
      wx.navigateBack()
    }
    this.oprationClose()
  },
  imageclick(){
    this.setData({operation:true})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    wx.request({
      url: `https://restapi.amap.com/v3/geocode/regeo?key=73653ae946f02b0cb1e8c35957f0bd12&location=${options.posix},${options.posiy}`,success(res){
        that.setData({
          address:res.data.regeocode.formatted_address
        })
      }
    })
    this.setData({
      idx:options.idx,
      id:options.imageurl.split('/')[4],
      imageurl:options.imageurl,
      class:options.class.split(','),
      qua:options.qua.split(','),
      posix:options.posix,
      posiy:options.posiy,
      marker:[{width:40,height:40,id:1,latitude:options.posiy,longitude:options.posix,iconPath:'./images/Marker1_Activated@3x.png'}]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})