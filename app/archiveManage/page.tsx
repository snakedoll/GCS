'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/6ae5093c-456d-4738-a160-02e67ab9f3ec";
const imgVector = "https://www.figma.com/api/mcp/asset/9bd2059a-6437-4ebd-b644-7f51fd1b23e3";
const imgVector1 = "https://www.figma.com/api/mcp/asset/136bc8a2-559d-4ae4-a83c-687ed1e876b6";
const imgVector2 = "https://www.figma.com/api/mcp/asset/101041ec-309c-4176-9c77-378b39b4c181";
const imgIcon = "https://www.figma.com/api/mcp/asset/fc72ed7f-acfb-4c12-a28e-7047cee4424a";
const img = "https://www.figma.com/api/mcp/asset/80257c6f-3a16-4dfc-81a6-3137fd08c7f5";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/483e0cdf-734c-427c-adc5-e2467cf59f74";
const img1 = "https://www.figma.com/api/mcp/asset/b9bc9431-69dc-47bc-889b-d63ae57f21f5";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/2220f982-3a64-46ba-9dc7-679eeb65f0c6";

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
        글 관리
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

export default function ArchiveManagePage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'project' | 'news'>('project');
  
  // 드롭다운 상태 관리
  const [selectedYear, setSelectedYear] = useState('전체 연도');
  const [selectedCategory, setSelectedCategory] = useState('전체 카테고리');
  const [selectedSort, setSelectedSort] = useState('최신순');
  const [selectedVisibility, setSelectedVisibility] = useState('전체');
  
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);
  
  // 프로젝트 선택 상태 관리
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  
  const handleProjectToggle = (index: number) => {
    setSelectedProjects(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  
  const yearOptions = ['전체 연도', '2025', '2024', '2023'];
  const categoryOptions = ['전체 카테고리', '겨울 공모전', '여름 공모전', '캡스톤 디자인'];
  const sortOptions = ['최신순', '조회순'];
  const visibilityOptions = ['전체', '공개', '비공개'];
  
  // 외부 클릭 감지를 위한 ref
  const yearRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const visibilityRef = useRef<HTMLDivElement>(null);
  
  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearRef.current && !yearRef.current.contains(event.target as Node)) {
        setIsYearOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
      if (visibilityRef.current && !visibilityRef.current.contains(event.target as Node)) {
        setIsVisibilityOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative w-full min-h-screen">
      {/* Top */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* Tab Bar */}
      <div className="bg-[#f8f6f4] flex gap-[21px] h-[59px] items-center justify-center pb-[4px] pt-[12px] px-[20px] relative shrink-0 w-full">
        <button
          onClick={() => setSelectedTab('project')}
          className={`flex flex-1 h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 ${
            selectedTab === 'project'
              ? 'border-b border-[#1a1918] border-solid'
              : ''
          }`}
        >
          <p className={`font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px] ${
            selectedTab === 'project' ? 'text-[#1a1918]' : 'text-[#b7b3af]'
          }`}>
            Project
          </p>
        </button>
        <button
          onClick={() => setSelectedTab('news')}
          className={`flex flex-1 h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 ${
            selectedTab === 'news'
              ? 'border-b border-[#1a1918] border-solid'
              : ''
          }`}
        >
          <p className={`font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px] ${
            selectedTab === 'news' ? 'text-[#1a1918]' : 'text-[#b7b3af]'
          }`}>
            News
          </p>
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[16px] items-start px-[16px] pt-[16px] relative shrink-0 w-full pb-[100px]">
        {/* 요약 카드 2개 */}
        <div className="flex gap-[8px] items-start relative shrink-0 w-full">
          {/* 전체 프로젝트 / 전체 뉴스 */}
          <div className="bg-white flex-1 flex flex-col items-start pb-[11.44px] pt-[8px] px-[8px] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0">
            <div className="bg-[#fff5f0] flex items-center justify-center rounded-[10px] size-[32px] shrink-0">
              <div className="relative shrink-0 size-[16px]">
                <img alt="" className="block max-w-none size-full" src={imgVector} />
              </div>
            </div>
            <p className="font-normal leading-[16.5px] relative text-[#85817e] text-[11px] mt-[8px]">
              {selectedTab === 'news' ? '전체 뉴스' : '전체 프로젝트'}
            </p>
            <p className="font-normal leading-[28px] relative text-[#1a1918] text-[20px]">
              {selectedTab === 'news' ? '7' : '6'}
            </p>
          </div>

          {/* 총 조회수 */}
          <div className="bg-white flex-1 flex flex-col items-start pb-[11.44px] pt-[8px] px-[8px] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0">
            <div className="bg-[#fff5f0] flex items-center justify-center rounded-[10px] size-[32px] shrink-0">
              <div className="relative shrink-0 size-[16px]">
                <img alt="" className="block max-w-none size-full" src={imgVector1} />
              </div>
            </div>
            <p className="font-normal leading-[16.5px] relative text-[#85817e] text-[11px] mt-[8px]">
              총 조회수
            </p>
            <p className="font-normal leading-[28px] relative text-[#1a1918] text-[20px]">
              {selectedTab === 'news' ? '1839' : '2169'}
            </p>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          {/* 검색 바 */}
          <div className="bg-white border border-[rgba(0,0,0,0)] border-solid h-[36px] relative rounded-[8px] shrink-0 w-full">
            <div className="flex items-center overflow-clip px-[12px] py-[4px] relative size-full">
              <p className="font-normal leading-[normal] relative shrink-0 text-[#717182] text-[11px] tracking-[-0.3125px]">
                팀명, 제목으로 검색...
              </p>
            </div>
          </div>

          {/* 필터 드롭다운들 */}
          <div className="flex gap-[8px] items-start relative shrink-0 w-full">
            {/* 전체 연도 */}
            <div ref={yearRef} className="relative flex-1 shrink-0">
              <button
                onClick={() => setIsYearOpen(!isYearOpen)}
                className="bg-white border border-[rgba(0,0,0,0)] border-solid flex items-center justify-between px-[13.56px] py-[10.56px] relative rounded-[8px] shrink-0 w-full"
              >
                <p className="font-normal leading-[16px] relative shrink-0 text-[#0a0a0a] text-[12px] text-center">
                  {selectedYear}
                </p>
                <div className={`relative shrink-0 size-[16px] transition-transform ${isYearOpen ? 'rotate-180' : ''}`}>
                  <img alt="" className="block max-w-none size-full" src={imgIcon} />
                </div>
              </button>
              {isYearOpen && (
                <div className="absolute bg-white border border-[rgba(0,0,0,0.1)] border-solid flex flex-col items-start mt-[4px] rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] w-full z-50">
                  {yearOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedYear(option);
                        setIsYearOpen(false);
                      }}
                      className={`w-full px-[13.56px] py-[10.56px] text-left hover:bg-[#f8f6f4] transition-colors ${
                        selectedYear === option ? 'bg-[#fff5f0]' : ''
                      }`}
                    >
                      <p className="font-normal leading-[16px] relative text-[#0a0a0a] text-[12px]">
                        {option}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 전체 카테고리 */}
            <div ref={categoryRef} className="relative flex-1 shrink-0">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="bg-white border border-[rgba(0,0,0,0)] border-solid flex items-center justify-between px-[12.56px] py-[10.56px] relative rounded-[8px] shrink-0 w-full"
              >
                <p className="font-normal leading-[16px] relative shrink-0 text-[#0a0a0a] text-[12px] text-center">
                  {selectedCategory}
                </p>
                <div className={`relative shrink-0 size-[16px] transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}>
                  <img alt="" className="block max-w-none size-full" src={imgIcon} />
                </div>
              </button>
              {isCategoryOpen && (
                <div className="absolute bg-white border border-[rgba(0,0,0,0.1)] border-solid flex flex-col items-start mt-[4px] rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] w-full z-50">
                  {categoryOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedCategory(option);
                        setIsCategoryOpen(false);
                      }}
                      className={`w-full px-[12.56px] py-[10.56px] text-left hover:bg-[#f8f6f4] transition-colors ${
                        selectedCategory === option ? 'bg-[#fff5f0]' : ''
                      }`}
                    >
                      <p className="font-normal leading-[16px] relative text-[#0a0a0a] text-[12px]">
                        {option}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-[8px] items-start relative shrink-0 w-full">
            {/* 최신순 */}
            <div ref={sortRef} className="relative flex-1 shrink-0">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="bg-white border border-[rgba(0,0,0,0)] border-solid flex items-center justify-between px-[13.56px] py-[10.56px] relative rounded-[8px] shrink-0 w-full"
              >
                <p className="font-normal leading-[16px] relative shrink-0 text-[#0a0a0a] text-[12px] text-center">
                  {selectedSort}
                </p>
                <div className={`relative shrink-0 size-[16px] transition-transform ${isSortOpen ? 'rotate-180' : ''}`}>
                  <img alt="" className="block max-w-none size-full" src={imgIcon} />
                </div>
              </button>
              {isSortOpen && (
                <div className="absolute bg-white border border-[rgba(0,0,0,0.1)] border-solid flex flex-col items-start mt-[4px] rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] w-full z-50">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedSort(option);
                        setIsSortOpen(false);
                      }}
                      className={`w-full px-[13.56px] py-[10.56px] text-left hover:bg-[#f8f6f4] transition-colors ${
                        selectedSort === option ? 'bg-[#fff5f0]' : ''
                      }`}
                    >
                      <p className="font-normal leading-[16px] relative text-[#0a0a0a] text-[12px]">
                        {option}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 전체 */}
            <div ref={visibilityRef} className="relative flex-1 shrink-0">
              <button
                onClick={() => setIsVisibilityOpen(!isVisibilityOpen)}
                className="bg-white border border-[rgba(0,0,0,0)] border-solid flex items-center justify-between px-[12.56px] py-[10.56px] relative rounded-[8px] shrink-0 w-full"
              >
                <p className="font-normal leading-[16px] relative shrink-0 text-[#0a0a0a] text-[12px] text-center">
                  {selectedVisibility}
                </p>
                <div className={`relative shrink-0 size-[16px] transition-transform ${isVisibilityOpen ? 'rotate-180' : ''}`}>
                  <img alt="" className="block max-w-none size-full" src={imgIcon} />
                </div>
              </button>
              {isVisibilityOpen && (
                <div className="absolute bg-white border border-[rgba(0,0,0,0.1)] border-solid flex flex-col items-start mt-[4px] rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] w-full z-50">
                  {visibilityOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedVisibility(option);
                        setIsVisibilityOpen(false);
                      }}
                      className={`w-full px-[12.56px] py-[10.56px] text-left hover:bg-[#f8f6f4] transition-colors ${
                        selectedVisibility === option ? 'bg-[#fff5f0]' : ''
                      }`}
                    >
                      <p className="font-normal leading-[16px] relative text-[#0a0a0a] text-[12px]">
                        {option}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 프로젝트 리스트 */}
        {selectedTab === 'project' && (
          <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
            {/* 프로젝트 카드 1 */}
            <div className="bg-white h-[179px] flex flex-col relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full">
              <div className="flex items-start justify-between px-[16px] pt-[16px] relative w-full">
                <button
                  onClick={() => handleProjectToggle(0)}
                  className="relative shrink-0 size-[24px] cursor-pointer"
                >
                  <div className="absolute contents left-[2px] top-[2px]">
                    <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${selectedProjects.includes(0) ? 'bg-[#2a2a2e]' : ''}`} />
                    {selectedProjects.includes(0) && (
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
                </button>
                <div className="h-[18px] relative shrink-0 w-[35px]">
                  <div className="absolute bg-[#fd6f22] flex h-[18px] items-center justify-end left-0 p-[2px] rounded-[251.6px] top-0 w-[35px]">
                    <div className="relative shrink-0 size-[14.36px]">
                      <img alt="" className="block max-w-none size-full" src={img} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-[16px] pt-[14px] relative w-full">
                <p className="font-normal leading-[16px] relative shrink-0 text-[#85817e] text-[12px]">
                  여명
                </p>
                <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                  2025.12.17 13:13
                </p>
              </div>
              <div className="h-[20.62px] px-[16px] pt-[8px] relative shrink-0 w-full">
                <p className="font-normal leading-[20.625px] relative text-[#1a1918] text-[15px] tracking-[-0.2344px]">
                  슈링클스 키링 DIY 키트
                </p>
              </div>
              <div className="h-[20.1px] px-[16px] pt-[12px] relative shrink-0 w-full">
                <div className="flex gap-[8px] items-center relative shrink-0">
                  <div className="bg-[#e8f4ff] border border-[rgba(0,0,0,0)] border-solid flex items-center justify-center overflow-clip px-[8.56px] py-[2.56px] rounded-[8px] shrink-0">
                    <p className="font-medium leading-[15px] relative shrink-0 text-[#06c] text-[10px] tracking-[0.1172px]">
                      겨울공모전
                    </p>
                  </div>
                  <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                    2025
                  </p>
                  <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                    •
                  </p>
                  <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                    조회수 304
                  </p>
                </div>
              </div>
              <div className="bg-white border border-[#e8e4df] border-solid h-[32px] px-[16px] flex items-center justify-center relative rounded-[8px] shrink-0 w-[90%] mx-auto mt-auto mb-[16px]">
                <div className="relative shrink-0 size-[12px] mr-[4px]">
                  <img alt="" className="block max-w-none size-full" src={imgIcon1} />
                </div>
                <p className="font-medium leading-[16px] relative shrink-0 text-[#85817e] text-[12px] text-center">
                  수정하기
                </p>
              </div>
            </div>

            {/* 프로젝트 카드 2 */}
            <div className="bg-white h-[179px] flex flex-col relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full">
              <div className="flex items-start justify-between px-[16px] pt-[16px] relative w-full">
                <button
                  onClick={() => handleProjectToggle(1)}
                  className="relative shrink-0 size-[24px] cursor-pointer"
                >
                  <div className="absolute contents left-[2px] top-[2px]">
                    <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${selectedProjects.includes(1) ? 'bg-[#2a2a2e]' : ''}`} />
                    {selectedProjects.includes(1) && (
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
                </button>
                <div className="h-[18px] relative shrink-0 w-[35px]">
                  <div className="absolute bg-[#fd6f22] flex h-[18px] items-center justify-end left-0 p-[2px] rounded-[251.6px] top-0 w-[35px]">
                    <div className="relative shrink-0 size-[14.36px]">
                      <img alt="" className="block max-w-none size-full" src={img} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-[16px] pt-[14px] relative w-full">
                <p className="font-normal leading-[16px] relative shrink-0 text-[#85817e] text-[12px]">
                  유랑
                </p>
                <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                  2025.12.15 10:20
                </p>
              </div>
              <div className="h-[20.62px] px-[16px] pt-[8px] relative shrink-0 w-full">
                <p className="font-normal leading-[20.625px] relative text-[#1a1918] text-[15px] tracking-[-0.2344px]">
                  웹 연동형 NFC 키링
                </p>
              </div>
              <div className="h-[20.1px] px-[16px] pt-[12px] relative shrink-0 w-full">
                <div className="flex gap-[8px] items-center relative shrink-0">
                  <div className="bg-[#e8f4ff] border border-[rgba(0,0,0,0)] border-solid flex items-center justify-center overflow-clip px-[8.56px] py-[2.56px] rounded-[8px] shrink-0">
                    <p className="font-medium leading-[15px] relative shrink-0 text-[#06c] text-[10px] tracking-[0.1172px]">
                      겨울공모전
                    </p>
                  </div>
                  <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                    2025
                  </p>
                  <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                    •
                  </p>
                  <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                    조회수 456
                  </p>
                </div>
              </div>
              <div className="bg-white border border-[#e8e4df] border-solid h-[32px] px-[16px] flex items-center justify-center relative rounded-[8px] shrink-0 w-[90%] mx-auto mt-auto mb-[16px]">
                <div className="relative shrink-0 size-[12px] mr-[4px]">
                  <img alt="" className="block max-w-none size-full" src={imgIcon1} />
                </div>
                <p className="font-medium leading-[16px] relative shrink-0 text-[#85817e] text-[12px] text-center">
                  수정하기
                </p>
              </div>
            </div>

            {/* 프로젝트 카드 3 */}
            <div className="bg-white h-[179px] flex flex-col relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full">
              <div className="flex items-start justify-between px-[16px] pt-[16px] relative w-full">
                <button
                  onClick={() => handleProjectToggle(2)}
                  className="relative shrink-0 size-[24px] cursor-pointer"
                >
                  <div className="absolute contents left-[2px] top-[2px]">
                    <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${selectedProjects.includes(2) ? 'bg-[#2a2a2e]' : ''}`} />
                    {selectedProjects.includes(2) && (
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
                </button>
                <div className="h-[18px] relative shrink-0 w-[35px]">
                  <div className="absolute bg-[#fd6f22] flex h-[18px] items-center justify-end left-0 p-[2px] rounded-[251.6px] top-0 w-[35px]">
                    <div className="relative shrink-0 size-[14.36px]">
                      <img alt="" className="block max-w-none size-full" src={img} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-[16px] pt-[14px] relative w-full">
                <p className="font-normal leading-[16px] relative shrink-0 text-[#85817e] text-[12px]">
                  MUA
                </p>
                <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                  2025.12.10 14:30
                </p>
              </div>
              <div className="h-[20.62px] px-[16px] pt-[8px] relative shrink-0 w-full">
                <p className="font-normal leading-[20.625px] relative text-[#1a1918] text-[15px] tracking-[-0.2344px]">
                  불교 철학을 담은 어패럴 굿즈
                </p>
              </div>
              <div className="h-[20.1px] px-[16px] pt-[12px] relative shrink-0 w-full">
                <div className="flex gap-[8px] items-center relative shrink-0">
                  <div className="bg-[#fff5e6] border border-[rgba(0,0,0,0)] border-solid flex items-center justify-center overflow-clip px-[8.56px] py-[2.56px] rounded-[8px] shrink-0">
                    <p className="font-medium leading-[15px] relative shrink-0 text-[#ff8c00] text-[10px] tracking-[0.1172px]">
                      여름공모전
                    </p>
                  </div>
                  <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                    2025
                  </p>
                  <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                    •
                  </p>
                  <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                    조회수 230
                  </p>
                </div>
              </div>
              <div className="bg-white border border-[#e8e4df] border-solid h-[32px] px-[16px] flex items-center justify-center relative rounded-[8px] shrink-0 w-[90%] mx-auto mt-auto mb-[16px]">
                <div className="relative shrink-0 size-[12px] mr-[4px]">
                  <img alt="" className="block max-w-none size-full" src={imgIcon1} />
                </div>
                <p className="font-medium leading-[16px] relative shrink-0 text-[#85817e] text-[12px] text-center">
                  수정하기
                </p>
              </div>
            </div>

            {/* 프로젝트 카드 4 */}
            <div className="bg-white h-[179px] flex flex-col relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full">
              <div className="flex items-start justify-between px-[16px] pt-[16px] relative w-full">
                <button
                  onClick={() => handleProjectToggle(3)}
                  className="relative shrink-0 size-[24px] cursor-pointer"
                >
                  <div className="absolute contents left-[2px] top-[2px]">
                    <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${selectedProjects.includes(3) ? 'bg-[#2a2a2e]' : ''}`} />
                    {selectedProjects.includes(3) && (
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
                </button>
                <div className="h-[18px] relative shrink-0 w-[35px]">
                  <div className="absolute bg-[#fd6f22] flex h-[18px] items-center justify-end left-0 p-[2px] rounded-[251.6px] top-0 w-[35px]">
                    <div className="relative shrink-0 size-[14.36px]">
                      <img alt="" className="block max-w-none size-full" src={img} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-[16px] pt-[14px] relative w-full">
                <p className="font-normal leading-[16px] relative shrink-0 text-[#85817e] text-[12px]">
                  HUSH
                </p>
                <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                  2025.11.10 10:30
                </p>
              </div>
              <div className="h-[20.62px] px-[16px] pt-[8px] relative shrink-0 w-full">
                <p className="font-normal leading-[20.625px] relative text-[#1a1918] text-[15px] tracking-[-0.2344px]">
                  친환경 재사용 컵홀더〈HUSH eco cup holder〉
                </p>
              </div>
              <div className="h-[20.1px] px-[16px] pt-[12px] relative shrink-0 w-full">
                <div className="flex gap-[8px] items-center relative shrink-0">
                  <div className="bg-[#f3e8ff] border border-[rgba(0,0,0,0)] border-solid flex items-center justify-center overflow-clip px-[8.56px] py-[2.56px] rounded-[8px] shrink-0">
                    <p className="font-medium leading-[15px] relative shrink-0 text-[#8b5cf6] text-[10px] tracking-[0.1172px]">
                      캡스톤디자인
                    </p>
                  </div>
                  <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                    2024
                  </p>
                  <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                    •
                  </p>
                  <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                    조회수 389
                  </p>
                </div>
              </div>
              <div className="bg-white border border-[#e8e4df] border-solid h-[32px] px-[16px] flex items-center justify-center relative rounded-[8px] shrink-0 w-[90%] mx-auto mt-auto mb-[16px]">
                <div className="relative shrink-0 size-[12px] mr-[4px]">
                  <img alt="" className="block max-w-none size-full" src={imgIcon1} />
                </div>
                <p className="font-medium leading-[16px] relative shrink-0 text-[#85817e] text-[12px] text-center">
                  수정하기
                </p>
              </div>
            </div>

            {/* 프로젝트 카드 5 */}
            <div className="bg-white h-[179px] flex flex-col relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full">
              <div className="flex items-start justify-between px-[16px] pt-[16px] relative w-full">
                <button
                  onClick={() => handleProjectToggle(4)}
                  className="relative shrink-0 size-[24px] cursor-pointer"
                >
                  <div className="absolute contents left-[2px] top-[2px]">
                    <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${selectedProjects.includes(4) ? 'bg-[#2a2a2e]' : ''}`} />
                    {selectedProjects.includes(4) && (
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
                </button>
                <div className="h-[18px] relative shrink-0 w-[35px]">
                  <div className="absolute bg-[#afafaf] flex h-[18px] items-center left-0 p-[2px] rounded-[251.6px] top-0 w-[35px]">
                    <div className="relative shrink-0 size-[14.36px]">
                      <img alt="" className="block max-w-none size-full" src={img} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-[16px] pt-[14px] relative w-full">
                <p className="font-normal leading-[16px] relative shrink-0 text-[#85817e] text-[12px]">
                  KITTY
                </p>
                <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                  2025.11.05 16:45
                </p>
              </div>
              <div className="h-[20.62px] px-[16px] pt-[8px] relative shrink-0 w-full">
                <p className="font-normal leading-[20.625px] relative text-[#1a1918] text-[15px] tracking-[-0.2344px]">
                  아코 키링
                </p>
              </div>
              <div className="h-[20.1px] px-[16px] pt-[12px] relative shrink-0 w-full">
                <div className="flex gap-[8px] items-center relative shrink-0">
                  <div className="bg-[#fff5e6] border border-[rgba(0,0,0,0)] border-solid flex items-center justify-center overflow-clip px-[8.56px] py-[2.56px] rounded-[8px] shrink-0">
                    <p className="font-medium leading-[15px] relative shrink-0 text-[#ff8c00] text-[10px] tracking-[0.1172px]">
                      여름공모전
                    </p>
                  </div>
                  <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                    2024
                  </p>
                  <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                    •
                  </p>
                  <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                    조회수 278
                  </p>
                </div>
              </div>
              <div className="bg-white border border-[#e8e4df] border-solid h-[32px] px-[16px] flex items-center justify-center relative rounded-[8px] shrink-0 w-[90%] mx-auto mt-auto mb-[16px]">
                <div className="relative shrink-0 size-[12px] mr-[4px]">
                  <img alt="" className="block max-w-none size-full" src={imgIcon1} />
                </div>
                <p className="font-medium leading-[16px] relative shrink-0 text-[#85817e] text-[12px] text-center">
                  수정하기
                </p>
              </div>
            </div>

            {/* 프로젝트 카드 6 */}
            <div className="bg-white h-[179px] flex flex-col relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full">
              <div className="flex items-start justify-between px-[16px] pt-[16px] relative w-full">
                <button
                  onClick={() => handleProjectToggle(5)}
                  className="relative shrink-0 size-[24px] cursor-pointer"
                >
                  <div className="absolute contents left-[2px] top-[2px]">
                    <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${selectedProjects.includes(5) ? 'bg-[#2a2a2e]' : ''}`} />
                    {selectedProjects.includes(5) && (
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
                </button>
                <div className="h-[18px] relative shrink-0 w-[35px]">
                  <div className="absolute bg-[#fd6f22] flex h-[18px] items-center justify-end left-0 p-[2px] rounded-[251.6px] top-0 w-[35px]">
                    <div className="relative shrink-0 size-[14.36px]">
                      <img alt="" className="block max-w-none size-full" src={img} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-[16px] pt-[14px] relative w-full">
                <p className="font-normal leading-[16px] relative shrink-0 text-[#85817e] text-[12px]">
                  KITTY
                </p>
                <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                  2025.10.28 09:15
                </p>
              </div>
              <div className="h-[20.62px] px-[16px] pt-[8px] relative shrink-0 w-full">
                <p className="font-normal leading-[20.625px] relative text-[#1a1918] text-[15px] tracking-[-0.2344px]">
                  동국 USB
                </p>
              </div>
              <div className="h-[20.1px] px-[16px] pt-[12px] relative shrink-0 w-full">
                <div className="flex gap-[8px] items-center relative shrink-0">
                  <div className="bg-[#e8f4ff] border border-[rgba(0,0,0,0)] border-solid flex items-center justify-center overflow-clip px-[8.56px] py-[2.56px] rounded-[8px] shrink-0">
                    <p className="font-medium leading-[15px] relative shrink-0 text-[#06c] text-[10px] tracking-[0.1172px]">
                      겨울공모전
                    </p>
                  </div>
                  <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                    2024
                  </p>
                  <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                    •
                  </p>
                  <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                    조회수 512
                  </p>
                </div>
              </div>
              <div className="bg-white border border-[#e8e4df] border-solid h-[32px] px-[16px] flex items-center justify-center relative rounded-[8px] shrink-0 w-[90%] mx-auto mt-auto mb-[16px]">
                <div className="relative shrink-0 size-[12px] mr-[4px]">
                  <img alt="" className="block max-w-none size-full" src={imgIcon1} />
                </div>
                <p className="font-medium leading-[16px] relative shrink-0 text-[#85817e] text-[12px] text-center">
                  수정하기
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'news' && (
          <div className="flex flex-col items-center relative shrink-0 w-full">
            <p className="text-[#85817e] text-[13px]">News 관리 콘텐츠가 표시됩니다</p>
          </div>
        )}
      </div>

      {/* 하단 액션 바 - 선택된 항목이 있을 때만 표시 */}
      {selectedTab === 'project' && selectedProjects.length > 0 && (
        <div className="fixed bg-[#fd6f22] flex items-center justify-between left-0 bottom-0 px-[16px] py-[16px] rounded-t-[8px] shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.1)] w-full z-[100]">
          <p className="font-normal leading-[20px] relative shrink-0 text-[14px] text-white tracking-[-0.1504px]">
            {selectedProjects.length}개 선택됨
          </p>
          <div className="flex gap-[8px] items-start relative shrink-0">
            <button className="bg-[#eceef2] h-[32px] px-[12px] py-0 rounded-[8px] shrink-0 hover:opacity-80 transition-opacity">
              <p className="font-medium leading-[16px] relative shrink-0 text-[#030213] text-[12px] text-center">
                공개
              </p>
            </button>
            <button className="bg-[#eceef2] h-[32px] px-[12px] py-0 rounded-[8px] shrink-0 hover:opacity-80 transition-opacity">
              <p className="font-medium leading-[16px] relative shrink-0 text-[#030213] text-[12px] text-center">
                비공개
              </p>
            </button>
            <button className="bg-[#d4183d] h-[32px] px-[12px] py-0 rounded-[8px] shrink-0 hover:opacity-80 transition-opacity relative">
              <div className="absolute left-[10px] size-[12px] top-[10px]">
                <img alt="" className="block max-w-none size-full" src={imgIcon3} />
              </div>
              <p className="font-medium leading-[16px] relative shrink-0 text-[12px] text-center text-white ml-[22px]">
                삭제
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      {selectedTab === 'project' && (
        <button
          onClick={() => router.push('/archiveManage/create')}
          className={`fixed bg-[#fd6f22] flex items-center justify-center px-[14px] py-[12px] right-[16px] rounded-[30.5px] size-[61px] hover:opacity-80 transition-opacity z-[90] ${
            selectedProjects.length > 0 ? 'bottom-[78px]' : 'bottom-[100px]'
          }`}
        >
          <div className="h-[35px] overflow-clip relative shrink-0 w-[31px]">
            <div className="relative shrink-0 size-full">
              <img alt="" className="block max-w-none size-full" src={img1} />
            </div>
          </div>
        </button>
      )}

      {selectedTab === 'news' && (
        <button
          onClick={() => router.push('/archiveManage/createNews')}
          className="fixed bg-[#fd6f22] flex items-center justify-center px-[14px] py-[12px] right-[16px] bottom-[100px] rounded-[30.5px] size-[61px] hover:opacity-80 transition-opacity z-[90]"
        >
          <div className="h-[35px] overflow-clip relative shrink-0 w-[31px]">
            <div className="relative shrink-0 size-full">
              <img alt="" className="block max-w-none size-full" src={img1} />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}

