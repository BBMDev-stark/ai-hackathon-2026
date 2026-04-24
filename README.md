# AI Discovery Hackathon 2026

Website chính thức cuộc thi AI Discovery Hackathon 2026 — Khoa CNTT, Trường Đại học Lạc Hồng.

## Chủ đề
> "AI cho mọi người – Sáng tạo không giới hạn"

## Cài đặt & chạy

```bash
npm install
npm run dev
```

Mở trình duyệt tại `http://localhost:3000`

## Build production

```bash
npm run build
npm run start
```

## Cấu trúc

```
app/
  layout.tsx        # Root layout, fonts, metadata
  page.tsx          # Main page (imports all sections)
  globals.css       # Global styles, CSS utilities

components/
  Navbar.tsx        # Fixed navbar, responsive
  Hero.tsx          # Hero section + countdown timer
  About.tsx         # Mục đích & stats
  Timeline.tsx      # Lịch trình 2 vòng
  Topics.tsx        # 3 chủ đề thi
  Rules.tsx         # Thể lệ tham gia
  Evaluation.tsx    # Tiêu chí chấm điểm
  Awards.tsx        # Cơ cấu giải thưởng
  Judges.tsx        # Hội đồng giám khảo
  CTA.tsx           # Call to action + countdown
  Footer.tsx        # Footer
```

## Công nghệ
- **Next.js 14** — App Router
- **TypeScript**
- **Tailwind CSS 3**
- **DM Serif Display + DM Sans** (Google Fonts)

## Cập nhật link đăng ký

Tìm và thay thế `https://forms.gle/` bằng link Google Form thực tế trong:
- `components/Hero.tsx`
- `components/CTA.tsx`
- `components/Navbar.tsx`
