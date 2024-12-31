import { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { AppSidebar } from '@/app/(app)/components/SideBarMenu';
import { SidebarProvider } from '@/components/ui/sidebar';

const data = {
  description: '',
  title: '',
  url: '/',
};

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000/'),
  title: data.title,
  description: data.description,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-row">
        <aside className="sticky top-0 z-30 h-[calc(100vh-0rem)] w-0 md:w-[17%] flex-shrink-0">
            <SidebarProvider>
              <AppSidebar />
            </SidebarProvider>
        </aside>
        <div className="flex flex-col w-full">
          {/* Sidebar */}
          <Navbar /> {/* Navbar remains at the top */}
          <Toaster />
          {/* Main content area */}
          <main className="flex-1 p-2">
            <div className="p-1 h-full">{children}</div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
