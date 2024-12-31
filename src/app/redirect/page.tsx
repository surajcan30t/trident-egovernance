'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Redirect(){
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === 'authenticated') {
      const redirectUrl = session.user.menuBlade.redirectUrl
      router.replace(redirectUrl);
    }
    else{
      router.replace('/')
    }
  }, [status, session, router]);
  return (
    <></>
  )
}