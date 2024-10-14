'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import FadeLoader from 'react-spinners/FadeLoader'
import PulseLoader from 'react-spinners/PulseLoader'
import { set } from 'react-hook-form'
const Login = () => {
	const [loading, setLoading] = useState(false)
	const doSignIn = async () => {
		try {
			setLoading(true)
			await signIn('azure-ad')
			setLoading(false)
		} catch (error) {
			setLoading(false)
		} finally {
			setLoading(false)
		}
	}

    const { data: session } = useSession()
    if (session) {
        return (
            <>
                <div className='' onClick={() => signOut()}>Sign Out</div>
            </>

        )
    } else {
        return (
					<Button className='bg-blue-500 rounded-full font-bold lg:px-10' onClick={() => signIn('azure-ad')} variant='outline'>
						{loading ? (<PulseLoader
							color="#ffffff"
							margin={2}
							size={6}
						/>) : 'Sign In'}
					</Button>
        )
    }
}

export default Login