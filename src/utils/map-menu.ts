export function mapPathBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: any[] = []

  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

//菜单映射到id
export function mapMenuListID(menuList: any[]) {
  const ids: number[] = []

  function recurseGetid(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetid(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetid(menuList)

  return ids
}
