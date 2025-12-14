import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, isAdmin } from '@/lib/auth';

// GET /api/admin/inquiries/[id] - 문의 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '인증 토큰이 필요합니다.' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded || !(await isAdmin(decoded.userId, prisma))) {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    const inquiryId = params.id;

    const inquiry = await prisma.inquiry.findUnique({
      where: { id: inquiryId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            nickname: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!inquiry) {
      return NextResponse.json(
        { error: '문의를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        inquiry,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('문의 상세 조회 오류:', error);
    return NextResponse.json(
      { error: '문의 상세 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/inquiries/[id] - 문의 답변
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '인증 토큰이 필요합니다.' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded || !(await isAdmin(decoded.userId, prisma))) {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    const inquiryId = params.id;
    const body = await request.json();
    const { answer, status: newStatus } = body;

    if (!answer) {
      return NextResponse.json(
        { error: '답변 내용이 필요합니다.' },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.update({
      where: { id: inquiryId },
      data: {
        answer,
        status: newStatus || 'answered',
        answeredAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: '답변이 등록되었습니다.',
        inquiry,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('문의 답변 오류:', error);
    return NextResponse.json(
      { error: '문의 답변 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
