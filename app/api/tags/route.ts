import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/tags - 태그 목록 조회
export async function GET(request: NextRequest) {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: {
            projects: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    const tagsWithCount = tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      projectCount: tag._count.projects,
    }));

    return NextResponse.json(
      {
        tags: tagsWithCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('태그 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '태그 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
