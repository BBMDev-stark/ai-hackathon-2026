'use client'
import { useState } from 'react'

const goals = [
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Phổ cập AI thực tiễn',
    desc: 'Phổ cập kiến thức AI theo hướng dễ tiếp cận, ứng dụng thực tiễn, phù hợp xu thế chuyển đổi số.',
    accent: 'from-blue-500/10 to-blue-600/5',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Rèn kỹ năng Prompt Engineering',
    desc: 'Rèn luyện tư duy giải quyết vấn đề bằng AI, hướng đến tạo ra sản phẩm có giá trị trong học tập và đời sống số.',
    accent: 'from-violet-500/10 to-violet-600/5',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Cầu nối THPT – Đại học',
    desc: 'Thu hút học sinh THPT lớp 11, 12 tham gia, tạo cầu nối với Nhà trường và quảng bá ngành AI đến cộng đồng.',
    accent: 'from-emerald-500/10 to-emerald-600/5',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Quảng bá ngành Trí tuệ nhân tạo',
    desc: 'Nâng cao nhận thức cộng đồng về tiềm năng và cơ hội nghề nghiệp trong lĩnh vực Trí tuệ nhân tạo.',
    accent: 'from-amber-500/10 to-amber-600/5',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
]

function AboutBanner() {
  const [imgError, setImgError] = useState(false)
  return (
    <div className="shrink-0 w-full lg:w-[420px] h-[260px] rounded-2xl overflow-hidden shadow-md border border-slate-100 relative">
      {!imgError ? (
        <img
          src="/imgs/LHU.jpg"
          alt="AI Discovery Hackathon 2026"
          className="w-full h-full object-cover object-center"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Fallback placeholder khi chưa có ảnh */
        <div className="w-full h-full flex flex-col items-center justify-center gap-3"
          style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #EDE9FE 100%)' }}>
          <div className="w-16 h-16 rounded-2xl bg-white/60 flex items-center justify-center shadow-sm">
            <svg width="32" height="32" fill="none" stroke="#2563EB" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-[12px] text-slate-400 text-center px-4">
            Đặt ảnh tại <code className="bg-white/60 px-1 rounded text-slate-500">public/imgs/about-banner.jpg</code>
          </p>
        </div>
      )}
      {/* Subtle overlay gradient bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16"
        style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.15), transparent)' }} />
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header — 2 col: text left, image right */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 mb-16">
          <div className="lg:max-w-lg">
            <p className="section-label mb-3">Về cuộc thi</p>
            <h2 className="display text-4xl sm:text-5xl text-slate-900 leading-tight mb-5">
              Mục đích<br />tổ chức
            </h2>
            <p className="text-slate-500 leading-relaxed text-[15px]">
              AI Discovery Hackathon 2026 là sân chơi sáng tạo công nghệ do Khoa Công nghệ Thông tin – Trường Đại học Lạc Hồng tổ chức nhằm thúc đẩy ứng dụng AI trong giáo dục và đời sống.
            </p>
          </div>
          {/* Banner image */}
          <AboutBanner />
        </div>

        {/* Goals grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {goals.map((g) => (
            <div
              key={g.title}
              className={`card-hover rounded-2xl border border-slate-100 bg-gradient-to-br ${g.accent} p-7`}
            >
              <div className={`w-11 h-11 rounded-xl ${g.iconBg} ${g.iconColor} flex items-center justify-center mb-5`}>
                {g.icon}
              </div>
              <h3 className="text-[14px] font-semibold text-slate-800 mb-2 leading-snug">{g.title}</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats banner */}
        <div className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <div className="grid grid-cols-3 divide-x divide-slate-100">
            {[
              { val: 'Tháng 4–5', label: 'Thời gian tổ chức', sub: '2026' },
              { val: 'Top 10', label: 'Đội vào chung kết', sub: 'Được chọn sau vòng 1' },
              { val: '3 chủ đề', label: 'Lĩnh vực thi đấu', sub: 'AI cho Giáo dục & Đời sống' },
            ].map((s) => (
              <div key={s.label} className="px-8 py-7 text-center bg-slate-50/50">
                <p className="display text-3xl text-azure-600 mb-1">{s.val}</p>
                <p className="text-[13px] font-semibold text-slate-700">{s.label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}