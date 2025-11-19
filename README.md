# PetVetAI Frontend

PetVetAI 前端应用，基于 Next.js 14 + React + TypeScript + Tailwind CSS 构建的现代化宠物医疗 AI 助手平台。                                                      

## 📋 目录

- [技术架构](#技术架构)
- [项目结构](#项目结构)
- [环境配置](#环境配置)
- [快速开始](#快速开始)
- [开发指南](#开发指南)
- [构建部署](#构建部署)
- [Nginx 配置](#nginx-配置)
- [常见问题](#常见问题)

## 🏗️ 技术架构

### 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript 5.x
- **UI 框架**: Tailwind CSS 3.x
- **状态管理**: TanStack Query (React Query)
- **HTTP 客户端**: Fetch API (封装)
- **图标库**: Lucide React
- **构建工具**: Next.js Built-in
- **代码规范**: ESLint

### 架构设计

采用模块化架构，按业务功能划分模块，每个模块包含：
- **components/**: 模块专用组件
- **services/**: API 调用服务
- **hooks/**: 自定义 React Hooks
- **types/**: TypeScript 类型定义

### 核心特性

1. **模块化架构**: 按业务模块划分，便于维护和扩展
2. **多环境支持**: 支持 dev/test/uat/prod 四套环境
3. **类型安全**: 完整的 TypeScript 类型定义
4. **性能优化**: 代码分割、懒加载、图片优化
5. **SEO 友好**: Next.js SSR/SSG 支持
6. **响应式设计**: 移动端和桌面端适配

## 📁 项目结构

```
petvetai-frontend/
├── src/                        # 源代码目录
│   ├── app/                    # Next.js App Router 页面
│   ├── modules/                # 业务模块（按功能划分）
│   │   ├── diagnosis/         # 诊断模块
│   │   ├── pet/               # 宠物模块
│   │   └── common/            # 公共模块
│   ├── shared/                 # 共享层
│   │   ├── api/               # API 客户端
│   │   ├── constants/         # 常量定义
│   │   └── utils/             # 工具函数
│   ├── components/             # 全局组件
│   └── lib/                    # 库文件
│
├── scripts/                     # 脚本目录
│   ├── start.sh               # 启动脚本
│   ├── build.sh               # 构建脚本
│   └── deploy.sh              # 部署脚本
│
├── nginx/                       # Nginx 配置文件目录
│   ├── nginx.conf             # 生产环境配置
│   └── nginx-dev.conf         # 开发环境配置
│
├── env/                         # 环境变量相关
│   └── .env.example.template  # 环境变量模板
│
├── .env.development             # 开发环境配置（必须在根目录）
├── .env.test                    # 测试环境配置（必须在根目录）
├── .env.uat                     # UAT 环境配置（必须在根目录）
├── .env.production              # 生产环境配置（必须在根目录）
├── .env.example                 # 环境变量模板（必须在根目录）
│
├── next.config.js               # Next.js 配置
├── tsconfig.json                # TypeScript 配置
├── postcss.config.js            # PostCSS 配置
├── tailwind.config.ts           # Tailwind CSS 配置
└── package.json                 # 项目依赖配置
```

**注意**：
- `.env.*` 文件必须保留在根目录，因为 Next.js 框架要求从根目录读取环境变量
- 配置文件（`next.config.js`、`tsconfig.json` 等）必须保留在根目录，构建工具要求如此
- Nginx 配置文件已整理到 `nginx/` 目录
- 所有脚本文件统一放在 `scripts/` 目录

## 🔧 环境配置

### 环境变量

项目支持四套环境配置：

| 环境 | 配置文件 | API 地址 |
|------|---------|---------|
| 开发 | `.env.development` | http://localhost:8080 |
| 测试 | `.env.test` | http://test-api.petvetai.com |
| UAT | `.env.uat` | http://uat-api.petvetai.com |
| 生产 | `.env.production` | https://api.petvetai.com |

### 环境变量文件位置

**重要**：所有 `.env.*` 文件必须保留在项目根目录，因为 Next.js 框架会自动从根目录读取这些文件。

环境变量模板和说明文档存放在 `env/` 目录中。

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

使用启动脚本（推荐）：
```bash
./scripts/start.sh
```

或使用 npm 命令：
```bash
npm run dev              # 开发环境
npm run dev:test        # 测试环境
npm run dev:uat         # UAT 环境
```

### 构建

使用构建脚本（推荐）：
```bash
./scripts/build.sh dev   # 开发环境构建
./scripts/build.sh test  # 测试环境构建
./scripts/build.sh uat   # UAT 环境构建
./scripts/build.sh prod  # 生产环境构建
```

或使用 npm 命令：
```bash
npm run build:dev       # 开发环境构建
npm run build:test      # 测试环境构建
npm run build:uat       # UAT 环境构建
npm run build:prod      # 生产环境构建
```

## 🏗️ 构建部署

### 使用构建脚本

```bash
./scripts/build.sh prod
```

### 使用部署脚本

```bash
sudo ./scripts/deploy.sh prod /usr/share/nginx/html/petvetai-frontend
```

部署脚本会自动：
1. 检查构建产物
2. 备份旧版本
3. 复制构建产物到部署目录
4. 设置文件权限
5. 配置 Nginx（从 `nginx/` 目录读取配置文件）

### Nginx 配置

Nginx 配置文件已整理到 `nginx/` 目录：

1. 手动复制 Nginx 配置：
   ```bash
   # 生产环境
   sudo cp nginx/nginx.conf /etc/nginx/conf.d/petvetai.conf
   
   # 开发环境
   sudo cp nginx/nginx-dev.conf /etc/nginx/conf.d/petvetai.conf
   ```

2. 测试配置：
   ```bash
   sudo nginx -t
   ```

3. 重启 Nginx：
   ```bash
   sudo systemctl reload nginx
   ```

**注意**：部署脚本 `scripts/deploy.sh` 会自动处理 Nginx 配置，无需手动操作。

## 🔍 常见问题

### 1. 为什么环境变量文件必须在根目录？

Next.js 框架要求 `.env.*` 文件必须在项目根目录，框架会自动从根目录读取这些文件。如果移动到子目录，Next.js 将无法识别环境变量。

### 2. 如何管理多个环境的配置？

- 开发环境：使用 `.env.development` 或 `.env.local`
- 测试环境：使用 `.env.test`
- UAT 环境：使用 `.env.uat`
- 生产环境：使用 `.env.production`

不同环境的构建命令会自动使用对应的环境变量文件。

### 3. 脚本文件在哪里？

所有脚本文件统一放在 `scripts/` 目录：
- `scripts/start.sh` - 启动开发服务器
- `scripts/build.sh` - 构建项目
- `scripts/deploy.sh` - 部署项目

### 4. Nginx 配置文件在哪里？

Nginx 配置文件已整理到 `nginx/` 目录：
- `nginx/nginx.conf` - 生产环境配置
- `nginx/nginx-dev.conf` - 开发环境配置

部署脚本会自动从 `nginx/` 目录读取配置文件。

### 5. 项目结构整理说明

为了保持根目录整洁，项目进行了以下整理：
- ✅ Nginx 配置文件移动到 `nginx/` 目录
- ✅ 脚本文件统一放在 `scripts/` 目录
- ✅ 环境变量模板存放在 `env/` 目录
- ⚠️ 环境变量文件（`.env.*`）保留在根目录（Next.js 要求）
- ⚠️ 配置文件保留在根目录（构建工具要求）

详见 `PROJECT_STRUCTURE.md` 文件获取更详细的项目结构说明。
