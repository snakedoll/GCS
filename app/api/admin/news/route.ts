import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, isAdmin } from '@/lib/auth';

// GET /api/admin/news - 뉴스 목록 (관리자용)
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
    const year = searchParams.get('year');
    const isPublic = searchParams.get('isPublic');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: any = {};

    if (year) {
      const yearNum = parseInt(year);
      if (!isNaN(yearNum)) {
        where.year = yearNum;
      }
    }

    if (isPublic === 'true') {
      where.isPublic = true;
    } else if (isPublic === 'false') {
      where.isPublic = false;
    }

    const news = await prisma.news.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const total = await prisma.news.count({ where });

    return NextResponse.json(
      {
        news,
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

// POST /api/admin/news - 뉴스 생성
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
    const { title, content, link, year, isHeadline, isPublic } = body;

    if (!title || !year) {
      return NextResponse.json(
        { error: '제목과 연도는 필수입니다.' },
        { status: 400 }
      );
    }

    const news = await prisma.news.create({
      data: {
        title,
        content: content || null,
        link: link || null,
        year: parseInt(year),
        isHeadline: isHeadline || false,
        isPublic: isPublic !== undefined ? isPublic : true,
      },
    });

    return NextResponse.json(
      {
        message: '뉴스가 생성되었습니다.',
        news,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('뉴스 생성 오류:', error);
    return NextResponse.json(
      { error: '뉴스 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
