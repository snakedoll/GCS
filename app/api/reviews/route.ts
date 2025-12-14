import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/reviews - 리뷰 목록 조회
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get('productId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: any = {};

    if (productId) {
      where.productId = productId;
    }

    const reviews = await prisma.review.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            profileImage: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            team: {
              select: {
                name: true,
              },
            },
          },
        },
        images: {
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const total = await prisma.review.count({ where });

    const reviewsWithDetails = reviews.map((review) => ({
      id: review.id,
      user: review.user,
      product: review.product,
      rating: review.rating,
      content: review.content,
      images: review.images.map((img) => img.url),
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    }));

    return NextResponse.json(
      {
        reviews: reviewsWithDetails,
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
    console.error('리뷰 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '리뷰 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST /api/reviews - 리뷰 작성
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
    const { productId, orderId, rating, content, images } = body;

    if (!productId || !rating || !content) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: '평점은 1부터 5까지 가능합니다.' },
        { status: 400 }
      );
    }

    // 상품 존재 확인
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 주문 확인 (선택적)
    if (orderId) {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
      });

      if (!order || order.userId !== decoded.userId) {
        return NextResponse.json(
          { error: '유효하지 않은 주문입니다.' },
          { status: 404 }
        );
      }
    }

    // 리뷰 생성
    const review = await prisma.review.create({
      data: {
        userId: decoded.userId,
        productId,
        orderId: orderId || null,
        rating,
        content,
        images: images && images.length > 0 ? {
          create: images.map((url: string, index: number) => ({
            url,
            order: index,
          })),
        } : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            profileImage: true,
          },
        },
        images: true,
      },
    });

    return NextResponse.json(
      {
        message: '리뷰가 작성되었습니다.',
        review: {
          id: review.id,
          user: review.user,
          rating: review.rating,
          content: review.content,
          images: review.images.map((img) => img.url),
          createdAt: review.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('리뷰 작성 오류:', error);
    return NextResponse.json(
      { error: '리뷰 작성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
