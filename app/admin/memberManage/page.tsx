'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

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

type User = {
  id: string;
  email: string;
  nickname: string;
  name: string;
  phone: string;
  memberType: string;
  studentId: string | null;
  major: string | null;
  totalPurchaseAmount: number;
  hasSellingPermission: boolean;
  createdAt: string;
};

function MemberManageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<'member' | 'team'>('member');
  const [selectedMemberFilter, setSelectedMemberFilter] = useState('전체');
  const [selectedTeamFilter, setSelectedTeamFilter] = useState('전체');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [memberFilterOpen, setMemberFilterOpen] = useState(false);
  const memberFilterRef = useRef<HTMLDivElement>(null);
  const [editingMemberType, setEditingMemberType] = useState<{ userId: string; isOpen: boolean }>({ userId: '', isOpen: false });
  const memberTypeDropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'team') {
      setSelectedTab('team');
    } else {
      setSelectedTab('member');
    }
  }, [searchParams]);

  // 외부 클릭 시 필터 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (memberFilterRef.current && !memberFilterRef.current.contains(event.target as Node)) {
        setMemberFilterOpen(false);
      }
      // 회원유형 드롭다운 닫기
      if (editingMemberType.isOpen) {
        const clickedInside = Object.values(memberTypeDropdownRefs.current).some(
          (ref) => ref && ref.contains(event.target as Node)
        );
        if (!clickedInside) {
          setEditingMemberType({ userId: '', isOpen: false });
        }
      }
    };

    if (memberFilterOpen || editingMemberType.isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [memberFilterOpen, editingMemberType.isOpen]);

  // 회원 목록 로드
  useEffect(() => {
    if (selectedTab === 'member') {
      loadUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab, selectedMemberFilter]);

  // 검색 debounce
  useEffect(() => {
    if (selectedTab === 'member') {
      const timer = setTimeout(() => {
        loadUsers();
      }, 300);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const memberTypeMap: Record<string, string> = {
        '전체': '',
        '일반회원': 'general',
        '전공회원': 'major',
        '관리자': 'admin',
      };

      const memberType = memberTypeMap[selectedMemberFilter] || '';
      const params = new URLSearchParams();
      if (memberType) params.append('memberType', memberType);
      if (searchQuery) params.append('search', searchQuery);
      params.append('page', '1');
      params.append('limit', '100');

      const response = await fetch(`/api/admin/users?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      } else {
        console.error('회원 목록 로드 실패');
      }
    } catch (error) {
      console.error('회원 목록 로드 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxClick = (userId: string) => {
    setSelectedItems(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
      setIsAllSelected(false);
    } else {
      setSelectedItems(users.map(user => user.id));
      setIsAllSelected(true);
    }
  };

  // 체크박스 상태 동기화
  useEffect(() => {
    if (users.length > 0) {
      setIsAllSelected(selectedItems.length === users.length && users.length > 0);
    }
  }, [selectedItems, users]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  const getMemberTypeLabel = (memberType: string): string => {
    const map: Record<string, string> = {
      'general': '일반회원',
      'major': '전공회원',
      'admin': '관리자',
    };
    return map[memberType] || memberType;
  };

  const handleMemberTypeUpdate = async (userId: string, newMemberType: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memberType: newMemberType,
        }),
      });

      if (response.ok) {
        // 목록 새로고침
        loadUsers();
        setEditingMemberType({ userId: '', isOpen: false });
      } else {
        const errorData = await response.json();
        alert(errorData.error || '회원유형 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원유형 변경 오류:', error);
      alert('회원유형 변경 중 오류가 발생했습니다.');
    }
  };

  const handleSellingPermissionToggle = async (userId: string, newValue: boolean) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hasSellingPermission: newValue,
        }),
      });

      if (response.ok) {
        // 목록 새로고침
        loadUsers();
      } else {
        const errorData = await response.json();
        alert(errorData.error || '판매권한 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('판매권한 변경 오류:', error);
      alert('판매권한 변경 중 오류가 발생했습니다.');
    }
  };

  const memberFilters = ['전체', '일반회원', '전공회원', '관리자'];

  // CSV 내보내기 함수
  const handleExport = () => {
    const selectedUsersData = users.filter(user => selectedItems.includes(user.id));
    
    if (selectedUsersData.length === 0) {
      alert('선택된 회원이 없습니다.');
      return;
    }

    // CSV 헤더
    const headers = ['이름', '닉네임', '이메일', '회원유형', '학번', '주전공', '누적 구매금액', '판매 권한', '가입일'];
    
    // CSV 데이터 행
    const rows = selectedUsersData.map(user => [
      user.name,
      user.nickname,
      user.email,
      getMemberTypeLabel(user.memberType),
      user.studentId || '-',
      user.major || '-',
      formatCurrency(user.totalPurchaseAmount),
      user.hasSellingPermission ? '활성' : '비활성',
      new Date(user.createdAt).toLocaleDateString('ko-KR'),
    ]);

    // CSV 내용 생성
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // BOM 추가 (한글 깨짐 방지)
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // 다운로드 링크 생성
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `회원목록_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          className={`flex flex-1 h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 ${
            selectedTab === 'member'
              ? 'border-b border-[#1a1918] border-solid'
              : ''
          }`}
        >
          <p className={`font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px] ${
            selectedTab === 'member' ? 'text-[#1a1918]' : 'text-[#b7b3af]'
          }`}>
            회원 관리
          </p>
        </button>
        <button
          onClick={() => setSelectedTab('team')}
          className={`flex flex-1 h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 ${
            selectedTab === 'team'
              ? 'border-b border-[#1a1918] border-solid'
              : ''
          }`}
        >
          <p className={`font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px] ${
            selectedTab === 'team' ? 'text-[#1a1918]' : 'text-[#b7b3af]'
          }`}>
            판매팀 관리
          </p>
        </button>
      </div>

      {/* Content Area */}
      {selectedTab === 'member' && (
        <div className="flex flex-col gap-[20px] items-start pb-[44px] pt-[32px] px-[20px] relative shrink-0 w-full">
          {/* Filter and Search */}
          <div className="flex gap-[12px] items-center relative shrink-0 w-full">
            {/* Filter Dropdown */}
            <div className="relative w-[126px]" ref={memberFilterRef}>
              <button 
                onClick={() => setMemberFilterOpen(!memberFilterOpen)}
                className="bg-white flex items-center justify-between w-full px-[12px] py-[4px] rounded-[8px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.05)]"
              >
                <p className="font-normal text-[13px] text-[#1a1918] tracking-[-0.26px]">
                  {selectedMemberFilter}
                </p>
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 0L9.33 10H0.67L5 0Z" fill="#1a1918" />
                  </svg>
                </div>
              </button>

              {/* Dropdown Menu */}
              {memberFilterOpen && (
                <div className="absolute top-full left-0 right-0 mt-[8px] bg-white rounded-[8px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.2)] z-10">
                  {memberFilters.map((filter, index) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setSelectedMemberFilter(filter);
                        setMemberFilterOpen(false);
                      }}
                      className={`w-full px-[12px] py-[4px] text-left ${
                        index === 0 ? 'rounded-tl-[8px] rounded-tr-[8px]' : ''
                      } ${
                        index === memberFilters.length - 1 ? 'rounded-bl-[8px] rounded-br-[8px]' : ''
                      } ${
                        index < memberFilters.length - 1 ? 'border-b border-[#dcd6cc]' : ''
                      } hover:bg-[#f8f6f4]`}
                    >
                      <p className="font-normal text-[13px] text-[#1a1918] tracking-[-0.26px]">
                        {filter}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="flex-1 bg-white flex items-center px-[12px] py-[4px] rounded-[8px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.05)]">
              <img alt="" className="block max-w-none size-[16px] mr-[8px]" src={imgSearchIcon} />
              <input
                type="text"
                placeholder="검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-0 text-[13px] text-[#1a1918] focus:outline-none"
              />
            </div>
          </div>

          {/* Member Table */}
          {isLoading ? (
            <div className="flex items-center justify-center w-full py-[40px]">
              <p className="font-normal text-[13px] text-[#85817e]">로딩 중...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="flex items-center justify-center w-full py-[40px]">
              <p className="font-normal text-[13px] text-[#85817e]">회원이 없습니다.</p>
            </div>
          ) : (
            <div className="bg-white rounded-[12px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.05)] w-full overflow-hidden">
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  {/* Table Header */}
                  <thead>
                    <tr className="bg-[#f8f6f4] border-b border-[#eeebe6]">
                      <th className="px-[8px] md:px-[16px] py-[8px] md:py-[12px] text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={handleSelectAll}
                            className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] cursor-pointer"
                          />
                          <span className="ml-[4px] md:ml-[8px] font-bold text-[10px] md:text-[13px] text-[#1a1918] tracking-[-0.2px] md:tracking-[-0.26px]">이름</span>
                        </div>
                      </th>
                      <th className="px-[8px] md:px-[16px] py-[8px] md:py-[12px] text-left font-bold text-[10px] md:text-[13px] text-[#1a1918] tracking-[-0.2px] md:tracking-[-0.26px] whitespace-nowrap">
                        닉네임
                      </th>
                      <th className="px-[8px] md:px-[16px] py-[8px] md:py-[12px] text-left font-bold text-[10px] md:text-[13px] text-[#1a1918] tracking-[-0.2px] md:tracking-[-0.26px] whitespace-nowrap">
                        회원유형
                      </th>
                      <th className="px-[8px] md:px-[16px] py-[8px] md:py-[12px] text-left font-bold text-[10px] md:text-[13px] text-[#1a1918] tracking-[-0.2px] md:tracking-[-0.26px] whitespace-nowrap">
                        학번
                      </th>
                      <th className="px-[8px] md:px-[16px] py-[8px] md:py-[12px] text-left font-bold text-[10px] md:text-[13px] text-[#1a1918] tracking-[-0.2px] md:tracking-[-0.26px] whitespace-nowrap">
                        주전공
                      </th>
                      <th className="px-[8px] md:px-[16px] py-[8px] md:py-[12px] text-left font-bold text-[10px] md:text-[13px] text-[#1a1918] tracking-[-0.2px] md:tracking-[-0.26px] whitespace-nowrap">
                        누적 구매금액
                      </th>
                      <th className="px-[8px] md:px-[16px] py-[8px] md:py-[12px] text-left font-bold text-[10px] md:text-[13px] text-[#1a1918] tracking-[-0.2px] md:tracking-[-0.26px] whitespace-nowrap">
                        판매 권한
                      </th>
                    </tr>
                  </thead>
                  {/* Table Body */}
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-[#eeebe6] hover:bg-[#fafafa]">
                        <td className="px-[8px] md:px-[16px] py-[8px] md:py-[12px]">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(user.id)}
                              onChange={() => handleCheckboxClick(user.id)}
                              className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] cursor-pointer"
                            />
                            <span className="ml-[4px] md:ml-[8px] font-normal text-[10px] md:text-[13px] text-[#1a1918] tracking-[-0.2px] md:tracking-[-0.26px] whitespace-nowrap">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-[8px] md:px-[16px] py-[8px] md:py-[12px]">
                          <span className="font-normal text-[10px] md:text-[13px] text-[#1a1918] tracking-[-0.2px] md:tracking-[-0.26px] whitespace-nowrap">
                            {user.nickname}
                          </span>
                        </td>
                        <td className="px-[8px] md:px-[16px] py-[8px] md:py-[12px]">
                          <div className="relative" ref={(el) => { memberTypeDropdownRefs.current[user.id] = el; }}>
                            <button
                              onClick={() => setEditingMemberType({ userId: user.id, isOpen: editingMemberType.userId === user.id ? !editingMemberType.isOpen : true })}
                              className="font-normal text-[10px] md:text-[13px] text-[#1a1918] tracking-[-0.2px] md:tracking-[-0.26px] whitespace-nowrap hover:underline"
                            >
                              {getMemberTypeLabel(user.memberType)} ▼
                            </button>
                            {editingMemberType.userId === user.id && editingMemberType.isOpen && (
                              <div className="absolute top-full left-0 mt-[4px] bg-white border border-[#eeebe6] rounded-[8px] shadow-lg z-50 min-w-[120px]">
                                {['일반회원', '전공회원', '관리자'].map((type) => {
                                  const typeValue = type === '일반회원' ? 'general' : type === '전공회원' ? 'major' : 'admin';
                                  return (
                                    <button
                                      key={type}
                                      onClick={() => handleMemberTypeUpdate(user.id, typeValue)}
                                      className={`w-full px-[12px] py-[8px] text-left hover:bg-[#f8f6f4] ${
                                        user.memberType === typeValue ? 'bg-[#fff5f0] font-medium' : ''
                                      } ${
                                        type !== '관리자' ? 'border-b border-[#eeebe6]' : ''
                                      }`}
                                    >
                                      <p className="font-normal text-[12px] text-[#1a1918]">
                                        {type}
                                      </p>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-[8px] md:px-[16px] py-[8px] md:py-[12px]">
                          <span className="font-normal text-[10px] md:text-[13px] text-[#85817e] tracking-[-0.2px] md:tracking-[-0.26px] whitespace-nowrap">
                            {user.studentId || '-'}
                          </span>
                        </td>
                        <td className="px-[8px] md:px-[16px] py-[8px] md:py-[12px]">
                          <span className="font-normal text-[10px] md:text-[13px] text-[#85817e] tracking-[-0.2px] md:tracking-[-0.26px] whitespace-nowrap truncate max-w-[80px] md:max-w-none">
                            {user.major || '-'}
                          </span>
                        </td>
                        <td className="px-[8px] md:px-[16px] py-[8px] md:py-[12px]">
                          <span className="font-normal text-[10px] md:text-[13px] text-[#1a1918] tracking-[-0.2px] md:tracking-[-0.26px] whitespace-nowrap">
                            {formatCurrency(user.totalPurchaseAmount)}원
                          </span>
                        </td>
                        <td className="px-[8px] md:px-[16px] py-[8px] md:py-[12px]">
                          <button
                            onClick={() => handleSellingPermissionToggle(user.id, !user.hasSellingPermission)}
                            className={`${
                              user.hasSellingPermission 
                                ? 'bg-[#4ade80]' 
                                : 'bg-[#d1d5db]'
                            } text-white px-[6px] md:px-[8px] py-[3px] md:py-[4px] rounded-[4px] font-normal text-[9px] md:text-[11px] tracking-[-0.18px] md:tracking-[-0.22px] hover:opacity-80 transition-opacity whitespace-nowrap`}
                          >
                            {user.hasSellingPermission ? '활성' : '비활성'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 선택된 항목이 있을 때 하단 여백 추가 */}
      {selectedTab === 'member' && selectedItems.length > 0 && (
        <div className="h-[70px] md:h-[80px] w-full" />
      )}

      {selectedTab === 'team' && (
        <div className="flex flex-col gap-[20px] items-start pb-[44px] pt-[32px] px-[20px] relative shrink-0 w-full">
          <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            <p className="font-normal text-[13px] text-[#85817e]">
              판매팀 목록이 여기에 표시됩니다.
            </p>
          </div>
        </div>
      )}

      {/* 선택된 항목 하단 액션 바 */}
      {selectedTab === 'member' && selectedItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="bg-[#fd6f22] rounded-tl-[16px] rounded-tr-[16px] px-[20px] py-[14px] md:py-[16px] flex items-center justify-between shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.1)]">
            <p className="font-bold text-[14px] md:text-[15px] text-white tracking-[-0.28px] md:tracking-[-0.3px]">
              {selectedItems.length}개 선택됨
            </p>
            <button
              onClick={handleExport}
              className="bg-white text-[#fd6f22] px-[16px] md:px-[20px] py-[8px] md:py-[10px] rounded-[8px] font-bold text-[13px] md:text-[14px] tracking-[-0.26px] md:tracking-[-0.28px] hover:opacity-90 active:opacity-80 transition-opacity whitespace-nowrap"
            >
              내보내기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MemberManagePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <MemberManageContent />
    </Suspense>
  );
}
