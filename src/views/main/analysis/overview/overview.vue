<template>
  <div class="Overview">
    <div class="about">
      <h2>关于</h2>
      <el-divider />
      <span>此系统是基于Vue3、TS、VueRouter、Pinia、Vite、Element-Plus、Echart5等构建而成。</span>
    </div>

    <div class="technology">
      <h2>技术栈</h2>
      <el-divider />
      <div class="tc">
        <el-row :gutter="20" style="margin-bottom: 30px">
          <el-col :span="8">
            <img src="@/assets/icon/vscode.png" class="image" />
            <div style="padding: 14px">
              <span>VSCode</span>
            </div>
          </el-col>
          <el-col :span="8">
            <img src="@/assets/icon/Vue.png" class="image" />
            <div style="padding: 14px">
              <span>Vue</span>
            </div>
          </el-col>
          <el-col :span="8">
            <img src="@/assets/icon/ts.png" class="image" />
            <div style="padding: 14px">
              <span>TypeScript</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <img src="@/assets/icon/pinia.png" class="image" />
            <div style="padding: 14px">
              <span style="margin-left: -10px">Pinia</span>
            </div>
          </el-col>
          <el-col :span="8">
            <img src="@/assets/icon/element.png" style="width: 210px; height: 73px" />
            <div style="padding: 20px; margin-top: 17px">
              <span>Element-Plus</span>
            </div>
          </el-col>
          <el-col :span="8">
            <img src="@/assets/icon/echarts.png" class="image" />
            <div style="padding: 14px">
              <span>Echart5</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="technology">
      <ul>
        <li>开发工具：<span>VSCode</span></li>
        <li>编程语言：<span>TS + JS</span></li>
        <li>构建工具：<span>Vite</span></li>
        <li>前端框架：<span>Vue3</span></li>
        <li>路由工具：<span>Vue Router</span></li>
        <li>状态管理：<span>Pinia</span></li>
        <li>UI框架：<span>Element-Plus</span></li>
        <li>可视化：<span>Echart5</span></li>
        <li>富文本：<span>WangEditor</span></li>
        <li>工具库：<span>dayjs + countup.js</span></li>
        <li>css预编译：<span>Less</span></li>
        <li>HTTP工具：<span>Axios</span></li>
        <li>Git Hook 工具：<span>Husky</span></li>
        <li>代码规范：<span>EditorConfig + Prettier + ESLint</span></li>
        <li>提交规范：<span>Commitizen + Commitlint</span></li>
        <li>自动部署：<span>Centos + Jenkins + Nginx</span></li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.about,
.technology {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: white;
}
.technology {
  margin-top: 15px;
  li {
    list-style-type: none;
    margin-bottom: 5px;
  }
  span {
    color: #5b5bf5;
    margin-left: 5px;
  }
}
.tc {
  margin-top: 5px;
}
.image {
  width: 100px;
  height: 100px;
}
</style>
