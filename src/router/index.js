import Vue from 'vue'
import VueRouter from 'vue-router'
import Registry from '../views/Registry.vue'
import Login from '../views/Login.vue'
import NotFound from "../views/NotFound";
import Chat from "../views/Chat";

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
    path: '/chat',
    name: 'Test',
    component: Chat,
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
