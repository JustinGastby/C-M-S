const contentConfig = {
  pageName: 'goods',
  header: {
    title: '商品列表',
    btnText: '新建商品'
  },
  propsList: [
    { type: 'selection', width: '50px' },
    { type: 'index', label: '序号', width: '60px' },
    { type: 'normal', prop: 'name', label: '商品名称', width: '120px' },
    { type: 'normal', prop: 'oldPrice', label: '原价', width: '70px' },
    { type: 'normal', prop: 'newPrice', label: '现价', width: '70px' },
    { type: 'normal', prop: 'desc', label: '商品描述', width: '120px' },
    { type: 'img', prop: 'imgUrl', label: '图片', slotname: 'image' },
    { type: 'normal', prop: 'inventoryCount', label: '库存', width: '70px' },
    { type: 'normal', prop: 'saleCount', label: '销量', width: '70px' },
    { type: 'normal', prop: 'favorCount', label: '收藏', width: '70px' },
    { type: 'normal', prop: 'address', label: '地址', width: '70px' },

    { type: 'timer', prop: 'createAt', label: '创建时间' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' }
  ]
}

export default contentConfig
