# Vue User Management System / Vue 用户管理系统

A modern user management application built with Vue 3, featuring comprehensive CRUD operations, real-time search, filtering, and a responsive design.

一个现代化的用户管理应用，使用 Vue 3 构建，具有完整的增删改查功能、实时搜索、筛选功能和响应式设计。

## Features / 功能特点

- **用户列表展示** - User List Display
  - 以卡片形式展示所有用户信息 / Display all users in card layout
  - 显示用户姓名、用户名、邮箱 / Show name, username, and email

- **用户详情查看** - User Detail View
  - 展示用户的完整信息 / Display complete user information
  - 包括地址、公司信息等 / Including address and company details

- **实时搜索** - Real-time Search
  - 支持按姓名或用户名搜索 / Search by name or username
  - 防抖优化，300ms 延迟 / Debounced for better performance

- **多条件筛选** - Multi-filter Support
  - 按用户名首字母筛选 / Filter by first letter of username
  - 按邮箱域名筛选 / Filter by email domain
  - 按姓名长度筛选 / Filter by name length

- **用户编辑** - User Editing
  - 修改用户姓名、用户名、邮箱 / Edit name, username, email
  - 表单验证，确保数据完整 / Form validation

- **用户新增** - Add New User
  - 创建新用户 / Create new user
  - 完整的表单验证 / Complete form validation

- **用户删除** - User Deletion
  - 删除确认弹窗 / Delete confirmation modal
  - 双重确认机制 / Double confirmation

## Tech Stack / 技术栈

- **Vue 3** - The Progressive JavaScript Framework
- **Vue Router 4** - The official router for Vue.js
- **Vite** - Next Generation Frontend Tooling
- **Fetch API** - Modern network request

## Project Structure / 项目结构

```
src/
├── components/          # 公共组件 / Public Components
│   ├── DeleteConfirmModal.vue
│   ├── FilterBar.vue
│   ├── LoadingSpinner.vue
│   ├── SearchBar.vue
│   ├── Toast.vue
│   ├── UserCard.vue
│   └── UserForm.vue
├── composables/         # 组合式函数 / Composables
│   └── useUsers.js      # 用户数据管理 / User data management
├── router/             # 路由配置 / Router Configuration
│   └── index.js
├── views/             # 页面视图 / Page Views
│   ├── UserListView.vue
│   ├── UserDetailView.vue
│   ├── UserEditView.vue
│   └── UserNewView.vue
├── App.vue            # 根组件 / Root Component
├── main.js            # 应用入口 / Application Entry
└── style.css          # 全局样式 / Global Styles
```

## Installation / 安装

```bash
# 安装依赖 / Install dependencies
npm install

# 开发模式 / Development mode
npm run dev

# 构建生产版本 / Build for production
npm run build

# 预览生产版本 / Preview production build
npm run preview
```

## API / 接口

本项目使用 [JSONPlaceholder](https://jsonplaceholder.typicode.com) 提供模拟 API 服务。

This project uses [JSONPlaceholder](https://jsonplaceholder.typicode.com) as a mock API service.

- Base URL: `https://jsonplaceholder.typicode.com`
- Users API: `/users`

## Learning Notes / 学习笔记

这个项目是用于学习 Vue 3 的实践项目，涵盖了以下核心概念：

This project is a hands-on learning exercise for Vue 3, covering these key concepts:

- **Composition API** - 组合式 API 的使用方式
- **Reactivity** - 响应式系统的原理和使用
- **Props & Events** - 父子组件通信
- **Router** - Vue Router 的配置和使用
- **Lifecycle Hooks** - 生命周期钩子
- **Computed Properties** - 计算属性
- **Watch** - 侦听器
- **Composables** - 组合式函数

## License / 许可证

MIT License

## Author / 作者

Calvin
