import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
// 临时注释掉 QueryProvider 以测试
// import { QueryProvider } from '@/components/providers/QueryProvider'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
  preload: false, // 禁用预加载以避免网络问题
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: 'PetVetAI - AI 宠物医疗助手',
  description: '您的 AI 宠物医疗助手，提供智能症状分析和健康建议',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        {/* 临时注释掉 QueryProvider 以测试 */}
        {/* <QueryProvider> */}
          {children}
        {/* </QueryProvider> */}
      </body>
    </html>
  )
}
