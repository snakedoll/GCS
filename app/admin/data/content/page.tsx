'use client';

import { useRouter } from 'next/navigation';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/6ae5093c-456d-4738-a160-02e67ab9f3ec";
const imgIcon = "https://www.figma.com/api/mcp/asset/cb6ec52f-9aaa-4156-8c72-94a76d402a2e";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/4d3c342d-5c76-4540-b808-0666f95a574c";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/c78cb563-e6a9-4859-84a2-c59019bcfebf";

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
        콘텐츠 통계
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

export default function ContentPage() {
  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative w-full min-h-screen pb-[32px]">
      {/* Top */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[7.63px] items-center px-[15.27px] pt-[15.27px] relative shrink-0 w-full">
        {/* 메트릭 카드 3개 */}
        <div className="h-[285.26px] relative shrink-0 w-[344.64px]">
          {/* 전체 게시글 */}
          <div className="absolute bg-white flex flex-col gap-[11.45px] items-start left-0 pb-0 pl-[15.27px] pr-0 pt-[15.27px] rounded-[11.45px] top-0 w-[166.59px]">
            <div className="h-[38.16px] relative shrink-0 w-[136.06px]">
              <div className="flex items-center justify-between relative size-full">
                <div className="bg-[#fff5f0] relative rounded-[7.63px] shrink-0 size-[38.16px]">
                  <div className="flex items-center justify-center relative size-full">
                    <div className="relative shrink-0 size-[19.08px]">
                      <img alt="" className="block max-w-none size-full" src={imgIcon} />
                    </div>
                  </div>
                </div>
                <div className="h-[18.6px] relative shrink-0 w-[43.41px]">
                  <p className="font-normal leading-[18.61px] relative text-[#22c55e] text-[12.41px]">
                    +18.4%
                  </p>
                </div>
              </div>
            </div>
            <div className="h-[56.76px] relative shrink-0 w-[136.06px]">
              <div className="flex flex-col gap-[3.81px] items-start relative size-full">
                <p className="font-normal leading-[18.61px] relative text-[#85817e] text-[12.41px]">
                  전체 게시글
                </p>
                <p className="font-normal leading-[34.35px] relative text-[#1a1918] text-[22.9px]">
                  63
                </p>
              </div>
            </div>
          </div>

          {/* 전체 댓글 */}
          <div className="absolute bg-white flex flex-col gap-[11.45px] items-start left-[178.04px] pb-0 pl-[15.27px] pr-0 pt-[15.27px] rounded-[11.45px] top-0 w-[166.6px]">
            <div className="h-[38.16px] relative shrink-0 w-[136.07px]">
              <div className="flex items-center justify-between relative size-full">
                <div className="bg-[#fff5f0] relative rounded-[7.63px] shrink-0 size-[38.16px]">
                  <div className="flex items-center justify-center relative size-full">
                    <div className="relative shrink-0 size-[19.08px]">
                      <img alt="" className="block max-w-none size-full" src={imgIcon1} />
                    </div>
                  </div>
                </div>
                <div className="h-[18.6px] relative shrink-0 w-[43.97px]">
                  <p className="font-normal leading-[18.61px] relative text-[#22c55e] text-[12.41px]">
                    +22.7%
                  </p>
                </div>
              </div>
            </div>
            <div className="h-[56.76px] relative shrink-0 w-[136.07px]">
              <div className="flex flex-col gap-[3.81px] items-start relative size-full">
                <p className="font-normal leading-[18.61px] relative text-[#85817e] text-[12.41px]">
                  전체 댓글
                </p>
                <p className="font-normal leading-[34.35px] relative text-[#1a1918] text-[22.9px]">
                  184
                </p>
              </div>
            </div>
          </div>

          {/* 공유 수 */}
          <div className="absolute bg-white flex flex-col gap-[11.45px] items-start left-[178.44px] pb-0 pl-[15.27px] pr-0 pt-[15.27px] rounded-[11.45px] top-[148.86px] w-[166.6px]">
            <div className="h-[38.16px] relative shrink-0 w-[136.07px]">
              <div className="flex items-center justify-between relative size-full">
                <div className="bg-[#fff5f0] relative rounded-[7.63px] shrink-0 size-[38.16px]">
                  <div className="flex items-center justify-center relative size-full">
                    <div className="relative shrink-0 size-[19.08px]">
                      <img alt="" className="block max-w-none size-full" src={imgIcon2} />
                    </div>
                  </div>
                </div>
                <div className="h-[18.6px] relative shrink-0 w-[37.52px]">
                  <p className="font-normal leading-[18.61px] relative text-[#22c55e] text-[12.41px]">
                    +9.8%
                  </p>
                </div>
              </div>
            </div>
            <div className="h-[56.76px] relative shrink-0 w-[136.07px]">
              <div className="flex flex-col gap-[3.81px] items-start relative size-full">
                <p className="font-normal leading-[18.61px] relative text-[#85817e] text-[12.41px]">
                  공유 수
                </p>
                <p className="font-normal leading-[34.35px] relative text-[#1a1918] text-[22.9px]">
                  76
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 월별 콘텐츠 증가 추이 */}
        <div className="bg-white h-[258.1px] relative rounded-[11.45px] shrink-0 w-[344.64px]">
          <div className="flex flex-col gap-[15.27px] items-start pb-0 pt-[15.27px] px-[15.27px] relative size-full">
            <p className="font-normal leading-[21.47px] relative text-[#1a1918] text-[14.31px]">
              월별 콘텐츠 증가 추이
            </p>
            <div className="h-[174.62px] relative shrink-0 w-full">
              <div className="bg-[#f8f6f4] rounded-[8px] flex items-center justify-center size-full">
                <p className="font-normal text-[#85817e] text-[12px]">차트 영역</p>
              </div>
            </div>
            {/* 범례 */}
            <div className="flex gap-[2.86px] items-center relative shrink-0 w-full">
              <div className="bg-[#fd6f22] rounded-[1.91px] shrink-0 size-[11.45px]" />
              <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[10.5px]">
                게시글
              </p>
              <div className="bg-[#f03e23] rounded-[1.91px] shrink-0 size-[11.45px] ml-[11.45px]" />
              <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[10.5px]">
                댓글
              </p>
            </div>
          </div>
        </div>

        {/* 최근 인기 게시글 */}
        <div className="bg-white h-[382.22px] relative rounded-[11.45px] shrink-0 w-[344.64px]">
          <div className="flex flex-col gap-[15.27px] items-start pb-0 pt-[15.27px] px-[15.27px] relative size-full">
            <p className="font-normal leading-[21.47px] relative text-[#1a1918] text-[14.31px]">
              최근 인기 게시글
            </p>
            <div className="h-[314.96px] relative shrink-0 w-full">
              {/* 1위 */}
              <div className="border-b border-[#f0f0f0] flex items-center justify-between h-[53.94px] relative shrink-0 w-full">
                <div className="flex-1 flex flex-col gap-[3.81px] items-start relative shrink-0">
                  <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[12.41px]">
                    GCS 커리큘럼 완벽 가이드
                  </p>
                  <div className="flex gap-[11.45px] items-start relative shrink-0 w-full">
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.5px]">
                      조회 142
                    </p>
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.5px]">
                      좋아요 28
                    </p>
                  </div>
                </div>
              </div>

              {/* 2위 */}
              <div className="border-b border-[#f0f0f0] flex items-center justify-between h-[53.94px] relative shrink-0 w-full top-[65.39px]">
                <div className="flex-1 flex flex-col gap-[3.81px] items-start relative shrink-0">
                  <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[12.41px]">
                    졸업 프로젝트 포트폴리오 제작 팁
                  </p>
                  <div className="flex gap-[11.45px] items-start relative shrink-0 w-full">
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.5px]">
                      조회 115
                    </p>
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.5px]">
                      좋아요 23
                    </p>
                  </div>
                </div>
              </div>

              {/* 3위 */}
              <div className="border-b border-[#f0f0f0] flex items-center justify-between h-[53.94px] relative shrink-0 w-full top-[130.78px]">
                <div className="flex-1 flex flex-col gap-[3.81px] items-start relative shrink-0">
                  <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[12.41px]">
                    서양학과 학생들의 전시회 후기
                  </p>
                  <div className="flex gap-[11.45px] items-start relative shrink-0 w-full">
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.5px]">
                      조회 98
                    </p>
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.5px]">
                      좋아요 19
                    </p>
                  </div>
                </div>
              </div>

              {/* 4위 */}
              <div className="border-b border-[#f0f0f0] flex items-center justify-between h-[53.94px] relative shrink-0 w-full top-[196.16px]">
                <div className="flex-1 flex flex-col gap-[3.81px] items-start relative shrink-0">
                  <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[12.41px]">
                    전공별 취업 준비 로드맵
                  </p>
                  <div className="flex gap-[11.45px] items-start relative shrink-0 w-full">
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.5px]">
                      조회 86
                    </p>
                    <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.5px]">
                      좋아요 17
                    </p>
                  </div>
                </div>
              </div>

              {/* 5위 */}
              <div className="flex flex-col gap-[3.81px] items-start h-[38.15px] relative shrink-0 w-full top-[269.18px]">
                <p className="font-normal leading-[18.61px] relative text-[#1a1918] text-[12.41px]">
                  학생 창업 성공 사례 모음
                </p>
                <div className="flex gap-[11.45px] items-start relative shrink-0 w-full">
                  <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.5px]">
                    조회 72
                  </p>
                  <p className="font-normal leading-[15.74px] relative text-[#85817e] text-[10.5px]">
                    좋아요 14
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

