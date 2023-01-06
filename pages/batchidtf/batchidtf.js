// pages/batchidtf/batchidtf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:getApp().globalData.url,
    fileurl:getApp().globalData.fileurl,
    posi:wx.getMenuButtonBoundingClientRect(),
    isnull:true,
    resImageres:[],
    oneButton: [{text: '确定'}],
    dialogShow: false,
  },
  upld(){
    let that = this
    wx.chooseMedia({
      count:100,
      mediaType:['image'],
      success (res) {
        that.setData({isnull:false})
        res.tempFiles.forEach(i=>{
          wx.uploadFile({
            url: `http://${getApp().globalData.url}/api/upload`,
            filePath: i.tempFilePath,
            name: 'file',
            success (res){
              if(JSON.parse(res.data).failed!=undefined){
                that.setData({
                  dialogShow: true
                })
              }else{
                let app = getApp()
                app.globalData.batchidtf=that.data.resImageres.concat(JSON.parse(res.data))
                that.setData({
                  resImageres:that.data.resImageres.concat(JSON.parse(res.data))
                })
              }
            }
          })
        })
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that= this
    wx.getLocation({
      success(res){
        that.setData({
          posix:res.longitude,
          posiy:res.latitude
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  let app=getApp()
  if(app.globalData.batchidtf.length>0){
    this.setData({isnull:false})
  }
  },
  tapDialogButton(){
    this.setData({
      dialogShow:false
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let app=getApp()
    this.setData({
      resImageres:app.globalData.batchidtf
    })
    if(app.globalData.batchidtf.length==0){
      this.setData({isnull:true})
    }
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