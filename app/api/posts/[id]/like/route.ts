import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// POST /api/posts/[id]/like - 게시글 좋아요
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

    const postId = params.id;

    // 게시글 존재 확인
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json(
        { error: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 이미 좋아요한 경우 확인
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: decoded.userId,
          postId: postId,
        },
      },
    });

    if (existingLike) {
      return NextResponse.json(
        { error: '이미 좋아요한 게시글입니다.' },
        { status: 400 }
      );
    }

    // 좋아요 생성
    await prisma.like.create({
      data: {
        userId: decoded.userId,
        postId: postId,
      },
    });

    return NextResponse.json(
      {
        message: '좋아요가 추가되었습니다.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('게시글 좋아요 오류:', error);
    return NextResponse.json(
      { error: '게시글 좋아요 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[id]/like - 게시글 좋아요 취소
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

    if (!decoded) {
      return NextResponse.json(
        { error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    const postId = params.id;

    // 좋아요 삭제
    const deleted = await prisma.like.deleteMany({
      where: {
        userId: decoded.userId,
        postId: postId,
      },
    });

    if (deleted.count === 0) {
      return NextResponse.json(
        { error: '좋아요한 게시글이 아닙니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: '좋아요가 취소되었습니다.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('게시글 좋아요 취소 오류:', error);
    return NextResponse.json(
      { error: '게시글 좋아요 취소 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
