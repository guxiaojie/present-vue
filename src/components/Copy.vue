
<template>
  <view class="container">
    <view class="systemprompt" @click="copy">
      <text>
        <span>&nbsp;&nbsp;&nbsp;</span> 客服微信请添加15711067100
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
