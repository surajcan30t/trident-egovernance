import Image from "next/image";
import Link from "next/link";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Login from "./Login";


export default function Navbar() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <div className="mx-auto flex h-14 w-full items-center justify-center bg-orange-300/50 backdrop-blur-lg">
          <div className="w-full rounded-b-sm text-white font-bold text-xl flex px-16">
            <div className='w-full flex justify-between items-center'>
              {/* Mobile Logo */}
              <div className='w-auto md:hidden'>
                <Image src="/tgi.png" alt="logo" width={80} height={80} />
              </div>

              {/* Desktop Logo */}
              <div className='hidden md:block'>
                <Image src="/tgi.png" alt="logo" width={150} height={150} />
              </div>

              {/* Center Title */}
              <div className='text-xl md:text-3xl lg:text-4xl text-sky-500 drop-shadow-[0_1.2px_0.2px_rgb(0,0,0)] font-extrabold flex-grow-0'>
                Trident E-Governance
              </div>

              {/* Login Component */}
              <div className='w-auto flex justify-end'>
                <Login />
              </div>
            </div>
          </div>
        </div>
		</div>
    </>
  );
}