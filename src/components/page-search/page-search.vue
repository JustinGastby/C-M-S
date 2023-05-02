<template>
  <div class="search">
    <el-form size="large" :model="searchFrom" ref="formRef">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" ::key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchFrom[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchFrom[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 重置和搜索的按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="refresh">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleQuery">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'

interface Iprops {
  searchConfig: {
    formItems: any[]
  }
}
const props = defineProps<Iprops>()
//定义form数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = ''
}
const searchFrom = reactive(initialForm)

const emit = defineEmits(['queryClick', 'resetClick'])
//重置
const formRef = ref<FormInstance>()
function refresh() {
  formRef.value?.resetFields()
  emit('resetClick')
}

//搜索
function handleQuery() {
  emit('queryClick', searchFrom)
}
</script>
<style scoped lang="less">
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
    .el-button {
      height: 36px;
    }
  }
}
</style>
