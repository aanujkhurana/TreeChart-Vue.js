import { createRouter, createWebHistory } from 'vue-router'
import ChartView from '../views/ChartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/tree_chart',
      name: 'tree_chart',
      component: ChartView
    }
  ]
})

export default router
