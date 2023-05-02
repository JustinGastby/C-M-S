<template>
  <div class="model">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formDate" label-width="80px" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formDate.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formDate.realname" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formDate.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="formDate.cellphone" placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formDate.roleId" placeholder="请选择角色" style="width: 100%">
              <template v-for="item in selectDate.entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="formDate.departmentId" placeholder="选择部门" style="width: 100%">
              <template v-for="item in selectDate.entireDepartment" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
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
import { getDepartmentData, getRoleData, newUserData, editUserData } from '@/service/main/system'
import type { ISelectDate } from '@/types/login_type'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['newConfirm'])

const selectDate = reactive<ISelectDate>({
  entireRoles: [],
  entireDepartment: []
})
const queryinfo = {
  offset: 0,
  size: 10
}
const dialogVisible = ref(false)
const formDate = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
//发送请求，获取选择数据
const postEntireDate = async () => {
  const rolesResult = await getRoleData(queryinfo)
  const departmentResult = await getDepartmentData(queryinfo)
  selectDate.entireRoles = rolesResult.data.list
  selectDate.entireDepartment = departmentResult.data.list
}

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
  if (isNewRef.value) {
    //新建用户
    const newResult = await newUserData(formDate)
    if (newResult.code === 1) {
      ElMessage({
        message: '创建成功！',
        type: 'success'
      })
    } else {
      ElMessage({
        message: '创建失败！',
        type: 'error'
      })
    }
  } else {
    // 编辑用户
    const editResult = await editUserData(editDate.value.id, formDate)
    console.log(editResult)
  }

  emit('newConfirm')
}

defineExpose({
  setVisible,
  postEntireDate
})
</script>
<style scoped lang="less">
.form {
  padding: 0 30px;
}
</style>
