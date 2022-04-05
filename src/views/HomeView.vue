
<template>
  <view class="container">
    <div class="spin">
      <a-spin :spinning="spinning"></a-spin>
    </div>

    <view v-if=" !isAuthorised ">
      <text :title.sync="emptyTitle"></text>
    </view>
    
    <Copy :homePage.sync="true" />

    <a-modal
      title
      :visible=" isUnlocakModalVisible "
      @ok="handleUnlockOk"
      @cancel="handleUnlockCancel"
      show-cancel="{{ true }}"
      okText="立即解锁"
      cancelText="继续调查"
    >
      <view style="margin-left: 40rpx; margin-right: 40rpx; text-align: left">
        <view>该记忆碎片尚未解锁，要消耗{{unlockCredit}}次搜索机会解锁吗？</view>
      </view>
    </a-modal>

    <a-modal
      title
      :visible=" gotoTopupVisible "
      @ok="handleGotoTopup"
      @cancel="handleCancelTopup"
      show-cancel="{{ true }}"
      okText="立即充值"
      cancelText="继续调查"
    >
      <view style="margin-left: 40rpx; margin-right: 40rpx; text-align: left">
        <view>搜索次数不足，无法解锁记忆碎片</view>
      </view>
    </a-modal>

    <a-modal
      title
      :visible=" gotoTopupVisible2 "
      @ok="handleGotoTopup"
      @cancel="handleCancelTopup"
      show-cancel="{{ true }}"
      okText="立即充值"
      cancelText="继续调查"
    >
      <view style="margin-left: 40rpx; margin-right: 40rpx; text-align: left">
        <view>搜索次数已经用完，请先充值！</view>
      </view>
    </a-modal>

    <view class="header">
      <view class="level-1">
        <text>{{ book }}</text>
      </view>

      <view class="top-btns" v-if=" dataLoaded ">
        <view class="column1">
          <view class="btns" @click="handleHelp(0)">
            <!-- <img :src="imgs.help"> -->
            <text class="btn1">{{ topic_links[0].title }}</text>
          </view>
          <view class="btns" @click="handleHelp(1)">
            <!-- <img :src="imgs.eye"> -->
            <text class="btn1">{{ topic_links[1].title }}</text>
          </view>
          <view class="btns" @click="handleHelp(2)">
            <!-- <img :src="imgs.tick"> -->
            <text class="btn1">{{ topic_links[2].title }}</text>
          </view>
        </view>
      </view>

      <view class="dotline" v-if=" dataLoaded ">
        <img :src="imgs.dot" />
      </view>

      <view class="userinfo" v-if=" dataLoaded ">
        <view class="icon">
          <img :src=" my_role.avatar " />
        </view>
        <view class="home-st-title">
          <view class="first-line">探员：{{ my_role.name }}</view>
          <view class="time">组员：{{ my_role.crew }}</view>
        </view>
      </view>

      <view class="dotline" v-if=" dataLoaded ">
        <img :src="imgs.dot" />
      </view>
    </view>

    <view class="searchcell" id="searchit" v-if=" dataLoaded ">
      <view class="recordcell">
        <view>
          <text class="btn1">调查记录</text>
        </view>
      </view>

      <view class="searchbar">
        <view class="search">
          <form class="search-block" action="javascript:void 0">
            <!-- <input type='text' placeholder='输入你想要的内容' confirm-type='search' value="{{inputValue}}"
            bindfocus="focusSearch" bindinput='inputBind' bindconfirm='query'  ></input>-->
            <input
              class="search-input"
              type="text"
              placeholder="输入你想要的内容"
              :value="inputValue"
              @input="evt=>inputValue=evt.target.value"
              @keyup.13="requestSearch"
            />
          </form>
        </view>

        <view class="search-btn" @click="requestSearch()">
          <text>搜索</text>
          <!-- <img :src="imgs.search"/> -->
        </view>
      </view>

      <view class="paycell">
        <view class="paycell-title">
          <text class="btn1">搜索剩余次数：{{ remain_credit }}</text>
        </view>
        <view class="topup" @click="handleTopup">
          <img :src="imgs.pay" />
          <text class="btn1">{{payTitle}}</text>
        </view>
      </view>

      <view class="search-longline">
        <img :src="imgs.line" mode="widthFix" />
      </view>
    </view>

    <view class="fragment-content" v-for="item in role_stats" id="fragmentContent" wx:key="index">
      <view class="fragment-title">
        <text>{{ item.role }}</text>
      </view>
      <view class="container-box">
        <view
          v-for="item in item.fragments"
          v-bind:class="(item.has_discovered)?'item-box discovered':'item-box'"
          v-bind:id="`cv${item.id}`"
        >
          <view v-if="item.has_discovered==true ">
            <text
              animation="{{animate[item.id]}}"
              @click="handlePieceTap(item.id)"
              data-cid="item.id"
            >{{ item.display_label }}</text>
          </view>
          <view v-else>
            <text
              @click="handleUnlockedPieceTap(item.id, item.credit_to_unlock)"
            >{{ item.display_label }}</text>
          </view>
        </view>
      </view>
      <view class="longline">
        <img :src="imgs.line" mode="widthFix" />
      </view>
    </view>
    <div class="home-version" >
       <p> {{ICP}} </p>
    </div>
    <view style="height:60px"></view>
  </view>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import Store from "../utils/request.js";
