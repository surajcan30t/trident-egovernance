import type { Metadata } from 'next';
import { Inter, Chakra_Petch, Exo_2 } from 'next/font/google';
import './globals.css';

const exo2 = Exo_2({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trident E-Governance',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={exo2.className}>{children}</body>
    </html>
  );
}
