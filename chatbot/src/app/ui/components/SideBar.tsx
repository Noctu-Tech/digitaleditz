"use client"
import React, { useState } from 'react';
import { Home, Workflow, MessageCircle, Box, HelpCircle, Settings, X, ChevronRight, ArrowLeftSquare, ArrowRightSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SideBarUserProps } from '../interface/user';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';

const SideBar = ({ user }: { user: SideBarUserProps }) => {
  const pathname = usePathname();
  const navItems = [
    { icon: <Home size={20} />, label: 'Home', path: "dashboard" },
    { icon: <Workflow size={20} />, label: 'Workflow', path: "workflow" },
    { icon: <MessageCircle size={20} />, label: 'Chat', path: "messages" },
    { icon: <Box size={20} />, label: 'Product', path: "product" },
    { icon: <HelpCircle size={20} />, label: 'Help', path: "help" },
  ];
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <div className={`${sideToggle ? 'w-64' : 'w-20'} transition-all duration-300 h-full rounded-2xl z-10 md:z-0 flex flex-col fixed md:static  left-0 shadow-lg`}>
      {/* Header with close button */}
      <div className="w-full p-4 border-b flex justify-end items-center">
        <button onClick={() => { setSideToggle(!sideToggle) }} className="h-8 w-8 rounded-lg flex items-center justify-center transition-colors">
          {sideToggle ? <ArrowLeftSquare size={24} /> : <ArrowRightSquare size={24} />}
        </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-grow py-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <li key={index}>
                  <Link
                    href={item.path}
                    className={cn(
                      "flex items-center px-6 py-2 text-sm transition-colors group relative",
                      isActive && "bg-muted font-medium",
                      !isActive && "hover:bg-muted/50"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className={cn("mr-3", isActive && "text-primary")}>
                      {item.icon}
                    </span>
                    <span 
                      className={cn(
                      "flex-grow transition-opacity duration-300",
                      sideToggle ? "opacity-100" : "opacity-0 w-0",
                      isActive && "text-primary"
                    )}
                  >
                    {item.label}
                  </span>
                  {sideToggle && (
                    <ChevronRight
                      size={16}
                      className={cn(
                        "opacity-0 group-hover:opacity-100 transition-opacity",
                        isActive && "opacity-100 text-primary"
                      )}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="border-t p-4">
        <div className={`flex transition-all duration-300 ${sideToggle ? "flex-row items-center" : "flex-col items-center"} gap-3`}>
          <div className="flex items-center gap-3 w-full">
            <div className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center overflow-hidden">
              {user.pfp ? (
                <img src={user.pfp} alt={user.username} className="h-full w-full object-cover" />
              ) : (
                <span className="text-lg">{user.username[0]}</span>
              )}
            </div>
            <div className={`flex-grow transition-opacity duration-300 ${sideToggle ? 'opacity-100' : 'opacity-0 w-0'}`}>
              <h3 className="text-sm font-medium">{user.username}</h3>
              <p className="text-xs">
                {user.subscription} Member
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SideBar);