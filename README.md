# BBL 홈페이지 — Netlify 배포 가이드

**BBL (BioMotion Baseball Biomechanics Lab)** 홈페이지를 Netlify에 배포하기 위한 완전한 가이드입니다.

---

## 📦 이 폴더의 파일 구성

```
outputs/
├── index.html              ← 메인 홈페이지 (6,200+ 줄)
├── 404.html                ← 404 에러 페이지 (BBL 디자인)
├── netlify.toml            ← Netlify 설정 (캐싱·보안·헤더)
├── robots.txt              ← 검색엔진 크롤러 안내
├── sitemap.xml             ← 검색엔진용 사이트맵
├── README.md               ← 이 파일
└── assets/                 ← 이미지·영상·로고 (17개 파일, 6.6MB)
    ├── logo-biomotion.png  (favicon)
    ├── hero-pitcher-analysis.jpg
    ├── hero-hitting-analysis.mp4
    └── ...
```

총 용량: **약 7 MB** (Netlify 무료 플랜 한도 100GB/월 대역폭에 비하면 매우 여유)

---

## 🚀 배포 방법 — 3가지 중 선택

### ⭐ 방법 A: 드래그 앤 드롭 (가장 쉬움 · 1분)

**추천 대상:** 처음 배포하시는 분, 빠르게 한 번만 올리고 싶으신 분

1. **Netlify 가입·로그인**: https://app.netlify.com/signup
   - GitHub, GitLab, Bitbucket 계정 또는 이메일로 가입 가능
2. **대시보드 진입** → 좌측 메뉴에서 **"Sites"** 클릭
3. **빈 공간으로 폴더 끌어놓기**
   - `outputs` 폴더 **전체**를 브라우저 창 하단의 점선 박스에 드래그
   - (❗ `index.html` 하나만 올리지 말고 폴더 전체 드롭)
4. **10~30초 후 배포 완료**
   - 자동 URL 예시: `https://wonderful-bbl-abc123.netlify.app`
5. **사이트 이름 변경** (선택)
   - Site settings → Site details → "Change site name"
   - 예: `biomotion-bbl` → `https://biomotion-bbl.netlify.app`

**장점:** 가장 빠름, Git 지식 불필요
**단점:** 내용 수정할 때마다 다시 드래그 필요

---

### ⭐⭐ 방법 B: GitHub 연동 (자동 배포 · 권장)

**추천 대상:** 앞으로 내용을 자주 수정하실 분, Git을 사용하실 수 있는 분

**장점:** `git push` 한 번으로 자동 재배포 · 이력 관리 · 팀 협업 용이

#### 1단계: GitHub에 저장소 만들기

```bash
# 터미널에서 outputs 폴더로 이동 후
cd outputs

# Git 초기화
git init
git add .
git commit -m "Initial BBL homepage"

# GitHub에 새 저장소 생성 (https://github.com/new)
# 저장소 이름 예: biomotion-bbl

# 원격 저장소 연결 (YOUR_USERNAME은 본인 GitHub ID)
git remote add origin https://github.com/YOUR_USERNAME/biomotion-bbl.git
git branch -M main
git push -u origin main
```

#### 2단계: Netlify에서 GitHub 연동

1. Netlify 대시보드 → **"Add new site"** → **"Import an existing project"**
2. **"Deploy with GitHub"** 클릭 → 권한 승인
3. 방금 만든 저장소 (`biomotion-bbl`) 선택
4. **빌드 설정** (자동으로 `netlify.toml`이 감지됨):
   - Branch to deploy: `main`
   - Build command: *(비워둠)*
   - Publish directory: `.`
5. **"Deploy site"** 클릭 → 완료

이제 `git push` 할 때마다 자동으로 새 버전이 배포됩니다.

---

### ⭐⭐⭐ 방법 C: Netlify CLI (개발자용 · 고급)

**추천 대상:** 로컬에서 미리보기하며 작업하시는 개발자

```bash
# Netlify CLI 설치 (Node.js 필요)
npm install -g netlify-cli

# 로그인
netlify login

# outputs 폴더로 이동 후 초기화
cd outputs
netlify init

# 로컬 미리보기 (http://localhost:8888)
netlify dev

# 배포 (프리뷰)
netlify deploy

# 배포 (프로덕션)
netlify deploy --prod
```

---

## 🌐 커스텀 도메인 연결 (예: `biomotion.co.kr`)

기본 `*.netlify.app` 주소 대신 **본인 도메인**을 쓰시려면:

### 1. 도메인 등록 업체(가비아·후이즈·Namecheap 등)에서 도메인 구매

### 2. Netlify 대시보드에서 도메인 추가
- 사이트 진입 → **"Domain settings"** → **"Add custom domain"**
- 도메인 입력 (예: `biomotion.co.kr`)
- Netlify가 안내하는 DNS 설정을 도메인 업체 관리 페이지에 입력
  - 보통 **A 레코드** (`75.2.60.5`) 또는 **CNAME** 설정

