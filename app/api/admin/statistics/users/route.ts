import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, isAdmin } from '@/lib/auth';

// GET /api/admin/statistics/users - 사용자 통계
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

    // 회원 타입별 통계
    const generalUsers = await prisma.user.count({ where: { memberType: 'general' } });
    const majorUsers = await prisma.user.count({ where: { memberType: 'major' } });
    const adminUsers = await prisma.user.count({ where: { memberType: 'admin' } });

    // 이메일 인증 통계
    const verifiedUsers = await prisma.user.count({ where: { emailVerified: true } });
    const unverifiedUsers = await prisma.user.count({ where: { emailVerified: false } });

    // 판매팀 멤버십 통계
    const usersWithTeams = await prisma.user.count({
      where: {
        teamMemberships: {
          some: {},
        },
      },
    });

    // 주문한 사용자 통계
    const usersWithOrders = await prisma.user.count({
      where: {
        orders: {
          some: {},
        },
      },
    });

    // 최근 가입자 (30일)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentUsers = await prisma.user.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    });

    return NextResponse.json(
      {
        statistics: {
          byType: {
            general: generalUsers,
            major: majorUsers,
            admin: adminUsers,
            total: generalUsers + majorUsers + adminUsers,
          },
          emailVerification: {
            verified: verifiedUsers,
            unverified: unverifiedUsers,
          },
          activity: {
            withTeams: usersWithTeams,
            withOrders: usersWithOrders,
          },
          recent30Days: {
            newUsers: recentUsers,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('사용자 통계 조회 오류:', error);
    return NextResponse.json(
      { error: '사용자 통계 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
