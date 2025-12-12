'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

// 이미지 URL 상수들
const img15 = "https://www.figma.com/api/mcp/asset/6b5db2bb-796e-4f77-b0e1-d375fb9a2ba0";
const imgVector = "https://www.figma.com/api/mcp/asset/16ce081d-fc09-4410-8283-49aa7815c2e8";
const imgVector1 = "https://www.figma.com/api/mcp/asset/cfe222ac-c4dc-463d-a748-8fc8393d30a6";
const imgVector2 = "https://www.figma.com/api/mcp/asset/acba40d1-b980-4829-b3e0-a0cbf32eb080";
const imgLine321 = "https://www.figma.com/api/mcp/asset/5c1b85b5-e148-41fb-9a34-f0d8ee093e67";
const imgRectangle2823 = "https://www.figma.com/api/mcp/asset/cc74fff0-1ae9-4dc6-b4d8-f526bd5902fe";
const imgEllipse5500 = "https://www.figma.com/api/mcp/asset/7e39b871-077d-4fa6-9cf7-55b5f8bebfb2";
const imgVector833 = "https://www.figma.com/api/mcp/asset/05814c2d-2545-4a9a-8040-868e8804bcf7";
const imgVector832 = "https://www.figma.com/api/mcp/asset/8a44e89c-1d67-4b19-afb1-8b8a8bb29ece";
const imgEllipse5499 = "https://www.figma.com/api/mcp/asset/9c1cbc89-581f-41ba-a073-eafcf0493b01";
const imgEllipse5498 = "https://www.figma.com/api/mcp/asset/81675f3f-6938-46e0-8b5e-53f34d7c8251";
const img10 = "https://www.figma.com/api/mcp/asset/0ab6387e-012a-49b6-be51-665707d0b842";
const img11 = "https://www.figma.com/api/mcp/asset/2cb3162e-9046-4a06-b033-177d5a468d6a";
const img12 = "https://www.figma.com/api/mcp/asset/f787a775-c2b6-443b-9872-d2d5cd10196e";
const img13 = "https://www.figma.com/api/mcp/asset/cbb074d7-f6ac-4376-8d51-6db3e0c96656";
const img14 = "https://www.figma.com/api/mcp/asset/6f57b013-c8c4-4f5d-9c7f-fab2a620f1f7";
const img5 = "https://www.figma.com/api/mcp/asset/9c554210-5f45-482b-9f59-9d6cdabef87a";
const img6 = "https://www.figma.com/api/mcp/asset/b7dfecea-bd14-42cc-a03b-5e5701cca823";
const img7 = "https://www.figma.com/api/mcp/asset/24bc8d8c-c75d-4e00-bfa3-6827af9b5b07";
const img8 = "https://www.figma.com/api/mcp/asset/e40caa8d-ab46-4070-a256-bdcf4ad15d91";
const img9 = "https://www.figma.com/api/mcp/asset/0dbded48-4c32-4b4a-8cec-2545cc191c97";
const imgBurger = "https://www.figma.com/api/mcp/asset/ee3f5996-06ee-47a9-b351-f1a56609f5fc";
const imgEllipse33 = "https://www.figma.com/api/mcp/asset/0d9bb898-698f-409a-953c-b77c8a4bcd65";
const imgRectangle2 = "https://www.figma.com/api/mcp/asset/ea93d2df-c6c9-4966-ba00-af8edfaac46c";

function LsiconRightFilled({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="absolute inset-[25.91%_36.2%_25.91%_35.29%]">
        <img alt="" className="block max-w-none size-full" src={imgVector} />
      </div>
    </div>
  );
}

function IconexLightUser({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="absolute contents left-[5px] top-[3px]">
        <div className="absolute flex items-center justify-center left-[8px] size-[8px] top-[3px]">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <div className="relative size-[8px]">
              <div className="absolute inset-[-9.38%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse33} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-[7.5px] left-[5px] top-[13px] w-[14px]">
          <div className="absolute inset-[3.85%_-5.36%_-6.03%_-5.36%]">
            <img alt="" className="block max-w-none size-full" src={imgRectangle2} />
          </div>
        </div>
      </div>
    </div>
  );
}

