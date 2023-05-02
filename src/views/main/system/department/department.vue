<template>
  <div>
    <pageSearch
      :search-config="searchConfig"
      @query-click="handleQuery"
      @reset-click="handleReset"
    />
    <pageContent
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNew"
      @edit-click="handleEdit"
    ></pageContent>
    <pageModel :model-config="modelConfigRef" ref="modelRef" @new-confirm="confirmNew" />
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/contentConfig'
import pageModel from '@/components/page-model/page-model.vue'
import modelConfig from './config/modelConfig'
import useSystemStore from '@/stores/system/system'
import { computed } from 'vue'
import usePagehook from '@/hooks/usePagecontent'

//下拉选择内容
const mainStore = useSystemStore()
mainStore.postEntireDate({
  offset: 0,
  size: 10
})
const modelConfigRef = computed(() => {
  const departments = mainStore.entireDepartment.map((item) => {
    return { label: item.name, value: item.id }
  })
  modelConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
    }
  })
  return modelConfig
})

//利用hooks对相同search,提交页面进行封装
const { handleEdit, confirmNew, handleNew, contentRef, modelRef, handleReset, handleQuery } =
  usePagehook()
// //search 的事件回调
// function handleQuery(formDate: any) {
//   contentRef.value?.fetchPageListDate(formDate)
// }
// //reset
// function handleReset() {
//   contentRef.value?.fetchPageListDate()
// }

// const contentRef = ref<InstanceType<typeof pageContent>>()
// const modelRef = ref<InstanceType<typeof pageModel>>()

// //新建用户
// function handleNew() {
//   modelRef.value?.setVisible()
// }
// //用户确认
// function confirmNew() {
//   contentRef.value?.fetchPageListDate()
// }
// //编辑用户
// function handleEdit(itemdata: any) {
//   modelRef.value?.setVisible(false, itemdata)
// }
</script>
<style scoped lang="less"></style>
