import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/orders - 주문 목록 조회 (사용자별)
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

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: any = {
      userId: decoded.userId,
    };

    if (status) {
      where.status = status;
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                type: true,
                images: {
                  orderBy: { order: 'asc' },
                  take: 1,
                },
                team: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const total = await prisma.order.count({ where });

    const ordersWithDetails = orders.map((order) => ({
      id: order.id,
      status: order.status,
      totalAmount: order.totalAmount,
      shippingAddress: order.shippingAddress,
      shippingName: order.shippingName,
      shippingPhone: order.shippingPhone,
      items: order.items.map((item) => ({
        id: item.id,
        product: {
          id: item.product.id,
          name: item.product.name,
          type: item.product.type,
          thumbnail: item.product.images[0]?.url || null,
          teamName: item.product.team.name,
        },
        quantity: item.quantity,
        price: item.price,
        optionData: item.optionData,
      })),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));

    return NextResponse.json(
      {
        orders: ordersWithDetails,
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
    console.error('주문 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '주문 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST /api/orders - 주문 생성
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
    const {
      items,
      shippingAddress,
      shippingName,
      shippingPhone,
      memo,
    } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: '주문 항목이 필요합니다.' },
        { status: 400 }
      );
    }

    if (!shippingAddress || !shippingName || !shippingPhone) {
      return NextResponse.json(
        { error: '배송 정보를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 상품 확인 및 총 금액 계산
    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: {
          options: {
            include: {
              values: true,
            },
          },
        },
      });

      if (!product) {
        return NextResponse.json(
          { error: `상품을 찾을 수 없습니다: ${item.productId}` },
          { status: 404 }
        );
      }

      if (product.status !== 'active') {
        return NextResponse.json(
          { error: `주문할 수 없는 상품입니다: ${product.name}` },
          { status: 400 }
        );
      }

      // 옵션 가격 계산
      let itemPrice = 0;
      if (product.options.length > 0 && item.optionData) {
        // 옵션별 가격 계산
        // optionData는 { optionId: value } 형태로 전달됨
        const optionData = item.optionData as Record<string, string>;
        
        for (const option of product.options) {
          const selectedValue = optionData[option.id];
          if (selectedValue) {
            const optionValue = option.values.find((v) => v.value === selectedValue);
            if (optionValue && optionValue.price) {
              itemPrice += optionValue.price;
            }
          }
        }
      }
      
      // 기본 가격이 0인 경우 기본값 설정 필요 (상품 모델에 basePrice 필드 추가 고려)

      const quantity = item.quantity || 1;
      const finalPrice = itemPrice * quantity;
      totalAmount += finalPrice;

      orderItemsData.push({
        productId: item.productId,
        quantity,
        price: finalPrice,
        optionData: item.optionData || null,
      });
    }

    // 주문 생성
    const order = await prisma.order.create({
      data: {
        userId: decoded.userId,
        status: 'pending',
        totalAmount,
        shippingAddress,
        shippingName,
        shippingPhone,
        memo: memo || null,
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: '주문이 생성되었습니다.',
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('주문 생성 오류:', error);
    return NextResponse.json(
      { error: '주문 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
