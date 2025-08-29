import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { news } = body

    if (!Array.isArray(news) || news.length === 0) {
      return NextResponse.json(
        { error: '请提供有效的新闻数据数组' },
        { status: 400 }
      )
    }

    if (news.length > 20) {
      return NextResponse.json(
        { error: '单次最多只能添加20条新闻' },
        { status: 400 }
      )
    }

    // 验证数据格式
    for (const item of news) {
      if (!item.title || !item.summary || !item.channel || !item.videoUrl) {
        return NextResponse.json(
          { error: '新闻数据格式不正确，缺少必要字段' },
          { status: 400 }
        )
      }
    }

    // 批量插入数据
    const createdNews = await prisma.newsCard.createMany({
      data: news.map((item, index) => ({
        rank: item.rank || index + 1,
        title: item.title,
        summary: item.summary,
        channel: item.channel,
        publishedAt: new Date(item.publishedAt),
        duration: item.duration || '0:00',
        thumbnailUrl: item.thumbnailUrl || '',
        videoUrl: item.videoUrl,
        views: item.views || 0,
        likes: item.likes || 0,
        comments: item.comments || 0,
        tags: Array.isArray(item.tags) ? item.tags.join(',') : item.tags || '',
        category: item.category || '其他',
      })),
      skipDuplicates: true,
    })

    return NextResponse.json({
      success: true,
      message: `成功添加 ${createdNews.count} 条新闻`,
      count: createdNews.count,
    })
  } catch (error) {
    console.error('添加新闻失败:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
}

