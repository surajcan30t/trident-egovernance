'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Redirect(){
  const { data: session, status } = useSession();
  const menuBlade = session?.user?.menuBlade;
  const router = useRouter();
  useEffect(() => {
    if (status === 'authenticated' && menuBlade) {
      const redirectUrl = menuBlade.redirectUrl
      router.replace(redirectUrl);
    }
    else{
      router.replace('/')
    }
  }, [status, session, router]);
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-white"></div>
          <h1 className="text-white text-2xl font-bold mb-4">
            Redirecting<span className="dot-1">.</span><span className="dot-2">.</span><span className="dot-3">.</span>
          </h1>
        </div>
      </div>
      <style jsx>{`
        @keyframes blink {
          0%, 20% { opacity: 0; }
          25%, 45% { opacity: 1; }
          50%, 70% { opacity: 0; }
          75%, 95% { opacity: 1; }
          100% { opacity: 0; }
        }
        .dot-1 {
          animation: blink 1.5s infinite;
        }
        .dot-2 {
          animation: blink 1.5s infinite 0.5s;
        }
        .dot-3 {
          animation: blink 1.5s infinite 1s;
        }
      `}</style>
    </>
  )
}