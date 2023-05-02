<template>
  <div class="echart" ref="echartRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import ChinaJSON from '../data/china.json'

echarts.registerMap('china', ChinaJSON as any)

interface IProps {
  option: EChartsOption
}
const props = defineProps<IProps>()
const echartRef = ref<HTMLElement>()
onMounted(() => {
  //echart实例
  const echartInstance = echarts.init(echartRef.value!, 'light', { renderer: 'canvas' })
  //设置
  watchEffect(() => echartInstance.setOption(props.option))
  // 3.监听window缩放
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
})
</script>
<style scoped lang="less">
.echart {
  height: 300px;
}
</style>
