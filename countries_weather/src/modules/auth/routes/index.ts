const routes = {
  name: 'auth',
  component: () => import('../layouts/AuthLayout.vue'),
  children: [
    {
      path: '/',
      name: 'signin',
      component: () => import('../views/SignIn.vue')
      // component: () => import('../views/SignUp.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignUp.vue')
    }
  ]
}

export default routes
