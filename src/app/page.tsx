'use client';
import { LandingFooter } from '@/components/Footer';
import Navbar from '@/components/LandingNavbar';
import Image from 'next/image';
import TypewriterComponent from 'typewriter-effect';
import Link from 'next/link'
import { ArrowRight, GraduationCap, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
    if (status === 'authenticated') {
      const redirectUrl = session?.user.menuBlade.redirectUrl;
      console.log('Redirecting to path: ', session)
      router.replace(redirectUrl);
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

                  delay: 100, // Typing speed
                  deleteSpeed: 50, // Deleting speed
                }}
              />
            </h1>
          </div>
        </div>
        <div></div>
      </div>
      <LandingFooter />
    </main>
    //   <section>
    //     <form
    //       action={async (formData) => {
    //         "use server";
    //         await login(formData);
    //       }}
    //     >
    //       <input name='uname' type="string" placeholder="Email" />
    //       <br />
    //       <input name='password' type="password" placeholder="password" />
    //       <br />
    //       <button type="submit">Login</button>
    //     </form>
    //     <form
    //       action={async () => {
    //         "use server";
    //         await logout();
    //       }}
    //     >
    //       <button type="submit">Logout</button>
    //     </form>
    //   </section>
    // </>
  );
}

// password123admin

// <main className="flex-col w-full h-screen overflow-y-hidden">
//   <div className="w-full h-full">
//     <div className='border border-white'>
//     <Navbar />
//     </div>
//     <div className="absolute inset-0">
//       <Image
//         src="/tricol.jpg"
//         className="object-cover"
//         alt="Campus"
//         fill
//         priority
//         sizes="100vw"
//       />
//       <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
//     </div>
//
//     <div className="relative h-full flex flex-col justify-center items-center px-4">
//       <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
//         <div className="space-y-4">
//           <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-yellow-200 drop-shadow-lg tracking-tight">
//             <TypewriterComponent
//               onInit={(typewriter) => {
//                 typewriter
//                   .typeString('Tell Me')
//                   .pauseFor(1000)
//                   .deleteAll()
//                   .typeString('Explain Me')
//                   .pauseFor(1000)
//                   .deleteAll()
//                   .typeString('Involve Me')
//                   .pauseFor(1000)
//                   .deleteAll()
//                   .start();
//               }}
//               options={{
//                 loop: true,
//                 delay: 100,
//                 deleteSpeed: 50,
//                 cursor: '|',
//               }}
//             />
//           </h1>
//
//           <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-yellow-200 drop-shadow-lg flex items-center justify-center gap-4">
//             I will
//             <span className="min-w-[200px] md:min-w-[300px] inline-block">
//               <TypewriterComponent
//                 onInit={(typewriter) => {
//                   typewriter
//                     .typeString('Forget')
//                     .pauseFor(1000)
//                     .deleteAll()
//                     .typeString('Remember')
//                     .pauseFor(1600)
//                     .deleteAll()
//                     .typeString('Understand')
//                     .pauseFor(1000)
//                     .deleteAll()
    //                     .start();
    //                 }}
    //                 options={{
    //                   loop: true,
    //                   delay: 100,
    //                   deleteSpeed: 50,
    //                   cursor: '|',
    //                 }}
    //               />
    //             </span>
    //           </h2>
    //         </div>
    //
    //         <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up">
    //           Transform your future with our industry-leading programs in
    //           technology and management
    //         </p>
    //
    //         {/*<div className="flex flex-wrap justify-center gap-4 animate-fade-in-up">*/}
    //         {/*  <Link href="/">*/}
    //         {/*    <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">*/}
    //         {/*      Explore Programs*/}
    //         {/*      <ArrowRight className="ml-2 h-4 w-4" />*/}
    //         {/*    </Button>*/}
    //         {/*  </Link>*/}
    //         {/*  <Link href="/">*/}
    //         {/*    <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">*/}
    //         {/*      Apply Now*/}
    //         {/*    </Button>*/}
    //         {/*  </Link>*/}
    //         {/*</div>*/}
    //       </div>
    //
    //       <div className="absolute bottom-10 left-0 right-0 grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-black/30 backdrop-blur-sm">
    //         {features.map((feature, index) => (
    //           <div
    //             key={index}
    //             className="flex items-center gap-4 text-white p-4 rounded-lg hover:bg-white/10 transition-colors"
    //           >
    //             <feature.icon className="h-8 w-8 text-yellow-200" />
    //             <div>
    //               <h3 className="font-semibold">{feature.title}</h3>
    //               <p className="text-sm text-white/70">{feature.description}</p>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    //
    //   <style jsx global>{`
    //     @keyframes fade-in {
    //       from {
    //         opacity: 0;
    //       }
    //       to {
    //         opacity: 1;
    //       }
    //     }
    //
    //     @keyframes fade-in-up {
    //       from {
    //         opacity: 0;
    //         transform: translateY(20px);
    //       }
    //       to {
    //         opacity: 1;
    //         transform: translateY(0);
    //       }
    //     }
    //
    //     .animate-fade-in {
    //       animation: fade-in 1s ease-out;
    //     }
    //
    //     .animate-fade-in-up {
    //       animation: fade-in-up 1s ease-out;
    //     }
    //   `}</style>
    //
    //   <LandingFooter />
    // </main>
{/* <div className="absolute top-0 left-0 w-full z-50">
      <Navbar />
    </div> */}

// <div className="absolute inset-0 flex flex-col justify-around items-center z-10">
//   <div className="flex flex-col items-start text-start">
//     <h1 className="text-3xl mb-9 font-semibold md:text-5xl lg:text-5xl text-yellow-200 drop-shadow-[0_3.2px_1.2px_rgb(0,0,0)]">
//       <TypewriterComponent
//         onInit={(typewriter) => {
//           typewriter
//             .typeString('Tell Me')
//             .pauseFor(1000)
//             .deleteAll()
//             .typeString('Explain Me')
//             .pauseFor(1000)
//             .deleteAll()
//             .typeString('Involve Me')
//             .pauseFor(1000)
//             .deleteAll()
//             .start();
//         }}
//         options={{
//           loop: true,
//           delay: 100, // Typing speed
//           deleteSpeed: 50, // Deleting speed
//         }}
//       />
//     </h1>
//
//     <h1 className="flex flex-row gap-5 text-3xl font-semibold md:text-5xl lg:text-7xl text-yellow-200 drop-shadow-[0_3.2px_1.2px_rgb(0,0,0)]">
//       I will{'  '}{' '}
//       <TypewriterComponent
//         onInit={(typewriter) => {
//           typewriter
//             .typeString('Forget')
//             .pauseFor(1000)
//             .deleteAll()
//             .typeString('Remember')
//             .pauseFor(1600)
//             .deleteAll()
//             .typeString('Understand')
//             .pauseFor(1000)
//             .deleteAll()
//             .start();
//         }}
//         options={{
//           loop: true,
//
//           delay: 100, // Typing speed
//           deleteSpeed: 50, // Deleting speed
//         }}
//       />
//     </h1>
//   </div>
// </div>
// <div>
// </div>
// </div>
// <LandingFooter />
// </main>)}

