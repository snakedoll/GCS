'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/6402a3a8-7e09-40ca-880e-7b535ca7ce59";
const imgLine297 = "https://www.figma.com/api/mcp/asset/e2e82555-6968-4558-a2fe-ed57376ffdcd";
const imgLine298 = "https://www.figma.com/api/mcp/asset/a1776c58-996d-445c-8f96-c708a4ec6525";
const imgContainer = "https://www.figma.com/api/mcp/asset/98b238b1-3e3b-4c97-b0d3-1a95c467b4a8";

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
        사용자 세부정보
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

interface MemberDetail {
  id: string;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  memberType: 'general' | 'major' | 'admin';
  studentId?: string;
  major?: string;
  createdAt: string;
  profileImage?: string;
  isSeller: boolean;
  cumulativePurchaseAmount: number;
  lastActivityDate: string;
  archiveProjects: number;
  loungePosts: number;
  reviews: number;
  inquiries: number;
}

const memberTypeOptions = [
  { value: 'general', label: '일반회원' },
  { value: 'major', label: '전공회원' },
  { value: 'admin', label: '관리자' },
];

export default function MemberDetailPage() {
  const router = useRouter();
  const params = useParams();
  const memberId = params?.id as string;
  const [member, setMember] = useState<MemberDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: API에서 회원 정보 가져오기
    // 임시 더미 데이터
    if (memberId) {
      setMember({
        id: memberId,
        name: '배염소',
        nickname: '염메ㅔㅔ',
        email: 'night3@dgu.ac.kr',
        phone: '010-0179-5200',
        memberType: 'major',
        studentId: '202521401',
        major: '놀고먹기전공',
        createdAt: '2025.11.17',
        isSeller: true,
        cumulativePurchaseAmount: 3000,
        lastActivityDate: '오늘',
        archiveProjects: 5,
        loungePosts: 5,
        reviews: 5,
        inquiries: 5,
      });
      setLoading(false);
    }
  }, [memberId]);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleMemberTypeChange = (newType: 'general' | 'major' | 'admin') => {
    if (member) {
      setMember({ ...member, memberType: newType });
      setIsDropdownOpen(false);
      // TODO: API 호출하여 회원 권한 업데이트
    }
  };

  if (loading || !member) {
    return (
      <div className="bg-[#f8f6f4] flex items-center justify-center min-h-screen">
        <p className="text-[#85817e]">로딩 중...</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    // 이미 포맷된 날짜인 경우 그대로 반환
    if (dateString.includes('.')) {
      return dateString;
    }
    // ISO 형식인 경우 변환
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const getMemberTypeLabel = (type: 'general' | 'major' | 'admin') => {
    return memberTypeOptions.find(opt => opt.value === type)?.label || '일반회원';
  };

  return (
    <div className="bg-[#f8f6f4] flex flex-col gap-[16px] items-center px-0 py-[16px] relative min-h-screen">
      {/* Nav Bar */}
      <div className="flex flex-col items-start relative shrink-0 w-full max-w-[375px]">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full max-w-[344px]">
        {/* 프로필 섹션 */}
        <div className="flex gap-[23.992px] items-start relative shrink-0 w-full px-[19.985px] pt-[19.985px]">
          <div className="relative rounded-full shrink-0 w-[59.989px] h-[59.989px] overflow-hidden">
            {member.profileImage ? (
              <img 
                alt={member.name} 
                className="w-full h-full object-cover" 
                src={member.profileImage} 
              />
            ) : (
              <div className="w-full h-full bg-[#eeebe6] flex items-center justify-center">
                <svg className="w-8 h-8 text-[#85817e]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 relative shrink-0">
            <div className="flex flex-col gap-[8px] items-start relative w-full">
              <div className="flex gap-[8px] items-center relative shrink-0">
                <p className="font-bold leading-[28.5px] relative shrink-0 text-[19px] text-black">
                  {member.name}
                </p>
                {member.isSeller && (
                  <div className="bg-[#4caf50] flex h-[24.515px] items-center justify-center relative rounded-[11.536px] shrink-0 px-[8px]">
                    <p className="font-bold leading-[15.141px] relative shrink-0 text-[10.094px] text-white">
                      판매자
                    </p>
                  </div>
                )}
              </div>
              {/* 드롭다운 메뉴 */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-white flex gap-[8px] items-center overflow-clip pl-[12px] pr-[8px] py-[4px] relative rounded-[8px] shadow-[0px_4px_4px_0px_rgba(34,32,31,0.14)] shrink-0 w-full hover:opacity-80 transition-opacity"
                >
                  <div className="flex-1 min-w-0 relative shrink-0">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#1a1918] tracking-[-0.26px] truncate text-left">
                      {getMemberTypeLabel(member.memberType)}
                    </p>
                  </div>
                  <div className="flex items-center justify-center relative shrink-0 w-[24px]">
                    <svg 
                      className={`w-4 h-4 text-[#1a1918] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-[4px] bg-white rounded-[8px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)] w-full z-50 overflow-hidden">
                    {memberTypeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleMemberTypeChange(option.value as 'general' | 'major' | 'admin')}
                        className={`w-full px-[12px] py-[12px] text-left hover:bg-[#f8f6f4] transition-colors ${
                          member.memberType === option.value ? 'bg-[#f8f6f4]' : ''
                        } ${
                          option.value !== memberTypeOptions[memberTypeOptions.length - 1].value ? 'border-b border-[#eeebe6]' : ''
                        }`}
                      >
                        <p className="font-normal leading-[1.5] text-[13px] text-[#1a1918] tracking-[-0.26px]">
                          {option.label}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 기본 정보 */}
        <div className="bg-white flex flex-col gap-[8px] items-start p-[16px] relative rounded-[12px] shrink-0 w-full">
          <div className="h-[31px] relative shrink-0 w-full">
            <div className="flex h-[23px] items-center justify-center relative shrink-0 w-full">
              <p className="flex-1 font-bold leading-[1.5] relative shrink-0 text-[15px] text-[#443e3c]">
                기본 정보
              </p>
            </div>
            <div className="h-[1px] bg-[#eeebe6] relative shrink-0 w-full mt-[8px]" />
          </div>
          <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
            {/* 닉네임 */}
            <div className="flex gap-[16px] items-center relative shrink-0 w-full">
              <p className="font-semibold leading-[19.5px] relative shrink-0 text-[13px] text-[#85817e] w-[64px]">
                닉네임
              </p>
              <p className="font-normal leading-[19.5px] relative shrink-0 text-[13px] text-[#85817e] flex-1 min-w-0 truncate">
                {member.nickname}
              </p>
            </div>
            {/* 계정 */}
            <div className="flex gap-[16px] items-center relative shrink-0 w-full">
              <p className="font-semibold leading-[19.5px] relative shrink-0 text-[13px] text-[#85817e] w-[64px]">
                계정
              </p>
              <p className="font-normal leading-[19.5px] relative shrink-0 text-[13px] text-[#85817e] flex-1 min-w-0 truncate">
                {member.email}
              </p>
            </div>
            {/* 연락처 */}
            <div className="flex gap-[16px] items-center relative shrink-0 w-full">
              <p className="font-semibold leading-[19.5px] relative shrink-0 text-[13px] text-[#85817e] w-[64px]">
                연락처
              </p>
              <p className="font-normal leading-[19.5px] relative shrink-0 text-[13px] text-[#85817e] flex-1 min-w-0 truncate">
                {member.phone}
              </p>
            </div>
            {/* 가입일 */}
            <div className="flex gap-[16px] items-center relative shrink-0 w-full">
              <p className="font-semibold leading-[19.5px] relative shrink-0 text-[13px] text-[#85817e] w-[64px]">
                가입일
              </p>
              <p className="font-normal leading-[19.5px] relative shrink-0 text-[13px] text-[#85817e] flex-1 min-w-0 truncate">
                {formatDate(member.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* 학사 정보 (전공 회원인 경우에만 표시) */}
        {member.memberType === 'major' && member.studentId && (
          <div className="bg-white flex flex-col gap-[8px] items-start p-[16px] relative rounded-[12px] shrink-0 w-full">
            <div className="h-[31px] relative shrink-0 w-full">
              <div className="flex h-[23px] items-center justify-center relative shrink-0 w-full">
                <p className="flex-1 font-bold leading-[1.5] relative shrink-0 text-[15px] text-[#443e3c]">
                  학사 정보
                </p>
              </div>
              <div className="h-[1px] bg-[#eeebe6] relative shrink-0 w-full mt-[8px]" />
            </div>
            <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
              {/* 학번 */}
              <div className="flex gap-[16px] items-center relative shrink-0 w-full">
                <p className="font-semibold leading-[19.5px] relative shrink-0 text-[13px] text-[#85817e] w-[64px]">
                  학번
                </p>
                <p className="font-normal leading-[18.264px] relative shrink-0 text-[12px] text-[#85817e] flex-1 min-w-0 truncate">
                  {member.studentId}
                </p>
              </div>
              {/* 전공 */}
              <div className="flex gap-[16px] items-center relative shrink-0 w-full">
                <p className="font-semibold leading-[19.5px] relative shrink-0 text-[13px] text-[#85817e] w-[64px]">
                  전공
                </p>
                <p className="font-normal leading-[18.264px] relative shrink-0 text-[12px] text-[#85817e] flex-1 min-w-0 truncate">
                  {member.major || '-'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 활동 내역 */}
        <div className="bg-white flex flex-col items-start p-[16px] relative rounded-[12px] shrink-0 w-full">
          <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <div className="flex items-center justify-center relative shrink-0 w-full">
              <p className="flex-1 font-bold leading-[1.5] relative shrink-0 text-[15px] text-[#443e3c]">
                활동 내역
              </p>
            </div>
            <div className="h-[1px] bg-[#eeebe6] relative shrink-0 w-full" />
          </div>
          <div className="flex flex-col items-start justify-center relative shrink-0 w-full">
            <div className="flex flex-col gap-[16px] items-start px-0 py-[12px] relative shrink-0 w-full">
              <div className="flex gap-[8px] items-start relative shrink-0 w-full">
                <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px]">
                  아카이브 프로젝트
                </p>
                <p className="font-normal leading-[22.5px] relative shrink-0 text-[15px] text-[#85817e]">
                  {member.archiveProjects}
                </p>
              </div>
              <div className="flex gap-[8px] items-start relative shrink-0 w-full">
                <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px]">
                  라운지 게시글
                </p>
                <p className="font-normal leading-[22.5px] relative shrink-0 text-[15px] text-[#85817e]">
                  {member.loungePosts}
                </p>
              </div>
              <div className="flex gap-[8px] items-start relative shrink-0 w-full">
                <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px]">
                  리뷰
                </p>
                <p className="font-normal leading-[22.5px] relative shrink-0 text-[15px] text-[#85817e]">
                  {member.reviews}
                </p>
              </div>
              <div className="flex gap-[8px] items-start relative shrink-0 w-full">
                <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px]">
                  문의
                </p>
                <p className="font-normal leading-[22.5px] relative shrink-0 text-[15px] text-[#85817e]">
                  {member.inquiries}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="flex gap-[16px] items-start relative shrink-0 w-full">
          <div className="bg-white flex h-[136.842px] items-start pb-0 pl-[15.259px] pr-0 pt-[15.259px] relative rounded-[11.445px] shrink-0 flex-1">
            <div className="h-[56.735px] relative shrink-0 w-full">
              <div className="flex flex-col gap-[3.809px] items-start relative size-full">
                <div className="h-[18.591px] relative shrink-0 w-full">
                  <p className="font-normal leading-[18.598px] relative text-[12.399px] text-[#85817e] tracking-[-0.3206px]">
                    누적 구매 금액
                  </p>
                </div>
                <div className="h-[34.336px] relative shrink-0 w-full">
                  <p className="font-normal leading-[34.335px] relative text-[22.89px] text-[#1a1918] tracking-[0.0671px]">
                    {member.cumulativePurchaseAmount.toLocaleString()}원
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white flex h-[136.842px] items-start pb-0 pl-[15.259px] pr-0 pt-[15.259px] relative rounded-[11.445px] shrink-0 flex-1">
            <div className="h-[56.735px] relative shrink-0 w-full">
              <div className="flex flex-col gap-[3.809px] items-start relative size-full">
                <div className="h-[18.591px] relative shrink-0 w-full">
                  <p className="font-normal leading-[18.598px] relative text-[12.399px] text-[#85817e] tracking-[-0.3206px]">
                    최근 활동일
                  </p>
                </div>
                <div className="h-[34.336px] relative shrink-0 w-full">
                  <p className="font-normal leading-[34.335px] relative text-[22.89px] text-[#1a1918] tracking-[0.0671px]">
                    {member.lastActivityDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-[31.989px] h-[19.49px] items-start relative shrink-0 w-full px-[16px] py-0">
          <button className="h-[19.49px] relative shrink-0 hover:opacity-80 transition-opacity">
            <p className="font-normal leading-[19.5px] relative text-[15px] text-[#85817e] text-center">
              활동 정지
            </p>
          </button>
          <button className="h-[19.49px] relative shrink-0 hover:opacity-80 transition-opacity">
            <p className="font-normal leading-[19.5px] relative text-[15px] text-[#85817e] text-center">
              계정 삭제
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

