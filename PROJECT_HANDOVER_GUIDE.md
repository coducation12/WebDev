# BORA 홈페이지 이관 · 관리자(`/admin`) · 이메일 연동 가이드

본 문서는 **디자인 최종 확정 후 회사 계정(GitHub + Vercel)으로 프로젝트를 이관**하고, 이후 **1) DB 없는 관리자 페이지(`/admin`)** 및 **2) 문의하기 이메일 발송 기능**을 연동하기 위한 전체 작업 가이드입니다.

---

## 0. 권장 진행 순서 (로드맵)

1. **디자인 최종 확정 및 코드 정리**
   - 모든 페이지 디자인 확정 후, 불필요해진 `_backup_unused_images/` 백업 폴더 삭제 또는 보관 처리
2. **회사 계정 이관 (GitHub + Vercel)**
   - 회사 공식 GitHub 및 Vercel 계정으로 저장소·배포 프로젝트 연결
3. **관리자 페이지(`/admin`) 구축** (Google OAuth + Vercel Blob)
   - DB 없이 팝업 ON/OFF, 팝업 이미지 업로드, 문구/연락처 수정 기능 구현
4. **문의하기 이메일 발송 연동** (Gmail SMTP + Next.js API Route)
   - 현재 시뮬레이션 상태인 문의하기 폼을 실제 이메일 발송 API와 연결

---

## 1. 회사 계정 이관 (GitHub + Vercel)

1. **GitHub 저장소 이관**
   - 방법 A (권장): 기존 GitHub 저장소 `Settings → Danger Zone → Transfer ownership`으로 회사 GitHub 계정에 이전
   - 방법 B: 회사 GitHub 계정에 새 저장소 생성 후 로컬에서 원격 주소(`git remote set-url origin <새_저장소_URL>`) 변경 및 `git push -u origin main`
2. **Vercel 프로젝트 연동**
   - 회사 Vercel 계정으로 로그인 → **Add New → Project** → 이관한 회사 GitHub 저장소 Import
   - 커스텀 도메인 보유 시 **Project Settings → Domains**에서 연결

---

## 2. DB 없는 관리자 페이지(`/admin`) 구축 가이드

### 2-1. 동작 원리 (코드·DB 없이 수정 가능한 이유)
- 홈페이지가 렌더링될 때 코드에 고정된 텍스트 대신 **Vercel Blob(클라우드 파일 저장소)에 저장된 설정 파일(`site-config.json`)과 이미지 URL**을 읽어와 화면에 표시합니다.
- 관리자가 `/admin` 페이지에서 내용을 수정하고 **[저장하기]**를 누르면, 코드를 바꾸는 대신 `site-config.json`과 이미지만 Vercel Blob에 덮어쓰기 때문에 **재배포 없이 즉시 반영**됩니다.
- Vercel Blob이 비어 있거나 연결되기 전에는 코드 내부 기본값으로 안전하게 fallback 됩니다.

### 2-2. 사전 외부 설정 (회사 계정 기준 최초 1회)

