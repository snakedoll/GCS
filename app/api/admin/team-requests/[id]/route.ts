import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, isAdmin } from '@/lib/auth';

// PATCH /api/admin/team-requests/[id] - 팀 요청 처리 (승인/거부)
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

    if (!decoded || !(await isAdmin(decoded.userId, prisma))) {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    const requestId = params.id;
    const body = await request.json();
    const { action } = body; // "approve" | "reject"

    if (!action || (action !== 'approve' && action !== 'reject')) {
      return NextResponse.json(
        { error: '올바른 액션을 지정해주세요. (approve 또는 reject)' },
        { status: 400 }
      );
    }

    const teamRequest = await prisma.teamRequest.findUnique({
      where: { id: requestId },
      include: {
        team: true,
      },
    });

    if (!teamRequest) {
      return NextResponse.json(
        { error: '팀 요청을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    if (teamRequest.status !== 'pending') {
      return NextResponse.json(
        { error: '이미 처리된 요청입니다.' },
        { status: 400 }
      );
    }

    if (action === 'approve') {
      // 요청 승인 및 팀 정보 업데이트
      const changes = teamRequest.changes as any;
      const updateData: any = {};

      if (changes?.name) updateData.name = changes.name;
      if (changes?.bankName !== undefined) updateData.bankName = changes.bankName;
      if (changes?.accountNumber !== undefined) updateData.accountNumber = changes.accountNumber;
      if (changes?.accountHolder !== undefined) updateData.accountHolder = changes.accountHolder;

      await prisma.$transaction([
        prisma.teamRequest.update({
          where: { id: requestId },
          data: { status: 'approved' },
        }),
        ...(Object.keys(updateData).length > 0
          ? [
              prisma.team.update({
                where: { id: teamRequest.teamId },
                data: updateData,
              }),
            ]
          : []),
      ]);
    } else {
      // 요청 거부
      await prisma.teamRequest.update({
        where: { id: requestId },
        data: { status: 'rejected' },
      });
    }

    return NextResponse.json(
      {
        message: `팀 요청이 ${action === 'approve' ? '승인' : '거부'}되었습니다.`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('팀 요청 처리 오류:', error);
    return NextResponse.json(
      { error: '팀 요청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
