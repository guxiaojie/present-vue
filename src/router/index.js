import { createRouter, createWebHistory } from 'vue-router'
import CharacterView from '../views/CharacterView.vue'
import HomeView from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import Piece from '@/views/PieceView.vue'
import Pay from '@/views/PayView.vue'
import PathNotFound from '@/views/NotFoundView.vue'
import App from '@/App.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/character',
      name: 'character',
      component: CharacterView
    },
    {
      path: '/piece',
      component: Piece
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/topup',
      component: Pay
    }, 
    {
      path: '/',
      component: HomeView
    }, 
    { path: '/:pathMatch(.*)*', component: PathNotFound },
  ]
})

// router.beforeEach(async (to, from) => {
//   // canUserAccess() 返回 `true` 或 `false`
//   console.log("------router", to)

//   return true; //await canUserAccess(to)
// })

export default router
