'use client';

import { useRouter } from 'next/navigation';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/341d50a8-8723-4287-96bb-cfa524a4bac7";

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
        정산 관리
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

export default function AdjustmentPage() {
  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative w-full min-h-screen">
      {/* Nav Bar */}
      <div className="flex flex-col h-[78px] items-start relative shrink-0 w-full">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[16px] items-start p-[16px] relative shrink-0 w-full">
        {/* 정산 내역 조회 */}
        <div className="bg-white flex flex-col gap-[16px] items-start p-[16px] relative rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] shrink-0 w-full">
          <p className="flex-1 font-normal leading-[24px] relative shrink-0 text-[#443e3c] text-[16px]">
            정산 내역 조회
          </p>
          
          {/* 정산 기간 시작 */}
          <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <p className="flex-1 font-normal leading-[24px] relative shrink-0 text-[#5f5a58] text-[16px]">
              정산 기간 시작
            </p>
            <div className="border border-[#5f5a58] border-solid h-[42px] rounded-[10px] shrink-0 w-full" />
          </div>

          {/* 정산 기간 종료 */}
          <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <p className="flex-1 font-normal leading-[24px] relative shrink-0 text-[#5f5a58] text-[16px]">
              정산 기간 종료
            </p>
            <div className="border border-[#5f5a58] border-solid h-[42px] rounded-[10px] shrink-0 w-full" />
          </div>

          {/* 판매팀 */}
          <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <p className="flex-1 font-normal leading-[24px] relative shrink-0 text-[#5f5a58] text-[16px]">
              판매팀
            </p>
            <div className="border border-[#5f5a58] border-solid h-[42px] rounded-[10px] shrink-0 w-full" />
          </div>

          {/* 정산 내역 보기 버튼 */}
          <button className="bg-[#fd6f22] h-[40px] relative rounded-[10px] shrink-0 w-full hover:opacity-80 transition-opacity">
            <p className="font-normal leading-[24px] relative shrink-0 text-[#f8f6f4] text-[16px] text-center">
              정산 내역 보기
            </p>
          </button>
        </div>

        {/* 최근 정산 내역 */}
        <div className="bg-white flex flex-col gap-[16px] items-start p-[16px] relative rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] shrink-0 w-full">
          <p className="flex-1 font-normal leading-[24px] relative shrink-0 text-[#443e3c] text-[16px]">
            최근 정산 내역
          </p>
          
          <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
            {/* 정산 내역 카드 구조 (더미데이터 제외) */}
            <div className="bg-[#f8f6f4] flex h-[73px] items-center justify-between p-[12px] relative rounded-[10px] shrink-0 w-full">
              <div className="flex flex-col gap-[4px] items-start relative shrink-0">
                <p className="font-normal leading-[24px] relative shrink-0 text-[#443e3c] text-[16px]">
                  판매팀: 이름
                </p>
                <p className="font-normal leading-[24px] relative shrink-0 text-[#85817e] text-[16px]">
                  지급일: 날짜
                </p>
              </div>
              <div className="flex flex-col items-end relative shrink-0">
                <p className="font-normal leading-[24px] relative shrink-0 text-[#443e3c] text-[16px] text-right">
                  금액
                </p>
                <div className="bg-[#14ae5c] flex items-center justify-center px-[12px] py-[2px] relative rounded-[999px] shrink-0 mt-[4px]">
                  <p className="font-bold leading-[16px] relative shrink-0 text-[#f8f6f4] text-[12px]">
                    완료
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

