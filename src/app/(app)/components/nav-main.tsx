"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import * as Icons from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"


type IconName = keyof typeof Icons;
export function NavMain({
                          items,
                        }: {
  items: {
    title: string
    url: string
                            logo?: IconName
                            // isActive?: boolean
                            children?: {
      title: string
      url: string
      logo?: IconName
      isActive?: boolean
      children?: {
        title: string
        url: string
        logo?: IconName
      }[]
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      {/*<SidebarGroupLabel></SidebarGroupLabel>*/}
      <SidebarMenu>
        {items.map((item) =>
          item.children ? (
            // Render a Collapsible for items with nested items
            <Collapsible
              key={item.title}
              asChild
              // defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.logo && item.logo}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.children.map((subItem) =>
                      subItem.children ? (
                        // Render a nested Collapsible if subItem has nested items
                        <Collapsible
                          key={subItem.title}
                          asChild
                          defaultOpen={subItem.isActive || false}
                          className="group/inner-collapsible"
                        >
                          <SidebarMenuSubItem>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuSubButton>
                                {item.logo && item.logo}
                                <span>{subItem.title}</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/inner-collapsible:rotate-90 text-white" />
                              </SidebarMenuSubButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {subItem.children.map((nestedItem) => (
                                  <SidebarMenuSubItem
                                    key={nestedItem.title}
                                  >
                                    <SidebarMenuSubButton asChild>
                                      <a href={nestedItem.url}>
                                        <span>{nestedItem.title}</span>
                                      </a>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </SidebarMenuSubItem>
                        </Collapsible>
                      ) : (
                        // Render a simple link if subItem has no nested items
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    )}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            // Render a simple link for top-level items with no nested items
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                    {item.logo && item.logo}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}