<template>
  <!-- 用户详情页面 -->
  <div class="user-detail-view">
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

      <!-- 加载中状态 -->
      <div v-if="loading" class="loading-container">
        <LoadingSpinner />
        <p>加载中...</p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="error-container">
        <p class="error-message">{{ error }}</p>
        <button @click="loadUser" class="btn btn-primary">重试</button>
      </div>

      <!-- 用户详情卡片 -->
      <div v-else-if="user" class="user-detail-card">
        <!-- 用户头部：头像 + 名称 -->
        <div class="user-header">
          <div class="user-avatar">
            <!-- 显示用户姓名的首字母作为头像 -->
            {{ user.name.charAt(0).toUpperCase() }}
          </div>
          <div class="user-title">
            <h1 class="user-name">{{ user.name }}</h1>
            <p class="user-username">@{{ user.username }}</p>
          </div>
        </div>

        <!-- 编辑按钮 -->
        <div class="user-actions">
          <router-link :to="{ name: 'user-edit', params: { id: user.id } }" class="btn btn-primary">
            编辑用户
          </router-link>
        </div>

        <!-- 基本信息区块 -->
        <div class="info-section">
          <h2 class="section-title">基本信息</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">用户 ID</span>
              <span class="info-value">{{ user.id }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">电子邮箱</span>
              <a :href="`mailto:${user.email}`" class="info-value link">{{ user.email }}</a>
            </div>
            <div class="info-item">
              <span class="info-label">电话号码</span>
              <span class="info-value">{{ user.phone }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">网站</span>
              <a :href="`https://${user.website}`" target="_blank" class="info-value link">{{ user.website }}</a>
            </div>
          </div>
        </div>

        <!-- 地址信息区块 -->
        <div class="info-section">
          <h2 class="section-title">地址信息</h2>
          <div class="info-grid">
            <div class="info-item full-width">
              <span class="info-label">街道</span>
              <span class="info-value">{{ user.address.street }}, {{ user.address.suite }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">城市</span>
              <span class="info-value">{{ user.address.city }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">邮编</span>
              <span class="info-value">{{ user.address.zipcode }}</span>
            </div>
          </div>
        </div>

        <!-- 公司信息区块 -->
        <div class="info-section">
          <h2 class="section-title">公司信息</h2>
          <div class="info-grid">
            <div class="info-item full-width">
              <span class="info-label">公司名称</span>
              <span class="info-value">{{ user.company.name }}</span>
            </div>
            <div class="info-item full-width">
              <span class="info-label">口号</span>
              <span class="info-value">{{ user.company.catchPhrase }}</span>
            </div>
            <div class="info-item full-width">
              <span class="info-label">业务</span>
              <span class="info-value">{{ user.company.bs }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// useRoute 获取路由信息，useRouter 用于编程式导航
import { useRoute, useRouter } from 'vue-router'
import { useUsers } from '../composables/useUsers'
import LoadingSpinner from '../components/LoadingSpinner.vue'

// 获取路由实例
const route = useRoute()
const router = useRouter()
const { fetchUser, loading, error } = useUsers()

// 存储用户详情的响应式变量
const user = ref(null)

// 加载用户详情
const loadUser = async () => {
  // 从路由参数中获取用户 ID
  const userId = parseInt(route.params.id)
  user.value = await fetchUser(userId)
}

// 返回列表页
const goBack = () => {
  router.push({ name: 'home' })
}

// 组件挂载后加载用户数据
onMounted(() => {
  loadUser()
})
</script>

<style scoped>
.user-detail-view {
  min-height: 100vh;
  padding-bottom: 48px;
}

.navigation {
  padding: 24px 0;
}

.user-detail-card {
  background-color: var(--color-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 32px;
  background: linear-gradient(135deg, var(--color-primary) 0%, #7C3AED 100%);
  color: white;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
}

.user-title {
  flex: 1;
}

.user-name {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
}

.user-username {
  font-size: 16px;
  opacity: 0.9;
  font-family: var(--font-mono);
}

.user-actions {
  padding: 24px 32px;
  border-bottom: 1px solid var(--color-border);
}

.info-section {
  padding: 24px 32px;
  border-bottom: 1px solid var(--color-border);
}

.info-section:last-child {
  border-bottom: none;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 16px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* 占据整行的 item */
.info-item.full-width {
  grid-column: 1 / -1;
}

.info-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 15px;
  color: var(--color-text-primary);
}

.info-value.link {
  color: var(--color-primary);
}

.info-value.link:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .user-header {
    flex-direction: column;
    text-align: center;
    padding: 24px;
  }

  .user-name {
    font-size: 24px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .info-section {
    padding: 20px;
  }

  .user-actions {
    padding: 20px;
  }
}
</style>