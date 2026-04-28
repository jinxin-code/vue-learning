<template>
  <!-- 用户表单组件：支持新增和编辑模式 -->
  <form @submit.prevent="handleSubmit" class="user-form">
    <!-- 姓名字段 -->
    <div class="form-group">
      <label for="name" class="form-label">姓名 <span class="required">*</span></label>
      <input
        id="name"
        v-model="formData.name"
        type="text"
        class="form-input"
        :class="{ error: errors.name }"
        placeholder="请输入用户姓名"
      />
      <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
    </div>

    <!-- 用户名字段 -->
    <div class="form-group">
      <label for="username" class="form-label">用户名 <span class="required">*</span></label>
      <input
        id="username"
        v-model="formData.username"
        type="text"
        class="form-input"
        :class="{ error: errors.username }"
        placeholder="请输入用户名"
      />
      <p v-if="errors.username" class="form-error">{{ errors.username }}</p>
    </div>

    <!-- 邮箱字段 -->
    <div class="form-group">
      <label for="email" class="form-label">电子邮箱 <span class="required">*</span></label>
      <input
        id="email"
        v-model="formData.email"
        type="email"
        class="form-input"
        :class="{ error: errors.email }"
        placeholder="请输入电子邮箱"
      />
      <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
    </div>

    <!-- 操作按钮 -->
    <div class="form-actions">
      <button type="button" @click="$emit('cancel')" class="btn btn-outline">
        取消
      </button>
      <button type="submit" class="btn btn-primary" :disabled="loading">
        <!-- 根据 loading 和 mode 动态显示按钮文字 -->
        {{ loading ? '提交中...' : (mode === 'create' ? '提交' : '保存') }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'

// 定义 Props
const props = defineProps({
  user: {
    type: Object,
    default: null
  },
  mode: {
    type: String,
    default: 'create',
    validator: (value) => ['create', 'edit'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

// 使用 reactive 创建响应式表单数据对象
const formData = reactive({
  name: '',
  username: '',
  email: ''
})

// 使用 reactive 创建响应式错误信息对象
const errors = reactive({
  name: '',
  username: '',
  email: ''
})

// watch 监听 user 的变化：如果是编辑模式，自动填充表单
watch(() => props.user, (newUser) => {
  if (newUser) {
    formData.name = newUser.name || ''
    formData.username = newUser.username || ''
    formData.email = newUser.email || ''
  } else {
    formData.name = ''
    formData.username = ''
    formData.email = ''
  }
}, { immediate: true })  // immediate: true 表示组件创建时立即执行一次

// 表单验证函数
const validate = () => {
  let isValid = true
  // 先清空之前的错误
  errors.name = ''
  errors.username = ''
  errors.email = ''

  // 验证姓名
  if (!formData.name.trim()) {
    errors.name = '姓名不能为空'
    isValid = false
  }

  // 验证用户名
  if (!formData.username.trim()) {
    errors.username = '用户名不能为空'
    isValid = false
  } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
    errors.username = '用户名只能包含字母、数字和下划线'
    isValid = false
  }

  // 验证邮箱
  if (!formData.email.trim()) {
    errors.email = '邮箱不能为空'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = '请输入有效的邮箱地址'
    isValid = false
  }

  return isValid
}

// 处理表单提交
const handleSubmit = () => {
  // 验证通过后才发送 submit 事件
  if (validate()) {
    emit('submit', { ...formData })  // 展开运算符创建对象副本
  }
}
</script>

<style scoped>
.user-form {
  max-width: 500px;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.form-actions button {
  flex: 1;
}

.required {
  color: var(--color-danger);
}
</style>