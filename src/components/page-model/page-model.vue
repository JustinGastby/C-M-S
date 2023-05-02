<template>
  <div class="model">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modelConfig.header?.newTitle : modelConfig.header?.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formDate" label-width="80px" size="large">
          <template v-for="item in props.modelConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formDate[item.prop]" :placeholder="item.placeholder"></el-input>
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formDate[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import useSystemStore from '@/stores/system/system'

const emit = defineEmits(['newConfirm'])

interface Iprops {
  modelConfig: {
    pageName: string
    header?: {
      newTitle?: string
      editTitle?: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<Iprops>()

const systemStore = useSystemStore()

//定义form数据
const initialForm: any = {}
for (const item of props.modelConfig.formItems) {
  initialForm[item.prop] = ''
}
const formDate = reactive(initialForm)

const dialogVisible = ref(false)

const isNewRef = ref(true)
const editDate = ref()

function setVisible(isNew: boolean = true, itemdata?: any) {
  dialogVisible.value = true
  if (!isNew && itemdata) {
    isNewRef.value = false
    for (const key in formDate) {
      formDate[key] = itemdata[key]
    }

    editDate.value = itemdata
  } else {
    for (const key in formDate) {
      formDate[key] = ''
    }
    isNewRef.value = true
    editDate.value = null
  }
}

//确认按钮提交
async function handleConfirm() {
  dialogVisible.value = false

  let infoData = formDate
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  if (isNewRef.value) {
    //新建用户
    systemStore.newPageDateAction(props.modelConfig.pageName, infoData)
  } else {
    // 编辑用户
    systemStore.editPageDateAction(props.modelConfig.pageName, editDate.value.id, infoData)
  }

  emit('newConfirm')
}

defineExpose({
  setVisible
})
</script>
<style scoped lang="less">
.form {
  padding: 0 30px;
}
</style>
