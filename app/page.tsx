'use client'

import { useState, useEffect } from 'react'
import { NewsCard } from '@/components/news-card'
import { Sidebar } from '@/components/sidebar'
import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface NewsItem {
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

interface Category {
  name: string
  count: number
}

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>()

  const fetchNews = async (category = selectedCategory, search = searchQuery) => {
    setLoading(true)
    try {
      let url = '/api/news/latest'
      const params = new URLSearchParams()
      
      if (category && category !== '全部') {
        params.append('category', category)
      }
      
      if (search) {
        url = '/api/news/search'
        params.append('q', search)
        if (category && category !== '全部') {
          params.append('category', category)
        }
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      const response = await fetch(url)
      const data = await response.json()
      
      if (data.success) {
        setNews(data.data)
        setCategories(data.categories || [])
        setLastUpdated(new Date().toISOString())
      }
    } catch (error) {
      console.error('获取新闻失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSearchQuery('')
    fetchNews(category, '')
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    fetchNews(selectedCategory, query)
  }

  const handleRefresh = () => {
    fetchNews(selectedCategory, searchQuery)
  }

  const handleCardClick = (videoUrl: string) => {
    window.open(videoUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 搜索栏 */}
        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            onRefresh={handleRefresh}
            lastUpdated={lastUpdated}
            loading={loading}
          />
        </div>

        <div className="flex gap-8">
          {/* 侧边栏 */}
          <div className="hidden lg:block">
            <Sidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* 主内容区 */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                <span className="ml-2 text-gray-600">加载中...</span>
              </div>
            ) : news.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无数据</h3>
                <p className="text-gray-500 mb-4">没有找到相关的新闻内容</p>
                <Button onClick={handleRefresh} variant="outline">
                  刷新页面
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {news.map((item) => (
                  <div key={item.id} onClick={() => handleCardClick(item.videoUrl)}>
                    <NewsCard news={item} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 移动端分类选择 */}
        <div className="lg:hidden mt-8">
          <div className="bg-white rounded-2xl shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">分类</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === '全部' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange('全部')}
                className={selectedCategory === '全部' ? 'bg-orange-500 hover:bg-orange-600' : ''}
              >
                全部
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryChange(category.name)}
                  className={selectedCategory === category.name ? 'bg-orange-500 hover:bg-orange-600' : ''}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

