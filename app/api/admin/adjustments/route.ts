import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, isAdmin } from '@/lib/auth';

// GET /api/admin/adjustments - 정산 내역 조회
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
    const teamId = searchParams.get('teamId');
    const status = searchParams.get('status');
    const periodStart = searchParams.get('periodStart');
    const periodEnd = searchParams.get('periodEnd');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: any = {};

    if (teamId) {
      where.teamId = teamId;
    }

    if (status) {
      where.status = status;
    }

    if (periodStart && periodEnd) {
      where.periodStart = { gte: new Date(periodStart) };
      where.periodEnd = { lte: new Date(periodEnd) };
    }

    const adjustments = await prisma.adjustment.findMany({
      where,
      include: {
        team: {
          select: {
            id: true,
            name: true,
          },
        },
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const total = await prisma.adjustment.count({ where });

    return NextResponse.json(
      {
        adjustments,
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
    console.error('정산 내역 조회 오류:', error);
    return NextResponse.json(
      { error: '정산 내역 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST /api/admin/adjustments - 정산 생성
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { teamId, periodStart, periodEnd, items, memo } = body;

    if (!teamId || !periodStart || !periodEnd) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 팀 확인
    const team = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      return NextResponse.json(
        { error: '판매팀을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 총 정산 금액 계산
    const totalAmount =
      items && Array.isArray(items)
        ? items.reduce((sum: number, item: any) => sum + (item.amount || 0), 0)
        : 0;

    // 정산 생성
    const adjustment = await prisma.adjustment.create({
      data: {
        teamId,
        periodStart: new Date(periodStart),
        periodEnd: new Date(periodEnd),
        totalAmount,
        memo: memo || null,
        items: items && Array.isArray(items) ? {
          create: items.map((item: any) => ({
            orderId: item.orderId || null,
            productId: item.productId || null,
            amount: item.amount || 0,
            description: item.description || null,
          })),
        } : undefined,
      },
      include: {
        team: {
          select: {
            id: true,
            name: true,
          },
        },
        items: true,
      },
    });

    return NextResponse.json(
      {
        message: '정산이 생성되었습니다.',
        adjustment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('정산 생성 오류:', error);
    return NextResponse.json(
      { error: '정산 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
