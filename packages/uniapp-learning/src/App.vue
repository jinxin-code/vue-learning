<template>
  <!-- 应用根容器 -->
  <view class="app-container">
    <!-- 路由视图，根据当前页面路径显示对应的页面组件 -->
    <router-view />
  </view>
</template>

<script setup lang="ts">
/**
 * App.vue - UniApp 根组件
 * 作为应用的根组件，负责管理全局生命周期和全局样式
 */

import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

/**
 * 应用启动时触发（仅执行一次）
 * 可在此处进行应用初始化操作
 */
onLaunch(() => {
  console.log('App Launch - 应用启动')
})

/**
 * 应用显示在前台时触发
 * 可在此处进行页面激活相关操作
 */
onShow(() => {
  console.log('App Show - 应用显示')
})

/**
 * 应用隐藏到后台时触发
 * 可在此处进行资源释放等操作
 */
onHide(() => {
  console.log('App Hide - 应用隐藏')
})
</script>

<style lang="scss">
/**
 * 全局样式文件
 * 定义应用的全局样式变量和通用样式
 */

/** 页面基础样式 */
page {
  background-color: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 28rpx;
  color: #333333;
}

/** 应用根容器 */
.app-container {
  min-height: 100vh;
}

/** 容器通用样式 */
.container {
  padding: 20rpx;
}

/** 卡片样式 */
.card {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

/** 按钮基础样式 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 20rpx 40rpx;
  border-radius: 8rpx;
  font-size: 28rpx;
  font-weight: 500;
  transition: all 0.3s;
}

/** 主要按钮 */
.btn-primary {
  background-color: #4080ff;
  color: #ffffff;
}

.btn-primary:active {
  background-color: #3070ee;
}

/** 危险按钮 */
.btn-danger {
  background-color: #ff4d4f;
  color: #ffffff;
}

.btn-danger:active {
  background-color: #cf1322;
}

/** 边框按钮 */
.btn-outline {
  background-color: transparent;
  color: #4080ff;
  border: 2rpx solid #4080ff;
}

.btn-outline:active {
  background-color: #f0f5ff;
}

/** 输入框样式 */
input {
  width: 100%;
  padding: 24rpx;
  border: 2rpx solid #e8e8e8;
  border-radius: 8rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

input:focus {
  border-color: #4080ff;
  outline: none;
}

/** Toast 提示样式 */
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  padding: 30rpx 50rpx;
  border-radius: 12rpx;
  font-size: 28rpx;
  z-index: 9999;
}

.toast-success {
  background-color: rgba(64, 128, 255, 0.9);
}

.toast-error {
  background-color: rgba(255, 77, 79, 0.9);
}
</style>