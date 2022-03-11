<script setup>
import Character from '@/components/Character.vue'
</script>

<template>
  <main>
     <view class="container">

    <view class="choose_character">
      <view class="column">
        <text class="title">选择你的身份</text>
      </view>
      <view class="img">
        <image src="https://assets.storiesmatter.cn/shortline.png" mode="widthFix"></image>
      </view>
    </view>
    <view class="statement-list">

        <!-- <repeat  wx:for="{{list}}" wx:key="index" index="index" item="item"> -->
               <view v-for="item in list"  index="index" item="item">

           <view class="cell">
            <!-- <radio value="{{index}}" checked="{{index == checked}}" class="statement-list-radio"></radio>  -->
            <Character
            :statement.sync="item"
              @submit.user="submit"
            />
          </view>
        </view>

    </view>
   </view>

    <view style="height:30px">  </view>
     <!-- <view >
         <button open-type="getUserInfo" bindgetuserinfo="getUserInfo" class="middle" >开始调查</button>
     </view> -->

    <view style="width:100%; height:120px;   display:flex; justify-content:center; align-items:center;">
          <view  style="width:320px; height:120px;   display:flex; justify-content:center; align-items:center;" class="btn"  @click="handleInquiry">
            <text  style="font-size:40px; color:white;  " >开始调查</text>
          </view>
    </view>

    <view class="choose_character">
      <view class="column">
        <text style="font-size:24px; color:#757575; margin-top:-30px;">*探员身份一旦确定，不可更改</text>
      </view>
    </view>

    <view style="height:50px">  </view>

  </main>
</template>
<script>
// import wepy from 'wepy';
import wxRequest from '@/utils/wxRequest'
import Session from '@/utils/session'
import Tip from '@/utils/tip'
import Store from '../utils/request.js'
import _ from 'lodash'

export default {
  components: {},

  data () {
    return {
      list: [{ id: 1, name: 'b', text: 't', brief_text: 'brief_text1' }, { id: 2, name: 'c', brief_text: 'brief_text2' }, { id: 3, name: 'd', brief_text: 'brief_text3' }]
    }
  },

  async mounted () {
    const storeProd = new Store({})
    const res = await storeProd.roles()
    console.log('--', res)
    console.log('--', res.results)
    this.list = res.results
  },

  methods: {
    submit: function (key, value) {
      console.log('---sumit in parent', key, value)
    },
    handleInquiry: function () {
        this.$router.push('/home')

    }
  }
}
</script>

<style lang="scss" src="@/public/styles/character.scss"></style>
<style lang="scss">
.btn {
  background-image: url('https://assets.storiesmatter.cn/pay-green-bg.png');
  background-size: contain;
  background-position-y: center;
  background-repeat: no-repeat;
  > text {
    display: flex;
    align-items: center;
  }
}
</style>