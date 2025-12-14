import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/user/profile - 사용자 프로필 조회
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

    // 사용자 정보 조회
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        nickname: true,
        name: true,
        phone: true,
        memberType: true,
        studentId: true,
        major: true,
        profileImage: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 알림 개수와 좋아요 개수 조회
    const notificationCount = await prisma.notification.count({
      where: {
        userId: decoded.userId,
        isRead: false,
      },
    });

    const likeCount = await prisma.like.count({
      where: {
        userId: decoded.userId,
        productId: { not: null },
      },
    });

    return NextResponse.json(
      {
        user,
        notificationCount,
        likeCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('프로필 조회 오류:', error);
    return NextResponse.json(
      { error: '프로필 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// PATCH /api/user/profile - 프로필 정보 수정
export async function PATCH(request: NextRequest) {
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
    const { nickname, name, phone } = body;

    const updateData: any = {};

    if (nickname) {
      // 닉네임 중복 확인
      const existingUser = await prisma.user.findUnique({
        where: { nickname },
      });

      if (existingUser && existingUser.id !== decoded.userId) {
        return NextResponse.json(
          { error: '이미 사용 중인 닉네임입니다.' },
          { status: 409 }
        );
      }
      updateData.nickname = nickname;
    }

    if (name) {
      updateData.name = name;
    }

    if (phone) {
      updateData.phone = phone;
    }

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        nickname: true,
        name: true,
        phone: true,
        memberType: true,
        studentId: true,
        major: true,
        profileImage: true,
        emailVerified: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        message: '프로필 정보가 수정되었습니다.',
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('프로필 수정 오류:', error);
    return NextResponse.json(
      { error: '프로필 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
