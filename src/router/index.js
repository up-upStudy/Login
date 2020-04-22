import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)



const router = new VueRouter({
  routes:[
    {
      path:'/',redirect:'/login' 
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/home',
      component:Home
    }
  ]
})
//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
//用户直接访问登入界面，直接放行
if (to.path==='/login') return next()
//判断是否登入过
const tokenStr = window.sessionStorage.getItem('token')
//没有登入过，强制跳转到登入页面
if(!tokenStr) return next('/login')
next()
})
export default router
