const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnText: '新建菜单'
  },
  propsList: [
    { prop: 'name', label: '菜单名称', width: '160px' },
    { prop: 'type', label: '级别', width: '70px' },
    { prop: 'url', label: '菜单url', width: '150px' },
    { prop: 'icon', label: '菜单icon', width: '150px' },
    { prop: 'sort', label: '排序', width: '100px' },
    { prop: 'permission', label: '权限', width: '120px' },

    { type: 'timer', prop: 'createAt', label: '创建时间' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' }
  ]
}

export default contentConfig
