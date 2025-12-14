import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/products/[id]/like - 좋아요 여부 확인
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ isLiked: false }, { status: 200 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ isLiked: false }, { status: 200 });
    }

    const productId = params.id;

    const like = await prisma.like.findUnique({
      where: {
        userId_productId: {
          userId: decoded.userId,
          productId: productId,
        },
      },
    });

    return NextResponse.json(
      {
        isLiked: !!like,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('좋아요 여부 확인 오류:', error);
    return NextResponse.json({ isLiked: false }, { status: 200 });
  }
}

// POST /api/products/[id]/like - 상품 좋아요
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

    const productId = params.id;

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

    // 이미 좋아요한 경우 확인
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_productId: {
          userId: decoded.userId,
          productId: productId,
        },
      },
    });

    if (existingLike) {
      return NextResponse.json(
        { error: '이미 좋아요한 상품입니다.' },
        { status: 400 }
      );
    }

    // 좋아요 생성
    await prisma.like.create({
      data: {
        userId: decoded.userId,
        productId: productId,
      },
    });

    return NextResponse.json(
      {
        message: '좋아요가 추가되었습니다.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('상품 좋아요 오류:', error);
    return NextResponse.json(
      { error: '상품 좋아요 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id]/like - 상품 좋아요 취소
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

    const productId = params.id;

    // 좋아요 삭제
    const deleted = await prisma.like.deleteMany({
      where: {
        userId: decoded.userId,
        productId: productId,
      },
    });

    if (deleted.count === 0) {
      return NextResponse.json(
        { error: '좋아요한 상품이 아닙니다.' },
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
    console.error('상품 좋아요 취소 오류:', error);
    return NextResponse.json(
      { error: '상품 좋아요 취소 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
