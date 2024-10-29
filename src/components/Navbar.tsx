'use client';
import Image from 'next/image';
import Link from 'next/link';

import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Login from './Login';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import User from './User';

export default function Navbar() {
  const { data: session } = useSession();
  const fallBackName = session?.user?.name
    ? session.user.name
        .split(/[\s-]+/)
        .map((word) => word.charAt(0).toUpperCase())
        .join('')
    : '';
  const [sheetOpen, setSheetOpen] = useState(false);
  if (session) {
    return (
      <div className="sticky top-0 z-50">
        <div className="mx-auto flex h-14 w-full items-center justify-center bg-orange-300/50 backdrop-blur-lg">
          <div className="w-full rounded-b-sm text-white font-bold text-xl flex items-center px-5 md:px-14">
            <div className="w-full flex flex-row justify-between items-center">
              {/* Mobile Logo */}
              {/* <div className='w-auto md:hidden'>
								<Image src="/tgi.png" alt="logo" width={80} height={80} />
							</div> */}

              {/* Desktop Logo */}

              {/* Center Title */}
              <div className="text-xl md:text-3xl lg:text-4xl text-[#39a3e5] font-extrabold flex-grow-0">
                Trident E-Governance
              </div>

              {/* Avatar */}
              <div className="w-auto flex items-center gap-2">
                <span className="text-base text-slate-600">
                  Hey! &#128075; {session?.user?.name} {''}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer">
                      <AvatarFallback className=" bg-slate-700 text-base text-blue-100">
                        {fallBackName}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="border" />
                    <DropdownMenuItem onClick={() => setSheetOpen(true)}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Login />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetContent side="right" className="bg-slate-500 text-white">
              <SheetHeader>
                <SheetTitle className="text-white">User profile</SheetTitle>
              </SheetHeader>
              <User />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="sticky top-0 z-50">
        <div className="mx-auto flex h-14 w-full items-center justify-center bg-orange-300/50 backdrop-blur-lg">
          <div className="w-full rounded-b-sm text-white font-bold text-xl flex px-16">
            <div className="w-full flex justify-between items-center">
              {/* Mobile Logo */}
              <div className="w-auto md:hidden">
                <Image src="/tgi.png" alt="logo" width={80} height={80} />
              </div>

              {/* Desktop Logo */}
              {/* <div className="hidden md:block">
                <Image src="/tgi.png" alt="logo" width={150} height={150} />
              </div> */}

              {/* Center Title */}
              <div className="text-xl md:text-3xl lg:text-4xl text-sky-500 drop-shadow-[0_1.2px_0.2px_rgb(0,0,0)] font-extrabold flex-grow-0">
                Trident E-Governance
              </div>

              {/* Login Component */}
              <div className="w-auto flex justify-end">
                <Login />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
