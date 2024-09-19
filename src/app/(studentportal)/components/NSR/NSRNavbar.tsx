'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'



const links = [
  { name: 'Admission Details', href: '/studentportal/newstudentadmission' },
  { name: 'Personal Details', href: '/studentportal/newstudentpersonaldetails' },
  { name: 'Academic Details', href: '/studentportal/newstudentacademicdetails' },
  { name: 'Optional Facilities', href: '/studentportal/newstudentfacilities' },
  { name: 'Payment Details', href: '/studentportal/newstudentpayment' },
]
const NSRNavbar = () => {
  const path = usePathname()
  return (
    <>
            <nav className='flex w-full mt-2 flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-blue-500 rounded-full'>
                <div className="sticky top-0 flex h-10 items-center justify-center gap-4">
                    <menu className='hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-base lg:gap-6'>

                        {
                            links.map((link, index) => (
                                <Link key={index} href={link.href}
                                    className={`font-bold
                                ${path === link.href ? 'text-slate-700  p-1' : 'text-white hover:text-zinc-200 '}
                                `}
                                >
                                    {link.name}
                                </Link>
                            ))
                        }
                    </menu>
                </div>

            </nav>
        </>
  )
}

export default NSRNavbar