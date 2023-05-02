<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/beach.svg" alt="" />
      <h4 class="title">素葩管理系统</h4>
    </div>
    <div class="menu">
      <el-menu
        :default-active="activePath"
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        router
        unique-opened
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.url">
            <template #title>
              <!-- <el-icon><Monitor /></el-icon> -->
              <el-icon><component :is="item.icon.split('el-icon-')[1]"></component></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.url" @click="saveIdx(subitem.url)">{{
                subitem.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login'

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

//解决刷新路径不对问题
const currIndex = sessionStorage.getItem('curridx')
const activePath = currIndex ? currIndex : '/main/analysis/dashboard'
const saveIdx = (path: string) => {
  sessionStorage.setItem('curridx', path)
}

console.log(userMenus)
</script>
<style scoped lang="less">
.main-menu {
  height: 100%;
  background-color: #001529;
}
.logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 30px;
  padding: 12px 10px 8px 10px;
  overflow: hidden;
}

.img {
  height: 100%;
  margin: 0 10px;
}
.title {
  font-size: 16px;
  font-weight: 700;
  color: white;
  white-space: nowrap;
}
.toggle-button {
  background-color: #666699;
  font-size: 10px;
  line-height: 24px;
  color: #000;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-menu {
  border-right: none;
  user-select: none;
}
.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
