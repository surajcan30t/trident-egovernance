import React from 'react'
import BatchGenerationForm from '../../components/BatchGenerationForm'
import Unauthorized from '@/components/Unauthorized';
import authValidator from '@/lib/auth/role-validator';
import ViewFeeStructure from '../../components/ViewFeeStructure';

const page = async () => {
  const { session, role, token } = await authValidator();
  if (!session || !token) {
    return <Unauthorized />;
  }
  if (role !== 'ACCOUNTS') {
    return <Unauthorized />;
  }
  return (
    <div className='flex flex-col gap-y-4'>
      <ViewFeeStructure token={token}/>
    </div>
  )
}

export default page