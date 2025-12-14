import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// DELETE /api/teams/[id]/members/[userId] - 팀 멤버 제거
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; userId: string } }
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

    const { id: teamId, userId: targetUserId } = params;

    const team = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      return NextResponse.json(
        { error: '판매팀을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 대표자는 제거할 수 없음
    if (team.representativeId === targetUserId) {
      return NextResponse.json(
        { error: '대표자는 제거할 수 없습니다.' },
        { status: 400 }
      );
    }

    // 대표자만 멤버 제거 가능
    if (team.representativeId !== decoded.userId) {
      // 본인은 탈퇴 가능
      if (decoded.userId !== targetUserId) {
        return NextResponse.json(
          { error: '권한이 없습니다.' },
          { status: 403 }
        );
      }
    }

    // 멤버 제거
    const deleted = await prisma.teamMember.deleteMany({
      where: {
        teamId,
        userId: targetUserId,
      },
    });

    if (deleted.count === 0) {
      return NextResponse.json(
        { error: '팀 멤버를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: '팀 멤버가 제거되었습니다.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('팀 멤버 제거 오류:', error);
    return NextResponse.json(
      { error: '팀 멤버 제거 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
