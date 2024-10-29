import Image from 'next/image';
import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='sticky bottom-0 z-50 w-full h-10 bg-orange-300/50 backdrop-blur-lg flex flex-row justify-between items-center px-5 py-7 font-bold text-base'>
      <p className='text-start text-slate-900'>Copyright &copy; {currentYear} Trident Group of Institutions. <br /> All rights reserved.</p>
      <p className='text-center text-slate-900'>For any query please contact us at <a className='underline' href="mailto:Y2lGn@example.com">Y2lGn@example.com</a></p>
    </footer>

  )
}
export default Footer

export const LandingFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='sticky bottom-0 z-50 w-full h-10 bg-orange-300/90 backdrop-blur-lg flex flex-row justify-between items-center px-5 py-7 font-bold text-base'>
      <p className='text-start text-slate-900'>Copyright &copy; {currentYear} Trident Group of Institutions. <br /> All rights reserved.</p>
      <p className='text-center text-slate-900'>For any query please contact us at <a className='underline' href="mailto:Y2lGn@example.com">Y2lGn@example.com</a></p>
    </footer>

  )
}