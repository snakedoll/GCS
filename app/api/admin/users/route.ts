import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, isAdmin } from '@/lib/auth';

// GET /api/admin/users - 회원 목록 조회 (검색/필터링)
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
    const search = searchParams.get('search'); // 이름, 닉네임, 학번, 전공 검색
    const memberType = searchParams.get('memberType'); // "general" | "major" | "admin"
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: any = {};

    if (memberType) {
      where.memberType = memberType;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { nickname: { contains: search, mode: 'insensitive' } },
        { studentId: { contains: search, mode: 'insensitive' } },
        { major: { contains: search, mode: 'insensitive' } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        nickname: true,
        name: true,
        phone: true,
        memberType: true,
        studentId: true,
        major: true,
        hasSellingPermission: true,
        createdAt: true,
        _count: {
          select: {
            orders: true,
            teamMemberships: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    // 누적 구매금액 계산
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const totalPurchase = await prisma.order.aggregate({
          where: {
            userId: user.id,
            status: { not: 'cancelled' },
          },
          _sum: {
            totalAmount: true,
          },
        });

        return {
          id: user.id,
          email: user.email,
          nickname: user.nickname,
          name: user.name,
          phone: user.phone,
          memberType: user.memberType,
          studentId: user.studentId,
          major: user.major,
          totalPurchaseAmount: totalPurchase._sum.totalAmount || 0,
          hasSellingPermission: user.hasSellingPermission || false,
          createdAt: user.createdAt,
        };
      })
    );

    const total = await prisma.user.count({ where });

    return NextResponse.json(
      {
        users: usersWithStats,
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
    console.error('회원 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '회원 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
