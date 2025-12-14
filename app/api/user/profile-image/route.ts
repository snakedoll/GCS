import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    // Authorization 헤더에서 토큰 추출
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

    // FormData에서 이미지 파일 추출
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: '이미지 파일이 필요합니다.' },
        { status: 400 }
      );
    }

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: '이미지 파일만 업로드 가능합니다.' },
        { status: 400 }
      );
    }

    // 파일 크기 제한 (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: '파일 크기는 5MB 이하여야 합니다.' },
        { status: 400 }
      );
    }

    // 파일을 바이트 배열로 변환
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 파일명 생성 (userId_timestamp.확장자)
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const fileName = `${decoded.userId}_${Date.now()}.${fileExtension}`;
    
    // 업로드 디렉토리 생성
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'profiles');
    await mkdir(uploadDir, { recursive: true });

    // 파일 저장
    const filePath = join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // 파일 URL 생성
    const fileUrl = `/uploads/profiles/${fileName}`;

    // DB에 프로필 이미지 URL 저장
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { profileImage: fileUrl },
    });

    return NextResponse.json(
      {
        message: '프로필 이미지가 업로드되었습니다.',
        imageUrl: fileUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('프로필 이미지 업로드 오류:', error);
    return NextResponse.json(
      { error: '프로필 이미지 업로드 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Authorization 헤더에서 토큰 추출
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

    // DB에서 프로필 이미지 URL을 null로 업데이트
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { profileImage: null },
    });

    return NextResponse.json(
      {
        message: '프로필 이미지가 삭제되었습니다.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('프로필 이미지 삭제 오류:', error);
    return NextResponse.json(
      { error: '프로필 이미지 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

