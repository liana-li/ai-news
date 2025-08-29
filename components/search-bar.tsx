'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, RefreshCw } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
  onRefresh: () => void
  lastUpdated?: string
  loading?: boolean
}

export function SearchBar({ onSearch, onRefresh, lastUpdated, loading }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const formatLastUpdated = (dateString?: string) => {
    if (!dateString) return '未知'
    const date = new Date(dateString)
    return date.toLocaleString('zh-CN')
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">AI News</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            最后更新: {formatLastUpdated(lastUpdated)}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={cn("w-4 h-4", loading ? "animate-spin" : "")} />
            <span>刷新</span>
          </Button>
        </div>
      </div>
      
      <form onSubmit={handleSearch} className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="搜索标题、摘要或频道..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
          搜索
        </Button>
      </form>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

