import { localCache } from '@/utils/cache'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue')

      // children:[ 动态路由导入
      //   {
      //     path:'/main/xxx'
      //     component:()=>import()
      //   }
      // ]
    },
    {
      path: '/:patchMatch(.*)',
      component: () => import('@/views/nofound/no-found.vue')
    }
  ]
})

//路由导航
router.beforeEach((to, from) => {
  //只有登录成功，才能进入到main页面
  const token = localCache.getCache('token')
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  if (to.path === '/login' && token) {
    return '/main/analysis/dashboard'
  }
  if (to.path === '/main' && token) {
    return '/main/analysis/dashboard'
  }
})
export default router
