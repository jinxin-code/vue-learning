<template>
  <!-- 用户列表页面容器 -->
  <div class="user-list-view">
    <div class="container">
      <!-- 页面头部 -->
      <header class="page-header">
        <div class="header-top">
          <div>
            <h1 class="page-title">用户列表</h1>
            <!-- 显示用户总数，使用插值表达式 -->
            <p class="page-subtitle">共 {{ filteredUsers.length }} 位用户</p>
          </div>
          <!-- 路由链接，跳转到新增用户页面 -->
          <router-link :to="{ name: 'user-new' }" class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            新增用户
          </router-link>
        </div>
      </header>

      <!-- 搜索栏组件，使用 v-model 双向绑定 -->
      <SearchBar v-model="searchQuery" />

      <!-- 筛选栏组件 -->
      <FilterBar
        :active-filters="activeFilters"
        :email-domains="emailDomains"
        @toggle-filter="toggleFilter"
        @clear-filters="clearFilters"
      />

      <!-- 加载中状态 -->
      <div v-if="loading" class="loading-container">
        <LoadingSpinner />
        <p>加载中...</p>
      </div>

      <!-- 错误状态，提供重试按钮 -->
      <div v-else-if="error" class="error-container">
        <p class="error-message">{{ error }}</p>
        <button @click="fetchUsers" class="btn btn-primary">重试</button>
      </div>

      <!-- 空数据状态 -->
      <div v-else-if="filteredUsers.length === 0" class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <!-- 条件渲染：根据是否有搜索或筛选显示不同提示 -->
        <p v-if="searchQuery || hasActiveFilters">没有找到匹配的用户</p>
        <p v-else>暂无用户数据</p>
      </div>

      <!-- 用户卡片网格，使用 v-for 遍历渲染用户列表 -->
      <div v-else class="grid grid-cols-3">
        <UserCard
          v-for="user in filteredUsers"
          :key="user.id"
          :user="user"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>
    </div>

    <!-- 删除确认弹窗 -->
    <DeleteConfirmModal
      :show="showDeleteModal"
      :user-name="userToDelete?.name"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup>
// 导入 Vue 的响应式和生命周期钩子
import { ref, computed, onMounted, watch } from 'vue'
// 导入路由钩子
import { useRouter } from 'vue-router'
// 导入自定义的 useUsers 组合式函数
import { useUsers } from '../composables/useUsers'
// 导入子组件
import UserCard from '../components/UserCard.vue'
import SearchBar from '../components/SearchBar.vue'
import FilterBar from '../components/FilterBar.vue'
import DeleteConfirmModal from '../components/DeleteConfirmModal.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

// 获取路由实例
const router = useRouter()
// 从 useUsers 中解构出需要的状态和方法
const {
  loading,
  error,
  searchQuery,
  activeFilters,
  filteredUsers,
  emailDomains,
  fetchUsers,
  deleteUser,
  setSearchQuery,
  toggleFilter,
  clearFilters
} = useUsers()

// 定义本地响应式状态
const showDeleteModal = ref(false)  // 是否显示删除确认弹窗
const userToDelete = ref(null)       // 要删除的用户

// 计算属性：判断是否有激活的筛选条件
const hasActiveFilters = computed(() => {
  return activeFilters.value.letter ||
         activeFilters.value.emailDomain ||
         activeFilters.value.nameLength
})

// 搜索防抖：避免用户输入时频繁触发搜索
let debounceTimer = null
// watch 监听 searchQuery 的变化
watch(searchQuery, (newQuery) => {
  clearTimeout(debounceTimer)  // 清除之前的定时器
  debounceTimer = setTimeout(() => {
    setSearchQuery(newQuery)    // 300ms 后再执行搜索
  }, 300)
})

// onMounted 生命周期钩子：组件挂载后执行
onMounted(() => {
  fetchUsers()  // 获取用户列表
})

// 处理编辑按钮点击：跳转到编辑页面
const handleEdit = (user) => {
  router.push({ name: 'user-edit', params: { id: user.id } })
}

// 处理删除按钮点击：显示确认弹窗
const handleDelete = (user) => {
  userToDelete.value = user
  showDeleteModal.value = true
}

// 确认删除
const confirmDelete = async () => {
  if (userToDelete.value) {
    await deleteUser(userToDelete.value.id)
    showDeleteModal.value = false
    userToDelete.value = null
  }
}

// 取消删除
const cancelDelete = () => {
  showDeleteModal.value = false
  userToDelete.value = null
}
</script>

<style scoped>
.user-list-view {
  min-height: 100vh;
  padding-bottom: 48px;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

/* 移动端响应式样式 */
@media (max-width: 640px) {
  .header-top {
    flex-direction: column;
    align-items: stretch;
  }

  .header-top .btn {
    justify-content: center;
  }
}
</style>