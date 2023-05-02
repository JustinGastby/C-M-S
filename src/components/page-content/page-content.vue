<template>
  <div class="content">
    <div class="header">
      <h2 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h2>
      <el-button type="primary" @click="handleNewuser">{{
        contentConfig?.header?.btnText ?? '新建数据'
      }}</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%" row-key="id">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'img'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotname" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
        <el-table-column align="center" label="操作" width="160px">
          <template #default="scope">
            <el-button size="small" icon="Edit" text @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="small"
              icon="Delete"
              type="danger"
              text
              @click="handleRemove(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentpage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 15, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatUTC } from '@/utils/day'
import { ElMessage } from 'element-plus'
import useSystemStore from '@/stores/system/system'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['newClick', 'editClick'])

interface Iprops {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnText?: string
    }
    propsList: any[]
  }
}
const props = defineProps<Iprops>()

//页码相关逻辑
const systemStore = useSystemStore()
//页码刷新逻辑
systemStore.$onAction(({ name }) => {
  if (name === 'deletePageById' || name === 'newPageDateAction' || name === 'editPageDateAction') {
    currentpage.value = 1
  }
})
const currentpage = ref(1)
const pageSize = ref(10)
fetchPageListDate()
//从store里拿到页面数据
const { pageList, pageTotalCount } = storeToRefs(systemStore)

//定义函数用于发送网络请求
function fetchPageListDate(formDate: any = {}) {
  const size = pageSize.value
  const offset = (currentpage.value - 1) * size

  const info = { size, offset }
  const queryinfo = { ...info, ...formDate }
  systemStore.postPageListAction(props.contentConfig.pageName, queryinfo)
}

//分页页码的改变
function handleSizeChange() {
  fetchPageListDate()
}
function handleCurrentChange() {
  fetchPageListDate()
}

//删除
const handleRemove = async (id: number) => {
  systemStore.deletePageById(props.contentConfig.pageName, id)
  ElMessage({
    message: '删除成功！',
    type: 'success'
  })
}

//新建用户
function handleNewuser() {
  emit('newClick')
}

//编辑用户
function handleEdit(itemdata: any) {
  emit('editClick', itemdata)
}

defineExpose({ fetchPageListDate })
</script>
<style scoped lang="less">
.content {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  color: #000;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
}
.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
  .el-button {
    margin: 0;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
