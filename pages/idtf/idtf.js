// pages/idtf/idtf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     isShutter:false,
     ld:false,
     photoSrc:'',
     oneButton: [{text: '确定'}],
     dialogShow: false,
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          ld:true
        })
        wx.vibrateShort({'type':'medium'})
        this.setData({
          photoSrc: res.tempImagePath
        })
        let that = this
        wx.uploadFile({
          url: `http://${getApp().globalData.url}/api/upload`,
          filePath: res.tempImagePath,
          name: 'file',
          success (res){
            res=JSON.parse(res.data)
            if(res.failed){
              that.setData({
                dialogShow: true,
                showOneButtonDialog: false,
                ld:false,
                photoSrc:''
              })
            }else{
              that.setData({
              ld:false,
              photoSrc:`http://${getApp().globalData.fileurl}/${res.imageres}`,
              qua:res.qua,
              class:res.class
            })
            wx.getLocation({
              success(res){
                that.setData({
                  posix:res.longitude,
                  posiy:res.latitude
                })
                wx.navigateTo({
                  url: `/pages/photores/photores?imageurl=${that.data.photoSrc}&posix=${that.data.posix}&posiy=${that.data.posiy}&qua=${that.data.qua}&class=${that.data.class}`
                })
                that.setData({
                  photoSrc:''
                })
              }
            })
            }
          }
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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