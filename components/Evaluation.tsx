const criteria = [
  {
    label: 'Ứng dụng AI',
    desc: 'Mức độ khai thác và tích hợp công nghệ AI vào sản phẩm một cách hiệu quả.',
    weight: 25,
    color: 'from-blue-500 to-azure-400',
    textColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    label: 'Tính sáng tạo',
    desc: 'Ý tưởng độc đáo, mới lạ và có giá trị ứng dụng thực tiễn.',
    weight: 20,
    color: 'from-violet-500 to-purple-400',
    textColor: 'text-violet-600',
    bgColor: 'bg-violet-50',
  },
  {
    label: 'Tính khả thi',
    desc: 'Sản phẩm có thể triển khai và phát triển trong thực tế.',
    weight: 20,
    color: 'from-emerald-500 to-teal-400',
    textColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    label: 'Kỹ năng trình bày',
    desc: 'Khả năng truyền đạt ý tưởng rõ ràng, thuyết phục và chuyên nghiệp.',
    weight: 20,
    color: 'from-amber-500 to-yellow-400',
    textColor: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    label: 'Khả năng phản biện',
    desc: 'Trả lời câu hỏi từ hội đồng giám khảo một cách logic và tự tin.',
    weight: 15,
    color: 'from-rose-500 to-pink-400',
    textColor: 'text-rose-600',
    bgColor: 'bg-rose-50',
  },
]

export default function Evaluation() {
  return (
    <section id="evaluation" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <p className="section-label mb-3">Đánh giá</p>
            <h2 className="display text-4xl sm:text-5xl text-slate-900">Tiêu chí chấm điểm</h2>
          </div>
          <p className="text-slate-500 max-w-sm text-[15px] leading-relaxed">
            Hội đồng giám khảo đánh giá dựa trên 5 tiêu chí, phản ánh toàn diện năng lực sáng tạo và kỹ thuật của thí sinh.
          </p>
        </div>

        <div className="space-y-4">
          {criteria.map((c, i) => (
            <div
              key={c.label}
              className="card-hover bg-white rounded-2xl border border-slate-100 p-6 flex items-center gap-6 shadow-sm"
            >
              {/* Index */}
              <div className={`shrink-0 w-10 h-10 rounded-full ${c.bgColor} ${c.textColor} flex items-center justify-center text-[13px] font-bold`}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[14px] font-bold text-slate-800">{c.label}</h3>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">{c.desc}</p>
                {/* Progress bar */}
                <div className="mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`eval-bar bg-gradient-to-r ${c.color}`}
                    style={{ width: `${c.weight * 4}%` }}
                  />
                </div>
              </div>

              {/* Weight */}
              <div className="shrink-0 text-right">
                <span className={`inline-block text-2xl font-bold ${c.textColor} display`}>{c.weight}%</span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-[12px] text-slate-400">
          Tỷ trọng điểm mang tính tham khảo – quyết định cuối cùng thuộc về Hội đồng Giám khảo.
        </p>
      </div>
    </section>
  )
}
