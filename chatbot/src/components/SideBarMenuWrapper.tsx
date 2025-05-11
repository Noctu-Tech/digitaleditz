"use client";

import { useRouter } from "next/navigation";
import { useTransition, useEffect } from "react";
import { SidebarMenuItem, SidebarMenuButton, SidebarMenu } from "@/components/ui/sidebar";
import { BadgeIndianRupeeIcon, Bell, Box, HelpCircle, Home, MessageCircle, Workflow } from "lucide-react";
import SideButton from "./SideButton";

export default function SidebarMenuWrapper({collapsed}:{collapsed:boolean}) {
  const router = useRouter();
  const items = [
    { icon: Home, title: 'Home', url: "/dashboard" },
    { icon: Workflow, title: 'Workflow', url: "/workflows" },
    { icon: MessageCircle, title: 'Chat', url: "/messages" },
    {icon:BadgeIndianRupeeIcon, title:'Payment', url:"/payment"},
    { icon: Box, title: 'Product', url: "/products" },
    { icon: HelpCircle, title: 'Help', url: "/help" },
  ];
  useEffect(() => {
    items.forEach((item) => router.prefetch(item.url));
  }, [items, router]);

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem className="h-full w-full" key={item.title}>
          <SidebarMenuButton asChild>
            <SideButton url={item.url}>
              <item.icon />
              {!collapsed && <span className="m-1">{item.title}</span>}
            </SideButton>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
 