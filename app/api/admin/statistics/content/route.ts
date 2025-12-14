import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, isAdmin } from '@/lib/auth';

// GET /api/admin/statistics/content - 콘텐츠 통계
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

    if (!decoded || !(await isAdmin(decoded.userId, prisma))) {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    // 프로젝트 통계
    const totalProjects = await prisma.project.count();
    const publicProjects = await prisma.project.count({ where: { isPublic: true } });

    // 뉴스 통계
    const totalNews = await prisma.news.count();
    const publicNews = await prisma.news.count({ where: { isPublic: true } });
    const headlineNews = await prisma.news.count({ where: { isHeadline: true } });

    // 게시글 통계
    const totalPosts = await prisma.post.count();
    const boardPosts = await prisma.post.count({ where: { category: 'board' } });
    const loungePosts = await prisma.post.count({ where: { category: 'lounge' } });

    // 상품 통계
    const totalProducts = await prisma.product.count();
    const fundProducts = await prisma.product.count({ where: { type: 'fund' } });
    const partnerProducts = await prisma.product.count({ where: { type: 'partner' } });

    // 리뷰 통계
    const totalReviews = await prisma.review.count();
    const averageRating = await prisma.review.aggregate({
      _avg: {
        rating: true,
      },
    });

    return NextResponse.json(
      {
        statistics: {
          projects: {
            total: totalProjects,
            public: publicProjects,
            private: totalProjects - publicProjects,
          },
          news: {
            total: totalNews,
            public: publicNews,
            private: totalNews - publicNews,
            headlines: headlineNews,
          },
          posts: {
            total: totalPosts,
            board: boardPosts,
            lounge: loungePosts,
          },
          products: {
            total: totalProducts,
            fund: fundProducts,
            partner: partnerProducts,
          },
          reviews: {
            total: totalReviews,
            averageRating: Math.round((averageRating._avg.rating || 0) * 10) / 10,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('콘텐츠 통계 조회 오류:', error);
    return NextResponse.json(
      { error: '콘텐츠 통계 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
