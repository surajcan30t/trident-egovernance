'use client'
import React, { useState, useEffect } from 'react';
import BatchGenerationForm from './BatchGenerationForm';
import FeeStructureGenerationForm from './FeeStructureGenerationForm';

const GenerateFeeStructureMultistepForm = ({ token }: { token: string }) => {

  const [formData, setFormData] = useState<any>(null);
  const [step, setStep] = useState<number>(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures the component renders only on the client
    const localStorageStep = window.localStorage.getItem('step')
      ? parseInt(window.localStorage.getItem('step') as string)
      : 1;
    setStep(localStorageStep);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  const handleBatchGeneration = () => {
    setFormData(formData);
    setStep(2);
    window.localStorage.setItem('step', '2');
  }

  const handleFeeStructureGeneration = () => {
    setFormData(formData);
    setStep(1);
    window.localStorage.setItem('step', '1');
  }

  return (
    <div className='w-full flex flex-col justify-center items-center gap-y-5'>
      <BatchGenerationForm batchGenerationSubmit={handleBatchGeneration} />
      {step === 2 && <FeeStructureGenerationForm token={token} feeStructureGenerationSubmit={handleFeeStructureGeneration} />}
    </div>
  )
}

export default GenerateFeeStructureMultistepForm