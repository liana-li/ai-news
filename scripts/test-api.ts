import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testAPI() {
  console.log('🧪 开始测试 API...')
  
  try {
    // 测试数据库连接
    console.log('1. 测试数据库连接...')
    await prisma.$connect()
    console.log('✅ 数据库连接成功')
    
    // 测试获取最新新闻
    console.log('2. 测试获取最新新闻...')
    const latestNews = await prisma.newsCard.findMany({
      take: 5,
      orderBy: { publishedAt: 'desc' }
    })
    console.log(`✅ 获取到 ${latestNews.length} 条最新新闻`)
    
    // 测试分类统计
    console.log('3. 测试分类统计...')
    const categories = await prisma.newsCard.groupBy({
      by: ['category'],
      _count: { category: true }
    })
    console.log(`✅ 获取到 ${categories.length} 个分类`)
    categories.forEach(cat => {
      console.log(`   - ${cat.category}: ${cat._count.category} 条`)
    })
    
    // 测试搜索功能
    console.log('4. 测试搜索功能...')
    const searchResults = await prisma.newsCard.findMany({
      where: {
        OR: [
          { title: { contains: 'AI', mode: 'insensitive' } },
          { summary: { contains: 'AI', mode: 'insensitive' } }
        ]
      },
      take: 3
    })
    console.log(`✅ 搜索 "AI" 找到 ${searchResults.length} 条结果`)
    
    console.log('\n🎉 所有测试通过！')
    
  } catch (error) {
    console.error('❌ 测试失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAPI()

