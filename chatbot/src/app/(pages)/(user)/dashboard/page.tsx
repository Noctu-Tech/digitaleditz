"use client"
import React from 'react';
import { Users, Settings, TrendingUp, BarChart2, DollarSign } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// Mock data for demonstration
const analyticsData = [
  { title: 'Total Users', value: '1,234', change: '+12%', icon: <Users size={24} /> },
  { title: 'Revenue', value: '$45,678', change: '+8%', icon: <DollarSign size={24} /> },
  { title: 'Active Sessions', value: '892', change: '+15%', icon: <TrendingUp size={24} /> },
];

const settingsData = [
  { title: 'Notifications', description: 'Email and push notification preferences' },
  { title: 'Security', description: 'Password and authentication settings' },
  { title: 'Privacy', description: 'Data sharing and visibility options' },
];

const usersList = [
  { name: 'John Doe', email: 'john@example.com', status: 'Active', lastActive: '2h ago' },
  { name: 'Jane Smith', email: 'jane@example.com', status: 'Offline', lastActive: '1d ago' },
  { name: 'Mike Johnson', email: 'mike@example.com', status: 'Active', lastActive: '5m ago' },
];

const Page = () => {
  return (
    <div className="w-full min-h-screen ">
      {/* Main Content */}
      <div className="">
        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {analyticsData.map((item, index) => (
            <div key={index} className=" p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2  rounded-lg ">
                  {item.icon}
                </div>
                <span className={`text-sm font-medium ${
                  item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {item.change}
                </span>
              </div>
              <h3 className=" text-sm">{item.title}</h3>
              <p className="text-2xl font-semibold mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Settings and Users Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Section */}
          <div className="lg:col-span-1">
            <div className="p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings size={20} />
                Quick Settings
              </h2>
              <div className="space-y-4">
                {settingsData.map((setting, index) => (
                  <div key={index} className="p-4 rounded-lg transition-colors cursor-pointer">
                    <h3 className="font-medium">{setting.title}</h3>
                    <p className="text-sm mt-1">{setting.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Users List Section */}
          <div className="lg:col-span-2">
            <div className=" p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users size={20} />
                Recent Users
              </h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>

                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Last Active</TableCell>
                  </TableHeader>
                  <TableBody>
                    {usersList.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.status}</TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;