'use client'

import { useState } from 'react'
import { NewsCard } from '@/components/news-card'
import { Sidebar } from '@/components/sidebar'
import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// 模拟数据
const demoNews = [
  {
    id: '1',
    rank: 1,
    title: "OpenAI 发布 GPT-5 重大更新，性能提升 50%",
    summary: "OpenAI 最新发布的 GPT-5 模型在多个基准测试中表现优异，相比 GPT-4 在推理能力和代码生成方面有显著提升。新模型支持更长的上下文窗口，能够处理更复杂的任务。",
    channel: "AI 科技前沿",
    publishedAt: "2024-01-15T10:00:00Z",
    duration: "15:23",
    thumbnailUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example1",
    views: 250000,
    likes: 12000,
    comments: 1800,
    tags: "OpenAI,GPT-5,AI模型,自然语言处理",
    category: "AI模型"
  },
  {
    id: '2',
    rank: 2,
    title: "Google Gemini 2.0 震撼发布，多模态能力再升级",
    summary: "Google 发布了 Gemini 2.0 版本，在图像理解、视频分析和多模态推理方面有重大突破。新版本能够更好地理解复杂的视觉内容，并在创意写作和代码生成方面表现突出。",
    channel: "科技前沿资讯",
    publishedAt: "2024-01-14T14:30:00Z",
    duration: "18:45",
    thumbnailUrl: "https://images.unsplash.com/photo-1673187733777-4e8d4f4c4c4c?w=400&h=225&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example2",
    views: 180000,
    likes: 9500,
    comments: 1200,
    tags: "Google,Gemini,多模态AI,机器学习",
    category: "AI模型"
  },
  {
    id: '3',
    rank: 3,
    title: "Meta 开源 Llama 3 模型，性能超越 GPT-4",
    summary: "Meta 宣布开源 Llama 3 大语言模型，该模型在多个基准测试中超越了 GPT-4 的表现。开源版本包括 7B、13B 和 70B 参数版本，为研究社区提供了强大的工具。",
    channel: "AI 研究实验室",
    publishedAt: "2024-01-13T09:15:00Z",
    duration: "22:10",
    thumbnailUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example3",
    views: 320000,
    likes: 15000,
    comments: 2100,
    tags: "Meta,Llama,开源AI,大语言模型",
    category: "开源项目"
  },
  {
    id: '4',
    rank: 4,
    title: "Stable Diffusion 3.0 发布，图像质量再创新高",
    summary: "Stability AI 发布了 Stable Diffusion 3.0，新版本在图像质量、细节表现和艺术风格方面有显著提升。支持更高分辨率的图像生成，并改进了文本到图像的理解能力。",
    channel: "AI 艺术创作",
    publishedAt: "2024-01-11T11:20:00Z",
    duration: "14:55",
    thumbnailUrl: "https://images.unsplash.com/photo-1673187733777-4e8d4f4c4c4c?w=400&h=225&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example5",
    views: 280000,
    likes: 13500,
    comments: 1900,
    tags: "Stable Diffusion,AI艺术,图像生成,Stability AI",
    category: "AI艺术"
  },
  {
    id: '5',
    rank: 5,
    title: "Tesla 自动驾驶 FSD 12.0 重大更新",
    summary: "Tesla 发布了 FSD 12.0 版本，新版本完全基于端到端神经网络，不再依赖传统规则。在复杂城市道路和恶劣天气条件下的表现有显著提升。",
    channel: "自动驾驶科技",
    publishedAt: "2024-01-09T08:30:00Z",
    duration: "20:15",
    thumbnailUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example7",
    views: 350000,
    likes: 18000,
    comments: 2500,
    tags: "Tesla,自动驾驶,FSD,神经网络",
    category: "自动驾驶"
  },
  {
    id: '6',
    rank: 6,
    title: "NVIDIA 发布新一代 AI 芯片 H200",
    summary: "NVIDIA 发布了 H200 AI 芯片，相比 H100 在 AI 训练和推理性能方面有显著提升。新芯片采用更先进的制程工艺，支持更大的内存容量和更高的带宽。",
    channel: "硬件科技前沿",
    publishedAt: "2024-01-07T10:15:00Z",
    duration: "13:45",
    thumbnailUrl: "https://images.unsplash.com/photo-1673187733777-4e8d4f4c4c4c?w=400&h=225&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example9",
    views: 180000,
    likes: 9500,
    comments: 1300,
    tags: "NVIDIA,H200,AI芯片,GPU",
    category: "硬件技术"
  }
]

