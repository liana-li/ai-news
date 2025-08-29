/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['i.ytimg.com', 'img.youtube.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig
