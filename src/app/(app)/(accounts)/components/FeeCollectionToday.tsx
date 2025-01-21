'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const FeeCollectionToday = () => {
  const router = useRouter();
  const handleToday = () => {
    const today = new Date();
    router.push(`/accounts/feecollectiondetails?from=${today.toISOString()}&to=${today.toISOString()}`)
  }
  return(
    <Button variant={'trident'} onClick={handleToday}>Today</Button>
  )
}

export default FeeCollectionToday;