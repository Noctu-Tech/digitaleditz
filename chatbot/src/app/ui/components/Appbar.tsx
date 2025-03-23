"use client"
import React, { useState } from 'react';
import { Search, Bell, Menu, User, X, Settings, LogOut, UserCircle } from 'lucide-react';
import { NotificationDrawer } from './NotificationDrawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';

const  Appbar = ({data}:{data:any}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotificationDot, setShowNotificationDot] = useState(true);

  const notifications = [
    { id: 1, text: 'New message received', time: '5m ago' },
    { id: 2, text: 'Your post was viewed', time: '1h ago' },
  ];

  return (
    <div className="h-20 w-full border-b shadow-sm z-10  ">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Left section with menu and logo */}
        <div className="flex items-center gap-4">
          {/* <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu size={24} className="text-gray-600" />
          </button> */}
          <div className="text-xl font-semibold">Logo</div>
        </div>

        {/* Center section with search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pl-10  border  rounded-lg "
            />
            <Search className="absolute left-3 top-2.5" size={20} />
          </div>
        </div>

        {/* Right section with notifications and profile */}
        <div className="flex items-center gap-4">
            <div className="relative">
            {/* Add state for managing notifications */}
            <button 
              className="relative p-2 rounded-lg"
              onClick={() => setShowNotifications(true)}
            >
              <Bell size={24} className="" />
              {notifications.length > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <NotificationDrawer 
              open={showNotifications}
              onOpenChange={setShowNotifications}
              notifications={notifications}
              setShowNotificationDot={setShowNotificationDot}
              onClearAll={() => {
              // Clear all notifications
              notifications.length = 0;
              setShowNotifications(false);
              setShowNotificationDot(false);
              }}
            />
            </div>
          
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg">
                  <div className="h-8 w-8 rounded-fullflex items-center justify-center">
                    <User size={26} />
                  </div>
                  <span className="hidden md:inline text-sm font-medium">
                {data.name}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <Link href="profile"><DropdownMenuItem className="cursor-pointer">
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem></Link>
                <Link href="settings">
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem></Link>
                <DropdownMenuSeparator />
                <Link href='logout'>
                <DropdownMenuItem className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem></Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;