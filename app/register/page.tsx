'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 이미지 URL 상수들
const imgVector827 = "https://www.figma.com/api/mcp/asset/bc8152b2-f82a-476a-8b4f-0fff6612541e";
const imgVector828 = "https://www.figma.com/api/mcp/asset/b0cc19a3-f80e-4bcc-b8a1-9820fd680067";
const imgEllipse5406 = "https://www.figma.com/api/mcp/asset/ea2b8444-fca1-4c80-a5bf-4bcf364e2a0a";
const imgEllipse5405 = "https://www.figma.com/api/mcp/asset/79e307fe-f6ba-46c5-b4b5-07c8a7145cbf";
const imgEllipse5404 = "https://www.figma.com/api/mcp/asset/2dfd4206-5454-4a01-9afc-66cf59700a47";
const img = "https://www.figma.com/api/mcp/asset/cf2f50ea-36de-4d43-ae8d-e89a5b974b68";
const img1 = "https://www.figma.com/api/mcp/asset/5d4a3b28-57a3-4ca2-9471-bd2ce2fff6f2";
const imgLine336 = "https://www.figma.com/api/mcp/asset/50568631-69a4-4197-b528-e865f1cae007";
const img2 = "https://www.figma.com/api/mcp/asset/650211d3-2d7d-4520-9db4-afc82e3d5dd3";
const img3 = "https://www.figma.com/api/mcp/asset/57065093-3622-4116-b73e-d1bd87a50749";
const img4 = "https://www.figma.com/api/mcp/asset/2fb993b2-14b1-4da2-b892-d23ec0eec1ac";
const img5 = "https://www.figma.com/api/mcp/asset/b55cf6e6-7889-4507-b58b-daa07e2fa120";
const img6 = "https://www.figma.com/api/mcp/asset/29e606d0-1ead-404b-9c20-d4a28e8be041";

