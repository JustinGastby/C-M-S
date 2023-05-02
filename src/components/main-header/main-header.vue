<template>
  <div class="main-header">
    <div class="menu-icon" @click="fold">
      <el-icon size="28px">
        <component :is="isfold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <!-- 面包屑 -->
      <headerCrum />
      <!-- 右侧信息 -->
      <headerInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'
import headerInfo from './c-cnps/header-info.vue'
import headerCrum from './c-cnps/header-crum.vue'

//自定义事件
const emit = defineEmits(['foldChange'])
const isfold = ref(false)
const fold = () => {
  isfold.value = !isfold.value

  emit('foldChange', isfold.value)
}
const router = useRouter()
const exit = () => {
  //1.删除token
  localCache.removeCache('token')

  router.push('/login')
}
</script>
<style scoped lang="less">
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
