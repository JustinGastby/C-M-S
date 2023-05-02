<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import LoginPanel from './c-pans/login-pans.vue'
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  background: url('../../assets/img/login-bg.svg');
}
</style>
