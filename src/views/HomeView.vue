<script setup>
import {
  RouterLink,
  RouterView
} from 'vue-router'
import Store from '../utils/request.js'
import {
  setRem
} from '../utils/rem.js'
</script>

<script>
export default {
  data() {
        return {
            message: '客服微信请添加15711067100 &nbsp;&nbsp;&nbsp;&nbsp; ',
            book: '故意事务所 - 委托卷宗 7737368',
            payTitle: '',
            emptyTitle: '',
            role_stats: [],
            my_role: {
                id: '4',
                name: '',
                crew: '',
                icon_path: 'https://assets.storiesmatter.cn/profile1.png',
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

            pictures: ['https://assets.storiesmatter.cn/intromodal.png'],
            imageSize: {},
            px2rpx: 2,
            windowWidth: 375,
            count: 1
        }
    },

    computed: {
        username() {
            // We will see what `params` is shortly
            return this.$route.params.username
        },
    },

    async mounted() {
        // `this` refers to the component instance.
        console.log(this.count) // => 1

        // data can be mutated as well
        this.count = 2

        const storeProd = new Store({})
        await storeProd.roles(1)
        await storeProd.home(1)
    // await storeProd.login()
  }
}
</script>

<template>
<header>
    Count is: {{ count }}
    <i-notice-bar icon="systemprompt" bindtap='copy'>
        <text decode="{{message}}">{{ message }}</text>
        <text style="font-weight: bold;">一键复制账号</text>
    </i-notice-bar>
    <!-- <div class="wrapper">

      <nav>
        <RouterLink to="/member">Member</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->

</header>

<main>
    <view class="header">
        <view class="level-1" @tap="gotoBooks">
            <text>{{ book }} </text>
        </view>

        <view class="userinfobtns" wx:if="{{ dataLoaded }}">
            <view class="column">
                <view class="btn crew" @tap="handleHelp(0)">
                    <image src="https://assets.storiesmatter.cn/help.png?1"></image>
                    <text class="btn">{{ buttons[0].title }}</text>
                </view>
                <view class="btn hospital" @tap="handleHelp(1)">
                    <image src="https://assets.storiesmatter.cn/eye-top.png?2"></image>
                    <text class="btn">{{ buttons[1].title }}</text>
                </view>
                <view class="btn delegate" @tap="handleHelp(2)">
                    <image src="https://assets.storiesmatter.cn/tick.png?1"></image>
                    <text class="btn">{{ buttons[2].title }}</text>
                </view>
            </view>
        </view>

        <view class="dotline" wx:if="{{ dataLoaded }}">
            <image src="https://assets.storiesmatter.cn/dotline.png" mode="widthFix"></image>
        </view>
        <view class="userinfo" @tap="statement('id', '{{ statement.id }}')" wx:if="{{ dataLoaded }}">
            <view class="icon">
                <image src="{{ my_role.avatar  }}"></image>
            </view>
            <view class="st-title">
                <view class="title">探员：{{ my_role.name }}</view>
                <view class="time">组员：{{ my_role.crew }} </view>
            </view>
        </view>
        <view class="userinfobtns" wx:if="{{ dataLoaded }}">
            <view class="column">
                <view class="btn crew" @tap="myCrew">
                    <image src="https://assets.storiesmatter.cn/icon-crew.png"></image>
                    <text class="btn">组员情况</text>
                </view>
                <view class="btn hospital" @tap="gotoMap">
                    <image src="https://assets.storiesmatter.cn/icon-hospital.png"></image>
                    <text class="btn">医院地图</text>
                </view>
                <view class="btn delegate" @tap="handleHelp(3)">
                    <image src="https://assets.storiesmatter.cn/icon-delegate.png"></image>
                    <text class="btn">{{ buttons[3].title }}</text>
                </view>
            </view>
        </view>
        <view class="dotline" wx:if="{{ dataLoaded }}">
            <image src="https://assets.storiesmatter.cn/dotline.png" mode="widthFix"></image>
        </view>
    </view>

    <view class="searchcell" id="searchit" wx:if="{{ dataLoaded }}">
        <view class="recordcell">

            <view class="title">
                <text class="btn">调查记录</text>
            </view>
            <!-- <view class="subtitle" >
            <text class="btn">查看玩法与规则 ></text>
          </view> -->
            <!-- <image src="https://assets.storiesmatter.cn/help.png"></image>  -->
        </view>

        <view class='searchbar'>
            <view class='search'>
                <!-- <input type='text' placeholder='输入你想要的内容' confirm-type='search' value="{{inputValue}}" bindfocus="focusSearch" bindinput='inputBind' bindconfirm='query'   ></input> -->
            </view>
            <view class='search-btn'>
                <image src='https://assets.storiesmatter.cn/search-button.png' bindtap='query'></image>
            </view>
        </view>

        <view class="paycell">
            <view class="title">
                <text class="btn">搜索剩余次数：{{ remain_credit }}</text>
            </view>
            <view class="topup" @tap="handleTopup">
                <image src="https://assets.storiesmatter.cn/icon-pay.png"></image>
                <text class="btn">{{payTitle}}</text>
            </view>
        </view>

        <view class="longline">
            <image src="https://assets.storiesmatter.cn/longline.png" mode="widthFix"></image>
        </view>
    </view>

</main>

<!-- <RouterView /> -->
</template>

<style lang="scss">
@import '@/assets/index.scss';
</style>
