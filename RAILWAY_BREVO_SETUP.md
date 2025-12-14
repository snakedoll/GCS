# Railway + Brevo 이메일 서비스 설정 가이드

## 🎯 핵심 답변

**Railway로 배포할 때는 IP 화이트리스트를 비활성화하는 것이 가장 좋습니다.**

Railway는 기본적으로 **동적 IP**를 사용하므로, IP를 화이트리스트에 고정하는 것은 권장되지 않습니다.

---

## 📋 옵션 1: IP 제한 비활성화 (권장 ⭐)

### 설정 방법
1. **Brevo 대시보드 접속**: https://app.brevo.com/security/authorised_ips
2. **"IP Restriction" 토글을 OFF로 설정**
3. **저장**

이렇게 하면 어떤 IP에서든 API 키로 이메일을 전송할 수 있습니다.

### 장점
- ✅ Railway의 동적 IP 변경에 영향받지 않음
- ✅ 설정이 간단함
- ✅ 재배포나 서버 이동 시 문제 없음
- ✅ API 키만으로 보안 관리 가능

### 보안 고려사항
- API 키가 안전하게 보관되어 있다면 IP 제한 없이도 안전합니다
- `.env` 파일이나 Railway 환경 변수에 API 키를 저장하고, 코드 저장소에는 커밋하지 마세요

---

## 📋 옵션 2: Static Outbound IP 사용 (고급)

만약 반드시 IP 제한을 사용해야 한다면, Railway의 Static Outbound IP 기능을 사용할 수 있습니다.

### 설정 방법

#### 1. Railway에서 Static Outbound IP 활성화
1. Railway 대시보드에서 프로젝트 선택
2. 서비스의 **Settings** 탭 클릭
3. **Networking** 섹션에서 **"Enable Static IPs"** 토글 활성화
4. 다음 배포 후 고정 IP 주소가 할당됩니다

#### 2. 할당된 IP 주소 확인
- Railway 대시보드의 **Settings > Networking** 섹션에서 확인
- 또는 배포 로그에서 확인 가능
- 일반적으로 `34.x.x.x` 또는 `44.x.x.x` 형태의 AWS IP 주소입니다

#### 3. Brevo에 IP 추가
1. https://app.brevo.com/security/authorised_ips 접속
2. Railway에서 확인한 Static Outbound IP 주소 입력
3. 저장

### ⚠️ 주의사항
- **Static Outbound IP는 Railway 유료 플랜에서만 제공됩니다**
- IP는 **outbound(나가는)** 트래픽에만 사용됩니다
- 여러 고객과 공유될 수 있습니다 (전용 IP 아님)
- 재배포나 서비스 재시작 시 IP가 변경될 수 있습니다

---

## 🔍 Railway IP 주소 확인 방법

### 방법 1: Railway 대시보드
1. Railway 대시보드 → 프로젝트 선택
2. 서비스 → **Settings** → **Networking**
3. Static IPs가 활성화되어 있으면 여기에 표시됩니다

### 방법 2: 배포 로그 확인
1. Railway 대시보드 → 서비스 → **Deployments**
2. 최신 배포 로그에서 네트워크 정보 확인

### 방법 3: 코드로 확인 (테스트용)
```typescript
// app/api/test-ip/route.ts (테스트용)
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // 요청의 IP 주소 확인 (Railway의 outbound IP는 다를 수 있음)
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  return NextResponse.json({ 
    ip,
    message: '이 IP는 inbound IP입니다. Brevo는 outbound IP가 필요합니다.'
  });
}
```

### 방법 4: 외부 서비스로 확인
- Railway에서 배포된 앱에서 `https://api.ipify.org?format=json` 같은 서비스를 호출
- 단, 이것도 inbound IP일 수 있으므로 정확하지 않을 수 있습니다

---

## ✅ 권장 설정 (Railway 배포용)

### `.env` 파일 설정 (Railway 환경 변수)
```
BREVO_API_KEY=xkeysib-xxxxx
BREVO_FROM_EMAIL=gcsweb01234@gcsweb.kr
EMAIL_METHOD=brevo
```

### Brevo 설정
- ✅ **IP Restriction 비활성화** (권장)
- ✅ **API 키만으로 인증** 사용

---

## 📝 Railway 환경 변수 설정 방법

1. Railway 대시보드 → 프로젝트 선택
2. 서비스 → **Variables** 탭
3. **+ New Variable** 클릭
4. 다음 변수 추가:
   - `BREVO_API_KEY`: Brevo API 키
   - `BREVO_FROM_EMAIL`: 발신자 이메일 주소
   - `EMAIL_METHOD`: `brevo`
   - `DATABASE_URL`: (Railway가 자동 생성)
   - 기타 필요한 환경 변수들

---

## 🔐 보안 체크리스트

- [ ] `.env` 파일이 `.gitignore`에 포함되어 있는지 확인
- [ ] API 키가 코드에 하드코딩되지 않았는지 확인
- [ ] Railway 환경 변수에만 API 키 저장
- [ ] Brevo 계정에 2FA(이중 인증) 활성화 권장

---

## 🚨 문제 해결

### 이메일 전송 실패 시
1. Railway 로그 확인: 대시보드 → **Deployments** → **Logs**
2. Brevo 대시보드에서 전송 로그 확인
3. API 키가 올바르게 설정되었는지 확인
4. IP 제한이 비활성화되어 있는지 확인

### IP 관련 오류가 계속 발생하는 경우
- **가장 간단한 해결책**: Brevo에서 IP 제한 완전히 비활성화

---

## 📚 참고 자료

- [Railway Static Outbound IPs 문서](https://docs.railway.com/reference/static-outbound-ips)
- [Brevo API 문서](https://developers.brevo.com/)
- [Brevo IP 제한 설정](https://app.brevo.com/security/authorised_ips)
