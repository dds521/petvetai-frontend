/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 生产环境优化配置
  compress: true,
  poweredByHeader: false,
  
  // 输出配置（用于静态导出或独立部署）
  output: process.env.NEXT_OUTPUT || 'standalone',
  
  // 图片优化
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // 允许跨域（开发环境）
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  
  // 代理配置（可选，如果后端支持 CORS 可以不用）
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:48080';
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
  
  // 构建优化
  swcMinify: true,
  
  // 实验性功能
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;

