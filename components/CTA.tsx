'use client'
import { useEffect, useRef } from 'react'

const REGISTER_URL = 'https://forms.gle/'   // ← Thay bằng link thực tế

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed') }),
      { threshold: 0.1 }
    )
    const els = ref.current?.querySelectorAll('[data-reveal]') ?? []
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="cta"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #030B18 0%, #0D1B30 60%, #091422 100%)' }}
      ref={ref}
    >
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Glow */}
      <div aria-hidden className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.22) 0%, transparent 65%)' }} />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-10 text-center" data-reveal>
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/12 bg-white/5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest">
            Hạn đăng ký · 30/04/2026
          </span>
        </div>

        <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
          Bạn đã sẵn sàng<br />
          <span className="gradient-text">tham gia chưa?</span>
        </h2>

        <p className="text-white/45 text-[17px] mb-14 max-w-xl mx-auto leading-relaxed">
          Đăng ký ngay hôm nay để có cơ hội trải nghiệm, học hỏi và cạnh tranh cùng những tài năng trẻ trong lĩnh vực AI.
        </p>

        {/* CTA buttons — wider, more spacious */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <a
            href={'https://docs.google.com/forms/d/e/1FAIpQLSeotO9ptxV8cUh04oTAq6zhPSLet8-BtOv1-5tGetS_QPHP3w/viewform'}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 px-12 py-5 rounded-2xl text-white text-[16px] font-black transition-all shadow-2xl hover:scale-[1.03] hover:shadow-azure-500/20"
            style={{ background: 'linear-gradient(90deg, #1D4ED8, #2563EB, #3B82F6)', minWidth: '240px' }}
          >
            Đăng ký ngay
            <svg className="transition-transform group-hover:translate-x-1" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="mailto:phuongvdv@gmail.com"
            className="inline-flex items-center justify-center gap-2.5 px-10 py-5 rounded-2xl border border-white/18 text-white/65 text-[15px] font-medium hover:text-white hover:border-white/35 hover:bg-white/6 transition-all"
            style={{ minWidth: '220px' }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Liên hệ Ban tổ chức
          </a>
        </div>

        {/* Trust pills */}
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, text: 'Miễn phí tham gia' },
            { icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>, text: 'Tối đa 3 thành viên/đội' },
            { icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>, text: 'Giấy chứng nhận cho tất cả' },
            { icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>, text: 'Workshop thực hành AI' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/8 text-[12px] text-white/35">
              <span className="text-white/45">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
