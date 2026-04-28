<template>
  <!-- 用户编辑页面 -->
  <div class="user-edit-view">
    <div class="container">
      <!-- 导航区域：取消编辑返回按钮 -->
      <div class="navigation">
        <button @click="goBack" class="btn btn-outline">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
          取消编辑
        </button>
      </div>

      <!-- 加载中状态（仅在还没有 user 数据时显示） -->
      <div v-if="loading && !user" class="loading-container">
        <LoadingSpinner />
        <p>加载中...</p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error && !user" class="error-container">
        <p class="error-message">{{ error }}</p>
        <button @click="loadUser" class="btn btn-primary">重试</button>
      </div>

      <!-- 编辑表单 -->
      <div v-else-if="user" class="edit-card">
        <h1 class="page-title">编辑用户</h1>
        <p class="page-subtitle">修改用户信息后保存更改</p>

        <!-- 复用 UserForm 组件 -->
        <UserForm
          :user="user"
          mode="edit"
          :loading="saving"
          @submit="handleSave"
          @cancel="goBack"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUsers } from '../composables/useUsers'
import UserForm from '../components/UserForm.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const { fetchUser, updateUser, loading, error } = useUsers()

// 使用 inject 获取从 App.vue 提供的 showToast 方法
const showToast = inject('showToast')

const user = ref(null)
const saving = ref(false)  // 保存中状态

// 加载用户数据
const loadUser = async () => {
  const userId = parseInt(route.params.id)
  user.value = await fetchUser(userId)
}

// 处理保存操作
const handleSave = async (formData) => {
  saving.value = true
  const userId = parseInt(route.params.id)
  const result = await updateUser(userId, formData)
  saving.value = false

  if (result) {
    showToast('用户信息更新成功', 'success')
    // 成功后跳转到用户详情页
    router.push({ name: 'user-detail', params: { id: userId } })
  } else {
    showToast('更新失败，请重试', 'error')
  }
}

// 返回列表页
const goBack = () => {
  router.push({ name: 'home' })
}

// 组件挂载时加载用户
onMounted(() => {
  loadUser()
})
</script>

<style scoped>
.user-edit-view {
  min-height: 100vh;
  padding-bottom: 48px;
}

.navigation {
  padding: 24px 0;
}

.edit-card {
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
  .edit-card {
    padding: 20px;
  }
}
</style>