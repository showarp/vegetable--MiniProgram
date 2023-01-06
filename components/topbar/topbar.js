// components/topbar/topbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propT: String,
    propTitle:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    posi:wx.getMenuButtonBoundingClientRect(),
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back:function(){
      wx.navigateBack()
    }
  },

})
