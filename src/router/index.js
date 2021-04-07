import { createRouter, createWebHistory } from 'vue-router'
import { auth } from "../firebaseCfg.js"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
    {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
    {
    path: '/signin',
    name: 'Sign In',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
  },
    {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import(/* webpackChunkName: "add" */ '../views/AddToStorage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-item',
    name: 'Add Item',
    component: () => import(/* webpackChunkName: "additem" */ '../views/AddNewItem.vue'),
    meta: {
      requiresAuth: true
    }
  }
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//Check for user auth
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})


export default router
