import Image from 'next/image'
import React from 'react'
import Login from './Login'

const Navbar = () => {
    return (
        <nav className='flex justify-center items-center w-full mt-10'>
            <div className='bg-[#ffffffad] backdrop-blur-xl w-full max-w-screen-lg h-[6vh] lg:h-[7vh] fixed rounded-3xl p-2 text-white font-bold text-xl flex items-center'>
                <div className='w-full flex justify-between items-center'>
                    {/* Mobile Logo */}
                    <div className='w-auto md:hidden'>
                        <Image src="/tgi.png" alt="logo" width={80} height={80} />
                    </div>

                    {/* Desktop Logo */}
                    <div className='hidden md:block'>
                        <Image src="/tgi.png" alt="logo" width={150} height={150} />
                    </div>

                    {/* Center Title */}
                    <div className='text-xl  md:text-3xl lg:text-4xl text-center text-sky-600 font-extrabold flex-grow'>
                        Trident E-Governance
                    </div>

                    {/* Login Component */}
                    <div className='w-auto flex justify-end'>
                        <Login />
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar