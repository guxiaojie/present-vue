import { createModule } from 'vuex-toast'
import { createStore } from 'vuex'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'
import VueClipboard from 'vue-clipboard2'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

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
 
app.use(router)
app.use(store)
app.use(VueToast, {
  position: 'top'
})
app.use(VueClipboard)
app.use(Antd);

app.mount('#app')
