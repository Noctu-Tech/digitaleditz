import { Meteors } from "@/components/magicui/meteors"

// app/[userId]/page.tsx
export default function Page( ) {
  const userId= "Something here"
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
    <Meteors number={30} />
    <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Welcome {userId}
    </span>
  </div>
  )
}