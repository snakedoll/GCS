import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// PATCH /api/notifications/read-all - 모든 알림 읽음 처리
export async function PATCH(request: NextRequest) {
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

    if (!decoded) {
      return NextResponse.json(
        { error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    const result = await prisma.notification.updateMany({
      where: {
        userId: decoded.userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json(
      {
        message: `${result.count}개의 알림이 읽음 처리되었습니다.`,
        count: result.count,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('알림 일괄 읽음 처리 오류:', error);
    return NextResponse.json(
      { error: '알림 일괄 읽음 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
