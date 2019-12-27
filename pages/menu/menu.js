var app = getApp();
// pages/menu/menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //scroll
    viewDatas:[],
    //加购物后抛物线点
    bus_x: 0,
    bus_y: 0
  },
  onLoad() {
    this.setData({
      viewDatas: app.globalData.fruits
    })
    var _windowHeight = wx.getSystemInfoSync().windowHeight;

    // 目标终点元素 - 购物车的位置坐标
    this.busPos = {};
    this.busPos['x'] = 40; // x坐标暂写死，自己可根据UI来修改
    this.busPos['y'] = _windowHeight - 30; // y坐标，也可以根据自己需要来修改
  },
  buyit(e) {
    var order = e.currentTarget.dataset.index;
    // 如果good_box正在运动，不能重复点击
    var flag = false
    for (var item  of  this.data.viewDatas){
      if (!item.hide){
        flag = true
        break
      }
    }
    if (flag) return;
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
    this.startAnimation(order);
  },
  startAnimation: function (order) {
    var index = 0,
      that = this,
      bezier_points = that.linePos['bezier_points'];
    var param = {}
    param['bus_x'] = that.finger['x']
    param['bus_y'] = that.finger['y']
    var hide = 'viewDatas[' +order + '].hide'
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
        that.addGoodToCartFn(order);
        param[hide] = true
        that.setData(param)
      }
    }, 33);

  },
  addGoodToCartFn: function (order) {
    // 购物车一系列变化

    // 添加购物车数据
    var checkedFruit = app.globalData.fruits[order]
    var flag = true
    var index = null
    for (var item of app.globalData.carts){
      if (item == checkedFruit){
        flag = false
        index = app.globalData.carts.indexOf(item)
        break
      }
    }
    if (flag){
      app.globalData.carts.push(checkedFruit)
      // 设置购物车角标
      app.globalData.TotalNumber++; // 这里只是demo，每次角标数量加1
      wx.setTabBarBadge({
        index: 0,
        text: '' + app.globalData.TotalNumber + ''
      })
    }else{
      app.globalData.carts[index].num++
    }
    
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