<template>
  <div class="user">
    <serach @query-click="handleQuery" @reset-click="handleReset" />
    <content ref="contentRef" @new-click="handleNew" @edit-click="handleEdit" />
    <model ref="modelRef" @new-confirm="confirmNew" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import serach from './c-cpns/serach.vue'
import content from './c-cpns/content.vue'
import model from './c-cpns/model.vue'
//search 的事件回调
function handleQuery(formDate: any) {
  contentRef.value?.fetchUserListDate(formDate)
}
//reset
function handleReset() {
  contentRef.value?.fetchUserListDate()
}
//对content的操作
const contentRef = ref<InstanceType<typeof content>>()
const modelRef = ref<InstanceType<typeof model>>()
//新建用户
function handleNew() {
  modelRef.value?.setVisible()
  modelRef.value?.postEntireDate()
}
//用户确认
function confirmNew() {
  contentRef.value?.fetchUserListDate()
}
//编辑用户
function handleEdit(itemdata: any) {
  modelRef.value?.postEntireDate()
  modelRef.value?.setVisible(false, itemdata)
}
</script>
<style scoped lang="less">
.user {
  color: red;
}
</style>
