'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Login from './Login';
import { useSession } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import User from './User';
import { Avatar, AvatarFallback } from './ui/avatar';

const Navbar = () => {
  const { data: session } = useSession();
  const [sheetOpen, setSheetOpen] = useState(false);
  if (session) {
    return (
      <div className="sticky top-0 z-50">
        <div className="mx-auto flex h-14 w-full  items-center justify-center bg-white/0 backdrop-blur-lg">
          <div className="w-full md:max-w-7xl rounded-b-sm text-white font-bold text-xl flex items-center px-5 md:px-14">
            <div className="w-full flex flex-row justify-between items-center">
              <div className="w-full flex justify-between items-center">
                {/* Mobile Logo */}
                <div className="w-auto md:hidden">
                  <Image src="/tgi.png" alt="logo" width={80} height={80} />
                </div>

                {/* Desktop Logo */}
                <div className="hidden md:block">
                  <Image src="/tgi.png" alt="logo" width={150} height={150} />
                </div>

                {/* Center Title */}
                <div className="text-xl md:text-3xl lg:text-4xl text-sky-500 drop-shadow-[0_1.2px_0.2px_rgb(0,0,0)] font-extrabold flex-grow-0">
                  Trident E-Governance
                </div>

                {/* Avatar */}
                <div className="w-auto flex items-center gap-2">
                  <span className="hidden md:block text-base text-slate-200">
                    Hey! &#128075; {session.user.name} {''}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="h-8 w-8 cursor-pointer">
                        <AvatarFallback className=" bg-slate-700 text-blue-100">
                          {session.user.name?.charAt(0).toUpperCase()}
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
              <SheetContent
                side="right"
                className="bg-slate-500 text-white h-fit"
              >
                <SheetHeader>
                  <SheetTitle className="text-white">User profile</SheetTitle>
                </SheetHeader>
                <User />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    );
  }
  return (
    // <div className="top-0 z-50">
    // 	<div className="h-14 z-50 top-0 bg-[#ffe5ca4e] backdrop-saturate-100 backdrop-blur-[6px] shadow flex justify-around md:justify-around items-center">
    // 		<div className="w-full rounded-b-sm text-white font-bold text-xl flex items-center px-14">
    // 			<div className='w-full flex justify-between items-center'>
    // 				{/* Mobile Logo */}
    // 				{/* <div className='w-auto md:hidden'>
    // 					<Image src="/tgi.png" alt="logo" width={80} height={80} />
    // 				</div> */}

    // 				{/* Desktop Logo */}
    // 				<div className='hidden md:block'>
    // 					<Image src="/tgi.png" alt="logo" width={150} height={150} />
    // 				</div>

    // 				{/* Center Title */}
    // 				<div className='text-xl md:text-3xl lg:text-4xl text-sky-500 drop-shadow-[0_1.2px_0.2px_rgb(0,0,0)] font-extrabold flex-grow-0'>
    // 					Trident E-Governance
    // 				</div>

    // 				{/* Login Component */}
    // 				<div className='w-auto flex justify-end'>
    // 					<Login />
    // 				</div>
    // 			</div>
    // 		</div>
    // 	</div>
    // </div>
    <div className="sticky top-0 z-50">
      <div className="mx-auto flex h-14 w-full items-center justify-center bg-white/0 backdrop-blur-lg">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between self-center px-1 md:px-8">
          <div className="w-full rounded-b-sm text-white font-bold text-xl flex items-center md:px-14">
            <div className="w-full flex justify-between items-center ">
              {/* Mobile Logo */}
              <div className="w-auto md:hidden">
                <Image src="/tgi.png" alt="logo" width={80} height={80} />
              </div>

              {/* Desktop Logo */}
              <div className="hidden md:block">
                <Image src="/tgi.png" alt="logo" width={150} height={150} />
              </div>

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
    </div>
  );
};

export default Navbar;