const demoCategories = [
  { name: 'AI模型', count: 2 },
  { name: '开源项目', count: 1 },
  { name: 'AI艺术', count: 1 },
  { name: '自动驾驶', count: 1 },
  { name: '硬件技术', count: 1 }
]

export default function DemoPage() {
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredNews, setFilteredNews] = useState(demoNews)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSearchQuery('')
    if (category === '全部') {
      setFilteredNews(demoNews)
    } else {
      setFilteredNews(demoNews.filter(news => news.category === category))
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query) {
      setFilteredNews(demoNews)
      return
    }
    const filtered = demoNews.filter(news => 
      news.title.toLowerCase().includes(query.toLowerCase()) ||
      news.summary.toLowerCase().includes(query.toLowerCase()) ||
      news.channel.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredNews(filtered)
  }

  const handleRefresh = () => {
    setFilteredNews(demoNews)
    setSelectedCategory('全部')
    setSearchQuery('')
  }

  const handleCardClick = (videoUrl: string) => {
    alert(`点击了视频链接: ${videoUrl}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 演示说明 */}
        <div className="mb-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">AI News 演示页面</h1>
          <p className="text-orange-100">
            这是一个功能演示页面，展示了 AI News 网站的所有核心功能。您可以体验搜索、分类筛选、响应式设计等功能。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-white text-orange-600">卡片式布局</Badge>
            <Badge variant="secondary" className="bg-white text-orange-600">搜索功能</Badge>
            <Badge variant="secondary" className="bg-white text-orange-600">分类筛选</Badge>
            <Badge variant="secondary" className="bg-white text-orange-600">响应式设计</Badge>
            <Badge variant="secondary" className="bg-white text-orange-600">现代化UI</Badge>
          </div>
        </div>

        {/* 搜索栏 */}
        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            onRefresh={handleRefresh}
            lastUpdated={new Date().toISOString()}
            loading={false}
          />
        </div>

        <div className="flex gap-8">
          {/* 侧边栏 */}
          <div className="hidden lg:block">
            <Sidebar
              categories={demoCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* 主内容区 */}
          <div className="flex-1">
            {filteredNews.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无数据</h3>
                <p className="text-gray-500 mb-4">没有找到相关的新闻内容</p>
                <Button onClick={handleRefresh} variant="outline">
                  刷新页面
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredNews.map((item) => (
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
              {demoCategories.map((category) => (
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

        {/* 功能说明 */}
        <div className="mt-12 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">功能特性</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-medium text-orange-900 mb-2">📰 新闻展示</h3>
              <p className="text-sm text-orange-700">卡片式布局展示 AI 相关视频资讯，包含缩略图、标题、摘要、热度等信息</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-medium text-orange-900 mb-2">🔍 智能搜索</h3>
              <p className="text-sm text-orange-700">支持标题、摘要、频道搜索，实时过滤显示相关结果</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-medium text-orange-900 mb-2">📂 分类筛选</h3>
              <p className="text-sm text-orange-700">按分类浏览新闻内容，左侧导航显示分类统计</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-medium text-orange-900 mb-2">📱 响应式设计</h3>
              <p className="text-sm text-orange-700">完美适配 PC 和移动端，移动端优化分类选择体验</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-medium text-orange-900 mb-2">⚡ 实时更新</h3>
              <p className="text-sm text-orange-700">显示最后更新时间，支持手动刷新获取最新数据</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-medium text-orange-900 mb-2">🎨 现代 UI</h3>
              <p className="text-sm text-orange-700">使用 Tailwind CSS + shadcn/ui 组件库，橙色主题设计</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

