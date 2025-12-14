import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// PATCH /api/orders/[id]/cancel - 주문 취소
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

    if (!decoded) {
      return NextResponse.json(
        { error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    const orderId = params.id;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json(
        { error: '주문을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 주문자 본인만 취소 가능
    if (order.userId !== decoded.userId) {
      return NextResponse.json(
        { error: '권한이 없습니다.' },
        { status: 403 }
      );
    }

    // 취소 가능한 상태인지 확인
    if (
      order.status === 'cancelled' ||
      order.status === 'shipped' ||
      order.status === 'delivered'
    ) {
      return NextResponse.json(
        { error: '취소할 수 없는 주문입니다.' },
        { status: 400 }
      );
    }

    // 주문 취소
    const cancelledOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'cancelled' },
    });

    return NextResponse.json(
      {
        message: '주문이 취소되었습니다.',
        order: cancelledOrder,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('주문 취소 오류:', error);
    return NextResponse.json(
      { error: '주문 취소 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
