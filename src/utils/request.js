import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import { TOKEN } from './constant'
const baseURL = '/api'

const request = axios.create({
  baseURL,
  timeout: 30000
})

var count = 0
let loading

function loadStrat() {
  loading = ElLoading.service({
    lock: false,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  count++
}
function endLoad() {
  count--
  if (count == 0){
    loading.close()
  }
}

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN)
    if (token) {
      config.headers['X-Token'] = token
      config.headers.Authorization = `Bearer ${token}`
    }
    loadStrat()
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
    endLoad()
    const data = response.data
    if (data.code === 200) {
      return data
    }else {
      if (data.data === '用户未登录') {
        window.localStorage.clear()
        window.location.reload()
        ElMessage.error(data.data)
      } else {
        ElMessage.error(data.data)
      }
    }
  },
  error => {
    const data = error.response.data
    if(data.statusCode === 400){
      const message = data.errors.message[0];
      ElMessage.error(message)
    }else if(data.statusCode === 500){
      ElMessage.error(data.message)
    } else {
      ElMessage.error('网络错误')
    }
    endLoad()
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
