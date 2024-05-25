import requestMethod from '@/utils/request'

// 获取角色列表
export function roleList() {
    return requestMethod.get('/api/role/roleList')
}

// 新增角色
export function create(data) {
    return requestMethod.post('/api/role/create', data)
}

// 更新角色
export function update(id, data) {
    return requestMethod.post(`/api/role/update?${id}`, data)
}