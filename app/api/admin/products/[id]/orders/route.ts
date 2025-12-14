import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, isAdmin } from '@/lib/auth';

// GET /api/admin/products/[id]/orders - 상품별 주문 내역
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

    const productId = params.id;
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const orderItems = await prisma.orderItem.findMany({
      where: { productId },
      include: {
        order: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                nickname: true,
                email: true,
              },
            },
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const total = await prisma.orderItem.count({
      where: { productId },
    });

    const orders = orderItems.map((item) => ({
      id: item.order.id,
      user: item.order.user,
      status: item.order.status,
      quantity: item.quantity,
      price: item.price,
      totalAmount: item.price * item.quantity,
      optionData: item.optionData,
      createdAt: item.order.createdAt,
    }));

    return NextResponse.json(
      {
        orders,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('상품별 주문 내역 조회 오류:', error);
    return NextResponse.json(
      { error: '상품별 주문 내역 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
