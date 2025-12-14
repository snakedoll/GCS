import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/user/orders - 내 주문 내역 (마이페이지용)
export async function GET(request: NextRequest) {
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

    // GET /api/orders와 동일한 로직 사용
    // 이 엔드포인트는 마이페이지에서 사용하기 위한 별칭
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    const where: any = {
      userId: decoded.userId,
    };

    if (status) {
      where.status = status;
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                type: true,
                images: {
                  orderBy: { order: 'asc' },
                  take: 1,
                },
                team: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const ordersWithDetails = orders.map((order) => ({
      id: order.id,
      status: order.status,
      totalAmount: order.totalAmount,
      items: order.items.map((item) => ({
        id: item.id,
        product: {
          id: item.product.id,
          name: item.product.name,
          type: item.product.type,
          thumbnail: item.product.images[0]?.url || null,
          teamName: item.product.team.name,
        },
        quantity: item.quantity,
        price: item.price,
      })),
      createdAt: order.createdAt,
    }));

    return NextResponse.json(
      {
        orders: ordersWithDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('주문 내역 조회 오류:', error);
    return NextResponse.json(
      { error: '주문 내역 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
