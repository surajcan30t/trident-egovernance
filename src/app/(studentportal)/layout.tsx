// import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next';
import React from 'react';
import NSRNavbar from './components/NSR/NSRNavbar';
import { Toaster } from '@/components/ui/toaster';
import { LandingFooter } from '@/components/Footer';
import { NSRAuthProvider } from '@/app/(studentportal)/provider/NSRAuthContext';

export const metadata: Metadata = {
  title: 'Trident E-Governance',
  description: 'Generated by create next dashboard',
};

interface RootlayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootlayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <NSRAuthProvider>
        <Toaster />
        <NSRNavbar /> {/* NSRNavbar only for studentportal routes */}
        <main className="flex-grow">{children}</main>
        <LandingFooter />
      </NSRAuthProvider>
    </div>
  );
}
