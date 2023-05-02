import type { RouteRecordRaw } from 'vue-router'

const localRouters: RouteRecordRaw[] = [
  {
    path: '/main/analysis/dashboard',
    component: () => import('@/views/main/analysis/dashbord/dashbord.vue')
  },
  {
    path: '/main/analysis/overview',
    component: () => import('@/views/main/analysis/overview/overview.vue')
  },
  {
    path: '/main/system/department',
    component: () => import('@/views/main/system/department/department.vue')
  },
  {
    path: '/main/system/menu',
    component: () => import('@/views/main/system/menu/menu.vue')
  },
  {
    path: '/main/system/role',
    component: () => import('@/views/main/system/role/role.vue')
  },
  {
    path: '/main/system/user',
    component: () => import('@/views/main/system/user/user.vue')
  },
  {
    path: '/main/product/category',
    component: () => import('@/views/main/product/category/category.vue')
  },
  {
    path: '/main/product/goods',
    component: () => import('@/views/main/product/goods/goods.vue')
  }
]

export { localRouters }
