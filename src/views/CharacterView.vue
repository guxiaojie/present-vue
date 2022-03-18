<script setup>
import Character from '@/components/Character.vue'
</script>

<template>

     <view class="container">

    <view style="height:20px;"> </view>

    <view class="choose_character">
      <view class="column">
        <text class="title">选择你的身份</text>
      </view>
      <view class="img-top-shortline">
        <img :src="imgs.shortline"  mode="widthFix">
      </view>
    </view>

    <view class="character-statement-list">
         <view v-for="(item, index) in list" v-bind:key="index" index="index" item="item">

           <view class="character-cell"  v-on:click="handleRadio(index, item.id)">
           <input class="character-cell-radio"  type="radio"  :value="item.id"   v-model="pickedId" />

            <!-- <radio value="{{index}}" checked="{{index == checked}}" class="statement-list-radio"></radio>  -->
            <Character class="cell-text"
            :statement.sync="item"
              @submit.user="submit"
            />
          </view>
        </view>

    </view>
   </view>

    <view style="height:30px">  </view>

    <view class="character-bottom">
          <view class="character-btn"  @click="handleInquiry">
            <text style="font-size:20px; color:white;" >开始调查</text>
          </view>
    </view>

    <view>
        <text style="float:right; margin-right:10px; font-size:12px; color:#757575; ">*探员身份一旦确定，不可更改</text>
    </view>

    <view style="height:50px">  </view>
 
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
      pickedId: 1,
      imgs: {shortline: 'https://assets.storiesmatter.cn/shortline.png'},
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
    handleInquiry: async function () {
      const storeProd = new Store({})
      const res = await storeProd.roles()

        this.$router.push('/home')

    },
    handleRadio(index, itemId) {
      console.log('index', index, itemId)
      
      this.pickedId = index + 1
    },
  }
}
</script>

<style lang="scss" src="@/public/styles/character.scss"></style>
 