import { createRouter, createWebHistory } from 'vue-router'
import CharacterView from '../views/CharacterView.vue'
import HomeView from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import Piece from '@/views/PieceView.vue'
import Pay from '@/views/Pay.vue'
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
      component: App
    },
  ]
})

export default router