import _ from "lodash";
import { message } from "ant-design-vue";
import Session from "@/utils/session";
import { ICP } from "@/utils/session";
import KEY from "@/utils/session";
import Copy from "@/components/Copy.vue";
</script>

<script>
export default {
  data() {
    return {
      book: "故意事务所探员系统",
      payTitle: "购买次数",
      emptyTitle: "",
      role_stats: [],
      topic_links: '',
      my_role: {
        id: "4",
        name: "",
        crew: "",
        icon_path: "",
        avatar: ""
      },
      remain_credit: 0,
      userInfo: true,
      dataLoaded: false,
      currentTotal: "",
      submiting: false,
      inputValue: "",
      showAuthorise: false,
      isAuthorised: false,
      characterId: 0,
      justFound: -1,
      searchScrollTop: 286,
      searching: false,
      visible1: false,
      isUnlocakModalVisible: false,
      gotoTopupVisible: false,
      gotoTopupVisible2: false,
      unlockCredit: 0,
      unlockFragmentId: 0,
      animate: [],
      windowHeight: 750,
      discoveredList: [],
      onboard: false, //if onboard, user can use wechat
      inWechatBrowser: false,
      imageSize: {},
      px2rpx: 2,
      windowWidth: 375,
      count: 1,
      imgs: {
        help: "https://assets.storiesmatter.cn/help.png?1",
        eye: "https://assets.storiesmatter.cn/eye-top.png?2",
        tick: "https://assets.storiesmatter.cn/tick.png?1",
        crew: "https://assets.storiesmatter.cn/icon-crew.png",
        hospital: "https://assets.storiesmatter.cn/icon-hospital.png",
        delegate: "https://assets.storiesmatter.cn/icon-delegate.png",
        dot: "https://assets.storiesmatter.cn/dotline.png",
        search: "https://assets.storiesmatter.cn/search-button.png",
        pay: "https://assets.storiesmatter.cn/icon-pay.png",
        line: "https://assets.storiesmatter.cn/longline.png",
        intromodal: "https://assets.storiesmatter.cn/intromodal.png"
      },
      api: null,
      spinning: false
    };
  },

  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username;
    }
  },
  async mounted() {
    const temp = Session.get("home");
     if (!_.isEmpty(temp)) {
       this.updateUI(JSON.parse(temp));
     }

    this.spinning = true;
    this.api = new Store({});
    const data = await this.api.home();
    this.spinning = false;

    if (data instanceof Error) {
      
      if (_.get(data, 'message') && _.get(data, 'message') == "Network Error") {
        // no network, do nothing
        return
      }

      const code = _.get(data.response.data, "code");
      //'訂單不存在'
      if (code == "e110") {

        // jump to choose roles now
        this.$router.push("/character");

      } else if (code == "token_not_valid") {
        this.$router.push({ path: "/login" });
      } else  if (code == "e100") {
        //e100 statuscode=404  - 遊戲主題不存在
        message.error('游戏主题不存在')
      }

    } else if (!_.isEmpty(data)) {

      Session.set("home", JSON.stringify(data));
      this.updateUI(data);
    }

    //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    var ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      this.inWechatBrowser = true;
    } else {
      this.inWechatBrowser = false;
    }
    this.inWechatBrowser = true;

    const content = "width=device-width, initial-scale=1.0, user-scalable=no";
    document.querySelector('meta[name="viewport"]').content = content;
  },
  methods: {
    handlePieceTap: function(fragmentId) {
      let currentPieceIndex = this.discoveredList.indexOf(fragmentId);
      if (currentPieceIndex != undefined) {
        console.log("--- this.discoveredList", this.discoveredList);
        this.$router.push({
          path: "/piece",
          query: {
            id: fragmentId,
            index: currentPieceIndex,
            discoveredList: this.discoveredList
          }
        });
      }
    },
    handleUnlockedPieceTap: function(fragmentId, creditNeeded) {
      this.unlockFragmentId = fragmentId;
      this.isUnlocakModalVisible = true;
      this.unlockCredit = creditNeeded;
    },
    onClick: function() {
      this.requestUnlockedPiece();
    },
    onDismiss: function() {
      this.$toast.clear();
    },
    creditZero: function() {
      if (this.inWechatBrowser) {
        this.gotoTopupVisible2 = true;
      } else {
        message.warning("搜索次数已用完，请先联系客服哦！");
      }
    },
    async requestUnlockedPiece() {
      this.spinning = true;
      const data = await this.api.unlock(this.unlockFragmentId);
      this.spinning = false;
      if (data != undefined) {
        if (data.code == "e190" || data.code == "e120") {
          if (this.inWechatBrowser) {
            this.gotoTopupVisible = true;
          } else {
            message.error("请添加客服微信");
          }
        } else if (data.code == undefined) {
          this.justFound = data.id;
        
        //重新request home data - to update credit
          this.requestHomeAfter();
        }
      } else {
        message.error("解锁记忆碎片失败");
      }
    },
    handleGotoTopup: function() {
      this.gotoTopupVisible = false;
      this.$router.push({ path: "/topup" });
    },
    handleCancelTopup: function() {
      this.gotoTopupVisible = false;
      this.gotoTopupVisible2 = false;
    },
    async requestSearch() {
      if (this.remain_credit <= 0) {
        this.creditZero();
        return;
      }
      if (this.inputValue.length == 0) {
        message.warning("请输入关键词");
        return;
      }
      if (this.inputValue.length > 7) {
        message.warning("关键词最长不超过7个字");
        return;
      }
      var reg = new RegExp("[\u4E00-\u9FA5A-Za-z0-9]+$", "g");
      if (!reg.test(this.inputValue)) {
        message.warning("关键词都不含标点哦");

        // this.showKeyboard();
        return;
      }

      if (this.searching == true) {
        return;
      }
      this.searching = true;
      this.spinning = true;
      let data = await this.api.search(this.inputValue);
      //to test, set data = { code: "e130" }; 
      this.spinning = false;
      this.searching = false;

      //e130 statuscode=200
      //e100 statuscode=401  - 遊戲主題不存在
      if (!_.isEmpty(data)) {
        if (!_.isEmpty(data.code)) {
          let msg = null;
          if (data.code == "e120") {
            
            this.creditZero();
            
          } else if (data.code == "e110") {
            msg = "订单不存在";

            // jump to choose roles now
            this.$router.push("/character");
            
          } else if (data.code == "e100") {
            msg = "游戏主题不存在";
          } else if (data.code == "e130") {
            msg = "沒找到相关碎片，请重新搜索";
            let searchedCount = Session.get("searchedCount");
            if (searchedCount == undefined) {
              searchedCount = 0;
            }
            searchedCount++;
            Session.set("searchedCount", searchedCount);

            if (searchedCount >= 5) {
              msg = "卡住了？联系客服要个提示吧！";
              Session.set("searchedCount", 0);
            }
          }
          if (msg) {
            message.warning(msg);
          }
          //搜索失败了，credit为0，数字不变
          if (this.remain_credit == 0) {
          } else {
            this.remain_credit = this.remain_credit - 1;
            //this.$apply();
          }
        } else {
          Session.set("searchedCount", 0);

          this.justFound = data.id;
          //重新request home data - to update credit
          this.requestHomeAfter();
        }
      }

      this.inputValue = "";
      //this.$apply();
    },
    updateUI: function(res) {
      this.my_role.name = res.my_role.name;
      this.my_role.avatar = res.my_role.avatar;
      let other_roles = res.other_roles;
      let crew = "";
      for (var i = other_roles.length - 1; i >= 0; i--) {
        crew = crew + other_roles[i]["name"] + (i == 0 ? "" : "，");
      }
      this.my_role.crew = crew;
      this.role_stats = res.role_stats;
      this.remain_credit = res.remain_credit;
      this.topic_links = res.topic_links;
      
      if (res.topic_links instanceof Array && res.topic_links.length < 3) {
        this.topic_links.push({ title: "", link_url: "" });
        this.topic_links.push({ title: "", link_url: "" });
        this.topic_links.push({ title: "", link_url: "" });
      } 

      this.dataLoaded = true;
      this.isAuthorised = true;
      if (this.justFound > 0) {
        document.getElementById(`cv${this.justFound}`).scrollIntoView();
        message.warning("成功找到碎片");
        this.justFound = -1;
      }
      this.updateDiscoveredList(res)
    },
    updateDiscoveredList(data) {
       this.discoveredList = [];
        for (var i = 0; i < data.role_stats.length; i++) {
          let role = data.role_stats[i];
          for (var j = 0; j < role.fragments.length; j++) {
            let aFragment = role.fragments[j];
            if (aFragment.has_discovered == true) {
              this.discoveredList.push(aFragment.id);
            }
          }
        }
    },
    handleHelp: function(index) {
      window.location.href = this.topic_links[index].link_url;
    },
    handleTopup: function(index) {
      this.$router.push({ path: "/topup" });
    },
    handleOk: function() {
      this.visible1 = false;
    },
    handleCancel: function() {
      this.visible1 = true;
    },
    handleUnlockOk() {
      this.isUnlocakModalVisible = false;
      this.requestUnlockedPiece();
    },
    handleUnlockCancel() {
      this.isUnlocakModalVisible = false;
    },
    async requestHomeAfter() {
      const data = await this.api.home();
      //  e110 error is already covered when mounted
      if (!(data instanceof Error) && !_.isEmpty(data)) {
        this.updateUI(data);
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/public/styles/index.scss";
</style>
