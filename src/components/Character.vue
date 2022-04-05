<template >
  <view class="charactercell" @click="statementEvent(statement.id )">
    <view class="information">
      <view class="icon">
       <img class="icon-img" :src=" statement.avatar ">
      </view>
      <view class="st-title">
        <view class="title"> {{ statement.name }}</view> <span>&nbsp;&nbsp;&nbsp; </span> 
        <view class="time">{{   statement.brief_text }} </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    statement: Object
  },

  methods: {
    statementEvent: function (key, id) {
      this.$emit('submit', key, id)
    }
  }
}
</script>

<style lang="scss">
@import "@/public/styles/components/character.scss";
</style>
