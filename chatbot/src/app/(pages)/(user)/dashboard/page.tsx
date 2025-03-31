"use client"
import { Users, Settings, TrendingUp, BarChart2, DollarSign, Search } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';

// Add type definition for analytics data
type AnalyticItem = {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  details: {
    chartData: Array<{ name: string; value: number }>;
    stats: Array<{ label: string; value: string }>;
    transactions?: Array<{
      id: string;
      product: string;
      amount: string;
      user: string;
      date: string;
      status: string;
    }>;
    topProducts?: Array<{
      name: string;
      revenue: string;
      sales: number;
      trend: string;
    }>;
  };
};

// Extended mock data with detailed analytics
const analyticsData: AnalyticItem[] = [
  { 
    title: 'Total Users', 
    value: '1,234', 
    change: '+12%', 
    icon: <Users size={24} />,
    details: {
      chartData: [
        { name: 'Jan', value: 1000 },
        { name: 'Feb', value: 1100 },
        { name: 'Mar', value: 1234 },
        { name: 'Apr', value: 1350 },
        { name: 'May', value: 1450 }
      ],
      stats: [
        { label: 'New Users Today', value: '34' },
        { label: 'Active Users', value: '892' },
        { label: 'Inactive Users', value: '342' },
      ],
      transactions: [
        {
          id: '#U123',
          product: 'Free Plan',
          amount: '$0',
          user: 'Alice Cooper',
          date: '2024-03-15',
          status: 'Active'
        },
        {
          id: '#U124',
          product: 'Premium Plan',
          amount: '$299',
          user: 'Bob Dylan',
          date: '2024-03-14',
          status: 'Active'
        },
        {
          id: '#U125',
          product: 'Basic Plan',
          amount: '$99',
          user: 'Charlie Brown',
          date: '2024-03-13',
          status: 'Inactive'
        },
      ],
      topProducts: [
        {
          name: 'Mobile Users',
          revenue: '734',
          sales: 642,
          trend: '+25%'
        },
        {
          name: 'Desktop Users',
          revenue: '892',
          sales: 299,
          trend: '+18%'
        },
        {
          name: 'Tablet Users',
          revenue: '234',
          sales: 293,
          trend: '+12%'
        },
      ]
    }
  },
  { 
    title: 'Revenue', 
    value: '$45,678', 
    change: '+8%', 
    icon: <DollarSign size={24} />,
    details: {
      chartData: [
        { name: 'Jan', value: 38000 },
        { name: 'Feb', value: 42000 },
        { name: 'Mar', value: 45678 },
      ],
      stats: [
        { label: 'Monthly Revenue', value: '$15,226' },
        { label: 'Average Order', value: '$89' },
        { label: 'Total Orders', value: '513' },
      ],
      transactions: [
        {
          id: '#TX123',
          product: 'Premium Plan',
          amount: '$299',
          user: 'John Doe',
          date: '2024-03-15',
          status: 'Completed'
        },
        {
          id: '#TX124',
          product: 'Basic Plan',
          amount: '$99',
          user: 'Jane Smith',
          date: '2024-03-14',
          status: 'Completed'
        },
        {
          id: '#TX125',
          product: 'Custom Design',
          amount: '$499',
          user: 'Mike Johnson',
          date: '2024-03-13',
          status: 'Pending'
        },
      ],
      topProducts: [
        {
          name: 'Premium Plan',
          revenue: '$12,567',
          sales: 42,
          trend: '+15%'
        },
        {
          name: 'Basic Plan',
          revenue: '$8,991',
          sales: 91,
          trend: '+8%'
        },
        {
          name: 'Custom Design',
          revenue: '$24,120',
          sales: 48,
          trend: '+25%'
        },
      ]
    }
  },
  { 
    title: 'Active Sessions', 
    value: '892', 
    change: '+15%', 
    icon: <TrendingUp size={24} />,
    details: {
      chartData: [
        { name: '9 AM', value: 450 },
        { name: '12 PM', value: 680 },
        { name: '3 PM', value: 892 },
        { name: '6 PM', value: 750 },
        { name: '9 PM', value: 420 }
      ],
      stats: [
        { label: 'Current Active', value: '892' },
        { label: 'Avg Duration', value: '24m' },
        { label: 'Bounce Rate', value: '24%' },
      ],
      transactions: [
        {
          id: '#S123',
          product: 'Mobile App',
          amount: '45m',
          user: 'David Smith',
          date: '2024-03-15 14:30',
          status: 'Active'
        },
        {
          id: '#S124',
          product: 'Web Dashboard',
          amount: '32m',
          user: 'Emma Watson',
          date: '2024-03-15 14:25',
          status: 'Active'
        },
        {
          id: '#S125',
          product: 'API Usage',
          amount: '18m',
          user: 'Frank Castle',
          date: '2024-03-15 14:20',
          status: 'Ended'
        },
      ],
      topProducts: [
        {
          name: 'Dashboard',
          revenue: '456',
          sales: 892,
          trend: '+20%'
        },
        {
          name: 'Mobile App',
          revenue: '289',
          sales: 567,
          trend: '+15%'
        },
        {
          name: 'API Usage',
          revenue: '147',
          sales: 234,
          trend: '+10%'
        },
      ]
    }
  },
];

