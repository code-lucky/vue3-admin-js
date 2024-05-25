import requestMethod from '@/utils/request'

//獲取列表
export function menuList() {
    return requestMethod.get('/api/menu/menuList')
}


// 获取树形菜单
export function treeMenu() {
    return requestMethod.get('/api/menu/treeMenu')
}

// 获取一级菜单
export function getMenuByTop() {
    return requestMethod.get('/api/menu/getMenuByTop')
}


// 添加菜单
export function createMenu(data) {
    return requestMethod.post('/api/menu/createMenu', data)
}


// 删除菜单
export function deleteMenu(id) {
    return requestMethod.post(`/api/menu/deleteMenu/${id}`)
}