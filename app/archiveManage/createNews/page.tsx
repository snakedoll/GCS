'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/401b5af8-b55c-4753-8124-7291270f8973";
const imgVector = "https://www.figma.com/api/mcp/asset/e69e44a6-db99-4380-812d-7348f606daae";
const img1 = "https://www.figma.com/api/mcp/asset/4bffbdb7-37eb-4db7-b60e-3e2a036c2adc";

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
        새 뉴스 작성
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

export default function CreateNewsPage() {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [representativeImage, setRepresentativeImage] = useState<File[]>([]);
  const [content, setContent] = useState('');
  const [showOnMain, setShowOnMain] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (representativeImage.length + files.length > 3) {
        alert('첨부 파일은 최대 3개까지 등록 가능합니다.');
        return;
      }
      // 30MB 제한 체크
      const totalSize = files.reduce((sum, file) => sum + file.size, 0);
      const existingSize = representativeImage.reduce((sum, file) => sum + file.size, 0);
      if (totalSize + existingSize > 30 * 1024 * 1024) {
        alert('첨부 파일은 최대 30MB까지 등록 가능합니다.');
        return;
      }
      setRepresentativeImage([...representativeImage, ...files]);
    }
  };

  const handleImageRemove = (index: number) => {
    setRepresentativeImage(representativeImage.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-[#f8f6f4] flex flex-col items-center relative w-full min-h-screen">
      {/* Nav Bar */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <NavBarMobile />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[24px] items-start px-[33px] py-[40px] relative shrink-0 w-full pb-[100px]">
        {/* 날짜 */}
        <div className="flex flex-col gap-[3px] items-start relative shrink-0 w-full">
          <p className="font-bold leading-[1.5] not-italic relative shrink-0 text-[12px] text-black text-center">
            날짜
          </p>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="YYYY-MM-DD"
            className="bg-white h-[36px] px-[12px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full text-[12px] text-[#443e3c] focus:outline-none"
          />
        </div>

        {/* 제목 */}
        <div className="flex flex-col gap-[3px] items-start relative shrink-0 w-full">
          <p className="font-bold leading-[1.5] not-italic relative shrink-0 text-[12px] text-black w-full whitespace-pre-wrap">
            제목
          </p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요."
            className="bg-white h-[36px] px-[12px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full text-[12px] text-[#443e3c] focus:outline-none"
          />
        </div>

        {/* 부제목 */}
        <div className="flex flex-col gap-[3px] items-start relative shrink-0 w-full">
          <p className="font-bold leading-[1.5] not-italic relative shrink-0 text-[12px] text-black w-full whitespace-pre-wrap">
            부제목
          </p>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="부제목을 입력하세요."
            className="bg-white h-[36px] px-[12px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full text-[12px] text-[#443e3c] focus:outline-none"
          />
        </div>

        {/* 대표 이미지 */}
        <div className="flex flex-col gap-[3px] items-start relative shrink-0 w-full">
          <p className="font-bold leading-[1.5] not-italic text-[12px] text-black">
            대표 이미지
          </p>
          <label className="bg-white h-[36px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] w-full cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-between px-[12px]">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
            <span className="font-normal leading-[1.5] not-italic text-[12px] text-[#443e3c]">
              {representativeImage.length > 0 ? `${representativeImage.length}개 파일 선택됨` : '파일 첨부'}
            </span>
            <div className="h-[11px] relative shrink-0 w-[10px]">
              <div className="absolute inset-[-4.55%_-5%]">
                <img alt="" className="block max-w-none size-full" src={imgVector} />
              </div>
            </div>
          </label>
          <p className="font-normal leading-[1.5] not-italic text-[9px] text-[#443e3c] text-center w-full">
            첨부 파일은 최대 3개, 30MB까지 등록 가능합니다.
          </p>
          {representativeImage.length > 0 && (
            <div className="flex flex-wrap gap-[8px] mt-[4px] w-full">
              {representativeImage.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Representative ${index + 1}`}
                    className="w-[80px] h-[80px] object-cover rounded-[4px]"
                  />
                  <button
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-[-4px] right-[-4px] bg-[#d4183d] text-white rounded-full size-[20px] flex items-center justify-center hover:opacity-80"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 내용 작성 */}
        <div className="flex flex-col gap-[3px] items-start relative shrink-0 w-full">
          <p className="font-bold leading-[1.5] not-italic relative shrink-0 text-[12px] text-black w-full whitespace-pre-wrap">
            내용 작성
          </p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요."
            className="bg-white h-[214px] px-[12px] py-[12px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full text-[12px] text-[#443e3c] focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* 하단 액션 바 */}
      <div className="fixed bg-[#fd6f22] flex gap-[76px] h-[65px] items-center px-[18px] py-[12px] left-0 bottom-0 rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full z-[100]">
        <button
          onClick={() => setShowOnMain(!showOnMain)}
          className="relative shrink-0 size-[24px] cursor-pointer"
        >
          <div className="absolute contents left-[2px] top-[2px]">
            <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${showOnMain ? 'bg-[#2a2a2e]' : ''}`} />
            {showOnMain && (
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
        <p className="font-bold leading-[1.5] not-italic relative shrink-0 text-[12px] text-center text-white tracking-[-0.24px]">
          메인에 띄우기
        </p>
        <div className="flex gap-[9px] items-center relative shrink-0">
          <button className="bg-white flex h-[34px] items-center justify-center px-[12px] py-0 relative rounded-[12px] shrink-0 hover:opacity-80 transition-opacity">
            <p className="font-normal leading-[1.5] not-italic relative shrink-0 text-[13px] text-[#1a1918] tracking-[-0.26px]">
              저장
            </p>
          </button>
          <button className="bg-white flex h-[34px] items-center justify-center px-[12px] py-0 relative rounded-[12px] shrink-0 hover:opacity-80 transition-opacity">
            <p className="font-normal leading-[1.5] not-italic relative shrink-0 text-[13px] text-[#1a1918] tracking-[-0.26px]">
              등록
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

