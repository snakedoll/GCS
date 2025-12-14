# DB 스키마 설계 문서

## 📋 스키마 구조 개요

### 현재 존재하는 모델
- `User` - 사용자 기본 정보
- `EmailVerification` - 이메일 인증

### 추가 예정 모델

## 1. 판매팀 관련 (Team Management)

### Team (판매팀)
```prisma
model Team {
  id            String        @id @default(cuid())
  name          String        @unique  // 팀명
  representativeId String      // 대표자 User ID
  representative User         @relation("TeamRepresentative", fields: [representativeId], references: [id])
  bankName      String?       // 정산 계좌 은행명
  accountNumber String?       // 정산 계좌 번호
  accountHolder String?       // 정산 계좌 예금주
  totalSales    Int           @default(0)  // 총 판매액
  isActive      Boolean       @default(true)  // 활성 여부
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  
  members       TeamMember[]  // 팀 멤버들
  products      Product[]     // 등록한 상품들
  adjustments   Adjustment[]  // 정산 내역
  requests      TeamRequest[] // 팀 정보 수정 요청
}
```

### TeamMember (팀 멤버)
```prisma
model TeamMember {
  id        String   @id @default(cuid())
  teamId    String
  userId    String
  role      String   @default("member")  // "leader" | "member"
  createdAt DateTime @default(now())
  
  team      Team     @relation(fields: [teamId], references: [id], onDelete: Cascade)
  user      User     @relation("TeamMemberships", fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([teamId, userId])
  @@index([teamId])
  @@index([userId])
}
```

### TeamRequest (팀 정보 수정 요청)
```prisma
model TeamRequest {
  id            String   @id @default(cuid())
  teamId        String
  requestedBy   String   // 요청한 사용자 ID
  status        String   @default("pending")  // "pending" | "approved" | "rejected"
  changes       Json?    // 변경 사항 (JSON)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  team          Team     @relation(fields: [teamId], references: [id], onDelete: Cascade)
  
  @@index([teamId])
  @@index([status])
}
```

## 2. 상품 관련 (Product Management)

### Product (상품)
```prisma
model Product {
  id              String            @id @default(cuid())
  name            String            // 상품명
  description     String?           // 상품 설명
  type            String            // "fund" | "partner"
  status          String            @default("pending")  // "pending" | "active" | "completed" | "soldout"
  teamId          String            // 판매팀 ID
  goalAmount      Int?              // 목표 금액 (Fund만)
  currentAmount   Int               @default(0)  // 현재 모금 금액 (Fund만)
  startDate       DateTime?         // 펀딩 시작일
  endDate         DateTime?         // 펀딩 종료일
  receiveMethod   String?           // 수령 방식
  isPublic        Boolean           @default(false)  // 공개 여부
  viewCount       Int               @default(0)  // 조회수
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  
  team            Team              @relation(fields: [teamId], references: [id])
  options         ProductOption[]   // 상품 옵션들
  images          ProductImage[]    // 상품 이미지들
  tags            ProductTag[]      // 상품 태그들
  orderItems      OrderItem[]       // 주문 항목들
  reviews         Review[]          // 리뷰들
  likes           Like[]            @relation("ProductLikes")
  request         ProductRequest?   // 등록 요청 정보
  
  @@index([teamId])
  @@index([type])
  @@index([status])
  @@index([isPublic])
}
```

### ProductOption (상품 옵션)
```prisma
model ProductOption {
  id          String              @id @default(cuid())
  productId   String
  name        String              // 옵션명 (예: "색상", "사이즈")
  values      ProductOptionValue[] // 옵션 값들
  
  product     Product             @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  @@index([productId])
}
```

### ProductOptionValue (상품 옵션 값)
```prisma
model ProductOptionValue {
  id          String   @id @default(cuid())
  optionId    String
  value       String   // 옵션 값 (예: "빨강", "M")
  price       Int?     // 추가 가격 (옵션에 따라 가격이 다른 경우)
  stock       Int?     // 재고 (Partner up만)
  
  option      ProductOption @relation(fields: [optionId], references: [id], onDelete: Cascade)
  
  @@index([optionId])
}
```

