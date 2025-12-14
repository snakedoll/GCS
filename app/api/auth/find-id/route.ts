import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: '이름과 전화번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 전화번호에서 하이픈 제거하여 검색
    const phoneNumber = phone.replace(/-/g, '');

    // 사용자 찾기
    const user = await prisma.user.findFirst({
      where: {
        name,
        phone: {
          contains: phoneNumber,
        },
      },
      select: {
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: '일치하는 회원 정보를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 이메일 일부 마스킹 처리 (보안)
    const emailParts = user.email.split('@');
    const maskedEmail = emailParts[0].substring(0, 2) + '***@' + emailParts[1];

    return NextResponse.json(
      {
        message: '아이디를 찾았습니다.',
        email: maskedEmail,
        fullEmail: user.email, // 실제로는 이메일로 전송해야 함
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('아이디 찾기 오류:', error);
    return NextResponse.json(
      { error: '아이디 찾기 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

