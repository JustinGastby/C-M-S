<template>
  <div class="main">
    <el-container class="main-con">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <mainMenu :is-fold="isCollapse" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <mainHeader @fold-change="handFoldchange" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'

const isCollapse = ref(false)
function handFoldchange(isfold: boolean) {
  isCollapse.value = isfold
}
</script>
<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
}

.main-con {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    color: #333;
    text-align: center;
    background-color: #f0f2f5;
  }
}
</style>