### ProductImage (상품 이미지)
```prisma
model ProductImage {
  id          String   @id @default(cuid())
  productId   String
  url         String   // 이미지 URL
  order       Int      @default(0)  // 이미지 순서
  createdAt   DateTime @default(now())
  
  product     Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  @@index([productId])
}
```

### ProductTag (상품 태그)
```prisma
model ProductTag {
  id        String   @id @default(cuid())
  productId String
  tag       String   // 태그명
  
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  @@index([productId])
  @@index([tag])
}
```

### ProductRequest (상품 등록 요청)
```prisma
model ProductRequest {
  id            String   @id @default(cuid())
  productId     String   @unique
  requestedBy   String   // 요청한 사용자 ID
  status        String   @default("pending")  // "pending" | "approved" | "rejected"
  requestData   Json     // 요청 데이터 (상품 정보)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  product       Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  @@index([status])
  @@index([requestedBy])
}
```

## 3. 주문 관련 (Order Management)

### Order (주문)
```prisma
model Order {
  id              String      @id @default(cuid())
  userId          String      // 주문자
  status          String      @default("pending")  // "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  totalAmount     Int         // 총 주문 금액
  shippingAddress String?     // 배송지
  shippingName    String?     // 수령인 이름
  shippingPhone   String?     // 수령인 전화번호
  memo            String?     // 주문 메모
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  
  user            User        @relation("Orders", fields: [userId], references: [id])
  items           OrderItem[] // 주문 항목들
  
  @@index([userId])
  @@index([status])
  @@index([createdAt])
}
```

### OrderItem (주문 항목)
```prisma
model OrderItem {
  id          String   @id @default(cuid())
  orderId     String
  productId   String
  quantity    Int      // 수량
  price       Int      // 주문 당시 가격
  optionData  Json?    // 선택한 옵션 정보 (JSON)
  createdAt   DateTime @default(now())
  
  order       Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product     Product  @relation(fields: [productId], references: [id])
  
  @@index([orderId])
  @@index([productId])
}
```

## 4. 리뷰 관련 (Review Management)

### Review (리뷰)
```prisma
model Review {
  id          String        @id @default(cuid())
  userId      String        // 작성자
  productId   String        // 상품
  orderId     String?       // 주문 (선택적)
  rating      Int           // 평점 (1-5)
  content     String        // 리뷰 내용
  images      ReviewImage[] // 리뷰 이미지들
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  
  user        User          @relation("Reviews", fields: [userId], references: [id])
  product     Product       @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([productId])
  @@index([rating])
  @@index([createdAt])
}
```

### ReviewImage (리뷰 이미지)
```prisma
model ReviewImage {
  id        String   @id @default(cuid())
  reviewId  String
  url       String   // 이미지 URL
  order     Int      @default(0)
  createdAt DateTime @default(now())
  
  review    Review   @relation(fields: [reviewId], references: [id], onDelete: Cascade)
  
  @@index([reviewId])
}
```

## 5. 커뮤니티 관련 (Community)

### Post (게시글)
```prisma
model Post {
  id          String    @id @default(cuid())
  userId      String    // 작성자
  category    String    // "board" | "lounge"
  title       String    // 제목
  subtitle    String?   // 부제목
  content     String?   // 내용
  thumbnail   String?   // 썸네일 이미지 URL
  viewCount   Int       @default(0)  // 조회수
  isPublic    Boolean   @default(true)  // 공개 여부
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  user        User      @relation("Posts", fields: [userId], references: [id])
  likes       Like[]    @relation("PostLikes")
  
  @@index([userId])
  @@index([category])
  @@index([isPublic])
  @@index([createdAt])
}
```

## 6. 아카이브 관련 (Archive)

### Project (프로젝트)
```prisma
model Project {
  id          String       @id @default(cuid())
  title       String       // 제목
  description String?      // 설명
  teamName    String?      // 팀명
  year        Int          // 연도
  category    String?      // 카테고리 (예: "겨울공모전", "여름공모전", "캡스톤디자인")
  thumbnail   String?      // 썸네일 이미지 URL
  content     String?      // 프로젝트 내용
  viewCount   Int          @default(0)  // 조회수
  isPublic    Boolean      @default(true)  // 공개 여부
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  
  tags        ProjectTag[] // 프로젝트 태그들
  
  @@index([year])
  @@index([category])
  @@index([isPublic])
  @@index([createdAt])
}
```

