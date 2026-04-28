# Frontend Learning / 前端学习项目

一个包含多个前端学习项目的 Monorepo 仓库，使用 npm Workspaces 管理。

## 📦 项目列表

### packages/vue-learning
Vue 3 用户管理系统 - 学习 Vue 3 的实践项目

**仓库**: [https://github.com/jinxin-code/vue-learning](https://github.com/jinxin-code/vue-learning)

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
cd packages/vue-learning
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
npm run dev:mp-weixin   # 微信小程序开发
```

---

## 🛠️ Monorepo 管理

### 安装所有依赖
```bash
npm install
```

### 开发命令
```bash
# Vue 项目开发
npm run dev:vue

# UniApp H5 开发
npm run dev:uniapp
```

### 构建命令
```bash
# Vue 项目构建
npm run build:vue

# UniApp H5 构建
npm run build:uniapp
```

## 📁 目录结构

```
frontend-learning/
├── packages/
│   ├── vue-learning/      # Vue 3 项目
│   │   ├── src/
│   │   ├── package.json
│   │   └── ...
│   └── uniapp-learning/   # UniApp 项目
│       ├── src/
│       ├── package.json
│       └── ...
├── package.json           # 根目录（工作区配置）
└── README.md
```

## 🌐 支持平台

### Vue Learning
- ✅ Web (Chrome, Firefox, Safari, Edge)

### UniApp Learning
- ✅ H5
- ✅ 微信小程序
- ✅ iOS (需通过 HBuilderX 打包)
- ✅ Android (需通过 HBuilderX 打包)

## 📚 学习资源

- [Vue 3 官方文档](https://vuejs.org/)
- [UniApp 官方文档](https://uniapp.dcloud.net.cn/)
- [Vite 官方文档](https://vitejs.dev/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

## 📝 License

MIT License