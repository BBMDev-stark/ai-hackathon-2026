const rounds = [
  {
    id: 'round1',
    number: '01',
    label: 'Vòng 1',
    title: 'Khám phá & Ý tưởng',
    mode: 'Online',
    period: '23 tháng 04 – 20 tháng 05, 2026',
    accent: '#2563EB',
    accentLight: '#EFF6FF',
    accentMid: '#BFDBFE',
    phases: [
      {
        phase: 'Giai đoạn 01',
        title: 'Đăng ký & Chuỗi Workshop Prompt Master',
        steps: [
          {
            date: '23/04 – 30/04',
            label: 'Mở đăng ký trực tuyến',
            desc: 'Đăng ký qua Google Form. Ban tổ chức phổ biến thể lệ, tiêu chí chấm điểm và hướng dẫn nộp bài.',
          },
          {
            date: '07/05',
            label: 'Workshop Buổi 1 — Nhập môn AI',
            desc: 'Giới thiệu tổng quan về Trí tuệ Nhân tạo và kỹ thuật Prompt Engineering cơ bản.',
            badge: 'Prompt Master',
          },
          {
            date: '09/05',
            label: 'Workshop Buổi 2 — AI & Truyền thông',
            desc: 'Ứng dụng AI trong truyền thông và sáng tạo nội dung đa phương tiện.',
            badge: 'Prompt Master',
          },
          {
            date: '13/05',
            label: 'Workshop Buổi 3 — Prototype & Pitching',
            desc: 'Thực hành xây dựng Prototype AI và rèn luyện kỹ năng thuyết trình chuyên nghiệp.',
            badge: 'Prompt Master',
          },
        ],
      },
      {
        phase: 'Giai đoạn 02',
        title: 'Nộp bài thi — 3 Chủ đề',
        steps: [
          {
            label: 'Chủ đề 1 — Vũ trụ kiến thức 2030',
            desc: 'Sản phẩm gồm: Video ý tưởng + Proposal + Prompt Log + Prototype.',
          },
          {
            label: 'Chủ đề 2 — Trợ lý học tập thông minh',
            desc: 'Xây dựng giải pháp AI hỗ trợ quá trình học tập cá nhân hoá cho người dùng.',
          },
          {
            label: 'Chủ đề 3 — Lớp học an toàn số',
            desc: 'Đề xuất mô hình AI tạo ra môi trường học tập an toàn và lành mạnh trên không gian số.',
          },
        ],
      },
      {
        phase: 'Giai đoạn 03',
        title: 'Chấm điểm & Công bố kết quả',
        steps: [
          {
            label: 'Hội đồng Giám khảo chấm điểm',
            desc: 'Đánh giá theo 4 tiêu chí: Tính sáng tạo — Ứng dụng AI — Tính khả thi — Kỹ năng trình bày.',
          },
          {
            date: '10/05',
            label: 'Công bố danh sách vào Chung kết',
            desc: '10 đội xuất sắc nhất được lựa chọn vào Vòng 2 — Chung kết Hackathon.',
          },
        ],
      },
    ],
  },
  {
    id: 'round2',
    number: '02',
    label: 'Vòng 2',
    title: 'Chung kết Hackathon',
    mode: 'Offline',
    period: '29 tháng 05, 2026 — Hội trường B203, LHU',
    accent: '#7C3AED',
    accentLight: '#F5F3FF',
    accentMid: '#DDD6FE',
    phases: [
      {
        phase: 'Buổi sáng',
        title: 'Khai mạc & Nhận đề thi',
        steps: [
          {
            label: 'Lễ khai mạc',
            desc: 'Giới thiệu Ban Giám khảo, phổ biến thể lệ và quy định thi Chung kết chính thức.',
          },
          {
            label: 'Công bố chủ đề & Bốc thăm',
            desc: 'Ban Giám khảo công bố 01 chủ đề Hackathon. Các đội bốc thăm thứ tự trình bày.',
          },
          {
            label: 'Hackathon Sprint',
            desc: 'Các đội bắt đầu xây dựng sản phẩm trong thời gian tối đa 04 giờ với công cụ AI được Ban tổ chức phê duyệt.',
            badge: '08 giờ',
          },
        ],
      },
      {
        phase: 'Buổi chiều',
        title: 'Pitching, Phản biện & Trao giải',
        steps: [
          {
            label: 'Hoàn thiện & Chuẩn bị',
            desc: 'Các đội hoàn chỉnh sản phẩm, chuẩn bị Pitch Deck và kịch bản demo trực tiếp.',
          },
          {
            label: 'Trình bày & Phản biện',
            desc: 'Mỗi đội trình bày và demo sản phẩm trực tiếp trước Hội đồng Giám khảo. Thời lượng: 5–7 phút/đội, tiếp theo là phần hỏi – đáp.',
            badge: '5–7 phút / đội',
          },
          {
            label: 'Tổng kết & Xếp hạng',
            desc: 'Hội đồng Giám khảo hội ý riêng, tổng hợp điểm và công bố kết quả xếp hạng chung cuộc.',
          },
          {
            label: 'Lễ trao giải & Bế mạc',
            desc: 'Trao giải thưởng, cấp Giấy chứng nhận tham gia cho toàn bộ thí sinh và bế mạc cuộc thi.',
          },
        ],
      },
    ],
  },
]

