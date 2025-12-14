import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/user/products - 내가 등록한 상품 조회
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

    // 사용자가 소속된 팀 찾기
    const teamMemberships = await prisma.teamMember.findMany({
      where: {
        userId: decoded.userId,
      },
      select: {
        teamId: true,
      },
    });

    const teamIds = teamMemberships.map((tm) => tm.teamId);

    if (teamIds.length === 0) {
      return NextResponse.json(
        {
          products: [],
        },
        { status: 200 }
      );
    }

    // 팀이 등록한 상품 조회
    const products = await prisma.product.findMany({
      where: {
        teamId: {
          in: teamIds,
        },
      },
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
            orderItems: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const productsWithDetails = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      type: product.type,
      status: product.status,
      teamName: product.team.name,
      thumbnail: product.images[0]?.url || null,
      likeCount: product._count.likes,
      reviewCount: product._count.reviews,
      orderCount: product._count.orderItems,
      isPublic: product.isPublic,
      createdAt: product.createdAt,
    }));

    return NextResponse.json(
      {
        products: productsWithDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('내 상품 조회 오류:', error);
    return NextResponse.json(
      { error: '내 상품 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
