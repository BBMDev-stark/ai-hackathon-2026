'use client'
import { useState } from 'react'

const topics = [
  {
    num: '01',
    title: 'Vũ trụ kiến thức 2030',
    desc: 'Xây dựng nền tảng học tập, chia sẻ và khai thác tri thức bằng AI hướng đến tương lai giáo dục 2030.',
    color: 'from-blue-600 to-indigo-700',
    lightBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    // Ảnh minh họa: đặt tại public/imgs/topic-01.jpg
    img: '/imgs/kienthucvutru.png',
    imgFallbackColor: 'from-blue-100 to-indigo-100',
    imgFallbackIcon: (
      <svg width="40" height="40" fill="none" stroke="#2563EB" strokeWidth="1.3" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    tags: ['Giáo dục', 'Knowledge Base', 'AI 2030'],
  },
  {
    num: '02',
    title: 'Trợ lý học tập thông minh',
    desc: 'Thiết kế trợ lý AI hỗ trợ học sinh, sinh viên trong việc học, ôn tập và phát triển kỹ năng cá nhân.',
    color: 'from-violet-600 to-purple-700',
    lightBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    img: '/imgs/trolyhoctap.png',
    imgFallbackColor: 'from-violet-100 to-purple-100',
    imgFallbackIcon: (
      <svg width="40" height="40" fill="none" stroke="#7C3AED" strokeWidth="1.3" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    tags: ['Chatbot AI', 'E-Learning', 'Personalized'],
  },
  {
    num: '03',
    title: 'Lớp học an toàn số',
    desc: 'Ứng dụng AI để tạo môi trường học tập số an toàn, lành mạnh và hiệu quả cho học sinh.',
    color: 'from-emerald-600 to-teal-700',
    lightBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    img: '/imgs/lophocantoanso.png',
    imgFallbackColor: 'from-emerald-100 to-teal-100',
    imgFallbackIcon: (
      <svg width="40" height="40" fill="none" stroke="#059669" strokeWidth="1.3" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    tags: ['Digital Safety', 'AI Moderation', 'EdTech'],
  },
]

function TopicImage({ topic }: { topic: typeof topics[0] }) {
  const [imgError, setImgError] = useState(false)
  return (
    <div className="relative h-[300px] overflow-hidden">
      {!imgError ? (
        <img
          src={topic.img}
          alt={topic.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${topic.imgFallbackColor} flex items-center justify-center`}>
          {topic.imgFallbackIcon}
        </div>
      )}
      {/* Bottom fade into white card */}
      <div className="absolute bottom-0 left-0 right-0 h-12"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.95))' }} />
      {/* Number badge */}
      <div className="absolute top-3 right-3">
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm bg-gradient-to-r ${topic.color} bg-clip-text`}
          style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          #{topic.num}
        </span>
      </div>
    </div>
  )
}

export default function Topics() {
  return (
    <section id="topics" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <p className="section-label mb-3">Chủ đề</p>
            <h2 className="display text-4xl sm:text-5xl text-slate-900">Chủ đề dự thi</h2>
          </div>
          <p className="text-slate-500 max-w-sm text-[15px] leading-relaxed">
            Chọn một trong ba chủ đề để xây dựng ý tưởng và sản phẩm dự thi. Sản phẩm gồm Video · Proposal · Prompt Log · Prototype.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {topics.map((t) => (
            <div
              key={t.num}
              className="card-hover group rounded-2xl border border-slate-100 overflow-hidden bg-white"
            >
              {/* Top accent gradient bar */}
              <div className={`h-1.5 bg-gradient-to-r ${t.color}`} />

              {/* Topic Image */}
              <TopicImage topic={t} />

              <div className="p-8 pt-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${t.lightBg} ${t.iconColor} flex items-center justify-center`}>
                    {t.icon}
                  </div>
                </div>

                {/* Title & desc */}
                <h3 className="text-[17px] font-bold text-slate-800 mb-3 leading-snug">{t.title}</h3>
                <p className="text-[14px] text-slate-500 leading-relaxed mb-6">{t.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${t.lightBg} ${t.iconColor}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[13px] text-slate-400">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Mỗi đội chỉ được chọn một chủ đề duy nhất để tham gia xuyên suốt cuộc thi.</span>
        </div>

      </div>
    </section>
  )
}