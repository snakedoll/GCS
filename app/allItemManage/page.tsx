'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/98b9d2cd-e951-4842-b225-d38d427944ec";
const imgSearchIcon = "https://www.figma.com/api/mcp/asset/24f3fb5f-95aa-4a8b-98a2-7d1d2ac9ac6d";
const imgCheckLight = "https://www.figma.com/api/mcp/asset/658aa656-3e52-49c1-b918-454251577638";

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
        전체 품목 관리
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

export default function AllItemManagePage() {
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

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

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
      setIsAllSelected(false);
    } else {
      // 실제 데이터가 있을 때는 모든 항목의 인덱스를 추가
      setSelectedItems([0, 1, 2, 3]); // 예시
      setIsAllSelected(true);
    }
  };

  return (
    <div className="bg-[#f8f6f4] flex flex-col gap-[16px] items-center relative w-full min-h-screen">
      {/* Nav Bar */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[16px] items-center relative shrink-0 w-full px-[16px] pb-[100px]">
        {/* 검색 및 필터 */}
        <div className="bg-white flex flex-col items-start px-[16px] py-[15px] relative rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] shrink-0 w-full max-w-[344px]">
          <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
            {/* 검색 바 */}
            <div className="bg-[#f8f6f4] h-[32px] relative rounded-[8px] shrink-0 w-full">
              <div className="flex gap-[8px] items-center px-[16px] py-0 relative size-full">
                <div className="relative shrink-0 w-[16px] h-[16px]">
                  <img alt="" className="block max-w-none size-full" src={imgSearchIcon} />
                </div>
                <div className="flex-1 h-[18px] relative shrink-0">
                  <input
                    type="text"
                    placeholder="상품번호, 상품명 등 검색..."
                    className="bg-transparent border-0 w-full h-full text-[13px] text-[#85817e] placeholder:text-[#85817e] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 필터 버튼들 */}
            <div className="flex gap-[6px] items-center relative shrink-0">
              {['전체', 'Fund', 'Partner up', '판매 중', '품절'].map((filter) => (
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
        <div className="flex flex-col items-start relative shrink-0 w-full max-w-[344px] self-start">
          <p className="font-semibold leading-[15px] relative shrink-0 text-[12px] text-black">
            전체 12건
          </p>
        </div>

        {/* 상품 목록 테이블 */}
        <div className="bg-white flex flex-col items-start overflow-clip relative rounded-[12px] shrink-0 w-full max-w-[344px]">
          {/* 테이블 헤더 */}
          <div className="bg-[#eeebe6] border-b border-[#eeebe6] flex h-[47px] items-center relative shrink-0 w-full px-[12px]">
            <div className="flex gap-[2px] items-center relative shrink-0 flex-1">
              <button
                onClick={handleSelectAll}
                className="relative shrink-0 w-[24px] h-[24px] hover:opacity-80 transition-opacity"
              >
                <div className="relative size-full">
                  <div className="absolute contents left-[2px] top-[2px]">
                    <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${isAllSelected ? 'bg-[#2a2a2e]' : ''}`} />
                    {isAllSelected && (
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
              <div className="flex flex-1 items-center relative shrink-0">
                <p className="font-semibold leading-[14px] relative shrink-0 text-[9px] text-black">
                  상품번호
                </p>
              </div>
              <div className="flex flex-1 items-center relative shrink-0">
                <p className="font-semibold leading-[14px] relative shrink-0 text-[9px] text-black">
                  판매방식
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center relative shrink-0">
                <p className="font-semibold leading-[14px] relative shrink-0 text-[9px] text-black">
                  상품명
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center relative shrink-0">
                <p className="font-semibold leading-[14px] relative shrink-0 text-[9px] text-black">
                  옵션명
                </p>
              </div>
              <div className="flex flex-1 items-center relative shrink-0">
                <p className="font-semibold leading-[14px] relative shrink-0 text-[9px] text-black">
                  가격
                </p>
              </div>
              <div className="flex flex-1 items-center relative shrink-0">
                <p className="font-semibold leading-[14px] relative shrink-0 text-[9px] text-black">
                  판매여부
                </p>
              </div>
            </div>
          </div>

          {/* 상품 행들 (더미데이터 제외, 구조만 구현) */}
          <div className="flex flex-col items-start relative shrink-0 w-full">
            {/* 상품 행 구조 예시 */}
            <div className="border-b border-[#eeebe6] flex items-center justify-center relative shrink-0 w-full px-[12px] py-[8px]">
              <div className="flex gap-[2px] items-center relative shrink-0 flex-1">
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
                <div className="flex flex-1 items-start overflow-hidden relative shrink-0 min-w-0">
                  <p className="font-normal leading-[14px] relative shrink-0 text-[9px] text-black truncate">
                    상품번호
                  </p>
                </div>
                <div className="flex flex-1 items-start overflow-hidden relative shrink-0">
                  <p className="font-normal leading-[14px] relative shrink-0 text-[9px] text-black">
                    판매방식
                  </p>
                </div>
                <div className="flex flex-1 items-start overflow-hidden relative shrink-0">
                  <p className="font-normal leading-[14px] relative shrink-0 text-[9px] text-black">
                    상품명
                  </p>
                </div>
                <div className="flex flex-1 items-start overflow-hidden relative shrink-0">
                  <p className="font-normal leading-[14px] relative shrink-0 text-[9px] text-black">
                    옵션명
                  </p>
                </div>
                <div className="flex flex-1 items-start overflow-hidden relative shrink-0">
                  <p className="font-normal leading-[14px] relative shrink-0 text-[9px] text-black">
                    가격
                  </p>
                </div>
                <div className="flex flex-1 items-start overflow-hidden relative shrink-0">
                  <div className="bg-[#4caf50] flex h-[19px] items-center justify-center relative rounded-[9px] shrink-0 px-[4px]">
                    <p className="font-bold leading-[12px] relative shrink-0 text-[8px] text-white whitespace-nowrap">
                      판매 중
                    </p>
                  </div>
                </div>
              </div>
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
            <div className="flex h-[36px] items-center relative shrink-0">
              <button className="bg-white h-[36px] relative rounded-[8px] shrink-0 px-[16px] hover:opacity-80 transition-opacity">
                <p className="font-semibold leading-[19.5px] relative shrink-0 text-[#fd6f22] text-[13px] text-center">
                  내보내기
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

