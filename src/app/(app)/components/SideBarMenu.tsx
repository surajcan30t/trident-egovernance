// 'use client';

import * as React from 'react';
import { Frame, Map, PieChart, type LucideIcon } from 'lucide-react';

import { FC, SVGProps } from 'react';
import { PiStudentBold } from 'react-icons/pi';
// import { useEffect } from 'react';
import { NavMain } from '@/app/(app)/components/nav-main';
import { TeamSwitcher } from '@/app/(app)/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useSession } from 'next-auth/react';
import * as Icons from 'lucide-react';
import Image from 'next/image';
import tgi from '@/../public/tgi.png';

import useSWR from 'swr';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

type IconName = keyof typeof Icons;

interface MenuItem {
  title: string;
  url: string;
  logo: string;
  children?: MenuItem[]; // Optional, no `null`
}

interface MenuBlade {
  role: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  urls: MenuItem[];
}

interface NavHead {
  role: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}

interface Token {
  name: string;
  picture: string | null;
  sub: string;
  accessToken: string;
  menuBlade?: {
    // Mark menuBlade as optional
    redirectUrl: string;
    allowedRoutes: string[];
    urls: {
      title: string;
      url: string;
      logo: string;
      children:
        | null
        | {
            title: string;
            url: string;
            logo: string;
            children: null;
          }[];
    }[];
  };
}

type IconMap = {
  [key: string]: React.ComponentType<any>; // All Lucide icons are React components
};

type DynamicIconProps = {
  iconName: keyof typeof Icons; // Ensures the iconName matches available icon names in lucide-react
};

async function fetchMenuBlade(accessToken: string): Promise<MenuBlade | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/get-menu-blade`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store', // ensure fresh data for server rendering
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.accessToken;

  let menuBlade: MenuBlade | null = null;

  if (accessToken) {
    menuBlade = await fetchMenuBlade(accessToken);
  }

  const navHead = menuBlade ? { role: menuBlade.role, icon: menuBlade.icon } : undefined;

  const navMain = menuBlade?.urls?.map(({ title, url, logo, children }) => ({
    title,
    url,
    logo,
    children: children?.map(child => ({
      title: child.title,
      url: child.url,
      logo: child.logo,
      children: child.children ?? undefined,
    })),
  })) ?? [];

  // const { data: session, status } = useSession();
  // const isLoadingorAuthenticated = status === 'loading' || status === 'authenticated'
  // console.log('Session::', isLoadingorAuthenticated)
  
  // const fetcher = async (url: string) => {
  //   if(!session?.user?.accessToken) {
  //     const cachedData = localStorage.getItem('menuBlade');
  //     if(cachedData) return JSON.parse(cachedData);
  //     return null
  //   }

  //   const response = await fetch(url, {
  //     headers: {
  //       Authorization: `Bearer ${session.user.accessToken}`,
  //     }
  //   })

  //   if(!response.ok){
  //     throw new Error('Failed to fetch menublade')
  //   }

  //   const data = await response.json();
  //   localStorage.setItem('menuBlade', JSON.stringify(data))
  //   return data
  // }

  // const { data: menuBlade } = useSWR(
  //   session ? `${process.env.NEXT_PUBLIC_BACKEND}/api/get-menu-blade` : null,
  //   fetcher,
  //   {
  //     revalidateOnFocus: false,
  //     revalidateOnReconnect: false,
  //     dedupingInterval: 3600000,
  //     fallbackData: (() => {
  //       if(typeof window !== 'undefined') {
  //         const cached = localStorage.getItem('menuBlade')
  //         return cached ? JSON.parse(cached) : null
  //       }
  //       return null;
  //     })(),
  //   }
  // )

  // const navHead = React.useMemo(() => {
  //   if(menuBlade) {
  //     return {role: menuBlade.role, icon: menuBlade.icon}
  //   }
  //   return undefined
  // }, [isLoadingorAuthenticated])

  // const navMain = React.useMemo(() => {
  //   if(menuBlade?.urls) {
  //     return menuBlade.urls.map(({title, url, logo, children} : MenuItem) => ({
  //       title,
  //       url,
  //       logo,
  //       children: children
  //         ? children.map(({title, url, logo, children} : MenuItem) => ({
  //           title,
  //           url,
  //           logo,
  //           children
  //         }))
  //         :undefined
  //     }))
  //   } return [];
  // }, [isLoadingorAuthenticated])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="w-full flex justify-center items-center">
          <Image src={tgi} alt="logo" width={150} height={100} />
          {/* <h1 className='font-bold text-xl'>Trident</h1> */}
        </div>
        {navHead && <TeamSwitcher items={navHead} />}
      </SidebarHeader>
      <SidebarContent>
        {navMain.length > 0 && <NavMain items={navMain} />}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

// urls: [
//   {
//     title: 'Dashboard',
//     url: '/student/dashboard',
//     logo: 'logo',
//     children: [
//       {
//         title: 'Dashboard',
//         url: '/student/dashboard/1',
//         logo: 'logo',
//         children: null
//       }
//     ]
//   },
//   {
//     title: 'Account Details',
//     url: '/student/accountdetails',
//     logo: 'logo',
//     children: null
//   }
// ]

{
  /* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-end-horizontal"><rect width="6" height="16" x="4" y="2" rx="2"/><rect width="6" height="9" x="14" y="9" rx="2"/><path d="M22 22H2"/></svg>

<svg
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 1024 1024"
  >
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm117.7-588.6c-15.9-3.5-34.4-5.4-55.3-5.4-106.7 0-178.9 55.7-198.6 149.9H344c-4.4 0-8 3.6-8 8v27.2c0 4.4 3.6 8 8 8h26.4c-.3 4.1-.3 8.4-.3 12.8v36.9H344c-4.4 0-8 3.6-8 8V568c0 4.4 3.6 8 8 8h30.2c17.2 99.2 90.4 158 200.2 158 20.9 0 39.4-1.7 55.3-5.1 3.7-.8 6.4-4 6.4-7.8v-42.8c0-5-4.6-8.8-9.5-7.8-14.7 2.8-31.9 4.1-51.8 4.1-68.5 0-114.5-36.6-129.8-98.6h130.6c4.4 0 8-3.6 8-8v-27.2c0-4.4-3.6-8-8-8H439.2v-36c0-4.7 0-9.4.3-13.8h135.9c4.4 0 8-3.6 8-8v-27.2c0-4.4-3.6-8-8-8H447.1c17.2-56.9 62.3-90.4 127.6-90.4 19.9 0 37.1 1.5 51.7 4.4a8 8 0 0 0 9.6-7.8v-42.8c0-3.8-2.6-7-6.3-7.8z" />
  </svg> */
}
