'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 이미지 URL 상수들
const imgVector827 = "https://www.figma.com/api/mcp/asset/9a45a8fa-ce31-4b5d-a16f-91109a7a367e";
const imgVector828 = "https://www.figma.com/api/mcp/asset/0a740010-f1bc-49e3-839e-bf0ca9f501d6";
const imgEllipse5406 = "https://www.figma.com/api/mcp/asset/834290ce-51f9-425c-94cc-a9898fbd9569";
const imgEllipse5405 = "https://www.figma.com/api/mcp/asset/db9d11ab-60b4-4b7d-9fa4-601a01560e5d";
const imgEllipse5404 = "https://www.figma.com/api/mcp/asset/dca4c6a7-8ad7-436d-b2a6-59b8c1b96e23";
const img = "https://www.figma.com/api/mcp/asset/51f551d4-b967-4a84-8e92-36d6d91cbe21";
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/d350acba-2c6e-4f32-ba15-4ce333a066ec";
const img1 = "https://www.figma.com/api/mcp/asset/0bfb5225-7d5d-4633-b357-dc13de22029b";
const img2 = "https://www.figma.com/api/mcp/asset/9ae8c6ea-ccce-47c8-9ba5-417ffbd6d021";
const img3 = "https://www.figma.com/api/mcp/asset/caeee192-2701-4be8-a8b0-dda758b837ac";
const img4 = "https://www.figma.com/api/mcp/asset/26654b26-d8d6-4997-b48f-6e493defa127";
const img5 = "https://www.figma.com/api/mcp/asset/e5f1928e-3e54-479b-8fdc-79719020a51a";

export default function TestFindPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

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
            <img alt="" className="block max-w-none size-full" src={img1} />
          </div>
        </div>
        <div className="absolute inset-[0_0_0_68.67%]">
          <div className="absolute inset-0">
            <img alt="" className="block max-w-none size-full" src={img2} />
          </div>
        </div>
        <div className="absolute inset-[32.59%_-3.66%_23.7%_-2.35%]">
          <img alt="" className="block max-w-none size-full" src={img3} />
        </div>
        <div className="absolute inset-[1.48%_65.71%_0.06%_18.58%]">
          <div className="absolute inset-0">
            <img alt="" className="block max-w-none size-full" src={img4} />
          </div>
        </div>
        <div className="absolute inset-[1.48%_32.86%_0_36.07%]">
          <div className="absolute inset-0">
            <img alt="" className="block max-w-none size-full" src={img5} />
          </div>
        </div>
      </div>

      {/* 비밀번호 찾기 폼 카드 */}
      <div className="absolute bg-[#f8f6f4] flex flex-col gap-[40px] h-[631px] items-center left-0 pb-[24px] pt-[96px] px-0 rounded-tl-[12px] rounded-tr-[12px] shadow-[0px_-4px_10px_0px_rgba(238,74,8,0.4)] top-[181px] w-[375px]">
        {/* 헤더 */}
        <div className="flex flex-col items-center relative shrink-0">
          <div className="flex gap-[16px] items-center pl-[97px] pr-0 py-0 relative shrink-0 w-[375px]">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center relative shrink-0"
            >
              <div className="flex-none scale-y-[-100%]">
                <div className="relative size-[24px]">
                  <div className="absolute contents left-[9px] top-[5px]">
                    <div className="absolute flex h-[14px] items-center justify-center left-[9px] top-[5px] w-[6px]">
                      <div className="flex-none rotate-[270deg]">
                        <div className="h-[6px] relative w-[14px]">
                          <div className="absolute inset-[-6.16%_-5.36%_-12.5%_-5.36%]">
                            <img alt="" className="block max-w-none size-full" src={img} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <div className="flex flex-col items-center relative shrink-0">
              <p className="font-bold leading-[1.5] relative shrink-0 text-[22px] text-[#443e3c] text-center">
                비밀번호 찾기
              </p>
            </div>
          </div>
        </div>

        {/* 입력 필드 */}
        <div className="flex flex-col gap-[48px] items-start px-[16px] py-0 relative shrink-0 w-full">
          <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            {/* 아이디 (이메일) 필드 */}
            <div className="flex flex-col items-start px-[8px] py-0 relative shrink-0 w-full">
              <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                  <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                      아이디 (이메일)
                    </p>
                  </div>
                  <div className="flex gap-[5px] items-start relative shrink-0 w-full">
                    <div className="border border-[#5f5a58] border-solid flex flex-1 h-[48px] items-center justify-between p-[12px] relative rounded-[12px] shrink-0">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] bg-transparent border-none outline-none flex-1"
                      />
                      <div className="flex items-center justify-center shrink-0 w-[35px]" />
                    </div>
                    <button className="bg-[#443e3c] cursor-pointer flex items-center justify-center p-[12px] relative rounded-[12px] self-stretch shrink-0 w-[70px] hover:opacity-90 transition-opacity">
                      <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#f8f6f4] tracking-[-0.26px]">
                        전송
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 인증번호 필드 */}
            <div className="flex flex-col items-start px-[8px] py-0 relative shrink-0 w-full">
              <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                  <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                      인증번호
                    </p>
                  </div>
                  <div className="flex gap-[5px] items-start relative shrink-0 w-full">
                    <div className="border border-[#5f5a58] border-solid flex flex-1 h-[48px] items-center justify-between p-[12px] relative rounded-[12px] shrink-0">
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="인증번호를 입력하세요"
                        className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] bg-transparent border-none outline-none flex-1"
                      />
                      <div className="flex items-center justify-center relative shrink-0 w-[35px]">
                        {/* 백엔드에서 타이머 데이터를 가져와서 표시할 영역 */}
                        <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                          {/* 05:00 */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 버튼 및 링크 */}
          <div className="flex flex-col gap-[32px] items-center px-[8px] py-0 relative shrink-0 w-full">
            <button className="bg-[#c9c1b7] cursor-pointer flex items-center justify-center p-[16px] relative rounded-[12px] shrink-0 w-full hover:opacity-90 transition-opacity">
              <p className="font-normal leading-[1.5] relative shrink-0 text-[15px] text-[#f8f6f4]">
                인증하기
              </p>
            </button>
            <div className="flex gap-[4px] items-start justify-center leading-[1.5] relative shrink-0 text-[13px] tracking-[-0.26px] w-full">
              <p className="font-normal relative shrink-0 text-[#85817e]">
                아직 계정이 없습니까?
              </p>
              <Link href="/signup" className="font-bold relative shrink-0 text-[#fd6f22] hover:opacity-80 transition-opacity">
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

