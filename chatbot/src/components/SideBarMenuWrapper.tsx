"use client";

import { useRouter } from "next/navigation";
import { useTransition, useEffect } from "react";
import Link from "next/link";
import { SidebarMenuItem, SidebarMenuButton, SidebarMenu } from "@/components/ui/sidebar";
import { Box, HelpCircle, Home, MessageCircle, Workflow } from "lucide-react";

export default function SidebarMenuWrapper() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const items = [
    { icon: Home, title: 'Home', url: "/dashboard" },
    { icon: Workflow, title: 'Workflow', url: "/workflows" },
    { icon: MessageCircle, title: 'Chat', url: "/messages" },
    { icon: Box, title: 'Product', url: "/products" },
    { icon: HelpCircle, title: 'Help', url: "/help" },
  ];
  useEffect(() => {
    items.forEach((item) => router.prefetch(item.url));
  }, [items, router]);

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <button
              onClick={() => startTransition(() => router.push(item.url))}
              disabled={isPending}
            >
              <item.icon />
              <span>{item.title}</span>
            </button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
 