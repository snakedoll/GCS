'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 이미지 URL 상수들
const imgVector827 = "https://www.figma.com/api/mcp/asset/5cc82f37-6693-4a20-b5c0-1c7917ff50c9";
const imgVector828 = "https://www.figma.com/api/mcp/asset/61c27a7e-cea2-4485-8312-ad06f1d0b6e4";
const imgEllipse5406 = "https://www.figma.com/api/mcp/asset/478cf139-15ef-4586-a2ca-d7c877022bb9";
const imgEllipse5405 = "https://www.figma.com/api/mcp/asset/72beeed8-223c-42e7-b9db-406502d00a4f";
const imgEllipse5404 = "https://www.figma.com/api/mcp/asset/f2e8cd14-0ef1-42dd-95fc-0fd6360ff40b";
const img = "https://www.figma.com/api/mcp/asset/f3e324c0-c766-43a9-bc89-066c10960ab8";
const img1 = "https://www.figma.com/api/mcp/asset/f3e324c0-c766-43a9-bc89-066c10960ab8";
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/3cddccd1-2bad-4aa0-a617-73e2de19ef39";
const img2 = "https://www.figma.com/api/mcp/asset/870a890a-9322-4b61-98c1-926a681821e0";
const img3 = "https://www.figma.com/api/mcp/asset/902573ba-d02a-4db9-85a4-fcbcede92285";
const img4 = "https://www.figma.com/api/mcp/asset/8db1d770-0f27-44aa-abb6-d2fb9f6e69d2";
const img5 = "https://www.figma.com/api/mcp/asset/9978dcc5-6ead-4f6c-8381-3497d6df4986";
const img6 = "https://www.figma.com/api/mcp/asset/64832686-2b3a-4f8b-9b0d-de2d2003468b";

export default function TestFindIDPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

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
            <img alt="" className="block max-w-none size-full" src={img2} />
          </div>
        </div>
        <div className="absolute inset-[0_0_0_68.67%]">
          <div className="absolute inset-0">
            <img alt="" className="block max-w-none size-full" src={img3} />
          </div>
        </div>
        <div className="absolute inset-[32.59%_-3.66%_23.7%_-2.35%]">
          <img alt="" className="block max-w-none size-full" src={img4} />
        </div>
        <div className="absolute inset-[1.48%_65.71%_0.06%_18.58%]">
          <div className="absolute inset-0">
            <img alt="" className="block max-w-none size-full" src={img5} />
          </div>
        </div>
        <div className="absolute inset-[1.48%_32.86%_0_36.07%]">
          <div className="absolute inset-0">
            <img alt="" className="block max-w-none size-full" src={img6} />
          </div>
        </div>
      </div>

      {/* 아이디 찾기 폼 카드 */}
      <div className="absolute bg-[#f8f6f4] flex flex-col gap-[40px] h-[631px] items-center left-0 pb-[24px] pt-[96px] px-0 rounded-tl-[12px] rounded-tr-[12px] shadow-[0px_-4px_10px_0px_rgba(238,74,8,0.4)] top-[181px] w-[375px]">
        {/* 헤더 */}
        <div className="flex gap-[16px] items-center pl-[97px] pr-0 py-0 relative shrink-0 w-full">
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
              아이디 찾기
            </p>
          </div>
        </div>

        {/* 입력 필드 */}
        <div className="flex flex-col h-[428px] items-center justify-end px-[16px] py-0 relative shrink-0 w-full">
          <div className="flex flex-col gap-[48px] items-start relative shrink-0 w-full">
            <div className="flex flex-col gap-[16px] items-start px-[8px] py-0 relative shrink-0 w-full">
              {/* 이름 필드 */}
              <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                  <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                      이름
                    </p>
                  </div>
                  <div className="border border-[#5f5a58] border-solid flex h-[48px] items-center justify-between p-[12px] relative rounded-[12px] shrink-0 w-full">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="김봉구"
                      className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] bg-transparent border-none outline-none flex-1"
                    />
                    <div className="flex items-center relative shrink-0 w-[24px]">
                      <div className="opacity-0 overflow-clip relative shrink-0 size-[24px]">
                        <div className="absolute inset-[8.33%]">
                          <div className="absolute inset-0">
                            <img alt="" className="block max-w-none size-full" src={img1} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 전화번호 필드 */}
              <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                <div className="flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                  <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px]">
                      전화번호
                    </p>
                  </div>
                  <div className="border border-[#5f5a58] border-solid flex h-[48px] items-center justify-between p-[12px] relative rounded-[12px] shrink-0 w-full">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="010-1234-5678"
                      className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] bg-transparent border-none outline-none flex-1"
                    />
                    <div className="flex items-center shrink-0 w-[24px]" />
                  </div>
                </div>
              </div>
            </div>

            {/* 버튼 및 링크 */}
            <div className="flex flex-col h-[196px] items-center justify-between relative shrink-0 w-full">
              <div className="flex flex-col gap-[32px] items-center px-[8px] py-0 relative shrink-0 w-full">
                <button className="bg-[#443e3c] cursor-pointer flex items-center justify-center p-[16px] relative rounded-[12px] shrink-0 w-full hover:opacity-90 transition-opacity">
                  <p className="font-normal leading-[1.5] relative shrink-0 text-[15px] text-[#f8f6f4]">
                    아이디 찾기
                  </p>
                </button>
                <div className="flex gap-[4px] items-center leading-[1.5] relative shrink-0 text-[13px] tracking-[-0.26px]">
                  <p className="font-normal relative shrink-0 text-[#85817e]">
                    아직 계정이 없으신가요?
                  </p>
                  <Link href="/signup" className="font-bold relative shrink-0 text-[#fd6f22] hover:opacity-80 transition-opacity">
                    회원가입
                  </Link>
                </div>
              </div>
              <div className="flex h-[19.44px] items-start justify-center relative shrink-0">
                <Link href="/find-password" className="flex h-full items-start justify-center relative shrink-0 w-[74px] hover:opacity-80 transition-opacity">
                  <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px]">
                    비밀번호 찾기
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
