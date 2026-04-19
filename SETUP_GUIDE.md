# BBL CMS 설치 가이드 — 교수님용 단계별 안내

이 문서는 **한 번만** 따라 하시면 됩니다. 완료하시면, 이후로는 `사이트주소/admin/` 에서 Word처럼 글을 쓰기만 하면 끝입니다.

총 소요 시간: **약 25~30분**

---

## 🗺 전체 흐름

```
[1] GitHub 계정 만들기              ── 3분
[2] GitHub Desktop 설치             ── 5분
[3] 사이트를 GitHub에 올리기         ── 5분
[4] Netlify를 GitHub에 다시 연결    ── 5분
[5] Netlify Identity 활성화          ── 3분
[6] Git Gateway 활성화              ── 2분
[7] 본인 계정 초대 + 로그인          ── 3분
[8] 첫 글 작성 테스트                ── 5분
```

---

## 1단계. GitHub 계정 만들기 (3분)

GitHub는 코드·파일을 저장하는 무료 서비스입니다. Decap CMS가 글을 저장할 공간이 됩니다.

1. [https://github.com](https://github.com) 접속
2. 우측 상단 **"Sign up"** 클릭
3. 이메일 입력 → 비밀번호 → 사용자 이름 설정
4. 이메일로 온 인증 코드 입력
5. 무료 플랜 선택 (Free)

✅ **완료 확인**: 로그인 상태로 GitHub 메인 화면이 보이면 OK

---

## 2단계. GitHub Desktop 설치 (5분)

명령어 없이 GUI로 GitHub를 쓰는 도구입니다. 코딩 몰라도 버튼만으로 파일을 올릴 수 있습니다.

1. [https://desktop.github.com](https://desktop.github.com) 접속
2. **Download for Windows / macOS** 클릭해서 설치
3. 실행 후 **"Sign in to GitHub.com"** 클릭 → 1단계에서 만든 계정으로 로그인
4. 이름/이메일 입력 (프로필용)

✅ **완료 확인**: GitHub Desktop 메인 화면이 보이면 OK

---

## 3단계. 사이트를 GitHub에 올리기 (5분)

1. GitHub Desktop에서 **"File → New Repository..."** 클릭
2. 다음과 같이 입력:

| 항목 | 입력값 |
|---|---|
| **Name** | `bbl-website` (원하는 이름) |
| **Description** | `BBL BioMotion 웹사이트` |
| **Local path** | 적당한 폴더 (예: `문서/GitHub`) |
| **Initialize with README** | ☐ 체크 해제 |
| **Git ignore** | None |
| **License** | None |

3. **"Create Repository"** 클릭
4. 방금 받으신 **`bbl-netlify-deploy-v2-cms.zip`** 를 압축 해제합니다
5. 압축 푼 `bbl-deploy` 폴더 **안의 파일들 전부**(index.html, posts/ 폴더, admin/ 폴더 등)를 복사해서 방금 만든 GitHub 리포지토리 폴더(Local path)에 **붙여넣기**
   - ⚠️ `bbl-deploy` 폴더 자체를 넣지 말고, 그 **안의 내용물**을 넣어주세요
6. GitHub Desktop으로 돌아오면 변경된 파일 목록이 보입니다
7. 왼쪽 하단:
   - **Summary** 칸에 `Initial commit` 입력
   - **"Commit to main"** 버튼 클릭
8. 우측 상단 **"Publish repository"** 클릭
   - ☐ "Keep this code private" 체크 해제 (공개로 설정해야 Netlify 무료 연동 가능)
   - ✅ **Publish Repository** 클릭

✅ **완료 확인**: GitHub 웹에서 `(내계정)/bbl-website` 로 접속하면 파일 목록이 보임

---

## 4단계. Netlify를 GitHub에 다시 연결 (5분)

현재 Netlify는 드래그앤드롭 방식으로 배포되고 있습니다. 이를 GitHub 연동 방식으로 바꾸는 작업입니다.

**⚠️ 중요**: 기존 Netlify 사이트를 지우지 않고 **같은 사이트를 GitHub와 재연결**합니다. 이렇게 하면 기존 도메인(biomotion.co.kr 등)이 그대로 유지됩니다.

1. [https://app.netlify.com](https://app.netlify.com) 접속 → 기존 BBL 사이트 클릭
2. 상단 **"Site configuration"** 메뉴 클릭
3. 좌측 **"Build & deploy"** → **"Continuous deployment"** 섹션
4. **"Link site to Git"** 버튼 클릭
5. **GitHub** 선택 → 인증 팝업에서 승인
6. 저장소 목록에서 **`bbl-website`** 선택
7. 설정 확인:

| 항목 | 값 |
|---|---|
| **Branch to deploy** | `main` |
| **Build command** | `node build-index.js` |
| **Publish directory** | `.` |

(이 값들은 `netlify.toml` 파일에 이미 들어있어서 자동으로 채워집니다)

8. **"Deploy site"** 클릭
9. Deploys 탭에서 빌드가 **"Published"** 상태가 될 때까지 대기 (1~2분)

✅ **완료 확인**: 기존 도메인에서 사이트가 그대로 보이고, 푸터에 "최신 연구 노트" 섹션이 보이면 OK

---

## 5단계. Netlify Identity 활성화 (3분)

관리자 로그인을 가능하게 해주는 기능입니다.

1. Netlify 사이트 대시보드 → 상단 **"Integrations"** 메뉴
2. 좌측 메뉴에서 **"Identity"** 찾아 클릭
3. **"Enable Identity"** 버튼 클릭
4. 활성화 후 설정 페이지로 이동
5. **"Registration preferences"** 섹션
   - **"Invite only"** 선택 (아무나 가입 못하게)
6. **"External providers"** 섹션 (선택사항)
   - 필요하시면 Google 로그인 연동 가능, 지금은 건너뛰세요
7. **"Emails"** 섹션 → **"Edit settings"** 클릭
   - **Invitation template**, **Password recovery** 등 이메일 템플릿 수정
   - 각 템플릿 안의 `{{ site_url }}/#invitation_token=...` 부분을 **`{{ site_url }}/admin/#invitation_token=...`** 으로 수정 (중간에 `/admin` 추가)
   - ⚠️ 이 수정을 안 하면 초대 링크가 메인 페이지로 가서 로그인이 꼬일 수 있습니다

✅ **완료 확인**: Identity 상태가 **"Enabled"**

---

## 6단계. Git Gateway 활성화 (2분)

Decap CMS가 글을 GitHub에 커밋할 수 있게 해주는 중개 역할입니다.

1. 같은 Identity 설정 페이지에서 아래로 스크롤
2. **"Services"** 섹션 → **"Git Gateway"** 찾기
3. **"Enable Git Gateway"** 버튼 클릭
4. GitHub 인증 팝업이 뜨면 승인

✅ **완료 확인**: Git Gateway 상태가 **"Enabled"**

---

## 7단계. 본인 초대 + 로그인 (3분)

이제 첫 번째 관리자(교수님 본인)를 초대합니다.

1. Identity 탭 상단 **"Invite users"** 버튼 클릭
2. 교수님 이메일 주소 입력 (업무용·개인용 어느 쪽이든 OK)
3. **"Send"** 클릭
4. 해당 이메일 수신함 확인
   - 제목: "You've been invited to join..." 비슷한 영문 메일
   - 본문의 **"Accept the invite"** 링크 클릭
5. 브라우저가 `(사이트주소)/admin/#invitation_token=...` 로 이동
6. **비밀번호 설정** 창이 나타나면 원하는 비밀번호 입력 → Sign up
7. 관리자 대시보드 진입

✅ **완료 확인**: 관리자 페이지에서 좌측에 **"연구 노트"** 메뉴가 보이고, 기존 글 3편이 목록에 표시됨

---

## 8단계. 첫 글 작성 테스트 (5분)

1. 좌측 **"연구 노트"** → 우측 상단 **"New 연구 노트"** 클릭
2. 다음과 같이 입력:

| 필드 | 입력값 |
|---|---|
| 제목 | `테스트 글 - 삭제 예정` |
| 발행일 | 오늘 |
| 카테고리 | 공지 |
| 요약 | `CMS 작동 테스트를 위한 임시 글입니다.` |
| 초안 | ☑ 체크 |
| 본문 | 아무거나 몇 줄 |

3. 우측 상단 **"Save"** → **"Publish Now"** 클릭
4. 1~2분 대기 후 관리자 페이지 새로고침
5. 리스트에 새 글이 보이면 성공

**초안 체크박스를 켜놓았기 때문에 사이트 공개 페이지에는 안 보입니다.** 테스트가 끝나면 해당 글 열어서 우측 상단 **"Delete entry"** 로 삭제하시면 됩니다.

---

## 🎉 여기까지 완료하시면

- 관리자 페이지: `https://(도메인)/admin/` 에서 언제든 로그인
- 글 작성 → Publish → 1~2분 뒤 사이트 자동 반영
- 이미지 드래그앤드롭 업로드
- 실수로 지워도 GitHub 히스토리에서 복구 가능
- 조교·공동연구자 추가 초대 가능 (Netlify Identity 탭에서)

앞으로 새 글 올릴 때 **파일을 편집하거나 Netlify에 뭔가 업로드할 필요가 없습니다.** `/admin/` 가서 쓰고 발행 버튼만 누르시면 됩니다.

---

## ❗ 막힐 가능성이 있는 지점

### 3단계에서 "파일이 너무 많다"는 경고
- `bbl-deploy` 폴더 안의 `assets/` 에 동영상 파일(1.8MB)이 있습니다. 정상입니다. 경고는 무시하고 커밋하세요.

### 4단계에서 빌드가 실패
- Netlify Deploys 탭 → 실패한 배포 클릭 → 로그 확인
- 흔한 원인: Node 버전 문제. `netlify.toml` 에 `NODE_VERSION = "20"` 들어있으면 OK.

### 5단계에서 이메일 템플릿 수정을 깜빡
- 괜찮습니다. 초대 링크가 메인 페이지로 가더라도, 수동으로 주소창에 `(도메인)/admin/` 을 붙여 들어가시면 됩니다.

### 7단계에서 로그인이 무한 반복
- 브라우저 캐시 문제입니다. 시크릿 창에서 `(도메인)/admin/` 접속 → 로그인 시도

### 8단계에서 글이 안 저장됨
- Git Gateway가 Enabled인지 재확인
- GitHub 리포지토리가 public인지 확인 (private이면 유료 플랜 필요)

---

## 🆘 어느 단계에서든 막히시면

다음 정보를 알려주시면 제가 바로 진단하겠습니다:
- 몇 단계에서 막혔는지
- 화면에 뜬 에러 메시지 (영문이어도 그대로 붙여넣으시면 됩니다)
- 가능하면 해당 화면 스크린샷

차근차근 함께 해결하겠습니다.
