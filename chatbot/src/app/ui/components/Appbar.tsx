import React from 'react';
import { Search, Bell, Menu, User } from 'lucide-react';

const Appbar = () => {
  return (
    <div className="h-20 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Left section with menu and logo */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu size={24} className="text-gray-600" />
          </button>
          <div className="text-xl font-semibold text-gray-800">Logo</div>
        </div>

        {/* Center section with search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pl-10 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        {/* Right section with notifications and profile */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell size={24} className="text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
              <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={20} className="text-gray-600" />
              </div>
              <span className="hidden md:inline text-sm font-medium text-gray-700">
                John Doe
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;