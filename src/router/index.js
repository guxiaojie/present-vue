import { createRouter, createWebHistory } from 'vue-router'
import CharacterView from '../views/CharacterView.vue'
import HomeView from '../views/HomeView.vue'
import Piece from '../views/PieceView.vue'
import Map from '../views/MapView.vue'

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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/piece',
      component: Piece
    },
    {
      path: '/map',
      component: Map
    },
  ]
})

export default router
