import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, isAdmin } from '@/lib/auth';

// PATCH /api/admin/news/[id] - 뉴스 수정
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

    const newsId = params.id;
    const body = await request.json();

    const updateData: any = {};

    if (body.title) updateData.title = body.title;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.link !== undefined) updateData.link = body.link;
    if (body.year) updateData.year = parseInt(body.year);
    if (body.isHeadline !== undefined) updateData.isHeadline = body.isHeadline;
    if (body.isPublic !== undefined) updateData.isPublic = body.isPublic;

    const updatedNews = await prisma.news.update({
      where: { id: newsId },
      data: updateData,
    });

    return NextResponse.json(
      {
        message: '뉴스가 수정되었습니다.',
        news: updatedNews,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('뉴스 수정 오류:', error);
    return NextResponse.json(
      { error: '뉴스 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/news/[id] - 뉴스 삭제
export async function DELETE(
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

    const newsId = params.id;

    await prisma.news.delete({
      where: { id: newsId },
    });

    return NextResponse.json(
      {
        message: '뉴스가 삭제되었습니다.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('뉴스 삭제 오류:', error);
    return NextResponse.json(
      { error: '뉴스 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