function IconexLightBurger({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="absolute h-[12px] left-[4px] top-[6px] w-[16px]">
        <div className="absolute inset-[-6.25%_-4.69%]">
          <img alt="" className="block max-w-none size-full" src={imgBurger} />
        </div>
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <div>
      <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
      <div className="bg-[#f8f6f4] h-[44px] overflow-clip relative shadow-[0px_4px_10px_0px_rgba(99,81,73,0.1)] shrink-0 w-full">
        <IconexLightBurger className="absolute left-[16px] size-[24px] top-[10px]" />
        <IconexLightUser className="absolute inset-[22.73%_4.27%_22.73%_89.33%]" />
        <div className="absolute h-[18.9px] left-[160.69px] top-[12.55px] w-[53.62px]">
          <div className="absolute inset-[1.48%_82.19%_0_0]">
            <img className="block max-w-none size-full" alt="" src={img5} />
          </div>
          <div className="absolute inset-[0_0_0_68.67%]">
            <img className="block max-w-none size-full" alt="" src={img6} />
          </div>
          <div className="absolute inset-[32.59%_-3.66%_23.7%_-2.35%]">
            <img className="block max-w-none size-full" alt="" src={img7} />
          </div>
          <div className="absolute inset-[1.48%_65.71%_0.06%_18.58%]">
            <img className="block max-w-none size-full" alt="" src={img8} />
          </div>
          <div className="absolute inset-[1.48%_32.86%_0_36.07%]">
            <img className="block max-w-none size-full" alt="" src={img9} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestPage() {
  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative min-h-screen w-full max-w-[375px] mx-auto">
      {/* NavBar */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <NavBar />
      </div>

      {/* 주황색 배경 영역 (Desktop) */}
      <div className="h-[243.75px] overflow-clip relative shrink-0 w-[375px]">
        <div className="absolute h-[243.75px] left-0 top-0 w-[375px]">
          <img alt="" className="block max-w-none size-full" src={imgRectangle2823} />
        </div>
        <div className="absolute h-[392.578px] left-[-82.62px] top-[-29px] w-[467.285px]">
          <div className="absolute inset-[-22.39%_-18.81%]">
            <img alt="" className="block max-w-none size-full" src={imgEllipse5500} />
          </div>
        </div>
        <div className="absolute flex h-[212.668px] items-center justify-center left-[-35.16px] top-[54.23px] w-[427.441px]">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <div className="h-[212.668px] relative w-[427.441px]">
              <img alt="" className="block max-w-none size-full" src={imgVector833} />
            </div>
          </div>
        </div>
        <div className="absolute h-[181.574px] left-[-79.1px] top-[149.71px] w-[427.502px]">
          <img alt="" className="block max-w-none size-full" src={imgVector832} />
        </div>
        <div className="absolute flex items-center justify-center left-[calc(50%-158.78px)] size-[304.117px] top-[calc(50%+98.74px)] translate-x-[-50%] translate-y-[-50%]">
          <div className="flex-none rotate-[131.046deg]">
            <div className="relative size-[215.556px]">
              <div className="absolute inset-[-23.11%_-20.39%_-17.67%_-20.39%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse5499} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center left-[calc(50%+146.99px)] size-[197.888px] top-[-51.56px] translate-x-[-50%]">
          <div className="flex-none rotate-[131.046deg]">
            <div className="relative size-[140.262px]">
              <div className="absolute inset-[-6.27%_-18.8%_-14.62%_-2.09%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse5498} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex flex-col items-center left-1/2 top-[calc(50%-0.15px)] translate-x-[-50%] translate-y-[-50%] w-[343px]">
          <div className="h-[52.441px] relative shrink-0 w-[148.242px]">
            <div className="absolute inset-[1.48%_82.19%_0_0]">
              <div className="absolute inset-0">
                <img alt="" className="block max-w-none size-full" src={img10} />
              </div>
            </div>
            <div className="absolute inset-[0_0_0_68.67%]">
              <div className="absolute inset-0">
                <img alt="" className="block max-w-none size-full" src={img11} />
              </div>
            </div>
            <div className="absolute inset-[32.59%_-3.66%_23.7%_-2.35%]">
              <img alt="" className="block max-w-none size-full" src={img12} />
            </div>
            <div className="absolute inset-[1.48%_65.71%_0.06%_18.58%]">
              <div className="absolute inset-0">
                <img alt="" className="block max-w-none size-full" src={img13} />
              </div>
            </div>
            <div className="absolute inset-[1.48%_32.86%_0_36.07%]">
              <div className="absolute inset-0">
                <img alt="" className="block max-w-none size-full" src={img14} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="h-[985.385px] relative shrink-0 w-[375px]">
        <div className="flex flex-col items-center left-[16px] top-[44px] w-[343px] relative">
          {/* Archive 섹션 */}
          <div className="flex flex-col gap-[60px] items-center pb-0 pt-[32px] px-0 relative shrink-0 w-full">
            <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
              <div className="flex flex-col items-start px-[16px] py-0 relative shrink-0 w-full">
                <div className="flex items-center opacity-80 pl-0 pr-[2px] py-0 relative shrink-0 w-full">
                  <div className="flex flex-col items-start mr-[-2px] relative shrink-0">
                    <p className="font-bold leading-[1.5] relative shrink-0 text-[24px] text-[#1a1918]">
                      Archive
                    </p>
                  </div>
                  <LsiconRightFilled className="mr-[-2px] relative shrink-0 size-[32px]" />
                </div>
              </div>
              <div className="flex flex-col gap-[20px] items-center relative shrink-0 w-full">
                <div className="flex items-center px-[12px] py-0 relative shrink-0 w-full">
                  <div className="border border-[#717171] border-solid flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0 w-[319px]">
                    <div className="aspect-[1080/1350] flex-[1_0_0] min-h-px min-w-px relative shadow-[0px_4.4px_11px_0px_rgba(0,0,0,0.2)] shrink-0">
                      <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img15} />
                    </div>
                  </div>
                </div>
                <p className="font-light leading-[1.5] relative shrink-0 text-[16px] text-[#1a1918]">
                  GCS의 프로젝트를 만나보세요!
                </p>
                <div className="flex gap-[12px] items-center justify-center relative shrink-0 w-full">
                  <div className="relative shrink-0 size-[6px]">
                    <div className="absolute inset-0">
                      <img alt="" className="block max-w-none size-full" src={imgVector1} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[6px]">
                    <div className="absolute inset-0">
                      <img alt="" className="block max-w-none size-full" src={imgVector2} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[6px]">
                    <div className="absolute inset-0">
                      <img alt="" className="block max-w-none size-full" src={imgVector2} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[6px]">
                    <div className="absolute inset-0">
                      <img alt="" className="block max-w-none size-full" src={imgVector2} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-0 relative shrink-0 w-full">
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine321} />
              </div>
            </div>
          </div>

          {/* Shop 섹션 */}
          <div className="flex flex-col items-center pb-0 pt-[32px] px-0 relative shrink-0 w-full">
            <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
              <div className="flex items-center opacity-80 pl-0 pr-[2px] py-0 relative shrink-0 w-full">
                <div className="flex flex-col items-start mr-[-2px] relative shrink-0">
                  <p className="font-bold leading-[1.5] relative shrink-0 text-[24px] text-[#1a1918]">
                    Shop
                  </p>
                </div>
                <div className="mr-[-2px] relative shrink-0 size-[32px]">
                  <div className="absolute inset-[25.91%_36.2%_25.91%_35.29%]">
                    <img alt="" className="block max-w-none size-full" src={imgVector} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                <div className="flex gap-[3.427px] items-center px-[4.112px] py-0 relative shrink-0">
                  <div className="border border-[#717171] border-solid flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0">
                    <div className="h-[136.635px] relative shadow-[0px_1.508px_3.769px_0px_rgba(0,0,0,0.2)] shrink-0 w-[109.308px]">
                      <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img15} />
                    </div>
                  </div>
                  <div className="border border-[#717171] border-solid flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0 w-[109.308px]">
                    <div className="aspect-[1080/1350] flex-[1_0_0] min-h-px min-w-px relative shadow-[0px_1.508px_3.769px_0px_rgba(0,0,0,0.2)] shrink-0">
                      <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img15} />
                    </div>
                  </div>
                  <div className="border border-[#717171] border-solid flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0 w-[109.308px]">
                    <div className="aspect-[1080/1350] flex-[1_0_0] min-h-px min-w-px relative shadow-[0px_1.508px_3.769px_0px_rgba(0,0,0,0.2)] shrink-0">
                      <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img15} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center relative shrink-0 w-full">
                  <div className="flex flex-col items-start relative shrink-0">
                    <p className="font-light leading-[1.5] relative shrink-0 text-[16px] text-[#1a1918]">
                      아이디어가 상품이 되는 순간
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#f8f6f4] w-[375px] shrink-0">
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
        <div className="bg-[#f8f6f4] flex items-center overflow-clip p-[21px] relative shrink-0 w-full">
          <div className="flex flex-col gap-[45px] items-start relative shrink-0 w-[263px]">
            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <div className="flex flex-col font-bold justify-center leading-[0] relative shrink-0 text-[17px] text-[#443e3c] w-full">
                <p className="leading-[1.5] whitespace-pre-wrap">고객지원</p>
              </div>
              <div className="flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 text-[0px] text-[#85817e] tracking-[-0.26px] w-full">
                <div className="flex flex-col justify-center min-w-full relative shrink-0 w-[min-content]">
                  <p className="leading-[1.5] text-[13px] whitespace-pre-wrap">
                    <span className="font-bold tracking-[-0.26px]">전화</span>
                    <span>: 010-5238-0236</span>
                  </p>
                </div>
                <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
                  <p className="leading-[1.5] text-[13px]">
                    <span className="font-bold tracking-[-0.26px]">이메일</span>
                    <span>: gcsweb01234@gmail.com</span>
                  </p>
                </div>
                <div className="flex flex-col justify-center min-w-full relative shrink-0 w-[min-content]">
                  <p className="leading-[1.5] text-[13px] whitespace-pre-wrap">
                    <span className="font-bold tracking-[-0.26px]">주소</span>
                    <span>: 서울특별시 강북구 솔샘로 174 136동 304호</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <div className="flex flex-col font-bold justify-center leading-[0] relative shrink-0 text-[17px] text-[#443e3c] w-full">
                <p className="leading-[1.5] whitespace-pre-wrap">사업자 정보</p>
              </div>
              <div className="flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 text-[0px] text-[#85817e] tracking-[-0.26px] w-full">
                <div className="flex gap-[40px] items-center relative shrink-0 whitespace-nowrap">
                  <div className="flex flex-col justify-center relative shrink-0">
                    <p className="leading-[1.5] text-[13px]">
                      <span className="font-bold tracking-[-0.26px]">대표</span>
                      <span>: 안성은</span>
                    </p>
                  </div>
                  <div className="flex flex-col justify-center relative shrink-0">
                    <p className="leading-[1.5] text-[13px]">
                      <span className="font-bold tracking-[-0.26px]">회사명</span>
                      <span>: 안북스 스튜디오</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center min-w-full relative shrink-0 w-[min-content]">
                  <p className="leading-[1.5] text-[13px] whitespace-pre-wrap">
                    <span className="font-bold tracking-[-0.26px]">사업자등록번호</span>
                    <span>: 693-01-03164</span>
                  </p>
                </div>
                <div className="flex flex-col justify-center min-w-full relative shrink-0 w-[min-content]">
                  <p className="leading-[1.5] text-[13px] whitespace-pre-wrap">
                    <span className="font-bold tracking-[-0.26px]">통신판매업신고번호</span>
                    <span>: 제 2025-서울강북-0961호</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-[181px]">
              <div className="h-[21px] relative shrink-0 w-[59px]">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={59}
                  height={21}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col items-start leading-[0] relative shrink-0 text-[8px] text-[#443e3c] w-full">
                <div className="flex flex-col justify-center relative shrink-0 w-full">
                  <p className="leading-[1.5] whitespace-pre-wrap">© 2025 GCS:Web. All rights reserved.</p>
                </div>
                <div className="flex flex-col justify-center relative shrink-0 w-full">
                  <p className="decoration-solid leading-[1.5] underline whitespace-pre-wrap">이용약관</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
      </div>
    </div>
  );
}


