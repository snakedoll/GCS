'use client';

import { useRouter } from 'next/navigation';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/6ae5093c-456d-4738-a160-02e67ab9f3ec";
const imgIcon = "https://www.figma.com/api/mcp/asset/e1075e74-ad78-49ad-9d47-b4e061910ee2";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/81a33cc2-2ae3-4b76-8bd6-cdaf39cb92fd";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/8ec227a8-3c31-4dd9-ab00-04303598e4f7";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/39cfb217-dc17-43b9-b940-f946af05e108";

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
        사이트 활동
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

export default function SiteActivityPage() {
  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative w-full min-h-screen pb-[32px]">
      {/* Top */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[15.26px] items-center px-[15.26px] pt-[15.26px] relative shrink-0 w-full">
        {/* 메트릭 카드 4개 */}
        <div className="h-[285.13px] relative shrink-0 w-[344.48px]">
          {/* 오늘 방문자 */}
          <div className="absolute bg-white flex flex-col gap-[11.44px] items-start left-0 pb-0 pl-[15.26px] pr-0 pt-[15.26px] rounded-[11.45px] top-0 w-[166.52px]">
            <div className="h-[38.15px] relative shrink-0 w-[136px]">
              <div className="flex items-center justify-between relative size-full">
                <div className="bg-[#fff5f0] relative rounded-[7.63px] shrink-0 size-[38.15px]">
                  <div className="flex items-center justify-center relative size-full">
                    <div className="relative shrink-0 size-[19.07px]">
                      <img alt="" className="block max-w-none size-full" src={imgIcon} />
                    </div>
                  </div>
                </div>
                <div className="h-[18.59px] relative shrink-0 w-[42.85px]">
                  <p className="font-normal leading-[18.6px] relative text-[#22c55e] text-[12.4px]">
                    +12.5%
                  </p>
                </div>
              </div>
            </div>
            <div className="h-[56.74px] relative shrink-0 w-[136px]">
              <div className="flex flex-col gap-[3.81px] items-start relative size-full">
                <p className="font-normal leading-[18.6px] relative text-[#85817e] text-[12.4px]">
                  오늘 방문자
                </p>
                <p className="font-normal leading-[34.34px] relative text-[#1a1918] text-[22.89px]">
                  103
                </p>
              </div>
            </div>
          </div>

          {/* 신규 가입자 */}
          <div className="absolute bg-white flex flex-col gap-[11.44px] items-start left-[177.96px] pb-0 pl-[15.26px] pr-0 pt-[15.26px] rounded-[11.45px] top-0 w-[166.52px]">
            <div className="h-[38.15px] relative shrink-0 w-[136px]">
              <div className="flex items-center justify-between relative size-full">
                <div className="bg-[#fff5f0] relative rounded-[7.63px] shrink-0 size-[38.15px]">
                  <div className="flex items-center justify-center relative size-full">
                    <div className="relative shrink-0 size-[19.07px]">
                      <img alt="" className="block max-w-none size-full" src={imgIcon1} />
                    </div>
                  </div>
                </div>
                <div className="h-[18.59px] relative shrink-0 w-[37.5px]">
                  <p className="font-normal leading-[18.6px] relative text-[#22c55e] text-[12.4px]">
                    +8.3%
                  </p>
                </div>
              </div>
            </div>
            <div className="h-[56.74px] relative shrink-0 w-[136px]">
              <div className="flex flex-col gap-[3.81px] items-start relative size-full">
                <p className="font-normal leading-[18.6px] relative text-[#85817e] text-[12.4px]">
                  신규 가입자
                </p>
                <p className="font-normal leading-[34.34px] relative text-[#1a1918] text-[22.89px]">
                  8
                </p>
              </div>
            </div>
          </div>

          {/* 페이지뷰 */}
          <div className="absolute bg-white flex flex-col gap-[11.44px] items-start left-0 pb-0 pl-[15.26px] pr-0 pt-[15.26px] rounded-[11.45px] top-[148.28px] w-[166.52px]">
            <div className="h-[38.15px] relative shrink-0 w-[136px]">
              <div className="flex items-center justify-between relative size-full">
                <div className="bg-[#fff5f0] relative rounded-[7.63px] shrink-0 size-[38.15px]">
                  <div className="flex items-center justify-center relative size-full">
                    <div className="relative shrink-0 size-[19.07px]">
                      <img alt="" className="block max-w-none size-full" src={imgIcon2} />
                    </div>
                  </div>
                </div>
                <div className="h-[18.59px] relative shrink-0 w-[42.76px]">
                  <p className="font-normal leading-[18.6px] relative text-[#22c55e] text-[12.4px]">
                    +15.2%
                  </p>
                </div>
              </div>
            </div>
            <div className="h-[56.74px] relative shrink-0 w-[136px]">
              <div className="flex flex-col gap-[3.81px] items-start relative size-full">
                <p className="font-normal leading-[18.6px] relative text-[#85817e] text-[12.4px]">
                  페이지뷰
                </p>
                <p className="font-normal leading-[34.34px] relative text-[#1a1918] text-[22.89px]">
                  914
                </p>
              </div>
            </div>
          </div>

          {/* 평균 세션 */}
          <div className="absolute bg-white flex flex-col gap-[11.44px] items-start left-[177.96px] pb-0 pl-[15.26px] pr-0 pt-[15.26px] rounded-[11.45px] top-[148.28px] w-[166.52px]">
            <div className="h-[38.15px] relative shrink-0 w-[136px]">
              <div className="flex items-center justify-between relative size-full">
                <div className="bg-[#fff5f0] relative rounded-[7.63px] shrink-0 size-[38.15px]">
                  <div className="flex items-center justify-center relative size-full">
                    <div className="relative shrink-0 size-[19.07px]">
                      <img alt="" className="block max-w-none size-full" src={imgIcon3} />
                    </div>
                  </div>
                </div>
                <div className="h-[18.59px] relative shrink-0 w-[33.32px]">
                  <p className="font-normal leading-[18.6px] relative text-[#ef4444] text-[12.4px]">
                    -2.1%
                  </p>
                </div>
              </div>
            </div>
            <div className="h-[56.74px] relative shrink-0 w-[136px]">
              <div className="flex flex-col gap-[3.81px] items-start relative size-full">
                <p className="font-normal leading-[18.6px] relative text-[#85817e] text-[12.4px]">
                  평균 세션
                </p>
                <p className="font-normal leading-[34.34px] relative text-[#1a1918] text-[22.89px]">
                  4:32
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 시간대별 방문자 추이 */}
        <div className="bg-white h-[257.98px] relative rounded-[11.45px] shrink-0 w-[344.48px]">
          <div className="flex flex-col gap-[15.26px] items-start pb-0 pt-[15.26px] px-[15.26px] relative size-full">
            <p className="font-normal leading-[21.46px] relative text-[#1a1918] text-[14.31px]">
              시간대별 방문자 추이
            </p>
            <div className="h-[190.75px] relative shrink-0 w-full">
              <div className="bg-[#f8f6f4] rounded-[8px] flex items-center justify-center size-full">
                <p className="font-normal text-[#85817e] text-[12px]">차트 영역</p>
              </div>
            </div>
          </div>
        </div>

        {/* 디바이스별 접속 */}
        <div className="bg-white h-[238.9px] relative rounded-[11.45px] shrink-0 w-[344.48px]">
          <div className="flex flex-col gap-[15.26px] items-start pb-0 pt-[15.26px] px-[15.26px] relative size-full">
            <p className="font-normal leading-[21.46px] relative text-[#1a1918] text-[14.31px]">
              디바이스별 접속
            </p>
            <div className="h-[171.67px] relative shrink-0 w-full">
              <div className="bg-[#f8f6f4] rounded-[8px] flex items-center justify-center size-full">
                <p className="font-normal text-[#85817e] text-[12px]">차트 영역</p>
              </div>
            </div>
          </div>
        </div>

        {/* 인기 페이지 순위 */}
        <div className="bg-white h-[305.83px] relative rounded-[11.45px] shrink-0 w-[344.48px]">
          <div className="flex flex-col gap-[15.26px] items-start pb-0 pt-[15.26px] px-[15.26px] relative size-full">
            <p className="font-normal leading-[21.46px] relative text-[#1a1918] text-[14.31px]">
              인기 페이지 순위
            </p>
            <div className="flex flex-col gap-[11.44px] h-[238.59px] items-start relative shrink-0 w-full">
              {/* 1위 */}
              <div className="border-b border-[#f0f0f0] flex items-center justify-between h-[38.67px] relative shrink-0 w-full">
                <div className="flex gap-[11.44px] items-center relative shrink-0">
                  <div className="bg-[#f8f6f4] relative rounded-[5.72px] shrink-0 size-[22.89px]">
                    <div className="flex items-center justify-center relative size-full">
                      <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                        1
                      </p>
                    </div>
                  </div>
                  <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                    홈
                  </p>
                </div>
                <p className="font-normal leading-[18.6px] relative text-[#85817e] text-[12.4px]">
                  312 뷰
                </p>
              </div>
              {/* 2위 */}
              <div className="border-b border-[#f0f0f0] flex items-center justify-between h-[38.67px] relative shrink-0 w-full">
                <div className="flex gap-[11.44px] items-center relative shrink-0">
                  <div className="bg-[#f8f6f4] relative rounded-[5.72px] shrink-0 size-[22.89px]">
                    <div className="flex items-center justify-center relative size-full">
                      <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                        2
                      </p>
                    </div>
                  </div>
                  <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                    Shop
                  </p>
                </div>
                <p className="font-normal leading-[18.6px] relative text-[#85817e] text-[12.4px]">
                  198 뷰
                </p>
              </div>
              {/* 3위 */}
              <div className="border-b border-[#f0f0f0] flex items-center justify-between h-[38.67px] relative shrink-0 w-full">
                <div className="flex gap-[11.44px] items-center relative shrink-0">
                  <div className="bg-[#f8f6f4] relative rounded-[5.72px] shrink-0 size-[22.89px]">
                    <div className="flex items-center justify-center relative size-full">
                      <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                        3
                      </p>
                    </div>
                  </div>
                  <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                    Lounge
                  </p>
                </div>
                <p className="font-normal leading-[18.6px] relative text-[#85817e] text-[12.4px]">
                  156 뷰
                </p>
              </div>
              {/* 4위 */}
              <div className="border-b border-[#f0f0f0] flex items-center justify-between h-[38.67px] relative shrink-0 w-full">
                <div className="flex gap-[11.44px] items-center relative shrink-0">
                  <div className="bg-[#f8f6f4] relative rounded-[5.72px] shrink-0 size-[22.89px]">
                    <div className="flex items-center justify-center relative size-full">
                      <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                        4
                      </p>
                    </div>
                  </div>
                  <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                    Board
                  </p>
                </div>
                <p className="font-normal leading-[18.6px] relative text-[#85817e] text-[12.4px]">
                  89 뷰
                </p>
              </div>
              {/* 5위 */}
              <div className="flex items-center justify-between h-[38.14px] relative shrink-0 w-full">
                <div className="flex gap-[11.44px] items-center relative shrink-0">
                  <div className="bg-[#f8f6f4] relative rounded-[5.72px] shrink-0 size-[22.89px]">
                    <div className="flex items-center justify-center relative size-full">
                      <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                        5
                      </p>
                    </div>
                  </div>
                  <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                    About GCS
                  </p>
                </div>
                <p className="font-normal leading-[18.6px] relative text-[#85817e] text-[12.4px]">
                  64 뷰
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

