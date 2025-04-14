"use client"
import { Users, Search, Settings2Icon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';
import ProtectedRoute from '@/context/ProtectedRoute';
import { useAuth } from '@/hooks/auth';
import { useQuery } from '@tanstack/react-query';
import { GetUsers } from '@/lib/functions/username/profile';
import { User } from '@/types/profile';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import UpdateStatusRoleDialog from './_components/UpdateStatusRoleDialog';

const Page = () => {


  const {data:usersList,isLoading} =useQuery<User[]>({
    queryKey:['users'],
      queryFn:GetUsers
    }) || [];
  
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
      const filteredUsers = usersList?.filter(user => {
        const matchesSearch = 
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
      });
    
      const totalPages = Math.ceil((filteredUsers ?? []).length / pageSize);
      const paginatedUsers = (filteredUsers ?? []).slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );
      const {hasPermission}=useAuth();
      const [statusopen,setStatusOpen]=useState(false);
      const [user,setUser]=useState<User>();
  return (
    <ProtectedRoute>
      <UpdateStatusRoleDialog open={statusopen} onOpenChange={setStatusOpen} user={user}/>
    <div className="w-full min-h-screen">
      <div className="">
    
        <div className="grid grid-cols-1 gap-6">
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
             {hasPermission(['admin'])&&<TableCell>Role</TableCell>}
           </TableRow>
         </TableHeader>
         <TableBody>
           {paginatedUsers.map((user, index) => (
             <TableRow key={index}>
               <TableCell>{user.name}</TableCell>
               <TableCell>{user.email}</TableCell>
               <TableCell className='gap-4 flex'>{user.status}
                {/* {hasPermission(['admin'])&&<DropdownMenu modal={false}>
                  <DropdownMenuTrigger>
                    <Button variant={'outline'} size={'sm'}>
                      <Settings2Icon size={10}/>
                      </Button>
                    </DropdownMenuTrigger>
                  <DropdownMenuGroup>
                  <DropdownMenuContent side={'right'}><DropdownMenuItem>Edit</DropdownMenuItem>
                  </DropdownMenuContent></DropdownMenuGroup></DropdownMenu>} */}
                  </TableCell>
               <TableCell>{user.lastActive}</TableCell>
               {hasPermission(['admin'])&&<TableCell className='gap-4 flex'>{user.role}
               <DropdownMenu modal={false}>
                  <DropdownMenuTrigger>
                    <Button variant={'outline'} size={'sm'}>
                      <Settings2Icon size={10}/>
                      </Button>
                    </DropdownMenuTrigger>
                  <DropdownMenuGroup>
                  <DropdownMenuContent side={'bottom'}><DropdownMenuItem><Button variant={'ghost'} onClick={()=>{setStatusOpen((prev)=>!prev);setUser(user)}}>Edit</Button></DropdownMenuItem>
                  </DropdownMenuContent></DropdownMenuGroup></DropdownMenu>
                </TableCell>}
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
    </ProtectedRoute>
  );
};

export default Page;
