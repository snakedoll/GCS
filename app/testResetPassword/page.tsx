'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 이미지 URL 상수들
const imgVector827 = "https://www.figma.com/api/mcp/asset/6eb45561-dd0f-4804-9890-00a29b4e2de2";
const imgVector828 = "https://www.figma.com/api/mcp/asset/2862a19b-c96d-4863-ac18-888bd054863f";
const imgEllipse5406 = "https://www.figma.com/api/mcp/asset/8acdde75-9896-48b2-b5c9-0c859c91876b";
const imgEllipse5405 = "https://www.figma.com/api/mcp/asset/68f1116a-63c1-4894-ac49-f21a784822c9";
const imgEllipse5404 = "https://www.figma.com/api/mcp/asset/96df4897-7d84-436f-8a01-2edaac668483";
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/2ed0a53f-d1b9-49c7-8bbd-978a4e79c8d6";
const img = "https://www.figma.com/api/mcp/asset/3a0c2fe0-868a-4cbd-ae24-3877e2e19c57";
const img1 = "https://www.figma.com/api/mcp/asset/becb1781-2b55-49bb-8088-069cb52b4bd3";
const img2 = "https://www.figma.com/api/mcp/asset/9596b77a-5611-49ad-a05b-e064144b506f";
const img3 = "https://www.figma.com/api/mcp/asset/dcad04ca-6367-45c6-aa9f-83549c7c2717";
const img4 = "https://www.figma.com/api/mcp/asset/0bb54d0a-dd90-422e-ad99-84db38740257";

