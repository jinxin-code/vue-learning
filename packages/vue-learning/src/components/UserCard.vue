<template>
  <!-- 用户卡片组件 -->
  <div class="user-card">
    <!-- 用户基本信息区域 -->
    <div class="user-info">
      <h3 class="user-name">{{ user.name }}</h3>
      <p class="user-username">@{{ user.username }}</p>
      <p class="user-email">{{ user.email }}</p>
    </div>
    <!-- 操作按钮区域 -->
    <div class="user-actions">
      <!-- 查看详情：路由链接跳转 -->
      <router-link :to="{ name: 'user-detail', params: { id: user.id } }" class="btn btn-primary btn-sm">
        查看详情
      </router-link>
      <!-- 编辑按钮：向父组件发送 edit 事件 -->
      <button @click="$emit('edit', user)" class="btn btn-outline btn-sm">编辑</button>
      <!-- 删除按钮：向父组件发送 delete 事件 -->
      <button @click="$emit('delete', user)" class="btn btn-danger btn-sm">删除</button>
    </div>
  </div>
</template>

<script setup>
// 定义组件接收的 Props
defineProps({
  user: {
    type: Object,
    required: true  // 必填项
  }
})

// 定义组件可发出的事件
defineEmits(['edit', 'delete'])
</script>

<style scoped>
.user-card {
  background-color: var(--color-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 24px;
  transition: transform 0.2s, box-shadow 0.2s;  /* 添加过渡动画 */
}

/* 鼠标悬停时的效果 */
.user-card:hover {
  transform: translateY(-4px);  /* 向上移动 */
  box-shadow: var(--shadow-lg); /* 阴影加深 */
}

.user-info {
  margin-bottom: 20px;
}

.user-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.user-username {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.user-email {
  font-size: 14px;
  color: var(--color-text-secondary);
  word-break: break-all;  /* 防止长邮箱溢出 */
}

.user-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.user-actions a,
.user-actions button {
  flex: 1;
  min-width: 80px;
  text-align: center;
}
</style>