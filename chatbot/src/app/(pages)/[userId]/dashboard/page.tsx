import React from 'react';
import { Users, Settings, TrendingUp, BarChart2, DollarSign } from 'lucide-react';
import Appbar from '@/app/ui/components/Appbar';
import SideBar from '@/app/ui/components/SideBar';
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
    <div className="w-full min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="">
        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {analyticsData.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  {item.icon}
                </div>
                <span className={`text-sm font-medium ${
                  item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {item.change}
                </span>
              </div>
              <h3 className="text-gray-500 text-sm">{item.title}</h3>
              <p className="text-2xl font-semibold mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Settings and Users Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings size={20} />
                Quick Settings
              </h2>
              <div className="space-y-4">
                {settingsData.map((setting, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <h3 className="font-medium">{setting.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{setting.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Users List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users size={20} />
                Recent Users
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b">
                      <th className="pb-3">Name</th>
                      <th className="pb-3">Email</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((user, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="py-3">{user.name}</td>
                        <td className="py-3 text-gray-500">{user.email}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {user.status}
                          </span>
                        </td>+
                        <td className="py-3 text-gray-500">{user.lastActive}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;