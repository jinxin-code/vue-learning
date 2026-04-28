# UniApp 用户管理系统

一个基于 UniApp 框架开发的跨平台用户管理系统，支持 H5、微信小程序、iOS 和 Android 多端运行。

## ✨ 功能特性

### 用户管理
- 📱 **用户列表展示** - 以卡片形式展示所有用户信息
- 🔍 **实时搜索** - 支持按用户名或姓名搜索用户
- 📋 **多条件筛选** - 按首字母、邮箱域名、姓名长度筛选
- 📄 **用户详情** - 查看用户的完整详细信息
- ✏️ **用户编辑** - 修改用户信息，带表单验证
- ➕ **用户新增** - 创建新用户
- 🗑️ **用户删除** - 删除用户（带确认提示）
- 🛡️ **错误处理** - 网络请求失败时使用模拟数据

## 🛠️ 技术栈

- **框架**: UniApp (Vue 3)
- **语言**: TypeScript
- **构建工具**: Vite
- **样式**: SCSS
- **API**: JSONPlaceholder

## 📁 项目结构

```
uniapp-learning/
├── src/
│   ├── composables/        # 组合式函数
│   │   └── useUsers.ts     # 用户数据管理逻辑
│   ├── pages/              # 页面目录
│   │   ├── index/          # 用户列表页
│   │   ├── detail/         # 用户详情页
│   │   ├── edit/           # 用户编辑页
│   │   └── add/            # 用户新增页
│   ├── App.vue             # 根组件
│   ├── main.ts             # 应用入口
│   ├── pages.json          # 页面路由配置
│   └── manifest.json       # 应用配置
├── index.html              # HTML 模板
├── package.json            # 项目配置
├── vite.config.ts          # Vite 配置
└── tsconfig.json           # TypeScript 配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd uniapp-learning
npm install
```

### 开发模式

```bash
# H5 开发
npm run dev:h5

# 微信小程序开发
npm run dev:mp-weixin
```

### 构建

```bash
# H5 构建
npm run build:h5

# 微信小程序构建
npm run build:mp-weixin
```

### 预览

构建完成后，H5 产物位于 `dist/build/h5/`，可通过静态服务器预览：

```bash
npx serve dist/build/h5
```

微信小程序产物位于 `dist/build/mp-weixin/`，需使用微信开发者工具导入项目。

## 📱 页面说明

| 页面 | 路径 | 说明 |
|------|------|------|
| 用户列表 | `/pages/index/index` | 展示用户列表，支持搜索和筛选 |
| 用户详情 | `/pages/detail/detail` | 展示单个用户的完整信息 |
| 用户编辑 | `/pages/edit/edit` | 修改用户信息 |
| 用户新增 | `/pages/add/add` | 创建新用户 |

## 🔧 核心 API

### useUsers 组合式函数

提供用户数据管理的核心功能：

- `fetchUsers()` - 获取所有用户列表
- `fetchUser(id)` - 获取单个用户详情
- `createUser(data)` - 创建新用户
- `updateUser(id, data)` - 更新用户信息
- `deleteUser(id)` - 删除用户
- `filteredUsers` - 经过搜索和筛选后的用户列表
- `emailDomains` - 所有邮箱域名（用于筛选）

## 🌐 支持平台

- ✅ H5
- ✅ 微信小程序
- ✅ iOS (需通过 HBuilderX 打包)
- ✅ Android (需通过 HBuilderX 打包)

## 📝 License

MIT License