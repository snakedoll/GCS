import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/user/likes - 좋아요한 상품 목록
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

    if (!decoded) {
      return NextResponse.json(
        { error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    const likes = await prisma.like.findMany({
      where: {
        userId: decoded.userId,
        productId: { not: null },
      },
      include: {
        product: {
          include: {
            team: {
              select: {
                id: true,
                name: true,
              },
            },
            images: {
              orderBy: {
                order: 'asc',
              },
              take: 1,
            },
            _count: {
              select: {
                likes: true,
                reviews: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const products = likes
      .filter((like) => like.product)
      .map((like) => ({
        id: like.product!.id,
        name: like.product!.name,
        description: like.product!.description,
        type: like.product!.type,
        status: like.product!.status,
        teamName: like.product!.team.name,
        thumbnail: like.product!.images[0]?.url || null,
        likeCount: like.product!._count.likes,
        reviewCount: like.product!._count.reviews,
        createdAt: like.product!.createdAt,
        likedAt: like.createdAt,
      }));

    return NextResponse.json(
      {
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('좋아요한 상품 조회 오류:', error);
    return NextResponse.json(
      { error: '좋아요한 상품 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
