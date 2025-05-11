import { useTransition } from "react";
import { Button } from "./ui/button"
import { useRouter } from "next/navigation";

function SideButton({children,url}:{children:React.ReactNode,url:string}) {
  const [isPending, startTransition] = useTransition();
  const router =useRouter();
  return (
    <Button variant={"ghost"} disabled={isPending} className="w-full h-full p-2 fle justify-stretch" onClick={()=>{startTransition(()=>{router.push(url)})}}>{children}</Button>
  )
}

export default SideButton