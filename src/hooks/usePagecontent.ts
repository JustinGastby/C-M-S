import type pageModel from '@/components/page-model/page-model.vue'
import type pageContent from '@/components/page-content/page-content.vue'
import { ref } from 'vue'

type EditFntype = (data: any) => void
type newFntype = () => void
function usePagecontent(newCb?: newFntype, edCb?: EditFntype) {
  //search 的事件回调
  function handleQuery(formDate: any) {
    contentRef.value?.fetchPageListDate(formDate)
  }
  //reset
  function handleReset() {
    contentRef.value?.fetchPageListDate()
  }

  const contentRef = ref<InstanceType<typeof pageContent>>()
  const modelRef = ref<InstanceType<typeof pageModel>>()

  //新建用户
  function handleNew() {
    modelRef.value?.setVisible()
    if (newCb) newCb()
  }
  //用户确认
  function confirmNew() {
    contentRef.value?.fetchPageListDate()
  }
  //编辑用户
  function handleEdit(itemdata: any) {
    modelRef.value?.setVisible(false, itemdata)
    if (edCb) edCb(itemdata)
  }

  return {
    handleEdit,
    confirmNew,
    handleNew,
    contentRef,
    modelRef,
    handleReset,
    handleQuery
  }
}

export default usePagecontent
