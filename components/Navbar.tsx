"use client";
import { useState, useEffect } from "react";

const LOGO_URL =
  "https://learn.lhu.edu.vn/pluginfile.php/1/theme_space/customlogosidebar/1731635809/rsz_1logo_dung_en_1_.png";

const navLinks = [
  { label: "Giới thiệu", href: "#about" },
  { label: "Lịch trình", href: "#timeline" },
  { label: "Chủ đề", href: "#topics" },
  { label: "Thể lệ", href: "#rules" },
  { label: "Giải thưởng", href: "#awards" },
  { label: "Giám khảo", href: "#judges" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-[68px]">
        {/* Logo */}
        <a href="#" className="flex items-center shrink-0">
          <img
            src={LOGO_URL}
            alt="Trường Đại học Lạc Hồng"
            className="h-9 w-auto object-contain transition-all duration-300"
            style={{
              // Khi chưa scroll (nền tối): invert sang trắng
              // Khi đã scroll (nền trắng): hiện màu gốc
              filter: scrolled ? "none" : "brightness(0) invert(1)",
            }}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link transition-colors ${scrolled ? "text-slate-600 hover:text-azure-600" : "text-white/70 hover:text-white"}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#cta"
          className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
            scrolled
              ? "bg-azure-600 text-white hover:bg-azure-700 shadow-md hover:shadow-lg"
              : "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm"
          }`}
        >
          Đăng ký tham gia
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-slate-700" : "text-white"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {menuOpen ? (
              <path strokeLinecap="round" d="M4 4l16 16M20 4L4 20" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-t border-slate-100 px-5 py-5 flex flex-col gap-1">
          {/* Logo lại trong mobile menu */}
          <div className="mb-3 pb-3 border-b border-slate-100">
            <img
              src={LOGO_URL}
              alt="Trường Đại học Lạc Hồng"
              className="h-8 w-auto object-contain"
            />
          </div>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-slate-700 hover:text-azure-600 py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#register"
            onClick={() => setMenuOpen(false)}
            className="mt-3 flex justify-center items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-azure-600"
          >
            Đăng ký tham gia
          </a>
        </div>
      )}
    </header>
  );
}
