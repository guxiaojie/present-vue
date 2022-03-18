<template>
  <view class="container">
    <view style="height:40px;"> </view>

    <view class="choose_character">
      <view class="column">
        <text class="title1">购买搜索次数</text>
      </view>

      <view class="img-top-shortline">
        <img :src="imgs.shortLine" mode="widthFix">
      </view>
    </view>

    <view class="statement-list">
        <view v-for="(item, index) in list" v-bind:key="index" index="index" item="item">
          <view class="cell" v-on:click="handleRadio(index, item.id)">
            <input class="cell-radio"  type="radio"  :value="item.id"   v-model="pickedId" />
            <text class="cell-text">  {{ item.credit }}次搜索     ¥{{ item.price }}</text>
            <p></p>
          </view>
        </view>
    </view>

    <view class="pay"  v-on:click="handlePay1">
         <text class="svg-demo-text">微信支付</text>
    </view>

  </view>
</template>

<script>
// import wepy from 'wepy';
import wxRequest from '@/utils/wxRequest'
import Session from '@/utils/session'
import Tip from '@/utils/tip'
import Store from '../utils/request.js'
import _ from 'lodash'
import { message } from 'ant-design-vue';

export default {
  components: {},

  data () {
    return {
      pickedId: 1,
      list: [],
      currentid: '1',
      position: 'left',
      disabled: false,
      imgs:{shortLine: 'https://assets.storiesmatter.cn/shortline.png'},
      imageSize: {},
      px2rpx: 2,
      windowWidth: 375,
      videoAd: null, // 在页面中定义激励视频广告
      inWechatBrowser: false,
    }
  },

  onLoad (options) {
    if (options.type != undefined) this.type = options.type
  },

  mounted () {
      //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
        var ua = window.navigator.userAgent.toLowerCase();
        //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          this.inWechatBrowser = true;
        } else{
          this.inWechatBrowser = false;
        }
          // this.inWechatBrowser = true;

    this.greet()
  },

  computed: {},

  methods: {
    greet: async function (event) {
      Tip.loading(null, this)

      const api = new Store({})
      const data = await api.pricing()

      if (data == undefined) {
        //  self.login()
      } else {
        this.list = data.results
        Session.set('pricing', data.results)
        // this.$apply();
      }
      Tip.loaded(this)
    },

    redirect_url (id) {
      wx.navigateTo({
        url: `/pages/categories/child?id=${id}&type=${this.type}`
      })
    },
    handleFruitChange ({ detail = {} }) {
      this.current = detail.value
    },
    handleRadio(index, itemId) {
      console.log('index', index, itemId)
      this.currentid = itemId
      this.pickedId = index + 1
    },
    radioChange ({ detail = {} }) {
      this.currentid = detail.value
    },
    async handlePay () {
      console.log('sssss')

      Tip.loading(null, this)

      const storeProd = new Store({})
      await storeProd.orders(1, 1)

      const data = await wxRequest.Post('topics/1/orders/', {
        pricing_id: this.currentid
      })
      if (data == undefined) {
        //  self.login()
      } else {
        console.log(data)
        if (data.status == 'ok') {
          // https://developers.weixin.qq.com/miniprogram/dev/api/open-api/payment/wx.requestPayment.html
          wx.requestPayment({
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: 'MD5',
            paySign: data.paySign,
            success: function (res) {
              console.log('PAID!!')
              wx.navigateBack({ delta: 1 })
            },
            fail: function (res) {
              console.log('支付失敗')
            },
            complete: function (res) {
              // 接口调用结束的回调函数（调用成功、失败都会执行）
              console.log('支付完成')
            }
          })
        }
      }
      Tip.loaded()
    },

    async handlePay1 () {
      console.log('handlePay1')
       if (!this.inWechatBrowser) { 
          message.warning('请在微信里打开充值页面，或联系客服哦！')
          return;
        }
      const that = this
      if (typeof WeixinJSBridge === 'undefined') {
        console.log('WeixinJSBridge undefined')
        if (document.addEventListener) {
          console.log('2')
          document.addEventListener(
            'WeixinJSBridgeReady',
            that.onBridgeReady,
            false
          )
        } else if (document.attachEvent) {
          console.log('3')
          document.attachEvent('WeixinJSBridgeReady', that.onBridgeReady)
          document.attachEvent('onWeixinJSBridgeReady', that.onBridgeReady)
        }
      } else {
        console.log('WeixinJSBridge is defined')
        this.onBridgeReady()
      }

      this.onBridgeReady()
    },

    onBridgeReady () {
      const that = this

      /* testing
      const data = { status: 'ok', timeStamp: '1646561422', nonceStr: 'LAHJZegDLsrSeSCj', package: 'prepay_id=wx061810222880504829a99d9fb1c05d0000', paySign: '32B67F63F8EE7BB889DB3DBECEC22760' }
      const {
        appId = 'wx1f692d7b9b57066d',
        timeStamp,
        nonceStr,
        paySign
      } = data

      const packageStr = data.package

      const signType = 'MD5'
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
          appId, // 微信的appid
          timeStamp, // 时间戳
          nonceStr, // 随机串
          package: packageStr, // 订单号
          signType, // 微信签名方式：
          paySign // 微信签名
        },
        function (res) {
          console.log('res', res)
          if (res.err_msg == 'get_brand_wcpay_request:ok') {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            console.log('支付成功')
          } else {
            console.log('支付失败，请重新支付')
          }
        }
      )
      */
      const storeProd = new Store({})
      storeProd.orders(this.currentid).then(data => {
        if (!_.isEmpty(data)) {
          if (data.status === 'ok') {
            const {
              appId = 'wx1f692d7b9b57066d',
              timeStamp,
              nonceStr,
              paySign
            } = data
            const signType = 'MD5'
            const packageStr = data.package

            console.log('nonceStr', nonceStr)

            WeixinJSBridge.invoke(
              'getBrandWCPayRequest',
              {
                appId, // 微信的appid
                timeStamp, // 时间戳
                nonceStr, // 随机串
                package: packageStr, // 订单号
                signType, // 微信签名方式：
                paySign // 微信签名
              },
              function (res) {
                console.log('res', res)
                if (res.err_msg == 'get_brand_wcpay_request:ok') {
                  // 使用以上方式判断前端返回,微信团队郑重提示：
                  // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                  console.log('支付成功')
                } else {
                  console.log('支付失败，请重新支付')
                }
              }
            )
          }
        }
      })
    },
    imageLoad (e) {
      // console.log('imageLoad-------', e)
      // 单位rpx
      const originWidth = e.detail.width * this.px2rpx
      const originHeight = e.detail.height * this.px2rpx
      const ratio = originWidth / originHeight
      let viewWidth = 750
      let viewHeight // 设定一个初始宽度
      // 当它的宽度大于初始宽度时，实际效果跟mode=widthFix一致
      if (originWidth >= viewWidth) {
        // 宽度等于viewWidth,只需要求出高度就能实现自适应
        viewHeight = viewWidth / ratio
      } else {
        // 如果宽度小于初始值，这时就不要缩放了
        viewWidth = originWidth
        viewHeight = originHeight
      }
      const imageSize = this.imageSize
      imageSize[e.target.dataset.index] = {
        width: viewWidth,
        height: viewHeight
      }
      this.imageSize = imageSize
      // console.log('this.imageSize-------', this.imageSize)
    },
    gotoMap () {
      const mapurl = this.pictures[0] + '?' + Math.random() / 9999
      wx.previewImage({
        current: mapurl, // 当前图片地址
        urls: [mapurl], // 所有要预览的图片的地址集合 数组形式
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {}
      })
    },
    loadAds () {
      // 用户触发广告后，显示激励视频广告
      if (this.videoAd) {
        this.videoAd.show().catch(() => {
          // 失败重试
          this.videoAd
            .load()
            .then(() => {
              this.videoAd.show()
            })
            .catch(err => {
              console.log('激励视频 广告显示失败')
            })
        })
      } else {
        wx.showModal({
          title: '警告',
          content: '可观看激励式视频广告的次数已经达到上限， 请稍后重试',
          showCancel: false,
          success: function (res) {}
        })
      }
    }
  },

  async requestPricing () {
    Tip.loading('加载中...')
    const data = await wxRequest.Get('topics/1/pricing/')
    if (data == undefined) {
      //  self.login()
    } else {
      this.list = data.results
      Session.set('pricing', data.results)
    }
    Tip.loaded()
    // this.updateUI()
  },

  async requestCredit () {
    const data1 = await wxRequest.Get('topics/1/ads-credit/')
    if (data1 != undefined) {
      wx.showModal({
        title: '',
        content: data1.added_credit + '次搜索次数已到账',
        showCancel: false,
        success: function (res) {}
      })
    }
  }
}
</script>
<!-- <style lang="scss" src="@/public/styles/components/pay.scss"></style> -->

<style lang="scss">
@import "@/public/styles/components/pay.scss";
</style>
