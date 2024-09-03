
import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default async function Home() {
  return (
    <main className="relative flex-col w-full h-screen">
      <div className="absolute top-0 left-0 w-full h-full">

        <div className="relative w-full h-full">
          <Image
            src="/tricol.jpg"
            className="object-cover opacity-100"
            alt="logo"
            fill
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        <div className="absolute inset-0 flex flex-col justify-around items-center z-10">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl mb-9 font-bold md:text-3xl lg:text-3xl text-yellow-200 drop-shadow-[0_3.2px_1.2px_rgb(0,0,0)]">
              Tell Me
            </h1>
            <h1 className="text-3xl font-semibold md:text-5xl lg:text-3xl text-yellow-200 drop-shadow-[0_3.2px_1.2px_rgb(0,0,0)]">
              I will Forget
            </h1>
            <h1 className="text-5xl mb-9 font-bold md:text-5xl lg:text-5xl text-yellow-200 drop-shadow-[0_3.2px_1.2px_rgb(0,0,0)]">
              Explain Me
            </h1>
            <h1 className="text-3xl font-semibold md:text-5xl lg:text-3xl text-yellow-200 drop-shadow-[0_3.2px_1.2px_rgb(0,0,0)]">
              I may remember
            </h1>
            <h1 className="text-7xl mb-9 font-bold md:text-7xl lg:text-7xl text-yellow-200 drop-shadow-[0_3.2px_1.2px_rgb(0,0,0)]">
              Involve Me
            </h1>
            <h1 className="text-3xl font-semibold md:text-5xl lg:text-3xl text-yellow-200 drop-shadow-[0_3.2px_1.2px_rgb(0,0,0)]">
              I will understand
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