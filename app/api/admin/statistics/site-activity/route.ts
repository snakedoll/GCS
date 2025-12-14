import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, isAdmin } from '@/lib/auth';

// GET /api/admin/statistics/site-activity - 사이트 활동 통계
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

    // 총 사용자 수
    const totalUsers = await prisma.user.count();

    // 총 게시글 수
    const totalPosts = await prisma.post.count({ where: { isPublic: true } });

    // 총 상품 수
    const totalProducts = await prisma.product.count({ where: { isPublic: true } });

    // 총 주문 수
    const totalOrders = await prisma.order.count();

    // 총 리뷰 수
    const totalReviews = await prisma.review.count();

    // 최근 7일간 활동
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentUsers = await prisma.user.count({
      where: { createdAt: { gte: sevenDaysAgo } },
    });

    const recentOrders = await prisma.order.count({
      where: { createdAt: { gte: sevenDaysAgo } },
    });

    const recentPosts = await prisma.post.count({
      where: {
        isPublic: true,
        createdAt: { gte: sevenDaysAgo },
      },
    });

    return NextResponse.json(
      {
        statistics: {
          total: {
            users: totalUsers,
            posts: totalPosts,
            products: totalProducts,
            orders: totalOrders,
            reviews: totalReviews,
          },
          recent7Days: {
            users: recentUsers,
            orders: recentOrders,
            posts: recentPosts,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('사이트 활동 통계 조회 오류:', error);
    return NextResponse.json(
      { error: '사이트 활동 통계 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
