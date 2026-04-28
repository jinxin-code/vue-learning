# 前端学习项目 / Frontend Learning

---

## 📦 项目列表

### packages/vue-web-learning
Vue 3 用户管理系统 - 学习 Vue 3 的 Web 实践项目

**功能**:
- 用户列表展示（卡片形式）
- 用户详情查看
- 实时搜索（支持姓名/用户名）
- 多条件筛选（首字母、邮箱域名、姓名长度）
- 用户增删改查
- 表单验证

**技术栈**: Vue 3 + Vue Router 4 + Vite + Fetch API

**快速开始**:
```bash
cd packages/vue-web-learning
npm install
npm run dev
```

---

### packages/uniapp-learning
UniApp 跨平台用户管理系统 - 一套代码多端运行

**功能**:
- 用户列表展示
- 用户详情查看
- 搜索和筛选
- 用户增删改查
- 支持 H5、微信小程序、iOS、Android

**技术栈**: UniApp (Vue 3) + TypeScript + Vite + uni.request

**快速开始**:
```bash
cd packages/uniapp-learning
npm install
npm run dev:h5        # H5 开发
npm run dev:mp-weixin # 微信小程序开发
```

---

## 🛠️ Monorepo 管理

### 安装所有依赖
```bash
npm install
```

### 开发命令
```bash
npm run dev:vue       # Vue Web 项目开发
npm run dev:uniapp    # UniApp H5 开发
```

### 构建命令
```bash
npm run build:vue          # Vue Web 项目构建
npm run build:uniapp       # UniApp H5 构建
npm run build:uniapp:mp     # 微信小程序构建
```

### 清理命令
```bash
npm run clean              # 清理所有构建产物
```

---

## 📁 目录结构

```
frontend-learning/
├── packages/
│   ├── vue-web-learning/   # Vue 3 Web 项目
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
│   └── uniapp-learning/    # UniApp 项目
│       ├── src/
│       └── package.json
├── .vscode/
├── package.json            # 根目录（npm Workspaces）
├── .npmrc
├── .gitignore
└── README.md
```

---

## 🌐 支持平台

### Vue Web Learning
- ✅ Web (Chrome, Firefox, Safari, Edge)

### UniApp Learning
- ✅ H5
- ✅ 微信小程序
- ✅ iOS (需通过 HBuilderX 打包)
- ✅ Android (需通过 HBuilderX 打包)

---

## 📚 学习资源

- [Vue 3 官方文档](https://vuejs.org/)
- [UniApp 官方文档](https://uniapp.dcloud.net.cn/)
- [Vite 官方文档](https://vitejs.dev/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

---

## 📝 License

MIT License

---

<hr>

# Frontend Learning / 前端学习项目

---

## 📦 Projects

### packages/vue-web-learning
Vue 3 User Management System - A hands-on Web learning project for Vue 3

**Features**:
- User list display (card layout)
- User detail view
- Real-time search (by name or username)
- Multi-filter support (first letter, email domain, name length)
- Full CRUD operations
- Form validation

**Tech Stack**: Vue 3 + Vue Router 4 + Vite + Fetch API

**Quick Start**:
```bash
cd packages/vue-web-learning
npm install
npm run dev
```

---

### packages/uniapp-learning
UniApp Cross-Platform User Management System - One codebase, multiple platforms

**Features**:
- User list display
- User detail view
- Search and filters
- Full CRUD operations
- Support for H5, WeChat Mini Program, iOS, Android

**Tech Stack**: UniApp (Vue 3) + TypeScript + Vite + uni.request

**Quick Start**:
```bash
cd packages/uniapp-learning
npm install
npm run dev:h5          # H5 development
npm run dev:mp-weixin   # WeChat Mini Program development
```

---

## 🛠️ Monorepo Management

### Install Dependencies
```bash
npm install
```

### Development Scripts
```bash
npm run dev:vue       # Vue Web project development
npm run dev:uniapp    # UniApp H5 development
```

### Build Scripts
```bash
npm run build:vue         # Vue Web project build
npm run build:uniapp      # UniApp H5 build
npm run build:uniapp:mp   # WeChat Mini Program build
```

### Clean Script
```bash
npm run clean             # Clean all build outputs
```

---

## 📁 Directory Structure

```
frontend-learning/
├── packages/
│   ├── vue-web-learning/  # Vue 3 Web project
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
│   └── uniapp-learning/   # UniApp project
│       ├── src/
│       └── package.json
├── .vscode/
├── package.json           # Root (npm Workspaces)
├── .npmrc
├── .gitignore
└── README.md
```

---

## 🌐 Supported Platforms

### Vue Web Learning
- ✅ Web (Chrome, Firefox, Safari, Edge)

### UniApp Learning
- ✅ H5
- ✅ WeChat Mini Program
- ✅ iOS (requires HBuilderX packaging)
- ✅ Android (requires HBuilderX packaging)

---

## 📚 Learning Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [UniApp Documentation](https://uniapp.dcloud.net.cn/)
- [Vite Documentation](https://vitejs.dev/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

---

## 📝 License

MIT License