// Expanded mock data
const usersList = [
  { name: 'John Doe', email: 'john@example.com', status: 'Active', lastActive: '2h ago' },
  { name: 'Jane Smith', email: 'jane@example.com', status: 'Offline', lastActive: '1d ago' },
  { name: 'Mike Johnson', email: 'mike@example.com', status: 'Active', lastActive: '5m ago' },
  // Add more mock users if needed
];

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnalytic, setSelectedAnalytic] = useState<AnalyticItem | null>(null);

  // Filter users based on search and status
  const filteredUsers = usersList.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const renderAnalyticDetails = (analytic: AnalyticItem) => {
    if (analytic.title === 'Revenue') {
      return (
        <>
          {/* Chart section remains the same */}
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytic.details.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Products Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Top Products</h3>
            <div className="grid grid-cols-3 gap-4">
              {analytic.details.topProducts?.map((product, index) => (
                <div key={index} className="bg-muted p-4 rounded-lg">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-xl font-semibold mt-1">{product.revenue}</div>
                  <div className="text-sm text-muted-foreground">
                    {product.sales} sales · {product.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytic.details.transactions?.map((tx, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{tx.id}</TableCell>
                      <TableCell>{tx.product}</TableCell>
                      <TableCell>{tx.amount}</TableCell>
                      <TableCell>{tx.user}</TableCell>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tx.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {tx.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      );
    }
    
    // Default detail view for other analytics
    return (
      <>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytic.details.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8884d8" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {analytic.details.stats.map((stat, index) => (
            <div key={index} className="bg-muted p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-xl font-semibold mt-1">{stat.value}</div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="w-full min-h-screen">
      {/* Main Content */}
      <div className="">
        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {analyticsData.map((item, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedAnalytic(item)}
            >
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

        {/* Analytics Detail Dialog */}
        <Dialog open={!!selectedAnalytic} onOpenChange={() => setSelectedAnalytic(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedAnalytic?.icon}
                {selectedAnalytic?.title} Details
              </DialogTitle>
            </DialogHeader>
            
            <ScrollArea className="h-[calc(90vh-8rem)] pr-4">
              {selectedAnalytic && (
                <div className="space-y-6">
                  {/* Chart */}
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={selectedAnalytic.details.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#8884d8" 
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-3 gap-4">
                    {selectedAnalytic.details.stats.map((stat, index) => (
                      <div key={index} className="bg-muted p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                        <div className="text-xl font-semibold mt-1">{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Top Products/Metrics */}
                  {selectedAnalytic.details.topProducts && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        {selectedAnalytic.title === 'Revenue' ? 'Top Products' : 'Top Metrics'}
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        {selectedAnalytic.details.topProducts.map((product, index) => (
                          <div key={index} className="bg-muted p-4 rounded-lg">
                            <div className="font-medium">{product.name}</div>
                            <div className="text-xl font-semibold mt-1">{product.revenue}</div>
                            <div className="text-sm text-muted-foreground">
                              {product.sales} {selectedAnalytic.title === 'Revenue' ? 'sales' : 'users'} · {product.trend}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Transactions/Activity List */}
                  {selectedAnalytic.details.transactions && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        {selectedAnalytic.title === 'Revenue' ? 'Recent Transactions' : 'Recent Activity'}
                      </h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>{selectedAnalytic.title === 'Revenue' ? 'Product' : 'Type'}</TableCell>
                            <TableCell>{selectedAnalytic.title === 'Revenue' ? 'Amount' : 'Duration'}</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedAnalytic.details.transactions.map((tx, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{tx.id}</TableCell>
                              <TableCell>{tx.product}</TableCell>
                              <TableCell>{tx.amount}</TableCell>
                              <TableCell>{tx.user}</TableCell>
                              <TableCell>{tx.date}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  tx.status === 'Completed' || tx.status === 'Active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : tx.status === 'Pending' 
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {tx.status}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* Settings and Users Grid */}
        <div className="grid grid-cols-1 gap-6">
          {/* Users List Section */}
          <div className="lg:col-span-2">
            <div className=" p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users size={20} />
                Users
              </h2>

              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Last Active</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedUsers.map((user, index) => (
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

              {/* Pagination Controls */}
              <div className="flex items-center justify-between mt-4">
                <Select value={pageSize.toString()} onValueChange={(v) => {
                  setPageSize(Number(v));
                  setCurrentPage(1);
                }}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Per page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 rows</SelectItem>
                    <SelectItem value="15">15 rows</SelectItem>
                    <SelectItem value="20">20 rows</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1 rounded border disabled:opacity-50"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="px-3 py-1 rounded border disabled:opacity-50"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;