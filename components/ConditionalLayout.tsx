'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noHeaderFooterPaths = ['/login', '/findid', '/checkid', '/findpassword', '/resetpassword', '/register'];
  const isLoginPage = noHeaderFooterPaths.some(path => pathname?.toLowerCase() === path);

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {!isLoginPage && <Header />}
      <main className="flex-1 w-full overflow-x-hidden">
        {children}
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
}

