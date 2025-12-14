'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/a5b5e79a-f6af-4306-a56b-4876126afa53";
const imgDownArrow = "https://www.figma.com/api/mcp/asset/8d409d92-7daf-4367-bf3f-45268d4e19ed";

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
        등록 요청 상품
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

export default function RegisterAskedItemPage() {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState('최신순');

  const toggleCardExpansion = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative w-full min-h-screen">
      {/* Nav Bar */}
      <div className="flex flex-col h-[78px] items-start relative shrink-0 w-full">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[16px] items-center px-0 py-[16px] relative shrink-0 w-full">
        {/* 총 건수 및 정렬 */}
        <div className="flex items-center justify-between relative shrink-0 w-[344px] px-[16px]">
          <p className="font-semibold leading-[19px] relative shrink-0 text-[12px] text-[#443e3c]">
            총 2개의 등록 요청
          </p>
          <div className="bg-white h-[33px] relative rounded-[8px] shrink-0 w-[120px] flex items-center justify-between px-[12px]">
            <p className="font-semibold leading-[14px] relative shrink-0 text-[10px] text-[#85817e]">
              {sortOrder}
            </p>
            <div className="relative shrink-0 w-[11px] h-[8px]">
              <img alt="" className="block max-w-none size-full" src={imgDownArrow} />
            </div>
          </div>
        </div>

        {/* 상품 요청 카드 리스트 */}
        <div className="flex flex-col gap-[16px] items-center relative shrink-0 w-full px-[16px]">
          {/* 상품 요청 카드 구조 (더미데이터 제외) */}
          <div className="bg-white flex flex-col gap-[12px] items-start p-[16px] relative rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] shrink-0 w-full max-w-[344px]">
            {/* 헤더 */}
            <div className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              <div className="flex gap-[8px] items-center relative shrink-0 w-full">
                <p className="font-bold leading-[21px] relative shrink-0 text-[15px] text-[#1a1918]">
                  상품명
                </p>
                <div className="bg-[#fd6f22] h-[18px] relative rounded-[4px] shrink-0 px-[6px] flex items-center">
                  <p className="font-normal leading-[14px] relative shrink-0 text-[10px] text-white">
                    Fund
                  </p>
                </div>
              </div>
              <p className="font-normal leading-[19px] relative shrink-0 text-[12px] text-[#85817e]">
                판매팀명
              </p>
              <p className="font-normal leading-[14px] relative shrink-0 text-[10px] text-[#85817e]">
                요청자: 이름 • 날짜 시간
              </p>
            </div>

            {/* 기본 정보 */}
            <div className="bg-[#f8f6f4] flex flex-col gap-[4px] items-start p-[11px] relative rounded-[8px] shrink-0 w-full">
              <div className="flex gap-[2px] items-start relative shrink-0 w-full">
                <p className="font-semibold leading-[17px] relative shrink-0 text-[12px] text-[#443e3c]">
                  펀딩기간:
                </p>
                <p className="font-normal leading-[17px] relative shrink-0 text-[12px] text-[#443e3c]">
                  날짜 범위
                </p>
              </div>
              <div className="flex gap-[2px] items-start relative shrink-0 w-full">
                <p className="font-semibold leading-[17px] relative shrink-0 text-[12px] text-[#443e3c]">
                  목표금액:
                </p>
                <p className="font-normal leading-[17px] relative shrink-0 text-[12px] text-[#443e3c]">
                  금액
                </p>
              </div>
              <div className="flex gap-[2px] items-start relative shrink-0 w-full">
                <p className="font-semibold leading-[17px] relative shrink-0 text-[12px] text-[#443e3c]">
                  수령방식:
                </p>
                <p className="font-normal leading-[17px] relative shrink-0 text-[12px] text-[#443e3c]">
                  수령방식
                </p>
              </div>
              <p className="font-normal leading-[16px] relative shrink-0 text-[10px] text-[#85817e]">
                상품 설명
              </p>
            </div>

            {/* 확장된 상세 정보 */}
            {expandedCards.includes(0) && (
              <>
                {/* 옵션 정보 */}
                <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full border-t border-[#e8e4df] pt-[11px]">
                  <p className="font-bold leading-[19px] relative shrink-0 text-[12px] text-[#1a1918]">
                    옵션 정보
                  </p>
                  <div className="bg-[#eeebe6] flex flex-col gap-[4px] items-start p-[10px] relative rounded-[8px] shrink-0 w-full">
                    <p className="font-semibold leading-[17px] relative shrink-0 text-[11px] text-[#443e3c]">
                      옵션명
                    </p>
                    <div className="flex gap-[6px] items-center relative shrink-0">
                      <div className="bg-white flex items-center justify-center h-[23px] relative rounded-[4px] shrink-0 px-[8px]">
                        <p className="font-normal leading-[16px] relative shrink-0 text-[10px] text-[#1a1918]">
                          옵션값
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 가격 정보 */}
                <div className="flex flex-col gap-[10px] items-start relative shrink-0 w-full">
                  <p className="font-bold leading-[19px] relative shrink-0 text-[12px] text-[#1a1918]">
                    가격 정보
                  </p>
                  <div className="bg-[#dcd6cc] flex flex-col gap-[1px] items-start relative rounded-[8px] shrink-0 w-full p-[1px]">
                    <div className="grid grid-cols-2 gap-[1px] relative shrink-0 w-full">
                      <div className="bg-[#eeebe6] flex flex-col gap-[2px] items-start p-[8px] relative rounded-[4px] shrink-0">
                        <p className="font-normal leading-[16px] relative shrink-0 text-[10px] text-[#443e3c]">
                          옵션 조합
                        </p>
                        <p className="font-bold leading-[17px] relative shrink-0 text-[11px] text-[#fd6f22]">
                          가격
                        </p>
                      </div>
                      <div className="bg-[#eeebe6] flex flex-col gap-[2px] items-start p-[8px] relative rounded-[4px] shrink-0">
                        <p className="font-normal leading-[16px] relative shrink-0 text-[10px] text-[#443e3c]">
                          옵션 조합
                        </p>
                        <p className="font-bold leading-[17px] relative shrink-0 text-[11px] text-[#fd6f22]">
                          가격
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 제작/배송 일정 */}
                <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                  <p className="font-bold leading-[19px] relative shrink-0 text-[12px] text-[#1a1918]">
                    제작/배송 일정
                  </p>
                  <div className="bg-[#eeebe6] flex flex-col gap-[4px] items-start p-[10px] relative rounded-[8px] shrink-0 w-full">
                    <p className="font-normal leading-[16px] relative shrink-0 text-[10px] text-[#443e3c]">
                      일정 정보
                    </p>
                  </div>
                </div>

                {/* 정산 계좌 */}
                <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                  <p className="font-bold leading-[19px] relative shrink-0 text-[12px] text-[#1a1918]">
                    정산 계좌
                  </p>
                  <div className="bg-[#eeebe6] flex items-center p-[10px] relative rounded-[8px] shrink-0 w-full">
                    <p className="font-normal leading-[17px] relative shrink-0 text-[11px] text-[#443e3c]">
                      계좌 정보
                    </p>
                  </div>
                </div>

                {/* 접기 버튼 */}
                <button
                  onClick={() => toggleCardExpansion(0)}
                  className="flex items-center justify-center relative shrink-0 w-full h-[32px] hover:opacity-80 transition-opacity"
                >
                  <p className="font-semibold leading-[17px] relative shrink-0 text-[11px] text-[#fd6f22]">
                    접기
                  </p>
                </button>
              </>
            )}

            {/* 접힌 상태일 때 상세 정보 보기 버튼 */}
            {!expandedCards.includes(0) && (
              <button
                onClick={() => toggleCardExpansion(0)}
                className="flex items-center justify-center relative shrink-0 w-full h-[32px] hover:opacity-80 transition-opacity"
              >
                <p className="font-semibold leading-[17px] relative shrink-0 text-[12px] text-[#fd6f22]">
                  상세 정보 보기
                </p>
              </button>
            )}

            {/* 액션 버튼들 */}
            <div className="flex gap-[8px] items-start relative shrink-0 w-full">
              <button className="bg-[#f8f6f4] flex-1 h-[38px] items-center justify-center relative rounded-[8px] shrink-0 hover:opacity-80 transition-opacity">
                <p className="font-bold leading-[19px] relative shrink-0 text-[12px] text-[#443e3c] text-center">
                  거부
                </p>
              </button>
              <button className="bg-[#fd6f22] flex-1 h-[38px] items-center justify-center relative rounded-[8px] shrink-0 hover:opacity-80 transition-opacity">
                <p className="font-bold leading-[19px] relative shrink-0 text-[12px] text-center text-white">
                  승인
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

