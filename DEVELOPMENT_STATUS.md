# 개발 현황 정리

## 📊 전체 개요

### ✅ 백엔드 API가 구현된 부분

#### 인증 (Auth)
- ✅ `/api/auth/login` - 로그인
- ✅ `/api/auth/register` - 회원가입
- ✅ `/api/auth/find-id` - 아이디 찾기
- ✅ `/api/auth/reset-password` - 비밀번호 재설정
- ✅ `/api/auth/check-nickname` - 닉네임 중복 확인
- ✅ `/api/auth/send-verification` - 이메일 인증번호 전송
- ✅ `/api/auth/verify-code` - 인증번호 확인

#### 사용자 (User)
- ✅ `/api/user/profile` - 사용자 프로필 조회 (알림/좋아요 개수는 하드코딩된 0)
- ✅ `/api/user/profile-image` - 프로필 이미지 업로드/삭제

---

### ❌ 프론트엔드/UI만 구현되고 백엔드 API가 미구현된 부분

#### 쇼핑 (Shop)
- ❌ `/shop` - Fund/Partner up 상품 목록 조회
- ❌ 상품 상세 조회
- ❌ 상품 좋아요/좋아요 취소
- ❌ 상품 필터링 (진행 중/예정/완료)

#### 커뮤니티 (Community)
- ❌ `/community` - Board 게시글 목록 조회
- ❌ `/community` - Lounge 게시글 목록 조회
- ❌ 게시글 작성/수정/삭제
- ❌ 게시글 상세 조회

#### 아카이브 (Archive)
- ❌ `/archive` - Project 목록 조회 (연도/태그 필터링)
- ❌ `/archive` - News 목록 조회
- ❌ 프로젝트/뉴스 상세 조회

#### 마이페이지 (MyPage)
- ❌ `/myPage` - 알림 목록 조회 (알림 개수만 하드코딩)
- ❌ `/myPage` - 좋아요한 상품 목록 (좋아요 개수만 하드코딩)
- ❌ 주문 내역 조회
- ❌ 주문 취소/변경 내역 조회
- ❌ 리뷰 작성
- ❌ 내가 등록한 상품 조회

#### 리뷰 관리
- ❌ `/reviews` - 최근 후기 목록 조회
- ❌ `/reviews` - 상품별 후기 조회
- ❌ 리뷰 통계 (후기 수, 평균 평점, 평점 분포)
- ❌ 리뷰 내보내기

#### 관리자 - 판매 관리
- ❌ `/admin/itemCardManage` - 상품카드 목록 조회/수정/삭제
- ❌ `/admin/itemCardManage` - 상품 공개/비공개 설정
- ❌ `/admin/itemCardManage/itemOrderHistory` - 주문 내역 조회
- ❌ `/allItemManage` - 전체 품목 목록 조회/관리
- ❌ `/registerAskedItem` - 상품 등록 요청 목록 조회/승인/거부
- ❌ `/adjustment` - 정산 내역 조회
- ❌ `/reviews` - 리뷰 관리 (관리자용)

#### 관리자 - 사용자 관리
- ❌ `/admin/memberManage` - 회원 목록 조회/검색/필터링
- ❌ `/admin/memberManage` - 회원 상세 조회
- ❌ `/admin/memberManage` - 판매 권한 부여/취소
- ❌ `/admin/memberManage` - 판매팀 목록 조회/관리
- ❌ `/admin/memberManage` - 판매팀 생성/수정/삭제
- ❌ `/admin/memberManage` - 판매팀 정보 수정 요청 처리

#### 관리자 - 데이터
- ❌ `/admin/data/siteActivity` - 사이트 활동 통계
- ❌ `/admin/data/sales` - 매출 현황
- ❌ `/admin/data/content` - 콘텐츠 통계
- ❌ `/admin/data/users` - 사용자 통계

#### 관리자 - 기타
- ❌ `/admin/alarm` - 알림 관리
- ❌ `/adminLog` - 로그 조회

#### 아카이브 관리
- ❌ `/archiveManage` - Project 목록 조회/수정/삭제
- ❌ `/archiveManage/create` - Project 생성
- ❌ `/archiveManage/createNews` - News 생성
- ❌ `/archiveManage` - Project/News 공개/비공개 설정

#### 설정
- ❌ `/settings` - 회원정보 수정 (이름, 전화번호, 이메일)
- ❌ `/settings` - 판매팀 정보 관리
- ❌ `/settings` - 비밀번호 변경
- ❌ 계정 탈퇴 (프론트엔드에 TODO로 표시됨)

---

## 🗄️ 필요한 DB 스키마 구조

### 현재 존재하는 모델
- ✅ `User` - 사용자
- ✅ `EmailVerification` - 이메일 인증

### 추가 필요 모델

#### 1. 판매팀 관련
- `Team` - 판매팀
- `TeamMember` - 팀 멤버 (다대다 관계)

#### 2. 상품 관련
- `Product` - 상품 (Fund/Partner up)
- `ProductOption` - 상품 옵션
- `ProductOptionValue` - 상품 옵션 값
- `ProductImage` - 상품 이미지
- `ProductTag` - 상품 태그
- `ProductRequest` - 상품 등록 요청

#### 3. 주문 관련
- `Order` - 주문
- `OrderItem` - 주문 항목
- `OrderStatus` - 주문 상태 (enum 또는 별도 모델)

#### 4. 리뷰 관련
- `Review` - 리뷰
- `ReviewImage` - 리뷰 이미지

#### 5. 커뮤니티 관련
- `Post` - 게시글 (Board/Lounge)
- `PostCategory` - 게시글 카테고리
- `Comment` - 댓글 (선택적)

#### 6. 아카이브 관련
- `Project` - 프로젝트
- `News` - 뉴스
- `Tag` - 태그
- `ProjectTag` - 프로젝트-태그 관계 (다대다)

#### 7. 알림 및 좋아요
- `Notification` - 알림
- `Like` - 좋아요 (상품/게시글)

#### 8. 정산 관련
- `Adjustment` - 정산
- `AdjustmentItem` - 정산 항목

#### 9. 기타
- `Inquiry` - 문의
- `AdminLog` - 관리자 로그

---

## 📝 다음 단계

1. DB 스키마 설계 및 Prisma 모델 생성
2. 각 모델 간 관계 설정
3. API 엔드포인트 구현 우선순위 정하기
4. 데이터베이스 마이그레이션 실행
