<template>
  <div class="content">
    <div class="header">
      <h2 class="title">用户列表</h2>
      <el-button type="primary" @click="handleNewuser">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="List.usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column align="center" type="index" label="序号" width="60px" />
        <el-table-column align="center" prop="name" label="用户名" width="120px" />
        <el-table-column align="center" prop="realname" label="真实姓名" width="120px" />
        <el-table-column align="center" prop="cellphone" label="手机号码" width="150px" />
        <el-table-column align="center" prop="enable" label="状态" width="80px">
          <template #default="scope">
            <el-tag :type="scope.row.enable ? 'success' : 'danger'">
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
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
        :total="List.usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getUserListData, deleteUserData } from '@/service/main/system'
import type { Isystem } from '@/types/login_type'
import { formatUTC } from '@/utils/day'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['newClick', 'editClick'])

//页码相关逻辑
const currentpage = ref(1)
const pageSize = ref(10)

const List = reactive<Isystem>({
  usersList: [],
  usersTotalCount: 0
})

//定义函数用于发送网络请求
function fetchUserListDate(formDate: any = {}) {
  const size = pageSize.value
  const offset = (currentpage.value - 1) * size

  const info = { size, offset }
  const queryinfo = { ...info, ...formDate }
  postUserListAction(queryinfo)
}
const postUserListAction = async (queryinfo: any) => {
  const userListResult = await getUserListData(queryinfo)
  console.log(userListResult.data)

  const { list, totalCount } = userListResult.data
  List.usersList = list
  List.usersTotalCount = totalCount
}
fetchUserListDate()
//分页页码的改变
function handleSizeChange() {
  fetchUserListDate()
}
function handleCurrentChange() {
  fetchUserListDate()
}

//删除
const handleRemove = async (id: number) => {
  const deleteresult = await deleteUserData(id)
  fetchUserListDate()
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

defineExpose({ fetchUserListDate })
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
