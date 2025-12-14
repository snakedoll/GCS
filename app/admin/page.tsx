'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/6ae5093c-456d-4738-a160-02e67ab9f3ec";
const imgMdiBell = "https://www.figma.com/api/mcp/asset/2e8dbe8b-9d9e-45c1-93f1-164f1f730036";
const imgMessageSquare = "https://www.figma.com/api/mcp/asset/37c2c0be-746d-4810-84f6-093a79fa6450";
const imgSave = "https://www.figma.com/api/mcp/asset/bacd0b13-6e05-4ca5-b852-58b518053463";
const imgLine297 = "https://www.figma.com/api/mcp/asset/0dc009e5-7673-46c4-a05a-b0f5ea3dfb60";

function NavBarMobile() {
  const router = useRouter();
  
  return (
    <div className="bg-[#f8f6f4] flex h-[44px] items-center justify-between px-[16px] py-[10px] relative shadow-[0px_4px_10px_0px_rgba(99,81,73,0.1)] w-full">
      <button
        onClick={() => router.back()}
        className="h-[24px] relative shrink-0 w-[12px] hover:opacity-80 transition-opacity"
        aria-label="뒤로가기"
      >
        <img alt="" className="block max-w-none size-full" src={imgWeuiBackFilled} />
      </button>
      <p className="font-bold leading-[1.5] relative shrink-0 text-[15px] text-black">
        Admin
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

export default function AdminPage() {
  return (
    <div className="bg-[#f8f6f4] flex flex-col gap-[36px] items-center relative w-full min-h-screen pb-0">
      {/* Top */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* Mid */}
      <div className="flex flex-col items-center justify-between relative shrink-0 w-full">
        {/* 요약 정보 카드 */}
        <div className="border-b-2 border-[#eeebe6] border-solid flex items-center relative shrink-0 w-full max-w-[376px]">
          {/* 알림 */}
          <Link
            href="/admin/alarm"
            className="flex flex-1 items-center justify-center px-0 py-[20px] relative shrink-0 hover:opacity-80 transition-opacity"
          >
            <div className="flex flex-col gap-[12px] items-center px-[4px] py-0 relative shrink-0 w-[57px]">
              <div className="relative shrink-0 w-[24px] h-[24px]">
                <img alt="" className="block max-w-none size-full" src={imgMdiBell} />
              </div>
              <div className="flex gap-[4px] items-center leading-[1.5] relative shrink-0 text-[15px]">
                <p className="font-normal relative shrink-0 text-[#443e3c]">
                  알림
                </p>
                <p className="font-bold relative shrink-0 text-[#ee4a08]">
                  5
                </p>
              </div>
            </div>
          </Link>
          {/* 문의 */}
          <div className="border-l-2 border-r-2 border-[#eeebe6] border-solid flex flex-1 items-center justify-center px-0 py-[20px] relative shrink-0">
            <div className="flex flex-col gap-[12px] items-center px-[4px] py-0 relative shrink-0">
              <div className="relative shrink-0 w-[24px] h-[24px]">
                <img alt="" className="block max-w-none size-full" src={imgMessageSquare} />
              </div>
              <div className="flex gap-[4px] items-center leading-[1.5] relative shrink-0 text-[15px]">
                <p className="font-normal relative shrink-0 text-[#443e3c]">
                  문의
                </p>
                <p className="font-bold relative shrink-0 text-[#ee4a08]">
                  5
                </p>
              </div>
            </div>
          </div>
          {/* 로그 */}
          <Link href="/adminLog" className="flex flex-1 items-center justify-center px-0 py-[20px] relative shrink-0 hover:opacity-80 transition-opacity">
            <div className="flex flex-col gap-[12px] items-center px-[4px] py-0 relative shrink-0 w-[57px]">
              <div className="relative shrink-0 w-[24px] h-[24px]">
                <img alt="" className="block max-w-none size-full" src={imgSave} />
              </div>
              <div className="flex items-center relative shrink-0">
                <p className="font-normal leading-[1.5] relative shrink-0 text-[15px] text-[#443e3c]">
                  로그
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full max-w-[344px]">
          {/* 판매 관리 */}
          <div className="bg-white flex flex-col items-start p-[16px] relative rounded-[12px] shrink-0 w-full">
            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <div className="flex items-center justify-center relative shrink-0 w-full">
                <p className="flex-1 font-bold leading-[1.5] relative shrink-0 text-[#443e3c] text-[15px]">
                  판매 관리
                </p>
              </div>
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute inset-[-2px_0_0_0] border-t border-[#eeebe6]" />
              </div>
            </div>
            <div className="flex items-center relative shrink-0 w-full">
              <div className="flex flex-col gap-[16px] items-start px-0 py-[12px] relative shrink-0">
                <Link href="/admin/itemCardManage" className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full hover:opacity-80 transition-opacity">
                  상품카드 관리
                </Link>
                <Link href="/allItemManage" className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full hover:opacity-80 transition-opacity">
                  전체 품목 관리
                </Link>
                <Link href="/adjustment" className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full hover:opacity-80 transition-opacity">
                  정산 관리
                </Link>
                <Link href="/reviews" className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full hover:opacity-80 transition-opacity">
                  리뷰 관리
                </Link>
              </div>
            </div>
          </div>

          {/* 사용자 관리 */}
          <div className="bg-white flex flex-col items-start p-[16px] relative rounded-[12px] shrink-0 w-full">
            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <div className="flex items-center justify-center relative shrink-0 w-full">
                <p className="flex-1 font-bold leading-[1.5] relative shrink-0 text-[#443e3c] text-[15px]">
                  사용자 관리
                </p>
              </div>
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute inset-[-2px_0_0_0] border-t border-[#eeebe6]" />
              </div>
            </div>
            <div className="flex flex-col items-start justify-center px-0 py-[12px] relative shrink-0 w-full">
              <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                <Link href="/admin/memberManage?tab=member" className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full hover:opacity-80 transition-opacity">
                  회원 관리
                </Link>
                <Link href="/admin/memberManage?tab=team" className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full hover:opacity-80 transition-opacity">
                  판매팀 관리
                </Link>
              </div>
            </div>
          </div>

          {/* 데이터 */}
          <div className="bg-white flex flex-col items-start p-[16px] relative rounded-[12px] shrink-0 w-full">
            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <div className="flex items-center justify-center relative shrink-0 w-full">
                <p className="flex-1 font-bold leading-[1.5] relative shrink-0 text-[#443e3c] text-[15px]">
                  데이터
                </p>
              </div>
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute inset-[-2px_0_0_0] border-t border-[#eeebe6]" />
              </div>
            </div>
            <div className="flex flex-col gap-[16px] items-start justify-center px-0 py-[12px] relative shrink-0 w-full">
              <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                <Link href="/admin/data/siteActivity" className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full hover:opacity-80 transition-opacity">
                  사이트 활동
                </Link>
                <Link href="/admin/data/sales" className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full hover:opacity-80 transition-opacity">
                  매출 현황
                </Link>
              </div>
              <Link href="/admin/data/content" className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full hover:opacity-80 transition-opacity">
                콘텐츠 통계
              </Link>
              <Link href="/admin/data/users" className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full hover:opacity-80 transition-opacity">
                사용자 통계
              </Link>
            </div>
          </div>

          {/* 설정 */}
          <div className="bg-white flex flex-col items-start p-[16px] relative rounded-[12px] shrink-0 w-full">
            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <div className="flex items-center justify-center relative shrink-0 w-full">
                <p className="flex-1 font-bold leading-[1.5] relative shrink-0 text-[15px] text-[#443e3c]">
                  설정
                </p>
              </div>
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute inset-[-2px_0_0_0] border-t border-[#eeebe6]" />
              </div>
            </div>
            <div className="flex items-center relative shrink-0 w-full">
              <div className="flex flex-col gap-0 items-start px-0 py-[12px] relative shrink-0">
                <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full">
                  이용약관 관리
                </p>
              </div>
            </div>
            <div className="flex items-center relative shrink-0 w-full">
              <div className="flex flex-col gap-0 items-start px-0 py-[12px] relative shrink-0">
                <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full">
                  삭제항목
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

