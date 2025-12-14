import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/teams/[id] - 판매팀 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const teamId = params.id;

    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        representative: {
          select: {
            id: true,
            name: true,
            nickname: true,
            studentId: true,
            major: true,
            phone: true,
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
          orderBy: [
            { role: 'desc' }, // leader 먼저
            { createdAt: 'asc' },
          ],
        },
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    if (!team) {
      return NextResponse.json(
        { error: '판매팀을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        team: {
          id: team.id,
          name: team.name,
          representative: team.representative,
          members: team.members.map((member) => ({
            id: member.id,
            role: member.role,
            user: member.user,
            joinedAt: member.createdAt,
          })),
          bankName: team.bankName,
          accountNumber: team.accountNumber,
          accountHolder: team.accountHolder,
          totalSales: team.totalSales,
          isActive: team.isActive,
          productCount: team._count.products,
          createdAt: team.createdAt,
          updatedAt: team.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('판매팀 상세 조회 오류:', error);
    return NextResponse.json(
      { error: '판매팀 상세 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// PATCH /api/teams/[id] - 판매팀 정보 수정
export async function PATCH(
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

    const teamId = params.id;
    const body = await request.json();

    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        members: {
          where: {
            userId: decoded.userId,
          },
        },
      },
    });

    if (!team) {
      return NextResponse.json(
        { error: '판매팀을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 대표자 또는 관리자만 수정 가능
    const isRepresentative = team.representativeId === decoded.userId;
    const isMember = team.members.length > 0;
    // TODO: 관리자 권한 체크 추가

    if (!isRepresentative) {
      // 멤버인 경우 수정 요청으로 처리
      // TODO: TeamRequest 생성 로직 추가
      return NextResponse.json(
        { error: '대표자만 팀 정보를 수정할 수 있습니다. 수정 요청을 제출해주세요.' },
        { status: 403 }
      );
    }

    const updateData: any = {};

    if (body.name && body.name !== team.name) {
      // 팀명 중복 확인
      const existingTeam = await prisma.team.findUnique({
        where: { name: body.name },
      });

      if (existingTeam) {
        return NextResponse.json(
          { error: '이미 사용 중인 팀명입니다.' },
          { status: 409 }
        );
      }
      updateData.name = body.name;
    }

    if (body.bankName !== undefined) {
      updateData.bankName = body.bankName;
    }
    if (body.accountNumber !== undefined) {
      updateData.accountNumber = body.accountNumber;
    }
    if (body.accountHolder !== undefined) {
      updateData.accountHolder = body.accountHolder;
    }
    if (body.isActive !== undefined) {
      updateData.isActive = body.isActive;
    }

    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: updateData,
      include: {
        representative: {
          select: {
            id: true,
            name: true,
            nickname: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: '판매팀 정보가 수정되었습니다.',
        team: updatedTeam,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('판매팀 수정 오류:', error);
    return NextResponse.json(
      { error: '판매팀 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
