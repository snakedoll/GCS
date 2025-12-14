import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, isAdmin } from '@/lib/auth';

// GET /api/admin/users/[id] - 회원 상세 조회
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

    const userId = params.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        nickname: true,
        name: true,
        phone: true,
        memberType: true,
        studentId: true,
        major: true,
        profileImage: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        teamMemberships: {
          include: {
            team: {
              select: {
                id: true,
                name: true,
                isActive: true,
              },
            },
          },
        },
        _count: {
          select: {
            orders: true,
            reviews: true,
            posts: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: '회원을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 누적 구매금액 계산
    const totalPurchase = await prisma.order.aggregate({
      where: {
        userId: user.id,
        status: { not: 'cancelled' },
      },
      _sum: {
        totalAmount: true,
      },
    });

    return NextResponse.json(
      {
        user: {
          ...user,
          totalPurchaseAmount: totalPurchase._sum.totalAmount || 0,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('회원 상세 조회 오류:', error);
    return NextResponse.json(
      { error: '회원 상세 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
