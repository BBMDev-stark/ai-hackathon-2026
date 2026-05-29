"use client";
import { useState, useEffect } from "react";

// ─── Hardcoded Exam Schedule ──────────────────────────────────────────────────
const EXAM_START = new Date("2026-05-29T08:55:00");
const EXAM_END = new Date("2026-05-29T14:30:00"); // 9h + 5 tiếng = 14h
const TOTAL_DURATION = EXAM_END.getTime() - EXAM_START.getTime();

// ─── Pillar Cards ─────────────────────────────────────────────────────────────
const pillars = [
  {
    num: "01",
    title: "Vũ trụ kiến thức 2030",
    desc: "Nền tảng học tập, chia sẻ và khai thác tri thức bằng AI cho tương lai giáo dục.",
    color: "from-blue-600 to-indigo-700",
    lightBg: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200 hover:border-blue-400",
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Trợ lý học tập thông minh",
    desc: "Trợ lý AI hỗ trợ học tập, ôn tập và phát triển kỹ năng cá nhân cho sinh viên.",
    color: "from-violet-600 to-purple-700",
    lightBg: "bg-violet-50",
    iconColor: "text-violet-600",
    borderColor: "border-violet-200 hover:border-violet-400",
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Lớp học an toàn số",
    desc: "Ứng dụng AI tạo môi trường học tập số an toàn, lành mạnh và hiệu quả.",
    color: "from-emerald-600 to-teal-700",
    lightBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-200 hover:border-emerald-400",
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

// ─── Timer Display Unit ───────────────────────────────────────────────────────
function TimerUnit({ value, label }: { value: number; label: string }) {
  const display = String(Math.max(0, value)).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-[76px] h-[76px] sm:w-[88px] sm:h-[88px] flex items-center justify-center rounded-2xl bg-[#030B18] border border-white/10 shadow-lg shadow-blue-950/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
        <span className="relative text-3xl sm:text-4xl font-bold text-white tabular-nums tracking-tighter font-sans">
          {display}
        </span>
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400/70">
        {label}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ExamAnnouncement() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const isUpcoming = now < EXAM_START;
  const isLive = now >= EXAM_START && now < EXAM_END;
  const isFinished = now >= EXAM_END;

  // Nếu chưa bắt đầu → đếm ngược đến giờ khai mạc
  // Nếu đang diễn ra → đếm ngược đến giờ kết thúc
  const targetMs = isUpcoming
    ? EXAM_START.getTime() - now.getTime()
    : isLive
      ? EXAM_END.getTime() - now.getTime()
      : 0;

  const hours = Math.floor(targetMs / 3600000);
  const minutes = Math.floor((targetMs % 3600000) / 60000);
  const seconds = Math.floor((targetMs % 60000) / 1000);

  const pct = isFinished
    ? 100
    : isLive
      ? Math.min(
          100,
          ((now.getTime() - EXAM_START.getTime()) / TOTAL_DURATION) * 100,
        )
      : 0;

  // Circular progress
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - pct / 100);

  return (
    <section
      id="exam"
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 50%, #F8FAFC 100%)",
      }}
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.07) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Radial accent top-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* ── Section Header ─────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <p className="section-label mb-3">Công bố đề thi</p>
            <h2 className="display text-4xl sm:text-5xl text-slate-900 leading-tight">
              Thử thách chính thức
              <br />
              <span className="gradient-text">AI Discovery 2026</span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm text-[15px] leading-relaxed lg:text-right">
            Đề thi được công bố chính thức tại lễ khai mạc.{" "}
            {isUpcoming && "Cuộc thi bắt đầu lúc 08:55, ngày 29/05/2026."}
            {isLive && (
              <strong className="text-slate-700">Cuộc thi đang diễn ra!</strong>
            )}
            {isFinished && "Cuộc thi đã kết thúc. Cảm ơn tất cả các đội thi."}
          </p>
        </div>

        {/* ── Main Grid ──────────────────────────────────────── */}
        <div className="grid lg:grid-cols-5 gap-6 mb-8">
          {/* Left: Đề thi card (span 3) */}
          <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* accent stripe */}
            <div className="h-1.5 bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600" />

            <div className="p-8 sm:p-10">
              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
                  Đề thi chính thức
                </span>
              </div>

              {/* Chủ đề */}
              <div className="mb-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
                  Chủ đề
                </p>
                <h3 className="display text-2xl sm:text-3xl text-slate-900 leading-snug">
                  Kiến tạo không gian giáo dục số tương lai tại Đại học Lạc Hồng
                </h3>
              </div>

              {/* Divider */}
              <div className="section-divider mb-8" />

              {/* Thách thức */}
              <div className="mb-8">
                <p className="text-[20px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-3">
                  Thách thức
                </p>
                <p className="text-[18px] text-slate-600 leading-[1.8]">
                  Dựa trên <strong className="text-slate-800">3 trụ cột</strong>{" "}
                  bên dưới, đội của bạn hãy chọn ra{" "}
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold text-[13px]">
                    ít nhất một
                  </span>{" "}
                  vấn đề nhức nhối nhất của sinh viên hiện nay và đề xuất một{" "}
                  <strong className="text-slate-800">giải pháp đột phá</strong>{" "}
                  để giải quyết nó.
                </p>
              </div>

              {/* 3 Pillars */}
              <div className="grid sm:grid-cols-3 gap-3">
                {pillars.map((p) => (
                  <div
                    key={p.num}
                    className={`card-hover group rounded-xl border ${p.borderColor} bg-white p-4 transition-all`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl ${p.lightBg} ${p.iconColor} flex items-center justify-center mb-3`}
                    >
                      {p.icon}
                    </div>
                    <p className="text-[13px] font-bold text-slate-400 mb-1">
                      Trụ cột {p.num}
                    </p>
                    <h4 className="text-[18px] font-bold text-slate-800 leading-snug mb-2">
                      {p.title}
                    </h4>
                    <p className="text-[16px] text-slate-500 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Timer card (span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Timer box */}
            <div
              className="flex-1 rounded-3xl border border-slate-200 bg-[#030B18] shadow-lg overflow-hidden relative"
              style={{ minHeight: 320 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15)_0%,transparent_60%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.1)_0%,transparent_55%)] pointer-events-none" />

              <div className="relative p-7 sm:p-8 flex flex-col h-full">
                <div className="mb-6">
                  <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.25em] mb-1">
                    {isUpcoming
                      ? "Đếm ngược khai mạc"
                      : isLive
                        ? "Thời gian còn lại"
                        : "Cuộc thi kết thúc"}
                  </p>
                  <p className="text-[13px] text-slate-400">
                    {isUpcoming && "08:55 → 14:30 · 29/05/2026"}
                    {isLive && "Kết thúc lúc 14:30 hôm nay"}
                    {isFinished && "Cảm ơn các đội đã tham gia"}
                  </p>
                </div>

                {/* Circular Progress + Time Display */}
                <div className="flex flex-col items-center gap-6 flex-1 justify-center">
                  <div className="relative w-[130px] h-[130px]">
                    <svg
                      className="w-full h-full -rotate-90"
                      viewBox="0 0 120 120"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        strokeWidth="6"
                        stroke="rgba(255,255,255,0.06)"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        strokeWidth="6"
                        stroke="url(#timerGrad)"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        style={{ transition: "stroke-dashoffset 1s linear" }}
                      />
                      <defs>
                        <linearGradient
                          id="timerGrad"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#60A5FA" />
                          <stop offset="100%" stopColor="#A78BFA" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[10px] text-slate-500 mb-0.5">
                        {isUpcoming
                          ? "Bắt đầu sau"
                          : isLive
                            ? "Còn lại"
                            : "Hết giờ"}
                      </span>
                      <span className="text-[22px] font-bold text-white tabular-nums leading-none">
                        {String(hours).padStart(2, "0")}:
                        {String(minutes).padStart(2, "0")}
                      </span>
                      <span className="text-[11px] text-slate-400 mt-0.5">
                        {String(seconds).padStart(2, "0")} giây
                      </span>
                    </div>
                  </div>

                  {/* HH MM SS units */}
                  <div className="flex items-center gap-3">
                    <TimerUnit value={hours} label="Giờ" />
                    <span className="text-2xl font-light text-slate-600 mb-5">
                      :
                    </span>
                    <TimerUnit value={minutes} label="Phút" />
                    <span className="text-2xl font-light text-slate-600 mb-5">
                      :
                    </span>
                    <TimerUnit value={seconds} label="Giây" />
                  </div>

                  {/* Status badge */}
                  {isLive && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/15 border border-green-400/30">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[11px] font-bold text-green-400 uppercase tracking-widest">
                        Đang diễn ra
                      </span>
                    </div>
                  )}
                  {isUpcoming && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-400/30">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
                        Chưa bắt đầu
                      </span>
                    </div>
                  )}
                  {isFinished && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30">
                      <svg
                        width="14"
                        height="14"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                        Hết giờ!
                      </span>
                    </div>
                  )}
                </div>

                {/* Schedule info bar */}
                <div className="mt-6 pt-5 border-t border-white/[0.08] grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                      Bắt đầu
                    </p>
                    <p className="text-[13px] font-bold text-white">08:55</p>
                    <p className="text-[10px] text-slate-500">29/05/2026</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                      Kết thúc
                    </p>
                    <p className="text-[13px] font-bold text-white">14:30</p>
                    <p className="text-[10px] text-slate-500">29/05/2026</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick info card */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">
                Lưu ý quan trọng
              </p>
              <ul className="space-y-3">
                {[
                  { icon: "", text: "Chọn ít nhất 1 trong 3 trụ cột" },
                  { icon: "", text: "Đề xuất giải pháp đột phá, khả thi" },
                  { icon: "", text: "Tập trung vào vấn đề sinh viên LHU" },
                  {
                    icon: "",
                    text: "Thời gian làm bài: 5 giờ (08:55 – 14:30)",
                  },
                ].map((item) => (
                  <li
                    key={item.text}
                    className="flex items-start gap-3 text-[13px] text-slate-600"
                  >
                    <span className="text-base leading-none mt-0.5">
                      {item.icon}
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom Banner ───────────────────────────────────── */}
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-600 to-indigo-600 overflow-hidden shadow-lg shadow-blue-200/50">
          <div className="px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-[15px] leading-snug">
                  Sẵn sàng kiến tạo tương lai?
                </p>
                <p className="text-blue-100/80 text-[13px]">
                  Đề thi yêu cầu tư duy sáng tạo và khả năng ứng dụng AI thực
                  tiễn.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[11px] font-bold text-blue-200 uppercase tracking-widest">
                Hackathon · AI Discovery 2026
              </span>
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="white"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