### News (뉴스)
```prisma
model News {
  id          String    @id @default(cuid())
  title       String    // 제목
  content     String?   // 내용
  link        String?   // 외부 링크
  year        Int       // 연도
  isHeadline  Boolean   @default(false)  // 헤드라인 여부
  isPublic    Boolean   @default(true)  // 공개 여부
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  @@index([year])
  @@index([isHeadline])
  @@index([isPublic])
  @@index([createdAt])
}
```

### Tag (태그)
```prisma
model Tag {
  id        String       @id @default(cuid())
  name      String       @unique  // 태그명
  projects  ProjectTag[] // 태그가 적용된 프로젝트들
  
  @@index([name])
}
```

### ProjectTag (프로젝트-태그 관계)
```prisma
model ProjectTag {
  id        String   @id @default(cuid())
  projectId String
  tagId     String
  
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  tag       Tag      @relation(fields: [tagId], references: [id], onDelete: Cascade)
  
  @@unique([projectId, tagId])
  @@index([projectId])
  @@index([tagId])
}
```

## 7. 알림 및 좋아요 (Notification & Like)

### Notification (알림)
```prisma
model Notification {
  id        String   @id @default(cuid())
  userId    String   // 수신자
  type      String   // 알림 타입 (예: "order", "review", "team_request")
  title     String   // 알림 제목
  content   String?  // 알림 내용
  link      String?  // 관련 링크
  isRead    Boolean  @default(false)  // 읽음 여부
  createdAt DateTime @default(now())
  
  user      User     @relation("Notifications", fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([isRead])
  @@index([createdAt])
}
```

### Like (좋아요)
```prisma
model Like {
  id        String   @id @default(cuid())
  userId    String   // 좋아요한 사용자
  productId String?  // 좋아요한 상품
  postId    String?  // 좋아요한 게시글
  createdAt DateTime @default(now())
  
  user      User     @relation("Likes", fields: [userId], references: [id], onDelete: Cascade)
  product   Product? @relation("ProductLikes", fields: [productId], references: [id], onDelete: Cascade)
  post      Post?    @relation("PostLikes", fields: [postId], references: [id], onDelete: Cascade)
  
  @@unique([userId, productId])
  @@unique([userId, postId])
  @@index([userId])
  @@index([productId])
  @@index([postId])
}
```

## 8. 정산 관련 (Adjustment)

### Adjustment (정산)
```prisma
model Adjustment {
  id            String           @id @default(cuid())
  teamId        String           // 정산 대상 팀
  periodStart   DateTime         // 정산 기간 시작
  periodEnd     DateTime         // 정산 기간 종료
  totalAmount   Int              // 정산 금액
  status        String           @default("pending")  // "pending" | "completed" | "cancelled"
  paidAt        DateTime?        // 지급일
  memo          String?          // 메모
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt
  
  team          Team             @relation(fields: [teamId], references: [id])
  items         AdjustmentItem[] // 정산 항목들
  
  @@index([teamId])
  @@index([status])
  @@index([periodStart, periodEnd])
}
```

### AdjustmentItem (정산 항목)
```prisma
model AdjustmentItem {
  id            String     @id @default(cuid())
  adjustmentId  String
  orderId       String?    // 관련 주문
  productId     String?    // 관련 상품
  amount        Int        // 정산 금액
  description   String?    // 설명
  createdAt     DateTime   @default(now())
  
  adjustment    Adjustment @relation(fields: [adjustmentId], references: [id], onDelete: Cascade)
  
  @@index([adjustmentId])
  @@index([orderId])
  @@index([productId])
}
```

## 9. 기타 (Others)

### Inquiry (문의)
```prisma
model Inquiry {
  id          String   @id @default(cuid())
  userId      String?  // 문의한 사용자 (비회원도 가능)
  type        String   // 문의 타입
  title       String   // 제목
  content     String   // 내용
  email       String?  // 이메일 (비회원인 경우)
  phone       String?  // 전화번호
  status      String   @default("pending")  // "pending" | "answered" | "closed"
  answer      String?  // 답변
  answeredAt  DateTime?  // 답변일
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user        User?    @relation("Inquiries", fields: [userId], references: [id], onDelete: SetNull)
  
  @@index([userId])
  @@index([status])
  @@index([createdAt])
}
```

