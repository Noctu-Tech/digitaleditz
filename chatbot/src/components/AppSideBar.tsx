'use client'
import { Home, Workflow, MessageCircle, Box, HelpCircle, Settings, X, ChevronRight, ArrowLeftSquare, ArrowRightSquare, NewspaperIcon, ChevronUp, User2 } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import SidebarMenuWrapper from './SideBarMenuWrapper';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import SignoutAlert from './SignoutAlert';


export function AppSidebar() {
const router=useRouter();
const profile={name:"John Doe"};
  return (
    <Sidebar variant='inset'collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            Logo
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuWrapper/>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent> 
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className='p-2'>
                    <Button variant={'ghost'} className='w-full h-full flex justify-center items-center'>
                    <User2 className="h-4 w-4 mr-2" />
                    <span>{profile.name}</span></Button>
                    <ChevronUp className="ml-auto h-4 w-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="right"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem className='flex justify-center items-center'>
                    <Button variant={"ghost"} className='w-full flex justify-start h-full' onClick={()=>{router.push('/profile')}}><User2 className="h-4 w-4 mr-2" />
                    <span>Profile</span></Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='flex justify-center items-center'>
                    <Button variant={"ghost"} className='w-full flex justify-start h-full' onClick={()=>{router.push('/settings')}}><Settings className="h-4 w-4 mr-2" />
                    <span>Settings</span></Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <SignoutAlert/>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <ModeToggle />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}
