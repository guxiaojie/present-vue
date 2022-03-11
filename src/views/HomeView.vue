<script setup>
import {
  RouterLink,
  RouterView
} from 'vue-router'
import Store from '../utils/request.js'
import {
  setRem
} from '../utils/rem.js'
import _ from 'lodash'
import Tip from '@/utils/tip'

</script>

<script>
export default {
  data() {
        return {
            message: '客服微信请添加15711067100',
            book: '故意事务所探员系统',
            payTitle: '购买次数',
            emptyTitle: '',
            role_stats: [ ],
            my_role: {
                id: '4',
                name: '',
                crew: '',
                icon_path: '',
                avatar: ''
            },
            buttons: [{
                    title: '规则玩法',
                    src: 'http://mp.weixin.qq.com/s?__biz=MzIwNTg1NzU0NA==&mid=100005155&idx=1&sn=29b13f3fdfcaed03d202a1f897ef7639&chksm=172b2344205caa523efa40e1da70ac1643a605de2c5a1b6cdefebf5d9a511f9cb97849b2a97c#rd'
                },
                {
                    title: '线索脉络',
                    src: 'http://mp.weixin.qq.com/s?__biz=MzIwNTg1NzU0NA==&mid=100005204&idx=1&sn=734fd67be72420de1a1aa575f3a780ab&chksm=172b2333205caa25d894c68bd564507325ac57d99f14c47eae01bb7084cb6cc13a28007428bd#rd'
                },
                {
                    title: '提交报告',
                    src: 'http://mp.weixin.qq.com/s?__biz=MzIwNTg1NzU0NA==&mid=100005201&idx=1&sn=83556cc41002cfd3ecbcfee2681b63ec&chksm=172b2336205caa20f3abeaa662fb6367cc0ba2a3e45b361b4db042e2cd3b703311f10fc8ea3f#rd'
                },
                {
                    title: '委托信息',
                    src: 'https://mp.weixin.qq.com/s?__biz=MzIwNTg1NzU0NA==&mid=100005152&idx=1&sn=95fb303f7cd5ba55819bb935785b8aea&chksm=172b2347205caa5175ddd120c217028a9c680da0067316d4cf3dbd559b26101f9979432b1f88#rd'
                }
            ],
            remain_credit: 0,
            userInfo: true,
            dataLoaded: false,
            currentTotal: '',
            submiting: false,
            inputValue: '',
            showAuthorise: false,
            isAuthorised: false,
            characterId: 0,
            focusSearchInput: false,
            justFound: -1,
            searchScrollTop: 286,
            searching: false,
            visible1: false,
            isUnlocakModalVisible: false,
            isIntroVisible: false,
            unlockCredit: 0,
            unlockFragmentId: 0,
            animate: [],
            windowHeight: 750,
            discoveredList: [],
            onboard: false,
            imageSize: {},
            px2rpx: 2,
            windowWidth: 375,
            count: 1, 
            imgs:{
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
                intromodal: 'https://assets.storiesmatter.cn/intromodal.png'
            }, 
        }
    },

    computed: {
        username() {
            // We will see what `params` is shortly
            return this.$route.params.username
        },
    },

  async mounted() {
 
        const r = new Store({}) 
        const data = await r.home()
        if (!_.isEmpty(data)) {
                  this.updateUI(data);

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
        }

     // await storeProd.login()
    },
  methods: {
      handlePieceTap: function(fragmentId) {
          console.log('---item', fragmentId)
          let currentPieceIndex = this.discoveredList.indexOf(fragmentId);
          if (currentPieceIndex != undefined) {
              console.log('--- this.discoveredList', this.discoveredList)
              this.$router.push({
                  path: '/piece',
                  query: {
                      id: fragmentId,
                      index: currentPieceIndex,
                      discoveredList: this.discoveredList
                  }
              })
          }
      },
      handleUnlockedPieceTap: function(fragmentId, credit) {
          console.log('---fragmentId', fragmentId, credit)
          //   let credit = e.currentTarget.dataset.credit;
          //   this.unlockFragmentId = e.currentTarget.dataset.cid;
          this.isUnlocakModalVisible = true;
          this.unlockCredit = credit;

          this.$toast.open({
                  message: `该记忆碎片尚未解锁，要消耗${this.unlockCredit}次搜索机会解锁吗？`,
                  type: 'warning',
                  duration: 0,
                  dismissible: true,
                  queue: false,
                  onClick: this.onClick,
                 onDismiss: this.onDismiss
              })
          

      },
      onClick: function() {
        this.requestUnlockedPiece();
      },
      onDismiss: function() {
        this.$toast.clear();
      },
        async requestUnlockedPiece() {
          
        },
      async requestSearch() {
          console.log('---requestSearch')

          if (this.remain_credit <= 0) {
              this.creditZero();
              return;
          }
          if (this.inputValue.length == 0) {
              this.$toast.open({
                  message: '请输入关键词',
                  type: 'info',
                  duration: 1000,
                  dismissible: true,
                  queue: false
              })
              // wx.showToast({
              //   title: '请输入关键词',
              //   icon: 'none',
              //   duration: 2000
              // });
              // this.showKeyboard();
              return;
          }
          if (this.inputValue.length > 7) {
              this.$toast.open({
                  message: '关键词最长不超过7个字',
                  duration: 2000
              });
              // this.showKeyboard();
              return;
          }
          var reg = new RegExp('[\u4E00-\u9FA5A-Za-z0-9]+$', 'g');
          if (!reg.test(this.inputValue)) {
              this.$toast.open({
                  message: '关键词都不含标点哦',
                  duration: 2000
              });
              // this.showKeyboard();
              return;
          }

          if (this.searching == true) {
              return;
          }
          this.searching = true;
          Tip.loading('正在搜索...');
          const parameter = {
              q: this.inputValue
          };
          //e130 statuscode=200
          //e100 statuscode=401
          var me = this;
          const data = await wxRequest.GetBasic(
              'topics/1/fragments/',
              parameter,
              {},
              function e(data) {
                  Tip.loaded();
                  let msg = null;
                  if (data.code == 'e120') {
                      me.creditZero();
                      me.focusSearchInput = false;
                      me.$apply();
                  } else if ((data.code = 'e110')) {
                      msg = '订单不存在';
                  } else if ((data.code = 'e100')) {
                      msg = '游戏主题不存在';
                  }
                  if (msg) {
                      wx.showToast({ title: msg, icon: 'none', duration: 3000 });
                  }
              }
          );

          this.searching = false;
          Tip.loaded();
          if (data != undefined) {
              if (data.code != undefined) {
                  //没有搜到 弹出键盘
                  this.focusSearchInput = true;
                  // //this.$apply();
                  this.focusSearchInput = false;

                  let msg;
                  if (data.code == 'e130') {
                      msg = '沒找到相关碎片，请重新搜索';
                      let searchedCount = Session.get('searchedCount');
                      if (searchedCount == undefined) {
                          searchedCount = 0;
                      }
                      searchedCount++;
                      Session.set('searchedCount', searchedCount);

                      if (searchedCount >= 5) {
                          msg = '卡住了？联系客服要个提示吧！';
                          Session.set('searchedCount', 0);
                      }
                  }
                  if (msg) {
                      wx.showToast({ title: msg, icon: 'none', duration: 3000 });
                  }
                  //搜索失败了，credit为0，数字不变
                  if (this.remain_credit == 0) {
                  } else {
                      this.remain_credit = this.remain_credit - 1;
                      //this.$apply();
                  }
              } else {
                  Session.set('searchedCount', 0);

                  this.justFound = data.id;
                  //重新request home data - to update credit
                  this.getChanllengeList();
              }
          }

          this.inputValue = '';
          //this.$apply();
      },
      updateUI: function(res) {
          this.my_role.name = res.my_role.name;
          this.my_role.avatar = res.my_role.avatar;
          let other_roles = res.other_roles;
          let crew = '';
          for (var i = other_roles.length - 1; i >= 0; i--) {
              crew = crew + other_roles[i]['name'] + (i == 0 ? '' : '，');
          }
          this.my_role.crew = crew;
          this.role_stats = res.role_stats;
          this.remain_credit = res.remain_credit;

          this.dataLoaded = true;

          this.isAuthorised = true;

          //this.$apply();

          //搜索成功，重新获取首页
          if (this.justFound > 0) {
              wx.showToast({ title: '成功找到碎片', icon: 'success', duration: 3000 });
              var id = '#item' + this.justFound;
              var query = wx.createSelectorQuery(); //创建节点查询器 query
              query.select(id).boundingClientRect(); //这段代码的意思是选择Id=the-id的节点，获取节点位置信息的查询请求
              query.selectViewport().scrollOffset(); //这段代码的意思是获取页面滑动位置的查询请求
              query.exec(function (res) {
                  // res[0].top // #the-id节点的上边界坐标
                  // res[1].scrollTop // 显示区域的竖直滚动位置
                  var me = this;
                  let a = res[0].top + res[1].scrollTop - 200; // - me.windowHeight/4
                  wx.pageScrollTo({
                      scrollTop: a,
                      duration: 50
                  });
              });

              var animation = wx.createAnimation({
                  duration: 200,
                  timingFunction: 'ease',
                  delay: 300
              });
              animation
                  .opacity(0.8)
                  .scale(1.15)
                  .step()
                  .opacity(1)
                  .scale(1)
                  .step();
              this.animate[this.justFound] = animation.export();
              //this.$apply();

              this.animate[this.justFound] = '';
              //this.$apply();

              this.justFound = -1;
          }
      },

      handleHelp: function (index) {
      },

      handleTopup: function (index) {
      },

      copy: function (index) {
          this.$copyText('15711067100').then(function (e) {
              alert('Copied')
              console.log(e)
          }, function (e) {
              alert('Can not copy')
              console.log(e)
          })
      },
  }


}
</script>

