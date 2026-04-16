// 从 Vue 中导入 ref（响应式引用）和 computed（计算属性）
import { ref, computed } from 'vue'

// ========== 全局状态定义（使用 ref 创建响应式变量） ==========

// 用户列表数据，初始为空数组
const users = ref([])
// 加载状态，用于显示加载动画
const loading = ref(false)
// 错误信息，用于存储请求失败时的错误
const error = ref(null)
// 搜索查询字符串
const searchQuery = ref('')
// 当前激活的筛选条件对象
const activeFilters = ref({
  letter: null,        // 按用户名首字母筛选
  emailDomain: null,   // 按邮箱域名筛选
  nameLength: null     // 按姓名长度筛选
})

// API 基础地址
const API_BASE = 'https://jsonplaceholder.typicode.com'

// ========== 导出 useUsers 组合式函数 ==========
export function useUsers() {
  // ---------- API 请求函数 ----------

  // 获取所有用户列表
  const fetchUsers = async () => {
    loading.value = true       // 设置加载状态为 true
    error.value = null         // 清空之前的错误
    try {
      // 发送 GET 请求获取用户
      const response = await fetch(`${API_BASE}/users`)
      // 检查响应状态是否正常
      if (!response.ok) throw new Error('Failed to fetch users')
      // 将响应解析为 JSON 并赋值给 users
      users.value = await response.json()
    } catch (err) {
      // 如果出错，保存错误信息
      error.value = err.message
    } finally {
      // 无论成功失败，都设置加载状态为 false
      loading.value = false
    }
  }

  // 获取单个用户详情
  const fetchUser = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE}/users/${id}`)
      if (!response.ok) throw new Error('Failed to fetch user')
      // 返回获取到的用户数据
      return await response.json()
    } catch (err) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  // 创建新用户
  const createUser = async (userData) => {
    loading.value = true
    error.value = null
    try {
      // 发送 POST 请求
      const response = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // 设置请求头为 JSON
        body: JSON.stringify(userData)                   // 将数据转为 JSON 字符串
      })
      if (!response.ok) throw new Error('Failed to create user')
      const newUser = await response.json()
      // 手动分配一个新 ID（因为 JSONPlaceholder 不会真正保存数据）
      newUser.id = users.value.length + 1
      // 将新用户添加到本地列表中
      users.value.push(newUser)
      return newUser
    } catch (err) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  // 更新用户信息
  const updateUser = async (id, userData) => {
    loading.value = true
    error.value = null
    try {
      // 发送 PUT 请求更新用户
      const response = await fetch(`${API_BASE}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      if (!response.ok) throw new Error('Failed to update user')
      const updatedUser = await response.json()
      // 在本地用户列表中找到该用户并更新
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        // 使用扩展运算符合并原有数据和更新数据
        users.value[index] = { ...users.value[index], ...updatedUser }
      }
      return updatedUser
    } catch (err) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  // 删除用户
  const deleteUser = async (id) => {
    loading.value = true
    error.value = null
    try {
      // 发送 DELETE 请求
      const response = await fetch(`${API_BASE}/users/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete user')
      // 从本地列表中过滤掉该用户
      users.value = users.value.filter(u => u.id !== id)
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  // ---------- 计算属性（computed）：根据依赖自动计算结果 ----------

  // 经过搜索和筛选后的用户列表
  const filteredUsers = computed(() => {
    let result = users.value

    // 1. 应用搜索过滤
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase() // 转为小写实现不区分大小写
      result = result.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query)
      )
    }

    // 2. 按用户名首字母筛选
    if (activeFilters.value.letter) {
      result = result.filter(user =>
        user.username.toUpperCase().startsWith(activeFilters.value.letter)
      )
    }

    // 3. 按邮箱域名筛选
    if (activeFilters.value.emailDomain) {
      result = result.filter(user =>
        user.email.endsWith(`@${activeFilters.value.emailDomain}`)
      )
    }

    // 4. 按姓名长度筛选
    if (activeFilters.value.nameLength) {
      const length = activeFilters.value.nameLength
      if (length === 'short') {
        result = result.filter(user => user.name.length <= 10)
      } else if (length === 'medium') {
        result = result.filter(user => user.name.length > 10 && user.name.length <= 15)
      } else if (length === 'long') {
        result = result.filter(user => user.name.length > 15)
      }
    }

    return result
  })

  // 提取所有用户的邮箱域名，用于筛选选项
  const emailDomains = computed(() => {
    const domains = new Set() // 使用 Set 去重
    users.value.forEach(user => {
      const domain = user.email.split('@')[1]
      if (domain) domains.add(domain)
    })
    // 转为数组并排序
    return Array.from(domains).sort()
  })

  // ---------- 工具函数 ----------

  // 设置搜索查询
  const setSearchQuery = (query) => {
    searchQuery.value = query
  }

  // 切换筛选条件：如果已选中则取消，否则选中
  const toggleFilter = (type, value) => {
    if (type === 'letter' || type === 'emailDomain' || type === 'nameLength') {
      if (activeFilters.value[type] === value) {
        activeFilters.value[type] = null  // 取消选中
      } else {
        activeFilters.value[type] = value // 选中新值
      }
    }
  }

  // 清除所有筛选条件
  const clearFilters = () => {
    activeFilters.value = {
      letter: null,
      emailDomain: null,
      nameLength: null
    }
  }

  // ---------- 返回所有需要暴露给外部的状态和方法 ----------
  return {
    users,
    loading,
    error,
    searchQuery,
    activeFilters,
    filteredUsers,
    emailDomains,
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
    setSearchQuery,
    toggleFilter,
    clearFilters
  }
}