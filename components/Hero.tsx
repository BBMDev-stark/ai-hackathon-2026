"use client";
import { useEffect, useState, useRef } from "react";

const REGISTER_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeotO9ptxV8cUh04oTAq6zhPSLet8-BtOv1-5tGetS_QPHP3w/viewform";

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    setTime(calc());
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

// ── Canvas: aurora + grid + constellation ────────────────────
function AnimatedBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      o: Math.random() * 0.4 + 0.08,
    }));

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.003;

      // Aurora blobs
      const blobs = [
        { x: canvas.width * 0.25 + Math.sin(t * 0.7) * 90, y: canvas.height * 0.35 + Math.cos(t * 0.5) * 70, r: 420, c: "rgba(29,78,216,0.13)" },
        { x: canvas.width * 0.78 + Math.cos(t * 0.55) * 110, y: canvas.height * 0.25 + Math.sin(t * 0.4) * 80, r: 360, c: "rgba(6,182,212,0.09)" },
        { x: canvas.width * 0.5 + Math.sin(t * 0.9) * 50, y: canvas.height * 0.65 + Math.cos(t * 0.8) * 55, r: 300, c: "rgba(37,99,235,0.08)" },
        { x: canvas.width * 0.12 + Math.cos(t * 0.45) * 60, y: canvas.height * 0.75 + Math.sin(t * 0.6) * 45, r: 260, c: "rgba(14,165,233,0.06)" },
      ];
      blobs.forEach((b) => {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, b.c);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle grid
      ctx.strokeStyle = "rgba(59,130,246,0.035)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 64) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 64) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Particles + constellation lines
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${p.o})`;
        ctx.fill();
      });
      particles.forEach((a, i) => {
        particles.slice(i + 1, i + 5).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(147,197,253,${0.07 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function CountBox({ val, label }: { val: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[60px]">
      <div className="hero-float-card px-4 py-3 w-full text-center mb-1.5">
        <span className="text-3xl font-black text-white tabular-nums display leading-none">
          {String(val).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] uppercase tracking-widest text-white/35 font-semibold">
        {label}
      </span>
    </div>
  );
}

function FloatingCard({ delay, className, children }: { delay?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={`hero-float-card p-4 ${className ?? ""}`} style={{ animationDelay: delay }}>
      {children}
    </div>
  );
}

export default function Hero() {
  const deadline = new Date("2026-04-30T23:59:59");
  const time = useCountdown(deadline);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [leftRef.current, rightRef.current];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(150deg, #030B18 0%, #060E1E 45%, #0D1B30 100%)" }}
    >
      {/* ── Canvas animated background ── */}
      <AnimatedBg />

      {/* Animated grid overlay (existing) */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-30" />

      {/* Glow orbs */}
      <div aria-hidden className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 65%)" }} />
      <div aria-hidden className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)" }} />
      <div aria-hidden className="absolute top-[40%] left-[35%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 65%)" }} />

      {/* Vertical accent line */}
      <div aria-hidden className="absolute top-0 right-[28%] w-px h-full pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.18) 35%, rgba(59,130,246,0.18) 65%, transparent 100%)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── LEFT ── */}
          <div ref={leftRef} data-reveal style={{ animationDelay: "0.1s" }}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/12 bg-white/5 backdrop-blur-sm mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-azure-400 animate-pulse-slow" />
              <span className="text-[11px] font-semibold text-white/55 tracking-widest uppercase">
                Khoa CNTT · Đại học Lạc Hồng · 2026
              </span>
            </div>

            <h1 className="display text-5xl sm:text-6xl lg:text-[64px] text-white leading-[1.06] mb-5 font-bold">
              AI Discovery
              <br />
              <span className="gradient-text">Hackathon 2026</span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/40 mb-9 font-light leading-relaxed">
              "AI cho mọi người – Sáng tạo không giới hạn"
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>, main: "Vòng 1: 23/04 – 10/05/2026", sub: "Hình thức Online" },
                { icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, main: "Chung kết: 16/05/2026", sub: "B203, LHU – Đồng Nai" },
                { icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>, main: "Tối đa 3 thành viên/đội", sub: "Miễn phí tham gia" },
              ].map((item) => (
                <div key={item.main} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white/65 backdrop-blur-sm">
                  <span className="text-azure-400 shrink-0">{item.icon}</span>
                  <div>
                    <p className="leading-none font-medium text-white/75">{item.main}</p>
                    <p className="text-[11px] text-white/35 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-10">
              <p className="text-[10px] uppercase tracking-widest text-white/25 font-bold mb-3">
                Đếm ngược đến hạn đăng ký — 30/04/2026
              </p>
              <div className="flex gap-3">
                <CountBox val={time.days} label="Ngày" />
                <div className="flex items-start pt-3 text-white/30 font-bold text-xl select-none">:</div>
                <CountBox val={time.hours} label="Giờ" />
                <div className="flex items-start pt-3 text-white/30 font-bold text-xl select-none">:</div>
                <CountBox val={time.minutes} label="Phút" />
                <div className="flex items-start pt-3 text-white/30 font-bold text-xl select-none">:</div>
                <CountBox val={time.seconds} label="Giây" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl text-white text-[15px] font-bold shadow-xl transition-all hover:scale-[1.03] hover:shadow-2xl"
                style={{ background: "linear-gradient(90deg, #1D4ED8, #2563EB, #3B82F6)" }}>
                Đăng ký ngay hôm nay
                <svg className="transition-transform group-hover:translate-x-1" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#about"
                onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-white/55 text-[14px] font-medium border border-white/12 hover:border-white/25 hover:text-white/80 transition-all">
                Tìm hiểu thêm
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            <p className="mt-9 text-[11px] text-white/20 uppercase tracking-widest font-medium">
              Tổ chức bởi Khoa Công nghệ Thông tin · Trường Đại học Lạc Hồng
            </p>
          </div>

          {/* ── RIGHT ── */}
          <div ref={rightRef} data-reveal="right" className="hidden lg:flex flex-col items-center relative">
            <div className="relative w-full max-w-[440px] mx-auto">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                style={{ background: "linear-gradient(135deg, #1D4ED8 0%, #7C3AED 60%, #0EA5E9 100%)" }}>
                <div className="relative w-full h-[380px] flex flex-col items-center justify-center">
                  <div className="absolute inset-0 grid-bg opacity-40" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[360px] h-[360px] rounded-full border border-white/8 absolute" />
                    <div className="w-[260px] h-[260px] rounded-full border border-white/10 absolute" />
                    <div className="w-[160px] h-[160px] rounded-full border border-white/15 absolute" />
                  </div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center mb-4 backdrop-blur-sm shadow-xl"
                      style={{ animation: "float 6s ease-in-out infinite" }}>
                      <svg width="40" height="40" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-white font-black text-2xl tracking-tight display">AI Discovery</p>
                    <p className="text-white/50 text-sm mt-1">Hackathon 2026</p>
                  </div>
                  {[
                    { label: "Prompt Engineering", top: "12%", left: "5%", delay: "0s" },
                    { label: "Machine Learning", top: "20%", right: "4%", delay: "1.5s" },
                    { label: "AI Prototype", bottom: "22%", left: "4%", delay: "0.8s" },
                    { label: "Pitching & Demo", bottom: "14%", right: "4%", delay: "2s" },
                  ].map((b) => (
                    <div key={b.label}
                      className="absolute px-3 py-1.5 rounded-full text-[11px] font-semibold text-white/80 bg-white/10 border border-white/20 backdrop-blur-sm"
                      style={{ top: b.top, left: b.left, right: b.right, bottom: b.bottom, animation: "float 7s ease-in-out infinite", animationDelay: b.delay }}>
                      {b.label}
                    </div>
                  ))}
                </div>
              </div>

              <FloatingCard className="absolute -left-10 top-10 flex items-center gap-3" delay="0s">
                <div className="w-10 h-10 rounded-xl bg-azure-600/60 flex items-center justify-center">
                  <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div><p className="text-white font-bold text-lg display leading-none">8 giờ</p><p className="text-white/45 text-[11px] mt-0.5">Thi Hackathon</p></div>
              </FloatingCard>

              <FloatingCard className="absolute -right-10 top-[30%] flex items-center gap-3" delay="1s">
                <div className="w-10 h-10 rounded-xl bg-violet-600/60 flex items-center justify-center">
                  <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div><p className="text-white font-bold text-lg display leading-none">Top 10</p><p className="text-white/45 text-[11px] mt-0.5">Đội chung kết</p></div>
              </FloatingCard>

              <FloatingCard className="absolute -left-8 bottom-8 flex items-center gap-3" delay="0.5s">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/60 flex items-center justify-center">
                  <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div><p className="text-white font-bold text-lg display leading-none">6.8 Tr</p><p className="text-white/45 text-[11px] mt-0.5">Giải thưởng</p></div>
              </FloatingCard>

              <FloatingCard className="absolute -right-8 bottom-6 flex items-center gap-3" delay="1.5s">
                <div className="w-10 h-10 rounded-xl bg-amber-600/60 flex items-center justify-center">
                  <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                </div>
                <div><p className="text-white font-bold text-lg display leading-none">3 chủ đề</p><p className="text-white/45 text-[11px] mt-0.5">Lĩnh vực thi</p></div>
              </FloatingCard>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, white)" }} />
    </section>
  );
}