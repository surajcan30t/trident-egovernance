'use client'
import React, { useEffect, useState } from 'react'

const FeeSessionNav = () => {
  const [activeYear, setActiveYear] = useState('');
  useEffect(() => {
    const currentYear = Math.floor(Math.random() * 4 + 1);
    setActiveYear(currentYear.toString());
  }, [])


  const handleClick = (year: string) => {
    setActiveYear(year);
  }
  return (
    <div className='flex flex-row items-center gap-10 bg-white px-10 py-2 border rounded-2xl mt-5 shadow-md'>
      <div onClick={() => handleClick('1')}>
        <p className={`text-sm ${activeYear === '1' && 'bg-blue-500 text-white shadow-md shadow-blue-200'} px-2 py-1 rounded-lg cursor-pointer`}>Year 1</p>
      </div>
      <div onClick={() => handleClick('2')}>
        <p className={`text-sm ${activeYear === '2' && 'bg-blue-500 text-white shadow-md shadow-blue-200'} px-2 py-1 rounded-lg cursor-pointer`}>Year 2</p>
      </div>
      <div onClick={() => handleClick('3')}>
        <p className={`text-sm ${activeYear === '3' && 'bg-blue-500 text-white shadow-md shadow-blue-200'} px-2 py-1 rounded-lg cursor-pointer`}>Year 3</p>
      </div>
      <div onClick={() => handleClick('4')}>
        <p className={`text-sm ${activeYear === '4' && 'bg-blue-500 text-white shadow-md shadow-blue-200'} px-2 py-1 rounded-lg cursor-pointer`}>Year 4</p>
      </div>
    </div>
  )
}

export default FeeSessionNav