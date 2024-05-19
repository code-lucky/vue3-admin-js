import requestMethod from '@/utils/request'

// 获取角色列表
export function roleList() {
    return requestMethod.get('/api/role/roleList')
}