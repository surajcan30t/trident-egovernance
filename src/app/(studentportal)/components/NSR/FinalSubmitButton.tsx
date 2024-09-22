'use client'
import { Button } from '@/components/ui/button'
import { nsrFinalSubmit } from '@/formactions/nsractions'
import React from 'react'

const FinalSubmitButton = () => {
  return (
    <div className='flex justify-center items-center gap'>
        <Button onClick={() => nsrFinalSubmit()} type='submit' variant='trident' className='bg-teal-600 text-base'>Confirm & Submit</Button>
    </div>
  )
}

export default FinalSubmitButton