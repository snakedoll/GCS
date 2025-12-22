import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/about/major - 전공 소개 콘텐츠 조회
export async function GET(request: NextRequest) {
  try {
    const content = await prisma.pageContent.findUnique({
      where: { page: 'about-major' },
    });

    if (!content) {
      // 기본값 반환 (하드코딩된 내용)
      return NextResponse.json(
        {
          content: {
            title: {
              korean: '그래픽커뮤니케이션사이언스',
              english: 'Graphic Communication Science (GCS)',
            },
            description: {
              paragraph1: {
                text1: 'GCS는',
                bold1: '예술(디자인)',
                text2: '과',
                bold2: '경영(마케팅 및 전략)',
                text3: ',',
                text4: '그리고',
                bold3: '공학(프린팅과 패키징)',
                text5: ' 등의 다양한 학제가 관련된 연계전공입니다.',
              },
              paragraph2: '',
              paragraph3: '본 전공은 Design, Management, Technology의 세 영역을 축으로, 브랜드 매니지먼트의 핵심인 시각적 커뮤니케이션, 전략적 기획, 기술적 구현을 종합적으로 다룹니다.',
            },
            images: [
              {
                url: "https://www.figma.com/api/mcp/asset/97e048cb-b9b4-44fd-bd41-e431a92e79c0",
                position: "left", // left 또는 right
                className: "absolute h-[106.8%] left-[-24.6%] max-w-none top-0 w-[142.39%]",
              },
              {
                url: "https://www.figma.com/api/mcp/asset/d9039223-8089-4760-a02d-0cee1383311f",
                position: "right",
                className: "absolute h-[184.8%] left-[-10.48%] max-w-none top-[-53.23%] w-[117.48%]",
              },
            ],
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        content: content.content as any,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('전공 소개 콘텐츠 조회 오류:', error);
    return NextResponse.json(
      { error: '콘텐츠 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// PUT /api/about/major - 전공 소개 콘텐츠 수정 (관리자만)
export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '인증 토큰이 필요합니다.' },
        { status: 401 }
      );
    }

    const { verifyToken, isAdmin } = await import('@/lib/auth');
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded || !(await isAdmin(decoded.userId, prisma))) {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json(
        { error: '콘텐츠가 필요합니다.' },
        { status: 400 }
      );
    }

    const pageContent = await prisma.pageContent.upsert({
      where: { page: 'about-major' },
      update: {
        content: content,
        updatedAt: new Date(),
      },
      create: {
        page: 'about-major',
        content: content,
      },
    });

    return NextResponse.json(
      {
        message: '콘텐츠가 성공적으로 저장되었습니다.',
        content: pageContent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('전공 소개 콘텐츠 수정 오류:', error);
    return NextResponse.json(
      { error: '콘텐츠 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

