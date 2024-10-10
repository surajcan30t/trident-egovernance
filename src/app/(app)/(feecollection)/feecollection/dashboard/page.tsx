import React from 'react'
import DailyCollection from '../../components/DailyCollection'

const page = () => {
  return (
    <div className='w-full h-full flex flex-col p-2 items-center gap-4'>
      <div className="flex flex-row gap-4">
        <DailyCollection />
        <DailyCollection />
        <DailyCollection />
        <DailyCollection />
      </div>
    </div>
  )
}

export default page