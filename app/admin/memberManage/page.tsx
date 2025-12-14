'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/6402a3a8-7e09-40ca-880e-7b535ca7ce59";
const imgSearchIcon = "https://www.figma.com/api/mcp/asset/59df9338-22a3-4333-81f9-5ec9cd461f37";
const imgCheckLight = "https://www.figma.com/api/mcp/asset/21afb6cf-a3a4-47ca-91d2-1115bcb45710";
const imgArrowRight = "https://www.figma.com/api/mcp/asset/9c7f1b7a-9383-4737-8d36-65f304e8f920";
const imgPlus = "https://www.figma.com/api/mcp/asset/7541332f-7fbf-415d-b13c-5aed9542ba8c";

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
        사용자 관리
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

export default function MemberManagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<'member' | 'team'>('member');
  const [selectedMemberFilter, setSelectedMemberFilter] = useState('전체');
  const [selectedTeamFilter, setSelectedTeamFilter] = useState('전체');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'team') {
      setSelectedTab('team');
    } else {
      setSelectedTab('member');
    }
  }, [searchParams]);

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
      setSelectedItems([0, 1, 2, 3, 4, 5, 6]);
      setIsAllSelected(true);
    }
  };

  return (
    <div className="bg-[#f8f6f4] flex flex-col items-center relative w-full min-h-screen">
      {/* Nav Bar */}
      <div className="flex flex-col h-[78px] items-start relative shrink-0 w-full">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* Tab Bar */}
      <div className="flex h-[62px] items-center justify-between pb-[4px] pt-[12px] px-[20px] relative shrink-0 w-full">
        <button
          onClick={() => setSelectedTab('member')}
          className={`flex flex-1 h-[43px] items-center justify-center px-[4px] relative shrink-0 transition-colors ${
            selectedTab === 'member'
              ? 'border-b border-[#1a1918] border-solid'
              : ''
          }`}
        >
          <p className={`font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px] ${
            selectedTab === 'member'
              ? 'text-[#1a1918]'
              : 'text-[#b7b3af]'
          }`}>
            회원 관리
          </p>
        </button>
        <button
          onClick={() => setSelectedTab('team')}
          className={`flex flex-1 h-[43px] items-center justify-center px-[4px] relative shrink-0 transition-colors ${
            selectedTab === 'team'
              ? 'border-b border-[#1a1918] border-solid'
              : ''
          }`}
        >
          <p className={`font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px] ${
            selectedTab === 'team'
              ? 'text-[#1a1918]'
              : 'text-[#b7b3af]'
          }`}>
            판매팀 관리
          </p>
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[16px] items-center justify-center pb-[100px] pt-[16px] px-[16px] relative shrink-0 w-full">
        {selectedTab === 'member' ? (
          /* 회원 관리 탭 */
          <>
            {/* 검색 및 필터 */}
            <div className="bg-white flex flex-col items-start px-[16px] py-[15px] relative rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] shrink-0 w-full max-w-[344px]">
              <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                {/* 검색 바 */}
                <div className="bg-[#f8f6f4] h-[32px] relative rounded-[8px] shrink-0 w-full">
                  <div className="flex gap-[8px] items-center px-[16px] py-0 relative size-full">
                    <div className="relative shrink-0 w-[16px] h-[16px]">
                      <img alt="" className="block max-w-none size-full" src={imgSearchIcon} />
                    </div>
                    <input
                      type="text"
                      placeholder="이름, 닉네임, 학번, 전공으로 검색..."
                      className="bg-transparent border-0 flex-1 h-[18px] relative shrink-0 text-[13px] text-[#85817e] placeholder:text-[#85817e] focus:outline-none"
                    />
                  </div>
                </div>

                {/* 필터 버튼들 - 첫 번째 줄 */}
                <div className="flex gap-[6px] items-center relative shrink-0 w-full">
                  {['전체', '일반회원', '전공회원', '관리자'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedMemberFilter(filter)}
                      className={`flex flex-1 items-center justify-center h-[38px] px-[15px] relative rounded-[8px] shrink-0 transition-colors ${
                        selectedMemberFilter === filter
                          ? 'bg-[#fd6f22]'
                          : 'bg-[#f8f6f4]'
                      }`}
                    >
                      <p className={`font-semibold leading-[18px] relative shrink-0 text-[12px] text-center ${
                        selectedMemberFilter === filter
                          ? 'text-white'
                          : 'text-[#666]'
                      }`}>
                        {filter}
                      </p>
                    </button>
                  ))}
                </div>

                {/* 필터 버튼들 - 두 번째 줄 */}
                <div className="flex gap-[6px] items-center relative shrink-0">
                  {['판매자', '활성 판매자', '비활성 판매자'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedMemberFilter(filter)}
                      className={`flex flex-1 items-center justify-center h-[38px] px-0 relative rounded-[8px] shrink-0 transition-colors ${
                        selectedMemberFilter === filter
                          ? 'bg-[#fd6f22]'
                          : 'bg-[#f8f6f4]'
                      }`}
                    >
                      <p className={`font-semibold leading-[18px] relative shrink-0 text-[12px] text-center ${
                        selectedMemberFilter === filter
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

            {/* 회원 목록 테이블 */}
            <div className="bg-white flex flex-col items-start overflow-clip relative rounded-[12px] shrink-0 w-full max-w-[344px]">
              {/* 테이블 헤더 */}
              <div className="bg-[#eeebe6] border-b border-[#eeebe6] flex h-[61px] items-center p-[16px] relative shrink-0 w-full">
                <div className="flex gap-[8px] items-center relative shrink-0 flex-1">
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
                  {['이름', '닉네임', '회원유형', '학번', '주전공', '누적 구매금액', '판매 권한'].map((header) => (
                    <div key={header} className="flex flex-1 items-center relative shrink-0 min-w-0">
                      <p className="font-semibold leading-[14px] relative shrink-0 text-[10px] text-black whitespace-nowrap">
                        {header === '누적 구매금액' ? (
                          <>
                            누적<br />구매금액
                          </>
                        ) : header}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 회원 행들 (더미데이터 제외, 구조만 구현) */}
              <div className="flex flex-col items-start relative shrink-0 w-full">
                <div className="border-b border-[#eeebe6] flex items-center justify-center relative shrink-0 w-full px-[16px] py-[16px]">
                  <div className="flex gap-[8px] items-center relative shrink-0 flex-1">
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
                    {['이름', '닉네임', '회원유형', '학번', '주전공', '구매금액', '판매권한'].map((field, idx) => {
                      // 이름 필드만 Link로 감싸기
                      if (idx === 0) {
                        return (
                          <Link
                            key={idx}
                            href={`/admin/memberManage/1`}
                            className="flex flex-1 items-start overflow-hidden relative shrink-0 min-w-0 hover:opacity-80 transition-opacity"
                          >
                            <p className="font-normal leading-[14px] relative shrink-0 text-[10px] text-black truncate whitespace-nowrap cursor-pointer">
                              {field}
                            </p>
                          </Link>
                        );
                      }
                      return (
                        <div key={idx} className="flex flex-1 items-start overflow-hidden relative shrink-0 min-w-0">
                          <p className="font-normal leading-[14px] relative shrink-0 text-[10px] text-black truncate whitespace-nowrap">
                            {field}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* 판매팀 관리 탭 */
          <>
            {/* 판매팀 정보 수정 요청 */}
            <div className="bg-[#eeebe6] flex h-[40px] items-center px-[20px] py-[12px] relative rounded-[12px] shrink-0 w-full max-w-[344px] hover:opacity-80 transition-opacity cursor-pointer">
              <div className="flex flex-1 items-center justify-between relative shrink-0">
                <div className="flex gap-[4px] items-center relative shrink-0">
                  <p className="font-normal leading-[1.5] relative shrink-0 text-[15px] text-black">
                    판매팀 정보 수정 요청
                  </p>
                  <p className="font-bold leading-[1.5] relative shrink-0 text-[15px] text-[#fd6f22]">
                    2
                  </p>
                </div>
                <div className="relative shrink-0 w-[24px] h-[24px]">
                  <img alt="" className="block max-w-none size-full" src={imgArrowRight} />
                </div>
              </div>
            </div>

            {/* 검색 및 필터 */}
            <div className="bg-white flex flex-col items-start px-[16px] py-[15px] relative rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] shrink-0 w-full max-w-[344px]">
              <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                {/* 검색 바 */}
                <div className="bg-[#f8f6f4] h-[28px] relative rounded-[8px] shrink-0 w-full">
                  <div className="flex gap-[8px] items-center px-[16px] py-0 relative size-full">
                    <div className="relative shrink-0 w-[16px] h-[16px]">
                      <img alt="" className="block max-w-none size-full" src={imgSearchIcon} />
                    </div>
                    <input
                      type="text"
                      placeholder="팀명, 팀원명으로 검색..."
                      className="bg-transparent border-0 flex-1 h-[18px] relative shrink-0 text-[12px] text-[#85817e] placeholder:text-[#85817e] focus:outline-none"
                    />
                  </div>
                </div>

                {/* 필터 버튼들 */}
                <div className="flex gap-[10px] items-center relative shrink-0">
                  {['전체', '활성된 팀', '비활성된 팀'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedTeamFilter(filter)}
                      className={`flex items-center justify-center h-[38px] px-[12px] relative rounded-[8px] shrink-0 transition-colors ${
                        selectedTeamFilter === filter
                          ? 'bg-[#fd6f22]'
                          : 'bg-[#f8f6f4]'
                      }`}
                    >
                      <p className={`font-semibold leading-[18px] relative shrink-0 text-[12px] text-center ${
                        selectedTeamFilter === filter
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

            {/* 검색 결과 */}
            <div className="flex flex-col items-start relative shrink-0 w-full max-w-[344px] self-start">
              <p className="font-medium leading-[18px] relative shrink-0 text-[#666] text-[12px]">
                4개의 팀이 검색되었습니다
              </p>
            </div>

            {/* 판매팀 카드 목록 */}
            <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full max-w-[344px]">
              {/* 디자인 팀 카드 */}
              <div className="bg-white flex flex-col items-start overflow-clip relative rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] shrink-0 w-full">
                {/* 카드 헤더 */}
                <div className="bg-[#eeebe6] border-b border-[#b7b3af] flex flex-col h-[69px] items-start pb-[1px] pt-[16px] px-[22px] relative shrink-0 w-full">
                  <div className="flex h-[36px] items-center justify-between relative shrink-0 w-full">
                    <div className="flex gap-[12px] items-center relative shrink-0">
                      <p className="font-bold leading-[22.5px] relative shrink-0 text-[#666] text-[15px]">
                        디자인
                      </p>
                      <div className="flex gap-[6px] items-center relative shrink-0">
                        <div className="bg-[#14ae5c] relative rounded-full shrink-0 w-[6px] h-[6px]" />
                        <p className="font-semibold leading-[15px] relative shrink-0 text-[#14ae5c] text-[10px]">
                          활성
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px] text-right">
                        총 판매액
                      </p>
                      <p className="font-bold leading-[21px] relative shrink-0 text-[#fd6f22] text-[14px] text-right">
                        0원
                      </p>
                    </div>
                  </div>
                </div>

                {/* 팀원 정보 테이블 */}
                <div className="flex flex-col gap-[16px] items-start pb-0 pt-[16px] px-[22px] relative shrink-0 w-full">
                  {/* 테이블 헤더 */}
                  <div className="grid grid-cols-5 gap-[4px] relative shrink-0 w-full">
                    {['구분', '이름', '학번', '전공', '연락처'].map((header) => (
                      <div key={header} className="flex items-center justify-center relative shrink-0">
                        <p className="font-semibold leading-[15px] relative shrink-0 text-[#5f5a58] text-[10px]">
                          {header}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* 대표자 행 */}
                  <div className="grid grid-cols-5 gap-[4px] relative shrink-0 w-full">
                    <div className="bg-[#fd6f22] flex items-center justify-center px-[5px] py-[2px] relative rounded-[4px] shrink-0">
                      <p className="font-semibold leading-[13.5px] relative shrink-0 text-[9px] text-white">
                        대표자
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-semibold leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                        박디자인
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                        202421501
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                        시각디자인과
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#5f5a58] text-[10px]">
                        010-6789-0123
                      </p>
                    </div>
                  </div>

                  {/* 팀원 1 행 */}
                  <div className="grid grid-cols-5 gap-[4px] relative shrink-0 w-full">
                    <div className="flex items-center justify-center relative shrink-0" />
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-semibold leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                        최박사
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                        202421502
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                        산업디자인과
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#5f5a58] text-[10px]">
                        010-7890-1234
                      </p>
                    </div>
                  </div>

                  {/* 팀원 2 행 */}
                  <div className="grid grid-cols-5 gap-[4px] relative shrink-0 w-full">
                    <div className="flex items-center justify-center relative shrink-0" />
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-semibold leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                        정아트
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                        202321503
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                        시각디자인과
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#5f5a58] text-[10px]">
                        010-8901-2345
                      </p>
                    </div>
                  </div>
                </div>

                {/* 정산 계좌 */}
                <div className="border-t border-[#b7b3af] flex flex-col h-[28px] items-start pb-0 pt-[13px] px-[22px] relative shrink-0 w-full">
                  <div className="flex gap-[12px] h-[15px] items-center relative shrink-0 w-full">
                    <p className="font-semibold leading-[15px] relative shrink-0 text-[#5f5a58] text-[10px]">
                      정산 계좌
                    </p>
                    <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                      박디자인
                    </p>
                    <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                      우리은행
                    </p>
                    <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                      456-7890-1234-56
                    </p>
                  </div>
                </div>
              </div>

              {/* 유랑 팀 카드 */}
              <div className="bg-white flex flex-col items-start overflow-clip relative rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] shrink-0 w-full">
                {/* 카드 헤더 */}
                <div className="bg-[#eeebe6] border-b border-[#b7b3af] flex flex-col h-[69px] items-start pb-[1px] pt-[16px] px-[22px] relative shrink-0 w-full">
                  <div className="flex h-[36px] items-center justify-between relative shrink-0 w-full">
                    <div className="flex gap-[12px] items-center relative shrink-0">
                      <p className="font-bold leading-[22.5px] relative shrink-0 text-[#666] text-[15px]">
                        유랑
                      </p>
                      <div className="flex gap-[6px] items-center relative shrink-0">
                        <div className="bg-[#85817e] relative rounded-full shrink-0 w-[6px] h-[6px]" />
                        <p className="font-semibold leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                          비활성
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px] text-right">
                        총 판매액
                      </p>
                      <p className="font-bold leading-[21px] relative shrink-0 text-[#fd6f22] text-[14px] text-right">
                        0원
                      </p>
                    </div>
                  </div>
                </div>

                {/* 팀원 정보 테이블 */}
                <div className="flex flex-col gap-[16px] items-start pb-0 pt-[16px] px-[22px] relative shrink-0 w-full">
                  {/* 테이블 헤더 */}
                  <div className="grid grid-cols-5 gap-[4px] relative shrink-0 w-full">
                    {['구분', '이름', '학번', '전공', '연락처'].map((header) => (
                      <div key={header} className="flex items-center justify-center relative shrink-0">
                        <p className="font-semibold leading-[15px] relative shrink-0 text-[#5f5a58] text-[10px]">
                          {header}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* 대표자 행 */}
                  <div className="grid grid-cols-5 gap-[4px] relative shrink-0 w-full">
                    <div className="bg-[#fd6f22] flex items-center justify-center px-[5px] py-[2px] relative rounded-[4px] shrink-0">
                      <p className="font-semibold leading-[13.5px] relative shrink-0 text-[9px] text-white">
                        대표자
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-semibold leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                        박디자인
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                        202421501
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                        시각디자인과
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#5f5a58] text-[10px]">
                        010-6789-0123
                      </p>
                    </div>
                  </div>

                  {/* 팀원 1 행 */}
                  <div className="grid grid-cols-5 gap-[4px] relative shrink-0 w-full">
                    <div className="flex items-center justify-center relative shrink-0" />
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-semibold leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                        최박사
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                        202421502
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                        산업디자인과
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#5f5a58] text-[10px]">
                        010-7890-1234
                      </p>
                    </div>
                  </div>

                  {/* 팀원 2 행 */}
                  <div className="grid grid-cols-5 gap-[4px] relative shrink-0 w-full">
                    <div className="flex items-center justify-center relative shrink-0" />
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-semibold leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                        정아트
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                        202321503
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                        시각디자인과
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <p className="font-medium leading-[15px] relative shrink-0 text-[#5f5a58] text-[10px]">
                        010-8901-2345
                      </p>
                    </div>
                  </div>
                </div>

                {/* 정산 계좌 */}
                <div className="border-t border-[#b7b3af] flex flex-col h-[28px] items-start pb-0 pt-[13px] px-[22px] relative shrink-0 w-full">
                  <div className="flex gap-[12px] h-[15px] items-center relative shrink-0 w-full">
                    <p className="font-semibold leading-[15px] relative shrink-0 text-[#5f5a58] text-[10px]">
                      정산 계좌
                    </p>
                    <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                      박디자인
                    </p>
                    <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                      우리은행
                    </p>
                    <p className="font-medium leading-[15px] relative shrink-0 text-[#85817e] text-[10px]">
                      456-7890-1234-56
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 플로팅 액션 버튼 */}
            <button className="fixed bg-[#fd6f22] flex items-center justify-center px-[16px] py-[15px] rounded-[30.5px] w-[61px] h-[61px] right-[16px] bottom-[100px] hover:opacity-80 transition-opacity z-[90] shadow-[0px_4px_10px_0px_rgba(99,81,73,0.2)]">
              <div className="relative shrink-0 w-[28px] h-[28px]">
                <img alt="" className="block max-w-none size-full" src={imgPlus} />
              </div>
            </button>
          </>
        )}
      </div>

      {/* 하단 액션 바 (회원 관리 탭에서만 표시) */}
      {selectedTab === 'member' && selectedItems.length > 0 && (
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

