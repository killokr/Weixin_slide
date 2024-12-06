// index.js
Page({
  data:{
    // 两个页面的切换依据
    tab: 0,
    // 页面数据分别存储
    movies: [],
    books: [],
    // 当前页数分开计算
    moviePageNum: 1,
    bookPageNum: 1,
  },
  movieLoad(){
    if (this.data.moviePageNum<6){
      wx.showLoading({
        title: '加载中……',
      })
    }
    wx.request({
      url: 'http://localhost:3000/movie',
      data:{
        _page: this.data.moviePageNum,
        _limit: 10
      },
      success: res => {
        let arr = this.data.movies
        arr = arr.concat(res.data)
        this.setData({
          movies: arr
        })
        this.data.moviePageNum < 6 ? wx.hideLoading() : null
      }
    })
  },
  bookLoad(){
    if (this.data.bookPageNum<6){
      wx.showLoading({
        title: '加载中……',
      })
    }
    wx.request({
      url: 'http://localhost:3000/book',
      data:{
        _page: this.data.bookPageNum,
        _limit: 10
        // _totalPages: 5
      },
      success: res => {
        let arr = this.data.books
        arr = arr.concat(res.data)
        this.setData({
          books: arr
        })
        this.data.bookPageNum < 6 ? wx.hideLoading() : null
      }
    });
  },
  onReady(){
    this.movieLoad();
    this.bookLoad();
  },
  onReachBottom() {
    if (this.data.tab==1){ // 值1为书
      let bookPageNum = this.data.bookPageNum + 1;
      this.setData({
        bookPageNum: bookPageNum
      })
      this.bookLoad();
    }else{
      let moviePageNum = this.data.moviePageNum + 1;
      this.setData({
        moviePageNum: moviePageNum
      })
      this.movieLoad();
    }
  },
  // 点击项目：跳转详情页
  getDetail(e){
    let type = e.currentTarget.id.split("_")[0];
    let id = e.currentTarget.id.split("_")[1];
    wx.navigateTo({
      url: `/pages/index/detail?id=${id}&type=${type}`
    })
  },
  // 点击tab：切换页面
  changeItem(e){
    this.setData({
      tab: e.currentTarget.dataset.index
    })
  },
})
