<template>

  <view class="container">

     <div>
    <article><!-- Your contents --></article>
    <toast position="ne"></toast>
  </div>

    <!-- <web-view src="http://mp.weixin.qq.com/s?__biz=MzIwNTg1NzU0NA==&mid=100005047&idx=1&sn=cf1704d28aaf3a4e201781a10dedd5ff&chksm=172b22d0205cabc6d37e257413acae1afe2e7fbeed443ba591eb3423855a50e6d00b0d2bab17#rd"></web-view> -->
    
    <view class="choose_character">
      <view class="column">
        <text class="title">购买搜索次数</text>
      </view>
      
      <view class="img">
        <image src="https://assets.storiesmatter.cn/shortline.png" mode="widthFix"></image> 
      </view>
    </view> 

    <view class="statement-list">
      <div> 1Picked : {{ pickedId }}</div>
        <repeat v-for="item in list" v-bind:key="index" index="index" item="item">
          <view class="cell">
            <input class="statement-list-radio"  type="radio" id="{{item.credit}}" :value="item.id"   v-model="pickedId" />
            <text> {{index}} {{ item.credit }}次搜索     ¥{{ item.price }}</text>
            <p></p>
          </view>
        </repeat>   

     <!-- <RadioGroup bindchange="radioChange" >
        <repeat v-for="item in list" v-bind:key="index" index="index" item="item">
          <view class="cell"  @tap="handleRadio('id', '{{ index }}')">
            <radio value="{{index}}" checked="{{index == checked}}" class="statement-list-radio"></radio>             
            <text>  {{ item.credit }}次搜索            ¥{{ item.price }}</text>
          </view>
        </repeat>   
     </RadioGroup>  -->
    </view> 

    <view class="pay-container"  v-on:click="handlePay1">
    <!-- <view class="pay-container" @tap="handlePay"> -->
      <view class="pay">
            <!-- <text class="icon-open-new icon"></text> -->
            <text class="svg-demo-text">微信支付</text>   
      </view>
    </view>

  

  </view>
</template>

<script>
// import wepy from 'wepy';
import wxRequest from "@/utils/wxRequest";
import Session from "@/utils/session";
import Tip from "@/utils/tip";
import Store from "../utils/request.js";
import _ from "lodash";

