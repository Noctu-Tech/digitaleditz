"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/types/appNode";
import { useEffect, useId, useState } from "react"

function StringParamBody({ param, value, updateNodeParamValue,disabled }: ParamProps) {
    const id = useId();
    const [internalValue, setInternalValue] = useState(value);
    useEffect(()=>{setInternalValue(value)},[value])
    return (
        <div className="space-y-1 p-1 w-full">

            <Label htmlFor={id} className="text-xs flex">{param.name}{param.required && <p className="text-red-500">*</p>}</Label>
            <Textarea disabled={disabled} id={id} value={internalValue} placeholder="Enter value here" className="text-xs" onChange={(e:any) => setInternalValue(e.target.value)} onBlur={(e:any) => { updateNodeParamValue(internalValue) }} />
            {param.helperText && (
                <p className="text-muted-foreground px-2">{param.helperText}</p>
            )}
        </div>)
}
export default StringParamBody
