<template>
  <!-- 删除确认弹窗：使用 Teleport 组件将弹窗挂载到 body 上 -->
  <Teleport to="body">
    <!-- 弹窗遮罩层：点击遮罩层触发 cancel -->
    <div v-if="show" class="modal-overlay" @click.self="$emit('cancel')">
      <!-- 弹窗内容 -->
      <div class="modal-content">
        <h3 class="modal-title">确认删除</h3>
        <p class="modal-body">
          确定要删除用户 <strong>{{ userName }}</strong> 吗？此操作无法撤销。
        </p>
        <div class="modal-actions">
          <!-- 取消按钮 -->
          <button @click="$emit('cancel')" class="btn btn-outline">取消</button>
          <!-- 确认删除按钮 -->
          <button @click="$emit('confirm')" class="btn btn-danger">确认删除</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
// 定义 Props
defineProps({
  // 控制弹窗是否显示
  show: {
    type: Boolean,
    required: true
  },
  // 要删除的用户名
  userName: {
    type: String,
    default: ''
  }
})

// 定义事件：confirm(确认删除) 和 cancel(取消)
defineEmits(['confirm', 'cancel'])
</script>