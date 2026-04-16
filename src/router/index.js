// 从 vue-router 中导入创建路由实例和创建 HTML5 History 模式的函数
import { createRouter, createWebHistory } from 'vue-router'

// 导入各个页面组件
import UserListView from '../views/UserListView.vue'      // 用户列表页
import UserDetailView from '../views/UserDetailView.vue'  // 用户详情页
import UserEditView from '../views/UserEditView.vue'      // 用户编辑页
import UserNewView from '../views/UserNewView.vue'        // 新增用户页

// 创建路由实例
const router = createRouter({
  // 使用 HTML5 History 模式，需要服务器配置支持
  history: createWebHistory(import.meta.env.BASE_URL),
  
  // 定义路由规则
  routes: [
    {
      path: '/',                   // 路径为根路径
      name: 'home',                // 路由名称
      component: UserListView      // 对应的组件
    },
    {
      path: '/user/:id',           // 动态路由参数 :id
      name: 'user-detail',
      component: UserDetailView
    },
    {
      path: '/user/:id/edit',
      name: 'user-edit',
      component: UserEditView
    },
    {
      path: '/user/new',
      name: 'user-new',
      component: UserNewView
    }
  ]
})

// 导出路由实例供 main.js 使用
export default router