<template>
  <view class="container">
    <view v-if="loading" class="loading">
      <text>加载中...</text>
    </view>

    <view v-else-if="error" class="error">
      <text>{{ error }}</text>
      <view class="retry-btn" @click="loadUser">重试</view>
    </view>

    <view v-else-if="user" class="user-detail">
      <view class="user-header">
        <view class="user-avatar-large">{{ user.name.charAt(0) }}</view>
        <view class="user-basic">
          <text class="user-name">{{ user.name }}</text>
          <text class="user-username">@{{ user.username }}</text>
        </view>
      </view>

      <view class="info-section">
        <view class="section-title">联系信息</view>
        <view class="info-item">
          <text class="info-label">邮箱</text>
          <text class="info-value">{{ user.email }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">电话</text>
          <text class="info-value">{{ user.phone }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">网站</text>
          <text class="info-value link">{{ user.website }}</text>
        </view>
      </view>

      <view class="info-section">
        <view class="section-title">地址</view>
        <view class="info-item">
          <text class="info-label">街道</text>
          <text class="info-value">{{ user.address.street }}, {{ user.address.suite }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">城市</text>
          <text class="info-value">{{ user.address.city }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">邮编</text>
          <text class="info-value">{{ user.address.zipcode }}</text>
        </view>
      </view>

      <view class="info-section">
        <view class="section-title">公司</view>
        <view class="info-item">
          <text class="info-label">名称</text>
          <text class="info-value">{{ user.company.name }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">口号</text>
          <text class="info-value">{{ user.company.catchPhrase }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">业务</text>
          <text class="info-value">{{ user.company.bs }}</text>
        </view>
      </view>

      <view class="actions">
        <view class="action-btn edit-btn" @click="goToEdit">
          <text>编辑用户</text>
        </view>
        <view class="action-btn delete-btn" @click="handleDelete">
          <text>删除用户</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUsers, type User } from '../../composables/useUsers'

const { fetchUser, deleteUser, loading, error } = useUsers()

const user = ref<User | null>(null)

const loadUser = async () => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as { options?: { id?: string } }
  const id = currentPage.options?.id ? parseInt(currentPage.options.id) : 1
  
  const result = await fetchUser(id)
  if (result) {
    user.value = result
  }
}

const goToEdit = () => {
  if (user.value) {
    uni.navigateTo({ url: `/pages/edit/edit?id=${user.value.id}` })
  }
}

const handleDelete = () => {
  if (!user.value) return
  
  uni.showModal({
    title: '确认删除',
    content: `确定要删除用户 "${user.value.name}" 吗？`,
    success: async (res) => {
      if (res.confirm) {
        const success = await deleteUser(user.value!.id)
        if (success) {
          uni.showToast({ title: '删除成功', icon: 'success' })
          setTimeout(() => {
            uni.navigateBack()
          }, 1500)
        } else {
          uni.showToast({ title: '删除失败', icon: 'none' })
        }
      }
    }
  })
}

onMounted(() => {
  loadUser()
})
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
  min-height: 100vh;
  background: #f5f5f5;
}

.loading, .error {
  text-align: center;
  padding: 100rpx 0;
  font-size: 28rpx;
  color: #999999;
}

.retry-btn {
  margin-top: 30rpx;
  display: inline-block;
  padding: 20rpx 60rpx;
  background: #4080ff;
  color: #ffffff;
  border-radius: 8rpx;
  font-size: 28rpx;
}

.user-detail {
  background: #ffffff;
  border-radius: 12rpx;
  overflow: hidden;
}

.user-header {
  background: linear-gradient(135deg, #4080ff, #60a0ff);
  padding: 40rpx;
  display: flex;
  align-items: center;
}

.user-avatar-large {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  color: #ffffff;
  font-size: 48rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30rpx;
}

.user-basic {
  color: #ffffff;
}

.user-name {
  font-size: 40rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 8rpx;
}

.user-username {
  font-size: 28rpx;
  opacity: 0.9;
}

.info-section {
  padding: 30rpx;
  border-bottom: 1rpx solid #f5f5f5;

  &:last-of-type {
    border-bottom: none;
  }
}

.section-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 20rpx;
  padding-bottom: 15rpx;
  border-bottom: 2rpx solid #e6f0ff;
}

.info-item {
  display: flex;
  padding: 15rpx 0;
}

.info-label {
  width: 140rpx;
  font-size: 26rpx;
  color: #999999;
}

.info-value {
  flex: 1;
  font-size: 28rpx;
  color: #333333;

  &.link {
    color: #4080ff;
    text-decoration: underline;
  }
}

.actions {
  padding: 30rpx;
  display: flex;
  gap: 20rpx;
}

.action-btn {
  flex: 1;
  padding: 24rpx;
  border-radius: 8rpx;
  text-align: center;
  font-size: 30rpx;

  &.edit-btn {
    background: #e6f0ff;
    color: #4080ff;
  }

  &.delete-btn {
    background: #fff2f0;
    color: #ff4d4f;
  }
}
</style>