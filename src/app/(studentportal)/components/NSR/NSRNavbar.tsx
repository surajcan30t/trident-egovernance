'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  isAuthenticated,
  nsrSignout,
} from '@/app/(studentportal)/nsractions/nsractions';
import { useAuth } from '@/app/(studentportal)/provider/NSRAuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';

const links = [
  { name: 'Admission Details', href: '/studentportal/newstudentadmission' },
  {
    name: 'Personal Details',
    href: '/studentportal/newstudentpersonaldetails',
  },
  {
    name: 'Academic Details',
    href: '/studentportal/newstudentacademicdetails',
  },
  { name: 'Optional Facilities', href: '/studentportal/newstudentfacilities' },
  { name: 'Upload Documents', href: '/studentportal/newstudentdocs' },
  { name: 'Payment Details', href: '/studentportal/newstudentpayment' },
];

const SignIn = () => {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  useEffect(() => {
    const checkLoginState = async () => {
      const status = await isAuthenticated();
      status ? setIsLoggedIn(true) : setIsLoggedIn(false);
    };
    checkLoginState();
  }, []);

  async function signOut() {
    const status = await nsrSignout();
    status ? setIsLoggedIn(false) : setIsLoggedIn(true);
  }

  return (
    <>
      {isLoggedIn ? (
        <Button
          variant="secondary"
          onClick={signOut}
          className="rounded-full float-right"
        >
          Sign Out
        </Button>
      ) : (
        <Button
          variant="secondary"
          onClick={() => {
            router.push('/studentportal');
          }}
          className="rounded-full float-right"
        >
          Sign In
        </Button>
      )}
    </>
  );
};

const NSRNavbar = () => {
  const path = usePathname();

  return (
    <>
      <div className="px-2">
        <nav className="flex w-full mt-2 flex-row justify-end items-center max-w-8xl md:mx-auto px-4 sm:px-6 lg:px-8 bg-blue-500 rounded-full">
          <div className="w-1/6"></div>
          <div className="sticky top-0 flex h-10 items-center justify-center gap-4">
            <menu className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-base lg:gap-6">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`font-bold
                                ${path === link.href ? 'text-slate-700  p-1' : 'text-white hover:text-zinc-200 '}
                                `}
                >
                  {link.name}
                </Link>
              ))}
            </menu>
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Menu />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    {links.map((link, index) => (
                      <DropdownMenuItem key={index}>
                        <Link
                          key={index}
                          href={link.href}
                          className={`font-bold
                                ${path === link.href ? 'text-slate-500  p-1' : 'text-slate-900 hover:text-zinc-200 '}
                                `}
                        >
                          {link.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <SignIn />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="w-1/6 hidden md:block">
            <SignIn />
          </div>
        </nav>
      </div>
    </>
  );
};

export default NSRNavbar;
