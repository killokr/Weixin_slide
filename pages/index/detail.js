// pages/index/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
    flag: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    let id = options.id
    let type = options.type
    wx.request({
      url: `http://localhost:3000/${type}?id=${id}`,
      success: res => {
        let temp = res.data[0]
        if (type === "movie"){
          this.setData({
            flag: 0,
            // 头部
            img: temp.img_url,
            name: temp.name,
            year: temp.year,
            label: temp.category.join(" "),
            area: temp.area,
            time: "片长"+temp.duration+"分钟",
            score: temp.score,
            // 简介
            desc: temp.description,
            // 影人
            director: temp.director, 
            actors: temp.actors,
            // 短评
            comments: temp.short_comments
          })
        }else{
          // 同一页面进行，不同处细节调整
          // 优点:省空间,避免css全局污染
          // 缺点：detail文件(绿蓝)存在大量污染
          // 另一种思路:移到文件夹,新的共享css
          this.setData({
            flag: 1,
             // 头部
             img: temp.img_url,
             name: temp.name,
             author: temp.author,
             publisher: temp.publisher,
             year: temp.year,
             score: temp.score,
            // 简介
            desc: temp.introduce,
            // 短评
            comments: temp.short_comments
          })
        }
      }
    })
  },
  back(){
    wx.navigateBack({
      delta: 0,
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