<template>
  <div>
    <el-form ref="formRef" :rules="rules" :model="account" label-width="60px" size="large">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import type { IAccount } from '@/types/login_type'
import useLoginStore from '@/stores/login/login'
import { localCache } from '@/utils/cache'

const account = reactive<IAccount>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 8, message: '长度必须为3-8位', trigger: 'blur' }
  ]
})

//执行登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRem: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log('验证成功')
      const name = account.name
      const password = account.password

      //向服务器发送请求,将数据放入pinia中管理

      loginStore.loginAccount({ name, password }).then(() => {
        //是否记住密码
        if (isRem) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })
    } else {
      ElMessage.error('验证失败,请输入正确的账号密码！')
    }
  })
}

defineExpose({
  loginAction
})
</script>
<style scoped></style>
