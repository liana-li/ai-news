#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 启动 AI News 演示...')

// 检查是否已安装依赖
if (!fs.existsSync('node_modules')) {
  console.log('📦 安装依赖...')
  execSync('npm install', { stdio: 'inherit' })
}

// 检查是否有环境变量文件
if (!fs.existsSync('.env.local')) {
  console.log('⚙️ 创建环境变量文件...')
  fs.writeFileSync('.env.local', 'DATABASE_URL="file:./dev.db"')
}

// 生成 Prisma 客户端
console.log('🔧 生成 Prisma 客户端...')
try {
  execSync('npm run db:generate', { stdio: 'inherit' })
} catch (error) {
  console.log('⚠️ Prisma 客户端生成失败，但演示页面仍可正常使用')
}

console.log('\n🎉 启动开发服务器...')
console.log('📱 演示页面地址: http://localhost:3000/demo')
console.log('🏠 主页面地址: http://localhost:3000')
console.log('\n按 Ctrl+C 停止服务器')

// 启动开发服务器
execSync('npm run dev', { stdio: 'inherit' })

