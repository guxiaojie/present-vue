<script setup>
import Character from "@/components/Character.vue";
</script>

<template>
  <view class="container">
    <div class="spin">
      <a-spin :spinning="spinning"></a-spin>
    </div>
    <view style="height:20px;"></view>

    <view class="choose_character">
      <view class="column">
        <text class="title2">选择你的身份</text>
      </view>
      <view class="img-top-shortline">
        <img :src="imgs.shortline" mode="widthFix" />
      </view>
    </view>

    <view class="character-statement-list">
      <view v-for="(item, index) in list" v-bind:key="index" index="index" item="item">
        <view class="character-cell" v-on:click="handleRadio(index, item.id)">
          <input class="character-cell-radio" type="radio" :value="item.id" v-model="pickedId" />

          <!-- <radio value="{{index}}" checked="{{index == checked}}" class="statement-list-radio"></radio>  -->
          <Character class="cell-text" :statement.sync="item" @submit.user="submit" />
        </view>
      </view>
    </view>
  </view>

  <view style="height:30px"></view>

  <view class="character-bottom">
    <view class="character-btn" @click="handleInquiry">
      <text style="font-size:20px; color:white;">开始调查</text>
    </view>
  </view>

  <view>
    <text style="float:right; margin-right:10px; font-size:12px; color:#757575; ">*探员身份一旦确定，不可更改</text>
  </view>

  <view style="height:50px"></view>
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
      spinning: false,
      pickedId: 1,
      roleId: 0,
      imgs: { shortline: "https://assets.storiesmatter.cn/shortline.png" },
      list: []
    };
  },

  async mounted() {
    const storeProd = new Store({});
    const res = await storeProd.roles();
    this.list = res.results;
  },

  methods: {
    submit: function(key, value) {
      console.log("---sumit in parent", key, value);
    },
    handleInquiry: async function() {
      this.spinning = true;

      if(this.roleId == 0) {
        message.info('请确定探员身份')
      }
      const storeProd = new Store({});
      const res = await storeProd.initGame(this.roleId);
      this.spinning = false;
      if (!_.isEmpty(res)) {
        if (res.code == "e160") {
          //遊戲已經創建
          message.success("发现卷宗，继续调查");
        }

        this.$router.push("/home");
      }
    },
    handleRadio(index, itemId) {
      this.roleId = itemId;
      this.pickedId = index + 1;
    }
  }
};
</script>

<style lang="scss" src="@/public/styles/character.scss"></style>
 