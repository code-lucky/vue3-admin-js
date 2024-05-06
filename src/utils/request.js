import axios from 'axios'
import { ElMessage } from 'element-plus'
import catchs from '@/utils/cache'

const baseURL = '/api'

const request = axios.create({
  baseURL,
  timeout: 30000
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = catchs.getCache('TOKEN')
    if (token) {
      config.headers['X-Token'] = token
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.log("请求出错", error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    if (response.data.code === 200) {
      return response.data
    } else {
      if (response.data.data === '用户未登录') {
        window.localStorage.clear()
        window.location.reload()
        ElMessage.error(response.data.data)
      } else {
        ElMessage.error(response.data.data)
      }
    }
  },
  error => {
    console.log('响应出错', error)
    if (error.response && error.response.status === 403) {
      ElMessage.error('发生了错误')
    } else if (error.response && error.response.data && error.response.data.data) {
      ElMessage.error(error.response.data.data)
    } else {
      ElMessage.error('网络错误')
    }
    return Promise.reject(error)
  }
)

const requestMethod = {
  get(url, config = {}) {
    return request.get(url, config)
  },
  post(url, data = {}, config = {}) {
    return request.post(url, data, config)
  }
}

export default requestMethod
