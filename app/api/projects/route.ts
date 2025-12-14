import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/projects - 프로젝트 목록 조회
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const year = searchParams.get('year');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: any = {
      isPublic: true,
    };

    if (year) {
      const yearNum = parseInt(year);
      if (!isNaN(yearNum)) {
        where.year = yearNum;
      }
    }

    if (category) {
      where.category = category;
    }

    if (tag) {
      where.tags = {
        some: {
          tag: {
            name: tag,
          },
        },
      };
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const total = await prisma.project.count({ where });

    const projectsWithDetails = projects.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      teamName: project.teamName,
      year: project.year,
      category: project.category,
      thumbnail: project.thumbnail,
      viewCount: project.viewCount,
      tags: project.tags.map((pt) => pt.tag.name),
      createdAt: project.createdAt,
    }));

    return NextResponse.json(
      {
        projects: projectsWithDetails,
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
    console.error('프로젝트 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '프로젝트 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
