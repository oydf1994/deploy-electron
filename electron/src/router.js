import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => require(['./views/login.vue'], resolve),
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['./views/Home.vue'], resolve),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['./views/About.vue'], resolve),
    }
  ]
})
