import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateVerificationCode } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, type = 'register' } = body;

    if (!email) {
      return NextResponse.json(
        { error: '이메일을 입력해주세요.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    // 회원가입 타입일 경우 이메일 중복 확인
    if (type === 'register') {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: '이미 사용 중인 이메일입니다.' },
          { status: 409 }
        );
      }
    }

    // 비밀번호 재설정 타입일 경우 사용자 존재 확인
    if (type === 'reset-password') {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json(
          { error: '등록되지 않은 이메일입니다.' },
          { status: 404 }
        );
      }
    }

    // 인증번호 생성
    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5분 후 만료

    // 기존 인증번호 삭제 (같은 이메일, 같은 타입)
    await prisma.emailVerification.deleteMany({
      where: {
        email,
        type,
        verified: false,
      },
    });

    // 새 인증번호 저장
    await prisma.emailVerification.create({
      data: {
        email,
        code,
        type,
        expiresAt,
      },
    });

    // 이메일 전송
    const emailSent = await sendVerificationEmail(email, code, type as 'register' | 'reset-password');

    if (!emailSent) {
      const emailMethod = process.env.EMAIL_METHOD || 'brevo';
      
      // 개발 환경에서는 콘솔에 인증번호 출력 (테스트 용도)
      if (emailMethod !== 'brevo' || process.env.NODE_ENV === 'development') {
        console.log(`\n📧 [개발 모드] 인증번호: ${code} (${email})\n`);
      } else {
        console.error(`인증번호 이메일 전송 실패: ${email}`);
        
        // 프로덕션 환경에서는 실패 시 에러 반환을 고려할 수 있음
        // 하지만 사용자 경험을 위해 일단 성공으로 처리하고 로그만 남김
        // 필요시 아래 주석을 해제하여 실패 응답 반환 가능
        
        // return NextResponse.json(
        //   { error: '이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.' },
        //   { status: 500 }
        // );
      }
    }

    return NextResponse.json(
      {
        message: '인증번호가 전송되었습니다.',
        expiresIn: 300, // 5분 (초 단위)
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('인증번호 전송 오류:', error);
    return NextResponse.json(
      { error: '인증번호 전송 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

