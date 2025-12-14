import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, isAdmin } from '@/lib/auth';

// PATCH /api/admin/product-requests/[id]/reject - 요청 거부
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

    const requestId = params.id;

    const productRequest = await prisma.productRequest.findUnique({
      where: { id: requestId },
    });

    if (!productRequest) {
      return NextResponse.json(
        { error: '상품 등록 요청을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    if (productRequest.status !== 'pending') {
      return NextResponse.json(
        { error: '이미 처리된 요청입니다.' },
        { status: 400 }
      );
    }

    // 요청 거부
    await prisma.productRequest.update({
      where: { id: requestId },
      data: { status: 'rejected' },
    });

    return NextResponse.json(
      {
        message: '상품 등록 요청이 거부되었습니다.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('상품 등록 요청 거부 오류:', error);
    return NextResponse.json(
      { error: '상품 등록 요청 거부 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
