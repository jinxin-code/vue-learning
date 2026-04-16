<template>
  <!-- 搜索栏组件：支持 v-model 双向绑定 -->
  <div class="search-bar">
    <!-- 搜索图标 -->
    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>
    <!-- 搜索输入框 -->
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"  <!-- 输入时触发事件更新值 -->
      placeholder="搜索用户名或姓名..."
      class="search-input"
    />
    <!-- 清除按钮：仅在有输入时显示 -->
    <button v-if="modelValue" @click="$emit('update:modelValue', '')" class="clear-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
// 定义 Props，modelValue 是 v-model 的约定属性名
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

// 定义事件，update:modelValue 是 v-model 的约定事件名
defineEmits(['update:modelValue'])
</script>

<style scoped>
.search-bar {
  position: relative;  /* 相对定位，用于绝对定位子元素 */
  width: 100%;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);  /* 垂直居中 */
  color: var(--color-text-secondary);
  pointer-events: none;  /* 让点击穿透到输入框 */
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 44px;  /* 左右留出空间放图标 */
  font-size: 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-card);
  transition: border-color 0.2s, box-shadow 0.2s;
}

/* 输入框获得焦点时的样式 */
.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);  /* 外发光效果 */
}

.search-input::placeholder {
  color: var(--color-text-secondary);
}

.clear-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  color: var(--color-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s;
}

.clear-btn:hover {
  background-color: var(--color-background);
  color: var(--color-text-primary);
}
</style>