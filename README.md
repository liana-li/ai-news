# AI News - YouTube AI 最新资讯网站

一个展示每日 YouTube AI 最新资讯的现代化网站，使用 Next.js + Tailwind CSS + Prisma 构建。

## 🚀 功能特性

- 📰 **新闻展示**: 卡片式布局展示 AI 相关视频资讯
- 🔍 **智能搜索**: 支持标题、摘要、频道搜索
- 📂 **分类筛选**: 按分类浏览新闻内容
- 📱 **响应式设计**: 完美适配 PC 和移动端
- ⚡ **实时更新**: 显示最后更新时间，支持手动刷新
- 🎨 **现代 UI**: 使用 Tailwind CSS + shadcn/ui 组件库

## 🛠️ 技术栈

- **前端**: Next.js 14, React 18, TypeScript
- **样式**: Tailwind CSS, shadcn/ui
- **数据库**: Prisma ORM, SQLite/PostgreSQL
- **部署**: Vercel

## 📦 项目结构

```
ai-news/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   └── news/         # 新闻相关 API
│   ├── globals.css       # 全局样式
│   ├── layout.tsx        # 根布局
│   └── page.tsx          # 主页面
├── components/            # React 组件
│   ├── ui/              # shadcn/ui 组件
│   ├── news-card.tsx    # 新闻卡片组件
│   ├── sidebar.tsx      # 侧边栏组件
│   └── search-bar.tsx   # 搜索栏组件
├── lib/                  # 工具库
│   ├── prisma.ts        # Prisma 客户端
│   └── utils.ts         # 工具函数
├── prisma/              # 数据库配置
│   └── schema.prisma    # 数据库模型
└── public/              # 静态资源
```

## 🚀 快速开始

### 方法一：快速演示（推荐）

```bash
# 克隆项目
git clone <repository-url>
cd ai-news

# 快速启动演示（无需数据库）
npm run demo

# 访问演示页面
# http://localhost:3000/demo
```

### 方法二：完整功能（需要数据库）

```bash
# 克隆项目
git clone <repository-url>
cd ai-news

# 一键初始化（自动安装依赖、初始化数据库、添加示例数据）
npm run setup

# 启动开发服务器
npm run dev
```

### 方法二：手动初始化

#### 1. 克隆项目

```bash
git clone <repository-url>
cd ai-news
```

#### 2. 安装依赖

```bash
npm install
```

#### 3. 环境配置

创建 `.env.local` 文件：

```env
DATABASE_URL="file:./dev.db"
```

#### 4. 数据库初始化

```bash
# 生成 Prisma 客户端
npm run db:generate

# 推送数据库 schema
npm run db:push

# 添加示例数据
npm run db:seed
```

#### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

## 📊 数据管理

### 添加新闻数据

通过 POST 请求向 `/api/news/add` 发送数据：

```bash
curl -X POST http://localhost:3000/api/news/add \
  -H "Content-Type: application/json" \
  -d '{
    "news": [
      {
        "rank": 1,
        "title": "OpenAI 发布 GPT-5 重大更新",
        "summary": "OpenAI 最新发布的 GPT-5 模型在多个基准测试中表现优异...",
        "channel": "AI 科技前沿",
        "publishedAt": "2024-01-15T10:00:00Z",
        "duration": "12:34",
        "thumbnailUrl": "https://i.ytimg.com/vi/example/maxresdefault.jpg",
        "videoUrl": "https://www.youtube.com/watch?v=example",
        "views": 150000,
        "likes": 8500,
        "comments": 1200,
        "tags": "OpenAI,GPT-5,AI模型",
        "category": "AI模型"
      }
    ]
  }'
```

### API 端点

- `GET /api/news/latest` - 获取最新新闻
- `GET /api/news/search?q=关键词` - 搜索新闻
- `POST /api/news/add` - 添加新闻数据

## 🎨 自定义样式

### 颜色主题

项目使用橙色作为主色调，可以在 `tailwind.config.js` 中修改：

```javascript
theme: {
  extend: {
    colors: {
      orange: {
        50: '#fff7ed',
        500: '#f97316',
        600: '#ea580c',
        // ...
      }
    }
  }
}
```

### 组件样式

所有 UI 组件都基于 shadcn/ui，可以在 `components/ui/` 目录中自定义样式。

## 🚀 部署到 Vercel

### 1. 准备部署

确保项目可以正常构建：

```bash
npm run build
```

### 2. 连接 Vercel

1. 在 [Vercel](https://vercel.com) 创建账户
2. 导入 GitHub 仓库
3. 配置环境变量：
   - `DATABASE_URL`: 生产环境数据库 URL

### 3. 数据库配置

#### 选项 1: 使用 Vercel Postgres

1. 在 Vercel 控制台创建 Postgres 数据库
2. 更新 `prisma/schema.prisma`：

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

#### 选项 2: 使用外部数据库

配置外部 PostgreSQL 数据库的连接字符串。

### 4. 部署

Vercel 会自动检测 Next.js 项目并部署。部署完成后，网站将在 `https://ai-news.vercel.app` 上线。

## 🔧 开发命令

```bash
# 开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 数据库相关
npm run db:generate    # 生成 Prisma 客户端
npm run db:push        # 推送 schema 到数据库
npm run db:migrate     # 运行数据库迁移
npm run db:studio      # 打开 Prisma Studio
```

## 📝 数据库模型

```prisma
model NewsCard {
  id           String   @id @default(cuid())
  rank         Int
  title        String
  summary      String
  channel      String
  publishedAt  DateTime
  duration     String
  thumbnailUrl String
  videoUrl     String
  views        Int
  likes        Int
  comments     Int
  tags         String
  category     String
  createdAt    DateTime @default(now())

  @@index([category])
  @@index([publishedAt])
  @@index([title])
}
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 项目 Issues: [GitHub Issues](https://github.com/your-username/ai-news/issues)
- 邮箱: your-email@example.com

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
