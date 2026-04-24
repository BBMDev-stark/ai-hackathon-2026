'use client'
import { useEffect, useRef, useState } from 'react'

const judges = [
  {
    name: 'TS. Huỳnh Cao Tuấn',
    title: 'Phó Hiệu trưởng',
    org: 'Trường Đại học Lạc Hồng',
    role: 'Trưởng Ban Giám khảo',
    featured: true,
    // Đặt ảnh thực tế tại public/imgs/huynh-cao-tuan.jpg
    img: '/imgs/huynh-cao-tuan.jpg',
    fallback: 'HCT',
    gradient: 'from-blue-700 to-azure-500',
  },
  {
    name: 'ThS. Văn Đình Vỹ Phương',
    title: 'Trưởng Khoa CNTT',
    org: 'Trường Đại học Lạc Hồng',
    role: 'Phó Ban Giám khảo',
    featured: false,
    img: '/imgs/co-phuong.jpg',
    fallback: 'VĐP',
    gradient: 'from-indigo-600 to-indigo-400',
  },
  {
    name: 'TS. Đỗ Sĩ Trường',
    title: 'Giám đốc Trung tâm NNTH',
    org: 'Trường Đại học Lạc Hồng',
    role: 'Thành viên',
    featured: false,
    img: '/imgs/thay-truong.jpg',
    fallback: 'ĐST',
    gradient: 'from-sky-600 to-sky-400',
  },
  {
    name: 'Phan Kiên Cường',
    title: 'Đại diện Doanh nghiệp',
    org: 'Khách mời',
    role: 'Thành viên',
    featured: false,
    img: '/imgs/thay-cuong.jpg',
    fallback: 'PKC',
    gradient: 'from-teal-600 to-teal-400',
  },
  {
    name: 'ThS. Phan Thiện Phước',
    title: 'Trưởng ngành Trí tuệ nhân tạo',
    org: 'Khoa CNTT – LHU',
    role: 'Thư ký & Thành viên',
    featured: false,
    img: '/imgs/thay-phuoc.jpg',
    fallback: 'PTP',
    gradient: 'from-violet-600 to-violet-400',
  },
]

function JudgePhoto({ judge, large = false }: { judge: typeof judges[0]; large?: boolean }) {
  const [imgError, setImgError] = useState(false)
  const size = large ? 'w-full h-full' : 'w-full h-full'

  return (
    <div className={`relative ${size} rounded-xl overflow-hidden`}>
      {!imgError ? (
        <img
          src={judge.img}
          alt={judge.name}
          className="w-full h-full object-cover object-[center_15%]"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${judge.gradient} flex items-center justify-center`}>
          <span className={`font-bold text-white ${large ? 'text-4xl' : 'text-2xl'}`}>{judge.fallback}</span>
        </div>
      )}
    </div>
  )
}

export default function Judges() {
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

  const [lead, rest] = [judges[0], judges.slice(1)]

  return (
    <section id="judges" className="py-24 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="mb-16" data-reveal>
          <p className="section-label mb-3">Ban Giám khảo</p>
          <h2 className="display text-4xl sm:text-5xl text-slate-900 mb-4">Hội đồng Giám khảo</h2>
          <p className="text-slate-500 max-w-xl text-[15px] leading-relaxed">
            Hội đồng gồm các chuyên gia học thuật và đại diện doanh nghiệp có chuyên môn sâu trong lĩnh vực AI và công nghệ thông tin.
          </p>
        </div>

        {/* Featured judge — horizontal card */}
        <div data-reveal className="mb-6 rounded-3xl overflow-hidden shadow-lg border border-slate-100"
          style={{ background: 'linear-gradient(135deg, #050D1A 0%, #0D1E33 60%, #152843 100%)' }}>
          <div className="flex flex-col sm:flex-row items-stretch gap-0">
            {/* Photo */}
            <div className="shrink-0 w-full sm:w-[200px] h-[200px] sm:h-auto relative overflow-hidden">
              <div className="w-full h-full">
                <JudgePhoto judge={lead} large />
              </div>
              {/* Gradient overlay right side */}
              <div className="absolute inset-y-0 right-0 w-16 hidden sm:block"
                style={{ background: 'linear-gradient(to right, transparent, #050D1A)' }} />
            </div>
            {/* Info */}
            <div className="flex-1 p-8 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-azure-600/20 border border-azure-500/30 mb-4 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-azure-400 animate-pulse-slow" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-azure-300">
                  {lead.role}
                </span>
              </div>
              <h3 className="text-2xl font-black text-white mb-1">{lead.name}</h3>
              <p className="text-base text-white/60 mb-0.5">{lead.title}</p>
              <p className="text-sm text-white/35">{lead.org}</p>
            </div>
          </div>
        </div>

        {/* Rest of judges — grid with photos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rest.map((j, i) => (
            <div
              key={j.name}
              data-reveal
              className="card-hover bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm group"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Photo area */}
              <div className="relative h-[260px] overflow-hidden">
                <JudgePhoto judge={j} />
                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-14"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.95))' }} />
              </div>
              {/* Info */}
              <div className="px-5 pb-5 pt-1">
                <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {j.role}
                </span>
                <p className="text-[14px] font-black text-slate-800 mb-0.5 leading-snug">{j.name}</p>
                <p className="text-[12px] text-slate-500">{j.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{j.org}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
