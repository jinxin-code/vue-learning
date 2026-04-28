/**
 * 用户数据管理组合式函数
 * 封装了所有与用户相关的数据操作和状态管理
 * 支持搜索、筛选、增删改查等功能
 */

import { ref, computed } from 'vue'

/**
 * 用户接口定义
 * 定义用户数据的结构类型
 */
export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
}

// ========== 全局响应式状态 ==========

/** 用户列表数据 */
const users = ref<User[]>([])

/** 加载状态 */
const loading = ref(false)

/** 错误信息 */
const error = ref<string | null>(null)

/** 搜索关键词 */
const searchQuery = ref('')

/** 筛选条件 */
const activeFilters = ref({
  letter: null as string | null,      // 按用户名首字母筛选
  emailDomain: null as string | null, // 按邮箱域名筛选
  nameLength: null as string | null   // 按姓名长度筛选
})

/** API 基础地址（使用 JSONPlaceholder 模拟 API） */
const API_BASE = 'https://jsonplaceholder.typicode.com'

/**
 * 用户数据管理组合式函数
 * @returns 返回用户管理相关的状态和方法
 */
export function useUsers() {
  /**
   * 获取所有用户列表
   * 通过 uni.request 发起网络请求，失败时使用模拟数据
   */
  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    try {
      // 使用 uni.request 发起 GET 请求
      const [err, res] = await uni.request({
        url: `${API_BASE}/users`,
        method: 'GET'
      })
      // 检查请求是否成功
      if (err || !res || res.statusCode !== 200) {
        throw new Error('Failed to fetch users')
      }
      // 将响应数据赋值给用户列表
      users.value = res.data as User[]
    } catch (err: any) {
      // 请求失败时记录错误并使用模拟数据
      error.value = err.message
      users.value = getMockUsers()
    } finally {
      // 无论成功失败，都设置加载状态为 false
      loading.value = false
    }
  }

  /**
   * 获取单个用户详情
   * @param id - 用户 ID
   * @returns 返回用户对象或 null
   */
  const fetchUser = async (id: number): Promise<User | null> => {
    loading.value = true
    error.value = null
    try {
      const [err, res] = await uni.request({
        url: `${API_BASE}/users/${id}`,
        method: 'GET'
      })
      if (err || !res || res.statusCode !== 200) {
        throw new Error('Failed to fetch user')
      }
      return res.data as User
    } catch (err: any) {
      error.value = err.message
      // 从模拟数据中获取用户
      const mockUsers = getMockUsers()
      return mockUsers.find(u => u.id === id) || null
    } finally {
      loading.value = false
    }
  }

  /**
   * 创建新用户
   * @param userData - 用户数据
   * @returns 返回创建的用户对象或 null
   */
  const createUser = async (userData: Partial<User>): Promise<User | null> => {
    loading.value = true
    error.value = null
    try {
      const [err, res] = await uni.request({
        url: `${API_BASE}/users`,
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        data: JSON.stringify(userData)
      })
      if (err || !res || res.statusCode !== 201) {
        throw new Error('Failed to create user')
      }
      const newUser = res.data as User
      // 手动分配 ID（JSONPlaceholder 不会真正保存数据）
      newUser.id = users.value.length + 1
      // 添加到本地列表
      users.value.push(newUser)
      return newUser
    } catch (err: any) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * 更新用户信息
   * @param id - 用户 ID
   * @param userData - 更新的用户数据
   * @returns 返回更新后的用户对象或 null
   */
  const updateUser = async (id: number, userData: Partial<User>): Promise<User | null> => {
    loading.value = true
    error.value = null
    try {
      const [err, res] = await uni.request({
        url: `${API_BASE}/users/${id}`,
        method: 'PUT',
        header: { 'Content-Type': 'application/json' },
        data: JSON.stringify(userData)
      })
      if (err || !res || res.statusCode !== 200) {
        throw new Error('Failed to update user')
      }
      const updatedUser = res.data as User
      // 更新本地列表中的用户数据
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index] = { ...users.value[index], ...updatedUser }
      }
      return updatedUser
    } catch (err: any) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * 删除用户
   * @param id - 用户 ID
   * @returns 返回删除是否成功
   */
  const deleteUser = async (id: number): Promise<boolean> => {
    loading.value = true
    error.value = null
    try {
      const [err, res] = await uni.request({
        url: `${API_BASE}/users/${id}`,
        method: 'DELETE'
      })
      if (err || !res || res.statusCode !== 200) {
        throw new Error('Failed to delete user')
      }
      // 从本地列表中移除用户
      users.value = users.value.filter(u => u.id !== id)
      return true
    } catch (err: any) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * 经过搜索和筛选后的用户列表（计算属性）
   * 根据搜索关键词和筛选条件动态过滤用户列表
   */
  const filteredUsers = computed(() => {
    let result = users.value

    // 1. 应用搜索过滤
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query)
      )
    }

    // 2. 按用户名首字母筛选
    if (activeFilters.value.letter) {
      result = result.filter(user =>
        user.username.toUpperCase().startsWith(activeFilters.value.letter!)
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

  /**
   * 提取所有邮箱域名（计算属性）
   * 用于生成筛选选项
   */
  const emailDomains = computed(() => {
    const domains = new Set<string>()
    users.value.forEach(user => {
      const domain = user.email.split('@')[1]
      if (domain) domains.add(domain)
    })
    return Array.from(domains).sort()
  })

  /**
   * 设置搜索关键词
   * @param query - 搜索关键词
   */
  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  /**
   * 切换筛选条件
   * 如果已选中则取消，否则选中新值
   * @param type - 筛选类型
   * @param value - 筛选值
   */
  const toggleFilter = (type: 'letter' | 'emailDomain' | 'nameLength', value: string) => {
    if (activeFilters.value[type] === value) {
      activeFilters.value[type] = null
    } else {
      activeFilters.value[type] = value
    }
  }

  /**
   * 清除所有筛选条件
   */
  const clearFilters = () => {
    activeFilters.value = {
      letter: null,
      emailDomain: null,
      nameLength: null
    }
  }

  // 返回所有需要暴露给外部的状态和方法
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

/**
 * 获取模拟用户数据
 * 当网络请求失败时使用，确保应用正常运行
 * @returns 返回模拟用户数组
 */
function getMockUsers(): User[] {
  return [
    { id: 1, name: 'User One', username: 'user1', email: 'user1@example.com', phone: '13800138001', website: 'user1.example.com', company: { name: 'Company A', catchPhrase: 'Demo', bs: 'Demo' }, address: { street: 'Demo', suite: 'Suite', city: 'City', zipcode: '000000', geo: { lat: '0', lng: '0' } } },
    { id: 2, name: 'User Two', username: 'user2', email: 'user2@test.com', phone: '13800138002', website: 'user2.example.com', company: { name: 'Company B', catchPhrase: 'Demo', bs: 'Demo' }, address: { street: 'Demo', suite: 'Suite', city: 'City', zipcode: '000000', geo: { lat: '0', lng: '0' } } },
    { id: 3, name: 'User Three', username: 'user3', email: 'user3@example.com', phone: '13800138003', website: 'user3.example.com', company: { name: 'Company C', catchPhrase: 'Demo', bs: 'Demo' }, address: { street: 'Demo', suite: 'Suite', city: 'City', zipcode: '000000', geo: { lat: '0', lng: '0' } } },
    { id: 4, name: 'User Four', username: 'user4', email: 'user4@test.com', phone: '13800138004', website: 'user4.example.com', company: { name: 'Company D', catchPhrase: 'Demo', bs: 'Demo' }, address: { street: 'Demo', suite: 'Suite', city: 'City', zipcode: '000000', geo: { lat: '0', lng: '0' } } },
    { id: 5, name: 'User Five', username: 'user5', email: 'user5@example.com', phone: '13800138005', website: 'user5.example.com', company: { name: 'Company E', catchPhrase: 'Demo', bs: 'Demo' }, address: { street: 'Demo', suite: 'Suite', city: 'City', zipcode: '000000', geo: { lat: '0', lng: '0' } } }
  ]
}