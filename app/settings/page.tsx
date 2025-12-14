'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 이미지 URL 상수들
const imgWeuiBackFilled = "https://www.figma.com/api/mcp/asset/6ae5093c-456d-4738-a160-02e67ab9f3ec";
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
        설정
      </p>
      <div className="h-[24px] opacity-0 shrink-0 w-[12px]" />
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('token');
      window.dispatchEvent(new Event('loginStatusChange'));
      router.push('/login');
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('정말 계정을 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      // TODO: 계정 탈퇴 API 호출
      alert('계정 탈퇴 기능은 추후 구현 예정입니다.');
    }
  };

  return (
    <div className="bg-[#f8f6f4] flex flex-col items-start relative w-full min-h-screen">
      <div className="flex flex-col items-start relative shrink-0 w-full">
        {/* 상단 배너 */}
        <div className="flex flex-col items-start relative shrink-0 w-full">
          <div className="bg-[#f8f6f4] h-[34px] shrink-0 w-full" />
          <NavBarMobile />
        </div>

        {/* 본문 */}
        <div className="flex flex-col gap-[345px] items-start relative shrink-0 w-full pb-[20px]">
          <div className="flex flex-wrap gap-[16px_8px] items-start justify-center pb-[20px] pt-[40px] px-[16px] relative shrink-0 w-full">
            {/* 회원정보 관리 */}
            <div className="flex flex-col items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <div className="flex flex-col items-center justify-center px-[20px] py-0 relative shrink-0 w-full">
                  <div className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                    <p className="font-bold leading-[1.5] relative shrink-0 text-[15px] text-[#443e3c] w-full">
                      회원정보 관리
                    </p>
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full">
                      이름, 전화번호, 이메일
                    </p>
                  </div>
                </div>
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute inset-[-2px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine297} />
                  </div>
                </div>
              </div>
            </div>

            {/* 판매팀 정보 관리 */}
            <div className="flex flex-col items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <div className="flex flex-col items-center justify-center px-[20px] py-0 relative shrink-0 w-full">
                  <div className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                    <p className="font-bold leading-[1.5] relative shrink-0 text-[15px] text-[#443e3c] w-full">
                      판매팀 정보 관리
                    </p>
                    <p className="font-normal leading-[1.5] relative shrink-0 text-[13px] text-[#85817e] tracking-[-0.26px] w-full">
                      팀명, 팀원, 대표자, 정산 계좌
                    </p>
                  </div>
                </div>
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute inset-[-2px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine297} />
                  </div>
                </div>
              </div>
            </div>

            {/* 비밀번호 변경 */}
            <div className="flex flex-col h-[55px] items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-[8px] h-[55px] items-start relative shrink-0 w-full">
                <div className="flex flex-col h-[47px] items-center justify-center px-[20px] py-0 relative shrink-0 w-full">
                  <div className="flex flex-col h-[47px] items-start relative shrink-0 w-full">
                    <p className="font-bold leading-[1.5] relative shrink-0 text-[15px] text-[#443e3c] w-full">
                      비밀번호 변경
                    </p>
                  </div>
                </div>
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute inset-[-2px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine297} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 로그아웃 및 계정 탈퇴 */}
          <div className="flex gap-[20px] items-start px-[20px] py-0 relative shrink-0 w-full">
            <button
              onClick={handleLogout}
              className="h-[19.49px] relative shrink-0 hover:opacity-80 transition-opacity"
            >
              <p className="font-normal leading-[19.5px] text-[13px] text-[#443e3c]">
                로그아웃
              </p>
            </button>
            <button
              onClick={handleDeleteAccount}
              className="h-[19.49px] relative shrink-0 hover:opacity-80 transition-opacity"
            >
              <p className="font-normal leading-[19.5px] text-[13px] text-[#b7b3af]">
                계정 탈퇴
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

