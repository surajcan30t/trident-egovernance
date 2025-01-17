import React from 'react'
import ExcessFeeRefund from '../../components/ExcessFeeRefund'
import { ExcessFeeRefundForm } from '../../components/ExcessFeeRefundForm'

const page = (props: any) => {
  const regdNo = props.searchParams.registrationNo;
  return (
    <div className='flex flex-col items-center justify-center gap-y-4'>
      <ExcessFeeRefund />
      <ExcessFeeRefundForm regdNo={regdNo} />
    </div>
  )
}

export default page