'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItemProps {
  title: string;
  children?: { title: string; href: string }[];
  href?: string;
}

interface MenuItemPropsWithClose extends MenuItemProps {
  onItemClick?: () => void;
}

function MenuItem({ title, children, href, onItemClick }: MenuItemPropsWithClose) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!children) {
    return (
      <Link
        href={href || '#'}
        className="text-white text-[21px] font-bold leading-[1.5] py-2 block hover:opacity-80 transition-opacity"
        onClick={onItemClick}
      >
        {title}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-white text-[21px] font-bold leading-[1.5] py-2 flex items-center gap-2 w-full hover:opacity-80 transition-opacity text-left"
      >
        <span>{title}</span>
        <svg
          className={`w-6 h-6 transition-transform flex-shrink-0 ${isExpanded ? '' : 'rotate-180'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
      {isExpanded && (
        <div className="ml-4 mt-2 flex flex-col gap-3">
          {children.map((child, index) => (
            <Link
              key={index}
              href={child.href}
              className="text-white text-[19px] leading-[1.5] py-1 block hover:opacity-80 transition-opacity"
              onClick={onItemClick}
            >
              {child.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  // 관리자 권한 확인
  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAdmin(false);
        return;
      }

      try {
        const response = await fetch('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.user.memberType === 'admin');
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('관리자 권한 확인 오류:', error);
        setIsAdmin(false);
      }
    };

    if (isOpen) {
      checkAdminStatus();
    }
  }, [isOpen]);

  // 메뉴가 열릴 때 body 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // 스크롤 위치 복원
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      // cleanup: 메뉴가 닫힐 때 스크롤 복원
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuItems: MenuItemProps[] = [
    {
      title: 'About GCS',
      href: '/about',
    },
    {
      title: 'Archive',
      children: [
        { title: 'Project', href: '/archive?tab=project' },
        { title: 'News', href: '/archive?tab=news' },
      ],
    },
    {
      title: 'Shop',
      children: [
        { title: 'Fund', href: '/shop' },
        { title: 'Partner up', href: '/shop?tab=partner' },
      ],
    },
    {
      title: 'Community',
      children: [
        { title: 'Board', href: '/community' },
        { title: 'Lounge', href: '/community?tab=lounge' },
      ],
    },
  ];

  return (
    <>
      {/* 오버레이 */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 사이드 메뉴 */}
      <aside
        className={`fixed top-0 left-0 h-full w-[100%] sm:w-[75%] md:w-80 lg:max-w-sm z-[70] transform transition-transform duration-300 ease-in-out bg-gradient-to-r from-[#FF6F22] to-[#EE4A08] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto overscroll-contain">
          <div className="flex flex-col gap-4 pt-20 pb-32 px-6 min-h-full">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                title={item.title}
                children={item.children}
                href={item.href}
                onItemClick={onClose}
              />
            ))}

            {/* 구분선 */}
            {isAdmin && (
              <div className="h-0 relative shrink-0 w-full my-4">
                <div className="absolute inset-[-1px_0_0_0] border-t border-white/20" />
              </div>
            )}

            {/* Admin 버튼 (관리자만 표시) */}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={onClose}
                className="border border-[#f8f6f4] border-solid flex items-center justify-center px-[12px] py-[4px] rounded-[999px] w-1/5 hover:opacity-80 transition-opacity"
              >
                <p className="font-bold text-[15px] text-[#f8f6f4] leading-[1.5] whitespace-nowrap">
                  Admin
                </p>
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

