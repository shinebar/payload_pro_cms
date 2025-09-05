# Payload CMS 项目

这是一个基于 Payload CMS 的内容管理系统项目，使用 TypeScript 和 SQLite 数据库构建。

## 功能特性

- ✅ 文章管理系统（Posts Collection）
- ✅ 用户角色权限控制（Admin/User）
- ✅ 自动 slug 生成
- ✅ 公开只读 REST API
- ✅ SQLite 数据库支持
- ✅ TypeScript 支持

## 技术栈

- **后端框架**: Payload CMS 3.x
- **数据库**: SQLite
- **语言**: TypeScript
- **运行时**: Node.js
- **API**: REST API (Next.js App Router)

## 项目结构

```
payload-cms-project/
├── src/
│   │── app/
│   ├── collections/
│   │   │   ├── Posts.ts          # 文章集合定义
│   │   │   └── Users.ts          # 用户集合定义
│   │  │   └── media.ts          # 用户集合定义
│   │  └── my-route/
│   │  │      └── route.ts  # API 路由
│   └── api/
│   │  └── posts/
│   │           └── route.ts  # 自定义 API for posts
│   │ ── globals
│   │  │── header
│   │      │──config.ts
│   ├── payload.config.ts     # Payload 配置文件
│   ├── payload.types.ts      # Payload types文件
├── .env                     # 环境变量
├── package.json
├── tsconfig.json
└── README.md
```

## 安装和配置

### 1. 环境要求

- Node.js 20.9.0 或更高版本
- npm 或 yarn

### 2. 安装依赖

```bash
npm install
```

### 3. 环境配置

项目已包含 `.env` 文件，包含以下配置：

```env
PAYLOAD_SECRET=your-super-secret-key
```

**注意**: 在生产环境中，请更改 `PAYLOAD_SECRET` 为一个安全的随机字符串。

### 4. 数据库配置

项目使用 SQLite 数据库，数据库文件将自动创建在项目根目录下的 `my-payload-blog.db` 文件中。


## 运行项目

### 开发模式

```bash
npm run dev
```

服务器将在 `http://localhost:3000` 启动。

### 生产模式

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

## 使用说明

### 1. 访问管理面板

启动服务器后，访问 `http://localhost:3000/admin` 进入管理面板。

首次访问时需要创建管理员账户。

### 2. 用户角色

系统支持两种用户角色：

- **Admin**: 可以创建、编辑、删除文章
- **User**: 只能查看文章

### 3. 文章管理

文章包含以下字段：

- `slug`: 文章唯一标识符（必填，自动生成）
- `title`: 文章标题（必填）
- `content`: 文章内容（富文本）
- `tags`: 标签数组
- `publishedAt`: 发布时间

#### 自动 slug 生成

当创建新文章时，如果没有手动设置 slug，系统会根据文章标题自动生成：

- 转换为小写
- 移除特殊字符
- 将空格替换为连字符
- 去除多余的连字符

例如：`"Hello World!"` → `"hello-world"`

### 4. 公开 API

#### 获取已发布文章列表

```
GET /api/posts
```

返回所有 `publishedAt` 时间小于等于当前时间的文章。

响应格式：

```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "slug": "hello-world",
      "title": "Hello World",
      "content": "...",
      "tags": ["tag1", "tag2"],
      "publishedAt": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "totalDocs": 1,
  "page": 1,
  "totalPages": 1
}
```

## 开发指南

### 添加新的集合

1. 在 `src/collections/` 目录下创建新的集合文件
2. 在 `src/payload.config.ts` 中导入并添加到 `collections` 数组

### 添加新的 API 路由

1. 在 `src/app/api/` 目录下创建新的路由文件
2. 使用 Payload Local API 访问数据

### 自定义钩子

在集合配置中添加钩子：

```typescript
hooks: {
  beforeChange: [
    ({ data, operation }) => {
      // 自定义逻辑
      return data;
    },
  ],
},
```

## 部署

### 部署前准备

1. 设置安全的 `PAYLOAD_SECRET`
2. 配置生产数据库连接
3. 构建项目：`npm run build`

### 部署选项

- **传统服务器**: 使用 PM2 或类似工具
- **容器化**: Docker
- **云平台**: Vercel, Netlify, Railway 等

## 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查 SQLite 文件权限
   - 确保目录可写

2. **管理面板无法访问**
   - 检查端口是否被占用
   - 确认 `PAYLOAD_SECRET` 已设置

3. **TypeScript 错误**
   - 运行 `npm run generate:types` 生成类型文件

### 日志查看

开发模式下，所有日志会输出到控制台。生产环境建议配置日志文件。

