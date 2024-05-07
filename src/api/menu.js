import requestMethod from '@/utils/request'

//獲取列表
export function menuList() {
    return requestMethod.get('/api/menu/menuList')
}