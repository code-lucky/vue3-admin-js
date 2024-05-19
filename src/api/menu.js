import requestMethod from '@/utils/request'

//獲取列表
export function menuList() {
    return requestMethod.get('/api/menu/menuList')
}


// 获取树形菜单
export function treeMenu() {
    return requestMethod.get('/api/menu/treeMenu')
}