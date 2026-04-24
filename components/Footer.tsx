const navLinks = [
  { label: 'Giới thiệu', href: '#about' },
  { label: 'Lịch trình', href: '#timeline' },
  { label: 'Chủ đề', href: '#topics' },
  { label: 'Thể lệ', href: '#rules' },
  { label: 'Đánh giá', href: '#evaluation' },
  { label: 'Giải thưởng', href: '#awards' },
  { label: 'Ban giám khảo', href: '#judges' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#030B18' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img
  src="https://learn.lhu.edu.vn/pluginfile.php/1/theme_space/customlogosidebar/1731635809/rsz_1logo_dung_en_1_.png"
  alt="LHU Logo"
  className="w-10 h-10 rounded-xl object-contain"
/>
              <div>
                <p className="text-[10px] text-white/30 leading-none">Trường Đại học Lạc Hồng</p>
                <p className="text-[12px] font-semibold text-white/80">Khoa Công nghệ Thông tin</p>
              </div>
            </div>
            <p className="text-[13px] text-white/30 leading-relaxed mb-5">
              AI Discovery Hackathon 2026 — "AI cho mọi người – Sáng tạo không giới hạn"
            </p>
            <p className="text-[11px] text-white/20">Số: 26052/KH-CNTT · Đồng Nai, 16/04/2026</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-5">Điều hướng</p>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[13px] text-white/40 hover:text-white/70 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-5">Liên hệ</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="mt-0.5 shrink-0 text-white/25" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:phuongvdv@gmail.com" className="text-[13px] text-white/40 hover:text-white/70 transition-colors">
                  phuongvdv@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <svg className="mt-0.5 shrink-0 text-white/25" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-[13px] text-white/40 leading-relaxed">
                  Hội trường B203,<br />Trường Đại học Lạc Hồng, Đồng Nai
                </p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="mt-0.5 shrink-0 text-white/25" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-[13px] text-white/40">Ngày 16 tháng 05 năm 2026</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[12px] text-white/20">
            © 2026 Khoa CNTT – Trường Đại học Lạc Hồng. All rights reserved.
          </p>
          <p className="text-[11px] text-white/15">
            Được xây dựng bởi Khoa Công nghệ Thông tin
          </p>
        </div>
      </div>
    </footer>
  )
}