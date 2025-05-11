'use client'
import Link from 'next/link'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { UserSignupSchemaType, userSignupSchema } from '@/schema/auth'
import { handleSignup } from '@/lib/functions/auth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserSignupSchemaType>({
    resolver: zodResolver(userSignupSchema),
  });

  const router = useRouter();
  const {mutate, isPending, isError, error} = useMutation({
    mutationFn: handleSignup,
    onSuccess: () => {
      toast.success("Signed up Successfully", {id: "user-signup"});
      router.push("/onboarding");
    },
    onError: () => {
      toast.error("Failed to Signup", {id: "user-signup"})
    }
  })

  const onSubmit = useCallback((values: UserSignupSchemaType) => {
    toast.loading("Storing Credentials...", {id: "user-signup"});
    mutate(values)
  }, [mutate])

  return (
    <Card className="p-6">
      <CardHeader className="space-y-1">
        <h2 className="text-2xl font-semibold">Create an account</h2>
        <p className="text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              {...register("username")}
              type="text"
              placeholder="John Doe"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              type="email"
              placeholder="name@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button 
          type="submit"
          className="w-full"
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing up...
            </>
          ) : (
            "Sign up"
          )}
        </Button>
        {isError && (
          <p className="text-sm text-red-500">
            {error?.message || "Something went wrong"}
          </p>
        )}
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

export default Signup

