<template>
  <view class="container">
    <view style="height:40px;"></view>

    <view class="choose_character">
      <view class="column">
        <img style="width:30px; height:15px; margin-top:7px" :src="imgs.eye" />
        <view style="width:10px;"></view>
        <text style=" font-size: 18px;">{{search_text}}</text>
      </view>
      <view class="img-top-shortline">
        <img :src="imgs.shortLine" mode="widthFix" />
      </view>
    </view>

    <view class="userinfobtns">
      <view class="column">
        <view class="btn">
          <text>{{display_id}}</text>
        </view>
        <view class="btn">
          <text>{{role}}</text>
        </view>
        <view class="btn">
          <text>{{comment}}</text>
        </view>
      </view>
    </view>

    <view v-if=" content_type==2 " class="fragment-img" @click="gotoMap">
      <view>
        <img :src="pictures[0]" :style="{'width': imgWidth + 'px' }" mode="scaleToFill" />
      </view>
      <!-- <text> 点击图片可放大查看 </text> -->
    </view>

    <view v-if=" content_type==3 " class="sliderCont">
      <audio :src="playurl"  controls controlsList="nodownload" class="aaudio"></audio>
    </view>

    <text v-if=" content_type==1 " class="message">{{ text }}</text>

    <view style="height:100px"></view>

    <view class="bottom1">
      <view class="column1">
        <view v-if=" currentPieceIndex == 0 ">
          <!-- <view class="btn1"  @click="previous">
          <text decode="{{true}}">1 上一条可用碎片 </text>
          </view>-->
        </view>
        <view v-else>
          <view class="btn1" @click="previous">
            <text decode="{{true}}">上一条可用碎片</text>
          </view>
        </view>

        <view v-if=" last==true ">
          <!-- <view class="btn1 btn2" @click="next">
              <text decode="{{true}}">1下一条可用碎片</text>
          </view>-->
        </view>
        <view v-else>
          <view class="btn1" @click="next">
            <text decode="{{true}}">下一条可用碎片</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import _ from "lodash";
import Store from "../utils/request.js";

export default {
  data() {
    return {
      search_text: "",
      content_type: 1,
      display_id: "",
      role: "",
      comment: "",
      text: "",
      image: "",

      pictures: [""],
      imageSize: {},
      px2px: 2,
      windowWidth: 375,
      src: "",
      curTime: "00:00",
      endTime: "00:00",
      reCurTime: "",
      reEndTime: "",
      playurl: "",
      status: "",
      cdCls: "pause",
      currentDot: 0,
      isplay: false,
      timer: "",
      currentFragmentId: 87,
      discoveredList: [],
      currentPieceIndex: 0,
      last: false,
      imgs: {
        shortLine: "https://assets.storiesmatter.cn/shortline.png",
        eye: "https://assets.storiesmatter.cn/eye.png",
        play: "https://assets.storiesmatter.cn/play1.png",
        pause: "https://assets.storiesmatter.cn/pause1.png"
      },
      imgWidth: 375
    };
  },

  async mounted() {
    this.imgWidth =
      document.documentElement.clientWidth || document.body.clientWidth;
    if (!_.isEmpty(this.$route.query)) {
      this.discoveredList = this.$route.query.discoveredList;
      this.currentPieceIndex = this.$route.query.index;
    }
    this.gotoPiece();
    const content = "width=device-width, initial-scale=1.0, user-scalable=yes";
    document.querySelector('meta[name="viewport"]').content = content;
  },

  methods: {
    gotoMap() {},
    async requestFragment() {
      this.$toast.open({
        message: "正在加载...",
        duration: 2000,
        dismissible: false
      });
      const r = new Store({});
      const data = await r.fragments(this.currentFragmentId);
      if (data != undefined) {
        this.search_text = data.search_text;
        this.content_type = data.content_type;
        this.role = data.role_name;
        this.display_id = data.display_id;
        this.comment = data.comment;
        this.text = data.text;
        this.playurl = data.audio;
        this.image = data.image;
        this.pictures.push(data.image);

        if (this.playurl != undefined && this.content_type == 3) {
        } else {
          //只是图片
        }
      } else {
        //失败了再loaded，成功的话要等开始play。因为可能操作太快，暂停不了
      }
      this.$toast.clear();
    },

    gotoPiece() {
      this.onUnloadAudio();

      this.currentFragmentId = this.discoveredList[this.currentPieceIndex];
      if (parseInt(this.currentPieceIndex) + 1 == this.discoveredList.length) {
        this.last = true;
      } else {
        this.last = false;
      }
      if (this.currentFragmentId != undefined) {
        this.pictures = [];
        this.imageSize = [];
        this.requestFragment();
      }
    },
    previous() {
      if (this.currentPieceIndex <= 0) {
        return;
      }
      this.currentPieceIndex--;
      this.gotoPiece();
    },

    next() {
      if (parseInt(this.currentPieceIndex) + 1 >= this.discoveredList.length) {
        return;
      }
      this.currentPieceIndex++;
      this.gotoPiece();
    },
    onUnloadAudio() {
      clearInterval(this.timer);
    },
    onUnload() {
      this.onUnloadAudio();
    }
  }
};
</script>
<style lang="scss" src="@/public/styles/piece.scss"></style>
