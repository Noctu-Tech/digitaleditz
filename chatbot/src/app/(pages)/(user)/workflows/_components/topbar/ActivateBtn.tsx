"use client";

import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

function ActivateBtn({workflowId}:{workflowId:string}) {
  return (

    <Button variant={"ghost"} className="flex items-center gap-2">
        <Play size={16} className="stroke-orange-400"/>
        Activate
    </Button>
    )
}

export default ActivateBtn
