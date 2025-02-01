'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import FadeLoader from 'react-spinners/FadeLoader';
import PulseLoader from 'react-spinners/PulseLoader';
import { set } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSignIn = async () => {
    const result = await signIn('azure-ad');
    // if (result?.ok) {
    //   router.push('/office/dashboard');
    // }
  };

  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div className="" onClick={() => signOut()}>
          Sign Out
        </div>
      </>
    );
  } else {
    return (
      <Button
        className="bg-blue-500 rounded-full font-semibold md:font-bold lg:px-10"
        onClick={handleSignIn}
      >
        {loading ? (
          <PulseLoader color="#ffffff" margin={2} size={6} />
        ) : (
          'Sign In'
        )}
      </Button>
    );
  }
};

export default Login;
