<template>
  <pageSearch :search-config="searchConfig" @query-click="handleQuery" @reset-click="handleReset" />
  <pageContent
    :content-config="contentConfig"
    ref="contentRef"
    @new-click="handleNew"
    @edit-click="handleEdit"
  >
    <template #image="scope">
      <el-image style="width: 80px; height: 80px" :src="scope.row.imgUrl" fit="fill" />
    </template>
  </pageContent>
  <pageModel :model-config="modelConfig" ref="modelRef" @new-confirm="confirmNew" />
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/contentConfig'

import pageModel from '@/components/page-model/page-model.vue'
import modelConfig from './config/modelConfig'

import usePagehook from '@/hooks/usePagecontent'
const { handleEdit, confirmNew, handleNew, contentRef, modelRef, handleReset, handleQuery } =
  usePagehook()
</script>
<style scoped lang="less"></style>
