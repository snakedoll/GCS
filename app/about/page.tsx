'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// 배너 이미지
const imgRectangle2827 = "https://www.figma.com/api/mcp/asset/474085da-a210-432b-a0f0-8d33e28c5117";

interface IntroContent {
  images: string[];
  korean: {
    paragraph1: {
      text1: string;
      bold: string;
      text2: string;
      text3: string;
      text4: string;
    };
    paragraph2: string;
    paragraph3: string;
    paragraph4: string;
  };
  english: {
    paragraph1: {
      text1: string;
      bold: string;
      text2: string;
    };
    paragraph2: string;
    paragraph3: string;
  };
}

interface MajorContent {
  title: {
    korean: string;
    english: string;
  };
  description: {
    paragraph1: {
      text1: string;
      bold1: string;
      text2: string;
      bold2: string;
      text3: string;
      text4: string;
      bold3: string;
      text5: string;
    };
    paragraph2: string;
    paragraph3: string;
  };
  images: Array<{
    url: string;
    position: 'left' | 'right';
    className: string;
  }>;
}

interface CurriculumContent {
  courses: Array<{
    code: string;
    name: string;
    description: string[];
  }>;
}

interface FacultyContent {
  title: string;
  professors: Array<{
    name: string;
    positions: string[];
    imageUrl: string;
    imageClassName: string;
    alignment: 'left' | 'right';
    courses: string[] | null;
    hasLine: boolean;
    lineImageUrl?: string;
  }>;
}

