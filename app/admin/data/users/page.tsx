'use client';

import { useRouter } from 'next/navigation';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/6ae5093c-456d-4738-a160-02e67ab9f3ec";
const imgIcon = "https://www.figma.com/api/mcp/asset/4c15656b-6325-411f-8db0-853557123ca1";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/45004d47-0064-4b34-bf67-2bbb42fc0b56";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/377b12c1-6acf-4c38-9a2c-c6e51bfeeb82";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/e39d8a4f-81e1-4801-8a35-206f99feca73";
const imgApp = "https://www.figma.com/api/mcp/asset/a48f853f-a502-40e7-9bb5-d76558c21b7a";

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
        사용자 통계
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

export default function UsersPage() {
  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative w-full min-h-screen pb-[32px]">
      {/* Top */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* Body */}
      <div className="flex flex-col items-center gap-[15.27px] relative shrink-0 w-full px-[15.27px] pt-[15.27px] pb-0">
        <div className="relative shrink-0 w-[344.2px]">
          {/* 메트릭 카드 4개 + 판매팀 카드 */}
          <div className="flex flex-wrap gap-[11px] items-start relative shrink-0 w-full">
            {/* 전체 회원 */}
            <div className="bg-white flex flex-col gap-[11.45px] items-start pb-0 pl-[15.27px] pr-0 pt-[15.27px] rounded-[11.45px] w-[166.59px]">
              <div className="h-[38.16px] relative shrink-0 w-[136.06px]">
                <div className="flex items-center justify-between relative size-full">
                  <div className="bg-[#fff5f0] relative rounded-[7.63px] shrink-0 size-[38.16px]">
                    <div className="flex items-center justify-center relative size-full">
                      <div className="relative shrink-0 size-[19.08px]">
                        <img alt="" className="block max-w-none size-full" src={imgIcon} />
                      </div>
                    </div>
                  </div>
                  <div className="h-[18.6px] relative shrink-0 w-[43px]">
                    <p className="font-normal leading-[18.61px] relative text-[#22c55e] text-[12.41px]">
                      +12.3%
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-[56.76px] relative shrink-0 w-[136.06px]">
                <div className="flex flex-col gap-[3.81px] items-start relative size-full">
                  <p className="font-normal leading-[18.61px] relative text-[#85817e] text-[12.41px]">
                    전체 회원
                  </p>
                  <p className="font-normal leading-[34.35px] relative text-[#1a1918] text-[22.9px]">
                    250
                  </p>
                </div>
              </div>
            </div>

            {/* 활성 사용자 */}
            <div className="bg-white flex flex-col gap-[11.45px] items-start pb-0 pl-[15.27px] pr-0 pt-[15.27px] rounded-[11.45px] w-[166.6px]">
              <div className="h-[38.16px] relative shrink-0 w-[136.07px]">
                <div className="flex items-center justify-between relative size-full">
                  <div className="bg-[#fff5f0] relative rounded-[7.63px] shrink-0 size-[38.16px]">
                    <div className="flex items-center justify-center relative size-full">
                      <div className="relative shrink-0 size-[19.08px]">
                        <img alt="" className="block max-w-none size-full" src={imgIcon1} />
                      </div>
                    </div>
                  </div>
                  <div className="h-[18.6px] relative shrink-0 w-[36.75px]">
                    <p className="font-normal leading-[18.61px] relative text-[#22c55e] text-[12.41px]">
                      +8.7%
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-[56.76px] relative shrink-0 w-[136.07px]">
                <div className="flex flex-col gap-[3.81px] items-start relative size-full">
                  <p className="font-normal leading-[18.61px] relative text-[#85817e] text-[12.41px]">
                    활성 사용자
                  </p>
                  <p className="font-normal leading-[34.35px] relative text-[#1a1918] text-[22.9px]">
                    165
                  </p>
                </div>
              </div>
            </div>

            {/* 휴면 계정 */}
            <div className="bg-white flex flex-col gap-[11.45px] items-start pb-0 pl-[15.27px] pr-0 pt-[15.27px] rounded-[11.45px] w-[166.59px]">
              <div className="h-[38.16px] relative shrink-0 w-[136.06px]">
                <div className="flex items-center justify-between relative size-full">
                  <div className="bg-[#fff5f0] relative rounded-[7.63px] shrink-0 size-[38.16px]">
                    <div className="flex items-center justify-center relative size-full">
                      <div className="relative shrink-0 size-[19.08px]">
                        <img alt="" className="block max-w-none size-full" src={imgIcon2} />
                      </div>
                    </div>
                  </div>
                  <div className="h-[18.6px] relative shrink-0 w-[35.24px]">
                    <p className="font-normal leading-[18.61px] relative text-[#22c55e] text-[12.41px]">
                      -3.2%
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-[56.76px] relative shrink-0 w-[136.06px]">
                <div className="flex flex-col gap-[3.81px] items-start relative size-full">
                  <p className="font-normal leading-[18.61px] relative text-[#85817e] text-[12.41px]">
                    휴면 계정
                  </p>
                  <p className="font-normal leading-[34.35px] relative text-[#1a1918] text-[22.9px]">
                    85
                  </p>
                </div>
              </div>
            </div>

            {/* 오늘 접속 */}
            <div className="bg-white flex flex-col gap-[11.45px] items-start pb-0 pl-[15.27px] pr-0 pt-[15.27px] rounded-[11.45px] w-[166.6px]">
              <div className="h-[38.16px] relative shrink-0 w-[136.07px]">
                <div className="flex items-center justify-between relative size-full">
                  <div className="bg-[#fff5f0] relative rounded-[7.63px] shrink-0 size-[38.16px]">
                    <div className="flex items-center justify-center relative size-full">
                      <div className="relative shrink-0 size-[19.08px]">
                        <img alt="" className="block max-w-none size-full" src={imgIcon3} />
                      </div>
                    </div>
                  </div>
                  <div className="h-[18.6px] relative shrink-0 w-[43.03px]">
                    <p className="font-normal leading-[18.61px] relative text-[#22c55e] text-[12.41px]">
                      +15.8%
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-[56.76px] relative shrink-0 w-[136.07px]">
                <div className="flex flex-col gap-[3.81px] items-start relative size-full">
                  <p className="font-normal leading-[18.61px] relative text-[#85817e] text-[12.41px]">
                    오늘 접속
                  </p>
                  <p className="font-normal leading-[34.35px] relative text-[#1a1918] text-[22.9px]">
                    58
                  </p>
                </div>
              </div>
            </div>

            {/* 판매팀 카드 */}
            <div className="bg-white flex flex-col items-start pb-0 pt-[16px] px-[20px] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] w-[344px]">
              <div className="flex items-center justify-between relative shrink-0 w-full">
                <div className="flex flex-col gap-[8px] items-start relative shrink-0">
                  <p className="font-medium leading-[18px] relative text-[#85817e] text-[12px]">
                    전체 판매팀 4 중 활동 중인 판매팀
                  </p>
                  <p className="font-bold leading-[36px] relative text-[#1a1918] text-[24px]">
                    4
                  </p>
                </div>
                <div className="bg-[#fff5f0] flex items-center justify-center rounded-[8px] size-[40px] shrink-0">
                  <div className="relative shrink-0 size-[20px]">
                    <img alt="" className="block max-w-none size-full" src={imgApp} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 월별 신규 가입자 */}
          <div className="bg-white flex flex-col gap-[15.27px] items-start pb-0 pt-[15.27px] px-[15.27px] rounded-[11.45px] shrink-0 w-[344.64px]">
            <p className="font-normal leading-[21.47px] relative text-[#1a1918] text-[14.31px]">
              월별 신규 가입자
            </p>
            <div className="h-[190.84px] relative shrink-0 w-full">
              <div className="bg-[#f8f6f4] rounded-[8px] flex items-center justify-center size-full">
                <p className="font-normal text-[#85817e] text-[12px]">차트 영역</p>
              </div>
            </div>
          </div>

          {/* 연령대별 분포 */}
          <div className="bg-white flex flex-col gap-[15.27px] items-start pb-0 pt-[15.27px] px-[15.27px] rounded-[11.45px] shrink-0 w-[344.64px]">
            <p className="font-normal leading-[21.47px] relative text-[#1a1918] text-[14.31px]">
              연령대별 분포
            </p>
            <div className="h-[171.75px] relative shrink-0 w-full">
              <div className="bg-[#f8f6f4] rounded-[8px] flex items-center justify-center size-full">
                <p className="font-normal text-[#85817e] text-[12px]">차트 영역</p>
              </div>
            </div>
          </div>

          {/* 전공별 회원 분포 */}
          <div className="bg-white flex flex-col gap-[15.27px] items-start pb-0 pt-[15.27px] px-[15.27px] rounded-[11.45px] shrink-0 w-[344.64px]">
            <p className="font-normal leading-[21.47px] relative text-[#1a1918] text-[14.31px]">
              전공별 회원 분포
            </p>
            <div className="h-[292.33px] relative shrink-0 w-full">
              <div className="flex flex-col gap-[7.63px] items-start relative shrink-0 w-full">
                {/* 경영학과 */}
                <div className="flex flex-col gap-[7.63px] items-start relative shrink-0 w-full">
                  <div className="h-[18.6px] relative shrink-0 w-full">
                    <div className="flex items-center justify-between relative size-full">
                      <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[12.41px]">
                        경영학과
                      </p>
                      <div className="flex gap-[7.63px] items-center relative shrink-0">
                        <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[12.41px]">
                          62명
                        </p>
                        <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.5px]">
                          (25%)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f0f0f0] h-[5.72px] relative rounded-full shrink-0 w-full">
                    <div className="bg-[#fd6f22] h-[5.72px] rounded-full shrink-0 w-[235.58px]" />
                  </div>
                </div>

                {/* 광고홍보학과 */}
                <div className="flex flex-col gap-[7.63px] items-start relative shrink-0 w-full">
                  <div className="h-[18.6px] relative shrink-0 w-full">
                    <div className="flex items-center justify-between relative size-full">
                      <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[12.41px]">
                        광고홍보학과
                      </p>
                      <div className="flex gap-[7.63px] items-center relative shrink-0">
                        <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[12.41px]">
                          55명
                        </p>
                        <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.5px]">
                          (22%)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f0f0f0] h-[5.72px] relative rounded-full shrink-0 w-full">
                    <div className="bg-[#fd6f22] h-[5.72px] rounded-full shrink-0 w-[245.01px]" />
                  </div>
                </div>

                {/* 서양화 전공 */}
                <div className="flex flex-col gap-[7.63px] items-start relative shrink-0 w-full">
                  <div className="h-[18.6px] relative shrink-0 w-full">
                    <div className="flex items-center justify-between relative size-full">
                      <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[12.41px]">
                        서양화 전공
                      </p>
                      <div className="flex gap-[7.63px] items-center relative shrink-0">
                        <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[12.41px]">
                          48명
                        </p>
                        <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.5px]">
                          (19%)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f0f0f0] h-[5.72px] relative rounded-full shrink-0 w-full">
                    <div className="bg-[#fd6f22] h-[5.72px] rounded-full shrink-0 w-[254.43px]" />
                  </div>
                </div>

                {/* 산업시스템공학과 */}
                <div className="flex flex-col gap-[7.63px] items-start relative shrink-0 w-full">
                  <div className="h-[18.6px] relative shrink-0 w-full">
                    <div className="flex items-center justify-between relative size-full">
                      <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[12.41px]">
                        산업시스템공학과
                      </p>
                      <div className="flex gap-[7.63px] items-center relative shrink-0">
                        <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[12.41px]">
                          35명
                        </p>
                        <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.5px]">
                          (14%)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f0f0f0] h-[5.72px] relative rounded-full shrink-0 w-full">
                    <div className="bg-[#fd6f22] h-[5.72px] rounded-full shrink-0 w-[270.14px]" />
                  </div>
                </div>

                {/* 행정학과 */}
                <div className="flex flex-col gap-[7.63px] items-start relative shrink-0 w-full">
                  <div className="h-[18.6px] relative shrink-0 w-full">
                    <div className="flex items-center justify-between relative size-full">
                      <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[12.41px]">
                        행정학과
                      </p>
                      <div className="flex gap-[7.63px] items-center relative shrink-0">
                        <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[12.41px]">
                          28명
                        </p>
                        <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.5px]">
                          (11%)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f0f0f0] h-[5.72px] relative rounded-full shrink-0 w-full">
                    <div className="bg-[#fd6f22] h-[5.72px] rounded-full shrink-0 w-[279.57px]" />
                  </div>
                </div>

                {/* 식품산업공학전공 */}
                <div className="flex flex-col gap-[7.63px] items-start relative shrink-0 w-full">
                  <div className="h-[18.6px] relative shrink-0 w-full">
                    <div className="flex items-center justify-between relative size-full">
                      <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[12.41px]">
                        식품산업공학전공
                      </p>
                      <div className="flex gap-[7.63px] items-center relative shrink-0">
                        <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[12.41px]">
                          15명
                        </p>
                        <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.5px]">
                          (6%)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f0f0f0] h-[5.72px] relative rounded-full shrink-0 w-full">
                    <div className="bg-[#fd6f22] h-[5.72px] rounded-full shrink-0 w-[295.27px]" />
                  </div>
                </div>

                {/* 연극학부 */}
                <div className="flex flex-col gap-[7.63px] items-start relative shrink-0 w-full">
                  <div className="h-[18.6px] relative shrink-0 w-full">
                    <div className="flex items-center justify-between relative size-full">
                      <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[12.41px]">
                        연극학부
                      </p>
                      <div className="flex gap-[7.63px] items-center relative shrink-0">
                        <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[12.41px]">
                          7명
                        </p>
                        <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.5px]">
                          (3%)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f0f0f0] h-[5.72px] relative rounded-full shrink-0 w-full">
                    <div className="bg-[#fd6f22] h-[5.72px] rounded-full shrink-0 w-[304.69px]" />
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

