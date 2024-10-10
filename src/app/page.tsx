'use client';
import Navbar from '@/components/LandingNavbar';
import Image from 'next/image';
import TypewriterComponent from 'typewriter-effect';

export default function Home() {
  return (
    <main className="flex-col w-full h-full">
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
                  delay: 100,  // Typing speed
                  deleteSpeed: 50,  // Deleting speed

                }}
              />
            </h1>

            <h1 className="flex flex-row gap-5 text-3xl font-semibold md:text-5xl lg:text-7xl text-yellow-200 drop-shadow-[0_3.2px_1.2px_rgb(0,0,0)]">
              I will{'  '}  <TypewriterComponent
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

                  delay: 100,  // Typing speed
                  deleteSpeed: 50,  // Deleting speed
                }}
              />
            </h1>
          </div>
        </div>
      </div>

    </main>
    // <>
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