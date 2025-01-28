// import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import React from 'react'
import { Toaster } from '@/components/ui/toaster'
import { FeesDetailsFilterProvider } from '../(accounts)/components/FeeDetailsFilterProvider'

export const metadata: Metadata = {
  title: 'Office Dashboard',
  description: 'Generated by create next dashboard',
}

interface RootlayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootlayoutProps) {
  return (
    <div className='flex flex-col'>
      <Toaster />
      <FeesDetailsFilterProvider>
        {children}
      </FeesDetailsFilterProvider>
    </div>
  )
}
