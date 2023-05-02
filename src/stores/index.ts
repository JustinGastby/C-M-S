import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from '@/stores/login/login'

const pinia = createPinia()
function store(app: App<Element>) {
  app.use(pinia)
  //加载本地数据
  const loginStore = useLoginStore()
  loginStore.loadLocalCache()
}

export default store
