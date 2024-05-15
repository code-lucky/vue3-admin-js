import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index.js'
import './permission.js'

const app = createApp(App)

app.config.globalProperties.$fileUrl = `http://127.0.0.1:4087/api/images/`
app.config.globalProperties.$uploadUrl = `/api/api/file/upload/`

app.use(ElementPlus)
app.use(router)

app.mount('#app')
