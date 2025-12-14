import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, isAdmin } from '@/lib/auth';

// PATCH /api/admin/projects/[id]/visibility - 프로젝트 공개/비공개 설정
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

    const projectId = params.id;
    const body = await request.json();
    const { isPublic } = body;

    if (typeof isPublic !== 'boolean') {
      return NextResponse.json(
        { error: 'isPublic은 boolean 값이어야 합니다.' },
        { status: 400 }
      );
    }

    const project = await prisma.project.update({
      where: { id: projectId },
      data: { isPublic },
    });

    return NextResponse.json(
      {
        message: `프로젝트가 ${isPublic ? '공개' : '비공개'}로 설정되었습니다.`,
        project,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('프로젝트 공개 설정 오류:', error);
    return NextResponse.json(
      { error: '프로젝트 공개 설정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
