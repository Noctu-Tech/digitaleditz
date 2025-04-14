"use client"
import Link from 'next/link'
import { useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMutation } from '@tanstack/react-query'
import { handleSignin } from '@/lib/functions/auth'
import { userSigninSchema, UserSigninSchemaType } from '@/schema/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

function Signin() {
  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm<UserSigninSchemaType>({
    resolver: zodResolver(userSigninSchema)
  })
  const router=useRouter()
  const {mutate, isPending} = useMutation({
    mutationKey: ["user-signin"],
    mutationFn: handleSignin,
    onSuccess: () => {
      toast.success("Signed in Successfully", {id: "user-signin"});
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Failed to Signin", {id: "user-signin"})
    }
  })

  const onSubmit = useCallback((values: UserSigninSchemaType) => {
    toast.loading("Checking Credentials...", { id: "user-signin" });

    mutate(values);
  }, [mutate])

  return (
    <div className="h-full w-full flex items-center justify-center p-4">
      <Card className="w-full h-full overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Don't have an account?{" "}
            <Link href="../signup" className="underline underline-offset-4 hover:text-primary">
              Join us
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Signin
