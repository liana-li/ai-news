import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleNews = [
  {
    rank: 1,
    title: "OpenAI 发布 GPT-5 重大更新，性能提升 50%",
    summary: "OpenAI 最新发布的 GPT-5 模型在多个基准测试中表现优异，相比 GPT-4 在推理能力和代码生成方面有显著提升。新模型支持更长的上下文窗口，能够处理更复杂的任务。",
    channel: "AI 科技前沿",
    publishedAt: new Date("2024-01-15T10:00:00Z"),
    duration: "15:23",
    thumbnailUrl: "https://i.ytimg.com/vi/example1/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example1",
    views: 250000,
    likes: 12000,
    comments: 1800,
    tags: "OpenAI,GPT-5,AI模型,自然语言处理",
    category: "AI模型"
  },
  {
    rank: 2,
    title: "Google Gemini 2.0 震撼发布，多模态能力再升级",
    summary: "Google 发布了 Gemini 2.0 版本，在图像理解、视频分析和多模态推理方面有重大突破。新版本能够更好地理解复杂的视觉内容，并在创意写作和代码生成方面表现突出。",
    channel: "科技前沿资讯",
    publishedAt: new Date("2024-01-14T14:30:00Z"),
    duration: "18:45",
    thumbnailUrl: "https://i.ytimg.com/vi/example2/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example2",
    views: 180000,
    likes: 9500,
    comments: 1200,
    tags: "Google,Gemini,多模态AI,机器学习",
    category: "AI模型"
  },
  {
    rank: 3,
    title: "Meta 开源 Llama 3 模型，性能超越 GPT-4",
    summary: "Meta 宣布开源 Llama 3 大语言模型，该模型在多个基准测试中超越了 GPT-4 的表现。开源版本包括 7B、13B 和 70B 参数版本，为研究社区提供了强大的工具。",
    channel: "AI 研究实验室",
    publishedAt: new Date("2024-01-13T09:15:00Z"),
    duration: "22:10",
    thumbnailUrl: "https://i.ytimg.com/vi/example3/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example3",
    views: 320000,
    likes: 15000,
    comments: 2100,
    tags: "Meta,Llama,开源AI,大语言模型",
    category: "开源项目"
  },
  {
    rank: 4,
    title: "Anthropic Claude 3 发布，安全性大幅提升",
    summary: "Anthropic 发布了 Claude 3 系列模型，在安全性和对齐方面有重大改进。新模型能够更好地理解用户意图，减少有害输出，并在创意写作和代码生成方面表现优异。",
    channel: "AI 安全研究",
    publishedAt: new Date("2024-01-12T16:45:00Z"),
    duration: "12:30",
    thumbnailUrl: "https://i.ytimg.com/vi/example4/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example4",
    views: 150000,
    likes: 8500,
    comments: 1100,
    tags: "Anthropic,Claude,AI安全,对齐",
    category: "AI安全"
  },
  {
    rank: 5,
    title: "Stable Diffusion 3.0 发布，图像质量再创新高",
    summary: "Stability AI 发布了 Stable Diffusion 3.0，新版本在图像质量、细节表现和艺术风格方面有显著提升。支持更高分辨率的图像生成，并改进了文本到图像的理解能力。",
    channel: "AI 艺术创作",
    publishedAt: new Date("2024-01-11T11:20:00Z"),
    duration: "14:55",
    thumbnailUrl: "https://i.ytimg.com/vi/example5/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example5",
    views: 280000,
    likes: 13500,
    comments: 1900,
    tags: "Stable Diffusion,AI艺术,图像生成,Stability AI",
    category: "AI艺术"
  },
  {
    rank: 6,
    title: "Microsoft Copilot 企业版发布，AI 助手进入办公场景",
    summary: "Microsoft 发布了 Copilot 企业版，将 AI 助手深度集成到 Office 365 和 Teams 中。新版本能够帮助用户创建文档、分析数据、生成演示文稿，大幅提升工作效率。",
    channel: "企业科技前沿",
    publishedAt: new Date("2024-01-10T13:10:00Z"),
    duration: "16:40",
    thumbnailUrl: "https://i.ytimg.com/vi/example6/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example6",
    views: 200000,
    likes: 11000,
    comments: 1400,
    tags: "Microsoft,Copilot,企业AI,办公自动化",
    category: "企业应用"
  },
  {
    rank: 7,
    title: "Tesla 自动驾驶 FSD 12.0 重大更新",
    summary: "Tesla 发布了 FSD 12.0 版本，新版本完全基于端到端神经网络，不再依赖传统规则。在复杂城市道路和恶劣天气条件下的表现有显著提升。",
    channel: "自动驾驶科技",
    publishedAt: new Date("2024-01-09T08:30:00Z"),
    duration: "20:15",
    thumbnailUrl: "https://i.ytimg.com/vi/example7/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example7",
    views: 350000,
    likes: 18000,
    comments: 2500,
    tags: "Tesla,自动驾驶,FSD,神经网络",
    category: "自动驾驶"
  },
  {
    rank: 8,
    title: "DeepMind AlphaFold 3 发布，蛋白质结构预测再突破",
    summary: "DeepMind 发布了 AlphaFold 3，在蛋白质结构预测方面取得重大突破。新版本能够预测更复杂的蛋白质复合物结构，为药物发现和生物学研究提供强大工具。",
    channel: "生物科技前沿",
    publishedAt: new Date("2024-01-08T15:45:00Z"),
    duration: "19:20",
    thumbnailUrl: "https://i.ytimg.com/vi/example8/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example8",
    views: 120000,
    likes: 7500,
    comments: 900,
    tags: "DeepMind,AlphaFold,蛋白质结构,生物AI",
    category: "生物科技"
  },
  {
    rank: 9,
    title: "NVIDIA 发布新一代 AI 芯片 H200",
    summary: "NVIDIA 发布了 H200 AI 芯片，相比 H100 在 AI 训练和推理性能方面有显著提升。新芯片采用更先进的制程工艺，支持更大的内存容量和更高的带宽。",
    channel: "硬件科技前沿",
    publishedAt: new Date("2024-01-07T10:15:00Z"),
    duration: "13:45",
    thumbnailUrl: "https://i.ytimg.com/vi/example9/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example9",
    views: 180000,
    likes: 9500,
    comments: 1300,
    tags: "NVIDIA,H200,AI芯片,GPU",
    category: "硬件技术"
  },
  {
    rank: 10,
    title: "ChatGPT 企业版新增代码解释功能",
    summary: "OpenAI 为 ChatGPT 企业版新增了代码解释功能，能够详细分析代码逻辑、识别潜在问题并提供优化建议。这一功能将大大提升开发者的工作效率。",
    channel: "开发者社区",
    publishedAt: new Date("2024-01-06T12:00:00Z"),
    duration: "11:30",
    thumbnailUrl: "https://i.ytimg.com/vi/example10/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example10",
    views: 95000,
    likes: 5200,
    comments: 800,
    tags: "ChatGPT,代码解释,开发者工具,编程",
    category: "开发工具"
  }
]

async function main() {
  console.log('开始添加示例数据...')
  
  try {
    // 清空现有数据
    await prisma.newsCard.deleteMany()
    console.log('已清空现有数据')
    
    // 添加示例数据
    const createdNews = await prisma.newsCard.createMany({
      data: sampleNews,
    })
    
    console.log(`成功添加 ${createdNews.count} 条示例新闻`)
    
    // 获取分类统计
    const categories = await prisma.newsCard.groupBy({
      by: ['category'],
      _count: {
        category: true,
      },
    })
    
    console.log('\n分类统计:')
    categories.forEach(cat => {
      console.log(`${cat.category}: ${cat._count.category} 条`)
    })
    
  } catch (error) {
    console.error('添加示例数据失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()

