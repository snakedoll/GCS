import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/orders/[id] - 주문 상세 조회
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

    if (!decoded) {
      return NextResponse.json(
        { error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    const orderId = params.id;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  orderBy: { order: 'asc' },
                  take: 1,
                },
                team: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: '주문을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 주문자 본인만 조회 가능
    if (order.userId !== decoded.userId) {
      // TODO: 관리자 권한 체크 추가
      return NextResponse.json(
        { error: '권한이 없습니다.' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        order: {
          id: order.id,
          status: order.status,
          totalAmount: order.totalAmount,
          shippingAddress: order.shippingAddress,
          shippingName: order.shippingName,
          shippingPhone: order.shippingPhone,
          memo: order.memo,
          items: order.items.map((item) => ({
            id: item.id,
            product: {
              id: item.product.id,
              name: item.product.name,
              type: item.product.type,
              thumbnail: item.product.images[0]?.url || null,
              team: item.product.team,
            },
            quantity: item.quantity,
            price: item.price,
            optionData: item.optionData,
          })),
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('주문 상세 조회 오류:', error);
    return NextResponse.json(
      { error: '주문 상세 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

