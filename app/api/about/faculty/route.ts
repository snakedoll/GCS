import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/about/faculty - 교수진 소개 콘텐츠 조회
export async function GET(request: NextRequest) {
  try {
    const content = await prisma.pageContent.findUnique({
      where: { page: 'about-faculty' },
    });

    if (!content) {
      // 기본값 반환 (하드코딩된 내용)
      return NextResponse.json(
        {
          content: {
            title: '교수진',
            professors: [
              {
                name: '김승용 교수',
                positions: [
                  '동국대학교 경영대학 GCS연계전공 주임교수',
                  '동국대학교 경영대학 경영학부 부교수',
                ],
                imageUrl: 'https://www.figma.com/api/mcp/asset/d09f99b9-ad7e-41f2-b754-23b9e3575314',
                imageClassName: 'absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full',
                alignment: 'right', // left 또는 right
                courses: null,
                hasLine: false,
              },
              {
                name: '정구혁 교수',
                positions: [
                  '동국대학교 경영대학 GCS연계전공 주임교수',
                  '동국대학교 경영대학 경영학부 부교수',
                ],
                imageUrl: 'https://www.figma.com/api/mcp/asset/a1c9712f-38f8-4b61-a877-9f944b81da16',
                imageClassName: 'absolute h-[108.76%] left-0 max-w-none top-[-1.09%] w-full object-cover',
                alignment: 'right',
                courses: null,
                hasLine: false,
              },
              {
                name: '김봉구 교수',
                positions: [
                  '동국대학교 경영대학 GCS연계전공 대우교수',
                  '프린팅플랫폼(주) 대표이사',
                ],
                imageUrl: 'https://www.figma.com/api/mcp/asset/46f2584f-1c5b-4e03-9448-d7fbf4cfb0f9',
                imageClassName: 'absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full',
                alignment: 'left',
                courses: [
                  '그래픽커뮤니케이션사이언스입문',
                  '캡스톤디자인',
                  '4차상업과 상업인쇄',
                ],
                hasLine: true,
                lineImageUrl: 'https://www.figma.com/api/mcp/asset/10d9eb69-a6a0-4b51-b3ee-94e717e9455e',
              },
              {
                name: '김병수 교수',
                positions: [
                  '동국대학교 경영대학 GCS연계전공 대우교수',
                  'HP Asia Pacific Graphic Industrial Strategic Biz 상무',
                ],
                imageUrl: 'https://www.figma.com/api/mcp/asset/b871f367-416f-4d15-8029-4e17fce4e764',
                imageClassName: 'absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full',
                alignment: 'right',
                courses: [
                  '4차산업과 패키징',
                ],
                hasLine: true,
                lineImageUrl: 'https://www.figma.com/api/mcp/asset/10d9eb69-a6a0-4b51-b3ee-94e717e9455e',
              },
              {
                name: '김정욱 교수',
                positions: [
                  '동국대학교 경영대학 GCS연계전공 대우교수',
                  '콘타그림 대표',
                ],
                imageUrl: 'https://www.figma.com/api/mcp/asset/50ea2103-a056-4842-99e9-bbd80d625ea3',
                imageClassName: 'absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full',
                alignment: 'right',
                courses: [
                  '컬러매니지먼트와 디자인',
                ],
                hasLine: true,
                lineImageUrl: 'https://www.figma.com/api/mcp/asset/10d9eb69-a6a0-4b51-b3ee-94e717e9455e',
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
    console.error('교수진 소개 콘텐츠 조회 오류:', error);
    return NextResponse.json(
      { error: '콘텐츠 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// PUT /api/about/faculty - 교수진 소개 콘텐츠 수정 (관리자만)
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
      where: { page: 'about-faculty' },
      update: {
        content: content,
        updatedAt: new Date(),
      },
      create: {
        page: 'about-faculty',
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
    console.error('교수진 소개 콘텐츠 수정 오류:', error);
    return NextResponse.json(
      { error: '콘텐츠 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

