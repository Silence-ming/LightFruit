//app.js
App({
  globalData: {
    TotalNumber: 0,      
    fruits: [
      {
        title: "江山徐香猕猴桃",
        price: "5.99",
        imgUrl: "/images/images/1.jpg",
        id: "0",
        hide: "true",   //抛物线小图片是否隐藏
        num: 1,
        selected: true    //购物车中是否被选中
      },
      {
        title: "江山徐香猕猴桃",
        price: "5.99",
        imgUrl: "/images/images/1.jpg",
        id: "1",
        hide: "true",
        num: 1,
        selected: true
      },
      {
        title: "海南芒果小台农",
        price: "8.99",
        imgUrl: "/images/images/2.jpg",
        id: "2",
        hide: "true",
        num: 1,
        selected: true
      },
      {
        title: "江山徐香猕猴桃",
        price: "5.99",
        imgUrl: "/images/images/1.jpg",
        id: "3",
        hide: "true",
        num: 1,
        selected: true
      },
      {
        title: "陕西新鲜当季红富士",
        price: "5.98",
        imgUrl: "/images/images/3.jpg",
        id: "4",
        hide: "true",
        num: 1,
        selected: true
      },
      {
        title: "江山徐香猕猴桃",
        price: "5.99",
        imgUrl: "/images/images/1.jpg",
        id: "5",
        hide: "true",
        num: 1,
        selected: true
      },
      {
        title: "陕西新鲜当季红富士",
        price: "5.98",
        imgUrl: "/images/images/a.jpg",
        id: "6",
        hide: "true",
        num: 1,
        selected: true
      },
      {
        title: "陕西新鲜当季红富士",
        price: "5.98",
        imgUrl: "/images/images/b.jpg",
        id: "7",
        hide: "true",
        num: 1,
        selected: true
      },
      {
        title: "陕西新鲜当季红富士",
        price: "5.98",
        imgUrl: "/images/images/c.jpg",
        id: "8",
        hide: "true",
        num: 1,
        selected: true
      },
      {
        title: "秭归脐橙九月红橙子",
        price: "4.50",
        imgUrl: "/images/images/4.jpg",
        id: "9",
        hide: "true",
        num: 1,
        selected: true
      }
    ],
    carts:[],
  },
  onLaunch: function (res) {
    // this.globalData.TotalNumber = res.data.shopNum;
    this.globalData.TotalNumber = 0
  },
  bezier: function (pots, amount) {
    // 购物车动画特效算法
    var pot;
    var lines;
    var ret = [];
    var points;
    for (var i = 0; i <= amount; i++) {
      points = pots.slice(0);
      lines = [];
      while (pot = points.shift()) {
        if (points.length) {
          lines.push(pointLine([pot, points[0]], i / amount));
        } else if (lines.length > 1) {
          points = lines;
          lines = [];
        } else {
          break;
        }
      }
      ret.push(lines[0]);
    }
    function pointLine(points, rate) {
      var pointA, pointB, pointDistance, xDistance, yDistance, tan, radian, tmpPointDistance;
      var ret = [];
      pointA = points[0];//点击
      pointB = points[1];//中间
      xDistance = pointB.x - pointA.x;
      yDistance = pointB.y - pointA.y;
      pointDistance = Math.pow(Math.pow(xDistance, 2) + Math.pow(yDistance, 2), 1 / 2);
      tan = yDistance / xDistance;
      radian = Math.atan(tan);
      tmpPointDistance = pointDistance * rate;
      ret = {
        x: pointA.x + tmpPointDistance * Math.cos(radian),
        y: pointA.y + tmpPointDistance * Math.sin(radian)
      };
      return ret;
    }
    return {
      'bezier_points': ret
    };
  }
})