#### ① Google Cloud Console OAuth 설정 (지정된 구글 계정 로그인용)
1. [Google Cloud Console](https://console.cloud.google.com/) 접속 (회사 관리자 구글 계정) → 새 프로젝트 생성
2. **API 및 서비스 → OAuth 동의 화면** 설정
   - 사용자 유형: `외부` / 앱 이름: `BORA Admin` / 지원 이메일 입력
   - 게시 상태가 `테스트`인 경우 **테스트 사용자**에 로그인할 관리자 구글 이메일 추가 (또는 프로덕션 게시)
3. **사용자 인증 정보 → 사용자 인증 정보 만들기 → OAuth 클라이언트 ID**
   - 애플리케이션 유형: `웹 애플리케이션`
   - **승인된 리디렉션 URI** 등록:
     - 로컬 개발용: `http://localhost:4000/api/auth/callback/google`
     - Vercel 배포용: `https://<실제_서비스_도메인>/api/auth/callback/google`
4. 발급된 **클라이언트 ID(`GOOGLE_CLIENT_ID`)**와 **클라이언트 보안 비밀번호(`GOOGLE_CLIENT_SECRET`)** 메모

#### ② Vercel Blob 생성
1. 회사 Vercel 대시보드 → 해당 프로젝트 선택 → **Storage → Create → Blob**
2. 저장소 이름 입력 후 생성 (프로젝트 환경변수에 `BLOB_READ_WRITE_TOKEN`이 자동으로 연결됨)

> **Vercel Blob 무료(Hobby) 플랜 제공량 참고**
> - 저장 용량: 월 1 GB / 데이터 전송량: 월 10 GB
> - 일반 조회: 월 10,000회 (캐시 적중 시 미차감) / 업로드·수정: 월 2,000회
> - ※ 회사 공식 홈페이지 상용 운영 시 Vercel 정책에 따라 Pro 플랜 적용 여부를 검토하세요.

#### ③ Vercel 환경변수 등록 (`Settings → Environment Variables`)
| Key | Value 설명 |
| :--- | :--- |
| `GOOGLE_CLIENT_ID` | Google Cloud에서 발급받은 클라이언트 ID |
| `GOOGLE_CLIENT_SECRET` | Google Cloud에서 발급받은 클라이언트 보안 비밀번호 |
| `ADMIN_EMAILS` | 로그인을 허용할 관리자 구글 이메일 (여러 개면 `,`로 구분) |
| `AUTH_SECRET` | 쿠키 서명용 임의의 긴 랜덤 문자열 (32자 이상 권장) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob 생성 시 자동 등록됨 (미등록 시 Storage 탭에서 Connect) |

> **중요**: 환경변수 추가/수정 후에는 반드시 Vercel에서 **Redeploy**를 실행해야 반영됩니다.

### 2-3. 향후 코드 구현 범위 (개발 작업)
1. **패키지 설치**: `@vercel/blob` (필요 시 `jose` 등 경량 JWT/세션 서명 유틸)
2. **인증 API 라우트**:
   - `src/app/api/auth/login/route.ts`: Google OAuth 로그인 페이지로 리디렉션
   - `src/app/api/auth/callback/google/route.ts`: 구글 이메일 검증 후 `ADMIN_EMAILS` 포함 여부 확인 → 서명된 HttpOnly 쿠키 발급
   - `src/app/api/auth/logout/route.ts`: 로그아웃 쿠키 삭제
3. **설정/이미지 API 라우트**:
   - `src/app/api/site-config/route.ts` (`GET`: 설정 조회 / `PUT`: 관리자 쿠키 검증 후 `site-config.json` 갱신)
   - `src/app/api/upload/route.ts` (`POST`: 관리자 쿠키 검증 후 팝업/페이지 이미지를 Vercel Blob에 업로드하고 URL 반환)
4. **관리자 화면 및 숨겨진 진입점**:
   - `src/components/Footer.tsx`: 하단 카피라이트(`© 2026 BORA.`) 등 눈에 띄지 않는 영역 클릭(또는 더블클릭) 시 `/admin` 이동
   - `src/app/admin/page.tsx`: 미로그인 시 Google 로그인 버튼 노출, 로그인 성공 시 팝업(ON/OFF, 노출 기간, 이미지 업로드, 링크, 제목/내용) 및 문의하기/페이지 텍스트 수정 폼 제공
5. **메인 팝업 컴포넌트**:
   - `src/components/PopupModal.tsx`: `site-config.json`의 팝업 설정을 읽어 노출 (오늘 하루 보지 않기 `localStorage` 지원)

### 2-4. 구축 후 비개발자 운영 방법
1. 홈페이지 하단의 숨겨진 로그인 포인트 클릭(또는 `도메인/admin` 직접 접속)
2. 지정된 회사 구글 계정으로 로그인
3. 팝업 ON/OFF, 이미지 파일 선택, 문구 수정 후 **[저장하기]** 클릭
4. 홈페이지 새로고침 시 즉시 반영 확인

---

## 3. 문의하기(`/contact`) 이메일 자동 발송 연동 가이드

현재 상태:
- [src/app/contact/page.tsx](src/app/contact/page.tsx)의 `handleSubmit`은 `setTimeout` 시뮬레이션 상태이며, `src/app/api/contact/route.ts`는 아직 생성되어 있지 않습니다.
- 프로젝트 루트에 [.env.local.example](.env.local.example) 템플릿이 준비되어 있습니다.
- 세부 코드 예시는 [docs/email_integration_guide.md](docs/email_integration_guide.md)에도 정리되어 있습니다.

### 3-1. 구글(Gmail) 발송 계정 앱 비밀번호 발급
구글 계정은 일반 비밀번호 SMTP 로그인을 차단하므로 **앱 비밀번호**를 발급받아야 합니다.

1. 발송용으로 사용할 구글 계정 로그인 → **Google 계정 관리 → 보안**
2. **2단계 인증** 활성화
3. 보안 메뉴 또는 검색창에서 **앱 비밀번호** 선택
4. 앱 이름 입력(예: `BoraLogis Website`) 후 **[생성]** 클릭
5. 표시되는 **16자리 영문 앱 비밀번호**를 공백 없이 복사·보관

### 3-2. 환경변수 설정
로컬 개발 시 프로젝트 루트에 `.env.local` 파일을 생성하고, 실서비스 배포 시 **Vercel → Settings → Environment Variables**에 동일하게 등록합니다.

```env
GMAIL_USER=발송용구글계정@gmail.com
GMAIL_APP_PASS=발급받은16자리앱비밀번호(공백제거)
RECEIVER_EMAIL=문의수신대표이메일@company.com
```

> **참고**: 물류 문의(`logistics`)와 무역 문의(`trade`) 수신 이메일을 다르게 운영하고 싶다면 `RECEIVER_LOGISTICS_EMAIL`, `RECEIVER_TRADE_EMAIL`로 분리해 분기 처리할 수 있습니다.

### 3-3. 구현 순서 (개발 작업)
1. **패키지 설치**:
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```
2. **백엔드 API 생성 (`src/app/api/contact/route.ts`)**:
   - `nodemailer`로 Gmail SMTP 연결 (`GMAIL_USER`, `GMAIL_APP_PASS`)
   - 요청 본문(`activeTab` / `company` / `name` / `phone` / `email` / `message`) 검증 및 HTML 이스케이프 후 `RECEIVER_EMAIL`로 메일 발송
3. **프론트엔드 연결 (`src/app/contact/page.tsx`)**:
   - `handleSubmit` 내부 `setTimeout` 제거 후 `fetch("/api/contact", { method: "POST", ... })` 호출
   - 전송 payload에 `type: activeTab` (`"logistics"` | `"trade"`)도 함께 전달하여 수신 메일 제목에 `[물류 문의]` / `[무역 문의]` 구분 표시

### 3-4. 운영상 제한 및 대안
- **Gmail 무료 계정 제한**: 하루 최대 **500통** (Google Workspace 유료 계정은 하루 최대 **2,000통**)
- 향후 발송량이 늘어나면 `nodemailer` 설정부만 **Amazon SES / Resend / SendGrid** 등으로 교체하면 프론트엔드 수정 없이 확장 가능합니다.
