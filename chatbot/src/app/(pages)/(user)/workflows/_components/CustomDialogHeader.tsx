"use client"

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Icon,LucideIcon } from "lucide-react";
interface Props {
    title?: string;
    subtitle?: string;
    icon?: LucideIcon;
    iconClassName?: string;
    titleClassName?: string;
    subtitleClassName?: string;
}
function CustomDialogHeader(props:Props) {
  const Icon=props.icon;
    return (
    <DialogHeader className="py-6">
        <DialogTitle asChild>
            <div className="flex flex-col justify-center items-center">
            {props.icon && (
                <props.icon size={30} className={cn("stroke-primary",props.iconClassName)}/>
            )}
            {props.title && (
                <p className={cn("text-xl text-primary",props.titleClassName)}>
                    {props.title}
                </p>
            )}
            {props.subtitle && (
                <p className={cn("text-sm  text-muted-foreground",props.subtitleClassName)}>
                    {props.subtitle}
                </p>
            )}
            </div>
        </DialogTitle>
    </DialogHeader>

  )
}

export default CustomDialogHeader
