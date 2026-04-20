# BioMotion Baseball Lab (BBL) — Homepage

국민대 야구 바이오메카닉스 랩의 공식 홈페이지. 정적 사이트로 작성되어 GitHub Pages, Netlify, Vercel, Cloudflare Pages 등 어떤 정적 호스팅에도 바로 배포할 수 있습니다.

## 구조

```
deploy/
├── index.html                  # 진입점
├── styles.css                  # 전역 스타일
├── styles-kseq-split.css       # 키네마틱 시퀀스 + 2-티어 캡처플로우 스타일
├── components/                 # React JSX (Babel에서 브라우저 트랜스파일)
│   ├── i18n.js                 # 한/영 번역 딕셔너리
│   ├── Nav.jsx / Hero.jsx / WhyBBL.jsx / System.jsx
│   ├── Services.jsx / Report.jsx / ResearchNotes.jsx
│   ├── Testimonials.jsx / Booking.jsx / FaqContact.jsx
│   └── ...
└── assets/                     # 로고, 사진, 영상, 샘플 리포트
```

모든 경로는 **상대 경로**이며 자체 포함(self-contained)입니다. React·Babel·Pretendard·JetBrains Mono·Noto Serif KR은 CDN에서 로드됩니다.

## 로컬 실행

```bash
# Python
python3 -m http.server 8000 -d deploy

# 또는 Node
npx serve deploy
```

브라우저에서 `http://localhost:8000` 접속.

> ⚠️ 파일을 `file://` 프로토콜로 직접 열면 JSX fetch와 일부 비디오 로딩이 실패합니다. 반드시 로컬 서버로 띄워야 합니다.

## GitHub Pages 배포

1. GitHub에서 새 리포지토리 생성 (예: `bbl-homepage`)
2. 로컬에서:
   ```bash
   cd deploy
   git init
   git add .
   git commit -m "Initial BBL homepage"
   git branch -M main
   git remote add origin https://github.com/<USER>/bbl-homepage.git
   git push -u origin main
   ```
3. 리포지토리 → Settings → Pages → Source를 **`main` / `(root)`** 으로 지정
4. 1~2분 후 `https://<USER>.github.io/bbl-homepage/` 에서 확인

커스텀 도메인을 쓰려면 `deploy/` 안에 `CNAME` 파일(내용: 도메인명 한 줄)을 추가하세요.

## Netlify / Vercel / Cloudflare Pages 배포

드래그 앤 드롭 또는 Git 연동:
- **Publish directory**: `deploy` (또는 `/`)
- **Build command**: (없음 — 정적 사이트)

## 구성 요소

| 섹션 | 역할 |
|---|---|
| Nav | 고정 헤더, 한/영 토글 |
| Hero | 편집형 메인 + 타격 분석 영상 |
| WhyBBL | 3 필러(소통·통찰·장비) + EBS 방송 출연 |
| System | 2-티어 캡처플로우 → 3단계 분석 → 키네마틱 시퀀스 → 8개 장비 |
| Services | 4개 요금 플랜 |
| Report | 2채널 리포트 전달 방식 |
| ResearchNotes | 논문/세션 기록 4건 |
| Testimonials | 선수·코치 증언 3건 |
| Booking | 3-step 예약 플로우 |
| FAQ + Contact | 5개 질문 + 문의 방법 + 푸터 |

## i18n

`components/i18n.js` 의 `T` 객체 안에 `ko` / `en` 두 딕셔너리가 있습니다. Nav 우측 토글 (`KR | EN`) 로 전환하며, 선택 상태는 `localStorage`에 저장됩니다.

## 스타일 커스터마이징

Tweaks 패널이 우하단에 숨겨져 있어 테마/색상/히어로 카피/히어로 변형을 즉시 바꿀 수 있습니다 (개발용). 배포 시 제거하려면 `index.html` 의 `<TweaksPanel />` 을 삭제하세요.

## 라이선스

모든 이미지·영상·로고는 ㈜BioMotion 및 국민대 바이오메카닉스 연구실 소유입니다. 코드 부분(HTML/CSS/JSX)의 재사용·수정은 내부 용도로 제한됩니다.
