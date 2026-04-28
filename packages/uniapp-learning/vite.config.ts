/**
 * Vite 配置文件
 * 配置 UniApp 项目的构建工具
 */

import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

/**
 * 导出 Vite 配置对象
 * 使用 UniApp 插件进行构建
 */
export default defineConfig({
  // 添加 UniApp Vite 插件
  plugins: [uni()],
})