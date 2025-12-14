import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products - 상품 목록 조회
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type'); // "fund" | "partner"
    const status = searchParams.get('status'); // "전체" | "진행 중" | "진행 예정" | "진행 완료"
    const isPublic = searchParams.get('isPublic'); // "true" | "false"
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // 필터 조건 구성
    const where: any = {};

    if (type && (type === 'fund' || type === 'partner')) {
      where.type = type;
    }

    if (isPublic === 'true') {
      where.isPublic = true;
    } else if (isPublic === 'false') {
      where.isPublic = false;
    }

    // 상태 필터링 (Fund의 경우)
    if (status && status !== '전체') {
      const now = new Date();
      if (status === '진행 중') {
        where.OR = [
          { type: 'partner', status: 'active' },
          {
            type: 'fund',
            status: 'active',
            startDate: { lte: now },
            endDate: { gte: now },
          },
        ];
      } else if (status === '진행 예정') {
        where.OR = [
          {
            type: 'fund',
            startDate: { gt: now },
          },
        ];
      } else if (status === '진행 완료') {
        where.OR = [
          { type: 'partner', status: 'completed' },
          {
            type: 'fund',
            OR: [
              { status: 'completed' },
              { endDate: { lt: now }, status: { not: 'completed' } },
            ],
          },
        ];
      }
    } else {
      // 기본적으로 공개된 상품만
      where.isPublic = true;
    }

    // 상품 목록 조회 (관련 데이터 포함)
    const products = await prisma.product.findMany({
      where,
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
          take: 1, // 첫 번째 이미지만
        },
        tags: true,
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
      skip,
      take: limit,
    });

    // 총 개수 조회
    const total = await prisma.product.count({ where });

    // 좋아요 개수 포함하여 응답
    const productsWithStats = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      type: product.type,
      status: product.status,
      teamName: product.team.name,
      goalAmount: product.goalAmount,
      currentAmount: product.currentAmount,
      startDate: product.startDate,
      endDate: product.endDate,
      receiveMethod: product.receiveMethod,
      thumbnail: product.images[0]?.url || null,
      likeCount: product._count.likes,
      reviewCount: product._count.reviews,
      orderCount: product._count.orderItems,
      tags: product.tags.map((tag) => tag.tag),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    return NextResponse.json(
      {
        products: productsWithStats,
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
    console.error('상품 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '상품 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
