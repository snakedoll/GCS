import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/news/[id] - 뉴스 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const newsId = params.id;

    const news = await prisma.news.findUnique({
      where: { id: newsId },
    });

    if (!news) {
      return NextResponse.json(
        { error: '뉴스를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 비공개 뉴스 체크
    if (!news.isPublic) {
      // TODO: 관리자 권한 체크 추가
      return NextResponse.json(
        { error: '비공개 뉴스입니다.' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        news: news,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('뉴스 상세 조회 오류:', error);
    return NextResponse.json(
      { error: '뉴스 상세 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
