import { defineStore } from 'pinia'
import {
  getPageListData,
  deletePageData,
  editPageData,
  newPageData,
  getDepartmentData,
  getRoleData,
  getMenuData
} from '@/service/main/system'

interface ISystemState {
  pageList: any[]
  pageTotalCount: number
  entireRoles: any[]
  entireDepartment: any[]
  entireMenus: any[]
}
const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    pageList: [],
    pageTotalCount: 0,
    entireRoles: [],
    entireDepartment: [],
    entireMenus: []
  }),
  actions: {
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await getPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data

      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageById(pageName: string, id: number) {
      const deleteResult = await deletePageData(pageName, id)

      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async newPageDateAction(pageName: string, dataInfo: any) {
      const newResult = await newPageData(pageName, dataInfo)

      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async editPageDateAction(pageName: string, id: number, dataInfo: any) {
      const editResult = await editPageData(pageName, id, dataInfo)

      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async postEntireDate(queryInfo: any) {
      const rolesResult = await getRoleData(queryInfo)
      const departmentResult = await getDepartmentData(queryInfo)
      const menuList = await getMenuData()

      console.log(menuList)

      this.entireMenus = menuList.data.list
      this.entireRoles = rolesResult.data.list
      this.entireDepartment = departmentResult.data.list
    }
  }
})

export default useSystemStore
