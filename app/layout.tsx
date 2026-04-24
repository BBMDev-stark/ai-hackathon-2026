import type { Metadata } from 'next'
import { Roboto, Roboto_Slab } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-roboto',
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
})

const robotoSlab = Roboto_Slab({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-roboto-slab',
  weight: ['400', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AI Discovery Hackathon 2026 – Trường Đại học Lạc Hồng',
  description:
    'Cuộc thi AI Discovery Hackathon 2026 – "AI cho mọi người – Sáng tạo không giới hạn" do Khoa CNTT, Trường ĐH Lạc Hồng tổ chức. Vòng 1: 23/04 – 10/05/2026. Chung kết: 16/05/2026.',
  keywords: ['AI Hackathon', 'Lạc Hồng', 'CNTT', 'Đồng Nai', 'Prompt Engineering', '2026'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${roboto.variable} ${robotoSlab.variable}`}>
      <body>{children}</body>
    </html>
  )
}
