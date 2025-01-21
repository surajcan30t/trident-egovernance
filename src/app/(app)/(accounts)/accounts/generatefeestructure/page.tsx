import React from 'react'
import authValidator from '@/lib/auth/role-validator';
import Unauthorized from '@/components/Unauthorized';
import GenerateFeeStructureMultistepForm from '../../components/GenerateFeeStructureMultistepForm';

const page = async () => {
  const { session, role, token } = await authValidator();
  if (!session || !token) {
    return <Unauthorized />;
  }

  if (role !== 'ACCOUNTS') {
    return <Unauthorized />;
  }
  return (
    <div className='flex flex-col items-center justify-center gap-y-4'>
      <GenerateFeeStructureMultistepForm token={token}/>
    </div>
  )
}

export default page