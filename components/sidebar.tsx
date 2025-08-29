'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Category {
  name: string
  count: number
}

interface SidebarProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function Sidebar({ categories, selectedCategory, onCategoryChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white rounded-2xl shadow-md p-6 h-fit sticky top-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">分类导航</h2>
      
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange('全部')}
          className={cn(
            "w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200",
            selectedCategory === '全部'
              ? "bg-orange-50 text-orange-700 border border-orange-200"
              : "hover:bg-gray-50 text-gray-700"
          )}
        >
          <span className="font-medium">全部</span>
          <Badge variant="secondary" className="bg-gray-100 text-gray-600">
            {categories.reduce((sum, cat) => sum + cat.count, 0)}
          </Badge>
        </button>
        
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={cn(
              "w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200",
              selectedCategory === category.name
                ? "bg-orange-50 text-orange-700 border border-orange-200"
                : "hover:bg-gray-50 text-gray-700"
            )}
          >
            <span className="font-medium">{category.name}</span>
            <Badge 
              variant="secondary" 
              className={cn(
                selectedCategory === category.name
                  ? "bg-orange-100 text-orange-600"
                  : "bg-gray-100 text-gray-600"
              )}
            >
              {category.count}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  )
}

