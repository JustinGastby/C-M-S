const contentConfig = {
  pageName: 'category',
  header: {
    title: '类别列表',
    btnText: '新建类别'
  },
  propsList: [
    { type: 'selection', width: '50px' },
    { type: 'index', label: '序号', width: '60px' },
    { type: 'normal', prop: 'name', label: '类别名称', width: '120px' },

    { type: 'timer', prop: 'createAt', label: '创建时间' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' }
  ]
}

export default contentConfig
