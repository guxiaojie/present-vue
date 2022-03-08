export function setRem () {
  // 320 默认大小16px; 320px = 20rem ;每个元素px基础上/16
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  console.log('----------htmlWidth', htmlWidth)
  // 得到html的Dom元素
  const htmlDom = document.getElementsByTagName('html')[0]
  if (htmlWidth >= 450) {
    // 设置根元素字体大小
    htmlDom.style.fontSize = 22 + 'px'
  } else {
    // 设置根元素字体大小
    htmlDom.style.fontSize = htmlWidth / 20 + 'px'
  }
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}

// 如何在vue的web页面中像小程序中使用rpx单位做兼容
// https://www.jianshu.com/p/c418f1429f92

// 微信小程序中rpx与rem单位使用 https://www.jianshu.com/p/f8d849bc67a6
// 设计稿750px宽度此时1rem = （750/20）rpx = 37.5px
