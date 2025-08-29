import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '20')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit

    const where: any = {}

    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { summary: { contains: query, mode: 'insensitive' } },
        { tags: { contains: query, mode: 'insensitive' } },
      ]
    }

    if (category && category !== '全部') {
      where.category = category
    }

    const news = await prisma.newsCard.findMany({
      where,
      orderBy: [
        { publishedAt: 'desc' },
        { createdAt: 'desc' }
      ],
      skip,
      take: limit,
    })

    const total = await prisma.newsCard.count({ where })

    return NextResponse.json({
      success: true,
      data: news,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      query: { q: query, category },
    })
  } catch (error) {
    console.error('搜索新闻失败:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
}

