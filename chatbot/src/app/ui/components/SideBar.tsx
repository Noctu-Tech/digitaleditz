import React from 'react';
import { Home, Workflow, MessageCircle, Box, HelpCircle, Settings, X, ChevronRight } from 'lucide-react';
import { SideBarUserProps } from '../interface/user';
import { SideBarProps } from '../interface/components';

const SideBar = ({ links, user }: { links: SideBarProps; user: SideBarUserProps }) => {
  const navItems = [
    { icon: <Home size={20} />, label: 'Home', path: links.home },
    { icon: <Workflow size={20} />, label: 'Workflow', path: links.workflow },
    { icon: <MessageCircle size={20} />, label: 'Chat', path: links.chat },
    { icon: <Box size={20} />, label: 'Product', path: links.product },
    { icon: <HelpCircle size={20} />, label: 'Help', path: links.help },
  ];

  return (
    <div className="w-[270px] h-4/6 rounded-2xl bg-white text-gray-700 flex flex-col fixed bottom-20 left-0 shadow-lg">
      {/* Header with close button */}
      <div className="w-full p-4 border-b border-gray-200 flex justify-end items-center">
        <button className="h-8 w-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-grow py-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.path}
                className="flex items-center px-6 py-2 text-sm hover:bg-gray-100 transition-colors group"
              >
                <span className="mr-3 text-gray-500 group-hover:text-blue-500">
                  {item.icon}
                </span>
                <span className="flex-grow group-hover:text-blue-500">{item.label}</span>
                <ChevronRight
                  size={16}
                  className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {user.pfp ? (
              <img src={user.pfp} alt={user.username} className="h-full w-full object-cover" />
            ) : (
              <span className="text-lg text-gray-600">{user.username[0]}</span>
            )}
          </div>
          <div className="flex-grow">
            <h3 className="text-sm font-medium">{user.username}</h3>
            <p className="text-xs text-gray-500">
              {user.subscription} subscription
            </p>
          </div>
          <button className="h-8 w-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
            <Settings size={18} className="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;