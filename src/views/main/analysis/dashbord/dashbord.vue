<template>
  <div class="dashbord">
    <!-- 1.顶部数字 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6">
          <countCard v-bind="item" />
        </el-col>
      </template>
    </el-row>
    <!-- 2.中间部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card :header="'分类商品数量（饼图）'">
          <pie-echart :pie-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card :header="'不同城市商品销量'">
          <map-echart :map-data="showGoodsAddressSale" />
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card :header="'分类商品数量（玫瑰图）'">
          <rose-echart :rose-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
    </el-row>
    <!-- 3.底部部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card :header="'分类商品的销量'">
          <line-echart v-bind="showGoodsCategorySale" />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card :header="'分类商品的收藏'">
          <bar-echart v-bind="showGoodsCategoryFavor" />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import countCard from './c-cpns/countCard/count-card.vue'
import useAnalysisStore from '@/stores/analysis/analysis'
import ChartCard from './c-cpns/chartCard/chart-card.vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { PieEchart, LineEchart, RoseEchart, BarEchart, MapEchart } from '@/components/page-echarts'

//发起数据请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysis()

//获取数据
const { amountList, goodsAddressSale, goodsCategoryCount, goodsCategoryFavor, goodsCategorySale } =
  storeToRefs(analysisStore)

//获取数据
//映射数据
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
const showGoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name)
  const values = goodsCategorySale.value.map((item) => item.goodsSale)

  return { labels, values }
})
const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})
const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
</script>
<style scoped lang="less">
.el-row {
  margin-bottom: 10px;
}
</style>
