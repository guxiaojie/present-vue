<template>
  <view class="container"> 
   
    <view style="height:40px;"> </view>

    <view class="choose_character">
      <view class="column">
        <text class="title2">登录</text>
      </view>

      <view class="img-top-shortline">
        <img :src="imgs.shortLine" mode="widthFix">
      </view>
    </view>

       <view class="searchcell" id="searchit">
        <view class="recordcell" >
           <view  >
            <!-- <text class="btn1">各位探员
              请验证手机号码
              进入事务所探员系统
              </text> -->
          </view>
        </view>

        <view class='searchbar'>

          <view class='search'>
             <form class="search-block" action="javascript:void 0">
             <input class='search-input' type="text" placeholder='输入你的手机号' v-model="inputValue"  @keyup.13="requestSearch"  />
	          </form> 
          </view>  

          <view class='row'>
            <view class='search search1'>
              <form class="search-block" action="javascript:void 0">
              <input class='search-input' type="text" placeholder='输入手机验证码' v-model="inputCode"  @keyup.13="requestSearch"  />
              </form> 
            </view>  
            
            <view class='get-code' @click='getCode'>
              <text >获取验证码</text>
            </view>  
          </view>  
        </view>      
    </view> 

      <view class="login-sure" @click='phonenoLogin' > 
          
          <!-- <view class="topup" @click="handleTopup"> -->
            <text class="login-sure-btn">确定</text>
          <!-- </view> -->
        </view>  
  </view>
</template>

<script setup>
import Store from '../utils/request.js'
import { message } from 'ant-design-vue';
import _ from 'lodash'
</script>

<script>

export default {
  data() {
    return {
      inputValue: '18810440803',
      inputCode: '',
      imgs: {
        shortLine: 'https://assets.storiesmatter.cn/shortline.png',
      },
    }
  },
  methods: {
    getCode: async function() {
       if (this.inputValue.length == 0) {
               message.warning('请输入手机号');
              return;
          }

      const api = new Store({})
      const data = await api.getCode(this.inputValue)
      if (!_.isEmpty(data)) {
        if (_.get(data, 'status') == 'ok') {
          message.success('发送成功');
        }
      } 
    },

    phonenoLogin: async function() {
      const api = new Store({})
      const data = await api.phonenoLogin(this.inputValue, this.inputCode)
      if (!_.isEmpty(data)) {
        if (_.get(data, 'status') == 'ok') {
          message.success('登录成功');
        } else {
          message.error(data.message);
        }
      } 
    }
  }
}
</script>

<style lang="scss">
@import '@/public/styles/login.scss';
</style>
