<template>
  <!-- 筛选栏组件 -->
  <div class="filter-bar">
    <!-- 按用户名首字母筛选 -->
    <div class="filter-section">
      <span class="filter-label">按首字母:</span>
      <div class="filter-buttons">
        <button
          v-for="letter in letters"
          :key="letter"
          :class="['filter-btn', { active: activeFilters.letter === letter }]"
          @click="$emit('toggle-filter', 'letter', letter)"
        >
          {{ letter }}
        </button>
      </div>
    </div>

    <!-- 按邮箱域名筛选 -->
    <div class="filter-section">
      <span class="filter-label">按邮箱域名:</span>
      <div class="filter-buttons">
        <button
          v-for="domain in emailDomains"
          :key="domain"
          :class="['filter-btn', { active: activeFilters.emailDomain === domain }]"
          @click="$emit('toggle-filter', 'emailDomain', domain)"
        >
          @{{ domain }}
        </button>
      </div>
    </div>

    <!-- 按姓名长度筛选 -->
    <div class="filter-section">
      <span class="filter-label">按姓名长度:</span>
      <div class="filter-buttons">
        <button
          :class="['filter-btn', { active: activeFilters.nameLength === 'short' }]"
          @click="$emit('toggle-filter', 'nameLength', 'short')"
        >
          短 (&le;10)
        </button>
        <button
          :class="['filter-btn', { active: activeFilters.nameLength === 'medium' }]"
          @click="$emit('toggle-filter', 'nameLength', 'medium')"
        >
          中 (11-15)
        </button>
        <button
          :class="['filter-btn', { active: activeFilters.nameLength === 'long' }]"
          @click="$emit('toggle-filter', 'nameLength', 'long')"
        >
          长 (>15)
        </button>
      </div>
    </div>

    <!-- 清除所有筛选按钮，仅在有激活筛选时显示 -->
    <button
      v-if="hasActiveFilters"
      @click="$emit('clear-filters')"
      class="clear-filters-btn"
    >
      清除所有筛选
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 定义 Props
const props = defineProps({
  activeFilters: {
    type: Object,
    required: true
  },
  emailDomains: {
    type: Array,
    default: () => []
  }
})

// 定义可触发的事件
defineEmits(['toggle-filter', 'clear-filters'])

// 字母表数组
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// 计算属性：判断是否有激活的筛选条件
const hasActiveFilters = computed(() => {
  return props.activeFilters.letter ||
         props.activeFilters.emailDomain ||
         props.activeFilters.nameLength
})
</script>

<style scoped>
.filter-bar {
  background-color: var(--color-card);
  border-radius: var(--radius-lg);
  padding: 20px;
  margin-bottom: 24px;
}

.filter-section {
  margin-bottom: 16px;
}

.filter-section:last-of-type {
  margin-bottom: 16px;
}

.filter-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 10px;
  display: block;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.filter-btn {
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-card);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.filter-btn.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.clear-filters-btn {
  margin-top: 8px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  background-color: transparent;
  border: 1px dashed var(--color-danger);
  border-radius: var(--radius-md);
  color: var(--color-danger);
  cursor: pointer;
  transition: all 0.2s;
}

.clear-filters-btn:hover {
  background-color: var(--color-danger);
  border-style: solid;
  color: white;
}
</style>