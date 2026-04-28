<template>
  <!-- 新增用户页面 -->
  <div class="user-new-view">
    <div class="container">
      <!-- 导航区域：返回按钮 -->
      <div class="navigation">
        <button @click="goBack" class="btn btn-outline">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
          返回列表
        </button>
      </div>

      <!-- 新增用户表单 -->
      <div class="new-user-card">
        <h1 class="page-title">新增用户</h1>
        <p class="page-subtitle">填写用户信息以创建新用户</p>

        <!-- 复用 UserForm 组件 -->
        <UserForm
          mode="create"
          :loading="creating"
          @submit="handleCreate"
          @cancel="goBack"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useUsers } from '../composables/useUsers'
import UserForm from '../components/UserForm.vue'

const router = useRouter()
const { createUser } = useUsers()

// 使用 inject 获取全局的 toast 方法
const showToast = inject('showToast')

const creating = ref(false)  // 创建中状态

// 处理创建用户
const handleCreate = async (formData) => {
  creating.value = true
  const result = await createUser(formData)
  creating.value = false

  if (result) {
    showToast('用户创建成功', 'success')
    // 成功后跳转到列表页
    router.push({ name: 'home' })
  } else {
    showToast('创建失败，请重试', 'error')
  }
}

// 返回列表页
const goBack = () => {
  router.push({ name: 'home' })
}
</script>

<style scoped>
.user-new-view {
  min-height: 100vh;
  padding-bottom: 48px;
}

.navigation {
  padding: 24px 0;
}

.new-user-card {
  background-color: var(--color-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 32px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 32px;
}

@media (max-width: 640px) {
  .new-user-card {
    padding: 20px;
  }
}
</style>