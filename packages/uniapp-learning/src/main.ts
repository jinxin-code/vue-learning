/**
 * UniApp 应用入口文件
 * 负责创建 Vue 应用实例并启动应用
 */

import { createSSRApp } from 'vue'
import App from './App.vue'

/**
 * 创建 Vue 应用实例
 * @returns 返回包含应用实例的对象
 */
export function createApp() {
  // 使用 createSSRApp 创建支持 SSR 的 Vue 应用实例
  const app = createSSRApp(App)
  
  // 返回应用实例，供 UniApp 框架使用
  return {
    app
  }
}