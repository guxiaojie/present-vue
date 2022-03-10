// import Vuex from 'vuex'
import { createModule } from 'vuex-toast'
import { createStore } from 'vuex'

import { createApp } from 'vue'
import App from './App.vue'
// import Character from './Pay.vue'
import MemeberView from './views/CharacterView.vue'

import router from './router'

import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'
import VueClipboard from 'vue-clipboard2'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  modules: {
    // ...
    toast: createModule({
      dismissInterval: 8000
    })
    // ...
  }
})

const app = createApp(App)
// const app = createApp(Character)
 
app.use(router)

// Install the store instance as a plugin
app.use(store)
app.use(VueToast, {
  // One of the options
  position: 'top'
})

app.use(VueClipboard)

app.mount('#app')

// // If you want to use the default style (with webpack css-loader)
// import 'vuex-toast/dist/vuex-toast.css'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   modules: {
//     // ...
//     toast: createModule({
//       dismissInterval: 8000
//     })
//     // ...
//   }
// })
