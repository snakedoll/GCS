'use client';

import { useRouter } from 'next/navigation';

// 이미지 URL 상수들
const imgImage68 = "https://www.figma.com/api/mcp/asset/a720f91b-20bb-4e6b-aae0-8aa4f4d274da";
const img = "https://www.figma.com/api/mcp/asset/75616345-1d0f-4413-9072-80dea6ba3ff1";
const img1 = "https://www.figma.com/api/mcp/asset/d273d67f-89c0-4785-b17a-0203d5bc693b";
const img2 = "https://www.figma.com/api/mcp/asset/06ddfe94-36ac-40f4-9184-51b404d78978";
const img3 = "https://www.figma.com/api/mcp/asset/0324cc93-4e5c-425d-a55b-bae345dc1c2e";
const img4 = "https://www.figma.com/api/mcp/asset/7d8fb1dc-94a4-419d-a1e8-99fdf08de688";
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/6ae5093c-456d-4738-a160-02e67ab9f3ec";
const img5 = "https://www.figma.com/api/mcp/asset/1e951a7b-6748-4df7-94b9-4ded754d18bb";
const img6 = "https://www.figma.com/api/mcp/asset/d938e9c4-da4c-4073-8749-1e72dc4b1b97";
const img7 = "https://www.figma.com/api/mcp/asset/793656b5-5845-47d2-a317-8e47ea0c2d1c";
const img8 = "https://www.figma.com/api/mcp/asset/3d5d1e7e-7b96-4d38-bdae-2b5b266fd1c8";
const imgMdiBell = "https://www.figma.com/api/mcp/asset/9f2726b2-fb10-46ef-990f-dadc47b4b4a8";
const imgIconParkSolidLike = "https://www.figma.com/api/mcp/asset/0ab5777f-1827-40bf-a1a9-317366b59176";
const imgLine297 = "https://www.figma.com/api/mcp/asset/5e10da2b-0f1e-4812-ba4a-01b06bc19bcb";

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
        마이페이지
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative shrink-0 w-full">
      <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
      <div className="bg-[#f8f6f4] flex items-center overflow-clip p-[21px] relative shrink-0 w-full">
        <div className="flex flex-col gap-[45px] items-start relative shrink-0 w-[263px]">
          <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <div className="flex flex-col font-bold justify-center leading-[1.5] relative shrink-0 text-[17px] text-[#443e3c] w-full">
              <p className="leading-[1.5] whitespace-pre-wrap">고객지원</p>
            </div>
            <div className="flex flex-col gap-[12px] items-start leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full">
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
            <div className="flex flex-col font-bold justify-center leading-[1.5] relative shrink-0 text-[17px] text-[#443e3c] w-full">
              <p className="leading-[1.5] whitespace-pre-wrap">사업자 정보</p>
            </div>
            <div className="flex flex-col gap-[12px] items-start leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full">
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
          <div className="flex flex-col items-start relative shrink-0 w-[181px]">
            <div className="h-[21px] relative shrink-0 w-[59px]">
              <div className="absolute inset-[1.48%_82.19%_0_0]">
                <div className="absolute inset-0">
                  <img className="block max-w-none size-full" alt="" src={img} />
                </div>
              </div>
              <div className="absolute inset-[0_0_0_68.67%]">
                <div className="absolute inset-0">
                  <img className="block max-w-none size-full" alt="" src={img1} />
                </div>
              </div>
              <div className="absolute inset-[32.59%_-3.66%_23.7%_-2.35%]">
                <img className="block max-w-none size-full" alt="" src={img2} />
              </div>
              <div className="absolute inset-[1.48%_65.71%_0.06%_18.58%]">
                <img className="block max-w-none size-full" alt="" src={img3} />
              </div>
              <div className="absolute inset-[1.48%_32.86%_0_36.07%]">
                <div className="absolute inset-0">
                  <img className="block max-w-none size-full" alt="" src={img4} />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start leading-[1.5] relative shrink-0 text-[8px] text-[#443e3c] w-full">
              <div className="flex flex-col justify-center relative shrink-0 w-full">
                <p className="leading-[1.5] whitespace-pre-wrap">© 2025 GCS:Web. All rights reserved.</p>
              </div>
              <div className="flex flex-col justify-center relative shrink-0 w-full">
                <p className="[text-underline-position:from-font] decoration-solid leading-[1.5] underline whitespace-pre-wrap">이용약관</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
    </div>
  );
}

