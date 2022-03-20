<script setup>
import { RouterLink, RouterView } from "vue-router";
import Store from "./utils/request.js";
import _ from "lodash";
import Session from "./utils/session.js";
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

        this.$router.push("/topup");
        return;
      if (!_.isEmpty(localStorage.token)) {
        Session.gotoHomeOrRole(this);

        // verify token anyways
        const api = new Store({});
        const res = await api.tokenVerify();
        console.log("tokenVerify", res);

        if (!res) {
          this.$router.push("/login");
        }
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
 