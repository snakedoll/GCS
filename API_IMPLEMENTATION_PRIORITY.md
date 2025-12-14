# API 구현 우선순위

## 우선순위별 구현 계획

### 🥇 Priority 1: 핵심 비즈니스 로직 (쇼핑 플랫폼의 기반)

#### 1.1 상품 관련 (Product)
- ✅ GET `/api/products` - 상품 목록 조회 (Fund/Partner up, 필터링)
- ✅ GET `/api/products/[id]` - 상품 상세 조회
- ✅ POST `/api/products/[id]/like` - 상품 좋아요
- ✅ DELETE `/api/products/[id]/like` - 상품 좋아요 취소
- ✅ GET `/api/products/[id]/like` - 상품 좋아요 여부 확인

**이유**: 사용자가 가장 먼저 접하는 핵심 기능

---

### 🥈 Priority 2: 주문 및 결제

#### 2.1 주문 (Order)
- ✅ POST `/api/orders` - 주문 생성
- ✅ GET `/api/orders` - 주문 목록 조회 (사용자별)
- ✅ GET `/api/orders/[id]` - 주문 상세 조회
- ✅ PATCH `/api/orders/[id]/cancel` - 주문 취소

**이유**: 쇼핑 플랫폼의 핵심 트랜잭션

---

### 🥉 Priority 3: 리뷰

#### 3.1 리뷰 (Review)
- ✅ POST `/api/reviews` - 리뷰 작성
- ✅ GET `/api/reviews` - 리뷰 목록 조회 (상품별 또는 최근)
- ✅ GET `/api/reviews/stats` - 리뷰 통계 (평균 평점, 분포 등)
- ✅ DELETE `/api/reviews/[id]` - 리뷰 삭제

**이유**: 주문 후 기능, 상품 신뢰도에 중요

---

### 4️⃣ Priority 4: 커뮤니티

#### 4.1 게시글 (Post)
- ✅ GET `/api/posts` - 게시글 목록 조회 (Board/Lounge)
- ✅ POST `/api/posts` - 게시글 작성
- ✅ GET `/api/posts/[id]` - 게시글 상세 조회
- ✅ PATCH `/api/posts/[id]` - 게시글 수정
- ✅ DELETE `/api/posts/[id]` - 게시글 삭제
- ✅ POST `/api/posts/[id]/like` - 게시글 좋아요

**이유**: 독립적인 기능, 사용자 참여 유도

---

### 5️⃣ Priority 5: 아카이브

#### 5.1 프로젝트 (Project)
- ✅ GET `/api/projects` - 프로젝트 목록 조회 (연도/태그 필터링)
- ✅ GET `/api/projects/[id]` - 프로젝트 상세 조회
- ✅ GET `/api/tags` - 태그 목록 조회

#### 5.2 뉴스 (News)
- ✅ GET `/api/news` - 뉴스 목록 조회
- ✅ GET `/api/news/[id]` - 뉴스 상세 조회

**이유**: 정보 제공 기능, 비교적 독립적

---

### 6️⃣ Priority 6: 사용자 기능 확장

#### 6.1 알림 (Notification)
- ✅ GET `/api/notifications` - 알림 목록 조회
- ✅ PATCH `/api/notifications/[id]/read` - 알림 읽음 처리
- ✅ PATCH `/api/notifications/read-all` - 모든 알림 읽음 처리

#### 6.2 마이페이지
- ✅ GET `/api/user/orders` - 내 주문 내역
- ✅ GET `/api/user/products` - 내가 등록한 상품
- ✅ GET `/api/user/likes` - 좋아요한 상품 목록
- ✅ PATCH `/api/user/profile` - 프로필 정보 수정

#### 6.3 설정
- ✅ PATCH `/api/user/password` - 비밀번호 변경
- ✅ DELETE `/api/user/account` - 계정 탈퇴

**이유**: 사용자 경험 개선

---

### 7️⃣ Priority 7: 판매팀 관리

#### 7.1 판매팀 (Team)
- ✅ GET `/api/teams` - 판매팀 목록 조회
- ✅ POST `/api/teams` - 판매팀 생성
- ✅ GET `/api/teams/[id]` - 판매팀 상세 조회
- ✅ PATCH `/api/teams/[id]` - 판매팀 정보 수정
- ✅ POST `/api/teams/[id]/members` - 팀 멤버 추가
- ✅ DELETE `/api/teams/[id]/members/[userId]` - 팀 멤버 제거

**이유**: 상품 등록 전 필요한 기능

---

