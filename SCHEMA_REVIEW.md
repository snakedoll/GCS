# Prisma 스키마 검토 및 최종 정리

## ✅ 스키마 검토 완료

### 검토 사항
1. ✅ 모든 관계가 올바르게 정의됨
2. ✅ 외래키 제약조건이 적절히 설정됨 (Cascade/SetNull)
3. ✅ 인덱스가 필요한 필드에 추가됨
4. ✅ Unique 제약조건이 필요한 필드에 적용됨
5. ✅ 린터 오류 없음

### 추가된 모델 총 개수
- 총 **27개** 모델 추가
- 기존 2개 모델 (User, EmailVerification) 확장

## 📊 추가된 모델 목록

### 판매팀 관련 (3개)
1. `Team` - 판매팀
2. `TeamMember` - 팀 멤버
3. `TeamRequest` - 팀 정보 수정 요청

### 상품 관련 (6개)
4. `Product` - 상품
5. `ProductOption` - 상품 옵션
6. `ProductOptionValue` - 상품 옵션 값
7. `ProductImage` - 상품 이미지
8. `ProductTag` - 상품 태그
9. `ProductRequest` - 상품 등록 요청

### 주문 관련 (2개)
10. `Order` - 주문
11. `OrderItem` - 주문 항목

### 리뷰 관련 (2개)
12. `Review` - 리뷰
13. `ReviewImage` - 리뷰 이미지

### 커뮤니티 관련 (1개)
14. `Post` - 게시글

### 아카이브 관련 (4개)
15. `Project` - 프로젝트
16. `News` - 뉴스
17. `Tag` - 태그
18. `ProjectTag` - 프로젝트-태그 관계

### 알림 및 좋아요 (2개)
19. `Notification` - 알림
20. `Like` - 좋아요

### 정산 관련 (2개)
21. `Adjustment` - 정산
22. `AdjustmentItem` - 정산 항목

### 기타 (2개)
23. `Inquiry` - 문의
24. `AdminLog` - 관리자 로그

## 🔗 주요 관계

### User 모델 확장
- `teamMemberships` - 팀 멤버십 (다대다)
- `teams` - 대표로 있는 팀들
- `orders` - 주문 내역
- `reviews` - 작성한 리뷰
- `posts` - 작성한 게시글
- `likes` - 좋아요
- `notifications` - 알림
- `inquiries` - 문의
- `adminLogs` - 관리자 로그

### 핵심 비즈니스 로직 관계
- **Team → Product** - 팀이 등록한 상품들
- **Product → OrderItem** - 상품의 주문 내역
- **Order → OrderItem** - 주문의 항목들
- **Product → Review** - 상품의 리뷰들
- **Product → Like** - 상품에 대한 좋아요
- **Team → Adjustment** - 팀의 정산 내역

## ⚠️ 주의사항

### 1. 데이터 무결성
- 대부분의 관계에서 `onDelete: Cascade`를 사용하여 데이터 일관성 유지
- User 관련 일부 관계는 `onDelete: SetNull` 사용 (Inquiry 등)

### 2. 성능 최적화
- 자주 조회되는 필드에 인덱스 추가:
  - 외래키 필드
  - 상태 필드 (status)
  - 날짜 필드 (createdAt, periodStart 등)
  - 검색 필드 (name, email 등)

### 3. 타입 안정성
- 현재는 문자열로 정의된 상태값들 (예: "pending", "active")
- 향후 Prisma Enum을 사용하여 타입 안정성 향상 가능

### 4. JSON 필드 사용
- 복잡한 구조의 데이터는 JSON 타입 사용:
  - `TeamRequest.changes` - 변경사항
  - `ProductRequest.requestData` - 요청 데이터
  - `OrderItem.optionData` - 선택한 옵션 정보
  - `AdminLog.details` - 상세 정보

## 📝 다음 단계

### 1. 마이그레이션 실행
```bash
npm run db:migrate
# 또는
npx prisma migrate dev --name add_all_models
```

### 2. Prisma Client 재생성
```bash
npm run db:generate
# 또는
npx prisma generate
```

### 3. 데이터베이스 확인
```bash
npm run db:studio
# 또는
npx prisma studio
```

### 4. API 구현 우선순위
1. **상품 관련 API** (Product, ProductOption 등)
2. **주문 관련 API** (Order, OrderItem)
3. **리뷰 관련 API** (Review)
4. **커뮤니티 API** (Post)
5. **아카이브 API** (Project, News)
6. **관리자 API** (AdminLog, 통계 등)

## 🎯 스키마 개선 제안

### 향후 고려사항
1. **Enum 타입 사용**
   - 상태값들을 Enum으로 변환하여 타입 안정성 향상
   - 예: `OrderStatus`, `ProductStatus`, `TeamStatus` 등

2. **Soft Delete**
   - 중요한 데이터의 경우 `deletedAt` 필드 추가 고려
   - 예: `User`, `Product`, `Order` 등

3. **Audit Trail**
   - 중요한 데이터 변경 이력 추적을 위한 별도 모델 고려

4. **파일 관리**
   - 이미지 업로드 시 S3 등 외부 스토리지 사용 고려
   - 현재는 로컬 파일 시스템 사용 중

5. **검색 최적화**
   - 전문 검색을 위한 Full-text Search 인덱스 고려
   - 예: `Product.name`, `Post.title` 등
