'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/a3ef8e66-e2df-4106-ba5f-cc5a4b66dc3a";
const imgReviewCountIcon = "https://www.figma.com/api/mcp/asset/a6a2ec96-c4b9-4eed-9dfc-c4715f351245";
const imgRatingIcon = "https://www.figma.com/api/mcp/asset/332aee08-73d0-4919-b983-b3cc130106ce";
const imgArrowDown = "https://www.figma.com/api/mcp/asset/1aae10bd-e606-4f17-8660-84974bae4ce4";
const imgStarFilled = "https://www.figma.com/api/mcp/asset/3ea0d79c-a760-4dce-b858-61760a437777";
const imgStarEmpty = "https://www.figma.com/api/mcp/asset/094c43a5-09fb-4da3-80ef-4e2e00219c84";

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
        리뷰 관리
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

export default function ReviewsPage() {
  const [selectedTab, setSelectedTab] = useState<'recent' | 'byProduct'>('recent');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex gap-[2px] items-start relative shrink-0">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="relative shrink-0 w-[13px] h-[13px]">
            <img 
              alt="" 
              className="block max-w-none size-full" 
              src={star <= rating ? imgStarFilled : imgStarEmpty} 
            />
          </div>
        ))}
      </div>
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
      <div className="flex flex-col gap-[16px] items-center px-[16px] py-[16px] relative shrink-0 w-full pb-[100px]">
        {/* 탭 버튼 */}
        <div className="flex gap-[8px] items-start relative shrink-0 w-full max-w-[344px]">
          <button
            onClick={() => setSelectedTab('recent')}
            className={`flex-1 h-[41px] relative rounded-[8px] shrink-0 transition-colors ${
              selectedTab === 'recent'
                ? 'bg-[#fd6f22]'
                : 'bg-white'
            }`}
          >
            <p className={`font-normal leading-[19px] relative shrink-0 text-[12px] text-center ${
              selectedTab === 'recent'
                ? 'text-white'
                : 'text-[#85817e]'
            }`}>
              최근 후기
            </p>
          </button>
          <button
            onClick={() => setSelectedTab('byProduct')}
            className={`flex-1 h-[41px] relative rounded-[8px] shrink-0 transition-colors ${
              selectedTab === 'byProduct'
                ? 'bg-[#fd6f22]'
                : 'bg-white'
            }`}
          >
            <p className={`font-normal leading-[19px] relative shrink-0 text-[12px] text-center ${
              selectedTab === 'byProduct'
                ? 'text-white'
                : 'text-[#85817e]'
            }`}>
              상품별 보기
            </p>
          </button>
        </div>

        {/* 통계 카드 */}
        <div className="flex gap-[8px] items-center relative shrink-0 w-full max-w-[344px]">
          {/* 후기 수 */}
          <div className="bg-white flex flex-1 flex-col items-start p-[16px] relative rounded-[12px] shrink-0">
            <div className="flex gap-[8px] items-center relative shrink-0 w-full">
              <div className="bg-[#fff5f0] relative rounded-[8px] shrink-0 w-[31px] h-[31px] flex items-center justify-center">
                <div className="relative shrink-0 w-[15px] h-[15px]">
                  <img alt="" className="block max-w-none size-full" src={imgReviewCountIcon} />
                </div>
              </div>
              <div className="flex flex-col items-start relative shrink-0">
                <p className="font-normal leading-[16px] relative shrink-0 text-[#85817e] text-[10px]">
                  후기 수
                </p>
                <p className="font-normal leading-[29px] relative shrink-0 text-[#1a1918] text-[19px]">
                  {selectedTab === 'recent' || selectedProduct ? '3' : '-'}
                </p>
              </div>
            </div>
          </div>

          {/* 평균 평점 */}
          <div className="bg-white flex flex-1 flex-col items-start p-[16px] relative rounded-[12px] shrink-0">
            <div className="flex gap-[8px] items-center relative shrink-0 w-full">
              <div className="bg-[#fff5f0] relative rounded-[8px] shrink-0 w-[31px] h-[31px] flex items-center justify-center">
                <div className="relative shrink-0 w-[15px] h-[15px]">
                  <img alt="" className="block max-w-none size-full" src={imgRatingIcon} />
                </div>
              </div>
              <div className="flex flex-col items-start relative shrink-0">
                <p className="font-normal leading-[16px] relative shrink-0 text-[#85817e] text-[10px]">
                  평균 평점
                </p>
                <p className="font-normal leading-[29px] relative shrink-0 text-[#1a1918] text-[19px]">
                  {selectedTab === 'recent' || selectedProduct ? '4.7' : '-'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 평점 분포 차트 */}
        <div className="bg-white flex flex-col gap-[15px] items-start p-[16px] relative rounded-[12px] shrink-0 w-full max-w-[344px]">
          <p className="font-normal leading-[21px] relative shrink-0 text-[#1a1918] text-[14px]">
            평점 분포
          </p>
          <div className="h-[143px] relative shrink-0 w-full">
            {/* 차트 영역 (더미데이터 제외, 구조만 구현) */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="font-normal text-[#85817e] text-[12px]">
                {selectedTab === 'recent' || selectedProduct ? '평점 분포 차트' : '평점 분포 차트'}
              </p>
            </div>
          </div>
        </div>

        {/* 상품 선택 버튼 (상품별 보기 탭일 때만 표시) */}
        {selectedTab === 'byProduct' && (
          <button
            onClick={() => {
              // 상품 선택 로직 (더미데이터 제외)
              setSelectedProduct('슈링클스 키링 DIY 키트');
            }}
            className="bg-white border border-[#e5e5e5] border-solid flex h-[43px] items-center justify-between px-[16px] py-[1px] relative rounded-[8px] shrink-0 w-full max-w-[344px] hover:opacity-80 transition-opacity"
          >
            <p className={`font-normal leading-[19px] relative shrink-0 text-[12px] ${
              selectedProduct ? 'text-[#1a1918]' : 'text-[#85817e]'
            }`}>
              {selectedProduct || '상품을 선택해주세요'}
            </p>
            <div className="relative shrink-0 w-[15px] h-[15px]">
              <img alt="" className="block max-w-none size-full" src={imgArrowDown} />
            </div>
          </button>
        )}

        {/* 내보내기 버튼 (상품 선택 후에만 표시) */}
        {selectedTab === 'byProduct' && selectedProduct && (
          <div className="flex flex-col items-end relative shrink-0 w-full max-w-[344px]">
            <button className="bg-[#fd6f22] flex items-center px-[10px] py-[7px] relative rounded-[8px] shrink-0 hover:opacity-80 transition-opacity">
              <p className="font-normal leading-[17px] relative shrink-0 text-[11px] text-center text-white">
                내보내기
              </p>
            </button>
          </div>
        )}

        {/* 리뷰 목록 */}
        {selectedTab === 'recent' || (selectedTab === 'byProduct' && selectedProduct) ? (
          <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full max-w-[344px]">
            {/* 리뷰 카드 구조 (더미데이터 제외) */}
            <div className="bg-white flex flex-col gap-[8px] items-start p-[16px] relative rounded-[12px] shrink-0 w-full">
              <div className="flex items-start relative shrink-0 w-full">
                <div className="flex flex-col gap-[2px] items-start relative shrink-0 flex-1">
                  <p className="font-normal leading-[19px] relative shrink-0 text-[#1a1918] text-[12px]">
                    작성자명
                  </p>
                  <p className="font-normal leading-[16px] relative shrink-0 text-[#85817e] text-[10px]">
                    상품명
                  </p>
                  <p className="font-normal leading-[14px] relative shrink-0 text-[#85817e] text-[10px]">
                    판매팀: 팀명
                  </p>
                  {renderStarRating(5)}
                </div>
                <p className="font-normal leading-[16px] relative shrink-0 text-[#85817e] text-[10px]">
                  날짜
                </p>
              </div>
              <div className="bg-[#f8f6f4] flex flex-col items-start p-[11px] relative rounded-[8px] shrink-0 w-full">
                <p className="font-normal leading-[20px] relative shrink-0 text-[#1a1918] text-[12px]">
                  리뷰 내용
                </p>
              </div>
            </div>
          </div>
        ) : selectedTab === 'byProduct' ? (
          /* 상품 미선택 상태 */
          <div className="flex flex-col gap-[8px] items-start relative rounded-[12px] shrink-0 w-full max-w-[344px]">
            <div className="bg-white h-[152px] relative rounded-[11px] shrink-0 w-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-[8px]">
                <p className="font-normal leading-[19px] relative shrink-0 text-[#85817e] text-[12px] text-center">
                  상품을 선택하여 후기를 확인하세요
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

