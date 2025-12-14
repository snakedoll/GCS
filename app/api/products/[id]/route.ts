import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products/[id] - 상품 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        team: {
          select: {
            id: true,
            name: true,
            isActive: true,
          },
        },
        images: {
          orderBy: {
            order: 'asc',
          },
        },
        tags: true,
        options: {
          include: {
            values: {
              orderBy: {
                price: 'asc',
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            reviews: true,
            orderItems: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 공개되지 않은 상품은 관리자만 조회 가능
    if (!product.isPublic) {
      // TODO: 관리자 권한 체크 추가
      // const authHeader = request.headers.get('authorization');
      // if (!authHeader || !isAdmin) {
      //   return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
      // }
    }

    // 조회수 증가 (비동기로 처리하여 응답 속도에 영향 최소화)
    prisma.product.update({
      where: { id: productId },
      data: { viewCount: { increment: 1 } },
    }).catch(err => console.error('조회수 증가 오류:', err));

    // 리뷰 평균 평점 계산
    const reviews = await prisma.review.findMany({
      where: { productId },
      select: { rating: true },
    });

    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        : 0;

    return NextResponse.json(
      {
        product: {
          id: product.id,
          name: product.name,
          description: product.description,
          type: product.type,
          status: product.status,
          team: product.team,
          goalAmount: product.goalAmount,
          currentAmount: product.currentAmount,
          startDate: product.startDate,
          endDate: product.endDate,
          receiveMethod: product.receiveMethod,
          images: product.images,
          tags: product.tags.map((tag) => tag.tag),
          options: product.options.map((option) => ({
            id: option.id,
            name: option.name,
            values: option.values,
          })),
          stats: {
            likeCount: product._count.likes,
            reviewCount: product._count.reviews,
            orderCount: product._count.orderItems,
            averageRating: Math.round(averageRating * 10) / 10,
          },
          viewCount: product.viewCount,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('상품 상세 조회 오류:', error);
    return NextResponse.json(
      { error: '상품 상세 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
