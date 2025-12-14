'use client';

import { useRouter } from 'next/navigation';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/6ae5093c-456d-4738-a160-02e67ab9f3ec";
const imgLine297 = "https://www.figma.com/api/mcp/asset/84463855-f0a1-4c4b-9b23-9d5bdbcc8619";
const imgDownArrow = "https://www.figma.com/api/mcp/asset/dd9762ec-bab7-41e6-bbbd-3ad78434e1e9";

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
        로그
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

export default function AdminLogPage() {
  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative w-full min-h-screen">
      {/* Nav Bar */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[44px] items-start pb-[20px] pt-[40px] px-[20px] relative shrink-0 w-full">
        {/* 오늘 */}
        <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <div className="flex items-start relative shrink-0">
            <p className="font-bold leading-[1.5] relative shrink-0 text-[19px] text-[#1a1918]">
              오늘
            </p>
          </div>
          <div className="flex flex-col gap-[20px] items-start relative shrink-0 w-full">
            {/* 로그 항목 1 */}
            <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-[8px] items-center justify-center pl-0 pr-[20px] py-0 relative shrink-0 w-full">
                <div className="flex items-start relative shrink-0 w-full">
                  <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px]">
                    로그 메시지
                  </p>
                </div>
                <p className="font-normal leading-[1.5] relative shrink-0 text-[10px] text-[#85817e] w-full">
                  날짜 시간
                </p>
              </div>
              {/* 구분선 */}
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute inset-[-2px_0_0_0] border-t border-[#eeebe6]" />
              </div>
            </div>
            {/* 로그 항목 2 */}
            <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-[8px] items-center justify-center pl-0 pr-[20px] py-0 relative shrink-0 w-full">
                <div className="flex items-start relative shrink-0 w-full">
                  <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px]">
                    로그 메시지
                  </p>
                </div>
                <p className="font-normal leading-[1.5] relative shrink-0 text-[10px] text-[#85817e] w-full">
                  날짜 시간
                </p>
              </div>
              {/* 구분선 */}
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute inset-[-2px_0_0_0] border-t border-[#eeebe6]" />
              </div>
            </div>
          </div>
        </div>

        {/* 어제 */}
        <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <div className="flex items-start relative shrink-0">
            <p className="font-bold leading-[1.5] relative shrink-0 text-[19px] text-[#1a1918]">
              어제
            </p>
          </div>
          <div className="flex flex-col gap-[20px] items-start relative shrink-0 w-full">
            {/* 로그 항목 구조만 구현 (더미데이터 제외) */}
            <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-[8px] items-center justify-center pl-0 pr-[20px] py-0 relative shrink-0 w-full">
                <div className="flex items-start relative shrink-0 w-full">
                  <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px]">
                    로그 메시지
                  </p>
                </div>
                <p className="font-normal leading-[1.5] relative shrink-0 text-[10px] text-[#85817e] w-full">
                  날짜 시간
                </p>
              </div>
              {/* 구분선 */}
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute inset-[-2px_0_0_0] border-t border-[#eeebe6]" />
              </div>
            </div>
          </div>
        </div>

        {/* 최근 7일 */}
        <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <div className="flex items-start relative shrink-0">
            <p className="font-bold leading-[1.5] relative shrink-0 text-[19px] text-[#1a1918]">
              최근 7일
            </p>
          </div>
          <div className="flex flex-col gap-[20px] items-start relative shrink-0 w-full">
            {/* 로그 항목 구조만 구현 (더미데이터 제외) */}
            <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-[8px] items-center justify-center pl-0 pr-[20px] py-0 relative shrink-0 w-full">
                <div className="flex items-start relative shrink-0 w-full">
                  <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px]">
                    로그 메시지
                  </p>
                </div>
                <p className="font-normal leading-[1.5] relative shrink-0 text-[10px] text-[#85817e] w-full">
                  날짜 시간
                </p>
              </div>
              {/* 구분선 */}
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute inset-[-2px_0_0_0] border-t border-[#eeebe6]" />
              </div>
            </div>
          </div>
        </div>

        {/* 더 많이 보기 */}
        <div className="flex flex-col items-center relative shrink-0 w-full">
          <div className="flex items-start relative shrink-0">
            <div className="flex gap-[12px] items-center relative shrink-0">
              <p className="font-bold leading-[1.5] relative shrink-0 text-[15px] text-[#85817e]">
                더 많이 보기
              </p>
              <div className="flex items-center justify-center relative shrink-0 w-[24px] h-[24px]">
                <div className="flex-none rotate-[270deg] scale-y-[-100%]">
                  <div className="relative w-[24px] h-[24px]">
                    <div className="absolute flex h-[14px] items-center justify-center left-[9px] top-[5px] w-[6px]">
                      <div className="flex-none rotate-[270deg]">
                        <div className="h-[6px] relative w-[14px]">
                          <div className="absolute inset-[-6.16%_-5.36%_-12.5%_-5.36%]">
                            <img alt="" className="block max-w-none size-full" src={imgDownArrow} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

