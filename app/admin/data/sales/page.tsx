'use client';

import { useRouter } from 'next/navigation';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/6ae5093c-456d-4738-a160-02e67ab9f3ec";
const imgIcon = "https://www.figma.com/api/mcp/asset/5ffc9767-1bdc-4ed5-a9ae-6a4f1bcdbee5";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/71e103ac-02d6-47b0-ac56-21888b716e92";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/0f7bef95-e81c-4f65-804d-f3337e4eb706";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/8ec82316-28bd-4bd8-82e1-cf642eeb5990";

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
        펀딩 현황
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

export default function SalesPage() {
  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative w-full min-h-screen pb-[32px]">
      {/* Top */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* Body */}
      <div className="flex flex-col items-center gap-[15.26px] relative shrink-0 w-full px-[15.26px] pt-[15.26px] pb-0">
        {/* 메트릭 카드 4개 */}
        <div className="h-[285.13px] relative shrink-0 w-[344.48px]">
            {/* 이번 달 펀딩액 */}
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
                  <div className="h-[18.59px] relative shrink-0 w-[43.14px]">
                    <p className="font-normal leading-[18.6px] relative text-[#22c55e] text-[12.4px]">
                      +27.3%
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-[56.74px] relative shrink-0 w-[136px]">
                <div className="flex flex-col gap-[3.81px] items-start relative size-full">
                  <p className="font-normal leading-[18.6px] relative text-[#85817e] text-[12.4px]">
                    이번 달 펀딩액
                  </p>
                  <p className="font-normal leading-[34.34px] relative text-[#1a1918] text-[22.89px]">
                    218만원
                  </p>
                </div>
              </div>
            </div>

            {/* 진행 중 프로젝트 */}
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
                  <div className="h-[18.59px] relative shrink-0 w-[44.66px]">
                    <p className="font-normal leading-[18.6px] relative text-[#22c55e] text-[12.4px]">
                      +20.0%
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-[56.74px] relative shrink-0 w-[136px]">
                <div className="flex flex-col gap-[3.81px] items-start relative size-full">
                  <p className="font-normal leading-[18.6px] relative text-[#85817e] text-[12.4px]">
                    진행 중 프로젝트
                  </p>
                  <p className="font-normal leading-[34.34px] relative text-[#1a1918] text-[22.89px]">
                    8개
                  </p>
                </div>
              </div>
            </div>

            {/* 총 후원자 */}
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
                  <div className="h-[18.59px] relative shrink-0 w-[44.87px]">
                    <p className="font-normal leading-[18.6px] relative text-[#22c55e] text-[12.4px]">
                      +24.8%
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-[56.74px] relative shrink-0 w-[136px]">
                <div className="flex flex-col gap-[3.81px] items-start relative size-full">
                  <p className="font-normal leading-[18.6px] relative text-[#85817e] text-[12.4px]">
                    총 후원자
                  </p>
                  <p className="font-normal leading-[34.34px] relative text-[#1a1918] text-[22.89px]">
                    118명
                  </p>
                </div>
              </div>
            </div>

            {/* 평균 달성률 */}
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
                    평균 달성률
                  </p>
                  <p className="font-normal leading-[34.34px] relative text-[#1a1918] text-[22.89px]">
                    142%
                  </p>
                </div>
              </div>
            </div>
        </div>

        {/* 월별 펀딩 추이 */}
        <div className="bg-white h-[257.98px] relative rounded-[11.45px] shrink-0 w-[344.48px]">
          <div className="flex flex-col gap-[15.26px] items-start pb-0 pt-[15.26px] px-[15.26px] relative size-full">
            <p className="font-normal leading-[21.46px] relative text-[#1a1918] text-[14.31px]">
              월별 펀딩 추이
            </p>
            <div className="h-[190.75px] relative shrink-0 w-full">
              <div className="bg-[#f8f6f4] rounded-[8px] flex items-center justify-center size-full">
                <p className="font-normal text-[#85817e] text-[12px]">차트 영역</p>
              </div>
            </div>
          </div>
        </div>

        {/* 프로젝트 수 & 후원자 증가 */}
        <div className="bg-white h-[238.9px] relative rounded-[11.45px] shrink-0 w-[344.48px]">
          <div className="flex flex-col gap-[15.26px] items-start pb-0 pt-[15.26px] px-[15.26px] relative size-full">
            <p className="font-normal leading-[21.46px] relative text-[#1a1918] text-[14.31px]">
              프로젝트 수 & 후원자 증가
            </p>
            <div className="h-[171.67px] relative shrink-0 w-full">
              <div className="bg-[#f8f6f4] rounded-[8px] flex items-center justify-center size-full">
                <p className="font-normal text-[#85817e] text-[12px]">차트 영역</p>
              </div>
            </div>
          </div>
        </div>

        {/* 판매팀별 펀딩 현황 */}
        <div className="bg-white h-[351.27px] relative rounded-[11.45px] shrink-0 w-[344.48px]">
          <div className="flex flex-col gap-[15.26px] items-start pb-0 pt-[15.26px] px-[15.26px] relative size-full">
            <p className="font-normal leading-[21.46px] relative text-[#1a1918] text-[14.31px]">
              판매팀별 펀딩 현황
            </p>
            <div className="h-[299.35px] relative shrink-0 w-full">
              <div className="flex flex-col gap-[7.63px] items-start relative shrink-0 w-full">
                {/* 1위 - 유랑 */}
                <div className="flex flex-col gap-[7.63px] items-start relative shrink-0 w-full">
                  <div className="h-[34.32px] relative shrink-0 w-full">
                    <div className="flex items-center justify-between relative size-full">
                      <div className="flex gap-[7.63px] items-center relative shrink-0">
                        <div className="bg-[#f8f6f4] relative rounded-[5.72px] shrink-0 size-[22.89px]">
                          <div className="flex items-center justify-center relative size-full">
                            <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                              1
                            </p>
                          </div>
                        </div>
                        <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                          유랑
                        </p>
                      </div>
                      <div className="h-[34.32px] relative shrink-0 w-[36.89px]">
                        <div className="flex flex-col items-start relative size-full">
                          <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px] text-right w-full">
                            58만원
                          </p>
                          <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px] text-right w-full">
                            1개 상품
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f0f0f0] h-[5.72px] relative rounded-full shrink-0 w-full">
                    <div className="bg-[#fd6f22] h-[5.72px] rounded-full shrink-0 w-[10.47px]" />
                  </div>
                </div>

                {/* 2위 - 여명 */}
                <div className="flex flex-col gap-[7.63px] items-start relative shrink-0 w-full">
                  <div className="h-[34.32px] relative shrink-0 w-full">
                    <div className="flex items-center justify-between relative size-full">
                      <div className="flex gap-[7.63px] items-center relative shrink-0">
                        <div className="bg-[#f8f6f4] relative rounded-[5.72px] shrink-0 size-[22.89px]">
                          <div className="flex items-center justify-center relative size-full">
                            <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                              2
                            </p>
                          </div>
                        </div>
                        <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                          여명
                        </p>
                      </div>
                      <div className="h-[34.32px] relative shrink-0 w-[36.45px]">
                        <div className="flex flex-col items-start relative size-full">
                          <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px] text-right w-full">
                            52만원
                          </p>
                          <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px] text-right w-full">
                            1개 상품
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f0f0f0] h-[5.72px] relative rounded-full shrink-0 w-full">
                    <div className="bg-[#fd6f22] h-[5.72px] rounded-full shrink-0 w-[41.87px]" />
                  </div>
                </div>

                {/* 3위 - KITTY */}
                <div className="flex flex-col gap-[7.63px] items-start relative shrink-0 w-full">
                  <div className="h-[34.32px] relative shrink-0 w-full">
                    <div className="flex items-center justify-between relative size-full">
                      <div className="flex gap-[7.63px] items-center relative shrink-0">
                        <div className="bg-[#f8f6f4] relative rounded-[5.72px] shrink-0 size-[22.89px]">
                          <div className="flex items-center justify-center relative size-full">
                            <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                              3
                            </p>
                          </div>
                        </div>
                        <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                          KITTY
                        </p>
                      </div>
                      <div className="h-[34.32px] relative shrink-0 w-[37.02px]">
                        <div className="flex flex-col items-start relative size-full">
                          <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px] text-right w-full">
                            60만원
                          </p>
                          <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px] text-right w-full">
                            2개 상품
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f0f0f0] h-[5.72px] relative rounded-full shrink-0 w-full">
                    <div className="bg-[#fd6f22] h-[5.72px] rounded-full shrink-0 w-full" />
                  </div>
                </div>

                {/* 4위 - MUA */}
                <div className="flex flex-col gap-[7.63px] items-start relative shrink-0 w-full">
                  <div className="h-[34.32px] relative shrink-0 w-full">
                    <div className="flex items-center justify-between relative size-full">
                      <div className="flex gap-[7.63px] items-center relative shrink-0">
                        <div className="bg-[#f8f6f4] relative rounded-[5.72px] shrink-0 size-[22.89px]">
                          <div className="flex items-center justify-center relative size-full">
                            <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                              4
                            </p>
                          </div>
                        </div>
                        <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                          MUA
                        </p>
                      </div>
                      <div className="h-[34.32px] relative shrink-0 w-[36.96px]">
                        <div className="flex flex-col items-start relative size-full">
                          <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px] text-right w-full">
                            45만원
                          </p>
                          <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px] text-right w-full">
                            1개 상품
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f0f0f0] h-[5.72px] relative rounded-full shrink-0 w-full">
                    <div className="bg-[#fd6f22] h-[5.72px] rounded-full shrink-0 w-[78.49px]" />
                  </div>
                </div>

                {/* 5위 - HUSH */}
                <div className="flex flex-col gap-[7.63px] items-start relative shrink-0 w-full">
                  <div className="h-[34.32px] relative shrink-0 w-full">
                    <div className="flex items-center justify-between relative size-full">
                      <div className="flex gap-[7.63px] items-center relative shrink-0">
                        <div className="bg-[#f8f6f4] relative rounded-[5.72px] shrink-0 size-[22.89px]">
                          <div className="flex items-center justify-center relative size-full">
                            <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                              5
                            </p>
                          </div>
                        </div>
                        <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                          HUSH
                        </p>
                      </div>
                      <div className="h-[34.32px] relative shrink-0 w-[37px]">
                        <div className="flex flex-col items-start relative size-full">
                          <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px] text-right w-full">
                            38만원
                          </p>
                          <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px] text-right w-full">
                            1개 상품
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f0f0f0] h-[5.72px] relative rounded-full shrink-0 w-full">
                    <div className="bg-[#fd6f22] h-[5.72px] rounded-full shrink-0 w-[115.12px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 인기 상품 TOP 6 */}
        <div className="bg-white h-[635.25px] relative rounded-[11.45px] shrink-0 w-[344.48px]">
          <div className="flex flex-col gap-[15.26px] items-start pb-0 pt-[15.26px] px-[15.26px] relative size-full">
            <p className="font-normal leading-[21.46px] relative text-[#1a1918] text-[14.31px]">
              인기 상품 TOP 6
            </p>
            <div className="h-[583.27px] relative shrink-0 w-full">
              {/* 1위 */}
              <div className="absolute border-b border-[#f0f0f0] h-[87.77px] left-0 top-0 w-full">
                <div className="absolute flex gap-[11.44px] items-start left-0 top-[11.44px] w-full">
                  <div className="bg-[#fff5f0] relative rounded-[5.72px] shrink-0 size-[26.7px]">
                    <div className="flex items-center justify-center relative size-full">
                      <p className="font-normal leading-[18.6px] relative text-[#ee4a08] text-[12.4px]">
                        1
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-[3.81px] items-start relative shrink-0 min-h-0 min-w-0">
                    <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                      웹 연동형 NFC 키링
                    </p>
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px]">
                      판매팀: 유랑
                    </p>
                  </div>
                </div>
                <div className="absolute flex items-center justify-between left-[38.14px] top-[57.2px] w-[275.82px]">
                  <div className="flex gap-[11.44px] items-start relative shrink-0">
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px]">
                      후원 42명
                    </p>
                    <p className="font-normal leading-[15.74px] relative text-[#22c55e] text-[10.49px]">
                      215% 달성
                    </p>
                  </div>
                  <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                    58만원
                  </p>
                </div>
              </div>

              {/* 2위 */}
              <div className="absolute border-b border-[#f0f0f0] h-[87.77px] left-0 top-[99.21px] w-full">
                <div className="absolute flex gap-[11.44px] items-start left-0 top-[11.44px] w-full">
                  <div className="bg-[#fff5f0] relative rounded-[5.72px] shrink-0 size-[26.7px]">
                    <div className="flex items-center justify-center relative size-full">
                      <p className="font-normal leading-[18.6px] relative text-[#ee4a08] text-[12.4px]">
                        2
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-[3.81px] items-start relative shrink-0 min-h-0 min-w-0">
                    <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                      슈링클스 키링 DIY 키트
                    </p>
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px]">
                      판매팀: 여명
                    </p>
                  </div>
                </div>
                <div className="absolute flex items-center justify-between left-[38.14px] top-[57.2px] w-[275.82px]">
                  <div className="flex gap-[11.44px] items-start relative shrink-0">
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px]">
                      후원 38명
                    </p>
                    <p className="font-normal leading-[15.74px] relative text-[#22c55e] text-[10.49px]">
                      186% 달성
                    </p>
                  </div>
                  <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                    52만원
                  </p>
                </div>
              </div>

              {/* 3위 */}
              <div className="absolute border-b border-[#f0f0f0] h-[87.77px] left-0 top-[198.42px] w-full">
                <div className="absolute flex gap-[11.44px] items-start left-0 top-[11.44px] w-full">
                  <div className="bg-[#fff5f0] relative rounded-[5.72px] shrink-0 size-[26.7px]">
                    <div className="flex items-center justify-center relative size-full">
                      <p className="font-normal leading-[18.6px] relative text-[#ee4a08] text-[12.4px]">
                        3
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-[3.81px] items-start relative shrink-0 min-h-0 min-w-0">
                    <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                      불교 철학을 담은 어패럴 굿즈
                    </p>
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px]">
                      판매팀: MUA
                    </p>
                  </div>
                </div>
                <div className="absolute flex items-center justify-between left-[38.14px] top-[57.2px] w-[275.82px]">
                  <div className="flex gap-[11.44px] items-start relative shrink-0">
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px]">
                      후원 32명
                    </p>
                    <p className="font-normal leading-[15.74px] relative text-[#22c55e] text-[10.49px]">
                      174% 달성
                    </p>
                  </div>
                  <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                    45만원
                  </p>
                </div>
              </div>

              {/* 4위 */}
              <div className="absolute border-b border-[#f0f0f0] h-[87.77px] left-0 top-[297.62px] w-full">
                <div className="absolute flex gap-[11.44px] items-start left-0 top-[11.44px] w-full">
                  <div className="bg-[#fff5f0] relative rounded-[5.72px] shrink-0 size-[26.7px]">
                    <div className="flex items-center justify-center relative size-full">
                      <p className="font-normal leading-[18.6px] relative text-[#ee4a08] text-[12.4px]">
                        4
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-[3.81px] items-start relative shrink-0 min-h-0 min-w-0">
                    <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                      친환경 재사용 컵홀더〈HUSH eco cup holder〉
                    </p>
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px]">
                      판매팀: HUSH
                    </p>
                  </div>
                </div>
                <div className="absolute flex items-center justify-between left-[38.14px] top-[57.2px] w-[275.82px]">
                  <div className="flex gap-[11.44px] items-start relative shrink-0">
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px]">
                      후원 28명
                    </p>
                    <p className="font-normal leading-[15.74px] relative text-[#22c55e] text-[10.49px]">
                      163% 달성
                    </p>
                  </div>
                  <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                    38만원
                  </p>
                </div>
              </div>

              {/* 5위 */}
              <div className="absolute border-b border-[#f0f0f0] h-[87.77px] left-0 top-[396.83px] w-full">
                <div className="absolute flex gap-[11.44px] items-start left-0 top-[11.57px] w-full">
                  <div className="bg-[#fff5f0] relative rounded-[5.72px] shrink-0 size-[26.7px]">
                    <div className="flex items-center justify-center relative size-full">
                      <p className="font-normal leading-[18.6px] relative text-[#ee4a08] text-[12.4px]">
                        5
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-[3.81px] items-start relative shrink-0 min-h-0 min-w-0">
                    <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                      아코 키링
                    </p>
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px]">
                      판매팀: KITTY
                    </p>
                  </div>
                </div>
                <div className="absolute flex items-center justify-between left-[38.14px] top-[57.2px] w-[275.82px]">
                  <div className="flex gap-[11.44px] items-start relative shrink-0">
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px]">
                      후원 24명
                    </p>
                    <p className="font-normal leading-[15.74px] relative text-[#22c55e] text-[10.49px]">
                      148% 달성
                    </p>
                  </div>
                  <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                    32만원
                  </p>
                </div>
              </div>

              {/* 6위 */}
              <div className="absolute h-[87.23px] left-0 top-[496.17px] w-full">
                <div className="absolute flex gap-[11.44px] items-start left-0 top-[11.44px] w-full">
                  <div className="bg-[#fff5f0] relative rounded-[5.72px] shrink-0 size-[26.7px]">
                    <div className="flex items-center justify-center relative size-full">
                      <p className="font-normal leading-[18.6px] relative text-[#ee4a08] text-[12.4px]">
                        6
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-[3.81px] items-start relative shrink-0 min-h-0 min-w-0">
                    <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                      동국 USB
                    </p>
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px]">
                      판매팀: KITTY
                    </p>
                  </div>
                </div>
                <div className="absolute flex items-center justify-between left-[38.14px] top-[57.2px] w-[275.82px]">
                  <div className="flex gap-[11.44px] items-start relative shrink-0">
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px]">
                      후원 21명
                    </p>
                    <p className="font-normal leading-[15.74px] relative text-[#22c55e] text-[10.49px]">
                      135% 달성
                    </p>
                  </div>
                  <p className="font-normal leading-[18.6px] relative text-[#1a1918] text-[12.4px]">
                    28만원
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 펀딩 진행 상태 */}
        <div className="bg-white h-[254.32px] relative rounded-[11.45px] shrink-0 w-[344.48px]">
          <div className="flex flex-col gap-[15.26px] items-start pb-0 pt-[15.26px] px-[15.26px] relative size-full">
            <p className="font-normal leading-[21.46px] relative text-[#1a1918] text-[14.31px]">
              펀딩 진행 상태
            </p>
            <div className="h-[201.34px] relative shrink-0 w-full">
              <div className="flex flex-wrap gap-[11px] items-start relative shrink-0 w-full">
                {/* 목표 달성 */}
                <div className="bg-[#fff5f0] flex flex-col gap-[3.81px] items-start pb-[11.44px] pt-[11.44px] px-[11.44px] rounded-[7.63px] w-[151.26px]">
                  <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px]">
                    목표 달성
                  </p>
                  <p className="font-normal leading-[28.61px] relative text-[#ee4a08] text-[19.08px]">
                    6개
                  </p>
                  <p className="font-normal leading-[14.31px] relative text-[#85817e] text-[9.54px]">
                    진행 중 75%
                  </p>
                </div>
                {/* 진행 중 */}
                <div className="bg-[#f8f6f4] flex flex-col gap-[3.81px] items-start pb-[11.44px] pt-[11.44px] px-[11.44px] rounded-[7.63px] w-[151.26px]">
                  <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px]">
                    진행 중
                  </p>
                  <p className="font-normal leading-[28.61px] relative text-[#1a1918] text-[19.08px]">
                    2개
                  </p>
                  <p className="font-normal leading-[14.31px] relative text-[#85817e] text-[9.54px]">
                    평균 달성률 68%
                  </p>
                </div>
                {/* 성공 완료 */}
                <div className="bg-[#f0f0f0] flex flex-col gap-[3.81px] items-start pb-[11.44px] pt-[11.44px] px-[11.44px] rounded-[7.63px] w-[151.26px]">
                  <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px]">
                    성공 완료
                  </p>
                  <p className="font-normal leading-[28.61px] relative text-[#1a1918] text-[19.08px]">
                    18개
                  </p>
                  <p className="font-normal leading-[14.31px] relative text-[#85817e] text-[9.54px]">
                    전체 프로젝트
                  </p>
                </div>
                {/* 미달성 */}
                <div className="bg-[#e5e5e5] flex flex-col gap-[3.81px] items-start pb-[11.44px] pt-[11.44px] px-[11.44px] rounded-[7.63px] w-[151.26px]">
                  <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.49px]">
                    미달성
                  </p>
                  <p className="font-normal leading-[28.61px] relative text-[#1a1918] text-[19.08px]">
                    3개
                  </p>
                  <p className="font-normal leading-[14.31px] relative text-[#85817e] text-[9.54px]">
                    전체 프로젝트
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

