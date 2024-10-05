'use client'
import React from 'react'
import { Button } from './ui/button'
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const Login = () => {

    const { data: session } = useSession()
    if (session) {
        return (
            <>
                <div className='' onClick={() => signOut()}>Sign Out</div>
            </>

        )
    } else {
        return (
            <Button className='bg-blue-500 rounded-full font-bold lg:px-10' onClick={() => signIn('azure-ad')} variant='outline'>Sign In</Button>
        )
    }
}

export default Login