import { Button } from "@/components/ui/button";
import { EllipsisVertical, Edit2, Eye, UserCog, Clock, Trash2 } from "lucide-react";
import  { useRouter } from "next/navigation";
import { useOpenDialog } from "./useOpenDialog";
import { useAuth } from "@/hooks/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@radix-ui/react-dropdown-menu";

function UserActions({userId}:{userId:string}) {
    const openDialog=useOpenDialog();
    const {isSelf,hasPermission}=useAuth();
    const router=useRouter();
  return (
    <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant={'outline'} size={'sm'}>
                      <EllipsisVertical size={10}/>
                      </Button>
                    </DropdownMenuTrigger>
                  <DropdownMenuGroup>
                  <DropdownMenuContent className=' flex flex-col gap-2' side={'right'}>
                    
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <Separator/>
                    <DropdownMenuItem className='flex items-center' onSelect={()=>{
                    isSelf(userId)?router.push('/settings'):router.push(`/user/user-details/${userId}`)}}>{hasPermission(["admin"])?<><Edit2/>Edit</>:<><Eye/>View Details</>}</DropdownMenuItem>
                    {!isSelf(userId)&&
                    <>
                    <DropdownMenuItem asChild>
                    <Button size="sm" variant="ghost" className="flex items-center w-full h-full gap-1 text-amber-400" onClick={()=>{openDialog('role',userId)}}>
        <UserCog size={14} />
        Change Role
      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                    <Button size="sm" variant="ghost" className="flex items-center w-full h-full gap-1 text-green-400" onClick={()=>{openDialog('status',userId)}}>
        <Clock size={14} />
        Change Status
      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                    <Button size="sm" variant="destructive" className="flex items-center gap-1 w-full h-full" onClick={()=>{openDialog('delete',userId)}}>
        <Trash2 size={14} />
        Delete
      </Button>
                    </DropdownMenuItem>
                    </>
                    }
                  
                  </DropdownMenuContent></DropdownMenuGroup></DropdownMenu>
  )
}

export default UserActions