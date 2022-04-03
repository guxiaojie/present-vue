<template>
  <view class="container">
    <div class="spin">
      <a-spin :spinning="spinning"></a-spin>
    </div>
    <view style="height:40px;"></view>

    <view class="choose_character">
      <view class="column">
        <text class="title2">登录</text>
      </view>
      <view class="img-top-shortline">
        <img :src="imgs.shortLine" mode="widthFix" />
      </view>
    </view>

    <view class="login">
      <view class="recordcell">
        <view>
          <!-- <text class="btn1">各位探员
              请验证手机号码
              进入事务所探员系统
          </text>-->
        </view>
      </view>

      <view class="login-bar">
        <view class="login-search">
          <form class="search-block" action="javascript:void 0">
            <input
              class="search-input"
              type="text"
              placeholder="输入你的手机号"
              :value="inputValue"
              @input="evt=>inputValue=evt.target.value"
            />
          </form>
        </view>

        <view class="login-row">
          <view class="login-search login-search1">
            <form class="search-block" action="javascript:void 0">
              <input
                class="search-input"
                type="text"
                placeholder="输入手机验证码"
                :value="inputCode"
                @input="evt=>inputCode=evt.target.value"
              />
            </form>
          </view>

          <view  
           v-bind:class="(spinning) ? 'get-code-text sending' : 'get-code-text' " 
           @click="getCode">
            <text>获取验证码</text>
          </view>
        </view>
      </view>
    </view>

    <view class="login-sure" @click="phonenoLogin">
      <text class="login-sure-btn">确定</text>
    </view>
    <div class="login-version" >
       <text> {{version}} </text>
     </div>
  </view>
</template>

<script setup>
import Store from "../utils/request.js";
import Session from "../utils/session.js";
import { message } from "ant-design-vue";
import _ from "lodash";
</script>

<script>
export default {
  data() {
    return {
      inputValue: "",
      inputCode: "",
      phoneNumber: "",
      imgs: {
        shortLine: "https://assets.storiesmatter.cn/shortline.png"
      },
      spinning: false,
      version: "v1.0.0",
    };
  },

  async mounted() {
    this.version = Session.getVersion()
  },
  methods: {
    compositionUpdate: function(event) {
      this.phoneNumber = event.data;
    },
    getCode: async function() {
      if (this.inputValue.length == 0) {
        message.warning("请输入手机号");
        return;
      }
      if (this.spinning) {
        message.warning("正在收取验证码，请稍等");
        return;
      }
      this.spinning = true;
      const api = new Store({});
      const data = await api.getCode(this.inputValue);
      this.spinning = false;
      if (data instanceof Error) { 
        message.error(data.message)
      }
      else if (!_.isEmpty(data)) {
        if (_.get(data, "status") == "ok") {
          message.success("发送成功");
        }
      } 
    },
    phonenoLogin: async function() {
      if (this.inputCode.length == 0) {
        message.warning("请输入验证码");
        return;
      }

      this.spinning = true;
      const api = new Store({});
      const data = await api.phonenoLogin(this.inputValue, this.inputCode);
      this.spinning = false;
      if (!_.isEmpty(data)) {
        if (_.get(data, "status") == "ok") {
          message.success("登录成功");

          this.gotoHomePage();
        } else {
          message.error(data.message);
        }
      }
    },
    gotoHomePage: function() {
      // const cats = JSON.parse(localStorage.getItem("storyCharacters"));
      // if (_.isEmpty(cats) || cats[localStorage.storyId] == 0) {
      //   this.$router.push("/character");
      // } else {
        this.$router.push("/home");
      // }
    }
  }
};
</script>

<style lang="scss">
@import "@/public/styles/login.scss";
</style>
