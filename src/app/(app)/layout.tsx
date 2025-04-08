import { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import AppSidebar from '@/app/(app)/components/SideBarMenu';
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const data = {
  description: '',
  title: '',
  url: '/',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://egov.tat.ac.in/'),
  title: data.title,
  description: data.description,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-row">
        <aside className="sticky top-0 z-30 h-[calc(100vh-0rem)] w-0 md:w-[17%] flex-shrink-0">
          <AppSidebar />
        </aside>
        <div className="flex flex-col w-full">
          <Navbar />
          <Toaster />
          {/* Main content area */}
          <main className="flex-1 p-2">
            <NuqsAdapter>
              <div className="p-1 h-full">{children}</div>
            </NuqsAdapter>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