export default function Rounds() {
  return (
    <section id="rounds" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="mb-16 border-b border-slate-200 pb-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="section-label mb-3">Lịch trình thi đấu</p>
              <h2 className="display text-4xl sm:text-5xl text-slate-900">
                Các vòng thi<br />& Workshop
              </h2>
            </div>
            <p className="text-slate-500 max-w-md text-[15px] leading-relaxed lg:text-right">
              Cuộc thi diễn ra từ tháng 4 đến tháng 5 năm 2026, bao gồm vòng sơ loại trực tuyến với chuỗi Workshop thực chiến và vòng Chung kết trực tiếp tại Đại học Lạc Hồng.
            </p>
          </div>
        </div>

        {/* Rounds */}
        <div className="space-y-16">
          {rounds.map((round) => (
            <div key={round.id}>

              {/* Round Title Bar */}
              <div className="flex items-stretch gap-0 mb-8">
                <div
                  className="flex items-center justify-center w-20 shrink-0 rounded-l-xl"
                  style={{ backgroundColor: round.accent }}
                >
                  <span className="text-white font-black text-2xl display tracking-tight rotate-0">{round.number}</span>
                </div>
                <div
                  className="flex-1 flex flex-wrap items-center justify-between gap-4 px-6 py-4 rounded-r-xl border border-l-0"
                  style={{ borderColor: round.accentMid, backgroundColor: round.accentLight }}
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: round.accent }}>
                      {round.label}
                    </span>
                    <h3 className="text-slate-900 font-bold text-xl display mt-0.5">{round.title}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded border"
                      style={{ color: round.accent, borderColor: round.accentMid, backgroundColor: 'white' }}
                    >
                      {round.mode}
                    </span>
                    <span className="text-[12px] text-slate-500 font-medium">{round.period}</span>
                  </div>
                </div>
              </div>

              {/* Phases */}
              <div className="grid lg:grid-cols-3 gap-6" style={round.phases.length === 2 ? {gridTemplateColumns: '1fr 1fr'} : {}}>
                {round.phases.map((phase, pi) => (
                  <div key={pi} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">

                    {/* Phase Header */}
                    <div className="px-5 py-4 border-b border-slate-200 bg-white">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-1">{phase.phase}</p>
                      <p className="text-[14px] font-semibold text-slate-800 leading-snug">{phase.title}</p>
                    </div>

                    {/* Steps */}
                    <div className="divide-y divide-slate-200">
                      {phase.steps.map((step, si) => (
                        <div key={si} className="px-5 py-4 bg-white border-b border-slate-100 last:border-0">
                          <div className="flex items-start justify-between gap-3 mb-1.5">
                            <div className="flex items-start gap-2.5">
                              <span
                                className="mt-[3px] shrink-0 w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: round.accent }}
                              />
                              <span className="text-[13px] font-semibold text-slate-800 leading-snug">
                                {step.label}
                              </span>
                            </div>
                            {'badge' in step && step.badge && (
                              <span
                                className="shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded"
                                style={{ color: round.accent, backgroundColor: round.accentLight }}
                              >
                                {step.badge}
                              </span>
                            )}
                          </div>
                          {'date' in step && step.date && (
                            <p className="text-[11px] font-semibold text-slate-400 mb-1.5 ml-4">{step.date}</p>
                          )}
                          <p className="text-[12px] text-slate-500 leading-relaxed ml-4">{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[12px] text-slate-400">
            Địa điểm Chung kết: Hội trường B203, Trường Đại học Lạc Hồng (LHU), Đồng Nai.
          </p>
          <p className="text-[12px] text-slate-400">
            Lịch trình có thể điều chỉnh — Ban Tổ chức sẽ thông báo chính thức.
          </p>
        </div>

      </div>
    </section>
  )
}