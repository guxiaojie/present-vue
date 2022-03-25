<script setup>
import { RouterLink, RouterView } from "vue-router";
import Store from "./utils/request.js";
import _ from "lodash";
import Session from "./utils/session.js";
import { message } from "ant-design-vue";
</script>

<script>
export default {
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username;
    }
  },
  async mounted() {
    const storyId = new URL(location.href).searchParams.get("storyId");
    if (!_.isEmpty(storyId)) {
      localStorage.storyId = storyId;
    }
    if (_.isEmpty(localStorage.storyId)) {
      localStorage.storyId = 1;
    }

    this.goToDashboard();
  },
  methods: {
    goToDashboard: async function() {

      if(!navigator.onLine){
        message.error("请检查网络")
        return
      }
   
      if (!_.isEmpty(localStorage.token)) {

        // router to home or role list
        // Session.gotoHomeOrRole(this);

        // verify token anyways
        const api = new Store({});
        const res = await api.tokenVerify();

        if (!res) {
          this.$router.push("/login");
        }
        console.log("Load App")
      } else {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<template>
  <RouterView />
</template>
 