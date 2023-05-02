<template>
  <pageContent :content-config="contentConfig" />
</template>

<script setup lang="ts">
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/contentConfig'
</script>
<style scoped lang="less"></style>
