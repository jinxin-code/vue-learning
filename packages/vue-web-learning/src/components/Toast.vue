<template>
  <!-- Toast 消息提示组件：点击可关闭 -->
  <div :class="['toast', `toast-${type}`]" @click="$emit('close')">
    {{ message }}
  </div>
</template>

<script setup>
// 定义 Props
defineProps({
  // 显示的消息内容
  message: String,
  // Toast 类型：success(成功) 或 error(失败)
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error'].includes(value)
  }
})

// 定义事件：close(关闭 Toast)
defineEmits(['close'])
</script>