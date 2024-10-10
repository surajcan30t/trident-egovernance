import Image from 'next/image';
import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='z-50 w-full h-10 bg-orange-300/50 backdrop-blur-3xl flex flex-row justify-between items-center px-5 py-7 font-bold text-base'>
      <p className='text-start text-slate-700'>Copyright &copy; {currentYear} Trident Group of Institutions. <br /> All rights reserved.</p>
      <p className='text-center text-slate-700'>For any query please contact us at <a className='underline' href="mailto:Y2lGn@example.com">Y2lGn@example.com</a></p>
    </footer>

  )
}

export default Footer