import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#f8f6f4] w-full relative z-[60]">
      {/* Safe area top */}
      <div className="h-[34px] w-full" />
      
      {/* Main content */}
      <div className="px-5 md:px-6 py-5 md:py-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-11 md:gap-12">
          {/* 고객지원 섹션 */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-[17px] leading-[1.5] text-[#443e3c]">
              고객지원
            </h3>
            <div className="flex flex-col gap-3 text-[13px] leading-[1.5] text-[#85817e] tracking-[-0.26px]">
              <div>
                <span className="font-bold">전화</span>
                <span>: 010-5238-0236</span>
              </div>
              <div>
                <span className="font-bold">이메일</span>
                <span>: gcsweb01234@gmail.com</span>
              </div>
              <div>
                <span className="font-bold">주소</span>
                <span>: 서울특별시 강북구 솔샘로 174 136동 304호</span>
              </div>
            </div>
          </div>

          {/* 사업자 정보 섹션 */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-[17px] leading-[1.5] text-[#443e3c]">
              사업자 정보
            </h3>
            <div className="flex flex-col gap-3 text-[13px] leading-[1.5] text-[#85817e] tracking-[-0.26px]">
              <div className="flex flex-col md:flex-row md:gap-10 gap-2">
                <div>
                  <span className="font-bold">대표</span>
                  <span>: 안성은</span>
                </div>
                <div>
                  <span className="font-bold">회사명</span>
                  <span>: 안북스 스튜디오</span>
                </div>
              </div>
              <div>
                <span className="font-bold">사업자등록번호</span>
                <span>: 693-01-03164</span>
              </div>
              <div>
                <span className="font-bold">통신판매업신고번호</span>
                <span>: 제 2025-서울강북-0961호</span>
              </div>
            </div>
          </div>

          {/* 로고 및 저작권 */}
          <div className="flex flex-col gap-2">
            <div className="relative h-[21px] w-[59px]">
              <Image
                src="/images/logo.svg"
                alt="GCS:Web Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-1 text-[8px] leading-[1.5] text-[#443e3c]">
              <p>© 2025 GCS:Web. All rights reserved.</p>
              <Link 
                href="/terms" 
                className="underline decoration-solid underline-offset-2 hover:text-[#85817e] transition-colors"
              >
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Safe area bottom */}
      <div className="h-[34px] w-full" />
    </footer>
  );
}

