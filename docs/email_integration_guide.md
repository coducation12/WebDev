# BORA 홈페이지 문의 메일 자동 발송 연동 가이드

본 문서는 홈페이지의 문의하기(Contact) 페이지에서 접수된 내용이 회사의 지정된 대표 이메일로 자동 발송되도록 설정하기 위한 전체 가이드입니다. 구글(Gmail) SMTP 서버와 Next.js 백엔드 API를 연동하여 안전하게 발송하는 방식을 기준으로 작성되었습니다.

---

## 1. 구글(Gmail) 계정 보안 설정 (발송용 계정)

구글은 보안 강화를 위해 일반 비밀번호를 통한 SMTP 접속을 차단합니다. 아래 절차를 통해 **앱 비밀번호**를 생성해야 합니다.

1. **2단계 인증 활성화**
   - 구글 계정에 로그인한 뒤 [구글 계정 관리] > [보안] 메뉴로 이동합니다.
   - 'Google에 로그인' 섹션에서 **2단계 인증**을 찾아 활성화합니다.
2. **앱 비밀번호(App Password) 생성**
   - 2단계 인증이 설정된 후, 검색창에 `앱 비밀번호`를 검색하거나 해당 설정 페이지로 이동합니다.
   - 앱 선택에서 `기타(사용자 정의 이름)`를 선택하고, 구분하기 쉬운 이름(예: `BoraLogis Website`)을 입력한 뒤 **[생성]** 버튼을 누릅니다.
   - 화면에 나타나는 **16자리의 영문 앱 비밀번호(예: `abcd efgh ijkl mnop`)**를 공백 없이 복사하여 메모해 둡니다. (창을 닫으면 다시 확인할 수 없습니다.)

---

## 2. 환경 변수(Environment Variables) 설정

보안상 이메일 계정 정보와 앱 비밀번호는 소스 코드에 직접 기입하지 않고 환경 변수로 관리해야 합니다.

### A. 로컬 개발 환경 (`.env.local`)
로컬 개발 환경의 루트 폴더에 `.env.local` 파일을 새로 생성하고 아래와 같이 채워 넣습니다. (이 파일은 `.gitignore`에 등록되어 GitHub에 업로드되지 않으므로 안전하며, 프로젝트 루트에 있는 `.env.local.example` 파일을 참고하여 복사 후 사용하실 수도 있습니다.)

```env
# .env.local
GMAIL_USER=발송용구글계정@gmail.com
GMAIL_APP_PASS=위에서발급받은16자리앱비밀번호(띄어쓰기없이입력)
RECEIVER_EMAIL=대표이메일이나문의를수신할계정@company.com
```

### B. 실제 배포 환경 (Vercel)
실제 서비스를 배포한 후에는 Vercel 플랫폼 관리자 화면에 환경 변수를 수동으로 등록해주어야 이메일이 정상적으로 발송됩니다.

1. [Vercel Dashboard](https://vercel.com/dashboard)에 로그인하여 해당 프로젝트를 선택합니다.
2. 상단 탭에서 **[Settings]** 메뉴로 이동합니다.
3. 좌측 사이드바에서 **[Environment Variables]** 항목을 클릭합니다.
4. **Key**와 **Value** 란에 아래 3개의 변수 정보를 하나씩 입력하고 **[Add]** 버튼을 눌러 추가합니다:
   - **GMAIL_USER** : `발송용구글계정@gmail.com`
   - **GMAIL_APP_PASS** : `발급받은 16자리 앱 비밀번호`
   - **RECEIVER_EMAIL** : `수신용 이메일 주소`
5. **Environment(적용 환경)** 체크박스에서 `Production`, `Preview`, `Development`가 모두 체크되어 있는지 확인합니다.
6. ⚠️ **중요**: Vercel에 환경 변수를 새로 추가했거나 변경한 경우에는, 새로운 변경 사항이 적용될 수 있도록 프로젝트를 **다시 배포(Re-deploy)**해 주어야 합니다.

---

## 3. 프로젝트 코드 구현 방법

### A. 라이브러리 설치
메일 전송을 위한 `nodemailer` 모듈과 TypeScript 환경을 위한 타입을 설치합니다.
```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

### B. Next.js 백엔드 API 라우트 작성
클라이언트 브라우저가 아닌 Next.js 백엔드 서버에서 이메일 전송을 실행하게 하여 비밀번호 탈취를 원천적으로 방지합니다.

- **파일 경로**: `src/app/api/contact/route.ts`

```typescript
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, company, phone, email, message } = await request.json();

    // Nodemailer 이메일 발송 객체 초기화 (Gmail 서비스 지정)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
    });

    // 메일 내용 디자인 및 수신자 설정
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `[보라로지스 홈페이지 문의] ${company} - ${name}님의 문의가 접수되었습니다.`,
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background-color: #6A0DAD; color: white; padding: 24px; text-align: center;">
            <h2 style="margin: 0; font-size: 20px;">홈페이지 신규 문의 접수</h2>
          </div>
          <div style="padding: 24px; color: #333; line-height: 1.6;">
            <p>보라로지스 홈페이지를 통해 접수된 문의 내용입니다.</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">성함 및 직책</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">회사명</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${company}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">연락처</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">이메일</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
              </tr>
            </table>
            <div style="background-color: #f9f9f9; border-left: 4px solid #6A0DAD; padding: 16px; margin-top: 20px; border-radius: 4px;">
              <p style="margin: 0 0 8px 0; font-weight: bold; color: #6A0DAD;">문의 내용</p>
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="background-color: #f4f4f4; color: #888; padding: 12px; text-align: center; font-size: 11px;">
            본 메일은 BORA 홈페이지 시스템에서 자동 발송되었습니다.
          </div>
        </div>
      `,
    };

    // 이메일 전송 요청
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
```

### C. 프론트엔드 연동 소스 코드 변경
- **파일 경로**: `src/app/contact/page.tsx`
- 기존 `handleSubmit` 함수 내부의 임시 대기 타이머(`setTimeout`) 로직을 API 호출(`fetch`) 구조로 변경합니다.

```typescript
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.phone || !formData.email || !formData.message || !formData.agree) {
      alert(language === "ko" ? "필수 항목을 모두 채워주시고 개인정보 수집에 동의해주세요." : "Please fill in all required fields and agree to the privacy policy.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert(language === "ko" 
          ? "이메일 전송에 실패했습니다. 관리자에게 문의해 주세요." 
          : "Failed to send email. Please contact the administrator.");
      }
    } catch (err) {
      console.error(err);
      alert(language === "ko" ? "네트워크 오류가 발생했습니다." : "A network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };
```

---

## 4. 발송 제한 사항 및 권장 대안

- **일일 발송 제한**: 구글의 개인 계정(Gmail)의 경우, 스팸 방지를 위해 SMTP 발송 횟수가 **하루 최대 500통**으로 제한되어 있습니다. (Google Workspace 비즈니스 유료 계정은 하루 최대 2000통까지 발송이 가능합니다.)
- **대량 전송 서비스 전환**: 유입량 및 문의 접수 건수가 매우 많아져 구글 발송 한도를 초과할 경우에는 소스 코드는 그대로 유지한 채 `nodemailer` 설정부만 대량 전송 솔루션(예: Amazon SES, SendGrid, Mailgun)의 SMTP 설정 값으로 교체하여 지속적이고 안정적으로 확장할 수 있습니다.
