'use client';
import { LandingFooter } from '@/components/Footer';
import Navbar from '@/components/LandingNavbar';
import Image from 'next/image';
import TypewriterComponent from 'typewriter-effect';
import { GraduationCap, BookOpen, Users } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

const features = [
  {
    icon: GraduationCap,
    title: "Excellence in Education",
    description: "Nurturing future leaders through quality education"
  },
  {
    icon: BookOpen,
    title: "Industry-Ready Programs",
    description: "Curriculum designed for real-world success"
  },
  {
    icon: Users,
    title: "Vibrant Community",
    description: "Join a diverse community of learners"
  }
];

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.menuBlade) {
      const redirectUrl = session.user.menuBlade.redirectUrl;
      router.replace(redirectUrl);
    }
    else if (status === 'authenticated' && !session?.user?.menuBlade) {
      console.log('else if block in / executed')
      signOut()
      toast({
        title: "Server Error",
        description: "Unable to get basic details",
        variant: "destructive"
      })
    }
    else {
      router.replace('/')
    }
  }, [status, session, router]);
  return (
    // <>
    <main className="flex-col w-full h-screen overflow-y-hidden">
      <div className="w-full h-full">
        <Navbar />
        <div className="absolute top-0 w-full h-full">
          <Image
            src="/tricol.jpg"
            className="object-cover opacity-100"
            alt="logo"
            fill
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        {/* <div className="absolute top-0 left-0 w-full z-50">
          <Navbar />
        </div> */}

        <div className="absolute inset-0 flex flex-col justify-around items-center z-10">
          <div className="flex flex-col items-start text-start">
            <h1 className="text-3xl mb-9 font-semibold md:text-5xl lg:text-5xl text-yellow-200 drop-shadow-[0_3.2px_1.2px_rgb(0,0,0)]">
              <TypewriterComponent
                onInit={(typewriter) => {
                  typewriter
                    .typeString('Tell Me')
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString('Explain Me')
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString('Involve Me')
                    .pauseFor(1000)
                    .deleteAll()
                    .start();
                }}
                options={{
                  loop: true,
                  delay: 100, // Typing speed
                  deleteSpeed: 50, // Deleting speed
                }}
              />
            </h1>

            <h1 className="flex flex-row gap-5 text-3xl font-semibold md:text-5xl lg:text-7xl text-yellow-200 drop-shadow-[0_3.2px_1.2px_rgb(0,0,0)]">
              I will{'  '}{' '}
              <TypewriterComponent
                onInit={(typewriter) => {
                  typewriter
                    .typeString('Forget')
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString('Remember')
                    .pauseFor(1600)
                    .deleteAll()
                    .typeString('Understand')
                    .pauseFor(1000)
                    .deleteAll()
                    .start();
                }}
                options={{
                  loop: true,
                  delay: 100,
                  deleteSpeed: 50, 
                }}
              />
            </h1>
          </div>
        </div>
        <div></div>
      </div>
      <LandingFooter />
    </main>
  );
}