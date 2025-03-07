import type { Metadata } from 'next';
import { Inter, Chakra_Petch, Exo_2, Space_Mono } from 'next/font/google';
import './globals.css';
import SessionWrapper from '@/components/SessionWrapper';
import { SidebarProvider } from '@/components/ui/sidebar';


const exo2 = Exo_2({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trident E-Governance',
  description: 'Your first E-Governance tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={exo2.className}>
        <SessionWrapper>
          <div className="flex flex-col min-h-screen">
            {/* <Navbar /> */}
            <SidebarProvider>
              <main className="flex-grow m-0 p-0">{children}</main>
            </SidebarProvider>
            {/* <Footer /> */}
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
