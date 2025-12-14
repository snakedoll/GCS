import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// POST /api/teams/[id]/members - 팀 멤버 추가
export async function POST(
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
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: '사용자 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const team = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      return NextResponse.json(
        { error: '판매팀을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 대표자만 멤버 추가 가능
    if (team.representativeId !== decoded.userId) {
      return NextResponse.json(
        { error: '권한이 없습니다.' },
        { status: 403 }
      );
    }

    // 이미 멤버인지 확인
    const existingMember = await prisma.teamMember.findUnique({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
    });

    if (existingMember) {
      return NextResponse.json(
        { error: '이미 팀 멤버입니다.' },
        { status: 400 }
      );
    }

    // 멤버 추가
    const member = await prisma.teamMember.create({
      data: {
        teamId,
        userId,
        role: 'member',
      },
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
    });

    return NextResponse.json(
      {
        message: '팀 멤버가 추가되었습니다.',
        member,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('팀 멤버 추가 오류:', error);
    return NextResponse.json(
      { error: '팀 멤버 추가 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
