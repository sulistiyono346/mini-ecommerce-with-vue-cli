import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/register.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./views/cart.vue')
    },
    {
      path: '/shipping',
      name: 'shipping',
      component: () => import('./views/shipping.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/dashboard.vue')
    },
    {
      path: '/dashboard/product',
      name: 'dashboard_product',
      component: () => import('./views/dsproduct.vue')
    },
    {
      path: '/dashboard/category',
      name: 'dashboard_category',
      component: () => import('./views/dscategory.vue')
    },
    {
      path: '/product/:id',
      name: 'detail_product',
      component: () => import('./views/detail_page.vue')
    }
  ]
})
