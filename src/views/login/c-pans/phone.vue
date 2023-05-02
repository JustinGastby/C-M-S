<template>
  <div>
    <el-form ref="formRef" :rules="rules" :model="phone" label-width="70px" size="large">
      <el-form-item label="手机号" prop="id">
        <el-input v-model="phone.id" />
      </el-form-item>
      <el-form-item label="验证码" prop="msg">
        <div class="fy">
          <el-input v-model="phone.msg" />
          <el-button class="btn" type="primary" @click="getMsg">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormRules, ElForm } from 'element-plus'

const phone = reactive({
  id: '',
  msg: ''
})

const rules = reactive<FormRules>({
  id: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
})

const getMsg = () => {
  phone.msg = Math.random().toString(36).substring(2, 6)
}
</script>
<style scoped>
.fy {
  display: flex;
}
.btn {
  margin-left: 10px;
}
</style>
