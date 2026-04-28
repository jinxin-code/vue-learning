// 从 Vue 中导入 createApp 函数，用于创建 Vue 应用实例
import { createApp } from 'vue'

// 导入根组件 App
import App from './App.vue'

// 导入路由配置
import router from './router'

// 导入全局样式
import './style.css'

// 创建 Vue 应用实例，传入根组件 App
const app = createApp(App)

// 使用路由插件
app.use(router)

// 将应用挂载到 id 为 app 的 DOM 元素上
app.mount('#app')