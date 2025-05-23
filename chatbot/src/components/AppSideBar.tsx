'use client'
import { ChevronUp, LogOut, Settings, SettingsIcon, UserRoundCog } from 'lucide-react';
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import SidebarMenuWrapper from './SideBarMenuWrapper';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import SignoutAlert from './SignoutAlert';
import Logo from './Logo';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { Separator } from './ui/separator';


export function AppSidebar({collapsed}: { collapsed: boolean }) {
const router=useRouter();
const {user:data}=useAuth();
const [signout,setSignout]=useState(false);


  return (
    <>
    <SignoutAlert open={signout} setOpen={setSignout}/>
    <Sidebar variant='sidebar'collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Logo/>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuWrapper collapsed={collapsed}/>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent> 
      <SidebarFooter>
  <SidebarMenu>
    <div className={`w-full h-full flex ${collapsed ? 'flex-col justify-center items-center gap-2' : 'flex-row justify-between items-center'}`}>
   
    <SidebarMenuItem className='w-full'>
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          
            <SidebarMenuButton className={`${collapsed ? 'w-full flex justify-center' : 'w-full'} h-full`} asChild>
              <div className={`flex flex-row gap-2 items-center`}>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={data?.u_pfp} alt={data?.username} />
                  <AvatarFallback>{data?.username?.charAt(0)}</AvatarFallback>
                </Avatar>
                {!collapsed && <span>{data?.username || 'User'}</span>}
              </div>
            </SidebarMenuButton>         
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          className="w-[--radix-popper-anchor-width] flex flex-col gap-1"
        >
          <DropdownMenuLabel className='w-full h-full flex justify-start items-center text-md'>
            <SettingsIcon className="h-4 w-4 mr-2" /><span>Settings</span>
          </DropdownMenuLabel>
          <Separator/>
          <DropdownMenuItem className='flex justify-center items-center' asChild>
            <Button variant={"ghost"} className='w-full flex justify-start p-2 h-full' onClick={()=>{router.push('/settings')}}>
              <UserRoundCog className="h-4 w-4 mr-2" />
              <span>Account</span>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button variant={"destructive"} className='w-full flex justify-start p-2 h-full' onClick={()=>{setSignout((prev)=>!prev)}}>
              <LogOut className="h-4 w-4 mr-2" />
              <span>Sign out</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
    <SidebarMenuItem>
    <SidebarMenuButton className="w-fit h-fit hover:bg-transparent mt-1" asChild>
              <div className={`${collapsed ? 'mx-auto mt-1' : ''}`}>
                <ModeToggle />
              </div>
            </SidebarMenuButton>
            </SidebarMenuItem>
    </div>
  </SidebarMenu>
</SidebarFooter>
    </Sidebar>
</>  )
}
