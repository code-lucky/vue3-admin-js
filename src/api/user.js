import requestMethod from '@/utils/request'

//获取用户信息
export function userInfo() {
    return requestMethod.get('/api/user/userInfo')
}


// 修改用户
export function updateUser(data) {
    return requestMethod.post('/api/user/updateUser', data)
}

// 修改密码
export function updatePassword(data) {
    return requestMethod.post('/api/user/updatePassword', data)
}

// 修改邮箱
export function updateEmail(data) {
    return requestMethod.post('/api/user/updateEmail', data)
}

// 修改邮箱发送验证码
export function updateEmailSendCode(email) {
    return requestMethod.get(`/api/user/updateEmailSendCode?email=${email}`)
}