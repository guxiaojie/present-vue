
/**
 * 提示与加载工具类
 */
export default class Tips {
  constructor (config) {
    this.isLoading = false
    this.that = config.that
  }

  static form(title) {
    return {
      message: title,
      type: 'info',
      duration: 1000,
      dismissible: false,
      queue: false,
      position: 'top',
      // onClick: this.onClick,
      // onDismiss: this.onDismiss
    }
  }

  /**
   * 弹出提示框
   */

  static success (title, duration = 500) {
    setTimeout(() => {
      wx.showToast({
        title: title,
        icon: 'success',
        mask: true,
        duration: duration
      })
    }, 300)
    if (duration > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, duration)
      })
    }
  }

  /**
   * 弹出确认窗口
   */
  static confirm (text, payload = {}, title = '提示') {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: true,
        success: res => {
          if (res.confirm) {
            resolve(payload)
          } else if (res.cancel) {
            reject(payload)
          }
        },
        fail: res => {
          reject(payload)
        }
      })
    })
  }

  static toast (title, icon = 'success') {
    // setTimeout(() => {
    //   wx.showToast({
    //     title: title,
    //     icon: icon,
    //     mask: true,
    //     duration: 1000
    //   })
    // }, 1000)

    const form = {
      message: title,
      type: 'info',
      duration: 1000,
      dismissible: true,
      queue: false,
      position: 'top',
      // onClick: this.onClick,
      // onDismiss: this.onDismiss
    }

    that.$toast.open(form)

  }

  /**
   * 警告框
   */
  static alert (title) {
    wx.showToast({
      title: title,
      icon: '/public/images/error.png',
      mask: true,
      duration: 1500
    })
  }

  /**
   * 错误框
   */

  static error (title, duration = 1500) {
    wx.showToast({
      title: title,
      icon: 'none',
      mask: false,
      duration: duration
    })
  }

  /**
   * 弹出加载提示
   */
  static loading (title, that) {
    if (Tips.isLoading) {
      return
    }
    Tips.isLoading = true

    const form = {
      message: '加载中...',
      type: 'info',
      duration: 10000,
      dismissible: false,
      queue: false,
      position: 'bottom-right',
      onClick: this.onClick,
      onDismiss: this.onDismiss
    }

    that.$toast.open(form)

    // wx.showLoading({
    //   title: title,
    //   mask: true
    // });
  }

  /**
   * 加载完毕
   */
  static loaded (that) {
    if (Tips.isLoading) {
      Tips.isLoading = false

      that.$toast.clear()
      // wx.hideLoading();
    }
  }

  static share (title, url, desc) {
    return {
      title: title,
      path: url,
      desc: desc,
      success: function (res) {
        Tips.toast('分享成功')
      }
    }
  }
}

/**
 * 静态变量，是否加载中
 */
Tips.isLoading = false
