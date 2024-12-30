import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='sticky bottom-0 z-50 w-full h-fit md:h-10 bg-orange-300/50 backdrop-blur-lg flex flex-col md:flex-row justify-between items-center px-0.5 py-2 md:px-5 md:py-7 font-bold text-sm md:text-base'>
      <p className='text-center text-slate-900'>Copyright &copy; {currentYear} Trident Group of Institutions. <br /> All rights reserved.</p>
      <p className='text-center text-slate-900'>For any query please contact us at <a className='underline' href="mailto:trident.ac.in@gmail.com">trident.ac.in@gmail.com</a></p>
    </footer>

  )
}
export default Footer

export const LandingFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='sticky bottom-0 z-50 w-full h-fit md:h-10 bg-orange-300/90 backdrop-blur-lg flex flex-col md:flex-row justify-between items-center px-0.5 py-2 md:px-5 md:py-7 font-bold text-sm md:text-base'>
      <p className='text-start text-slate-900'>Copyright &copy; {currentYear} Trident Group of Institutions. <br /> All rights reserved.</p>
      <p className='text-center text-slate-900'>For any query please contact us at <a className='underline' href="mailto:trident.ac.in@gmail.com">trident.ac.in@gmail.com</a></p>
    </footer>

  )
}