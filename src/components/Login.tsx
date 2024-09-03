'use client'
import React from 'react'
import { Button } from './ui/button'
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { fetchDataFromBackend } from '@/backend'

const Login = () => {

    const { data: session } = useSession() 

    

    // return (
    //     {session} ? <Button className='bg-blue-500 rounded-full font-bold lg:px-10' onClick={signOut()} variant='outline'>Sign Out</Button> :
    //     <Button className='bg-blue-500 rounded-full font-bold lg:px-10' onClick={signIn} variant='outline'>Sign In</Button>
    // )
    if (session) {
        return (
            <>
            <Button className='bg-blue-500 rounded-full font-bold lg:px-10' onClick={() => signOut()} variant='outline'>Sign Out</Button>
            <Button className='bg-blue-500 rounded-full font-bold lg:px-10' onClick={() => fetchDataFromBackend()} variant='outline'>User Detail</Button>
            </>
            
        )
    } else {
        return (
            <Button className='bg-blue-500 rounded-full font-bold lg:px-10' onClick={() => signIn()} variant='outline'>Sign In</Button>
        )
    }
}

export default Login