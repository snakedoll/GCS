import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/news - 뉴스 목록 조회
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const year = searchParams.get('year');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: any = {
      isPublic: true,
    };

    if (year) {
      const yearNum = parseInt(year);
      if (!isNaN(yearNum)) {
        where.year = yearNum;
      }
    }

    const news = await prisma.news.findMany({
      where,
      orderBy: [
        { isHeadline: 'desc' }, // 헤드라인 우선
        { createdAt: 'desc' },
      ],
      skip,
      take: limit,
    });

    const total = await prisma.news.count({ where });

    return NextResponse.json(
      {
        news: news,
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
    console.error('뉴스 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '뉴스 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
