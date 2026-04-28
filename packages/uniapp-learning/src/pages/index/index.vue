<template>
  <view class="container">
    <view class="search-bar">
      <input
        class="search-input"
        placeholder="搜索用户名或姓名"
        :value="searchQuery"
        @input="onSearchInput"
      />
    </view>

    <view class="filter-bar">
      <view class="filter-section">
        <text class="filter-label">首字母</text>
        <view class="filter-options">
          <text
            v-for="letter in letters"
            :key="letter"
            :class="['filter-tag', { active: activeFilters.letter === letter }]"
            @click="toggleFilter('letter', letter)"
          >{{ letter }}</text>
        </view>
      </view>

      <view class="filter-section">
        <text class="filter-label">邮箱域名</text>
        <view class="filter-options">
          <text
            v-for="domain in emailDomains"
            :key="domain"
            :class="['filter-tag', { active: activeFilters.emailDomain === domain }]"
            @click="toggleFilter('emailDomain', domain)"
          >{{ domain }}</text>
        </view>
      </view>

      <view class="filter-section">
        <text class="filter-label">姓名长度</text>
        <view class="filter-options">
          <text
            v-for="len in nameLengthOptions"
            :key="len.value"
            :class="['filter-tag', { active: activeFilters.nameLength === len.value }]"
            @click="toggleFilter('nameLength', len.value)"
          >{{ len.label }}</text>
        </view>
      </view>

      <view v-if="hasActiveFilters" class="clear-btn" @click="clearFilters">
        <text>清除筛选</text>
      </view>
    </view>

    <view v-if="loading" class="loading">
      <text>加载中...</text>
    </view>

    <view v-else-if="error" class="error">
      <text>{{ error }}</text>
    </view>

    <view v-else-if="filteredUsers.length === 0" class="empty">
      <text>暂无用户数据</text>
    </view>

    <view v-else class="user-list">
      <view v-for="user in filteredUsers" :key="user.id" class="user-card">
        <view class="user-info">
          <view class="user-avatar">{{ user.name.charAt(0) }}</view>
          <view class="user-details">
            <text class="user-name">{{ user.name }}</text>
            <text class="user-username">@{{ user.username }}</text>
            <text class="user-email">{{ user.email }}</text>
          </view>
        </view>
        <view class="user-actions">
          <view class="action-btn view-btn" @click="goToDetail(user.id)">
            <text>查看</text>
          </view>
          <view class="action-btn edit-btn" @click="goToEdit(user.id)">
            <text>编辑</text>
          </view>
          <view class="action-btn delete-btn" @click="handleDelete(user)">
            <text>删除</text>
          </view>
        </view>
      </view>
    </view>

    <view class="add-btn" @click="goToAdd">
      <text class="add-icon">+</text>
      <text>新增用户</text>
    </view>

    <view v-if="toast.show" :class="['toast', toast.type]">
      <text>{{ toast.message }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'
import { useUsers, type User } from '../../composables/useUsers'

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

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const nameLengthOptions = [
  { value: 'short', label: '短' },
  { value: 'medium', label: '中' },
  { value: 'long', label: '长' }
]

const toast = reactive({
  show: false,
  message: '',
  type: 'success' as 'success' | 'error'
})

const hasActiveFilters = computed(() => {
  return activeFilters.value.letter || activeFilters.value.emailDomain || activeFilters.value.nameLength
})

const onSearchInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  setSearchQuery(target.value)
}

const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  toast.show = true
  toast.message = message
  toast.type = type
  setTimeout(() => {
    toast.show = false
  }, 3000)
}

const goToDetail = (id: number) => {
  uni.navigateTo({ url: `/pages/detail/detail?id=${id}` })
}

const goToEdit = (id: number) => {
  uni.navigateTo({ url: `/pages/edit/edit?id=${id}` })
}

const goToAdd = () => {
  uni.navigateTo({ url: '/pages/add/add' })
}

const handleDelete = (user: User) => {
  uni.showModal({
    title: '确认删除',
    content: `确定要删除用户 "${user.name}" 吗？`,
    success: async (res) => {
      if (res.confirm) {
        const success = await deleteUser(user.id)
        if (success) {
          showToast('删除成功')
        } else {
          showToast('删除失败', 'error')
        }
      }
    }
  })
}

onMounted(() => {
  fetchUsers()
})
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
  padding-bottom: 160rpx;
}

.search-bar {
  margin-bottom: 20rpx;
}

.search-input {
  width: 100%;
  padding: 24rpx;
  background: #ffffff;
  border-radius: 12rpx;
  font-size: 28rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.filter-bar {
  background: #ffffff;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.filter-section {
  margin-bottom: 20rpx;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.filter-label {
  font-size: 24rpx;
  color: #999999;
  margin-bottom: 12rpx;
  display: block;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
}

.filter-tag {
  padding: 12rpx 24rpx;
  background: #f5f5f5;
  border-radius: 20rpx;
  font-size: 24rpx;
  color: #666666;

  &.active {
    background: #e6f0ff;
    color: #4080ff;
  }
}

.clear-btn {
  margin-top: 20rpx;
  padding-top: 20rpx;
  border-top: 1rpx solid #f0f0f0;
  text-align: center;
  font-size: 24rpx;
  color: #999999;
}

.loading, .error, .empty {
  text-align: center;
  padding: 100rpx 0;
  font-size: 28rpx;
  color: #999999;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.user-card {
  background: #ffffff;
  border-radius: 12rpx;
  padding: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.user-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #4080ff, #60a0ff);
  color: #ffffff;
  font-size: 32rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
  display: block;
  margin-bottom: 8rpx;
}

.user-username {
  font-size: 24rpx;
  color: #999999;
  display: block;
  margin-bottom: 8rpx;
}

.user-email {
  font-size: 24rpx;
  color: #666666;
  display: block;
}

.user-actions {
  display: flex;
  gap: 20rpx;
}

.action-btn {
  flex: 1;
  padding: 20rpx;
  border-radius: 8rpx;
  text-align: center;
  font-size: 26rpx;

  &.view-btn {
    background: #f5f5f5;
    color: #666666;
  }

  &.edit-btn {
    background: #e6f0ff;
    color: #4080ff;
  }

  &.delete-btn {
    background: #fff2f0;
    color: #ff4d4f;
  }
}

.add-btn {
  position: fixed;
  bottom: 120rpx;
  right: 30rpx;
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 24rpx 40rpx;
  background: #4080ff;
  color: #ffffff;
  border-radius: 40rpx;
  font-size: 30rpx;
  box-shadow: 0 8rpx 24rpx rgba(64, 128, 255, 0.4);
}

.add-icon {
  font-size: 40rpx;
  font-weight: bold;
}

.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30rpx 50rpx;
  border-radius: 12rpx;
  font-size: 28rpx;
  color: #ffffff;
  z-index: 9999;

  &.success {
    background: rgba(64, 128, 255, 0.9);
  }

  &.error {
    background: rgba(255, 77, 79, 0.9);
  }
}
</style>