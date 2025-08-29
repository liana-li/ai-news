# 🚀 AI News 部署指南

本文档详细说明如何将 AI News 项目部署到 Vercel 平台。

## 📋 部署前准备

### 1. 项目准备

确保项目可以正常构建：

```bash
# 安装依赖
npm install

# 构建项目
npm run build
```

### 2. 数据库选择

#### 选项 A: Vercel Postgres（推荐）

1. 在 Vercel 控制台创建 Postgres 数据库
2. 获取连接字符串
3. 更新 `prisma/schema.prisma`：

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

#### 选项 B: 外部 PostgreSQL

使用外部 PostgreSQL 数据库服务（如 Supabase、Railway 等）。

## 🌐 Vercel 部署步骤

### 1. 连接 GitHub

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账户登录
3. 点击 "New Project"
4. 导入 AI News 仓库

### 2. 配置项目

#### 基本配置
- **Framework Preset**: Next.js
- **Root Directory**: `./` (默认)
- **Build Command**: `npm run build` (默认)
- **Output Directory**: `.next` (默认)

#### 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

```env
# 数据库连接
DATABASE_URL="postgresql://username:password@host:port/database"

# 其他配置
NODE_ENV="production"
```

### 3. 部署配置

#### 构建配置

Vercel 会自动检测 Next.js 项目，但可以手动配置：

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

#### 数据库迁移

在 Vercel 的 "Settings" → "Functions" 中添加构建钩子：

```bash
# 构建前运行数据库迁移
npm run db:generate && npm run db:push
```

### 4. 部署

1. 点击 "Deploy" 开始部署
2. 等待构建完成
3. 检查部署日志，确保没有错误

## 🔧 部署后配置

### 1. 数据库初始化

部署完成后，需要初始化数据库：

```bash
# 方法一：通过 Vercel CLI
vercel env pull .env.local
npx prisma db push

# 方法二：通过 Vercel 函数
# 创建一个 API 路由来初始化数据库
```

### 2. 添加示例数据

```bash
# 通过 API 添加数据
curl -X POST https://your-domain.vercel.app/api/news/add \
  -H "Content-Type: application/json" \
  -d '{"news": [...]}'
```

### 3. 域名配置

1. 在 Vercel 项目设置中添加自定义域名
2. 配置 DNS 记录
3. 等待 DNS 传播

## 📊 监控和维护

### 1. 性能监控

- 使用 Vercel Analytics 监控性能
- 设置错误告警
- 监控数据库连接

### 2. 数据备份

定期备份数据库：

```bash
# PostgreSQL 备份
pg_dump $DATABASE_URL > backup.sql

# 恢复数据
psql $DATABASE_URL < backup.sql
```

### 3. 更新部署

```bash
# 推送代码到 GitHub
git push origin main

# Vercel 会自动重新部署
```

## 🚨 常见问题

### 1. 构建失败

**问题**: 构建时出现 Prisma 相关错误

**解决方案**:
```bash
# 确保在 package.json 中有 postinstall 脚本
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### 2. 数据库连接失败

**问题**: 生产环境无法连接数据库

**解决方案**:
- 检查 `DATABASE_URL` 环境变量
- 确保数据库服务正常运行
- 检查网络连接和防火墙设置

### 3. 图片加载失败

**问题**: YouTube 缩略图无法加载

**解决方案**:
- 确保 `next.config.js` 中配置了正确的图片域名
- 考虑使用图片代理服务

## 🔒 安全配置

### 1. 环境变量

- 不要在代码中硬编码敏感信息
- 使用 Vercel 环境变量管理
- 定期轮换数据库密码

### 2. API 保护

考虑添加 API 认证：

```typescript
// 在 API 路由中添加认证
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.API_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // ... 其他逻辑
}
```

### 3. CORS 配置

```typescript
// 在 next.config.js 中配置 CORS
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
        ],
      },
    ]
  },
}
```

## 📈 性能优化

### 1. 图片优化

```typescript
// 使用 Next.js Image 组件
import Image from 'next/image'

<Image
  src={thumbnailUrl}
  alt={title}
  width={400}
  height={225}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 2. 数据库优化

```sql
-- 添加索引
CREATE INDEX idx_news_published_at ON "NewsCard"("publishedAt");
CREATE INDEX idx_news_category ON "NewsCard"("category");
```

### 3. 缓存策略

```typescript
// 在 API 路由中添加缓存
export async function GET(request: NextRequest) {
  const response = NextResponse.json(data)
  response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate')
  return response
}
```

## 🎯 部署检查清单

- [ ] 项目可以正常构建
- [ ] 数据库连接正常
- [ ] 环境变量配置正确
- [ ] API 端点正常工作
- [ ] 图片可以正常加载
- [ ] 移动端适配正常
- [ ] 性能监控已配置
- [ ] 错误告警已设置
- [ ] 域名配置完成
- [ ] SSL 证书有效

## 📞 技术支持

如果遇到部署问题，可以：

1. 查看 Vercel 部署日志
2. 检查 GitHub Issues
3. 联系技术支持

---

部署完成后，您的 AI News 网站就可以通过 `https://your-domain.vercel.app` 访问了！

