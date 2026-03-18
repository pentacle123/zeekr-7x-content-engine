# ZEEKR 7X Algorithm Content Engine

ZEEKR 7X의 12개 USP를 AI가 분석하여 알고리즘 최적화 숏폼 콘텐츠를 자동 생성하는 플랫폼.

## 기능
- **알고리즘 콘텐츠 엔진**: USP → 6축 맥락 매칭 → TOP 5 추천 → YouTube Shorts + Instagram Reels 생성
- **탐색 여정 콘텐츠 맵**: Early→Mid→Late 구매여정 × 크리에이터 타입별 콘텐츠 설계

## Tech Stack
- Next.js 14 (App Router)
- Anthropic Claude API (Server-side)
- Vercel 배포

## 로컬 개발
```bash
npm install
cp .env.example .env
# .env에 ANTHROPIC_API_KEY 입력
npm run dev
```

## Vercel 배포
1. GitHub에 push
2. Vercel에서 Import
3. Environment Variables에 `ANTHROPIC_API_KEY` 추가
4. Deploy

## Pentacle × AI Platform