export default {
  components: {},

  data() {
    return {
      pickedId: "",
      //   data = {
      list: [],
      currentid: "1",
      position: "left",
      checked: false,
      disabled: false,
      pictures: ["https://assets.storiesmatter.cn/rewarded-video-ad.png"],
      imageSize: {},
      px2rpx: 2,
      windowWidth: 375,
      videoAd: null, // 在页面中定义激励视频广告

      form: {
        message: "This is a sample message",
        type: "info",
        duration: 10000,
        dismissible: true,
        queue: false,
        position: "bottom-right"
        // onClick: this.onClick,
        // onDismiss: this.onDismiss,
      }
    };
  },

  onLoad(options) {
    if (options.type != undefined) this.type = options.type;
  },

  mounted() {
    // this.list = Session.get('pricing')
    // this.$apply()

    this.greet();
  },

  computed: {},

  methods: {
    greet: async function(event) {
      Tip.loading(null, this);

      const storeProd = new Store({});
      const data = await storeProd.pricing();

      if (data == undefined) {
        //  self.login()
      } else {
        this.list = data.results;
        Session.set("pricing", data.results);
        // this.$apply();
      }
      Tip.loaded(this);
    },

    redirect_url(id) {
      wx.navigateTo({
        url: `/pages/categories/child?id=${id}&type=${this.type}`
      });
    },
    handleFruitChange({ detail = {} }) {
      this.current = detail.value;
      this.$apply();
    },
    handleRadio(key, id) {
      this.checked = id;
      var item = this.list[id];
      this.currentid = item.id;
      this.$apply();
    },
    radioChange({ detail = {} }) {
      this.currentid = detail.value;
      this.$apply();
    },
    async handlePay() {
      console.log("sssss");

      // this.$toast.open(this.form);
      Tip.loading(null, this);

      const storeProd = new Store({});
      await storeProd.orders(1, 1);

      const data = await wxRequest.Post("topics/1/orders/", {
        pricing_id: this.currentid
      });
      if (data == undefined) {
        //  self.login()
      } else {
        console.log(data);
        if (data["status"] == "ok") {
          // https://developers.weixin.qq.com/miniprogram/dev/api/open-api/payment/wx.requestPayment.html
          wx.requestPayment({
            timeStamp: data["timeStamp"],
            nonceStr: data["nonceStr"],
            package: data["package"],
            signType: "MD5",
            paySign: data["paySign"],
            success: function(res) {
              console.log("PAID!!");
              wx.navigateBack({ delta: 1 });
            },
            fail: function(res) {
              console.log("支付失敗");
            },
            complete: function(res) {
              // 接口调用结束的回调函数（调用成功、失败都会执行）
              console.log("支付完成");
            }
          });
        }
      }
      Tip.loaded();
    },

    async handlePay1() {
      console.log("handlePay1");
      let that = this;
      if (typeof WeixinJSBridge == "undefined") {
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

      this.onBridgeReady();
    },

    onBridgeReady() {
      let that = this;

      console.log("4");

      const data = {status: 'ok', timeStamp: '1646561422', nonceStr: 'LAHJZegDLsrSeSCj', package: 'prepay_id=wx061810222880504829a99d9fb1c05d0000', paySign: '32B67F63F8EE7BB889DB3DBECEC22760'}
      let {
              appId = "wx1f692d7b9b57066d",
              timeStamp,
              nonceStr,
              paySign
            } = data;
            
      let packageStr = data["package"]

      const signType = "MD5";
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId, // 微信的appid
          timeStamp, //时间戳
          nonceStr, //随机串
          package: packageStr, // 订单号
          signType, //微信签名方式：
          paySign //微信签名
        },
        function(res) {
          console.log("res", res);
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            console.log("支付成功");
          } else {
            console.log("支付失败，请重新支付");
          }
        }
      );

      const storeProd = new Store({});
      storeProd.orders(1).then(data => {
        if (!_.isEmpty(data)) {
          if (data["status"] === "ok") {
            let {
              appId = "wx1f692d7b9b57066d",
              timeStamp,
              nonceStr,
              packageStr,
              paySign
            } = data;
            const signType = "MD5";

            console.log("nonceStr", nonceStr);

            WeixinJSBridge.invoke(
              "getBrandWCPayRequest",
              {
                appId, // 微信的appid
                timeStamp, //时间戳
                nonceStr, //随机串
                package: packageStr, // 订单号
                signType, //微信签名方式：
                paySign //微信签名
              },
              function(res) {
                console.log("res", res);
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  // 使用以上方式判断前端返回,微信团队郑重提示：
                  //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                  console.log("支付成功");
                } else {
                  console.log("支付失败，请重新支付");
                }
              }
            );
          }
        }
      });
    },
    imageLoad(e) {
      //console.log('imageLoad-------', e)
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
      var imageSize = this.imageSize;
      imageSize[e.target.dataset.index] = {
        width: viewWidth,
        height: viewHeight
      };
      this.imageSize = imageSize;
      // console.log('this.imageSize-------', this.imageSize)
      this.$apply();
    },
    gotoMap() {
      let mapurl = this.pictures[0] + "?" + Math.random() / 9999;
      wx.previewImage({
        current: mapurl, //当前图片地址
        urls: [mapurl], //所有要预览的图片的地址集合 数组形式
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {}
      });
    },
    loadAds() {
      // 用户触发广告后，显示激励视频广告
      if (this.videoAd) {
        this.videoAd.show().catch(() => {
          // 失败重试
          this.videoAd
            .load()
            .then(() => {
              this.videoAd.show();
            })
            .catch(err => {
              console.log("激励视频 广告显示失败");
            });
        });
      } else {
        wx.showModal({
          title: "警告",
          content: "可观看激励式视频广告的次数已经达到上限， 请稍后重试",
          showCancel: false,
          success: function(res) {}
        });
      }
    }
  },

  async requestPricing() {
    Tip.loading("加载中...");
    const data = await wxRequest.Get("topics/1/pricing/");
    if (data == undefined) {
      //  self.login()
    } else {
      this.list = data.results;
      Session.set("pricing", data.results);
      this.$apply();
    }
    Tip.loaded();
    //this.updateUI()
  },

  async requestCredit() {
    const data1 = await wxRequest.Get("topics/1/ads-credit/");
    if (data1 != undefined) {
      wx.showModal({
        title: "",
        content: data1.added_credit + "次搜索次数已到账",
        showCancel: false,
        success: function(res) {}
      });
    }
  }
};
</script>
<!-- <style lang="scss" src="@/public/styles/components/pay.scss"></style> -->

<style lang="scss">
@import "@/public/styles/components/pay.scss";
</style>
