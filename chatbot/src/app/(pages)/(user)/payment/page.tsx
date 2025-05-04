"use client"
import { Users, Search, Settings2Icon, EllipsisVertical, Edit2, Eye, MessageCircleOff, ReceiptIndianRupeeIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';
import ProtectedRoute from '@/context/ProtectedRoute';
import { useAuth } from '@/hooks/auth';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { GetTransactions } from '@/lib/functions/payment/getTransaction';
import { Card, CardContent } from '@/components/ui/card';

const Page = () => {


  const router=useRouter();
  const {data:payments,isLoading} =useQuery({
    queryKey:['payment-history'],
      queryFn:GetTransactions
    }) || [];
  
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const paymentsList=payments;
    const filteredUsers = paymentsList?.filter(payment => {
          const matchesSearch = 
            payment.paymentname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.email.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesStatus = statusFilter === 'all' || payment.status.toLowerCase() === statusFilter.toLowerCase();
          return matchesSearch && matchesStatus;
        });
    
      const totalPages = Math.ceil((filteredUsers ?? []).length / pageSize);
      const paginatedUsers = (filteredUsers ?? []).slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );
      const {hasPermission,isSelf}=useAuth();
  if (isLoading){
    return <>Loading.... new</>
  }
  if(payments && payments.length>0){
 return (
    <ProtectedRoute>
    <div className="w-full min-h-screen">
      <div className="p-8">
       
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
           placeholder="Search payments..."
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
           <SelectItem value="active">ACTIVATED</SelectItem>
           <SelectItem value="offline">DEACTIVATED</SelectItem>
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
             {hasPermission(['admin'])&&<TableCell>Role</TableCell>}
             
           <TableCell>Actions</TableCell>
           </TableRow>
         </TableHeader>
         <TableBody>
           {paginatedUsers.map((payment, index) => (
             <TableRow key={index}>
               <TableCell>{payment.paymentname}</TableCell>
               <TableCell>{payment.email}</TableCell>
               <TableCell className='gap-4 flex'>{payment.u_status}
                  </TableCell>
               <TableCell>{payment.u_role}</TableCell>
               <TableCell className='gap-4 flex'>{payment.role}
               <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant={'outline'} size={'sm'} onClick={()=>{
                      console.log("@payment",payment);
                      
                    console.log(payment._id);}}>
                      <EllipsisVertical size={10}/>
                      </Button>
                    </DropdownMenuTrigger>
                  <DropdownMenuGroup>
                  <DropdownMenuContent side={'bottom'}>
                    <DropdownMenuItem onSelect={()=>{
                      console.log("@payment",payment);
                    console.log(payment._id);
                  router.push(`/payment/transaction/${payment._id}`)}}>{hasPermission(["admin"])?<><Edit2/>Edit</>:<><Eye/>View Details</>}</DropdownMenuItem>
                  </DropdownMenuContent></DropdownMenuGroup></DropdownMenu>
                </TableCell>
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

  return (
    <div className="flex items-center justify-center h-full w-full p-6">
      <Card className="w-full max-w-md border border-dashed bg-muted/10">
        <CardContent className="pt-6 flex flex-col items-center text-center space-y-5">
          <ReceiptIndianRupeeIcon />
          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-tight">No Transactions Found</h3>
            <p className="text-sm text-muted-foreground">
              This might be because you might not have made any transactions. if you have made a transaction you can raise a ticket in the help section
            </p>
            <Button variant={'secondary'} onClick={()=>{router.push('/help')}}>Raise a Ticket</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );}
export default Page;