### AdminLog (관리자 로그)
```prisma
model AdminLog {
  id          String   @id @default(cuid())
  adminId     String   // 관리자 ID
  action      String   // 액션 타입
  targetType  String?  // 대상 타입 (예: "user", "product", "order")
  targetId    String?  // 대상 ID
  details     Json?    // 상세 정보
  ipAddress   String?  // IP 주소
  createdAt   DateTime @default(now())
  
  admin       User     @relation("AdminLogs", fields: [adminId], references: [id])
  
  @@index([adminId])
  @@index([action])
  @@index([targetType, targetId])
  @@index([createdAt])
}
```

## 10. User 모델 확장

기존 User 모델에 추가할 관계들:

```prisma
model User {
  // ... 기존 필드들 ...
  
  // 새로운 관계들
  teamMemberships  TeamMember[]    @relation("TeamMemberships")
  teams            Team[]          @relation("TeamRepresentative")
  products         Product[]       // 판매한 상품들 (판매자 역할)
  orders           Order[]         @relation("Orders")
  reviews          Review[]        @relation("Reviews")
  posts            Post[]          @relation("Posts")
  likes            Like[]          @relation("Likes")
  notifications    Notification[]  @relation("Notifications")
  inquiries        Inquiry[]       @relation("Inquiries")
  adminLogs        AdminLog[]      @relation("AdminLogs")
}
```

---

## 📊 관계 요약

### 주요 관계 다이어그램

```
User
  ├── TeamMember (다대다: User ↔ Team)
  ├── Team (일대다: User → Team, 대표자)
  ├── Order (일대다: User → Order)
  ├── Review (일대다: User → Review)
  ├── Post (일대다: User → Post)
  ├── Like (일대다: User → Like)
  ├── Notification (일대다: User → Notification)
  ├── Inquiry (일대다: User → Inquiry)
  └── AdminLog (일대다: User → AdminLog)

Team
  ├── TeamMember (일대다: Team → TeamMember)
  ├── Product (일대다: Team → Product)
  ├── Adjustment (일대다: Team → Adjustment)
  └── TeamRequest (일대다: Team → TeamRequest)

Product
  ├── ProductOption (일대다: Product → ProductOption)
  ├── ProductImage (일대다: Product → ProductImage)
  ├── ProductTag (일대다: Product → ProductTag)
  ├── OrderItem (일대다: Product → OrderItem)
  ├── Review (일대다: Product → Review)
  ├── Like (일대다: Product → Like)
  └── ProductRequest (일대일: Product → ProductRequest)

Order
  └── OrderItem (일대다: Order → OrderItem)

Review
  └── ReviewImage (일대다: Review → ReviewImage)

Project
  └── ProjectTag (다대다: Project ↔ Tag)

Adjustment
  └── AdjustmentItem (일대다: Adjustment → AdjustmentItem)
```

---

## ⚠️ 주의사항

1. **외래키 제약조건**: 대부분 `onDelete: Cascade`를 사용하여 부모 레코드 삭제 시 자식 레코드도 함께 삭제되도록 했습니다. 단, User와 관련된 일부 관계는 `onDelete: SetNull`을 사용하여 데이터 무결성을 유지합니다.

2. **인덱스**: 자주 조회되는 필드들(외래키, 상태, 날짜 등)에 인덱스를 추가하여 성능을 최적화했습니다.

3. **JSON 필드**: 복잡한 구조의 데이터(옵션 조합, 변경사항 등)는 JSON 타입을 사용했습니다.

4. **Soft Delete**: 현재는 하드 삭제를 사용하지만, 향후 soft delete가 필요할 경우 `deletedAt` 필드를 추가할 수 있습니다.

5. **Enum 타입**: 상태 값들은 문자열로 정의했지만, Prisma의 enum을 사용하여 타입 안정성을 높일 수 있습니다.
