import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, isAdmin } from '@/lib/auth';

// GET /api/admin/statistics/sales - 매출 현황
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

    if (!decoded || !(await isAdmin(decoded.userId, prisma))) {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const where: any = {
      status: { not: 'cancelled' },
    };

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    // 총 매출액
    const totalSales = await prisma.order.aggregate({
      where,
      _sum: {
        totalAmount: true,
      },
    });

    // 총 주문 수
    const totalOrders = await prisma.order.count({ where });

    // 상품 타입별 매출
    const fundSales = await prisma.orderItem.aggregate({
      where: {
        order: where,
        product: {
          type: 'fund',
        },
      },
      _sum: {
        price: true,
      },
    });

    const partnerSales = await prisma.orderItem.aggregate({
      where: {
        order: where,
        product: {
          type: 'partner',
        },
      },
      _sum: {
        price: true,
      },
    });

    // 팀별 매출 (Top 5)
    const teamSales = await prisma.orderItem.groupBy({
      by: ['productId'],
      where: {
        order: where,
      },
      _sum: {
        price: true,
      },
      orderBy: {
        _sum: {
          price: 'desc',
        },
      },
      take: 5,
    });

    const teamSalesWithDetails = await Promise.all(
      teamSales.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          include: {
            team: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });
        return {
          team: product?.team,
          sales: item._sum.price || 0,
        };
      })
    );

    return NextResponse.json(
      {
        statistics: {
          totalSales: totalSales._sum.totalAmount || 0,
          totalOrders,
          byType: {
            fund: fundSales._sum.price || 0,
            partner: partnerSales._sum.price || 0,
          },
          topTeams: teamSalesWithDetails,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('매출 현황 조회 오류:', error);
    return NextResponse.json(
      { error: '매출 현황 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
