'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const FeeCollectionThisMonth = () => {
  const router = useRouter();
  const handleThisMonth = () => {
    const today = new Date();
    const defaultQuery = {
      from: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`,
      to: `${today.toISOString()}`
    }
    router.push(`/accounts/feecollectiondetails?from=${defaultQuery.from}&to=${defaultQuery.to}`)
  }
  return(
    <>
     <Button variant={'trident'} onClick={handleThisMonth}>This Month</Button>
    </>
  )
};

export default FeeCollectionThisMonth;