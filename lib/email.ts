/**
 * Brevo (Sendinblue) API를 사용한 이메일 전송 유틸리티
 */

interface EmailOptions {
  to: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
}

/**
 * Brevo API를 사용하여 이메일 전송
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.BREVO_FROM_EMAIL || 'noreply@example.com';
  const emailMethod = process.env.EMAIL_METHOD || 'brevo';

  // EMAIL_METHOD가 'brevo'가 아니면 전송하지 않음 (개발 환경에서 콘솔 출력)
  if (emailMethod !== 'brevo' || !apiKey) {
    console.log('[이메일 전송 시뮬레이션]');
    console.log(`받는 사람: ${options.to}`);
    console.log(`제목: ${options.subject}`);
    console.log(`내용:\n${options.textContent || options.htmlContent}`);
    return true; // 개발 환경에서는 성공으로 처리
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: {
          email: fromEmail,
          name: 'GCS',
        },
        to: [
          {
            email: options.to,
          },
        ],
        subject: options.subject,
        htmlContent: options.htmlContent,
        textContent: options.textContent || options.htmlContent.replace(/<[^>]*>/g, ''),
      }),
    });

    if (!response.ok) {
      let errorData: any;
      try {
        const text = await response.text();
        errorData = JSON.parse(text);
      } catch {
        errorData = { message: 'Unknown error' };
      }
      
      console.error('Brevo API 오류:', response.status, JSON.stringify(errorData, null, 2));
      
      // IP 인증 오류인 경우 상세 메시지 제공
      if (response.status === 401 && errorData.code === 'unauthorized' && errorData.message?.includes('IP address')) {
        console.error(`
⚠️ Brevo IP 화이트리스트 오류가 발생했습니다.
현재 IP 주소가 Brevo 계정의 허용된 IP 목록에 없습니다.

해결 방법:
1. Brevo 대시보드에서 IP 화이트리스트 비활성화 (권장)
   - https://app.brevo.com/security/authorised_ips 접속
   - "IP Restriction" 비활성화

2. 현재 IP 주소를 화이트리스트에 추가
   - 위 링크에서 현재 IP 주소 추가

참고: 개발 환경에서는 IP 제한을 비활성화하는 것이 편리합니다.
        `);
      }
      
      return false;
    }

    const result = await response.json();
    console.log('이메일 전송 성공:', result.messageId);
    return true;
  } catch (error) {
    console.error('이메일 전송 중 오류:', error);
    return false;
  }
}

/**
 * 인증번호 이메일 전송
 */
export async function sendVerificationEmail(
  email: string,
  code: string,
  type: 'register' | 'reset-password' = 'register'
): Promise<boolean> {
  const subject =
    type === 'register'
      ? 'GCS 회원가입 인증번호'
      : 'GCS 비밀번호 재설정 인증번호';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background-color: #f8f6f4;
          border-radius: 8px;
          padding: 30px;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .code-box {
          background-color: #ffffff;
          border: 2px dashed #fd6f22;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          margin: 30px 0;
        }
        .code {
          font-size: 32px;
          font-weight: bold;
          color: #fd6f22;
          letter-spacing: 8px;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eeebe6;
          font-size: 12px;
          color: #85817e;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="color: #1a1918; margin: 0;">GCS 인증번호</h1>
        </div>
        <p style="color: #1a1918; font-size: 14px;">
          ${type === 'register' ? '회원가입을' : '비밀번호 재설정을'} 완료하기 위해 아래 인증번호를 입력해주세요.
        </p>
        <div class="code-box">
          <div class="code">${code}</div>
        </div>
        <p style="color: #85817e; font-size: 12px; margin: 0;">
          ⚠️ 인증번호는 5분간 유효합니다.
        </p>
        <div class="footer">
          <p>이 이메일은 자동으로 발송된 메일입니다.</p>
          <p>만약 요청하지 않으셨다면 무시하셔도 됩니다.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
GCS 인증번호

${type === 'register' ? '회원가입을' : '비밀번호 재설정을'} 완료하기 위해 아래 인증번호를 입력해주세요.

인증번호: ${code}

⚠️ 인증번호는 5분간 유효합니다.

이 이메일은 자동으로 발송된 메일입니다.
만약 요청하지 않으셨다면 무시하셔도 됩니다.
  `;

  return await sendEmail({
    to: email,
    subject,
    htmlContent,
    textContent,
  });
}
