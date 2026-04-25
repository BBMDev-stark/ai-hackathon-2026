"use client";
import { useEffect, useRef } from "react";

const STATS = [
  { value: "8 giờ", label: "Thi Hackathon" },
  { value: "Top 10", label: "Đội Chung kết" },
  { value: "6.8 Tr", label: "Giải thưởng" },
  { value: "3 chủ đề", label: "Lĩnh vực thi" },
];

// Render multi-line text onto offscreen canvas and sample lit pixels
function getTextPoints(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
): { x: number; y: number }[] {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const lines = [
    { text: "AI Discovery", size: Math.floor(h * 0.26) },
    { text: "Hackathon", size: Math.floor(h * 0.26) },
    { text: "2026", size: Math.floor(h * 0.22) },
  ];

  const lineH = h / lines.length;
  lines.forEach((l, i) => {
    ctx.font = `900 ${l.size}px 'Arial Black', Arial`;
    ctx.fillText(l.text, w / 2, lineH * i + lineH / 2);
  });

  const imageData = ctx.getImageData(0, 0, w, h).data;
  const points: { x: number; y: number }[] = [];
  const gap = 5;
  for (let y = 0; y < h; y += gap) {
    for (let x = 0; x < w; x += gap) {
      const idx = (y * w + x) * 4;
      if (imageData[idx + 3] > 128) points.push({ x, y });
    }
  }
  return points;
}

interface Particle {
  x: number; y: number;
  tx: number; ty: number;
  vx: number; vy: number;
  r: number; color: string; alpha: number;
  angle: number; orbitRadius: number; orbitSpeed: number;
  trailX: number[]; trailY: number[];
}

// LHU Logo drawn with SVG overlay
function LHULogo() {
  return (
    <div
      className="absolute top-3 right-4 z-20 flex items-center gap-2 select-none pointer-events-none"
      title="Đại học Lạc Hồng"
    >
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full blur-lg opacity-40"
          style={{ background: "radial-gradient(circle,rgba(56,189,248,0.6),transparent 70%)" }}
        />
        <img
          src="https://learn.lhu.edu.vn/pluginfile.php/1/theme_space/customlogosidebar/1731635809/rsz_1logo_dung_en_1_.png"
          alt="LHU Logo"
          width={44}
          height={44}
          className="relative object-contain"
          style={{ filter: "brightness(1.05) drop-shadow(0 0 6px rgba(56,189,248,0.6))" }}
        />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[8px] text-white/50 font-semibold tracking-widest uppercase">Lạc Hồng</span>
        <span className="text-[7px] text-white/25 tracking-wider">University</span>
      </div>
    </div>
  );
}

