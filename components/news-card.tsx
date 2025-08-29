'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, Heart, MessageCircle, Clock, Play } from 'lucide-react'
import { useState } from 'react'

interface NewsCardProps {
  news: {
    id: string
    rank: number
    title: string
    summary: string
    channel: string
    publishedAt: string
    duration: string
    thumbnailUrl: string
    videoUrl: string
    views: number
    likes: number
    comments: number
    tags: string
    category: string
  }
}

export function NewsCard({ news }: NewsCardProps) {
  const [imgSrc, setImgSrc] = useState(news.thumbnailUrl || '/placeholder-thumbnail.svg')

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return `${diffInHours}小时前`
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}天前`
    } else {
      return date.toLocaleDateString('zh-CN')
    }
  }

  const tags = news.tags ? news.tags.split(',').filter(tag => tag.trim()) : []

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-2xl">
          <Link href={news.videoUrl} target="_blank" rel="noopener noreferrer">
            <Image
              src={imgSrc || '/placeholder-thumbnail.svg'}
              alt={news.title}
              width={400}
              height={225}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgSrc('/placeholder-thumbnail.svg')}
            />
          </Link>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="bg-white bg-opacity-90 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Play className="w-6 h-6 text-orange-500" fill="currentColor" />
            </div>
          </div>
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-orange-500 text-white">
              #{news.rank}
            </Badge>
          </div>
          <div className="absolute bottom-3 right-3">
            <Badge variant="outline" className="bg-black bg-opacity-70 text-white border-0">
              {news.duration}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-orange-600 transition-colors">
            {news.title}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-3">
            {news.summary}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-700">{news.channel}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatDate(news.publishedAt)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{formatNumber(news.views)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{formatNumber(news.likes)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{formatNumber(news.comments)}</span>
              </div>
            </div>
            
            <Badge variant="outline" className="text-xs">
              {news.category}
            </Badge>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-gray-100">
                  {tag.trim()}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

