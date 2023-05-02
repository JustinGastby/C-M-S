<template>
  <pageSearch :search-config="searchConfig" @query-click="handleQuery" @reset-click="handleReset" />
  <pageContent
    :content-config="contentConfig"
    ref="contentRef"
    @new-click="handleNew"
    @edit-click="handleEdit"
  ></pageContent>
  <pageModel
    :model-config="modelConfig"
    ref="modelRef"
    :other-info="otherInfo"
    @new-confirm="confirmNew"
  >
    <template #menulist>
      <el-tree
        ref="treeRef"
        :data="entireMenus"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheck"
    /></template>
  </pageModel>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, nextTick } from 'vue'
import type { ElTree } from 'element-plus'

import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/contentConfig'

import pageModel from '@/components/page-model/page-model.vue'
import modelConfig from './config/modelConfig'

import usePagehook from '@/hooks/usePagecontent'
import useSystemStore from '@/stores/system/system'
import { mapMenuListID } from '@/utils/map-menu'

const { handleEdit, confirmNew, handleNew, contentRef, modelRef, handleReset, handleQuery } =
  usePagehook(newCallback, editCallback)

//获取菜单
const mainStore = useSystemStore()
mainStore.postEntireDate({
  offset: 0,
  size: 10
})
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})
function handleCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}
const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallback(itemdata: any) {
  //点击编辑获取列表选择
  console.log(itemdata.menuList)
  nextTick(() => {
    const mapmenus = mapMenuListID(itemdata.menuList)
    console.log(mapmenus)
    treeRef?.value?.setCheckedKeys(mapmenus)
  })
}
function newCallback() {
  nextTick(() => {
    treeRef?.value?.setCheckedKeys([])
  })
}
</script>
<style scoped lang="less"></style>