export default function RegisterPage() {
  const router = useRouter();
  const [allAgreed, setAllAgreed] = useState(false);
  const [ageAgreed, setAgeAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const handleAllAgreed = () => {
    const newValue = !allAgreed;
    setAllAgreed(newValue);
    setAgeAgreed(newValue);
    setTermsAgreed(newValue);
    setPrivacyAgreed(newValue);
  };

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden flex flex-col">
      {/* 주황색 배경 영역 */}
      <div className="relative w-full flex-[0.22] min-h-[22vh] overflow-hidden" style={{ backgroundImage: "linear-gradient(236.47860593860838deg, rgba(253, 111, 34, 1) 1.2987%, rgba(254, 135, 57, 1) 66.571%)" }}>
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

        {/* 뒤로가기 버튼 - 주황색 영역 좌측 상단 */}
        <button
          onClick={() => router.back()}
          className="absolute left-[16px] top-[16px] flex items-center justify-center w-[24px] h-[24px] z-10 hover:opacity-80 transition-opacity"
          aria-label="뒤로가기"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* 로고 */}
        <div className="absolute h-[29.608px] left-1/2 top-1/2 -translate-y-1/2 translate-x-[-50%] w-[84px]">
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
      </div>

      {/* 회원가입 폼 카드 */}
      <div className="bg-[#f8f6f4] flex flex-col gap-[40px] flex-[0.78] min-h-[78vh] items-center pb-[24px] pt-[96px] px-0 rounded-tl-[12px] rounded-tr-[12px] shadow-[0px_-4px_10px_0px_rgba(238,74,8,0.4)] w-full overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-center relative shrink-0 w-full">
          <p className="font-bold leading-[1.5] relative shrink-0 text-[22px] text-[#443e3c] text-center">
            회원가입
          </p>
        </div>

        {/* 약관 동의 영역 */}
        <div className="flex flex-col items-center justify-end px-[16px] py-0 relative shrink-0 w-full">
          <div className="flex flex-col gap-[48px] items-start relative shrink-0 w-full">
            <div className="flex flex-col items-start px-[8px] py-0 relative shrink-0 w-full">
              <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                  {/* 약관 전체 동의 */}
                  <button
                    onClick={handleAllAgreed}
                    className="flex gap-[12px] items-center pl-0 pr-[12px] py-0 relative shrink-0 w-full"
                  >
                    <div className="relative shrink-0 size-[24px]">
                      <div className="absolute contents left-[2px] top-[2px]">
                        <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${allAgreed ? 'bg-[#2a2a2e]' : ''}`} />
                        {allAgreed && (
                          <div className="absolute flex inset-[31.25%_35.42%_43.75%_39.58%] items-center justify-center">
                            <div className="flex-none h-[5.657px] rotate-[225deg] w-[2.828px]">
                              <div className="relative size-full">
                                <div className="absolute inset-[-13.26%_-26.52%]">
                                  <img alt="" className="block max-w-none size-full" src={img} />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <div className="flex h-full items-center relative shrink-0">
                        <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px] whitespace-pre-wrap">
                          약관 전체 동의
                        </p>
                      </div>
                    </div>
                  </button>
                  {/* 구분선 */}
                  <div className="h-0 relative shrink-0 w-full">
                    <div className="absolute inset-[-1px_0_0_0]">
                      <img alt="" className="block max-w-none size-full" src={imgLine336} />
                    </div>
                  </div>
                  {/* 만 14세 이상 */}
                  <button
                    onClick={() => setAgeAgreed(!ageAgreed)}
                    className="flex gap-[12px] items-center pl-0 pr-[12px] py-0 relative shrink-0 w-full"
                  >
                    <div className="relative shrink-0 size-[24px]">
                      <div className="absolute contents left-[2px] top-[2px]">
                        <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${ageAgreed ? 'bg-[#2a2a2e]' : ''}`} />
                        {ageAgreed && (
                          <div className="absolute flex inset-[31.25%_35.42%_43.75%_39.58%] items-center justify-center">
                            <div className="flex-none h-[5.657px] rotate-[225deg] w-[2.828px]">
                              <div className="relative size-full">
                                <div className="absolute inset-[-13.26%_-26.52%]">
                                  <img alt="" className="block max-w-none size-full" src={img} />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <div className="flex h-full items-center relative shrink-0">
                        <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px] whitespace-pre-wrap">
                          [필수] 만 14세 이상입니다.
                        </p>
                      </div>
                    </div>
                  </button>
                  {/* 홈페이지 이용약관 동의 */}
                  <div className="flex gap-[12px] items-center pl-0 pr-[12px] py-0 relative shrink-0 w-full">
                    <button
                      onClick={() => setTermsAgreed(!termsAgreed)}
                      className="block cursor-pointer relative shrink-0 size-[24px]"
                    >
                      <div className="absolute contents left-[2px] top-[2px]">
                        <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${termsAgreed ? 'bg-[#2a2a2e]' : ''}`} />
                        {termsAgreed && (
                          <div className="absolute flex inset-[31.25%_35.42%_43.75%_39.58%] items-center justify-center">
                            <div className="flex-none h-[5.657px] rotate-[225deg] w-[2.828px]">
                              <div className="relative size-full">
                                <div className="absolute inset-[-13.26%_-26.52%]">
                                  <img alt="" className="block max-w-none size-full" src={img} />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
                      <div className="flex flex-[1_0_0] h-full items-center relative shrink-0">
                        <p className="flex-[1_0_0] font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px] whitespace-pre-wrap">
                          [필수] 홈페이지 이용약관 동의
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                        <div className="relative size-[16.667px]">
                          <div className="absolute contents left-[7.5px] top-[4.17px]">
                            <div className="absolute flex h-[11.667px] items-center justify-center left-[7.5px] top-[4.17px] w-[5px]">
                              <div className="flex-none rotate-[270deg]">
                                <div className="h-[5px] relative w-[11.667px]">
                                  <div className="absolute inset-[-6.16%_-5.36%_-12.5%_-5.36%]">
                                    <img alt="" className="block max-w-none size-full" src={img1} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 개인정보 수집·이용 동의 */}
                  <div className="flex gap-[12px] items-center pl-0 pr-[12px] py-0 relative shrink-0 w-full">
                    <button
                      onClick={() => setPrivacyAgreed(!privacyAgreed)}
                      className="block cursor-pointer relative shrink-0 size-[24px]"
                    >
                      <div className="absolute contents left-[2px] top-[2px]">
                        <div className={`absolute border-[1.5px] border-[#2a2a2e] border-solid left-[2px] rounded-[5px] size-[20px] top-[2px] ${privacyAgreed ? 'bg-[#2a2a2e]' : ''}`} />
                        {privacyAgreed && (
                          <div className="absolute flex inset-[31.25%_35.42%_43.75%_39.58%] items-center justify-center">
                            <div className="flex-none h-[5.657px] rotate-[225deg] w-[2.828px]">
                              <div className="relative size-full">
                                <div className="absolute inset-[-13.26%_-26.52%]">
                                  <img alt="" className="block max-w-none size-full" src={img} />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
                      <div className="flex flex-[1_0_0] h-full items-center relative shrink-0">
                        <p className="flex-[1_0_0] font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#5f5a58] tracking-[-0.26px] whitespace-pre-wrap">
                          [필수] 개인정보 수집·이용 동의
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                        <div className="relative size-[16.667px]">
                          <div className="absolute contents left-[7.5px] top-[4.17px]">
                            <div className="absolute flex h-[11.667px] items-center justify-center left-[7.5px] top-[4.17px] w-[5px]">
                              <div className="flex-none rotate-[270deg]">
                                <div className="h-[5px] relative w-[11.667px]">
                                  <div className="absolute inset-[-6.16%_-5.36%_-12.5%_-5.36%]">
                                    <img alt="" className="block max-w-none size-full" src={img1} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 다음 버튼 */}
            <div className="flex flex-col items-center justify-between relative shrink-0 w-full">
              <div className="flex flex-col items-center px-[8px] py-0 relative shrink-0 w-full">
                <button className="bg-[#c9c1b7] cursor-pointer flex items-center justify-center p-[16px] relative rounded-[12px] shrink-0 w-full hover:opacity-90 transition-opacity">
                  <p className="font-normal leading-[1.5] relative shrink-0 text-[15px] text-[#f8f6f4]">
                    다음
                  </p>
                </button>
              </div>
              <div className="h-[19.44px] shrink-0 w-[74px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

