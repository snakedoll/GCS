import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/teams - 판매팀 목록 조회
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const isActive = searchParams.get('isActive'); // "true" | "false"
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: any = {};

    if (isActive === 'true') {
      where.isActive = true;
    } else if (isActive === 'false') {
      where.isActive = false;
    }

    const teams = await prisma.team.findMany({
      where,
      include: {
        representative: {
          select: {
            id: true,
            name: true,
            nickname: true,
          },
        },
        _count: {
          select: {
            members: true,
            products: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const total = await prisma.team.count({ where });

    const teamsWithDetails = teams.map((team) => ({
      id: team.id,
      name: team.name,
      representative: team.representative,
      totalSales: team.totalSales,
      isActive: team.isActive,
      memberCount: team._count.members,
      productCount: team._count.products,
      createdAt: team.createdAt,
    }));

    return NextResponse.json(
      {
        teams: teamsWithDetails,
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
    console.error('판매팀 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '판매팀 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST /api/teams - 판매팀 생성
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

    if (!decoded) {
      return NextResponse.json(
        { error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, bankName, accountNumber, accountHolder, memberIds } = body;

    if (!name) {
      return NextResponse.json(
        { error: '팀명은 필수입니다.' },
        { status: 400 }
      );
    }

    // 팀명 중복 확인
    const existingTeam = await prisma.team.findUnique({
      where: { name },
    });

    if (existingTeam) {
      return NextResponse.json(
        { error: '이미 사용 중인 팀명입니다.' },
        { status: 409 }
      );
    }

    // 팀 생성 (대표자는 요청한 사용자)
    const team = await prisma.team.create({
      data: {
        name,
        representativeId: decoded.userId,
        bankName: bankName || null,
        accountNumber: accountNumber || null,
        accountHolder: accountHolder || null,
        members: {
          create: [
            // 대표자 추가
            {
              userId: decoded.userId,
              role: 'leader',
            },
            // 다른 멤버들 추가
            ...(memberIds && Array.isArray(memberIds)
              ? memberIds
                  .filter((id: string) => id !== decoded.userId)
                  .map((id: string) => ({
                    userId: id,
                    role: 'member',
                  }))
              : []),
          ],
        },
      },
      include: {
        representative: {
          select: {
            id: true,
            name: true,
            nickname: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                nickname: true,
                studentId: true,
                major: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: '판매팀이 생성되었습니다.',
        team,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('판매팀 생성 오류:', error);
    return NextResponse.json(
      { error: '판매팀 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
