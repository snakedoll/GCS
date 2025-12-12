'use client';

import Image from 'next/image';
import { useState } from 'react';
import SideMenu from './SideMenu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white w-full h-16 flex items-center justify-between px-4 md:px-6 shadow-sm sticky top-0 z-[60]">
        {/* 좌측: 햄버거 메뉴 */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="메뉴 열기"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* 중앙: 브랜드 로고 */}
        <div className="flex-1 flex justify-center">
          <div className="relative h-[25px] w-[113px] md:w-[145px]">
            <Image
              src="/images/logo.svg"
              alt="Brand Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* 우측: 로그인 아이콘 */}
        <button
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="로그인"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </header>

      {/* 사이드 메뉴 */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