export default function AboutPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('intro');
  const [introContent, setIntroContent] = useState<IntroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [majorContent, setMajorContent] = useState<MajorContent | null>(null);
  const [isMajorLoading, setIsMajorLoading] = useState(true);
  const [curriculumContent, setCurriculumContent] = useState<CurriculumContent | null>(null);
  const [isCurriculumLoading, setIsCurriculumLoading] = useState(true);
  const [facultyContent, setFacultyContent] = useState<FacultyContent | null>(null);
  const [isFacultyLoading, setIsFacultyLoading] = useState(true);

  // 사이트 소개 콘텐츠 가져오기
  useEffect(() => {
    const fetchIntroContent = async () => {
      try {
        const response = await fetch('/api/about/intro');
        if (response.ok) {
          const data = await response.json();
          setIntroContent(data.content);
        } else {
          console.error('콘텐츠 조회 실패');
        }
      } catch (error) {
        console.error('콘텐츠 조회 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIntroContent();
  }, []);

  // 전공 소개 콘텐츠 가져오기
  useEffect(() => {
    const fetchMajorContent = async () => {
      try {
        const response = await fetch('/api/about/major');
        if (response.ok) {
          const data = await response.json();
          setMajorContent(data.content);
        } else {
          console.error('전공 소개 콘텐츠 조회 실패');
        }
      } catch (error) {
        console.error('전공 소개 콘텐츠 조회 오류:', error);
      } finally {
        setIsMajorLoading(false);
      }
    };

    fetchMajorContent();
  }, []);

  // 커리큘럼 콘텐츠 가져오기
  useEffect(() => {
    const fetchCurriculumContent = async () => {
      try {
        const response = await fetch('/api/about/curriculum');
        if (response.ok) {
          const data = await response.json();
          setCurriculumContent(data.content);
        } else {
          console.error('커리큘럼 콘텐츠 조회 실패');
        }
      } catch (error) {
        console.error('커리큘럼 콘텐츠 조회 오류:', error);
      } finally {
        setIsCurriculumLoading(false);
      }
    };

    fetchCurriculumContent();
  }, []);

  // 교수진 소개 콘텐츠 가져오기
  useEffect(() => {
    const fetchFacultyContent = async () => {
      try {
        const response = await fetch('/api/about/faculty');
        if (response.ok) {
          const data = await response.json();
          setFacultyContent(data.content);
        } else {
          console.error('교수진 소개 콘텐츠 조회 실패');
        }
      } catch (error) {
        console.error('교수진 소개 콘텐츠 조회 오류:', error);
      } finally {
        setIsFacultyLoading(false);
      }
    };

    fetchFacultyContent();
  }, []);

  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative w-full">
      {/* 배너 */}
      <div className="bg-black h-[191px] overflow-hidden relative shrink-0 w-full">
        {/* 배경 이미지 */}
        <div className="absolute h-[306px] left-0 top-[-66px] w-full">
          <img 
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
            alt="" 
            src={imgRectangle2827} 
          />
        </div>
        {/* 그라데이션 오버레이 */}
        <div className="absolute bg-gradient-to-l from-[rgba(255,178,114,0.6)] h-[191px] left-0 to-[#fd6f22] top-0 w-full" />
        {/* 텍스트 */}
        <div className="absolute flex flex-col items-start justify-end leading-[1.5] left-[19px] text-white top-[49px]">
          <p className="font-bold relative shrink-0 text-[44px]">
            About GCS
          </p>
          <p className="font-normal relative shrink-0 text-[15px] text-center">
            연계전공 GCS 및 사이트 소개
          </p>
        </div>
      </div>

      {/* 탭 바 */}
      <div className="bg-[#f8f6f4] flex h-[59px] items-center justify-between pb-[4px] pt-[12px] px-[20px] relative shrink-0 w-full">
        <button
          onClick={() => setSelectedTab('intro')}
          className={`flex h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 w-[68px] border-b ${
            selectedTab === 'intro' 
              ? 'border-[#1a1918] text-[#1a1918]' 
              : 'border-transparent text-[#b7b3af]'
          }`}
        >
          <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px]">
            사이트 소개
          </p>
        </button>
        <button
          onClick={() => setSelectedTab('major')}
          className={`flex h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 w-[68px] border-b ${
            selectedTab === 'major' 
              ? 'border-[#1a1918] text-[#1a1918]' 
              : 'border-transparent text-[#b7b3af]'
          }`}
        >
          <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px]">
            전공 소개
          </p>
        </button>
        <button
          onClick={() => setSelectedTab('curriculum')}
          className={`flex h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 w-[68px] border-b ${
            selectedTab === 'curriculum' 
              ? 'border-[#1a1918] text-[#1a1918]' 
              : 'border-transparent text-[#b7b3af]'
          }`}
        >
          <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px]">
            커리큘럼
          </p>
        </button>
        <button
          onClick={() => setSelectedTab('faculty')}
          className={`flex h-[43px] items-center justify-center px-[4px] py-0 relative shrink-0 w-[68px] border-b ${
            selectedTab === 'faculty' 
              ? 'border-[#1a1918] text-[#1a1918]' 
              : 'border-transparent text-[#b7b3af]'
          }`}
        >
          <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-center tracking-[-0.26px]">
            교수진 소개
          </p>
        </button>
      </div>

      {/* 본문 */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        {selectedTab === 'intro' && (
          <div className="bg-[#f8f6f4] flex flex-col gap-[8px] items-center pb-[32px] pt-[32px] px-0 relative shrink-0 w-full">
            {/* 이미지 갤러리 - 가로 스크롤 가능 */}
            {isLoading ? (
              <div className="w-full flex items-center justify-center py-8">
                <p className="text-[#1a1918] text-[12px]">이미지 로딩 중...</p>
              </div>
            ) : introContent && introContent.images && introContent.images.length > 0 ? (
              <div className="w-full overflow-x-auto overflow-y-hidden hide-scrollbar">
                <div className="flex gap-[12px] items-start relative shrink-0 pl-4 pr-4 pb-2" style={{ width: 'max-content' }}>
                  {introContent.images.map((imageUrl, index) => {
                    // 각 이미지별로 다른 스타일 적용
                    const imageStyles = [
                      "absolute h-[106.8%] left-[-24.6%] max-w-none top-0 w-[142.39%] object-cover",
                      "absolute h-[184.8%] left-[-10.48%] max-w-none top-[-53.23%] w-[117.48%] object-cover",
                      "absolute h-[177.78%] left-0 max-w-none top-[-19.09%] w-full object-cover",
                      "absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full",
                    ];
                    const isLast = index === introContent.images.length - 1;
                    
                    return (
                      <div key={index} className={`relative rounded-[4px] shrink-0 size-[110px] overflow-hidden flex-shrink-0 ${isLast ? 'mr-4' : ''}`}>
                        <img 
                          alt="" 
                          className={imageStyles[index] || imageStyles[3]} 
                          src={imageUrl} 
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center py-8">
                <p className="text-[#1a1918] text-[12px]">이미지를 불러올 수 없습니다.</p>
              </div>
            )}

            {/* 텍스트 설명 */}
            <div className="flex flex-col gap-[44px] items-center leading-[1.5] px-[16px] pt-[30px] pb-0 relative shrink-0 text-[#1a1918] w-full max-w-[375px]">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-[#1a1918] text-[12px]">로딩 중...</p>
                </div>
              ) : introContent ? (
                <>
                  {/* 한국어 설명 */}
                  <div className="flex flex-col font-medium h-auto justify-center relative shrink-0 w-full max-w-[343px]">
                    <p className="leading-[1.5] mb-0 text-[12px]">
                      <span className="text-[#1a1918]">{introContent.korean.paragraph1.text1}</span>
                      <span className="font-bold text-[#1a1918]">{introContent.korean.paragraph1.bold}</span>
                      <span className="text-[#1a1918]">
                        {introContent.korean.paragraph1.text2.includes('\n') ? (
                          introContent.korean.paragraph1.text2.split('\n').map((line, index, array) => (
                            <span key={index}>
                              {line}
                              {index < array.length - 1 && <br />}
                            </span>
                          ))
                        ) : (
                          introContent.korean.paragraph1.text2
                        )}
                      </span>
                      {introContent.korean.paragraph1.text3 && (
                        <>
                          {introContent.korean.paragraph1.text3}
                          <span className="text-[#1a1918]">{introContent.korean.paragraph1.text4}</span>
                        </>
                      )}
                    </p>
                    {introContent.korean.paragraph2 && (
                      <p className="leading-[1.5] mb-0 text-[#1a1918] text-[12px]">{introContent.korean.paragraph2}</p>
                    )}
                    {introContent.korean.paragraph3 && (
                      <p className="leading-[1.5] mb-0 text-[12px]">{introContent.korean.paragraph3}</p>
                    )}
                    {introContent.korean.paragraph4 && (
                      <p className="leading-[1.5] text-[12px]">
                        <span className="text-[#1a1918]">{introContent.korean.paragraph4}</span>
                      </p>
                    )}
                  </div>

                  {/* 영어 설명 */}
                  <div className="flex flex-col font-normal justify-center relative shrink-0 w-full max-w-[343px]">
                    <p className="mb-0 text-[#1a1918] text-[13px] leading-[1.5] tracking-[-0.26px]">
                      <span>{introContent.english.paragraph1.text1}</span>
                      <span className="font-bold tracking-[-0.26px]">{introContent.english.paragraph1.bold}</span>
                      {introContent.english.paragraph1.text2}
                    </p>
                    {introContent.english.paragraph2 && (
                      <p className="mb-0">{introContent.english.paragraph2}</p>
                    )}
                    {introContent.english.paragraph3 && (
                      <p className="text-[#1a1918] text-[13px] leading-[1.5] tracking-[-0.26px]">{introContent.english.paragraph3}</p>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <p className="text-[#1a1918] text-[12px]">콘텐츠를 불러올 수 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 전공 소개 탭 */}
        {selectedTab === 'major' && (
          <div className="bg-[#f8f6f4] flex flex-col items-start justify-center px-[16px] py-[32px] relative shrink-0 w-full">
            {isMajorLoading ? (
              <div className="flex items-center justify-center py-8 w-full">
                <p className="text-[#443e3c] text-[13px]">로딩 중...</p>
              </div>
            ) : majorContent ? (
              <div className="flex flex-col gap-[24px] items-start relative shrink-0 w-full max-w-[343px] mx-auto">
                {/* 제목 및 설명 */}
                <div className="flex flex-col gap-[10px] items-start leading-[1.5] relative shrink-0 text-[#443e3c] w-full">
                  {/* 제목 */}
                  <div className="flex flex-col font-bold justify-center leading-[1.5] relative shrink-0 text-[15px]">
                    <p className="mb-0">{majorContent.title.korean}</p>
                    <p>{majorContent.title.english}</p>
                  </div>
                  
                  {/* 설명 텍스트 */}
                  <div className="flex flex-col font-normal justify-center relative shrink-0 text-[13px] tracking-[-0.26px] w-full">
                    <p className="mb-0">
                      <span className="font-bold text-[#443e3c] tracking-[-0.26px]">{majorContent.description.paragraph1.text1}</span>{' '}
                      <span className="font-bold text-[#fd6f22] tracking-[-0.26px]">{majorContent.description.paragraph1.bold1}</span>
                      <span>{majorContent.description.paragraph1.text2} </span>
                      <span className="font-bold text-[#fd6f22] tracking-[-0.26px]">{majorContent.description.paragraph1.bold2}</span>
                      <span className="text-[#fd6f22]">{majorContent.description.paragraph1.text3} </span>
                      <span>{majorContent.description.paragraph1.text4} </span>
                      <span className="font-bold text-[#fd6f22] tracking-[-0.26px]">{majorContent.description.paragraph1.bold3}</span>
                      <span>{majorContent.description.paragraph1.text5}</span>
                    </p>
                    {majorContent.description.paragraph2 && (
                      <p className="mb-0">{majorContent.description.paragraph2}</p>
                    )}
                    {majorContent.description.paragraph3 && (
                      <p>{majorContent.description.paragraph3}</p>
                    )}
                  </div>
                </div>

                {/* 이미지 2개 - 좌우 배치 */}
                {majorContent.images && majorContent.images.length > 0 && (
                  <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                    {majorContent.images.map((image, index) => (
                      <div 
                        key={index}
                        className={`flex items-center ${
                          image.position === 'left' 
                            ? 'pl-0 pr-[100px] justify-start' 
                            : 'pl-[100px] pr-0 justify-end'
                        } py-0 relative shrink-0 w-full`}
                      >
                        <div className="aspect-[110/110] flex-[1_0_0] min-h-px min-w-px relative rounded-[4px] shrink-0 w-[110px]">
                          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[4px]">
                            <img 
                              alt="" 
                              className={image.className}
                              src={image.url} 
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center py-8 w-full">
                <p className="text-[#443e3c] text-[13px]">콘텐츠를 불러올 수 없습니다.</p>
              </div>
            )}
          </div>
        )}

        {/* 커리큘럼 탭 */}
        {selectedTab === 'curriculum' && (
          <div className="bg-[#f8f6f4] flex items-center justify-center px-0 py-[44px] relative shrink-0 w-full">
            {isCurriculumLoading ? (
              <div className="flex items-center justify-center py-8 w-full">
                <p className="text-[#85817e] text-[13px]">로딩 중...</p>
              </div>
            ) : curriculumContent && curriculumContent.courses ? (
              <div className="flex flex-col gap-[24px] items-end relative shrink-0 w-full max-w-[400px] mx-auto px-4">
                {curriculumContent.courses.map((course, index) => (
                  <div key={index} className="flex flex-col items-start relative shrink-0 w-full">
                    <div className="bg-white border-[0.5px] border-[#ffd2a9] border-solid flex flex-col items-start px-[12px] py-[4px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
                      <div className="flex gap-[12px] items-center relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full">
                        <div className="flex flex-col justify-center relative shrink-0">
                          <p className="leading-[1.5]">{course.code}</p>
                        </div>
                        <div className="flex flex-col justify-center relative shrink-0">
                          <p className="leading-[1.5]">{course.name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#eeebe6] border-[0.5px] border-solid border-white flex items-center justify-center p-[10px] relative rounded-bl-[4px] rounded-br-[4px] shrink-0 w-full">
                      <div className="flex flex-[1_0_0] flex-col justify-center relative shrink-0 text-[10px] text-[#1a1918]">
                        {course.description.map((desc, descIndex) => (
                          <p 
                            key={descIndex} 
                            className={`leading-[1.5] whitespace-pre-wrap ${descIndex < course.description.length - 1 ? 'mb-0' : ''}`}
                          >
                            {desc}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-8 w-full">
                <p className="text-[#85817e] text-[13px]">커리큘럼을 불러올 수 없습니다.</p>
              </div>
            )}
          </div>
        )}

        {/* 교수진 소개 탭 */}
        {selectedTab === 'faculty' && (
          <div className="bg-[#f8f6f4] flex flex-col items-start px-0 py-[32px] relative shrink-0 w-full">
            {isFacultyLoading ? (
              <div className="flex items-center justify-center py-8 w-full">
                <p className="text-[#1a1918] text-[15px]">로딩 중...</p>
              </div>
            ) : facultyContent ? (
              <>
                {/* 제목 */}
                <div className="flex flex-col items-start justify-center px-[16px] py-0 relative shrink-0 w-full">
                  <div className="flex flex-col font-bold justify-center leading-[1.5] relative shrink-0 text-[15px] text-[#1a1918]">
                    <p className="leading-[1.5]">{facultyContent.title}</p>
                  </div>
                </div>

                {/* 교수진 카드들 */}
                <div className="flex flex-col gap-[22px] items-start px-[20px] py-[16px] relative shrink-0 w-full">
                  {facultyContent.professors.map((professor, index) => (
                    <div 
                      key={index}
                      className={`flex flex-col ${professor.alignment === 'left' ? 'items-start' : 'items-end'} relative shrink-0 w-full`}
                    >
                      <div className="bg-[#eeebe6] flex flex-col items-start p-[16px] relative rounded-[8px] shrink-0 w-[350px]">
                        <div className={`flex gap-[12px] items-center justify-between relative shrink-0 w-full ${professor.alignment === 'left' ? 'flex-row-reverse' : ''}`}>
                          {/* 텍스트 영역 */}
                          <div className="flex flex-col gap-[6px] items-start overflow-hidden relative flex-1 min-w-0 text-[#1a1918]">
                            <div className="flex flex-col font-bold h-[19px] justify-center relative shrink-0 text-[17px] w-full">
                              <p className="leading-[1.5]">{professor.name}</p>
                            </div>
                            <div className="flex flex-col font-normal justify-center relative shrink-0 text-[10px] w-full">
                              {professor.positions.map((position, posIndex) => (
                                <p 
                                  key={posIndex}
                                  className={`leading-[1.5] ${posIndex < professor.positions.length - 1 ? 'mb-0' : ''}`}
                                >
                                  {position}
                                </p>
                              ))}
                            </div>
                            {professor.hasLine && professor.lineImageUrl && (
                              <div className="h-0 relative shrink-0 w-[140px]">
                                <div className="absolute inset-[-0.4px_0_0_0]">
                                  <img alt="" className="block max-w-none size-full" src={professor.lineImageUrl} />
                                </div>
                              </div>
                            )}
                            {professor.courses && professor.courses.length > 0 && (
                              <div className="flex flex-col font-normal justify-center relative shrink-0 text-[10px] w-full">
                                <p className="mb-0 leading-[1.5]">담당과목</p>
                                {professor.courses.map((course, courseIndex) => (
                                  <p 
                                    key={courseIndex}
                                    className={`leading-[1.5] ${courseIndex < professor.courses!.length - 1 ? 'mb-0' : ''}`}
                                  >
                                    {course}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                          {/* 이미지 영역 */}
                          <div className={`${professor.imageClassName.includes('aspect') ? 'aspect-[529/630]' : ''} h-[95px] relative rounded-[4px] shrink-0 ${professor.imageClassName.includes('aspect') ? '' : 'w-[80px]'} overflow-hidden`}>
                            {professor.imageClassName.includes('absolute h-[108.76%]') ? (
                              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[4px]">
                                <img 
                                  alt={professor.name} 
                                  className={professor.imageClassName}
                                  src={professor.imageUrl} 
                                />
                              </div>
                            ) : (
                              <img 
                                alt={professor.name} 
                                className={professor.imageClassName}
                                src={professor.imageUrl} 
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center py-8 w-full">
                <p className="text-[#1a1918] text-[15px]">교수진 정보를 불러올 수 없습니다.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

