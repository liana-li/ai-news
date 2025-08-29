import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit

    // 构建查询条件
    const where = category && category !== '全部' ? { category } : {}

    // 获取新闻数据
    const news = await prisma.newsCard.findMany({
      where,
      orderBy: [
        { publishedAt: 'desc' },
        { createdAt: 'desc' }
      ],
      skip,
      take: limit,
    })

    // 获取总数
    const total = await prisma.newsCard.count({ where })

    // 获取分类统计
    const categories = await prisma.newsCard.groupBy({
      by: ['category'],
      _count: {
        category: true,
      },
    })

    const categoryStats = categories.map(cat => ({
      name: cat.category,
      count: cat._count.category,
    }))

    return NextResponse.json({
      success: true,
      data: news,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      categories: categoryStats,
    })
  } catch (error) {
    console.error('获取新闻失败:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
}

