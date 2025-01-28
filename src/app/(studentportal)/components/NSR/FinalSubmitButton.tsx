'use client';
import { Button } from '@/components/ui/button';
import { nsrFinalSubmit } from '../../nsractions/nsractions';
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import PulseLoader from 'react-spinners/PulseLoader';
import { useRouter } from 'next/navigation';

const FinalSubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await nsrFinalSubmit();
      setIsLoading(false);
      if (response === 200) {
        toast({
          title: 'Success',
          description: 'Your registration successfully submitted.',
          variant: 'success',
        })
        setIsLoading(false);
        router.push('/studentportal/newstudentpayment')
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong. Please try again later.',
          variant: 'destructive',
        })
        setIsLoading(false);
      }
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex justify-center items-center gap">
      <Button
        onClick={handleSubmit}
        type="submit"
        variant="trident"
        className="bg-teal-600 text-base"
      >
        {isLoading ? (<PulseLoader color="white" size={5} />) : 'Confirm & Submit'}
      </Button>
    </div>
  );
};

export default FinalSubmitButton;
