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

type Project = {
  id: string;
  title: string;
  description: string | null;
  teamName: string | null;
  year: number;
  category: string | null;
  thumbnail: string | null;
  viewCount: number;
  isPublic: boolean;
  createdAt: string;
  tags: Array<{ tag: { name: string } }>;
};

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
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [totalViewCount, setTotalViewCount] = useState(0);
  
  const handleProjectToggle = (projectId: string) => {
    setSelectedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
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
  
  // 프로젝트 목록 로드
  useEffect(() => {
    if (selectedTab === 'project') {
      loadProjects();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab, selectedYear, selectedCategory, selectedSort, selectedVisibility]);

  // 검색 debounce
  useEffect(() => {
    if (selectedTab === 'project') {
      const timer = setTimeout(() => {
        loadProjects();
      }, 300);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const params = new URLSearchParams();
      
      // 연도 필터
      if (selectedYear !== '전체 연도') {
        params.append('year', selectedYear);
      }
      
      // 카테고리 필터
      if (selectedCategory !== '전체 카테고리') {
        const categoryMap: Record<string, string> = {
          '겨울 공모전': '겨울공모전',
          '여름 공모전': '여름공모전',
          '캡스톤 디자인': '캡스톤디자인',
        };
        params.append('category', categoryMap[selectedCategory] || selectedCategory);
      }
      
      // 공개/비공개 필터
      if (selectedVisibility === '공개') {
        params.append('isPublic', 'true');
      } else if (selectedVisibility === '비공개') {
        params.append('isPublic', 'false');
      }

      params.append('page', '1');
      params.append('limit', '100');

      const apiUrl = `/api/admin/projects?${params.toString()}`;
      console.log('API 요청 URL:', apiUrl);
      
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store', // 캐시 무시
        next: { revalidate: 0 }, // Next.js 캐시 무시
      });
      
      console.log('API 응답 상태:', response.status, response.statusText);

      if (response.ok) {
        const data = await response.json();
        let filteredProjects = data.projects || [];

        // 디버깅: API 응답 확인
        console.log('API 응답 데이터:', {
          projectsCount: filteredProjects.length,
          projects: filteredProjects.map((p: Project) => ({
            id: p.id,
            title: p.title,
            teamName: p.teamName,
            year: p.year,
            createdAt: p.createdAt,
          })),
          rawData: data,
        });

        // 검색어 필터링 (팀명, 제목으로 검색)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filteredProjects = filteredProjects.filter((project: Project) => {
            const teamName = (project.teamName || '').toLowerCase();
            const title = (project.title || '').toLowerCase();
            return teamName.includes(query) || title.includes(query);
          });
        }

        // 정렬
        if (selectedSort === '조회순') {
          filteredProjects.sort((a: Project, b: Project) => b.viewCount - a.viewCount);
        } else {
          // 최신순은 이미 API에서 정렬됨
        }

        setProjects(filteredProjects);
        
        // 통계 계산
        const total = filteredProjects.length;
        const totalViews = filteredProjects.reduce((sum: number, p: Project) => sum + (p.viewCount || 0), 0);
        setTotalCount(total);
        setTotalViewCount(totalViews);
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('프로젝트 목록 로드 실패:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });
        // API 실패 시 빈 배열로 설정하여 더미데이터가 보이지 않도록 함
        setProjects([]);
        setTotalCount(0);
        setTotalViewCount(0);
      }
    } catch (error) {
      console.error('프로젝트 목록 로드 오류:', error);
      // 에러 발생 시 빈 배열로 설정
      setProjects([]);
      setTotalCount(0);
      setTotalViewCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBatchDelete = async () => {
    if (selectedProjects.length === 0) {
      return;
    }

    if (!confirm(`선택한 ${selectedProjects.length}개의 프로젝트를 삭제하시겠습니까?`)) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      // 각 프로젝트를 순차적으로 삭제
      const deletePromises = selectedProjects.map((projectId) =>
        fetch(`/api/admin/projects/${projectId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      const results = await Promise.allSettled(deletePromises);
      
      // 성공/실패 확인
      const successful = results.filter((r) => r.status === 'fulfilled' && r.value.ok).length;
      const failed = results.length - successful;

      if (failed === 0) {
        alert(`${successful}개의 프로젝트가 삭제되었습니다.`);
        setSelectedProjects([]); // 선택 상태 초기화
        loadProjects(); // 목록 새로고침
      } else {
        alert(`${successful}개 성공, ${failed}개 실패했습니다.`);
        // 일부 성공했더라도 목록 새로고침
        setSelectedProjects([]);
        loadProjects();
      }
    } catch (error) {
      console.error('프로젝트 삭제 오류:', error);
      alert('프로젝트 삭제 중 오류가 발생했습니다.');
    }
  };

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

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  const getCategoryBadgeStyle = (category: string | null) => {
    if (!category) return { bg: 'bg-[#e8f4ff]', text: 'text-[#06c]' };
    
    const categoryMap: Record<string, { bg: string; text: string }> = {
      '겨울공모전': { bg: 'bg-[#e8f4ff]', text: 'text-[#06c]' },
      '여름공모전': { bg: 'bg-[#fff5e6]', text: 'text-[#ff8c00]' },
      '캡스톤디자인': { bg: 'bg-[#f3e8ff]', text: 'text-[#8b5cf6]' },
    };
    
    return categoryMap[category] || { bg: 'bg-[#e8f4ff]', text: 'text-[#06c]' };
  };

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
              {selectedTab === 'project' ? totalCount : '0'}
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
              {selectedTab === 'project' ? totalViewCount.toLocaleString() : '0'}
            </p>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          {/* 검색 바 */}
          <div className="bg-white border border-[rgba(0,0,0,0)] border-solid h-[36px] relative rounded-[8px] shrink-0 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="팀명, 제목으로 검색..."
              className="w-full h-full px-[12px] py-[4px] bg-transparent border-0 text-[11px] text-[#1a1918] placeholder:text-[#717182] focus:outline-none"
            />
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
            {isLoading ? (
              <div className="flex items-center justify-center w-full py-[40px]">
                <p className="font-normal text-[13px] text-[#85817e]">로딩 중...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="flex items-center justify-center w-full py-[40px]">
                <p className="font-normal text-[13px] text-[#85817e]">프로젝트가 없습니다.</p>
              </div>
            ) : (
              projects.map((project) => {
                const badgeStyle = getCategoryBadgeStyle(project.category);
                const firstTag = project.tags.length > 0 ? project.tags[0].tag.name : null;
                
                return (
                  <div key={project.id} className="bg-white h-[179px] flex flex-col relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full">
                    <div className="flex items-start justify-between px-[16px] pt-[16px] relative w-full">
                      <button
                        onClick={() => handleProjectToggle(project.id)}
                        className="relative shrink-0 size-[24px] cursor-pointer"
                      >
                        <div className="absolute contents left-[2px] top-[2px]">
                          <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${selectedProjects.includes(project.id) ? 'bg-[#2a2a2e]' : ''}`} />
                          {selectedProjects.includes(project.id) && (
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
                        <div className={`absolute flex h-[18px] items-center justify-end left-0 p-[2px] rounded-[251.6px] top-0 w-[35px] ${project.isPublic ? 'bg-[#fd6f22]' : 'bg-[#afafaf]'}`}>
                          <div className="relative shrink-0 size-[14.36px]">
                            <img alt="" className="block max-w-none size-full" src={img} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-[16px] pt-[14px] relative w-full">
                      <p className="font-normal leading-[16px] relative shrink-0 text-[#85817e] text-[12px]">
                        {project.teamName || '-'}
                      </p>
                      <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                        {formatDate(project.createdAt)}
                      </p>
                    </div>
                    <div className="h-[20.62px] px-[16px] pt-[8px] relative shrink-0 w-full">
                      <p className="font-normal leading-[20.625px] relative text-[#1a1918] text-[15px] tracking-[-0.2344px] line-clamp-1">
                        {project.title}
                      </p>
                    </div>
                    <div className="h-[20.1px] px-[16px] pt-[12px] relative shrink-0 w-full">
                      <div className="flex gap-[8px] items-center relative shrink-0">
                        {firstTag && (
                          <div className={`${badgeStyle.bg} border border-[rgba(0,0,0,0)] border-solid flex items-center justify-center overflow-clip px-[8.56px] py-[2.56px] rounded-[8px] shrink-0`}>
                            <p className={`font-medium leading-[15px] relative shrink-0 ${badgeStyle.text} text-[10px] tracking-[0.1172px]`}>
                              {firstTag}
                            </p>
                          </div>
                        )}
                        <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                          {project.year}
                        </p>
                        <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                          •
                        </p>
                        <p className="font-normal leading-[15px] relative shrink-0 text-[#85817e] text-[10px] tracking-[0.1172px]">
                          조회수 {project.viewCount}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push(`/archiveManage/edit/${project.id}`)}
                      className="bg-white border border-[#e8e4df] border-solid h-[32px] px-[16px] flex items-center justify-center relative rounded-[8px] shrink-0 w-[90%] mx-auto mt-auto mb-[16px] hover:opacity-80 transition-opacity"
                    >
                      <div className="relative shrink-0 size-[12px] mr-[4px]">
                        <img alt="" className="block max-w-none size-full" src={imgIcon1} />
                      </div>
                      <p className="font-medium leading-[16px] relative shrink-0 text-[#85817e] text-[12px] text-center">
                        수정하기
                      </p>
                    </button>
                  </div>
                );
              })
            )}
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
            <button 
              onClick={handleBatchDelete}
              className="bg-[#d4183d] h-[32px] px-[12px] py-0 rounded-[8px] shrink-0 hover:opacity-80 transition-opacity relative"
            >
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

