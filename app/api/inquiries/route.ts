import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// POST /api/inquiries - 문의 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, title, content, email, phone } = body;

    if (!type || !title || !content) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 로그인한 사용자인지 확인
    let userId: string | null = null;
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = verifyToken(token);
      if (decoded) {
        userId = decoded.userId;
      }
    }

    // 비회원인 경우 이메일 필수
    if (!userId && !email) {
      return NextResponse.json(
        { error: '비회원의 경우 이메일이 필요합니다.' },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        userId: userId || null,
        type,
        title,
        content,
        email: email || null,
        phone: phone || null,
      },
    });

    return NextResponse.json(
      {
        message: '문의가 접수되었습니다.',
        inquiry: {
          id: inquiry.id,
          status: inquiry.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('문의 생성 오류:', error);
    return NextResponse.json(
      { error: '문의 접수 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
