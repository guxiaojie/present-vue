
<template>
  <view class="container">
    <view class="systemprompt" @click="copy">
      <text>
        <span>&nbsp;&nbsp;&nbsp;</span>{{title}}
      </text>
      <text class="copy">
        一键复制账号
        <span>&nbsp;&nbsp;&nbsp;</span>
      </text>
    </view>
  </view>
</template>

<script setup>
import { message } from "ant-design-vue";
</script>

<script>
export default {
  data() {
    return {
      title: "客服微信请添加15711067100"
    }
  },
  props: {
    homePage: Object
  },
  async mounted() {
    if (this.homePage) {
      this.title = "客服微信请添加15711067100"
    } else {
      this.title = "获取免费次数请添加客服微信15711067100"
    }
  },
  methods: {
    copy: function(index) {
      this.$copyText("15711067100").then(
        function(e) {
          message.success("已复制客服微信: 15711067100");
        },
        function(e) {
          message.error(e.message);
        }
      );
    }
  }
}
</script>
