'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import BatchGenerationForm from './BatchGenerationForm';
import FeeStructureGenerationForm from './FeeStructureGenerationForm';

const GenerateFeeStructureMultistepForm = ({token}: {token: string}) => {
  const [formData, setFormData] = useState<any>(null);
  const [step, setStep] = useState<number>(1);

  const handleBatchGeneration = () => {
    setFormData(formData);
    setStep(2);
  }

  const handleFeeStructureGeneration = () => {
    setFormData(formData);
    setStep(3);
  }

  return (
    <div className='w-full flex flex-col justify-center items-center gap-y-5'>
      {step === 1 && <BatchGenerationForm />}
      <FeeStructureGenerationForm token={token} />
    </div>
  )
}

export default GenerateFeeStructureMultistepForm