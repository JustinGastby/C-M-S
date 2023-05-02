const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnText: '新建部门'
  },
  propsList: [
    { type: 'selection', width: '50px' },
    { type: 'index', label: '序号', width: '60px' },
    { type: 'normal', prop: 'name', label: '部门名称', width: '120px' },
    { type: 'normal', prop: 'leader', label: '部门领导', width: '120px' },
    { type: 'normal', prop: 'parentId', label: '上级部门', width: '150px' },

    { type: 'timer', prop: 'createAt', label: '创建时间' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' }
  ]
}

export default contentConfig
