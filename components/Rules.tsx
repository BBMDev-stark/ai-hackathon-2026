'use client'
import { useState } from 'react'

function RulesBanner() {
  const [imgError, setImgError] = useState(false)
  return (
    <div className="mb-12 rounded-2xl overflow-hidden shadow-sm border border-slate-100 relative h-[200px] sm:h-[240px]">
      {!imgError ? (
        <img
          src="/imgs/AI-Discovery-Hackathon-2026.png"
          alt="Quy định tham gia"
          className="w-full h-full object-cover object-center"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center gap-4"
          style={{ background: 'linear-gradient(135deg, #F0F9FF 0%, #EFF6FF 50%, #F5F3FF 100%)' }}>
          <div className="text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-white/70 shadow-sm flex items-center justify-center mb-2">
              <svg width="28" height="28" fill="none" stroke="#2563EB" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      )}
      {/* Overlay text */}
      {!imgError && (
        <div className="absolute inset-0 flex items-end p-6"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }}>
          <div>
            <p className="text-white/70 text-[11px] font-bold uppercase tracking-widest mb-1">AI Discovery Hackathon 2026</p>
            <p className="text-white text-xl font-bold leading-tight">Quy định & Thể lệ tham gia</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Rules() {
  return (
    <section id="rules" className="py-24" style={{ background: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-10">
          <p className="section-label mb-3">Thể lệ</p>
          <h2 className="display text-4xl sm:text-5xl text-slate-900 mb-4">Quy định tham gia</h2>
          <p className="text-slate-500 max-w-lg text-[15px] leading-relaxed">
            Cuộc thi mở cho học sinh THPT lớp 11, 12 tại Đồng Nai và khu vực lân cận, cùng sinh viên LHU quan tâm đến AI.
          </p>
        </div>

        {/* Banner image */}
        <RulesBanner />

        <div className="grid sm:grid-cols-3 gap-5">
          {/* Participation */}
          <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-azure-50 text-azure-600 flex items-center justify-center mb-5">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-[15px] font-bold text-slate-800 mb-4">Hình thức tham gia</h3>
            <ul className="space-y-3">
              {[
                'Cá nhân hoặc đội thi',
                'Tối đa 3 thành viên/đội',
                'Học sinh THPT lớp 11, 12 tỉnh Đồng Nai & lân cận',
                'Sinh viên LHU năm nhất, năm hai quan tâm đến AI và công nghệ số',
                'Đăng ký qua Google Form của Ban Tổ chức',
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[13px] text-slate-600">
                  <svg className="mt-0.5 shrink-0 text-azure-500" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Submission */}
          <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-5">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-[15px] font-bold text-slate-800 mb-4">Sản phẩm nộp (Vòng 1)</h3>
            <ul className="space-y-3">
              {[
                ['Video trình bày ý tưởng', 'Nội dung & concept AI'],
                ['Proposal', 'Mô tả chi tiết dự án'],
                ['Prompt Log', 'Quy trình sử dụng AI'],
                ['Prototype', 'Sản phẩm mẫu demo'],
              ].map(([title, sub]) => (
                <li key={title} className="flex items-start gap-2.5">
                  <svg className="mt-0.5 shrink-0 text-violet-500" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="text-[13px] font-semibold text-slate-700">{title}</p>
                    <p className="text-[11px] text-slate-400">{sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-[15px] font-bold text-slate-800 mb-4">Yêu cầu & Quy định</h3>
            <ul className="space-y-3">
              {[
                'Sản phẩm phải do chính thí sinh thực hiện',
                'Không sao chép từ nguồn khác',
                'Được dùng công cụ AI theo quy định BTC',
                'Thí sinh chịu trách nhiệm về bản quyền sản phẩm',
                'Tham gia đầy đủ các hoạt động theo lịch trình',
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[13px] text-slate-600">
                  <svg className="mt-0.5 shrink-0 text-emerald-500" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* General note */}
        <div className="mt-6 p-5 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4">
          <svg className="shrink-0 text-amber-600 mt-0.5" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-[13px] text-amber-800">
            <strong>Lưu ý:</strong> Ban Tổ chức có quyền sử dụng sản phẩm, hình ảnh của thí sinh cho mục đích truyền thông. Quyết định của Hội đồng Giám khảo là quyết định cuối cùng. Ban Tổ chức có thể điều chỉnh thể lệ và sẽ thông báo chính thức đến các đội thi khi cần thiết.
          </p>
        </div>
      </div>
    </section>
  )
}