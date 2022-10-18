import { createRouter, createWebHistory } from 'vue-router'
import authRouter from '../modules/auth/routes'
import dashboardRouter from '../modules/dashboard/routes'
import { verifyToken } from '../api/auth.controller';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      ...authRouter
    },
    {
      path: '/dashboard',
      ...dashboardRouter
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('@/views/NotFound.vue')
    }
  ],
})

router.beforeEach(async({ meta: { requireLoggin } }) => {
  if (requireLoggin) {
    const { status } = await verifyToken()
    if (status) return true
    router.replace({ name: 'signin' })
  }

  if (!requireLoggin && sessionStorage.getItem('tkn')) {
    const { status } = await verifyToken()
    if (!status) return true
    router.replace({ name: 'countryweather' })
  }
  return true
})

export default router
