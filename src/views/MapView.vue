<template>
  <view class="container">
 
  <scroll-view scroll-y="true" scroll-x="true" class = "FilePath" bindtouchmove="scroll" bindtouchstart='scroll' bindtouchend='endTou'>
    <img :src='img' style="width:{{width}}rpx; height:{{height}}rpx;" bindtouchmove="touch" mode="scaleToFill"  bindload="imageLoad">
   </scroll-view>
  </view>
</template>

<script>
// import wepy from 'wepy';
// import wxRequest from '@/utils/wxRequest';
// import { getStore } from 'wepy-redux';
// import { addStatement, modifyStatement } from '@/store/actions';
// import tip from '@/utils/tip';
// import Util from '@/utils/util.js';
// import Session from '@/utils/session';
// import Host from '@/utils/host';

export default {
  

  data() {return {
    img: 'https://assets.storiesmatter.cn/map.png',

    olddistance: '', //上一次两个手指的距离
    newdistance: '', //本次两手指之间的距离，两个一减咱们就知道了滑动了多少，以及放大还是缩小（正负嘛）
    diffdistance: '', //这个是新的比例，新的比例一定是建立在旧的比例上面的，给人一种连续的假象
    oldscaleA: 1,
    Scale: 1, //图片放大的比例，
    baseHeight: '', //原始高
    baseWidth: '', //原始宽
    width: '',
    height: '',

    px2rpx: 2,
    windowWidth: 375
  }},
//   components = {},
/*
  //手指在屏幕上移动
  scroll(e) {
    var _this = this;
    //当e.touches.length等于1的时候，表示是单指触摸，我们要的是双指
    if (e.touches.length == 2) {
      //两个手指滑动的时候
      var xMove = e.touches[1].clientX - e.touches[0].clientX; //手指在x轴移动距离
      var yMove = e.touches[1].clientY - e.touches[0].clientY; //手指在y轴移动距离
      var distance = Math.sqrt(xMove * xMove + yMove * yMove); //根据勾股定理算出两手指之间的距离

      if (_this.olddistance == 0) {
        _this.olddistance = distance; //要是第一次就给他弄上值，什么都不操作
        // console.log("第一次");
      } else {
        _this.newdistance = distance; //第二次就可以计算它们的差值了
        _this.diffdistance = _this.newdistance - _this.olddistance; //两次差值
        _this.olddistance = _this.newdistance; //计算之后更新比例
        _this.Scale = _this.oldscaleA + 0.005 * _this.diffdistance; //这条公式是我查阅资料后找到的，按照这条公式计算出来的比例来处理图片，能给用户比较好的体验
        if (_this.Scale > 5) {
          //放大的最大倍数
          return;
        } else if (_this.Scale < 1) {
          //缩小不能小于当前
          return;
        }
        _this.height = _this.baseHeight * _this.Scale;
        _this.width = _this.baseWidth * _this.Scale;

        _this.oldscaleA = _this.Scale; //更新比例

        //console.log('----------_this.height', _this.height, _this.width);

        _this.$apply();
      }
    }
  }

  //手指离开屏幕
  endTou(e) {
    this.olddistance = 0; //重置
    // this.getRect();
  }
  touch() {}
  onLoad(options) {

    console.log('imageLoad-------', options);
     if (options.img != undefined) {
      this.img = options.img;
      this.$apply();
    }
  }

  methods = {
    imageLoad(e) {
      // console.log('imageLoad-------', e);
      //单位rpx
      var originWidth = e.detail.width * this.px2rpx,
        originHeight = e.detail.height * this.px2rpx,
        ratio = originWidth / originHeight;
      var viewWidth = 750,
        viewHeight; //设定一个初始宽度
      //当它的宽度大于初始宽度时，实际效果跟mode=widthFix一致
      if (originWidth >= viewWidth) {
        //宽度等于viewWidth,只需要求出高度就能实现自适应
        viewHeight = viewWidth / ratio;
      } else {
        //如果宽度小于初始值，这时就不要缩放了
        viewWidth = originWidth;
        viewHeight = originHeight;
      }

      this.baseHeight = viewHeight;
      this.baseWidth = viewWidth;

      this.height = viewHeight;
      this.width = viewWidth;
      // console.log('----------_this.height', this.height, this.width);

      this.$apply();
    }
  }
  */
}
</script>

<style lang="scss">
page,
.container {
  height: 100%;
}
.FilePath {
  height: 100%;
}
</style>