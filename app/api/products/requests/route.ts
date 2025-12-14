import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// POST /api/products/requests - 상품 등록 요청 생성
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
    const { requestData } = body;

    if (!requestData) {
      return NextResponse.json(
        { error: '요청 데이터가 필요합니다.' },
        { status: 400 }
      );
    }

    // 사용자가 속한 팀 확인
    const teamMembership = await prisma.teamMember.findFirst({
      where: {
        userId: decoded.userId,
      },
      include: {
        team: true,
      },
    });

    if (!teamMembership) {
      return NextResponse.json(
        { error: '판매팀에 소속되어 있지 않습니다.' },
        { status: 403 }
      );
    }

    // 상품 생성 (pending 상태)
    const product = await prisma.product.create({
      data: {
        name: requestData.name || '상품명',
        description: requestData.description || null,
        type: requestData.type || 'fund',
        status: 'pending',
        teamId: teamMembership.team.id,
        goalAmount: requestData.goalAmount || null,
        startDate: requestData.startDate ? new Date(requestData.startDate) : null,
        endDate: requestData.endDate ? new Date(requestData.endDate) : null,
        receiveMethod: requestData.receiveMethod || null,
        isPublic: false,
      },
    });

    // 상품 등록 요청 생성
    const productRequest = await prisma.productRequest.create({
      data: {
        productId: product.id,
        requestedBy: decoded.userId,
        requestData: requestData,
      },
      include: {
        product: {
          include: {
            team: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: '상품 등록 요청이 생성되었습니다.',
        request: productRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('상품 등록 요청 생성 오류:', error);
    return NextResponse.json(
      { error: '상품 등록 요청 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
