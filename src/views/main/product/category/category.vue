<template>
  <pageContent
    :content-config="contentConfig"
    ref="contentRef"
    @new-click="handleNew"
    @edit-click="handleEdit"
  />
  <pageModel :model-config="modelConfig" ref="modelRef" @new-confirm="confirmNew" />
</template>

<script setup lang="ts">
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/contentConfig'

import pageModel from '@/components/page-model/page-model.vue'
import modelConfig from './config/modelConfig'

import usePagehook from '@/hooks/usePagecontent'
const { handleEdit, confirmNew, handleNew, contentRef, modelRef } = usePagehook()
</script>
<style scoped lang="less"></style>