export default function TestResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="h-[812px] overflow-clip relative w-full max-w-[375px] mx-auto" style={{ backgroundImage: "linear-gradient(236.47860593860838deg, rgba(253, 111, 34, 1) 1.2987%, rgba(254, 135, 57, 1) 66.571%)" }}>
      {/* 배경 장식 요소들 */}
      <div className="absolute flex h-[294.654px] items-center justify-center left-[-47.67px] top-[-22.16px] w-[522.881px]">
        <div className="flex-none rotate-[339.444deg]">
          <div className="h-[122.508px] relative w-[512.496px]">
            <div className="absolute inset-0">
              <img alt="" className="block max-w-none size-full" src={imgVector827} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[447.702px] items-center justify-center left-[-27.92px] top-[-23.12px] w-[567.013px]">
        <div className="flex-none rotate-[333.242deg]">
          <div className="h-[242.984px] relative w-[512.496px]">
            <div className="absolute inset-0">
              <img alt="" className="block max-w-none size-full" src={imgVector828} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[292.809px] items-center justify-center left-[106px] top-[-101px] w-[173.072px]">
        <div className="flex-none rotate-[5.928deg]">
          <div className="h-[279.328px] relative w-[145px]">
            <div className="absolute inset-[-71.6%_-137.93%]">
              <img alt="" className="block max-w-none size-full" src={imgEllipse5406} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[265.695px] items-center justify-center left-[192px] top-[-20px] w-[263.094px]">
        <div className="flex-none rotate-[43.746deg]">
          <div className="h-[229px] relative w-[145px]">
            <div className="absolute inset-[-87.34%_-137.93%]">
              <img alt="" className="block max-w-none size-full" src={imgEllipse5405} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-[5px] size-[145px] top-[68px]">
        <div className="absolute inset-[-137.93%]">
          <img alt="" className="block max-w-none size-full" src={imgEllipse5404} />
        </div>
      </div>

      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => router.back()}
        className="absolute flex items-center justify-center left-[16px] top-[39px] w-[24px] z-10"
      >
        <div className="h-[24px] relative shrink-0 w-[12px]">
          <img alt="" className="block max-w-none size-full" src={imgWeuiBackFilled} />
        </div>
      </button>

      {/* 로고 */}
      <div className="absolute h-[29.608px] left-1/2 top-[89px] translate-x-[-50%] w-[84px]">
        <div className="absolute inset-[1.48%_82.19%_0_0]">
          <div className="absolute inset-0">
            <img alt="" className="block max-w-none size-full" src={img} />
          </div>
        </div>
        <div className="absolute inset-[0_0_0_68.67%]">
          <div className="absolute inset-0">
            <img alt="" className="block max-w-none size-full" src={img1} />
          </div>
        </div>
        <div className="absolute inset-[32.59%_-3.66%_23.7%_-2.35%]">
          <img alt="" className="block max-w-none size-full" src={img2} />
        </div>
        <div className="absolute inset-[1.48%_65.71%_0.06%_18.58%]">
          <div className="absolute inset-0">
            <img alt="" className="block max-w-none size-full" src={img3} />
          </div>
        </div>
        <div className="absolute inset-[1.48%_32.86%_0_36.07%]">
          <div className="absolute inset-0">
            <img alt="" className="block max-w-none size-full" src={img4} />
          </div>
        </div>
      </div>

      {/* 새 비밀번호 설정 폼 카드 */}
      <div className="absolute bg-[#f8f6f4] flex flex-col gap-[40px] h-[631px] items-center left-0 pb-[24px] pt-[96px] px-0 rounded-tl-[12px] rounded-tr-[12px] shadow-[0px_-4px_10px_0px_rgba(238,74,8,0.4)] top-[181px] w-[375px]">
        {/* 헤더 */}
        <div className="flex flex-col items-center relative shrink-0">
          <p className="font-bold leading-[1.5] relative shrink-0 text-[22px] text-[#443e3c] text-center">
            새 비밀번호 설정
          </p>
        </div>

        {/* 입력 필드 */}
        <div className="flex flex-col gap-[48px] items-start px-[16px] py-0 relative shrink-0 w-full">
          <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            {/* 새 비밀번호 필드 */}
            <div className="flex flex-col items-start px-[8px] py-0 relative shrink-0 w-full">
              <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                  <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                      새 비밀번호
                    </p>
                  </div>
                  <div className="flex gap-[5px] items-start relative shrink-0 w-full">
                    <div className="border border-[#5f5a58] border-solid flex flex-1 h-[48px] items-center justify-between p-[12px] relative rounded-[12px] shrink-0">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="8자 이상 영문, 숫자 조합"
                        className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] bg-transparent border-none outline-none flex-1"
                      />
                      <div className="flex items-center justify-center relative shrink-0 w-[35px]">
                        {/* 백엔드에서 비밀번호 유효성 검사 결과를 표시할 영역 */}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="font-normal leading-[1.75] relative shrink-0 text-[10px] text-[#5f5a58] w-full whitespace-pre-wrap">
                  8자 이상 영문, 숫자 조합
                </p>
              </div>
            </div>

            {/* 비밀번호 확인 필드 */}
            <div className="flex flex-col items-start px-[8px] py-0 relative shrink-0 w-full">
              <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                  <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                      비밀번호 확인
                    </p>
                  </div>
                  <div className="flex gap-[5px] items-start relative shrink-0 w-full">
                    <div className="border border-[#5f5a58] border-solid flex flex-1 h-[48px] items-center justify-between p-[12px] relative rounded-[12px] shrink-0">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="비밀번호를 다시 입력하세요"
                        className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] bg-transparent border-none outline-none flex-1"
                      />
                      <div className="flex items-center justify-center relative shrink-0 w-[35px]">
                        {/* 백엔드에서 비밀번호 일치 여부를 표시할 영역 */}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="font-normal leading-[1.75] relative shrink-0 text-[10px] text-[#5f5a58] w-full whitespace-pre-wrap">
                  8자 이상 영문, 숫자 조합
                </p>
              </div>
            </div>
          </div>

          {/* 버튼 및 링크 */}
          <div className="flex flex-col gap-[32px] items-center px-[8px] py-0 relative shrink-0 w-full">
            <button className="bg-[#c9c1b7] cursor-pointer flex items-center justify-center p-[16px] relative rounded-[12px] shrink-0 w-full hover:opacity-90 transition-opacity">
              <p className="font-normal leading-[1.5] relative shrink-0 text-[15px] text-[#f8f6f4]">
                확인
              </p>
            </button>
            <div className="flex gap-[4px] items-start justify-center leading-[1.5] relative shrink-0 text-[13px] tracking-[-0.26px] w-full">
              <p className="font-normal relative shrink-0 text-[#85817e]">
                로그인 페이지로 돌아갈까요?
              </p>
              <Link href="/Login" className="font-bold relative shrink-0 text-[#fd6f22] hover:opacity-80 transition-opacity">
                로그인
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

