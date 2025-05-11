import { Button } from "@/components/ui/button"
import { Clock, Trash2, UserCog } from "lucide-react"
import { useOpenDialog } from "./useOpenDialog"
interface EditProps {
    selectedUserIds:string[],
    disable:{role:boolean,status:boolean}
}
function EditBar({selectedUserIds,disable}:EditProps) {
  const openDialog=useOpenDialog();
  return (
    <div className="mb-4 p-3 rounded flex items-center justify-between">
    <div className="flex items-center">
      <span className="font-medium">{selectedUserIds.length} {selectedUserIds.length === 1 ? 'user' : 'users'} selected</span>
    </div>
    <div className="flex gap-2">
      <Button size="sm" variant="destructive" className="flex items-center gap-1" onClick={()=>{openDialog('delete',selectedUserIds)}}>
        <Trash2 size={14} />
        Delete
      </Button>
      <Button size="sm" disabled={disable.role} variant="outline" className="flex items-center gap-1 text-amber-400" onClick={()=>{openDialog('role',selectedUserIds)}}>
        <UserCog size={14} />
        Change Role
      </Button>
      <Button size="sm" disabled={disable.status} variant="outline" className="flex items-center gap-1 text-green-400" onClick={()=>{openDialog('status',selectedUserIds)}}>
        <Clock size={14} />
        Change Status
      </Button>
    </div>
  </div>
  )
}

export default EditBar