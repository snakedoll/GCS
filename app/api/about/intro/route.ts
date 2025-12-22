import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/about/intro - 사이트 소개 콘텐츠 조회
export async function GET(request: NextRequest) {
  try {
    const content = await prisma.pageContent.findUnique({
      where: { page: 'about-intro' },
    });

    if (!content) {
      // 기본값 반환 (하드코딩된 내용)
      return NextResponse.json(
        {
          content: {
            images: [
              "https://www.figma.com/api/mcp/asset/79e90af8-a27c-4843-996e-895cf1154bb2",
              "https://www.figma.com/api/mcp/asset/474085da-a210-432b-a0f0-8d33e28c5117",
              "https://www.figma.com/api/mcp/asset/0f23b4cb-34b0-4ff6-8a97-916d3c1b0bd1",
              "https://www.figma.com/api/mcp/asset/5bcdec21-6c2d-4241-9649-2449561d1696",
            ],
            korean: {
              paragraph1: {
                text1: 'GCS:Web은 ',
                bold: '동국대학교 연계전공 GCS',
                text2: '의 활동 기록을 공유하고,\n학생들이 직접 기획·제작한 결과물을 소개하는 이커머스',
                text3: '형',
                text4: ' 매거진',
              },
              paragraph2: '입니다.',
              paragraph3: '',
              paragraph4: '이곳은 전공 내에서 이루어지는 프로젝트, 내부 행사 등을 아카이빙하며, 후속 학생들이 창작을 발전시키고 확장해나갈 수 있는 지속 가능한 전공 커뮤니티를 지향합니다.',
            },
            english: {
              paragraph1: {
                text1: 'GCS:Web is an e-commerce magazine that shares the activities of ',
                bold: 'Dongguk University Interdepartmental major GCS',
                text2: ', and shows student-led produced products.',
              },
              paragraph2: '',
              paragraph3: 'GCS:Web includes an archive of projects, and events in our major, so that we aim for a sustainable community where students can develop and expand their creativity.',
            },
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
    console.error('사이트 소개 콘텐츠 조회 오류:', error);
    return NextResponse.json(
      { error: '콘텐츠 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// PUT /api/about/intro - 사이트 소개 콘텐츠 수정 (관리자만)
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
      where: { page: 'about-intro' },
      update: {
        content: content,
        updatedAt: new Date(),
      },
      create: {
        page: 'about-intro',
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
    console.error('사이트 소개 콘텐츠 수정 오류:', error);
    return NextResponse.json(
      { error: '콘텐츠 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

