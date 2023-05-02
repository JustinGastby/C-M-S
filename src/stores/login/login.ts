import { defineStore } from 'pinia'
import { accountLogin, getUserById, getRoleMenus } from '@/service/login/login'
import type { IAccount } from '@/types/login_type'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { localRouters } from '@/router/main'

interface ILocalState {
  token: string
  userInfo: any
  userMenus: any
}
const useLoginStore = defineStore('login', {
  state: (): ILocalState => ({
    token: localCache.getCache('token') ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? []
  }),
  actions: {
    async loginAccount(account: IAccount) {
      const loginDate = await accountLogin(account)

      const id = loginDate.data.id
      this.token = loginDate.data.token

      localCache.setCache('token', this.token)
      //获取登录用户的角色信息
      const userInfoResult = await getUserById(id)
      this.userInfo = userInfoResult.data
      localCache.setCache('userInfo', this.userInfo)
      //根据角色请求用户的权限
      const userMenusResult = await getRoleMenus(this.userInfo.role.id)
      this.userMenus = userMenusResult.data
      localCache.setCache('userMenus', this.userMenus)

      //动态添加路由,寻找路径上有的进行注册
      for (const menu of this.userMenus) {
        for (const submenu of menu.children) {
          const route = localRouters.find((item) => item.path === submenu.url)
          if (route) router.addRoute('main', route)
        }
      }
      router.push('/main')
    },
    loadLocalCache() {
      //用户刷新默认加载数据
      const token = localCache.getCache('token')
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        //动态添加路由,寻找路径上有的进行注册
        for (const menu of this.userMenus) {
          for (const submenu of menu.children) {
            const route = localRouters.find((item) => item.path === submenu.url)
            if (route) router.addRoute('main', route)
          }
        }
      }
    }
  }
})

export default useLoginStore
