'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
  const [isExpanded, setIsExpanded] = useState(children ? true : false);

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
  // 메뉴가 열릴 때 body 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
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
        { title: 'Project', href: '/archive/project' },
        { title: 'News', href: '/archive/news' },
      ],
    },
    {
      title: 'Shop',
      children: [
        { title: 'Fund', href: '/shop/fund' },
        { title: 'Partner up', href: '/shop/partner' },
      ],
    },
    {
      title: 'Community',
      children: [
        { title: 'Board', href: '/community/board' },
        { title: 'Lounge', href: '/community/lounge' },
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
        className={`fixed top-0 left-0 h-full w-[100%] sm:w-[75%] md:w-80 lg:max-w-sm bg-gradient-to-r from-[#FF6F22] to-[#EE4A08] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-4 pt-20 pb-24 px-6">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              children={item.children}
              href={item.href}
              onItemClick={onClose}
            />
          ))}
        </div>
      </aside>
    </>
  );
}

