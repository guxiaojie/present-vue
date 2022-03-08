<template >
  <view class="charactercell" @click="statementEvent(statement.id )">
    <view class="information">
      <view class="icon">
               <img :src=" statement.avatar "> 

      </view>
      <view class="st-title">
        <view class="title">{{ statement.id }}:{{ statement.name }}</view>
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
    statementEvent: function(key, id) {
      console.log("----------", key, id);
      this.$emit("submit", key, id);
    }
  }
};
</script>

 
 
<style lang="scss">
//@import '../_variable.scss';
.charactercell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .information {
    display: flex;
    align-items: center;
    flex: 1;
    margin-right: 42px;
  }
  .icon {
    margin-left: 0px;
    margin-right: 40px;
    margin-top: 0px;
    background-image: url("https://assets.storiesmatter.cn/avatarbg.png");
    background-size: contain;
    background-position-y: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: top;
    justify-content: top;
    > img {
      padding: 16px;
      width: 200px;
      height: 200px;
    }
  }
  .st-title {
    //background: #ef00ef;
    margin-right: 42px;
    margin-top: 10px;
    margin-bottom: 50px;
    > view {
      margin-top: 10px;
      margin-bottom: 0px;
      padding: 5px 0;
    }
    .title {
      margin-top: 30px;
      font-size: 32px;
    }
    .time {
      color: #757575;
      font-size: 26px;
    }
  }
}
</style>