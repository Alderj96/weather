const routes = {
  name: 'dashboard',
  component: () => import('../layouts/DashboardLayout.vue'),
  meta: { requireLoggin: true },
  children: [
    {
      path: '/',
      text: 'Dashboard',
      name: 'countryweather',
      component: () => import('../views/CountryWeather.vue')
    },
    {
      path: '/users',
      text: 'Usuarios',
      name: 'usertable',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UserTable.vue')
    }
  ]
}

export default routes
