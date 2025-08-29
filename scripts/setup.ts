import { execSync } from 'child_process'
import { writeFileSync } from 'fs'
import { join } from 'path'

async function setup() {
  console.log('🚀 开始初始化 AI News 项目...')
  
  try {
    // 1. 安装依赖
    console.log('1. 安装依赖...')
    execSync('npm install', { stdio: 'inherit' })
    console.log('✅ 依赖安装完成')
    
    // 2. 生成 Prisma 客户端
    console.log('2. 生成 Prisma 客户端...')
    execSync('npm run db:generate', { stdio: 'inherit' })
    console.log('✅ Prisma 客户端生成完成')
    
    // 3. 推送数据库 schema
    console.log('3. 初始化数据库...')
    execSync('npm run db:push', { stdio: 'inherit' })
    console.log('✅ 数据库初始化完成')
    
    // 4. 添加示例数据
    console.log('4. 添加示例数据...')
    execSync('npm run db:seed', { stdio: 'inherit' })
    console.log('✅ 示例数据添加完成')
    
    // 5. 测试 API
    console.log('5. 测试 API...')
    execSync('npm run test:api', { stdio: 'inherit' })
    console.log('✅ API 测试完成')
    
    console.log('\n🎉 项目初始化完成！')
    console.log('\n📋 下一步操作：')
    console.log('1. 运行开发服务器: npm run dev')
    console.log('2. 访问: http://localhost:3000')
    console.log('3. 查看数据库: npm run db:studio')
    
  } catch (error) {
    console.error('❌ 初始化失败:', error)
    process.exit(1)
  }
}

setup()

