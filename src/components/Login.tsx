'use client'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'



const Login = () => {
    const router = useRouter()
    const onLogin = () => {
        router.push('https://google.com')
    }
    return (
        <Button className='bg-blue-500 rounded-full font-bold lg:px-10' onClick={onLogin} variant='outline'>Login</Button>
    )
}

export default Login