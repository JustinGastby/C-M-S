const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnText: '新建角色'
  },
  propsList: [
    { type: 'selection', width: '50px' },
    { type: 'index', label: '序号', width: '60px' },
    { type: 'normal', prop: 'name', label: '角色名称', width: '120px' },
    { type: 'normal', prop: 'intro', label: '角色权限', width: '120px' },
    { type: 'normal', prop: 'intro', label: '权限介绍', width: '150px' },

    { type: 'timer', prop: 'createAt', label: '创建时间' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' }
  ]
}

export default contentConfig
