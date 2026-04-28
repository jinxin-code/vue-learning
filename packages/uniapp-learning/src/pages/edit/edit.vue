<template>
  <view class="container">
    <view v-if="loading" class="loading">
      <text>加载中...</text>
    </view>

    <view v-else class="form-container">
      <view class="form-group">
        <text class="form-label">姓名 *</text>
        <input
          class="form-input"
          placeholder="请输入姓名"
          v-model="formData.name"
        />
      </view>

      <view class="form-group">
        <text class="form-label">用户名 *</text>
        <input
          class="form-input"
          placeholder="请输入用户名"
          v-model="formData.username"
        />
      </view>

      <view class="form-group">
        <text class="form-label">邮箱 *</text>
        <input
          class="form-input"
          placeholder="请输入邮箱"
          v-model="formData.email"
        />
      </view>

      <view class="form-group">
        <text class="form-label">电话</text>
        <input
          class="form-input"
          placeholder="请输入电话"
          v-model="formData.phone"
        />
      </view>

      <view class="form-group">
        <text class="form-label">网站</text>
        <input
          class="form-input"
          placeholder="请输入网站"
          v-model="formData.website"
        />
      </view>

      <view class="form-group">
        <text class="form-label">公司名称</text>
        <input
          class="form-input"
          placeholder="请输入公司名称"
          v-model="formData.companyName"
        />
      </view>

      <view class="form-actions">
        <view class="form-btn cancel-btn" @click="goBack">
          <text>取消</text>
        </view>
        <view class="form-btn submit-btn" @click="handleSubmit">
          <text>保存</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useUsers } from '../../composables/useUsers'

const { fetchUser, updateUser } = useUsers()

const formData = reactive({
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
  companyName: ''
})

const loading = reactive({ value: true })

const loadUser = async () => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as { options?: { id?: string } }
  const id = currentPage.options?.id ? parseInt(currentPage.options.id) : 1
  
  const user = await fetchUser(id)
  if (user) {
    formData.name = user.name
    formData.username = user.username
    formData.email = user.email
    formData.phone = user.phone || ''
    formData.website = user.website || ''
    formData.companyName = user.company?.name || ''
  }
  loading.value = false
}

const goBack = () => {
  uni.navigateBack()
}

const validateForm = (): boolean => {
  if (!formData.name.trim()) {
    uni.showToast({ title: '请输入姓名', icon: 'none' })
    return false
  }
  if (!formData.username.trim()) {
    uni.showToast({ title: '请输入用户名', icon: 'none' })
    return false
  }
  if (!formData.email.trim()) {
    uni.showToast({ title: '请输入邮箱', icon: 'none' })
    return false
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    uni.showToast({ title: '请输入正确的邮箱格式', icon: 'none' })
    return false
  }
  return true
}

const handleSubmit = async () => {
  if (!validateForm()) return

  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as { options?: { id?: string } }
  const id = currentPage.options?.id ? parseInt(currentPage.options.id) : 1

  const success = await updateUser(id, {
    name: formData.name,
    username: formData.username,
    email: formData.email,
    phone: formData.phone,
    website: formData.website,
    company: {
      name: formData.companyName,
      catchPhrase: '',
      bs: ''
    }
  })

  if (success) {
    uni.showToast({ title: '更新成功', icon: 'success' })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  } else {
    uni.showToast({ title: '更新失败', icon: 'none' })
  }
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

.loading {
  text-align: center;
  padding: 100rpx 0;
  font-size: 28rpx;
  color: #999999;
}

.form-container {
  background: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
}

.form-group {
  margin-bottom: 30rpx;
}

.form-label {
  font-size: 28rpx;
  color: #333333;
  margin-bottom: 15rpx;
  display: block;
}

.form-input {
  width: 100%;
  padding: 24rpx;
  border: 2rpx solid #e8e8e8;
  border-radius: 8rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #4080ff;
}

.form-actions {
  display: flex;
  gap: 20rpx;
  margin-top: 40rpx;
}

.form-btn {
  flex: 1;
  padding: 28rpx;
  border-radius: 8rpx;
  text-align: center;
  font-size: 30rpx;

  &.cancel-btn {
    background: #f5f5f5;
    color: #666666;
  }

  &.submit-btn {
    background: #4080ff;
    color: #ffffff;
  }
}
</style>