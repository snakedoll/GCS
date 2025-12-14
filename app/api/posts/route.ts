import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/posts - 게시글 목록 조회
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category'); // "board" | "lounge"
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: any = {
      isPublic: true,
    };

    if (category && (category === 'board' || category === 'lounge')) {
      where.category = category;
    }

    const posts = await prisma.post.findMany({
      where,
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
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const total = await prisma.post.count({ where });

    const postsWithDetails = posts.map((post) => ({
      id: post.id,
      category: post.category,
      title: post.title,
      subtitle: post.subtitle,
      thumbnail: post.thumbnail,
      user: post.user,
      viewCount: post.viewCount,
      likeCount: post._count.likes,
      createdAt: post.createdAt,
    }));

    return NextResponse.json(
      {
        posts: postsWithDetails,
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
    console.error('게시글 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '게시글 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST /api/posts - 게시글 작성
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

    if (!decoded) {
      return NextResponse.json(
        { error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { category, title, subtitle, content, thumbnail, isPublic } = body;

    if (!category || !title) {
      return NextResponse.json(
        { error: '카테고리와 제목은 필수입니다.' },
        { status: 400 }
      );
    }

    if (category !== 'board' && category !== 'lounge') {
      return NextResponse.json(
        { error: '올바른 카테고리를 입력해주세요.' },
        { status: 400 }
      );
    }

    // Lounge는 전공 회원만 작성 가능
    if (category === 'lounge') {
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { memberType: true },
      });

      if (user?.memberType !== 'major' && user?.memberType !== 'admin') {
        return NextResponse.json(
          { error: 'Lounge 게시글은 전공 회원만 작성할 수 있습니다.' },
          { status: 403 }
        );
      }
    }

    const post = await prisma.post.create({
      data: {
        userId: decoded.userId,
        category,
        title,
        subtitle: subtitle || null,
        content: content || null,
        thumbnail: thumbnail || null,
        isPublic: isPublic !== undefined ? isPublic : true,
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
        message: '게시글이 작성되었습니다.',
        post,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('게시글 작성 오류:', error);
    return NextResponse.json(
      { error: '게시글 작성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