export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let particles: Particle[] = [];
    let tick = 0;
    let phase: "galaxy" | "forming" | "formed" | "exploding" = "galaxy";
    let phaseTimer = 0;

    const offCanvas = document.createElement("canvas");
    const offCtx = offCanvas.getContext("2d")!;

    const COLORS = [
      "rgba(96,165,250,",
      "rgba(167,139,250,",
      "rgba(34,211,238,",
      "rgba(129,140,248,",
      "rgba(196,181,253,",
      "rgba(147,197,253,",
      "rgba(251,191,36,",   // amber accent for "2026"
    ];

    const setup = () => {
      const W = container.getBoundingClientRect().width || 440;
      const H = 360;
      canvas.width = W;
      canvas.height = H;

      const LW = Math.floor(W * 0.92);
      const LH = Math.floor(H * 0.72);
      offCanvas.width = LW;
      offCanvas.height = LH;

      const letterPoints = getTextPoints(offCtx, LW, LH);
      const offsetX = (W - LW) / 2;
      const offsetY = (H - LH) / 2;

      // More particles for denser text
      const N = Math.min(letterPoints.length, 520);
      const sampled = letterPoints.sort(() => Math.random() - 0.5).slice(0, N);

      particles = sampled.map((pt) => {
        const angle = Math.random() * Math.PI * 2;
        const orbitRadius = 55 + Math.random() * 130;
        const col = COLORS[Math.floor(Math.random() * COLORS.length)];
        return {
          x: W / 2 + Math.cos(angle) * orbitRadius * (0.4 + Math.random() * 0.8),
          y: H / 2 + Math.sin(angle) * orbitRadius * (0.4 + Math.random() * 0.8),
          tx: pt.x + offsetX,
          ty: pt.y + offsetY,
          vx: 0, vy: 0,
          r: 1.0 + Math.random() * 1.3,
          color: col,
          alpha: 0.45 + Math.random() * 0.5,
          angle,
          orbitRadius,
          orbitSpeed: (Math.random() > 0.5 ? 1 : -1) * (0.003 + Math.random() * 0.006),
          trailX: [], trailY: [],
        };
      });

      phase = "galaxy";
      phaseTimer = 0;
      tick = 0;
    };

    const drawShimmerText = (W: number, H: number) => {
      const sa = 0.07 + Math.sin(tick * 0.05) * 0.04;
      const lines = ["AI Discovery", "Hackathon", "2026"];
      const sizes = [H * 0.185, H * 0.185, H * 0.155];
      const lineH = (H * 0.72) / 3;
      const offsetY = H * 0.14;

      lines.forEach((l, i) => {
        ctx.font = `900 ${Math.floor(sizes[i])}px 'Arial Black', Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = i === 2
          ? `rgba(251,191,36,${sa})`
          : `rgba(147,197,253,${sa})`;
        ctx.fillText(l, W / 2, offsetY + lineH * i + lineH / 2);
      });
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      tick++;
      phaseTimer++;

      // Phase transitions
      if (phase === "galaxy" && phaseTimer > 130) { phase = "forming"; phaseTimer = 0; }
      else if (phase === "forming" && phaseTimer > 130) { phase = "formed"; phaseTimer = 0; }
      else if (phase === "formed" && phaseTimer > 220) {
        phase = "exploding"; phaseTimer = 0;
        particles.forEach((p) => {
          const a = Math.atan2(p.y - H / 2, p.x - W / 2);
          p.vx = Math.cos(a) * (1.2 + Math.random() * 2.5);
          p.vy = Math.sin(a) * (1.2 + Math.random() * 2.5);
          p.alpha = 0.9;
        });
      } else if (phase === "exploding" && phaseTimer > 100) {
        particles.forEach((p) => {
          const a = Math.random() * Math.PI * 2;
          p.angle = a;
          p.x = W / 2 + Math.cos(a) * p.orbitRadius * (0.4 + Math.random() * 0.8);
          p.y = H / 2 + Math.sin(a) * p.orbitRadius * (0.4 + Math.random() * 0.8);
          p.vx = 0; p.vy = 0;
          p.alpha = 0.45 + Math.random() * 0.5;
          p.trailX = []; p.trailY = [];
        });
        phase = "galaxy"; phaseTimer = 0;
      }

      // Background fade
      ctx.fillStyle = "rgba(5,10,24,0.20)";
      ctx.fillRect(0, 0, W, H);

      // Ambient glow blobs
      const t = tick * 0.007;
      [
        { x: W * 0.28 + Math.sin(t) * 45, y: H * 0.38 + Math.cos(t * 0.7) * 35, r: 180, c: "rgba(59,130,246,0.06)" },
        { x: W * 0.72 + Math.cos(t * 0.8) * 55, y: H * 0.55 + Math.sin(t * 0.6) * 30, r: 160, c: "rgba(124,58,237,0.055)" },
        { x: W * 0.5, y: H * 0.5, r: 200, c: "rgba(14,165,233,0.035)" },
        { x: W * 0.5 + Math.sin(t * 1.2) * 30, y: H * 0.75 + Math.cos(t) * 20, r: 120, c: "rgba(251,191,36,0.03)" },
      ].forEach((b) => {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, b.c); g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
      });

      // Particles
      particles.forEach((p) => {
        p.trailX.push(p.x); p.trailY.push(p.y);
        if (p.trailX.length > 8) { p.trailX.shift(); p.trailY.shift(); }

        if (phase === "galaxy") {
          p.angle += p.orbitSpeed;
          const tx = W / 2 + Math.cos(p.angle) * p.orbitRadius;
          const ty = H / 2 + Math.sin(p.angle) * p.orbitRadius;
          p.x += (tx - p.x) * 0.045;
          p.y += (ty - p.y) * 0.045;
        } else if (phase === "forming") {
          p.x += (p.tx - p.x) * 0.10;
          p.y += (p.ty - p.y) * 0.10;
        } else if (phase === "formed") {
          p.x += (Math.random() - 0.5) * 0.4;
          p.y += (Math.random() - 0.5) * 0.4;
        } else if (phase === "exploding") {
          p.vx *= 0.93; p.vy *= 0.93;
          p.x += p.vx; p.y += p.vy;
          p.alpha *= 0.965;
        }

        // Trail
        for (let i = 1; i < p.trailX.length; i++) {
          const prog = i / p.trailX.length;
          ctx.beginPath();
          ctx.moveTo(p.trailX[i - 1], p.trailY[i - 1]);
          ctx.lineTo(p.trailX[i], p.trailY[i]);
          ctx.strokeStyle = `${p.color}${(prog * p.alpha * 0.28).toFixed(2)})`;
          ctx.lineWidth = p.r * prog;
          ctx.stroke();
        }

        // Glow halo when formed
        if (phase === "formed") {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
          glow.addColorStop(0, `${p.color}0.25)`);
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2); ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.min(p.alpha, 1).toFixed(2)})`;
        ctx.fill();
      });

      // Shimmer text behind when formed
      if (phase === "formed") drawShimmerText(W, H);

      animId = requestAnimationFrame(draw);
    };

    setup();
    ctx.fillStyle = "rgba(5,10,24,1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw();

    window.addEventListener("resize", setup);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", setup); };
  }, []);

  return (
    <div className="hidden lg:flex flex-col items-center gap-3 w-full max-w-[460px] mx-auto">

      {/* Galaxy canvas card */}
      <div
        ref={containerRef}
        className="relative w-full rounded-3xl overflow-hidden border border-white/10"
        style={{
          background: "rgba(5,10,24,1)",
          boxShadow:
            "0 0 60px rgba(59,130,246,0.13), 0 0 120px rgba(124,58,237,0.08), inset 0 0 40px rgba(5,10,24,0.8)",
        }}
      >
        {/* LHU Logo overlay */}
        <LHULogo />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-blue-500/30 rounded-tl-3xl pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-violet-500/30 rounded-tr-3xl pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-cyan-500/20 rounded-bl-3xl pointer-events-none z-10" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-amber-500/15 rounded-br-3xl pointer-events-none z-10" />

        {/* Scan line effect */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
          }}
        />

        <canvas ref={canvasRef} style={{ width: "100%", height: 360, display: "block" }} />

        {/* Bottom label */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none z-10">
          <span className="text-[8px] tracking-[0.3em] text-white/15 uppercase font-semibold">
            Particle · Galaxy · AI Discovery
          </span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-2 w-full">
        {STATS.map((s) => (
          <div
            key={s.value}
            className="flex flex-col items-center justify-center px-2 py-3 rounded-2xl border border-white/8 text-center"
            style={{
              background: "linear-gradient(140deg, rgba(17,38,82,0.6) 0%, rgba(30,17,64,0.5) 100%)",
              backdropFilter: "blur(12px)",
            }}
          >
            <p className="text-white font-black text-base leading-none mb-1">{s.value}</p>
            <p className="text-white/35 text-[10px] leading-tight">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}