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

import { PiStudentBold } from 'react-icons/pi';

import { NavMain } from '@/app/(app)/components/nav-main';
import { TeamSwitcher } from '@/app/(app)/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import * as Icons from 'lucide-react';


type IconName = keyof typeof Icons;
interface MenuItem {
  title: string;
  url: string;
  logo: IconName
  children?: MenuItem[]; // Optional, no `null`
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
      logo: SquareTerminal,
      isActive: true,
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
      logo: Bot,
      items: [
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
      logo: BookOpen,
      items: [
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
      logo: Settings2,
      items: [
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
  const [navMain, setNavMain] = React.useState<MenuItem[]>([]);
  const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName }) => {
    const IconComponent = Icons[iconName] as React.FC<React.SVGProps<SVGSVGElement>>;
    return IconComponent ? <IconComponent /> : null;
  };
  useEffect(() => {
    if (menuBlade?.urls) {
      const getNavMain = menuBlade.urls.map(({ title, url, logo, children }: MenuItem) => ({
        title,
        url,
        logo: <DynamicIcon iconName={logo} />,
        children: children
          ? children.map(({ title, url, logo, children }: MenuItem) => ({
            title,
            url,
            logo: <DynamicIcon iconName={logo} />,
            children,
          }))
          : null,
      }));
      console.log(getNavMain)
      setNavMain(getNavMain);
    }
  }, [menuBlade?.urls]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
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


