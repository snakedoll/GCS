'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/6ae5093c-456d-4738-a160-02e67ab9f3ec";
const imgRightArrow = "https://www.figma.com/api/mcp/asset/f2e58e3e-dd17-4a61-92ad-f17c11d033cf";
const imgSearchIcon = "https://www.figma.com/api/mcp/asset/3ddbb44f-9425-45f5-b5be-524faba3baae";
const imgCheckFilled = "https://www.figma.com/api/mcp/asset/e67163e8-8442-4256-9daa-ef5e2d9114c6";
const imgCheckLight = "https://www.figma.com/api/mcp/asset/44d57802-709d-46d3-841e-d8c89da1b48f";
const imgToggleSwitch = "https://www.figma.com/api/mcp/asset/4186ee0d-119c-4d16-90f1-dfd9679113fc";
const imgLikeOff = "https://www.figma.com/api/mcp/asset/9ec2b644-2c69-4fa5-bb26-c2e4e6f6ed6d";

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
        상품카드 관리
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

function LsiconRightFilled({ className }: { className?: string }) {
  return (
    <div className={`relative shrink-0 w-[24px] h-[24px] ${className}`}>
      <div className="absolute inset-[25.91%_36.2%_25.91%_35.29%]">
        <img alt="" className="block max-w-none size-full" src={imgRightArrow} />
      </div>
    </div>
  );
}

export default function ItemCardManagePage() {
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

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

  return (
    <div className="bg-[#f8f6f4] flex flex-col items-center relative w-full min-h-screen">
      {/* Nav Bar */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[31px] items-center relative shrink-0 w-full px-[16px] pb-[100px] pt-[20px]">
        {/* 상품 등록 요청 */}
        <Link href="/registerAskedItem" className="bg-[#eeebe6] flex h-[40px] items-center px-[20px] py-[12px] relative rounded-[12px] shrink-0 w-full max-w-[344px] hover:opacity-80 transition-opacity">
          <div className="flex flex-1 items-center justify-between relative shrink-0">
            <div className="flex gap-[4px] items-center relative shrink-0">
              <p className="font-normal leading-[1.5] relative shrink-0 text-[15px] text-black">
                상품 등록 요청
              </p>
              <p className="font-bold leading-[1.5] relative shrink-0 text-[15px] text-[#fd6f22]">
                2
              </p>
            </div>
            <LsiconRightFilled />
          </div>
        </Link>

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
                    placeholder="상품명, 판매팀 검색..."
                    className="bg-transparent border-0 w-full h-full text-[13px] text-[#85817e] placeholder:text-[#85817e] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 필터 버튼들 */}
            <div className="flex gap-[6px] items-center relative shrink-0">
              {['전체', 'Fund', 'Partner up', '공개', '비공개'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterClick(filter)}
                  className={`flex items-center justify-center px-[12px] py-[9px] relative rounded-[8px] shrink-0 transition-colors ${
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

        {/* 상품 카드 리스트 */}
        <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full max-w-[344px]">
          {/* 상품 카드 구조만 구현 (더미데이터 제외) */}
          <div className="bg-[#eeebe6] flex flex-col gap-[9px] items-center px-0 py-[20px] relative rounded-[12px] shrink-0 w-full">
            <div className="flex items-start justify-between relative shrink-0 w-[318px]">
              {/* 체크박스 */}
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

              {/* 공개 토글 */}
              <div className="flex gap-[4px] items-center relative shrink-0">
                <p className="font-normal leading-[1.5] relative shrink-0 text-[10px] text-[#5f5a58]">
                  공개
                </p>
                <div className="bg-[#fd6f22] flex items-center justify-end p-[2px] relative rounded-[252px] shrink-0 w-[38px]">
                  <div className="relative shrink-0 w-[14px] h-[14px]">
                    <img alt="" className="block max-w-none size-full" src={imgToggleSwitch} />
                  </div>
                </div>
              </div>
            </div>

            {/* 상품 카드 내용 구조 (더미데이터 제외) */}
            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-[315px]">
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
                  <div className="bg-[#fd6f22] flex h-[19px] items-center justify-center px-[4px] py-[2px] relative rounded-[4px] shrink-0 w-full">
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

            {/* 액션 버튼들 */}
            <div className="flex gap-[12px] h-[36px] items-start justify-center relative shrink-0 w-[318px]">
              <Link href="/admin/itemCardManage/itemOrderHistory" className="bg-[#fd6f22] flex flex-1 items-start justify-center px-0 py-[8px] relative rounded-[4px] shrink-0 hover:opacity-80 transition-opacity">
                <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#f8f6f4] text-center tracking-[-0.26px]">
                  주문 내역
                </p>
              </Link>
              <button className="bg-[#f8f6f4] flex flex-1 items-start justify-center px-[4px] py-[8px] relative rounded-[4px] shrink-0 hover:opacity-80 transition-opacity">
                <p className="font-bold leading-[1.5] relative shrink-0 text-[#1a1918] text-[13px] text-center tracking-[-0.26px]">
                  상품 수정
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 액션 바 */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#fd6f22] flex items-center justify-between pb-[14px] pt-[16px] px-[16px] rounded-tl-[16px] rounded-tr-[16px] shadow-[0px_-2px_10px_0px_rgba(0,0,0,0.1)] w-full z-[100]">
          <p className="font-bold leading-[22.5px] relative shrink-0 text-[15px] text-white">
            {selectedItems.length}개 선택됨
          </p>
          <div className="h-[36px] relative shrink-0">
            <button className="bg-[#443e3c] h-[36px] relative rounded-[8px] shrink-0 px-[16px] hover:opacity-80 transition-opacity">
              <p className="font-bold leading-[19.5px] relative shrink-0 text-[13px] text-center text-white">
                삭제
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

