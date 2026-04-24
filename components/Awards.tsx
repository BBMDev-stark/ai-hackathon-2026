'use client'
import { useEffect, useRef } from 'react'

const prizes = [
  {
    rank: 1,
    label: 'Giải Nhất',
    amount: '3.000.000',
    unit: 'đồng',
    extra: '+ Giấy khen',
    gradient: 'linear-gradient(135deg, #B45309 0%, #D97706 40%, #F59E0B 70%, #FDE68A 100%)',
    glow: 'rgba(245,158,11,0.35)',
    border: 'border-amber-300/60',
    badge: 'bg-amber-100 text-amber-800',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    scale: true,
  },
  {
    rank: 2,
    label: 'Giải Nhì',
    amount: '2.000.000',
    unit: 'đồng',
    extra: '+ Giấy khen',
    gradient: 'linear-gradient(135deg, #374151 0%, #6B7280 50%, #D1D5DB 100%)',
    glow: 'rgba(107,114,128,0.25)',
    border: 'border-slate-300/60',
    badge: 'bg-slate-100 text-slate-700',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
      </svg>
    ),
    scale: false,
  },
  {
    rank: 3,
    label: 'Giải Ba',
    amount: '1.000.000',
    unit: 'đồng',
    extra: '+ Giấy khen',
    gradient: 'linear-gradient(135deg, #78350F 0%, #B45309 50%, #D97706 100%)',
    glow: 'rgba(180,83,9,0.25)',
    border: 'border-orange-300/60',
    badge: 'bg-orange-100 text-orange-800',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
      </svg>
    ),
    scale: false,
  },
]

export default function Awards() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed') }),
      { threshold: 0.1 }
    )
    const els = sectionRef.current?.querySelectorAll('[data-reveal]') ?? []
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="awards" className="py-24 relative overflow-hidden" ref={sectionRef}
      style={{ background: 'linear-gradient(160deg, #050D1A 0%, #0D1B30 55%, #0A1525 100%)' }}>

      {/* Background decorations */}
      <div className="absolute inset-0 dots-bg opacity-30 pointer-events-none" />
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 65%)' }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-reveal>
          <p className="section-label mb-3" style={{ color: '#F59E0B' }}>Giải thưởng</p>
          <h2 className="display text-4xl sm:text-5xl text-white mb-4">Cơ cấu giải thưởng</h2>
          <p className="text-white/45 max-w-xl mx-auto text-[15px] leading-relaxed">
            Tổng giá trị giải thưởng lên đến&nbsp;
            <span className="text-amber-400 font-bold">6.800.000 đồng</span>
            &nbsp;cùng Giấy khen và Chứng nhận tham gia cho tất cả đội thi.
          </p>
        </div>

        {/* Podium row */}
        <div className="flex flex-col sm:flex-row items-end justify-center gap-4 mb-8" data-reveal>
          {prizes.map((p, idx) => {
            // visual order: 2nd left, 1st center, 3rd right
            const orderClass = idx === 0 ? 'order-2 sm:order-2' : idx === 1 ? 'order-1 sm:order-1' : 'order-3'
            return (
              <div
                key={p.rank}
                className={`award-shine relative flex flex-col items-center w-full sm:w-[220px] rounded-3xl border overflow-hidden ${p.border} ${orderClass} ${p.scale ? 'sm:-mb-4 sm:scale-[1.05] z-10' : ''}`}
                style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)',
                  boxShadow: `0 20px 60px ${p.glow}, 0 0 0 1px rgba(255,255,255,0.06) inset` }}
              >
                {/* Gradient top bar */}
                <div className="w-full h-1.5" style={{ background: p.gradient }} />

                <div className="px-7 py-7 flex flex-col items-center w-full">
                  {/* Icon circle */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-white shadow-lg"
                    style={{ background: p.gradient }}>
                    {p.icon}
                  </div>

                  {/* Rank badge */}
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${p.badge}`}>
                    {p.label}
                  </span>

                  {/* Amount */}
                  <div className="text-center mb-2">
                    <p className="display text-4xl font-black text-white leading-none mb-1">
                      {p.amount}
                    </p>
                    <p className="text-[13px] text-white/45 font-medium">{p.unit}</p>
                  </div>

                  {/* Extra */}
                  <div className="w-full border-t border-white/8 mt-4 pt-4 text-center">
                    <p className="text-[12px] text-white/40 font-medium">{p.extra}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Honorable mention + Certificate row */}
        <div className="grid sm:grid-cols-2 gap-5 mt-6" data-reveal>
          {/* 2 Khuyến khích */}
          <div className="relative overflow-hidden rounded-2xl border border-white/8 p-6 flex items-center gap-5"
            style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)' }}>
            <div className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}>
              <svg width="24" height="24" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest font-bold text-white/35 mb-1">02 Giải</p>
              <p className="text-lg font-black text-white display leading-none mb-1">Khuyến khích</p>
              <p className="text-azure-400 font-bold text-[15px]">400.000 đ / giải</p>
              <p className="text-[12px] text-white/30 mt-0.5">+ Giấy khen của Khoa</p>
            </div>
          </div>

          {/* Chứng nhận */}
          <div className="relative overflow-hidden rounded-2xl border border-white/8 p-6 flex items-center gap-5"
            style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)' }}>
            <div className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #059669, #10B981)' }}>
              <svg width="24" height="24" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest font-bold text-white/35 mb-1">Tất cả thí sinh</p>
              <p className="text-lg font-black text-white display leading-none mb-1">Chứng nhận tham gia</p>
              <p className="text-[13px] text-white/40 leading-relaxed">
                Do Trường Đại học Lạc Hồng cấp cho toàn bộ đội tham gia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
