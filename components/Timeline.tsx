type TItem = {
  date: string
  title: string
  desc?: string
  badge: string
  badgeColor: string
}

const phase1: TItem[] = [
  {
    date: '23/04 – 30/04',
    title: 'Mở đăng ký trực tuyến',
    desc: 'Đăng ký qua Google Form, phổ biến thể lệ và tiêu chí chấm điểm.',
    badge: 'Đăng ký',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    date: '07/05/2026',
    title: 'Workshop "Prompt Master" — Buổi 1',
    desc: 'Nhập môn AI & Prompt Engineering cơ bản.',
    badge: 'Workshop',
    badgeColor: 'bg-violet-100 text-violet-700',
  },
  {
    date: '09/05/2026',
    title: 'Workshop "Prompt Master" — Buổi 2',
    desc: 'AI trong truyền thông & sáng tạo đa phương tiện.',
    badge: 'Workshop',
    badgeColor: 'bg-violet-100 text-violet-700',
  },
  {
    date: '13/05/2026',
    title: 'Workshop "Prompt Master" — Buổi 3',
    desc: 'Xây dựng Prototype AI & Kỹ năng Pitching.',
    badge: 'Workshop',
    badgeColor: 'bg-violet-100 text-violet-700',
  },
  {
    date: '20/05/2026',
    title: 'Nộp bài & Công bố Top 10',
    desc: 'Hội đồng giám khảo chấm điểm, công bố 10 đội xuất sắc vào chung kết.',
    badge: 'Kết quả',
    badgeColor: 'bg-emerald-100 text-emerald-700',
  },
]

const phase2: TItem[] = [
  {
    date: 'Sáng 29/05',
    title: 'Khai mạc & Nhận đề Hackathon',
    desc: 'Lễ khai mạc, giới thiệu Ban Giám khảo, BGK công bố chủ đề chính thức và bốc thăm vị trí.',
    badge: 'Khai mạc',
    badgeColor: 'bg-sky-100 text-sky-700',
  },
  {
    date: 'Sáng 29/05',
    title: 'Hackathon — 4 giờ thi đấu',
    desc: 'Các đội thực hiện thử thách theo chủ đề, được sử dụng công cụ AI theo quy định BTC.',
    badge: 'Thi đấu',
    badgeColor: 'bg-orange-100 text-orange-700',
  },
  {
    date: 'Chiều 29/05',
    title: 'Pitching & Phản biện',
    desc: 'Trình bày sản phẩm 5–7 phút/đội, hội đồng đặt câu hỏi phản biện.',
    badge: 'Demo',
    badgeColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    date: 'Chiều 29/05',
    title: 'Trao giải & Bế mạc',
    desc: 'Công bố kết quả, trao giải và cấp Giấy chứng nhận tham gia cho tất cả thí sinh.',
    badge: 'Trao giải',
    badgeColor: 'bg-emerald-100 text-emerald-700',
  },
]

function PhaseList({ items }: { items: TItem[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="flex gap-5 relative">
          {i < items.length - 1 && (
            <div className="timeline-connector" />
          )}
          {/* Dot */}
          <div className="shrink-0 mt-1 w-9 h-9 rounded-full border-2 border-azure-500 bg-white flex items-center justify-center z-10 shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-azure-500" />
          </div>
          {/* Content */}
          <div className="pb-9 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[12px] font-bold text-azure-600">{item.date}</span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${item.badgeColor}`}>
                {item.badge}
              </span>
            </div>
            <p className="text-[14px] font-semibold text-slate-800 mb-1 leading-snug">{item.title}</p>
            {item.desc && (
              <p className="text-[13px] text-slate-500 leading-relaxed">{item.desc}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Timeline() {
  return (
    <section id="timeline" className="py-24" style={{ background: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-16">
          <p className="section-label mb-3">Lịch trình</p>
          <h2 className="display text-4xl sm:text-5xl text-slate-900 mb-4">Tiến độ cuộc thi</h2>
          <p className="text-slate-500 max-w-lg text-[15px] leading-relaxed">
            Cuộc thi diễn ra qua hai giai đoạn chính từ tháng 4 đến tháng 5 năm 2026, bao gồm vòng online và chung kết tại Đồng Nai.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Phase 1 */}
          <div className="bg-white rounded-2xl border border-slate-100 p-7 sm:p-9 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-azure-50 flex items-center justify-center">
                  <svg width="16" height="16" fill="none" stroke="#2563EB" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-slate-800">Vòng 1 — Online</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Khám phá & Ý tưởng</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full font-medium">23/04 – 20/05</span>
            </div>
            <PhaseList items={phase1} />
          </div>

          {/* Phase 2 */}
          <div className="bg-white rounded-2xl border border-slate-100 p-7 sm:p-9 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                  <svg width="16" height="16" fill="none" stroke="#EA580C" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-slate-800">Vòng 2 — Chung kết</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Hackathon Offline</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full font-medium">29/05/2026</span>
            </div>
            <PhaseList items={phase2} />
            <div className="flex items-center gap-2 p-3 bg-azure-50 rounded-xl border border-azure-100">
              <svg className="text-azure-600 shrink-0" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" />
              </svg>
              <p className="text-[12px] text-azure-700 font-medium">Hội trường B203, Trường ĐH Lạc Hồng, Đồng Nai</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