### 3. SSL 인증서 자동 발급
- Netlify가 Let's Encrypt로 자동 발급 (10~60분 소요)
- 완료되면 `https://biomotion.co.kr` 접근 가능

### 4. ⚠️ 중요: 도메인 변경 시 HTML·설정 파일 업데이트

커스텀 도메인이 아닌 **다른 도메인**(예: `bbl.kr`)을 사용하시면, 아래 3개 파일에서 `biomotion.co.kr`을 일괄 치환해주세요:

| 파일 | 변경 위치 |
|---|---|
| `index.html` | `<meta property="og:url">`, `<meta property="og:image">`, `<meta name="twitter:image">`, `<link rel="canonical">`, JSON-LD의 `url`/`logo` |
| `robots.txt` | `Sitemap:` 라인 |
| `sitemap.xml` | `<loc>` 라인 |

**꼭 확인:** Netlify 기본 주소(`*.netlify.app`)로 운영하시면 위 파일들의 도메인을 그 주소로 바꿔주시거나, 추후 커스텀 도메인 연결 시까지는 그대로 두셔도 사이트 작동에는 영향이 없습니다 (SEO·소셜 공유 미리보기에만 영향).

---

## 🔧 배포 후 확인 체크리스트

배포 완료 후 브라우저에서 아래를 확인하세요:

- [ ] **홈페이지 정상 로딩** (모든 섹션 표시)
- [ ] **히어로 영상 자동 재생** (타격 분석 영상)
- [ ] **KBO 현장 영상 재생 가능** (재생 버튼 클릭 테스트)
- [ ] **네비게이션 스크롤** (BBL 소개 / BBL 분석 시스템 / 분석 서비스 및 비용 클릭)
- [ ] **모바일 햄버거 메뉴** 동작 (스마트폰으로 접속 테스트)
- [ ] **FAQ 아코디언** 펼침·접힘
- [ ] **문의 폼** 표시 (실제 전송은 현재 백엔드 미연결 상태 — 아래 참고)
- [ ] **404 페이지 확인**: 브라우저 주소창에 `yoursite.netlify.app/없는페이지` 입력 → BBL 404 페이지가 뜨면 OK

---

## 📬 문의 폼 백엔드 연결 (추후 작업)

현재 `index.html`의 문의 폼은 **프론트엔드만 구현**된 상태입니다. 실제로 이메일 수신하시려면 아래 중 하나를 선택해 연결하셔야 합니다:

### 옵션 1: Netlify Forms (가장 쉬움 · 무료 월 100건)
`<form>` 태그에 `data-netlify="true"` 속성만 추가하면 자동으로 Netlify가 처리합니다. 수신은 Netlify 대시보드 또는 등록 이메일로 받습니다.

### 옵션 2: Formspree (무료 월 50건)
`<form action="https://formspree.io/f/YOUR_ID">` 로 설정.

### 옵션 3: Google Forms / Tally / Typeform 임베드
외부 폼 서비스의 링크·임베드로 교체.

> 🛠 이 작업이 필요하시면 별도로 요청해주세요. 기본 `action` 속성만 바꾸면 되는 간단한 작업입니다.

---

## 🆘 자주 겪는 문제

### Q. 이미지·영상이 깨져서 나와요
- `assets/` 폴더가 함께 업로드되었는지 확인
- 경로가 `/assets/xxx.jpg`가 아닌 `assets/xxx.jpg` (상대경로)로 되어있는지 확인

### Q. 네비게이션 링크가 `#about`으로 이동이 안 돼요
- 브라우저 캐시 문제일 수 있음 → **Ctrl+F5** (Windows) / **Cmd+Shift+R** (Mac)
- 그래도 안 되면 index.html에서 해당 `id="about"` 앵커가 존재하는지 확인

### Q. 배포했는데 업데이트가 안 보여요
- Netlify 대시보드 → **Deploys** 탭에서 최신 배포 상태 확인
- 브라우저 캐시: 시크릿 창으로 접속해 보기
- 완전히 안 되면 Netlify "Clear cache and retry deploy"

### Q. 로컬에서 `index.html`을 더블클릭해 열었더니 CSS/이미지가 안 나와요
- `file://` 프로토콜 문제입니다. 로컬 테스트는 아래처럼 간단한 서버로:
  ```bash
  # Python이 설치되어 있다면
  cd outputs
  python3 -m http.server 8000
  # → http://localhost:8000 접속
  ```

---

## 📞 연락처

- **운영**: ㈜ 바이오모션
- **주소**: 서울특별시 성북구 정릉로 77 국민대학교 캠퍼스타운
- **이메일**: kklee@kookmin.ac.kr

---

**© 2026 BioMotion Inc. All rights reserved.**