<template>
  <view class="container">
    <view v-if=" !isAuthorised ">
       <empty :title.sync="emptyTitle"></empty>
    </view>

    <view class="systemprompt"  @click='copy'> 
        <text decode="{{message}}" >{{ message }}</text>
        <span>&nbsp;&nbsp;&nbsp; </span> 
        <text class="copy" >一键复制账号</text>
    </view>
<!-- 
    <i-modal title="玩前必读" visible="{{ visible1 }}" bind:ok="handleClose1"  show-cancel="{{ false }}" >
     <view style="margin-left: 40rpx; margin-right: 40rpx; text-align: left">
       <view>1. 请先阅读【组员情况】，【委托信息】，【医院地图】再开始搜索，避免浪费搜索次数哦~</view>
       <view>2. 关键词说明，请点击【玩法与规则】。</view>
      </view>
    </i-modal>

    <i-modal title="" visible="{{ isIntroVisible }}" bind:ok="handleIntroOk"  show-cancel="{{false}}">
     <view style=" ">
       <view class="wrap" style=" ">
       <img :src="imgs.intromodal"  style="width:{{imageSize[index].width}}rpx; height:{{imageSize[index].height}}rpx;  " 
      data-index="{{index}}"  mode="scaleToFill"  bindload="imageLoad"> 
     </view> 
      </view>
    </i-modal> 

    <i-modal title="" visible="{{ isUnlocakModalVisible }}" bind:ok="handleUnlockOk" bind:cancel="handleUnlockCancel" show-cancel="{{ true }}" okText="立即解锁" cancelText="继续调查">
     <view style="margin-left: 40rpx; margin-right: 40rpx; text-align: left">
       <view>该记忆碎片尚未解锁，要消耗{{unlockCredit}}次搜索机会解锁吗？</view>
      </view>
    </i-modal>-->

    <view class="header">
      <view class="level-1">
           <text>{{ book }} </text>
      </view>
      
       <view class="top-btns" v-if=" dataLoaded ">
        <view class="column" > 
          <view class="btn crew"  @click="handleHelp(0)">
             <img :src="imgs.help">
             <text class="btn1" >{{ buttons[0].title }}</text>
          </view>
          <view class="btn hospital" @click="handleHelp(1)">
             <img :src="imgs.eye">
             <text class="btn1" >{{ buttons[1].title }}</text>
          </view>
          <view class="btn delegate" @click="handleHelp(2)">
             <img :src="imgs.tick">
             <text class="btn1" >{{ buttons[2].title }}</text>
          </view>
        </view>  
      </view>

      <view class="dotline" v-if=" dataLoaded ">
            <img :src="imgs.dot" > 
      </view>

      <view class="userinfo"  v-if=" dataLoaded ">
            <view class="icon">
              <img :src=" my_role.avatar ">
            </view>
            <view class="st-title">
                <view class="first-line">探员：{{ my_role.name }}</view>
                <view class="time">组员：{{ my_role.crew }} </view>
            </view>
      </view>
        
      <view class="dotline" v-if=" dataLoaded ">
            <img :src="imgs.dot" > 
      </view>
    </view>

    <view class="searchcell" id="searchit" v-if=" dataLoaded ">
        <view class="recordcell" >
           <view class="title1">
            <text class="btn1">调查记录</text>
          </view>
        </view>

        <view class='searchbar'>
          <view class='search'>
            <!-- <input type='text' placeholder='输入你想要的内容' confirm-type='search' value="{{inputValue}}"
             bindfocus="focusSearch" bindinput='inputBind' bindconfirm='query'  ></input> -->
             <input class='search-input' type="text" placeholder='输入你想要的内容' v-model="inputValue"/>
          </view>  
          <view class='search-btn'>
            <img  :src='imgs.search' @click='requestSearch()'>
          </view>  
        </view>  

        <view class="paycell" > 
          <view class="paycell-title">
            <text class="btn1">搜索剩余次数：{{ remain_credit }}</text>
          </view>
          <view class="topup" @click="handleTopup">
            <img :src="imgs.pay"> 
            <text class="btn1">{{payTitle}}</text>
          </view>
        </view>  

      <view class="longline">
            <img :src="imgs.line" mode="widthFix"> 
      </view>
    </view> 


    <view  class="fragment-content" v-for="item in role_stats" id="fragmentContent"  wx:key="index" >
      <view class="fragment-title">
         <text> {{ item.role }}</text>
      </view>
      <view class="container-box">
        <view v-for="item in item.fragments"  v-bind:class = "(item.has_discovered)?'item-box discovered':'item-box'"
           id="item{{item.id}}" >
          <block v-if="item.has_discovered==true ">
            <text animation="{{animate[item.id]}}"  @click="handlePieceTap(item.id)"  data-cid="item.id">{{ item.display_label }}</text>  
           </block>
          <block v-else>
            <text @click="handleUnlockedPieceTap(item.id, item.credit_to_unlock)"  data-cid="{{item.id}}" data-credit="{{item.credit_to_unlock}}" >{{ item.display_label }}</text>
            </block>
        </view>
      </view> 
        <view class="longline">
            <img :src="imgs.line" mode="widthFix"> 
      </view>
    </view>
   <view style="height:60px"></view>
   

    
  </view>
   
</template>

<style lang="scss">
@import '@/public/styles/index.scss';
</style>
