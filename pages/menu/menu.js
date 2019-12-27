var app = getApp();
// pages/menu/menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //scroll
    viewDatas: [
      {
        title: "江山徐香猕猴桃",
        price: "5.99",
        imgUrl: "images/1.jpg",
        id:"0",
        hide:"true"
      }, 
      {
        title: "江山徐香猕猴桃",
        price: "5.99",
        imgUrl: "images/1.jpg",
        id: "0",
        hide: "true"
      }, 
      {
        title: "海南芒果小台农",
        price: "8.99",
        imgUrl: "images/2.jpg",
        id: "1",
        hide: "true"
      },
      {
        title: "江山徐香猕猴桃",
        price: "5.99",
        imgUrl: "images/1.jpg",
        id: "0",
        hide: "true"
      }, 
      {
        title: "陕西新鲜当季红富士",
        price: "5.98",
        imgUrl: "images/3.jpg",
        id: "2",
        hide: "true"
      },
      {
        title: "江山徐香猕猴桃",
        price: "5.99",
        imgUrl: "images/1.jpg",
        id: "0",
        hide: "true"
      }, 
      {
        title: "陕西新鲜当季红富士",
        price: "5.98",
        imgUrl: "images/a.jpg",
        id: "3",
        hide: "true"
      },
      {
        title: "陕西新鲜当季红富士",
        price: "5.98",
        imgUrl: "images/b.jpg",
        id: "4",
        hide: "true"
      },
      {
        title: "陕西新鲜当季红富士",
        price: "5.98",
        imgUrl: "images/c.jpg",
        id: "5",
        hide: "true"
      },
      {
        title: "秭归脐橙九月红橙子",
        price: "4.50",
        imgUrl: "images/4.jpg",
        id: "6",
        hide: "true"
      }
    ],
    //加购物后抛物线点
    bus_x: 0,
    bus_y: 0
  },
  onLoad() {
    var _windowHeight = wx.getSystemInfoSync().windowHeight;

    // 目标终点元素 - 购物车的位置坐标
    this.busPos = {};
    this.busPos['x'] = 40; // x坐标暂写死，自己可根据UI来修改
    this.busPos['y'] = _windowHeight - 30; // y坐标，也可以根据自己需要来修改
  },
  buyit(e) {
    var id = Number(e.currentTarget.dataset.id);
    // 如果good_box正在运动，不能重复点击
    if (!this.data.viewDatas[id].hide) return;
    this.finger = {};
    var topPoint = {};
    //点击点的坐标
    this.finger['x'] = e.touches["0"].clientX;
    this.finger['y'] = e.touches["0"].clientY;

    //控制点的y值定在低的点的上方150处
    if (this.finger['y'] < this.busPos['y']) {
      topPoint['y'] = this.finger['y'] - 150;
    } else {
      topPoint['y'] = this.busPos['y'] - 150;
    }

    //控制点的x值在点击点和购物车之间
    if (this.finger['x' > this.busPos['x']]) {
      topPoint['x'] = (this.finger['x'] - this.busPos['x']) / 2 + this.busPos['x'];
    } else {
      topPoint['x'] = (this.busPos['x'] - this.finger['x']) / 2 + this.finger['x'];
    }

    this.linePos = app.bezier([this.busPos, topPoint, this.finger], 30);
    this.startAnimation(id);
  },
  startAnimation: function (id) {
    var index = 0,
      that = this,
      bezier_points = that.linePos['bezier_points'];
    var param = {}
    param['bus_x'] = that.finger['x']
    param['bus_y'] = that.finger['y']
    var hide = 'viewDatas[' +id + '].hide'
    param[hide] = false
    this.setData(param)
    index = bezier_points.length;
    this.timer = setInterval(function () {
      index--;
      // 设置球的位置
      that.setData({
        bus_x: bezier_points[index]['x'],
        bus_y: bezier_points[index]['y']
      })
      // 到最后一个点的时候，开始购物车的一系列变化，并清除定时器，隐藏小球
      if (index < 1) {
        clearInterval(that.timer);
        that.addGoodToCartFn();
        param[hide] = true
        that.setData(param)
      }
    }, 33);
  },
  addGoodToCartFn: function () {
    // 购物车一系列变化

    // 设置购物车角标
    app.globalData.TotalNumber++; // 这里只是demo，每次角标数量加1
    wx.setTabBarBadge({
      index: 0,
      text: '' + app.globalData.TotalNumber + ''
    })
  },
  /**

 

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