import { createApp } from 'vue'
import '@/style/reset.scss'
import App from './App.vue'
import router from '@/router/index'
import registerComponent from '@/utils/registerComponent'
import elementplus from 'element-plus'
import 'element-plus/dist/index.css'
// element-plus国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import pinia from '@/store/index'

import '@/mock'

const app = createApp(App)

import { ElLoading } from 'element-plus'

app.directive('loading', ElLoading.directive)
// 注册全局组件
app.use(registerComponent)
// 使用pinia
app.use(pinia)
// 注册路由
app.use(router)
// 注册element-plus
app.use(elementplus, {
  locale: zhCn,
})
app.mount('#app')
