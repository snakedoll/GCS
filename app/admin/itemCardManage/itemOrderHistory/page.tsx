'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/6b463ceb-5dcd-4a8c-befa-674c512ad4e5";
const imgSearchIcon = "https://www.figma.com/api/mcp/asset/aaf238d5-0985-4bfa-a31e-b3085a4ece93";
const imgCheckFilled = "https://www.figma.com/api/mcp/asset/2ce3d790-77b9-4b77-b4e4-ca3f1f630c40";
const imgCheckLight = "https://www.figma.com/api/mcp/asset/6484996a-3a6e-43d4-9b0b-d9613e39785f";
const imgArrowDown = "https://www.figma.com/api/mcp/asset/52124cff-afb6-42a5-8ae3-5f6eec6e880c";

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
        주문 내역
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

export default function ItemOrderHistoryPage() {
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleCheckboxClick = (index: number) => {
    setSelectedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleRowExpansion = (index: number) => {
    setExpandedRows(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="bg-[#f8f6f4] flex flex-col gap-[16px] items-center relative w-full min-h-screen">
      {/* Nav Bar */}
      <div className="flex flex-col h-[78px] items-start relative shrink-0 w-full">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-full px-[16px] pb-[100px]">
        {/* 상품 정보 카드 */}
        <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full max-w-[344px]">
          <div className="flex gap-[16px] items-start relative shrink-0 w-full">
            {/* 이미지 영역 */}
            <div className="relative rounded-[4px] shrink-0 w-[100px] h-[100px] bg-[#eeebe6]">
              {/* 이미지는 API로 받아올 예정 */}
            </div>

            {/* 텍스트 영역 */}
            <div className="flex flex-1 flex-col gap-[8px] items-start relative shrink-0">
              <div className="flex flex-col items-start justify-end leading-[1.5] relative shrink-0 w-full">
                <p className="font-bold relative shrink-0 text-[15px] text-[#1a1918]">
                  상품명
                </p>
                <p className="font-normal relative shrink-0 text-[13px] text-[#1a1918] tracking-[-0.26px]">
                  판매팀명
                </p>
              </div>
              <div className="flex flex-col items-start relative shrink-0 w-full">
                <p className="font-normal leading-[1.5] relative shrink-0 text-[10px] text-[#85817e]">
                  날짜 범위
                </p>
              </div>
              <div className="bg-[#fd6f22] flex h-[19px] items-center justify-center px-[4px] py-[2px] relative rounded-[4px] shrink-0 w-1/6">
                <p className="font-bold leading-[1.5] relative shrink-0 text-[10px] text-[#f8f6f4] text-center">
                  상태
                </p>
              </div>
            </div>
          </div>

          {/* 진행률 바 */}
          <div className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
            <div className="flex gap-[8px] items-center relative shrink-0 w-full">
              <div className="flex-1 h-[10px] relative rounded-[100px] shrink-0 bg-[#1a1918] bg-opacity-5">
                <div className="absolute h-[10px] left-0 rounded-[100px] top-1/2 translate-y-[-50%] bg-[#fd6f22] w-[70%]" />
              </div>
              <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#1a1918] text-center tracking-[-0.26px]">
                70%
              </p>
            </div>
            <div className="flex items-start justify-end relative shrink-0 w-full">
              <div className="flex items-center justify-center px-[4px] py-[2px] relative rounded-[4px] shrink-0">
                <p className="font-bold leading-[1.5] relative shrink-0 text-[#1a1918] text-[10px] text-center">
                  목표금액
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white flex flex-col items-start px-[16px] py-[15px] relative rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] shrink-0 w-full max-w-[344px]">
          <div className="flex flex-col gap-[12px] h-[96px] items-start relative shrink-0 w-full">
            {/* 검색 바 */}
            <div className="bg-[#f8f6f4] flex-1 min-h-[32px] relative rounded-[8px] shrink-0 w-full">
              <div className="flex gap-[8px] items-center px-[16px] py-0 relative size-full">
                <div className="relative shrink-0 w-[16px] h-[16px]">
                  <img alt="" className="block max-w-none size-full" src={imgSearchIcon} />
                </div>
                <div className="flex-1 h-[18px] relative shrink-0">
                  <input
                    type="text"
                    placeholder="주문번호, 주문자"
                    className="bg-transparent border-0 w-full h-full text-[13px] text-[#85817e] placeholder:text-[#85817e] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 필터 버튼들 */}
            <div className="flex gap-[6px] items-center relative shrink-0">
              {['전체', '결제 완료', '결제 대기', '결제 취소', '환불'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterClick(filter)}
                  className={`flex items-center justify-center h-[37px] px-[12px] relative rounded-[8px] shrink-0 transition-colors ${
                    selectedFilter === filter
                      ? 'bg-[#fd6f22]'
                      : 'bg-[#f8f6f4]'
                  }`}
                >
                  <p className={`font-semibold leading-[18px] relative shrink-0 text-[12px] text-center ${
                    selectedFilter === filter
                      ? 'text-white'
                      : 'text-[#666]'
                  }`}>
                    {filter}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 전체 건수 */}
        <div className="flex flex-col items-start relative shrink-0 w-full max-w-[344px]">
          <p className="font-semibold leading-[15px] relative shrink-0 text-[12px] text-black">
            전체 12건
          </p>
        </div>

        {/* 주문 목록 테이블 */}
        <div className="bg-white flex flex-col items-start overflow-clip relative rounded-[12px] shrink-0 w-full max-w-[344px]">
          {/* 테이블 헤더 */}
          <div className="bg-[#eeebe6] border-b border-[#eeebe6] flex h-[39px] items-center justify-between relative shrink-0 w-full px-[16px]">
            <div className="flex gap-[6px] items-center relative shrink-0 flex-1">
              <button
                onClick={() => {
                  const allSelected = selectedItems.length > 0 && selectedItems.length === 1; // 실제로는 전체 항목 수와 비교
                  if (allSelected) {
                    setSelectedItems([]);
                  } else {
                    setSelectedItems([0]); // 실제로는 모든 항목 인덱스
                  }
                }}
                className="relative shrink-0 w-[24px] h-[24px] hover:opacity-80 transition-opacity"
              >
                <div className="relative size-full">
                  <div className="absolute contents left-[2px] top-[2px]">
                    <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${selectedItems.length > 0 ? 'bg-[#2a2a2e]' : ''}`} />
                    {selectedItems.length > 0 && (
                      <div className="absolute flex inset-0 items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </button>
              <div className="flex flex-1 items-center justify-center relative shrink-0">
                <p className="font-semibold leading-[12px] relative shrink-0 text-[8px] text-black">
                  주문번호
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center relative shrink-0">
                <p className="font-semibold leading-[12px] relative shrink-0 text-[8px] text-black">
                  주문자
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center relative shrink-0">
                <p className="font-semibold leading-[12px] relative shrink-0 text-[8px] text-black">
                  옵션명
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center relative shrink-0">
                <p className="font-semibold leading-[12px] relative shrink-0 text-[8px] text-black">
                  결제상태
                </p>
              </div>
              <div className="flex flex-1 items-start relative shrink-0">
                <p className="font-semibold leading-[12px] relative shrink-0 text-[8px] text-black text-right">
                  주문일시
                </p>
              </div>
              <div className="flex items-center justify-center relative shrink-0 w-[15px] h-[15px]" />
            </div>
          </div>

          {/* 주문 행들 (더미데이터 제외, 구조만 구현) */}
          <div className="flex flex-col items-start relative shrink-0 w-full">
            {/* 주문 행 구조 예시 */}
            <div className="border-b border-[#eeebe6] flex flex-col items-center justify-center relative shrink-0 w-full">
              <div className="flex items-center gap-[6px] relative shrink-0 w-full px-[16px] py-[8px]">
                <button
                  onClick={() => handleCheckboxClick(0)}
                  className="relative shrink-0 w-[24px] h-[24px] hover:opacity-80 transition-opacity"
                >
                  <div className="relative size-full">
                    <div className="absolute contents left-[2px] top-[2px]">
                      <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${selectedItems.includes(0) ? 'bg-[#2a2a2e]' : ''}`} />
                      {selectedItems.includes(0) && (
                        <div className="absolute flex inset-0 items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
                <div className="flex flex-1 items-center justify-center relative shrink-0 min-w-0">
                  <p className="font-normal leading-[12px] relative shrink-0 text-[8px] text-black truncate w-full text-center">
                    주문번호주문번호주문번호주문번호
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center relative shrink-0">
                  <p className="font-normal leading-[12px] relative shrink-0 text-[8px] text-black">
                    주문자
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center relative shrink-0">
                  <p className="font-normal leading-[12px] relative shrink-0 text-[8px] text-black">
                    옵션명
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center relative shrink-0">
                  <div className="bg-[#4caf50] flex h-[16px] items-center justify-center relative rounded-[8px] shrink-0 px-[4px]">
                    <p className="font-bold leading-[10px] relative shrink-0 text-[7px] text-white whitespace-nowrap">
                      결제 완료
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 items-start relative shrink-0">
                  <div className="flex flex-col items-end relative shrink-0 w-full">
                    <p className="font-normal leading-[12px] relative shrink-0 text-[8px] text-black">
                      날짜
                    </p>
                    <p className="font-normal leading-[12px] relative shrink-0 text-[8px] text-black">
                      시간
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleRowExpansion(0)}
                  className="flex items-center justify-center relative shrink-0 w-[15px] h-[15px] hover:opacity-80 transition-opacity"
                >
                  <div className={`flex-none transition-transform ${expandedRows.includes(0) ? 'rotate-180' : ''}`}>
                    <div className="relative size-[15px]">
                      <img alt="" className="block max-w-none size-full" src={imgArrowDown} />
                    </div>
                  </div>
                </button>
              </div>

              {/* 확장된 상세 정보 (더미데이터 제외) */}
              {expandedRows.includes(0) && (
                <div className="bg-white border-b border-[#eeebe6] flex flex-col gap-[8px] items-start p-[16px] relative shrink-0 w-full">
                  {/* 주문자 정보 */}
                  <div className="flex flex-col gap-[8px] items-start relative shrink-0">
                    <p className="font-bold leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                      주문자 정보
                    </p>
                    <div className="flex flex-col gap-[2px] items-start relative shrink-0">
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-black">
                        주문자명 (이메일)
                      </p>
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-black">
                        연락처
                      </p>
                    </div>
                  </div>

                  {/* 배송 정보 */}
                  <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                    <p className="font-bold leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                      배송 정보
                    </p>
                    <div className="grid grid-cols-2 gap-[8px] relative shrink-0 w-full">
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                        받는 분
                      </p>
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                        이름
                      </p>
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                        배송지
                      </p>
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                        주소
                      </p>
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                        연락처
                      </p>
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                        전화번호
                      </p>
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                        송장번호
                      </p>
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                        번호
                      </p>
                    </div>
                  </div>

                  {/* 결제 정보 */}
                  <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                    <p className="font-bold leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                      결제 정보
                    </p>
                    <div className="grid grid-cols-2 gap-[8px] relative shrink-0 w-full">
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                        결제 방식
                      </p>
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                        결제수단
                      </p>
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                        결제 금액
                      </p>
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                        금액
                      </p>
                    </div>
                  </div>

                  {/* 주문 상품 */}
                  <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                    <p className="font-bold leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                      주문 상품
                    </p>
                    <div className="grid grid-cols-2 gap-[8px] relative shrink-0 w-full">
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                        상품명
                      </p>
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                        상품명
                      </p>
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                        옵션명
                      </p>
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                        옵션
                      </p>
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                        수량
                      </p>
                      <p className="font-normal leading-[15px] relative shrink-0 text-[10px] text-[#0a0a0a]">
                        수량
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 액션 바 */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#fd6f22] flex flex-col items-start px-[16px] py-[16px] rounded-tl-[16px] rounded-tr-[16px] shadow-[0px_-4px_10px_0px_rgba(99,81,73,0.2)] shrink-0 w-full z-[100]">
          <div className="flex items-center justify-between relative shrink-0 w-full">
            <p className="font-bold leading-[22.5px] relative shrink-0 text-[15px] text-white">
              {selectedItems.length}개 선택됨
            </p>
            <div className="flex h-[36px] items-center gap-[8px] relative shrink-0">
              <button className="bg-white h-[36px] relative rounded-[8px] shrink-0 px-[16px] hover:opacity-80 transition-opacity">
                <p className="font-semibold leading-[19.5px] relative shrink-0 text-[#fd6f22] text-[13px] text-center">
                  내보내기
                </p>
              </button>
              <button className="bg-white h-[36px] relative rounded-[8px] shrink-0 px-[16px] hover:opacity-80 transition-opacity">
                <p className="font-semibold leading-[19.5px] relative shrink-0 text-[#fd6f22] text-[13px] text-center">
                  결제 취소
                </p>
              </button>
              <button className="bg-[#1a1918] h-[36px] relative rounded-[8px] shrink-0 px-[16px] hover:opacity-80 transition-opacity">
                <p className="font-semibold leading-[19.5px] relative shrink-0 text-[13px] text-center text-white">
                  결제 승인
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

