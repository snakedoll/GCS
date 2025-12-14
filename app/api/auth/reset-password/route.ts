import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, newPassword, verificationCode } = body;

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: '이메일과 새 비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 비밀번호 검증 (8자 이상 영문, 숫자 조합)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return NextResponse.json(
        { error: '비밀번호는 8자 이상 영문, 숫자 조합이어야 합니다.' },
        { status: 400 }
      );
    }

    // 인증번호 확인 (비밀번호 재설정의 경우)
    if (verificationCode) {
      const verification = await prisma.emailVerification.findFirst({
        where: {
          email,
          code: verificationCode,
          type: 'reset-password',
          verified: true,
          expiresAt: {
            gt: new Date(),
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
    }

    // 사용자 찾기
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: '등록되지 않은 이메일입니다.' },
        { status: 404 }
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await hashPassword(newPassword);

    // 비밀번호 업데이트
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // 사용된 인증번호 삭제
    if (verificationCode) {
      await prisma.emailVerification.deleteMany({
        where: {
          email,
          type: 'reset-password',
          code: verificationCode,
        },
      });
    }

    return NextResponse.json(
      { message: '비밀번호가 재설정되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('비밀번호 재설정 오류:', error);
    return NextResponse.json(
      { error: '비밀번호 재설정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

