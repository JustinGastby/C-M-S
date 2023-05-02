<template>
  <div class="panel">
    <h1 class="title">素葩后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <!-- 账号登录 -->
      <el-tab-pane name="account">
        <template #label>
          <span class="icon">
            <el-icon><UserFilled /></el-icon>
            <span class="text">账号登录</span>
          </span>
        </template>
        <Account ref="accountRef" />
      </el-tab-pane>
      <!-- 手机登录 -->
      <el-tab-pane name="phone">
        <template #label>
          <span class="icon">
            <el-icon><Iphone /></el-icon>
            <span class="text">手机登录</span>
          </span>
        </template>
        <Phone />
      </el-tab-pane>
    </el-tabs>
    <div class="control-account">
      <el-checkbox v-model="isRem" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" size="large" @click="LoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'
import Account from './account.vue'
import Phone from './phone.vue'
import { ElMessage } from 'element-plus'

const isRem = ref<boolean>(localCache.getCache('isRem') ?? false)
//监听记住密码
watch(isRem, (newval) => {
  localCache.setCache('isRem', newval)
})

const currentTab = ref('account')
const accountRef = ref<InstanceType<typeof Account>>()

function LoginClick() {
  if (currentTab.value === 'account') {
    accountRef.value?.loginAction(isRem.value)
    console.log('账号登录')
  } else {
    ElMessage({
      message: '手机登录暂时无法使用！',
      type: 'warning'
    })
    console.log('手机登录')
  }
}
</script>
<style scoped lang="less">
.panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .control-account {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
