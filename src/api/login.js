import requestMethod from '@/utils/request'

//獲取列表
export function login(params) {
    return requestMethod.post('/api/user/login', params)
}