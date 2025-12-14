import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code, type = 'register' } = body;

    if (!email || !code) {
      return NextResponse.json(
        { error: '이메일과 인증번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 인증번호 찾기
    const verification = await prisma.emailVerification.findFirst({
      where: {
        email,
        code,
        type,
        verified: false,
        expiresAt: {
          gt: new Date(), // 만료되지 않은 것만
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!verification) {
      return NextResponse.json(
        { error: '인증번호가 올바르지 않거나 만료되었습니다.' },
        { status: 400 }
      );
    }

    // 인증번호 검증 완료 처리
    await prisma.emailVerification.update({
      where: { id: verification.id },
      data: { verified: true },
    });

    // 회원가입 타입일 경우 이메일 인증 완료 처리
    if (type === 'register') {
      await prisma.user.updateMany({
        where: { email },
        data: { emailVerified: true },
      });
    }

    return NextResponse.json(
      { message: '인증번호가 확인되었습니다.', verified: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('인증번호 확인 오류:', error);
    return NextResponse.json(
      { error: '인증번호 확인 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

