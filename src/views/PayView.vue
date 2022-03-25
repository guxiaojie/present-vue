<template>
  <view class="container">
    <div class="spin">
      <a-spin :spinning="spinning"></a-spin>
    </div>

    <view style="height:40px;"></view>

    <view class="choose_character">
      <view class="column">
        <text class="title2">购买搜索次数</text>
      </view>
      <view class="img-top-shortline">
        <img :src="imgs.shortLine" mode="widthFix" />
      </view>
    </view>

    <view class="statement-list">
      <view v-for="(item, index) in list" v-bind:key="index" index="index" item="item">
        <view class="cell" v-on:click="handleRadio(index, item.id)">
          <input class="cell-radio" type="radio" :value="item.id" v-model="pickedId" />
          <text class="cell-text">{{ item.credit }}次搜索 ¥{{ item.price }}</text>
          <p></p>
        </view>
      </view>
    </view>
    <p></p>
    <view class="pay" v-on:click="handlePayGetCode">
      <text class="svg-demo-text">微信支付</text>
    </view>
    <div class="login-version" >
       <text> {{version}} </text>
     </div>
  </view>
</template>

<script>
import Session from "@/utils/session";
import Store from "../utils/request.js";
import _ from "lodash";
import { message } from "ant-design-vue";

export default {
  components: {},

  data() {
    return {
      pickedId: 1,
      list: [],
      position: "left",
      disabled: false,
      imgs: { shortLine: "https://assets.storiesmatter.cn/shortline.png" },
      imageSize: {},
      px2rpx: 2,
      windowWidth: 375,
      videoAd: null, // 在页面中定义激励视频广告
      inWechatBrowser: false,
      api: null,
      spinning: false,
      appId: 'wx4cbaf7126c634959',// 'wx4ca91a098674cef4', 
      uri:'',
      wcode: '',
      openid: 'openid',
      version: "v1.0.0",
    };
  },

  onLoad(options) {
    if (options.type != undefined) this.type = options.type;
  },

  async mounted() {
    this.version = Session.getVersion()

    //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    var ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      this.inWechatBrowser = true;
    } else {
      this.inWechatBrowser = false;
    }
    // this.inWechatBrowser = true;

    this.greet();

     if (_.isEmpty(localStorage.pricingId)) {
       localStorage.pricingId = 1
     }
      if (_.isEmpty(localStorage.pricingPickedId)) {
       localStorage.pricingPickedId = 1
     }
     this.pickedId = localStorage.pricingPickedId
     
     let currentUrl  = new URL(location.href).origin + '/topup'
     const code = new URL(location.href).searchParams.get("code");
     if (!_.isEmpty(code)) {
        this.wcode = code;
        this.handlePay()
     }  
     this.uri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=` + currentUrl + '&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect'
    
    this.onBridgeReady();
  },

  computed: {},

  methods: {
    greet: async function(event) {
      this.spinning = true;

      this.api = new Store({});
      const data = await this.api.pricing();
      this.spinning = false;

      if (data == undefined) {
      } else {
        this.list = data.results;
      }
    },
    handleRadio(index, itemId) {
      console.log("pricingId is", itemId);
      localStorage.pricingId = itemId;

      localStorage.pricingPickedId = index + 1;
      this.pickedId = index + 1;
    },
    async handlePayGetCode() {
        window.location.href = this.uri
    },
    async handlePay() {
      if (!this.inWechatBrowser) {
        message.warning("请在微信里打开充值页面，或联系客服哦！");
        // return;
      }
     this.spinning = true;
      const that = this;
      if (typeof WeixinJSBridge === "undefined") {
        console.log("WeixinJSBridge undefined");
        if (document.addEventListener) {
          console.log("2");
          document.addEventListener(
            "WeixinJSBridgeReady",
            that.onBridgeReady,
            false
          );
        } else if (document.attachEvent) {
          console.log("3");
          document.attachEvent("WeixinJSBridgeReady", that.onBridgeReady);
          document.attachEvent("onWeixinJSBridgeReady", that.onBridgeReady);
        }
      } else {
        console.log("WeixinJSBridge is defined");
        this.onBridgeReady();
      }
    },

    onBridgeReady() {
      const that = this;

      /* 
      testing
      const data = { status: 'ok', timeStamp: '1646561422', nonceStr: 'LAHJZegDLsrSeSCj', package: 'prepay_id=wx061810222880504829a99d9fb1c05d0000', paySign: '32B67F63F8EE7BB889DB3DBECEC22760' }
      const {
        appId = this.appId,
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
     this.wcode = '001a9e000IrCxN1bRj300wAPMD0a9e09'
     console.log('------onBridgeReady this.wcode', this.wcode)
     message.info('正在启动微信支付')
      this.api.orders(localStorage.pricingId, this.wcode).then(data => {

        this.spinning = false;
        if (data instanceof Error) {
           message.error(data.message)
                this.$router.push({ path: "/topup" });
        } else if (!_.isEmpty(data)) {
          if (data.status === "ok") {
            const {
              appId = this.appId,
              timeStamp,
              nonceStr,
              paySign
            } = data;
            const signType = "MD5";
            const packageStr = data.package;

            WeixinJSBridge.invoke(
              "getBrandWCPayRequest",
              {
                appId, // 微信的appid
                timeStamp, // 时间戳
                nonceStr, // 随机串
                package: packageStr, // 订单号
                signType, // 微信签名方式：
                paySign // 微信签名
              },
              function(res) {
                console.log("res", res);
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  // 使用以上方式判断前端返回,微信团队郑重提示：
                  // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                  message.success("支付成功");
                } else {
                  message.error("支付失败，请重新支付");
                }
                this.$router.push({ path: "/home" });
              }
            );
          } else {
           message.error("订单返回错误")
          }
        }
      });
    }
  }
};
</script>
<!-- <style lang="scss" src="@/public/styles/components/pay.scss"></style> -->

<style lang="scss">
@import "@/public/styles/components/pay.scss";
</style>
