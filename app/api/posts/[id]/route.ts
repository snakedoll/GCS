import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/posts/[id] - 게시글 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            profileImage: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 비공개 게시글 체크
    if (!post.isPublic) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        const decoded = verifyToken(token);
        if (decoded && decoded.userId === post.userId) {
          // 작성자 본인은 조회 가능
        } else {
          return NextResponse.json(
            { error: '비공개 게시글입니다.' },
            { status: 403 }
          );
        }
      } else {
        return NextResponse.json(
          { error: '비공개 게시글입니다.' },
          { status: 403 }
        );
      }
    }

    // 조회수 증가
    prisma.post.update({
      where: { id: postId },
      data: { viewCount: { increment: 1 } },
    }).catch(err => console.error('조회수 증가 오류:', err));

    return NextResponse.json(
      {
        post: {
          id: post.id,
          category: post.category,
          title: post.title,
          subtitle: post.subtitle,
          content: post.content,
          thumbnail: post.thumbnail,
          user: post.user,
          viewCount: post.viewCount,
          likeCount: post._count.likes,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('게시글 상세 조회 오류:', error);
    return NextResponse.json(
      { error: '게시글 상세 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// PATCH /api/posts/[id] - 게시글 수정
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

    if (!decoded) {
      return NextResponse.json(
        { error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    const postId = params.id;
    const body = await request.json();

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json(
        { error: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 작성자 본인만 수정 가능
    if (post.userId !== decoded.userId) {
      return NextResponse.json(
        { error: '권한이 없습니다.' },
        { status: 403 }
      );
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title: body.title,
        subtitle: body.subtitle,
        content: body.content,
        thumbnail: body.thumbnail,
        isPublic: body.isPublic,
      },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            profileImage: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: '게시글이 수정되었습니다.',
        post: updatedPost,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('게시글 수정 오류:', error);
    return NextResponse.json(
      { error: '게시글 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[id] - 게시글 삭제
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

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json(
        { error: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 작성자 본인만 삭제 가능
    if (post.userId !== decoded.userId) {
      // TODO: 관리자 권한 체크 추가
      return NextResponse.json(
        { error: '권한이 없습니다.' },
        { status: 403 }
      );
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json(
      {
        message: '게시글이 삭제되었습니다.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('게시글 삭제 오류:', error);
    return NextResponse.json(
      { error: '게시글 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
