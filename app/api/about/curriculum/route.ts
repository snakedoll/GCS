import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/about/curriculum - 커리큘럼 콘텐츠 조회
export async function GET(request: NextRequest) {
  try {
    const content = await prisma.pageContent.findUnique({
      where: { page: 'about-curriculum' },
    });

    if (!content) {
      // 기본값 반환 (하드코딩된 내용)
      return NextResponse.json(
        {
          content: {
            courses: [
              {
                code: 'GCS4004-01',
                name: '캡스톤디자인',
                description: [
                  '현장에서 부딪히는 문제 해결 능력을 키우기 위해 기획부터 제작까지 일련의\n과정을 학생들이 직접 수행한다. \n팀 단위로 이루어지며 창의력, 팀워크, 리더십 양성 등을 목표로 한다.',
                ],
              },
              {
                code: 'GCS4006-01',
                name: '4차산업과패키징',
                description: [
                  '유통합리화를 위한 포장물류 개선, 포장 폐기물 환경문제 고려, 전자상거래 활성화를 위한 포장형태 개발 등 패키징 산업과 기술의 전반적인 내용을 학습한다.',
                ],
              },
              {
                code: 'GCS2004-01',
                name: '그래픽커뮤니케이션사이언스입문',
                description: [
                  '기획, 인쇄 원고 디자인, 프리프레스, 프레스(인쇄), 포스트 프레스(후가공) 공정에 의한 인쇄 제품 제작 과정을 배운다.',
                  '리프레스 공정(데이터 입고부터 인쇄 원고의 편집 및 수정, 교정, 제판, 컬러 관리까지의 공정), 프레스(인쇄 기계로 제품을 생산하는 인쇄 공정), 포스트프레스(인쇄 제품의 요구 조건에 맞도록 가공하는 후가공 공정)와 같은 제작 공정에 대한 기본적인 이론을 학습한다.',
                ],
              },
              {
                code: 'GCS2001',
                name: '컬러매니지먼트',
                description: [
                  '컬러 켈리브레이션, 컬러 켈리브레이션의 적용 및 장법, 컬러관리의 입출력장치의 최적화, 품질과의 방법과 데이터 보존에 대해 이해하고, 공정 관리를 학습한다.',
                ],
              },
              {
                code: 'GCS2001',
                name: '4차산업과상업인쇄',
                description: [
                  '본 강의에서는 상업인쇄의 기본 지식(기술, 비지니스 모델, 어플리케이션 등), 상업인쇄 어플리케이션과 브랜드 캠패인, 상업인쇄의 4차산업 혁신(디지털 인쇄, Web to Print, Smart factory) 등을 학습한다.',
                ],
              },
              {
                code: 'GCS4001-01',
                name: '식품포장',
                description: [
                  '식품 포장의 기능, 식품 포장재/포장용기, 포장 식품의 품질변화/유효기간 설정, 식품의 포장공정, 식품 포장설계 등에 관하여 강의한다.',
                ],
              },
              {
                code: 'GCS4002-01',
                name: '식품포장특론',
                description: [
                  '식품 포장재의 물질전달/표면화학, 항균성/항산화성 포장, 가식성 포장, 생분해성 포장, 변형기체 포장, 마이크로웨이브 가열용 포장, 지능형 포장-지시계/센서/RFID-USN 포장유통등에 관하여 강의한다.',
                ],
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
    console.error('커리큘럼 콘텐츠 조회 오류:', error);
    return NextResponse.json(
      { error: '콘텐츠 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// PUT /api/about/curriculum - 커리큘럼 콘텐츠 수정 (관리자만)
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
      where: { page: 'about-curriculum' },
      update: {
        content: content,
        updatedAt: new Date(),
      },
      create: {
        page: 'about-curriculum',
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
    console.error('커리큘럼 콘텐츠 수정 오류:', error);
    return NextResponse.json(
      { error: '콘텐츠 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