export default function TestMyPage() {
  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative min-h-screen w-full">
      <div className="flex flex-col gap-[20px] items-start relative shrink-0 w-full">
        <div className="flex flex-col gap-[36px] items-end relative shrink-0 w-full">
          <div className="flex flex-col items-start relative shrink-0 w-full">
            <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
            <NavBarMobile />
          </div>
          <div className="flex items-start px-[20px] py-0 relative shrink-0 w-full">
            <div className="flex flex-[1_0_0] gap-[24px] items-start min-h-px min-w-px relative shrink-0">
              <div className="bg-white relative rounded-[999px] shrink-0 size-[60px]">
                <div className="absolute left-0 rounded-[999px] size-[60px] top-0">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[999px]">
                    <img alt="" className="absolute h-[106.67%] left-[-23.78%] max-w-none top-0 w-[159.22%]" src={imgImage68} />
                  </div>
                </div>
                <div className="absolute bg-[#1a1918] border-[3.333px] border-[#f8f6f4] border-solid flex items-center left-[40px] p-[2.5px] rounded-[624.375px] top-[40px]">
                  <div className="relative shrink-0 size-[15px]">
                    <div className="absolute h-[10.938px] left-[1.25px] top-[1.88px] w-[12.5px]">
                      <img alt="" className="block max-w-none size-full" src={img5} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative shrink-0">
                <div className="flex items-center justify-between relative shrink-0 w-full">
                  <div className="flex gap-[8px] items-center relative shrink-0">
                    <p className="font-bold leading-[1.5] relative shrink-0 text-[22px] text-black">
                      닉네임
                    </p>
                    <div className="relative shrink-0 size-[24px]">
                      <div className="absolute h-[17.769px] left-[3px] top-[3px] w-[18.265px]">
                        <div className="absolute inset-0">
                          <img alt="" className="block max-w-none size-full" src={img6} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[24px]">
                    <div className="absolute contents left-[2.52px] top-[2px]">
                      <div className="absolute flex items-center justify-center left-[9px] size-[6px] top-[9px]">
                        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                          <div className="relative size-[6px]">
                            <div className="absolute inset-[-12.5%]">
                              <img alt="" className="block max-w-none size-full" src={img7} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute h-[20px] left-[2.52px] top-[2px] w-[18.964px]">
                        <div className="absolute inset-[-3.75%_-3.96%_-3.75%_-3.97%]">
                          <img alt="" className="block max-w-none size-full" src={img8} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex h-[26px] items-center relative shrink-0">
                  <p className="font-normal leading-[1.5] relative shrink-0 text-[15px] text-[#b7b3af]">
                    관리자
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[44px] items-start relative shrink-0 w-full">
          <div className="border-[#eeebe6] border-b-2 border-l-0 border-r-0 border-solid border-t-0 flex items-center relative shrink-0 w-full">
            <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px px-0 py-[20px] relative shrink-0">
              <div className="flex flex-col gap-[12px] items-center px-[4px] py-0 relative shrink-0 w-[57px]">
                <div className="relative shrink-0 size-[24px]">
                  <img alt="" className="block max-w-none size-full" src={imgMdiBell} />
                </div>
                <div className="flex gap-[4px] items-center leading-[1.5] relative shrink-0 text-[15px]">
                  <p className="font-normal relative shrink-0 text-[#443e3c]">
                    알림
                  </p>
                  <p className="font-bold relative shrink-0 text-[#ee4a08]">
                    5
                  </p>
                </div>
              </div>
            </div>
            <div className="border-[#eeebe6] border-b-0 border-l-2 border-r-2 border-solid border-t-0 flex flex-[1_0_0] items-center justify-center min-h-px min-w-px px-0 py-[20px] relative shrink-0">
              <div className="flex flex-col gap-[12px] items-center px-[4px] py-0 relative shrink-0">
                <div className="relative shrink-0 size-[24px]">
                  <img alt="" className="block max-w-none size-full" src={imgIconParkSolidLike} />
                </div>
                <div className="flex gap-[4px] items-center leading-[1.5] relative shrink-0 text-[15px]">
                  <p className="font-normal relative shrink-0 text-[#443e3c]">
                    좋아요
                  </p>
                  <p className="font-bold relative shrink-0 text-[#ee4a08]">
                    5
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[44px] items-start relative shrink-0 w-full">
            <div className="flex flex-col items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <div className="flex items-center justify-center px-[20px] py-0 relative shrink-0 w-full">
                  <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] whitespace-pre-wrap">
                    나의 쇼핑 정보
                  </p>
                </div>
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute inset-[-2px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine297} />
                  </div>
                </div>
              </div>
              <div className="flex items-center px-[20px] py-0 relative shrink-0 w-full">
                <div className="flex flex-col gap-[16px] items-start px-0 py-[12px] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] whitespace-pre-wrap">
                  <p className="font-bold relative shrink-0 w-full">
                    주문 내역
                  </p>
                  <p className="font-bold relative shrink-0 w-full">
                    주문 취소/변경 내역
                  </p>
                  <p className="font-bold relative shrink-0 w-full">
                    리뷰 쓰기
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end relative shrink-0 w-full">
              <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <div className="flex items-center justify-center px-[20px] py-0 relative shrink-0 w-full">
                  <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] whitespace-pre-wrap">
                    나의 창작 정보
                  </p>
                </div>
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute inset-[-2px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine297} />
                  </div>
                </div>
              </div>
              <div className="flex items-center px-[20px] py-0 relative shrink-0 w-full">
                <div className="flex flex-col gap-[16px] items-start px-0 py-[12px] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px]">
                  <p className="font-bold relative shrink-0">{`내가 등록한 상품 `}</p>
                  <p className="font-bold relative shrink-0">
                    창작자 가이드
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <div className="flex items-center justify-center px-[20px] py-0 relative shrink-0 w-full">
                  <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px relative shrink-0 text-[13px] text-[#b7b3af] tracking-[-0.26px] whitespace-pre-wrap">
                    나의 문의
                  </p>
                </div>
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute inset-[-2px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine297} />
                  </div>
                </div>
              </div>
              <div className="flex items-center px-[20px] py-0 relative shrink-0 w-full">
                <div className="flex flex-col gap-[0px] items-start px-0 py-[12px] relative shrink-0">
                  <p className="font-bold leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full whitespace-pre-wrap">
                    문의하기
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