### 8️⃣ Priority 8: 관리자 - 판매 관리

#### 8.1 상품 관리
- ✅ GET `/api/admin/products` - 전체 상품 목록 (관리자용)
- ✅ PATCH `/api/admin/products/[id]` - 상품 정보 수정
- ✅ PATCH `/api/admin/products/[id]/visibility` - 상품 공개/비공개
- ✅ DELETE `/api/admin/products/[id]` - 상품 삭제
- ✅ GET `/api/admin/products/[id]/orders` - 상품별 주문 내역

#### 8.2 상품 등록 요청
- ✅ GET `/api/admin/product-requests` - 상품 등록 요청 목록
- ✅ PATCH `/api/admin/product-requests/[id]/approve` - 요청 승인
- ✅ PATCH `/api/admin/product-requests/[id]/reject` - 요청 거부

#### 8.3 전체 품목 관리
- ✅ GET `/api/admin/items` - 전체 품목 목록
- ✅ GET `/api/admin/items/export` - 품목 내보내기

#### 8.4 정산
- ✅ GET `/api/admin/adjustments` - 정산 내역 조회
- ✅ POST `/api/admin/adjustments` - 정산 생성
- ✅ GET `/api/admin/adjustments/stats` - 정산 통계

#### 8.5 리뷰 관리
- ✅ GET `/api/admin/reviews` - 전체 리뷰 목록
- ✅ DELETE `/api/admin/reviews/[id]` - 리뷰 삭제

**이유**: 관리자 전용, 일반 사용자 기능 이후

---

### 9️⃣ Priority 9: 관리자 - 사용자 관리

#### 9.1 회원 관리
- ✅ GET `/api/admin/users` - 회원 목록 조회 (검색/필터링)
- ✅ GET `/api/admin/users/[id]` - 회원 상세 조회
- ✅ PATCH `/api/admin/users/[id]/role` - 회원 권한 변경

#### 9.2 판매팀 관리 (관리자용)
- ✅ GET `/api/admin/teams` - 전체 판매팀 목록
- ✅ PATCH `/api/admin/teams/[id]` - 판매팀 정보 수정
- ✅ PATCH `/api/admin/team-requests` - 판매팀 정보 수정 요청 처리

**이유**: 관리자 전용

---

### 🔟 Priority 10: 관리자 - 데이터 및 통계

#### 10.1 통계 API
- ✅ GET `/api/admin/statistics/site-activity` - 사이트 활동 통계
- ✅ GET `/api/admin/statistics/sales` - 매출 현황
- ✅ GET `/api/admin/statistics/content` - 콘텐츠 통계
- ✅ GET `/api/admin/statistics/users` - 사용자 통계

#### 10.2 알림 관리
- ✅ GET `/api/admin/notifications` - 알림 관리
- ✅ POST `/api/admin/notifications` - 알림 생성

#### 10.3 로그
- ✅ GET `/api/admin/logs` - 관리자 로그 조회

**이유**: 관리자 전용, 최우선순위 아님

---

### 1️⃣1️⃣ Priority 11: 아카이브 관리 (관리자)

#### 11.1 프로젝트 관리
- ✅ GET `/api/admin/projects` - 프로젝트 목록 (관리자용)
- ✅ POST `/api/admin/projects` - 프로젝트 생성
- ✅ PATCH `/api/admin/projects/[id]` - 프로젝트 수정
- ✅ DELETE `/api/admin/projects/[id]` - 프로젝트 삭제
- ✅ PATCH `/api/admin/projects/[id]/visibility` - 프로젝트 공개/비공개

#### 11.2 뉴스 관리
- ✅ GET `/api/admin/news` - 뉴스 목록 (관리자용)
- ✅ POST `/api/admin/news` - 뉴스 생성
- ✅ PATCH `/api/admin/news/[id]` - 뉴스 수정
- ✅ DELETE `/api/admin/news/[id]` - 뉴스 삭제
- ✅ PATCH `/api/admin/news/[id]/visibility` - 뉴스 공개/비공개

**이유**: 관리자 전용, 콘텐츠 관리

---

## 구현 순서 요약

1. **상품 관련 API** (Priority 1) ⭐
2. **주문 관련 API** (Priority 2)
3. **리뷰 관련 API** (Priority 3)
4. **커뮤니티 API** (Priority 4)
5. **아카이브 API** (Priority 5)
6. **사용자 기능 확장** (Priority 6)
7. **판매팀 관리** (Priority 7)
8. **관리자 기능** (Priority 8-11)
