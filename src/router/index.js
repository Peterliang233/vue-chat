import Vue from 'vue'
import VueRouter from 'vue-router'
import Registry from '../views/Registry.vue'
import Login from '../views/Login.vue'
import NotFound from "../views/NotFound";
import Main from "../views/Main";
import chat from "../views/chat";
import test from "../views/test";

Vue.use(VueRouter)

const routes = [
  {
    path: '/signup',
    name: 'Registry',
    component: Registry
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '*',
    name: 'Notfound',
    component: NotFound
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: chat,
  },
  {
    path: '/test',
    name: 'Test',
    component: test
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=> {
  if (to.path === '/login' || to.path === '/signup') {
    next()
  } else{
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})

export default router
