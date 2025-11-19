import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

export const metadata: Metadata = {
  title: 'PetVetAI - 宠物医疗 AI 助手',
  description: 'AI 驱动的宠物健康咨询平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
