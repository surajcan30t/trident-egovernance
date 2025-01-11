'use client';

import * as React from 'react';
import { ChevronsUpDown, Plus } from 'lucide-react';

import { FC, SVGProps } from 'react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

export function TeamSwitcher({
  items,
}: {
  items: {
    role: string;
    icon: FC<SVGProps<SVGSVGElement>>;
  };
}) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(items);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg border-2 text-sidebar-primary-foreground">
          {activeTeam.icon && (
                      <span
                        className="icon"
                        dangerouslySetInnerHTML={{ __html: activeTeam.icon }}
                      />
                    )}
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{activeTeam.role}</span>
          </div>
          {/*<ChevronsUpDown className="ml-auto" />*/}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
