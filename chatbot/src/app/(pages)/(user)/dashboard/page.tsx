"use client"
import { Users, Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState,useEffect } from 'react';
import ProtectedRoute from '@/context/ProtectedRoute';
import { useAuth } from '@/hooks/auth';
import { useQuery } from '@tanstack/react-query';
import AdminSpec from './_components/AdminSpec';
import { useRouter, useSearchParams } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import EditBar from './_components/EditBar';
import apiClientNew from '@/lib/functionapis/apiclientnew';
import DeleteUserDialog from './_components/DeleteUserDialog';
import UpdateStatusDialog from './_components/UpdateStatusDialog';
import UpdateRoleDialog from './_components/UpdateRoleDialog';
import { User } from '@/types/user';
import UserActions from './_components/UserActions';
import PaginationBar from '@/components/PaginationBar';
import UserSkeleton from './_components/UserSkeleton';
const Page = () => {


  const router=useRouter();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const response = await apiClientNew.get('/user/all');
        return response.data;
      } catch (e) {
        console.error("Something went wrong", e);
        throw e; 
      }
    },
  });
  const searchParams = useSearchParams();
  const dialogType = searchParams.get("dialog");
  const ids = searchParams.getAll("id");
  const [dialogOpen,setDialogOpen]=useState(false)
    const [showEditBar,setShoweditbar]=useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [disable,setDisable]=useState({role:false,status:false})
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [changeRole,setChangeRole]=useState<"admin"|"client">();
    const [changeStatus,setChangeStatus]=useState<"ACTIVATED"|"DEACTIVATED">();

    const filteredUsers = users?.filter((user:User) => {
          const matchesSearch = 
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesStatus = statusFilter === 'all' || user.u_status.toLowerCase() === statusFilter.toLowerCase();
          return matchesSearch && matchesStatus;
        });
    
        const totalPages = Math.ceil((filteredUsers ?? []).length / pageSize);
      const paginatedUsers = (filteredUsers ?? []).slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );
      useEffect(() => {

        if (dialogType && ids.length > 0) {
          setDialogOpen(true);
        }
      }, [dialogType, ids]);
      const {hasPermission}=useAuth();
      const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
      const allSelected = paginatedUsers.length > 0 && selectedUserIds.length === paginatedUsers.length;
      // const someSelected = selectedUserIds.length > 0 && selectedUserIds.length < paginatedUsers.length;
        const handleSelectAll = () => {
          if (allSelected) {
            // If all are selected, unselect all
            setSelectedUserIds([]);
            setShoweditbar(false); // Hide edit bar when no items selected
          } else {
            // If none or some are selected, select all
            const allUserIds = paginatedUsers.map((user: { _id: string; }) => user._id);

            setSelectedUserIds(allUserIds);
            setShoweditbar(true); // Show edit bar when items are selected
          }
        };
      
const handleCloseDialog = () => {
  setDialogOpen(false);
  router.push("?", { scroll: false });
};
  const handleSelectUser = (userId:string) => {
    setSelectedUserIds(prev => {
      let newSelection;
      if (prev.includes(userId)) {
        // Remove user ID if already selected
        newSelection = prev.filter(id => id !== userId);
      } else {
        // Add user ID if not selected
        newSelection = [...prev, userId];
      }
      
      // Update edit bar visibility based on whether any items are selected
      setShoweditbar(newSelection.length > 0);
      return newSelection;
    });
  };
  
  useEffect(() => {
    const selectedUsers = users.filter((user:User) => selectedUserIds.includes(user._id));
  
    const allSameRole = selectedUsers.every(
      (user:User) => user.u_role === selectedUsers[0]?.u_role
    );
  
    const allSameStatus = selectedUsers.every(
      (user:User) => user.u_status === selectedUsers[0]?.u_status
    );
    setDisable({role:allSameRole,status:allSameStatus})
    if(allSameRole || allSameStatus){
      setChangeRole(selectedUsers[0]?.u_role);
      setChangeStatus(selectedUsers[0]?.u_status)}
    console.log("All users have the same role:", allSameRole,changeRole,changeStatus);
  }, [users, selectedUserIds]);
  
 return (
    <ProtectedRoute>
      {dialogType === "delete" && (
  <DeleteUserDialog
    open={dialogOpen}
    setOpen={handleCloseDialog}
    userId={ids}
  />
)}
      {dialogType === "role" && (
  <UpdateRoleDialog
    open={dialogOpen}
    role={changeRole}
    onOpenChange={handleCloseDialog}
    userId={ids}
  />
)}      {dialogType === "status" && (
  <UpdateStatusDialog
    open={dialogOpen}
    status={changeStatus}
    onOpenChange={handleCloseDialog}
    userId={ids}
  />
)}
    <div className="w-full min-h-screen">
      <div className="p-8">
       
    {hasPermission(["admin"]) && <AdminSpec/>}
        <div className="grid grid-cols-1 gap-6">
 <div className="lg:col-span-2">
   <div className="pt-6 rounded-xl shadow-sm">
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
           <SelectItem value="ACTIVATED">Activated</SelectItem>
           <SelectItem value="DEACTIVATED">DeActivated</SelectItem>
         </SelectContent>
       </Select>
     </div>

     {/* Table */}
     {showEditBar&&<EditBar disable={disable} selectedUserIds={selectedUserIds}/>}
     <div className="overflow-x-auto">
       <Table>
         <TableHeader>
           <TableRow>
            {hasPermission(['admin']) && (
              <TableCell>
                <Checkbox 
                  checked={allSelected?allSelected:"indeterminate"}
                  onCheckedChange={handleSelectAll}
                />
              </TableCell>
            )}
             <TableCell>Name</TableCell>
             <TableCell>Email</TableCell>
             <TableCell>Status</TableCell>
             {hasPermission(['admin'])&&<TableCell>Role</TableCell>}
             
           {!showEditBar&&<TableCell>Actions</TableCell>}
           </TableRow>
         </TableHeader>
         <TableBody>
           { isLoading?
    (<><UserSkeleton/></>):
  paginatedUsers.map((user:User, index:number) => (
             <TableRow key={index}>
            {hasPermission(['admin']) && (
                <TableCell>
                  <Checkbox 
                    checked={selectedUserIds.includes(user._id)}
                    onCheckedChange={() => handleSelectUser(user._id)}
                  />
                </TableCell>
              )}
               <TableCell>{user.username}</TableCell>
               <TableCell>{user.email}</TableCell>
               <TableCell className='gap-4 flex'>{user.u_status}
                  </TableCell>
               <TableCell>{user.u_role}</TableCell>
               <TableCell className='gap-4 flex'>
               {!showEditBar && <UserActions userId={user._id}/> }
                </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </div>

     {/* Pagination Controls */}
     <div className="flex items-center justify-between mt-4">
       <PaginationBar
        totalPages={totalPages}
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        />
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
