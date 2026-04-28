<template>
  <!-- 应用根容器 -->
  <div id="app">
    <!-- 路由视图，根据当前 URL 显示对应的页面组件 -->
    <router-view />
    
    <!-- Toast 提示消息组件，根据 toast.show 条件显示 -->
    <Toast v-if="toast.show" :message="toast.message" :type="toast.type" @close="hideToast" />
  </div>
</template>

<script setup>
// 导入 reactive 用于创建响应式对象，provide 用于向下层组件提供数据
import { reactive, provide } from 'vue'
import Toast from './components/Toast.vue'

// 使用 reactive 创建响应式的 toast 状态对象
const toast = reactive({
  show: false,      // 是否显示提示
  message: '',       // 提示消息内容
  type: 'success'    // 提示类型：success 或 error
})

// 显示 Toast 提示的方法
const showToast = (message, type = 'success') => {
  toast.show = true      // 显示 Toast
  toast.message = message // 设置提示消息
  toast.type = type       // 设置提示类型
  // 3秒后自动隐藏 Toast
  setTimeout(() => {
    toast.show = false
  }, 3000)
}

// 隐藏 Toast 的方法
const hideToast = () => {
  toast.show = false
}

// 使用 provide 将 showToast 方法提供给所有子组件使用
provide('showToast', showToast)
</script>

<style scoped>
#app {
  min-height: 100vh;
}
</style>