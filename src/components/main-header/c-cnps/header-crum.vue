<template>
  <el-breadcrumb separator-icon="ArrowRight">
    <template v-for="item in breadcurmb" :key="item.name">
      <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { mapPathBreadcrumbs } from '@/utils/map-menu'
import { useRoute } from 'vue-router'
import useLoginStore from '@/stores/login/login'

const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadcurmb = computed(() => {
  return mapPathBreadcrumbs(route.path, userMenus)
})
</script>
<style scoped></style>
