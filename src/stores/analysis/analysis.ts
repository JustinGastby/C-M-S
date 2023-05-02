import { defineStore } from 'pinia'
import {
  getAmountList,
  getGoodsAddressSale,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale
} from '@/service/main/analysis'

interface IAnalysis {
  amountList: any[]
  goodsCategoryCount: any[]
  goodsCategorySale: any[]
  goodsCategoryFavor: any[]
  goodsAddressSale: any[]
}
const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysis => ({
    amountList: [],
    goodsCategoryCount: [],
    goodsCategorySale: [],
    goodsCategoryFavor: [],
    goodsAddressSale: []
  }),
  actions: {
    async fetchAnalysis() {
      getAmountList().then((res) => {
        this.amountList = res.data
      })
      getCategoryGoodsCount().then((res) => {
        this.goodsCategoryCount = res.data
      })
      getCategoryGoodsSale().then((res) => {
        this.goodsCategorySale = res.data
      })
      getCategoryGoodsFavor().then((res) => {
        this.goodsCategoryFavor = res.data
      })
      getGoodsAddressSale().then((res) => {
        this.goodsAddressSale = res.data
      })
    }
  }
})

export default useAnalysisStore
