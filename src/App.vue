<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Store from './utils/request.js'
import { setRem } from './utils/rem.js'
</script>

<script>
export default {
  computed: {
    username () {
      // We will see what `params` is shortly
      return this.$route.params.username
    }
  },
  mounted () {
    this.goToDashboard()
  },
  methods: {
    goToDashboard () {
      if (false) {
        this.$router.push('/about')
      } else {
        this.$router.push('/character')
      }
    }
  }
}
</script>

<template>
  <RouterView />
</template>
<style lang="scss">
@import '@/assets/index.scss';

</style>
