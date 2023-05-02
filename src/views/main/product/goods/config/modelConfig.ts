const modelConfig = {
  pageName: 'goods',
  header: {
    newTitle: '新建商品',
    editTitle: '编辑商品'
  },
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '商品名称',
      placeholder: '请输入商品名称'
    },
    {
      type: 'input',
      prop: 'oldPrice',
      label: '商品原价',
      placeholder: '请输入商品原价'
    },
    {
      type: 'input',
      prop: 'newPrice',
      label: '商品现价',
      placeholder: '请输入商品现价'
    },
    {
      type: 'input',
      prop: 'inventoryCount',
      label: '库存',
      placeholder: '请输入商品库存'
    },
    {
      type: 'input',
      prop: 'address',
      label: '地址',
      placeholder: '请输入商品地址'
    }
  ]
}
export default modelConfig
