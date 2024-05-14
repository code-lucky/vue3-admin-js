import requestMethod from '@/utils/request'

//获取用户信息
export function userInfo() {
    return requestMethod.get('/api/user/userInfo')
}