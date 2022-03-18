<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Store from './utils/request.js'
import { setRem } from './utils/rem.js'
import _ from 'lodash'
</script>

<script>
export default {
  computed: {
    username () {
      // We will see what `params` is shortly
      return this.$route.params.username
    }
  },
  async mounted () {
    const storyId = new URL(location.href).searchParams.get('storyId')
    if (!_.isEmpty(storyId)) {
      localStorage.storyId = storyId
    }
    
    this.goToDashboard()
  },
  methods: {

    goToDashboard: async function() {
      const storyCharacter = 'storyCharacters'
       const character = JSON.parse(localStorage.getItem(storyCharacter)) || {};
      character[localStorage.storyId] = 0
      localStorage.setItem(storyCharacter, JSON.stringify(character));

      if (!_.isEmpty(localStorage.token)) {
       const cats = JSON.parse(localStorage.getItem(storyCharacter));
       const c =  cats[ localStorage.storyId ]
 
        console.log('----c',c)
         if ( c == 0 ) {
           this.$router.push('/character')
        } else {
            this.$router.push('/home')
        }

        // verify token anyways
         const api = new Store({})
        const res = await api.tokenVerify()
              console.log('tokenVerify', res)

        if (!res) {
          this.$router.push('/login')
        }

      } else {
        this.$router.push('/login')
      }
    }

  }

}
</script>

<template>
  <RouterView />
</template>
 