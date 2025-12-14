# Brevo IP 화이트리스트 오류 진단 가이드

## 🔍 문제 상황

"Blocking unauthorized IP addresses"를 비활성화했는데도 여전히 401 unauthorized 오류가 발생하는 경우

---

## 🎯 주요 원인 분석

### 1. **"Authorized IPs" 탭에 IP가 등록되어 있는 경우 (가장 가능성 높음 ⭐)**

Brevo에는 **두 가지 관련 설정**이 있습니다:

1. **"Blocking unauthorized IP addresses"** (비활성화됨 ✅)
   - 이것은 "차단" 기능입니다
   - 비활성화 = IP 차단 안 함

2. **"Authorized IPs" 또는 "Allowed IPs"** (별도 탭)
   - 이것은 "허용 목록" 기능입니다
   - 여기에 IP가 등록되어 있으면 **오직 그 IP만 허용**됩니다
   - 비어있어야 모든 IP에서 접근 가능

#### 확인 방법
1. https://app.brevo.com/security/authorised_ips 접속
2. **"Authorized IPs"** 또는 **"Allowed IP addresses"** 탭 클릭
3. IP 목록이 있는지 확인
4. **있으면 모두 삭제**하거나, 현재 개발 IP (`61.251.252.207`) 추가

---

### 2. API 키별 IP 제한 설정

일부 서비스에서는 API 키를 생성할 때 IP 제한을 설정할 수 있습니다.

#### 확인 방법
1. Brevo 대시보드 → **SMTP & API** → **API Keys**
2. 사용 중인 API 키 클릭/확인
3. IP Restriction 또는 Allowed IPs 설정 확인
4. 제한이 있다면 제거하거나 현재 IP 추가

---

### 3. 설정 변경 지연 (Propagation Delay)

클라우드 서비스의 설정 변경이 완전히 적용되는데 몇 분이 걸릴 수 있습니다.

#### 해결 방법
1. Brevo 대시보드에서 로그아웃 후 다시 로그인
2. 브라우저 캐시 삭제 또는 시크릿 모드로 확인
3. **5-10분 대기** 후 다시 테스트

---

### 4. 다른 Brevo 계정/서브 계정 사용

API 키가 다른 Brevo 계정이나 서브 계정에 속해있을 수 있습니다.

#### 확인 방법
1. API 키가 현재 로그인한 계정의 것인지 확인
2. 서브 계정이 있다면 해당 계정의 설정도 확인

---

## ✅ 단계별 해결 방법

### Step 1: Authorized IPs 탭 확인 및 정리

```
1. https://app.brevo.com/security/authorised_ips 접속
2. 상단 탭에서 "Authorized IPs" 또는 "Allowed IPs" 클릭
3. 등록된 모든 IP 주소 확인
4. 모두 삭제 (또는 현재 개발 IP만 남기기)
5. 저장
```

### Step 2: API 키 설정 확인

```
1. Brevo 대시보드 → SMTP & API → API Keys
2. 사용 중인 API 키 찾기
3. "Edit" 또는 "Settings" 클릭
4. IP restriction 관련 설정 확인 및 제거
```

### Step 3: 캐시 및 세션 새로고침

```
1. Brevo 대시보드에서 로그아웃
2. 브라우저 캐시 삭제
3. 다시 로그인
4. 설정 페이지 재확인
```

### Step 4: API 키 재생성 (최후의 수단)

만약 위 방법들이 모두 실패한다면:

```
1. Brevo → SMTP & API → API Keys
2. 새로운 API 키 생성
3. 기존 키 삭제
4. .env 파일의 BREVO_API_KEY 업데이트
5. 재테스트
```

---

## 🔧 임시 해결책 (개발 환경용)

개발 환경에서 빠르게 테스트하려면:

### 방법 1: 현재 IP를 Authorized IPs에 추가

```
1. 현재 IP 확인: 61.251.252.207
2. Brevo → Security → Authorized IPs
3. IP 추가: 61.251.252.207
4. 저장
```

⚠️ **주의**: IP가 변경되면 (예: 네트워크 변경, VPN 사용 등) 다시 오류 발생

### 방법 2: 개발 모드로 전환 (코드 수정)

`.env` 파일에서:
```
EMAIL_METHOD=console
```

또는:
```
EMAIL_METHOD=development
```

이렇게 하면 실제 이메일 대신 콘솔에 인증번호가 출력됩니다.

---

## 📋 확인 체크리스트

진단할 때 다음을 확인하세요:

- [ ] "Blocking unauthorized IP addresses" = Deactivated ✅ (이미 확인됨)
- [ ] "Authorized IPs" 또는 "Allowed IPs" 탭에 IP가 등록되어 있는지 확인
- [ ] API 키 설정에 IP 제한이 있는지 확인
- [ ] Brevo 계정이 올바른지 확인
- [ ] 설정 변경 후 5-10분 대기했는지 확인
- [ ] 브라우저 캐시를 삭제하고 다시 확인했는지 확인

---

## 🚨 가장 가능성 높은 원인

**"Authorized IPs" 탭에 IP가 등록되어 있을 가능성이 높습니다.**

Brevo의 보안 설정은 다음과 같이 작동합니다:
- **Blocking unauthorized IPs (비활성화)** = IP 차단 안 함
- **Authorized IPs (비어있어야 함)** = 비어있으면 모든 IP 허용, 있으면 그 IP만 허용

따라서 "Blocking"을 끄더라도 "Authorized IPs"에 IP가 등록되어 있으면, 그 IP 외에는 접근할 수 없습니다.

---

## 📞 추가 확인 사항

Brevo 대시보드에서 다음 경로들을 모두 확인해보세요:

1. **Security** → **Authorized IPs** (또는 Allowed IPs)
2. **SMTP & API** → **API Keys** → (API 키 선택) → **Settings**
3. **Account** → **Security Settings** (다른 IP 관련 설정이 있는지)

---

## 💡 권장 해결 방법

**개발 환경에서는:**
1. "Authorized IPs" 목록을 **완전히 비우기** (모든 IP 허용)
2. 또는 현재 개발 IP (`61.251.252.207`)를 임시로 추가

**프로덕션 환경 (Railway 배포 후)에서는:**
1. IP 제한을 완전히 비활성화하는 것이 가장 안정적
2. API 키 보안으로 충분히 안전함
