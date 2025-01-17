'use client';

import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  ReceiptIndianRupee,
  Settings2,
  SquareTerminal,
  UserRoundPen,
  type LucideIcon
} from 'lucide-react';

import { FC, SVGProps } from 'react';
import { PiStudentBold } from 'react-icons/pi';
import { useEffect } from 'react';
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


type IconName = keyof typeof Icons;
interface MenuItem {
  title: string;
  url: string;
  logo?: FC<SVGProps<SVGSVGElement>>;
  children?: MenuItem[]; // Optional, no `null`
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
  menuBlade?: { // Mark menuBlade as optional
    redirectUrl: string;
    allowedRoutes: string[];
    urls: {
      title: string;
      url: string;
      logo: string;
      children: null
      | {
        title: string;
        url: string;
        logo: string;
        children: null;
      }[];
    }[];
  };
}

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Student',
      logo: PiStudentBold,
      plan: 'Enterprise',
    },
  ],
  navMain: [
    {
      title: 'Orc Warrior Ground',
      url: '#',
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="6" height="16" x="4" y="2" rx="2"/><rect width="6" height="9" x="14" y="9" rx="2"/><path d="M22 22H2"/></svg>`, // Replace with actual IconName
      children: [
        {
          title: 'History',
          url: '#',
          children: [
            {
              title: 'Non history less authenticated person',
              url: '#',
            },
          ],
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Models',
      url: '#',
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="6" height="16" x="4" y="2" rx="2"/><rect width="6" height="9" x="14" y="9" rx="2"/><path d="M22 22H2"/></svg>`, // Replace with actual IconName
      children: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="6" height="16" x="4" y="2" rx="2"/><rect width="6" height="9" x="14" y="9" rx="2"/><path d="M22 22H2"/></svg>`, // Replace with actual IconName
      children: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      logo: `<svg
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 1024 1024"
  >
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm117.7-588.6c-15.9-3.5-34.4-5.4-55.3-5.4-106.7 0-178.9 55.7-198.6 149.9H344c-4.4 0-8 3.6-8 8v27.2c0 4.4 3.6 8 8 8h26.4c-.3 4.1-.3 8.4-.3 12.8v36.9H344c-4.4 0-8 3.6-8 8V568c0 4.4 3.6 8 8 8h30.2c17.2 99.2 90.4 158 200.2 158 20.9 0 39.4-1.7 55.3-5.1 3.7-.8 6.4-4 6.4-7.8v-42.8c0-5-4.6-8.8-9.5-7.8-14.7 2.8-31.9 4.1-51.8 4.1-68.5 0-114.5-36.6-129.8-98.6h130.6c4.4 0 8-3.6 8-8v-27.2c0-4.4-3.6-8-8-8H439.2v-36c0-4.7 0-9.4.3-13.8h135.9c4.4 0 8-3.6 8-8v-27.2c0-4.4-3.6-8-8-8H447.1c17.2-56.9 62.3-90.4 127.6-90.4 19.9 0 37.1 1.5 51.7 4.4a8 8 0 0 0 9.6-7.8v-42.8c0-3.8-2.6-7-6.3-7.8z" />
  </svg>`, // Replace with actual IconName
      children: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};
type IconMap = {
  [key: string]: React.ComponentType<any>; // All Lucide icons are React components
};

type DynamicIconProps = {
  iconName: keyof typeof Icons; // Ensures the iconName matches available icon names in lucide-react
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const menuBlade: any = session?.user?.menuBlade;
  const navHead: NavHead | undefined = React.useMemo(() => {
    if (menuBlade?.urls) {
      return {role: menuBlade.role, icon: menuBlade.icon}
    }
  }, [menuBlade?.urls]);
  // Combine useEffect and useMemo to avoid double rendering
  const navMain = React.useMemo(() => {
    if (menuBlade?.urls) {
      return menuBlade.urls.map(({ title, url, logo, children }: MenuItem) => ({
        title,
        url,
        logo,
        children: children
          ? children.map(({ title, url, logo, children }: MenuItem) => ({
            title,
            url,
            logo,
            children,
          }))
          : null,
      }));
    }
    return [];
  }, [menuBlade?.urls]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className='w-full flex justify-center items-center'>
          <Image src={'/tgi.png'} alt='logo' width={150} height={100} />
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


{/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-end-horizontal"><rect width="6" height="16" x="4" y="2" rx="2"/><rect width="6" height="9" x="14" y="9" rx="2"/><path d="M22 22H2"/></svg>

<svg
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 1024 1024"
  >
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm117.7-588.6c-15.9-3.5-34.4-5.4-55.3-5.4-106.7 0-178.9 55.7-198.6 149.9H344c-4.4 0-8 3.6-8 8v27.2c0 4.4 3.6 8 8 8h26.4c-.3 4.1-.3 8.4-.3 12.8v36.9H344c-4.4 0-8 3.6-8 8V568c0 4.4 3.6 8 8 8h30.2c17.2 99.2 90.4 158 200.2 158 20.9 0 39.4-1.7 55.3-5.1 3.7-.8 6.4-4 6.4-7.8v-42.8c0-5-4.6-8.8-9.5-7.8-14.7 2.8-31.9 4.1-51.8 4.1-68.5 0-114.5-36.6-129.8-98.6h130.6c4.4 0 8-3.6 8-8v-27.2c0-4.4-3.6-8-8-8H439.2v-36c0-4.7 0-9.4.3-13.8h135.9c4.4 0 8-3.6 8-8v-27.2c0-4.4-3.6-8-8-8H447.1c17.2-56.9 62.3-90.4 127.6-90.4 19.9 0 37.1 1.5 51.7 4.4a8 8 0 0 0 9.6-7.8v-42.8c0-3.8-2.6-7-6.3-7.8z" />
  </svg> */}