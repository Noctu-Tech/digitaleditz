"use client"

import { Separator } from "@/components/ui/separator"
import { usePathname } from "next/navigation"

function CrumbTitle() {
  const pathName = usePathname()
  
  const formatTitle = (path: string) => {
    const segments = path.split('/')
    
    // Special handling for workflow studio route
    if (segments.includes('workflows') && segments.includes('studio')) {
      return 'Studio'
    }

    // Get the last non-empty segment that's not a parameter
    const lastSegment = segments
      .filter(segment => segment && !segment.startsWith('[') && !segment.endsWith(']'))
      .pop() || path

    return lastSegment
      .replace(/[-_]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="flex w-full gap-3">
      <Separator orientation="vertical"/>
      <h1 className="text-3xl font-semibold">{formatTitle(pathName)}</h1>
    </div>
  )
}

export default CrumbTitle
